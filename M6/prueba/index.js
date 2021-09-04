const http = require ('http');
const { v4: uuidv4 } = require('uuid')
const url = require ('url');
const fs = require ('fs');
const getRandomUser = require('./getRandomUser.js');

http.
    createServer((req, res) => {

        if (req.url == '/'){
            // Debe devolver el documento HTML disponibilizado en el apoyo.
            res.writeHead(200, {'Content-Type' : 'text/html'});
            fs.readFile('index.html', 'utf-8', (err, html)=>{
                res.end(html);
            })            
        };

        if (req.url.startsWith('/roommates') && req.method == 'GET') {
            // Devuelve todos los roommates almacenados. Devuelve todos los roommates almacenados en el servidor (roommates.json)
            fs.readFile('roommates.json', 'utf-8', (err, JsonInfo) => {
                res.end(JsonInfo);
            })
        };

        if (req.url.startsWith('/roommate') && req.method == 'POST') {
            // Almacena un nuevo roommate ocupando random user
      
            getRandomUser().then((req) => {

                let randomUser = req.data.results[0];

                if (!fs.existsSync('roommates.json')) {
                    let data = {
                        roommates: []
                    };
                    fs.writeFileSync('roommates.json', JSON.stringify(data));
                }
        
                let roomate = {
                    id: uuidv4().slice(0,6),
                    nombre: randomUser.name.first + ' ' + randomUser.name.last,
                    correo: randomUser.email,
                    debe: '0',
                    recibe: '0'
                }

                fs.readFile('roommates.json', 'utf8', (err, JsonInfo)=>{
                    let data = JSON.parse(JsonInfo);
                    data.roommates.push(roomate);
                    fs.writeFile('roommates.json', JSON.stringify(data), (err, data)=> {});

                    recarcularGastos ();

                    res.end();
                })
            });
        };

        if (req.url.startsWith('/gastos') && req.method == 'GET') {
            //  Devuelve todos los gastos almacenados en el archivo gastos.json.
            fs.readFile('gastos.json', 'utf-8', (err, data) => {
                res.end(data);
            });
        }

        if (req.url.startsWith('/gasto') && req.method == 'POST') {
            // Recibe el payload con los datos del gasto y los almacena en un archivo JSON (gastos.json).

            let body;

            req.on('data', (payload) => {
                body = JSON.parse(payload);
            });

            req.on('end', () => {
                
                if (!fs.existsSync('gastos.json')) {
                    let data = {
                        gastos: []
                    };
                    fs.writeFileSync('gastos.json', JSON.stringify(data));
                }
    
                fs.readFile('gastos.json', 'utf-8', (err, jsonInfo)=>{
                    let data = JSON.parse(jsonInfo);
                    data.gastos.push({
                        id: uuidv4().slice(0,6),
                        roommate: body.roommate,
                        descripcion: body.descripcion,
                        monto: Number(body.monto) 
                    });
                    fs.writeFile('gastos.json', JSON.stringify(data), (err, data) => {});

                    recarcularGastos();

                    res.end();
                });
    
            });

        }

        if (req.url.startsWith('/gasto') && req.method == 'PUT') {
            // Edita los datos de un gasto. Recibe el payload de la consulta y modifica los datos Almacenados en el servidor (gastos.json).
            
            let body;
            req.on('data', (payload) => {
                body = JSON.parse(payload);
            });

            req.on('end', ()=>{
                
                fs.readFile('gastos.json', 'utf-8', (err, infoJson) => {
                    let data = JSON.parse(infoJson);

                    data.gastos = data.gastos.map((g) => {
                        if (g.id == body.id){
                            return body;
                        }
                        return g;

                    });

                    fs.writeFile('gastos.json', JSON.stringify(data), (err, data) => {});

                    recarcularGastos();
                    res.end();
                }); 
            });
        }

        if (req.url.startsWith('/gasto') && req.method == 'DELETE') {
            // Elimina un gasto del historial. Recibe el id del gasto usando las Query Strings y la elimine del historial de gastos (gastos.json).
            
            const params = url.parse(req.url, true).query;
            
            fs.readFile('gastos.json', 'utf-8', (err, infoJson) => {
                let data = JSON.parse(infoJson);

                data.gastos = data.gastos.filter((g) => g.id !== params.id);

                fs.writeFile('gastos.json', JSON.stringify(data), (err, data) => {});

                recarcularGastos();
                res.end();
            });
        }

        function recarcularGastos () {

            fs.readFile('gastos.json', 'utf-8', (err, infoJson) => {
                let data = JSON.parse(infoJson);

                let gastoTotal = data.gastos.reduce((a, c) => {
                    return +a + c.monto;
                }, 0);

                console.log();

                let roommatesJson = JSON.parse(fs.readFileSync('roommates.json', 'utf-8'));

                let montoByRoommate = gastoTotal / roommatesJson.roommates.length;

                roommatesJson.roommates = roommatesJson.roommates.map((r) => {
                    let gastoByRoommate = data.gastos.reduce((a, g) => {
                        if (g.roommate == r.nombre) {
                            return a + g.monto;
                        } else {return a + 0};
                    }, 0);
                    
                    let dif = gastoByRoommate - montoByRoommate;

                    if (dif > 0){
                        r.debe = 0;
                        r.recibe = Math.round(dif);
                    } else {
                        r.debe = Math.round(Math.abs(dif));
                        r.recibe = 0;
                    }
                    return r;
                });

                fs.writeFileSync('roommates.json', JSON.stringify(roommatesJson));
            });
        }
    })
    .listen(3000, () => {
        console.log('Escuchando puerto 3000');
    });



/*

2. Capturar los errores para condicionar el código a través del manejo de excepciones.
(1 Punto)

5. Devolver los códigos de estado HTTP correspondientes a cada situación. (1 Punto)

6. Enviar un correo electrónico a todos los roommates cuando se registre un nuevo
gasto. Se recomienda agregar a la lista de correos su correo personal para verificar
esta funcionalidad. (Opcional)
*/