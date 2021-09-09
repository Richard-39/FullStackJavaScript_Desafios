/** CREACION DE BASE DE DATOS

    CREATE DATABASE ​repertorio ;
    CREATE​ ​TABLE​ repertorio (​id​ ​SERIAL​, cancion ​VARCHAR​(​50​), artista
    VARCHAR​(​50​), tono ​VARCHAR​(​10​));
 */

const {Pool} = require('pg');
const http = require('http');
const url = require('url');
const fs = require('fs');

const config = {
    user: "",
    host: "",
    password: "",
    database: "",
    port: ''
};

const pool = new Pool(config);

http
    .createServer((req, res) => {

        if (req.url == '/') {
            fs.readFile('index.html', 'utf-8', (err, html) => {
                if (err){
                    res.statusCode = 500;
                    console.log("request '/' error al leer index.html: ", e);
                    res.end();
                };
                res.writeHead(200, {'Content-type':'text/html'});
                res.end(html);
            });
        }

        /** 1. Crear una ruta ​POST /cancion ​que reciba los datos correspondientes a una canción y
            realice a través de una función asíncrona la inserción en la tabla ​repertorio. */
        if (req.url.startsWith('/cancion') && req.method == 'POST') {

            let body = '';
            req.on('data', (payload) => {
                body = JSON.parse(payload);
            });
            req.on('end', () => {

                const queryObj = {
                    name: 'new-song',
                    text: `insert into repertorio (cancion, artista, tono) values ($1, $2, $3) RETURNING *;`,
                    values: [`${body.cancion}`, `${body.artista}`, `${body.tono}`],
                    rowMode: 'array'
                }

                pool.query(queryObj, (err, data) => {
                    if (err) {
                        console.log('error en index.js - /cancion - POST - client.query: ' + err);
                    } else {
                        console.log('registro agregado: ');
                        for (estudiante of data.rows){
                            console.log(estudiante);
                        } 
                    }
                });

                res.end();
            });
        }


        /** 2. Crear una ruta ​GET /canciones ​que devuelva un JSON con los registros de la tabla
            repertorio​. */
        if (req.url.startsWith('/canciones') && req.method == 'GET') {

            pool.query('select * from repertorio', (err, data) => {
                if (err) {
                    console.log('error en index.js - /canciones - get - client.query: ' + err);
                } else {
                    console.log('registros encontrados: ');
                    for (estudiante of data.rows){
                        console.log(estudiante);
                    } 

                    res.end(JSON.stringify(data.rows));
                }
            });
        }

        /** 3. Crear una ruta ​PUT /cancion ​que reciba los datos de una canción que se desea
            editar, ejecuta una función asíncrona para hacer la consulta SQL correspondiente y
            actualice ese registro de la tabla ​repertorio​. */
        if (req.url.startsWith('/cancion') && req.method == 'PUT') {

            let body = '';
            req.on('data', (payload) => {
                body = JSON.parse(payload);
            });
            req.on('end', async () => {

                let editedSong = {};

                const upCancion = {
                    text: `update repertorio set cancion = $1 where id = $2 RETURNING *;`,
                    values: [`${body.cancion}`,`${body.id}`],
                    rowMode: 'array'
                }
                const resultUpSong = await pool.query(upCancion);
                editedSong.cancion = resultUpSong.rows[0][1];

                const upArtista = {
                    text: `update repertorio set artista = $1 where id = $2 RETURNING *;`,
                    values: [`${body.artista}`,`${body.id}`],
                    rowMode: 'array'
                }  
                const resultUpArtist = await pool.query(upArtista);
                editedSong.artista = resultUpArtist.rows[0][2];

                const upTono = {
                    text: `update repertorio set tono = $1 where id = $2 RETURNING *;`,
                    values: [`${body.tono}`,`${body.id}`],
                    rowMode: 'array'
                }
                const resultUpTono = await pool.query(upTono);
                editedSong.tono = resultUpTono.rows[0][3];
                console.log('Registro Editado: ' );
                console.log(editedSong);

                res.end();
            }); 
        }

        /** 4. Crear una ruta ​DELETE /cancion ​que reciba por queryString el id de una canción y
            realiza una consulta SQL a través de una función asíncrona para eliminarla de la
            base de datos. */
        if (req.url.startsWith('/cancion') && req.method == 'DELETE') {

            const {id} = url.parse(req.url, true).query;

            const queryObj = {
                text: `delete from repertorio where id = $1 RETURNING *;`,
                values: [`${id}`],
                rowMode: 'array'
            }
            pool.query(queryObj, (err, data) => {
                if (err) {
                    console.log('error en index.js - /cancion DELETE: ' + err);
                } else {
                    console.log('Registro eliminado: ' + id);
                }

                res.end();
            });


        }

    }

).listen(3000, ()=>{
    console.log('escuchando puerto 3000');
});

/**




                res.end();
 */