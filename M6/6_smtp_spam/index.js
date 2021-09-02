const nodemailer = require('nodemailer');
const http = require('http');
const url = require ('url');
const fs = require ('fs');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid')

function enviar(to, subject, html){
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            // FAVOR COMPLETAR CON LOS DATOS DE CORREO
            user: '',
            pass: ''
        }
    });

    let mailOptions = {
        from: 'richardonfire69@gmail.com',
        to,
        subject,
        html
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) console.log(err);
        if (data) {
            console.log('Correo enviado exitosamente: ');
            console.log(data);
        }
    });
}

http
    .createServer((req, res) => {

        if (req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile('index.html', 'utf-8', (err, html) => {
                res.end(html);
            });
        }

        if (req.url.startsWith('/mailing')){
            const params = url.parse(req.url, true).query;

            const promesa = new Promise((req, rej) => {
                req(axios.get('https://mindicador.cl/api'));

            });

            promesa.then((arg) => {

                let dolar = arg.data.dolar.valor;
                let uf = arg.data.uf.valor;
                let euro = arg.data.euro.valor;
                let utm = arg.data.utm.valor;

                let text = params.contenido + `<p>El valor del dolar es: ${dolar}</p><p>El valor de la uf es: ${uf}</p><p>El valor del euro es: ${euro}</p><p>El valor del utm es: ${utm}</p>`;

                let idCorreo = uuidv4().slice(0,6);
                fs.writeFile('correos/'+ idCorreo, text, (err, data) => {
                    console.log('Archivo guardado.');
                });

                enviar(params.correos.split(','), params.asunto, text);
                res.end();

            });

        }

    })
    .listen(3000, () => {
    console.log('Escuchando puerto 3000');
});