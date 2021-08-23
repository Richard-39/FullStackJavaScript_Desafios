const http = require('http');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid')
const chalk = require('chalk');
const moment = require('moment');
const _ = require ('lodash');


let userList = [];
var count = 1;

http.createServer((req, res) => {
   
    if (req.url.includes('/users')){

        let getUser = async () => {
            for (i = 0; i<7; i++){
            
                let query = await axios.get("https://randomuser.me/api/")
                userList.push({
                    name: `${query.data.results[0].name.first}`,
                    last: `${query.data.results[0].name.last}`,
                    date: `${moment()}`,
                    id: `${uuidv4().slice(0,6)}`
                });
            }

            _.partition(userList, (element, num) => {
                res.write(`${count}. Nombre: ${element.name} - Apellido: ${element.last} - ID: ${element.id} - Timestamp: ${element.date}\n`);
                console.log(chalk.blue.bgWhite(`${count}. Nombre: ${element.name} - Apellido: ${element.last} - ID: ${element.id} - Timestamp: ${element.date}`));
                count ++;
            });

            /*userList.forEach((element, num) => {
                res.write(`${num +1}. Nombre: ${element.name} - Apellido: ${element.last} - ID: ${element.id} - Timestamp: ${element.date}\n`);
                console.log(chalk.blue.bgWhite(`${num +1}. Nombre: ${element.name} - Apellido: ${element.last} - ID: ${element.id} - Timestamp: ${element.date}\n`));
            });*/

            res.end();
        }
    
        getUser();

    }
    

}).listen(8080, () => {
    console.log('Esuchando el puerto 8080');
});