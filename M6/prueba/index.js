const http = require ('http');
const { v4: uuidv4 } = require('uuid')
const url = require ('url');
const fs = require ('fs');

http.
    createServer((req, res) => {

        if (req.url == '/'){
            // Debe devolver el documento HTML disponibilizado en el apoyo.

            res.writeHead(200, {'Content-Type' : 'text/html'});
            fs.readFile('index.html', 'utf-8', (err, html)=>{
                res.end(html);
            })            
        };

        if (req.url.startsWith('/roommate') && req.method == 'GET') {
            // Devuelve todos los roommates almacenados. Devuelve todos los roommates almacenados en el servidor (roommates.json)
            res.end();
        };

        if (req.url.startsWith('/roommate') && req.method == 'POST') {
            // Almacena un nuevo roommate ocupando random user
            res.end();
        };

        if (req.url.startsWith('/gastos') && req.method == 'GET') {
            //  Devuelve todos los gastos almacenados en el archivo gastos.json.
            res.end();
        }

        if (req.url.startsWith('/gasto') && req.method == 'POST') {
            // Recibe el payload con los datos del gasto y los almacena en un archivo JSON (gastos.json).
            res.end();
        }

        if (req.url.startsWith('/gasto') && req.method == 'PUT') {
            // Edita los datos de un gasto. Recibe el payload de la consulta y modifica los datos Almacenados en el servidor (gastos.json).
            res.end();
        }

        if (req.url.startsWith('/gasto') && req.method == 'DELETE') {
            // Elimina un gasto del historial. Recibe el id del gasto usando las Query Strings y la elimine del historial de gastos (gastos.json).
            res.end();
        }


    })
    .listen(3000, () => {
        console.log('Escuchando puerto 3000');
    });

/*
1. Ocupar el módulo File System para la manipulación de archivos alojados en el
servidor (3 Puntos)
2. Capturar los errores para condicionar el código a través del manejo de excepciones.
(1 Punto)
3. El botón “Agregar roommate” de la aplicación cliente genera una petición POST (sin
payload) esperando que el servidor registre un nuevo roommate random con la API
randomuser, por lo que debes preparar una ruta POST /roommate en el servidor que
ejecute una función asíncrona importada de un archivo externo al del servidor (la
función debe ser un módulo), para obtener la data de un nuevo usuario y la acumule
en un JSON (roommates.json).

El objeto correspondiente al usuario que se almacenará debe tener un id generado
con el paquete UUID. (2 Puntos)

Se debe considerar recalcular y actualizar las cuentas de los roommates luego de
este proceso. (3 Puntos)

5. Devolver los códigos de estado HTTP correspondientes a cada situación. (1 Punto)
6. Enviar un correo electrónico a todos los roommates cuando se registre un nuevo
gasto. Se recomienda agregar a la lista de correos su correo personal para verificar
esta funcionalidad. (Opcional)
*/