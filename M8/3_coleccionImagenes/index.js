const express = require('express');
const fs = require ('fs');
const app = express();
app.listen(3000);

// 1. Integrar express-fileupload a Express.
const expressFileUpload = require ('express-fileupload');
app.use(express.static('public'));

console.log(__dirname);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 2. Definir que el límite para la carga de imágenes es de 5MB.
// 3. Responder con un mensaje indicando que se sobrepasó el límite especificado.
app.use(expressFileUpload({
    limits: {fileSize: 5000000},
    abortOnLimit: true,
    responseOnLimit: 'El peso del archivo supera el limite de 5mb'
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario.html');
});

/**4. Crear una ruta ​POST /imagen que reciba y almacene una imagen en una carpeta
pública del servidor. Considerar que el formulario envía un payload con una
propiedad “position”, que indica la posición del collage donde se deberá mostrar la
imagen. */

app.post('/imagen', (req, res) => {
    const {target_file} = req.files;
    const {posicion} = req.body;
    const name = `imagen-${posicion}`;
    target_file.mv(`${__dirname}/public/imgs/${name}.jpg`, (err) => {
        res.sendFile(__dirname + '/collage.html');
    })
});

app.get('/collage', (req, res) => {
    res.sendFile(__dirname + '/collage.html');
});

/**
5. Crear una ruta ​GET /deleteImg/:nombre ​que reciba como parámetro el nombre de
una imagen y la elimine de la carpeta en donde están siendo alojadas las imágenes.
Considerar que esta interacción se ejecuta al hacer click en alguno de los números
del collage. */

app.get('/deleteImg/:nombre', (req, res) => {
    const {nombre} = req.params;
    fs.unlink(`${__dirname}/public/imgs/${nombre}`, (err) => {
        res.send(`Imagen ${nombre} fue eliminada con éxito`);
    });
});