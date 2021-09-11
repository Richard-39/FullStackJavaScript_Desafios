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
const url = require('url');
const {Pool} = require ('pg');

const config = {
    user: 'rabarza',
    host: '93.188.167.75',
    password: 'richard.69',
    database: 'desafios',
    port: '5432'
}

const pool = new Pool(config);

http
    .createServer((req, res) => {

        // / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba.
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type':'text/html'});
            fs.readFile('index.html', 'utf-8', (err, data) => {
                if (err) {console.log('index.js - / error al acceder a index.html: ' + err);}
                res.end(data);
            });
        }

        // /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.
        if(req.url.startsWith('/usuario') && req.method == 'POST'){

            let body = '';
            req.on('data', (payload) => {
                body = JSON.parse(payload);
            });

            req.on('end', async () => {

                try {

                    await pool.query('BEGIN');

                    const newUserQuery = await pool.query('insert into usuarios (nombre, balance) values ($1, $2) RETURNING *',[`${body.nombre}`,`${body.balance}`]);

                    await pool.query('COMMIT');

                    console.log('Usuario registrado: ');
                    console.log(newUserQuery.rows);
                    
                } catch (error) {

                    console.log('error al intentar crear un usuario: ' + error);
                    await client.query('ROLLBACK');
                    
                }

                res.end();

            });
        }

        // /usuarios GET: Devuelve todos los usuarios registrados con sus balances.
        if(req.url.startsWith('/usuarios') && req.method == 'GET'){

            pool.query('select * from usuarios', (err, data) => {
                if (err) {
                    console.log('error al traer los usuarios: index.js - /usuarios GET : ' + err);
                    res.end();
                }else {
                    res.end(JSON.stringify(data.rows));
                };
                
            });            
        }

        // /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza.
        if(req.url.startsWith('/usuario') && req.method == 'PUT'){

            const params = url.parse(req.url, true).query;

            let body = '';
            req.on('data', (payload) => {
                body = JSON.parse(payload);
            });

            req.on('end', async () => {

                try {

                    await pool.query('BEGIN');

                    const editUserNameQuery = await pool.query('update usuarios set nombre = $1 where id = $2 RETURNING *',[`${body.name}`,`${params.id}`]);

                    await pool.query('COMMIT');

                    const editUserBalanceQuery = await pool.query('update usuarios set balance = $1 where id = $2 RETURNING *',[`${body.balance}`,`${params.id}`]);

                    await pool.query('COMMIT');

                    console.log('Usuario editado: ');
                    console.log(editUserBalanceQuery.rows);

                    
                } catch (error) {

                    console.log('error al intentar editar un usuario: ' + error);
                    await pool.query('ROLLBACK');
                    
                }

                res.end();

            });
        }

        // /usuario DELETE: Recibe el id de un usuario registrado y lo elimina .
        if(req.url.startsWith('/usuario') && req.method == 'DELETE'){

            const params = url.parse(req.url, true).query;

            pool.query('delete from usuario where id = $1',[`${params.id}`], (err, data) => {
                if (err) {
                    console.log('error al eliminar usuario: index.js - /usuario DELETE : ' + err);
                    res.end();
                }else {
                    console.log('Usuario eliminado: ' + params.id);
                    res.end();
                };

            });
        }

        // /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se debe ocupar una transacción SQL en la consulta a la base de datos.
        if(req.url.startsWith('/transferencia') && req.method == 'POST'){
            let body = '';
            req.on('data', (payload) => {
                body = JSON.parse(payload);
            });

            req.on('end', async () => {

                try {

                    await pool.query('BEGIN');

                    let fecha = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;

                    const updateEmisorQuery = await pool.query('update usuarios set balance= balance - $1 where id = $2 RETURNING *',[`${body.monto}`,`${body.emisor}`]);

                    await pool.query('COMMIT');

                    const updateReceptorQuery = await pool.query('update usuarios set balance= balance + $1 where id = $2 RETURNING *',[`${body.monto}`,`${body.receptor}`]);

                    await pool.query('COMMIT');

                    const insertTrasnferQuery = await pool.query('insert into transferencias (emisor, receptor, monto, fecha) values ($1, $2, $3, $4) RETURNING *',[`${body.emisor}`,`${body.receptor}`, `${body.monto}`, `${fecha}`]);

                    await pool.query('COMMIT');

                    console.log('Transferencia realizada: ');
                    console.log(insertTrasnferQuery.rows);

                    
                } catch (error) {

                    console.log('error al intentar hacer la transferencia: ' + error);
                    await pool.query('ROLLBACK');
                    
                }

                res.end();

            });
        }

        // /transferencias GET: Devuelve todas las transferencias almacenadas en la base de datos en formato de arreglo. 
        if(req.url.startsWith('/transferencias') && req.method == 'GET'){
        
            let consulta = {
                rowMode: "array",
                text: "select id, (select nombre from usuarios where id = emisor) as emisor, (select nombre from usuarios where id = receptor) as receptor, monto, fecha from transferencias;"
            };

            pool.query(consulta, (err, queryResponse) => {
                res.end(JSON.stringify(queryResponse.rows));
            });
        }
    })
    .listen(3000, () => {
    console.log('escuchando puerto 3000');
});
