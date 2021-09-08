/**
 * COMANDOS
 * 
 * 1. REALIZAR TRANSACCION
 *  node index.js transaccion -d='arriendo' -m=250000 -c=1
 * 
 * 2. CONSULTAR TRANSACCIONES DE UNA CUENTA
 *  node index.js consulta -c=1
 * 
 * 3. CONSULTAR SALDO DE CUENTA
 *  node index.js saldo -c=1 
 * 
 *  PREPARACIONES DE LA BD
 * 
 *  editar el archivo de config para conectarse a la bd
 *  crear una bd y una tabla. Luego ejecutar las siguientes instrucciones sql
 *  
 *  create table transacciones (descripcion varchar(50), fecha varchar(10), monto decimal, cuenta int)
 *  create table cuentas (id int, saldo decimal check (saldo >= 0) );
 *  insert into cuentas values (1, 20000);   
 *
 */

const { Console } = require('console');
const { Pool } = require('pg');
const Cursor = require('pg-cursor');
const yargs = require('yargs');

const config = {
    user: '',
    host: '',
    password: '',
    database: '',
    port: ''
}

const pool = new Pool(config);

const argv = yargs
/*1. Crear una función asíncrona que registre una nueva transacción utilizando valores ingresados 
como argumentos en la línea de comando. Debe mostrar por consola la última transacción realizada.*/
    .command(
        'transaccion',
        'ingresar nueva transaccion',
        {
            descripcion: {
                describe: 'glosa de la transaccion',
                demand: true,
                alias: 'd'
            },
            monto: {
                describe: 'cantidad de la transaccion',
                demand: true,
                alias: 'm'
            },
            cuenta: {
                describe: 'destino de la transaccion',
                demand: true,
                alias: 'c'
            }
        },
        (args) => {

            pool.connect(async (err, client, release) => {
                try {

                    await client.query('BEGIN');

                    let fecha = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
                    
                    const addTransaction = new Cursor(
                        `insert into transacciones (descripcion, fecha, monto, cuenta) values ($1, $2, $3, $4) RETURNING *;`, [`${args.descripcion}`, `${fecha}`, `${args.monto}`, `${args.cuenta}`]);                    
                    const cursor = client.query(addTransaction);

                    const updateAccount = new Cursor(
                        `update cuentas set saldo = saldo + $1 where id = $2 RETURNING *;`, [`${args.monto}`, `${args.cuenta}`]);                    
                    const cursor2 = client.query(updateAccount);

                    await cursor.read(10, (err, rows) => {
                
                        if (err) {
                            console.log(err);
                        }
                        console.log(rows);
                        
                        cursor.close();
                    });

                    await cursor2.read(10, (err, rows) => {
                
                        if (err) {
                            console.log('error: ' + err);
                        }
                        console.log(rows);
                        
                        cursor.close();
                    });
                    
                    await client.query('COMMIT');
                    
                    release();
                    pool.end();
                    
                } catch (error) {
                    console.log('index.js - transaccion: ' + error);
                    await client.query('ROLLBACK');
                    
                }

            });
        }
    )

    /** Realizar una función asíncrona que consulte la tabla de transacciones y retorne
        máximo 10 registros de una cuenta en específico. Debes usar cursores para esto. */
    .command(
        'consulta',
        'muestra los 10 registros de una cuenta en especifico',
        {
            cuenta:{
                describe: 'numero cuenta a consultar',
                demand:true,
                alias: 'c'
            }
        },
        (args) => {

            try {

                pool.connect((err, client, release) => {
                    const consulta = new Cursor('select * from transacciones where cuenta = $1', [`${args.cuenta}`]);
                    const cursor = client.query(consulta);
    
                    cursor.read(10, (err, rows) => {
    
                        if (err) {
                            console.log('index.js - consulta' + err);
                        }
    
                        console.log(rows);
    
                        cursor.close();
                        release();
                        pool.end();
                    });
                });
                
            } catch (error) {

                console.log('error al intentar hacer la consulta - index.js - consulta: ' + error);
                
            }
        }
    )

    /** 3. Realizar una función asíncrona que consulte el saldo de una cuenta y que sea
        ejecutada con valores ingresados como argumentos en la línea de comando. Debes
        usar cursores para esto.*/

    .command(
        'saldo',
        'consulta el saldo de una cuenta en especifico',
        {
            cuenta:{
                describe: 'numero cuenta a consultar',
                demand: true,
                alias: 'c'
            }
        },
        (args) => {

            try {

                pool.connect((err, client, release) => {
                    const consulta = new Cursor('select * from cuentas where id = $1', [`${args.cuenta}`]);
                    const cursor = client.query(consulta);
    
                    cursor.read(10, (err, rows) => {
    
                        if (err) {
                            console.log('index.js - saldo' + err);
                        }
    
                        console.log(rows);
    
                        cursor.close();
                        release();
                        pool.end();
                    });
                });
                
            } catch (error) {

                console.log('error al intentar hacer la consulta - index.js - saldo: ' + error);
                
            }
        }
    )
    .help().argv;




