const http = require('http');
const yargs = require('yargs');
const fs = require('fs');
const url = require('url');
const jimp = require('jimp');

const startServer = () => {
    http.createServer((req, res) => {

        if (req.url == '/') {
            res.writeHead(200, {'Content-Type': 'text/html'});
            fs.readFile('index.html', 'utf-8', (err, html) => {
                res.end(html);
            });
        }

        if (req.url == '/estilos'){
            res.writeHead(200, {'Content-Type' : 'text/css'});
            fs.readFile('style.css', 'utf-8', (err, css) => {
                res.end(css);
            });
        }
    
        if (req.url.startsWith('/img')){
            const params = url.parse(req.url, true).query;
            
            jimp.read(params.url, (err, img) => {
                img
                    .resize(350, jimp.AUTO)
                    .grayscale()
                    .quality(60)
                    .writeAsync('newImg.jpg')
                    .then(() => {
                        fs.readFile('newImg.jpg', (err, img) => {
                            res.writeHead(200, {'Content-Type':'image/jpg'});
                            res.end(img);
                        });
                });
            });
        }
    })
        .listen(8080, ()=>{
        console.log('Esuchando el puerto 8080');
    });
}

const argv = yargs
    .command(
        'acceso',
        'clave acceso al sistema',
        {
            key:{
                describe:'argumento ingresar la clave',
                demand: true,
                alias: 'k'
            }
        },
        (args) => {
            if (args.key == '123') {
                startServer(); 
            }
        }
    ).help().argv;


// imagen de prueba
// https://lh3.googleusercontent.com/proxy/_DSA7k9c13EHssfBJ0m63UGhh2GsyoEOo6k_9TRR7ORGSf6NYk2dcK9glN6W2i4Zuqr5S3FL7WEfqesbm7jIpbn63vccxWDKkZ1dY7AgW8dBKU9otZCjuWRaTVjt1lrvVFva3LrAX3-tvYVVxNuEDm1kHbkg-jLCH6ny3H1B358isvLjVdPBqM60oKR7IHDACfhYX9nXjt_-orj2SNk0cP-dTQw8jDIaaaCY