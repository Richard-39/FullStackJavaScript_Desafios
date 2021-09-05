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
    node index.js nuevo -n=ricardo -r='17.456.852-6' -c=piano --ni=1

consulta por rut
    node index.js rut -r='17.456.852-6'

consulta por todos los estudiantes
    node index.js consulta 

editar estudiante (no se puede cambiar el rut por inconsistencia de la solicitud del ejercicio)
    node index.js editar -n='ricardo abarza' -r='17.456.852-6' -c=guitarra --ni=6

eliminar estudiante
    node index.js eliminar -r='17.456.852-6'
*/

const {Client} = require('pg');
const yargs = require ('yargs');

// 1. Realizar la conexión con PostgreSQL con la clase Client.
// UTILIZAR DATOS DE CONEXION A SU BASE DE DATOS - ESTOS DATOS NO SON USABLES DESDE CUALQUIER PC
const config = {
    user: 'rabarza',
    host: '93.188.167.75',
    database: 'desafios',
    password:'richard.69',
    port: '5432'
}

const client = new Client(config);

client.connect();

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
            
            client.query(
                `insert into estudiantes (nombre, rut, curso, nivel) values ($1, $2, $3, $4) RETURNING *;`,[`${args.nombre}`, `${args.rut}`, `${args.curso}`, `${args.nivel}`] ,(err, data) => {
                    if (err) {
                        console.log('index.js - nuevo estudiante - ' + err);
                    } else {
                        console.log('Registro agregado: ' + data);                 
                    }
                    client.end();
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
            
            client.query(
                `select * from estudiantes where rut=$1;`,[`${args.rut}`] ,(err, data) => {
                    if (err) {
                        console.log('index.js - buscar por rut - ' + err);
                    } else {
                        console.log('Registro encontrado: ');
                        for (estudiante of data.rows){
                            console.log(estudiante);
                        }         
                    }
                    client.end();
            });
        }
    )

    // 4. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
    .command(
        'consulta',
        'muestra todos los estudiantes',
        {},
        (args) => {   
            
            client.query(
                `select * from estudiantes`, (err, data) => {
                    if (err) {
                        console.log('index.js - consulta todos los estudiantes - ' + err);
                    } else {
                        console.log('Registros encontrados: ');
                        for (estudiante of data.rows){
                            console.log(estudiante);
                        }         
                    }
                    client.end();
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
            
            let estudianteEditado = {};
            client
                .query(
                `update estudiantes set nombre = $1 where rut = $2 RETURNING *;`,[`${args.nombre}`, `${args.rut}`] ,(err, data) => {
                    if (err) {   
                        console.log('index.js - editar estudiante nombre - ' + err);
                    } else {
                        estudianteEditado.nombre = args.nombre;                
                    }
                });
            client
                .query(
                `update estudiantes set curso = $1 where rut = $2 RETURNING *;`,[`${args.curso}`, `${args.rut}`] ,(err, data) => {
                    if (err) {   
                        console.log('index.js - editar estudiante curso - ' + err);
                    } else {
                        estudianteEditado.curso = args.curso;                
                    }
                });
            client
                .query(
                `update estudiantes set nivel = $1 where rut = $2 RETURNING *;`,[`${args.nivel}`, `${args.rut}`] ,(err, data) => {
                    if (err) {   
                        console.log('index.js - editar estudiante nivel - ' + err);
                    } else {
                        estudianteEditado.nivel = args.nivel;                
                    }
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
            
            client.query(
                `delete from estudiantes where rut = $1`, [`${args.rut}`], (err, data) => {
                    if (err) {
                        console.log('index.js - eliminar estudiante - ' + err);
                    } else {
                        console.log('estudiante eliminado : ' + args.rut);       
                    }
                    client.end();
            });
        }
    )
    .help().argv;