/** 
1. Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la
gestión y persistencia de datos. (3 Puntos)
2. Usar transacciones SQL para realizar el registro de las transferencias. (2 Puntos)
3. Servir una API RESTful en el servidor con los datos de los usuarios almacenados en
PostgreSQL. (3 Puntos)
4. Capturar los posibles errores que puedan ocurrir a través de bloques catch o
parámetros de funciones callbacks para condicionar las funciones del servidor.
(1 Punto)
5. Devolver correctamente los códigos de estado según las diferentes situaciones.
(1 Punto)*/

const http = require ('http');
const fs = require ('fs');

http
    .createServer((req, res) => {

        // / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba.
        if(req.url = '/'){
            res.writeHead(200, {'Content-Type':'text/html'});
            fs.readFile('index.html', 'utf-8', (err, data) => {
                if (err) {console.log('index.js - / error al acceder a index.html: ' + err);}
                res.end(data);
            });
        }

        // /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
        if(req.url.startsWith('/usuario') && req.method == 'POST'){
            res.end();
        }

        // /usuarios GET: Devuelve todos los usuarios registrados con sus balances.
        if(req.url.startsWith('/usuarios') && req.method == 'GET'){
            res.end();
        }

        // /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza.
        if(req.url.startsWith('/usuario') && req.method == 'PUT'){
            res.end();
        }

        // /usuario DELETE: Recibe el id de un usuario registrado y lo elimina .
        if(req.url.startsWith('/usuario') && req.method == 'DELETE'){
            res.end();
        }

        // /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se debe ocupar una transacción SQL en la consulta a la base de datos.
        if(req.url.startsWith('/transferencia') && req.method == 'POST'){
            res.end();
        }

        // /transferencias GET: Devuelve todas las transferencias almacenadas en la base de datos en formato de arreglo. 
        if(req.url.startsWith('/transferencias') && req.method == 'GET'){
            res.end();
        }

    })
    .listen(3000, () => {
    console.log('escuchando puerto 3000');
});
