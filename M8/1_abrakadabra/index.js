const express = require('express');
const app = express();

// 1. Crear un servidor con Express en el puerto 3000.
app.listen(3000, () => {
    console.log('escuchando el puerto 3000');
});

// 2. Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static('assets'));


// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta ​/abracadabra/usuarios​.
let usuarios = ['ricardo', 'sebastian', 'lucia', 'fernanda'];
app.get('/abracadabra/usuarios', (req, res) => {
    res.send(JSON.stringify(usuarios));
});

 // 4. Crear un middleware con la ruta ​/abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor. En caso de ser exitoso, permitir el paso a la ruta ​GET correspondiente, de lo contrario devolver la imagen “who.jpeg”.
app.use('/abracadabra/juego/:usuario', (req, res, next) => {

    const usuario = req.params.usuario;

    if (usuarios.includes(usuario)) {
        next();
    } else {
        res.redirect('/who.jpeg');
    };

});

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 5. Crear una ruta /abracadabra/conejo/:n ​que valide si el parámetro “n” coincide con el número generado de forma aleatoria.
// ​Basado en un número aleatorio del 1 al 4, devolver la foto del conejo en caso de coincidir con el número recibido como parámetro ó devolver la foto de Voldemort en caso de no coincidir. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.
app.get('/abracadabra/conejo/:n', (req, res) => {

    const aleatorio = Math.random();
    const redondeado = Math.floor(aleatorio * (4)) +1;
   
    const numero = req.params.n;

    if (numero == redondeado) {
        res.redirect('/conejito.jpg');
    } else {
        res.redirect('/voldemort.jpg');
    }
});

app.get('/inicio', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor. 
app.get('*', (req, res) => {
    res.send('<h1>Esta página no existe...</h1>');
});

