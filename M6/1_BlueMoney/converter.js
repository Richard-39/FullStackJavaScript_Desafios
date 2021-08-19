const args = process.argv.slice(2);
const https = require('https');

let indicatorData;

let indicator = args[0];
let pesos = args[1];
let convertedData;
let result;

https.get('https://mindicador.cl/api', (resp) => {

    resp.on('data', (data) => {
        indicatorData = JSON.parse(data);
        sendResult(indicatorData[indicator].valor);
    });

}).on('error', (err)=>{
    console.log('Error: ' + err.message);
});

const sendResult = (indicatorValue) => {
    convertedData = (pesos / indicatorValue).toFixed(2);
    result = `A la fecha: ${new Date()} \nFue realizada cotización con los siguientes datos: \nCantidad de pesos a convertir: ${pesos} pesos \nConvertido a "${indicator}" da un total de: $${convertedData}.`

console.log(result);
};

