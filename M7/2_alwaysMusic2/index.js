/* 

CREAR BD LLAMADA 'desafios'

CREAR TABLA EN BD

CREATE TABLE estudiantes (
id SERIAL PRIMARY KEY,
nombre varchar(50) NOT NULL,
rut varchar(12) NOT NULL,
curso varchar(50) NOT null,
nivel int not null
);


COMANDOS:

ingresar nuevo usuario:
    node index.js nuevo -n=sebastian -r='18.656.152-5' -c=keytar --ni=1

consulta por rut
    node index.js rut -r='18.656.152-5'

consulta por todos los estudiantes
    node index.js consulta 

editar estudiante (no se puede cambiar el rut por inconsistencia de la solicitud del ejercicio)
    node index.js editar -n='sebastian villalobos' -r='18.656.152-5' -c=guitarra --ni=6

eliminar estudiante
    node index.js eliminar -r='18.656.152-5'
*/

const {Pool} = require('pg');
const yargs = require ('yargs');

// 1. Realizar la conexión con PostgreSQL con la clase Client.
// UTILIZAR DATOS DE CONEXION A SU BASE DE DATOS - ESTOS DATOS NO SON USABLES DESDE CUALQUIER PC

const config = {
    user: "",
    host: "",
    password: "",
    database: "",
    port: '',
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
    };

const pool = new Pool(config);

// 2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const argv = yargs
    .command (
        'nuevo',
        'Ingresar nuevo estudiante',
        {
            nombre:{
                describe: 'nombre estudiante',
                demand: true,
                alias: 'n'
            },
            rut: {
                describe: 'rut estudiante',
                demand: true,
                alias: 'r'
            },
            curso: {
                describe: 'curso del estudiante',
                demand: true,
                alias: 'c'
            },
            nivel: {
                describe: 'nivel del curso tomado',
                demand: true,
                alias: 'ni'
            }
        },
        (args) => {   
            
            pool.connect((err, client, release) => {

                const queryObj = {
                    name: 'new-user',
                    text: `insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;`,
                    values: [`${args.nombre}`, `${args.rut}`, `${args.curso}`, `${args.nivel}`],
                    rowMode: 'array'
                }

                client.query(
                    queryObj ,(err, data) => {
                        if (err) {
                            console.log('index.js - nuevo estudiante - ' + err);
                        } else {
                            console.log('Registro agregado: ');
                            for (estudiante of data.rows){
                                console.log(estudiante);
                            }                 
                        }
                        release();
                }); 

                pool.end();

            });

        }
    )

    // 3. Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
    .command(
        'rut',
        'buscar por rut',
        {
            rut: {
                describe: 'rut estudiante',
                demand: true,
                alias: 'r'
            }
        },
        (args) => {   

            pool.connect((err, client, release) => {

                const queryObj = {
                    name: 'fetch-user',
                    text: `select * from estudiantes where rut=$1;`,
                    values: [`${args.rut}`],
                    rowMode: 'array'
                }

                client.query(
                    queryObj ,(err, data) => {
                        if (err) {
                            console.log('index.js - buscar por rut - ' + err);
                        } else {
                            if (data.rowCount > 0){
                                console.log('Registro encontrado: ');
                                for (estudiante of data.rows){
                                    console.log(estudiante);
                                }
                            } else {
                                console.log('No hay registros para el rut: ' + args.rut);
                            }   
                        }
                        release();
                });

                pool.end();

            });
            

        }
    )

    // 4. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
    .command(
        'consulta',
        'muestra todos los estudiantes',
        {},
        (args) => {   

            const queryObj = {
                name: 'fetchAll-user',
                text: `select * from estudiantes`,
                rowMode: 'array'
            }

            pool.connect((err, client, release) => {

                client.query(
                    queryObj, (err, data) => {
                        if (err) {
                            console.log('index.js - consulta todos los estudiantes - ' + err);
                        } else {
                            if (data.rowCount > 0){
                                console.log('Registros encontrados: ');
                                for (estudiante of data.rows){
                                    console.log(estudiante);
                                } 
                            } else {
                                console.log('No hay registros de estudiantes :c');
                            }
                        }
                        release();
                });

                pool.end();

            });
        }
    )

    // 5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
    .command(
        'editar',
        'edita un estudiante',
        {
            nombre:{
                describe: 'nombre estudiante',
                demand: true,
                alias: 'n'
            },
            rut: {
                describe: 'rut estudiante',
                demand: true,
                alias: 'r'
            },
            curso: {
                describe: 'curso del estudiante',
                demand: true,
                alias: 'c'
            },
            nivel: {
                describe: 'nivel del curso tomado',
                demand: true,
                alias: 'ni'
            }
        },
        (args) => {   

            pool.connect((err, client, release) => {

                let estudianteEditado = {};

                const queryObj1 = {
                    name: 'editName-user',
                    text: `update estudiantes set nombre = $1 where rut = $2 RETURNING *;`,
                    values: [`${args.nombre}`, `${args.rut}`],
                    rowMode: 'array'
                }

                client.query(
                    queryObj1 ,(err, data) => {
                        if (err) {   
                            console.log('index.js - editar estudiante nombre - ' + err);
                        } else {
                            estudianteEditado.nombre = args.nombre;                
                        }
                });

                const queryObj2 = {
                    name: 'editCourse-user',
                    text: `update estudiantes set curso = $1 where rut = $2 RETURNING *;`,
                    values: [`${args.curso}`, `${args.rut}`],
                    rowMode: 'array'
                }

                client.query(
                    queryObj2,(err, data) => {
                        if (err) {   
                            console.log('index.js - editar estudiante curso - ' + err);
                        } else {
                            estudianteEditado.curso = args.curso;                
                        }
                });

                const queryObj3 = {
                    name: 'editLevel-user',
                    text: `update estudiantes set nivel = $1 where rut = $2 RETURNING *;`,
                    values: [`${args.nivel}`, `${args.rut}`],
                    rowMode: 'array'
                }

                client.query(
                    queryObj3 ,[`${args.nivel}`, `${args.rut}`] ,(err, data) => {
                        if (err) {   
                            console.log('index.js - editar estudiante nivel - ' + err);
                        } else {
                            estudianteEditado.nivel = args.nivel;                
                        }

                        console.log('Registro editado: ' + args.rut);
                        for (campo in estudianteEditado) {
                            console.log(`${campo} : ${estudianteEditado[campo]}`);

                        }

                        release();
                });

                pool.end();

            });
        }
    )

    // 6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
    .command(
        'eliminar',
        'elimina a un estudiante',
        { 
        rut: {
            describe: 'rut estudiante',
            demand: true,
            alias: 'r'
            }
        },
        (args) => {   

            pool.connect((err, client, release) => {

                const queryObj = {
                    name: 'delete-user',
                    text: `delete from estudiantes where rut = $1`,
                    values: [`${args.rut}`],
                    rowMode: 'array'
                }

                client.query(
                    queryObj, (err, data) => {
                        if (err) {
                            console.log('index.js - eliminar estudiante - ' + err);
                        } else {
                            console.log('estudiante eliminado : ' + args.rut);       
                        }
                        release();
                });

                pool.end();

            });
        }
    )
    .help().argv;