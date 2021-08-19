const fs = require('fs');
const child_process = require('child_process');

const args = process.argv.slice(2);

let name = args[0];
let extension = args[1];
let indicator = args[2];
let pesos = args[3];

let price;

const promise = new Promise ((resolve) => {
    child_process.exec(`node converter.js ${indicator} ${pesos}`, (err, result) => {
        resolve(result);
    });
});

promise.then((result) => {
    price = result;

    fs.writeFile(`${name}.${extension}`, `${price}`, 'utf-8', () => {
        fs.readFile(`${name}.${extension}`, 'utf-8', (err, data) => {
            console.log(data);
        });
        
    });
});