/* 1. Crear un servidor en Node con el módulo http.
2. Disponibilizar una ruta para crear un archivo a partir de los parámetros de la consulta
recibida.
3. Disponibilizar una ruta para devolver el contenido de un archivo cuyo nombre es
declarado en los parámetros de la consulta recibida.
4. Disponibilizar una ruta para renombrar un archivo, cuyo nombre y nuevo nombre es
declarado en los parámetros de la consulta recibida.
5. Disponibilizar una ruta para eliminar un archivo, cuyo nombre es declarado en los
parámetros de la consulta recibida.
6. Devolver un mensaje declarando el éxito o fracaso de lo solicitado en cada consulta
recibida.
7. Agrega la fecha actual al comienzo del contenido de cada archivo creado en formato
“dd/mm/yyyy”. Considera que si el día o el mes es menor a 10 concatenar un “0” a la
izquierda. (​Opcional​)
8. En la ruta para renombrar, devuelve un mensaje de éxito incluyendo el nombre
anterior del archivo y su nuevo nombre de forma dinámica . (​Opcional​)
9. En el mensaje de respuesta de la ruta para eliminar un archivo, devuelve el siguiente
mensaje:
“Tu solicitud para eliminar el archivo <nombre_archivo> se está procesando”, y luego de 3 segundos envía el mensaje de éxito mencionando el
nombre del archivo eliminado. (​Opcional​) */

const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });

    const params = url.parse(req.url, true).query;
    const archivo = params.archivo;
    const contenido = params.contenido;
    const nuevoNombre = params.nuevoNombre;

    if (req.url.includes('/crear')){
        fs.writeFile(archivo, getDate() + contenido, () => {
            res.write('Archivo creado con exito');
            res.end();
        });
    }

    if (req.url.includes('/leer')){
        fs.readFile(archivo, 'utf-8', (err, data) => {
            res.write('Archivo leido con éxito: ' + data);
            res.end();
        });
    }

    if (req.url.includes('/renombrar')){
        fs.rename(archivo, nuevoNombre, (err, data) => {
            res.write(`Archivo: '${archivo}' renombrado a: '${nuevoNombre}'`);
            res.end();
        });
    }

    if (req.url.includes('/eliminar')){

        res.write(`Tu solicitud para eliminar el archivo '${archivo}' se está procesando ...  `);

        setTimeout(() => {
            fs.unlink(archivo, (err, data) => {
                res.write(`Archivo '${archivo}' eliminado correctamente.`);
                    res.end();   
            });            
        }, 3000);
    }

}).listen(8080, () => {
    console.log('Escuchando el puero 8080.');
});

var getDate = () => {
    let date = new Date();
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let month = date.getMonth() +1;
    if (month < 10){
        month = "0" + month;
    }
    let year = date.getFullYear();
    let dateFormat = `${day}/${month}/${year}: `;
    return dateFormat;
}
