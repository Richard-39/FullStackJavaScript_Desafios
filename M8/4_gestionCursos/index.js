const express = require ('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const {Pool} = require('pg');
const pool = new Pool({
    user: '',
    host: '',
    password: '',
    database: '',
    port: 5432
});

app.listen(3000, ()=>{
    console.log('escuchando puerto 3000');
});

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
});

/* 1. Crear una ruta ​POST /curso ​que reciba un payload desde el cliente con los datos de
un nuevo curso y los ingrese a la tabla​ cursos​. */

app.post('/curso', (req, res) => {
    const curso = req.body;

    try {
        const result = pool.query('insert into m8_gestion_cursos (nombre, nivel, fecha, duracion) values ($1, $2, $3, $4) RETURNING *', [`${curso.nombre}`, `${curso.nivelTecnico}`, `${curso.fechaInicio}`, `${curso.duracion}`], (err, data) => {
            if (err) {
                console.log('index.js - /curso - ' + err);
            } else {
                console.log(data);                 
            }
            res.end();
        });

    } catch (error) {
        console.log('error intentando conectarse con la base de datos - /curso - ' + error);       
    }
});

/* 2. Crear una ruta ​GET /cursos ​que consulte y devuelva los registros almacenados en la
tabla ​cursos​. */

app.get('/cursos', (req, res)=>{
    try {
        pool.query('select * from m8_gestion_cursos', (err, data) => {
            if (err) {
                console.log('index.js - /cursos - ' + err);
            } else {
                console.log('GET - /cursos');
                console.log(data.rows);                 
            }
            res.send(data.rows);
        })
    } catch (error) {
        console.log('error intentando conectarse con la base de datos - /cursos - ' + error);
    }
});

/** 3. Crear una ruta ​PUT /curso ​que reciba un payload desde el cliente con los datos de un
curso ya existente y actualice su registro en la tabla ​cursos​. */

app.put('/curso', async (req, res) => {
    const curso = req.body;
    try {

        const updateName = await pool.query('update m8_gestion_cursos set nombre = $1 where id = $2 RETURNING *', [`${curso.nombre}`, `${curso.id}`]);

        const updateLevel = await pool.query('update m8_gestion_cursos set nivel = $1 where id = $2 RETURNING *', [`${curso.nivelTecnico}`, `${curso.id}`]);

        const updateDate = await pool.query('update m8_gestion_cursos set fecha = $1 where id = $2 RETURNING *', [`${curso.fechaInicio}`, `${curso.id}`]);

        const updateDuration = await pool.query('update m8_gestion_cursos set duracion = $1 where id = $2 RETURNING *', [`${curso.duracion}`, `${curso.id}`]);

        res.end();

    } catch (error) {
        console.log('error intentando conectarse con la base de datos - PUT /curso - ' + error);       
    }
});

/* 4. Crear una ruta ​DELETE /cursos ​que reciba el id de un curso como parámetro de la
ruta y elimine el registro relacionado en la tabla ​cursos​. */

app.delete('/curso/:id', (req, res) => {

    const {id} = req.params;
    console.log(id);

    try {
        pool.query('delete from m8_gestion_cursos where id = $1', [`${id}`], (err, data) => {
            if (err) {
                console.log('index.js - DELETE /curso/:id - ' + err);
            } else {
                console.log('DELETE - /curso/:id');
                console.log(data.rows);                 
            }
            res.end();
        });
    } catch (error) {
        console.log('error intentando conectarse con la base de datos - delete /curso - ' + error);
    }
});