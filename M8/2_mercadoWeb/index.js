const express = require ('express');
const app = express();
const exphbs = require('express-handlebars');

app.listen(3000, ()=>{
    console.log('escuchando puerto 3000');
})

app.set('view engine', 'handlebars');

app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views',
    partialsDir: __dirname + '/views/componentes'
}));

/** 5. Consumir los códigos fuentes de Bootstrap y jQuery a través de rutas o middlewares
creados en el servidor. Estas dependencias deben ser instaladas con NPM. */

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/assets', express.static(__dirname + '/assets'));

/* 1. Crear una ruta raíz que al ser consultada renderice una vista con un parcial
“Dashboard” enviándole en el render un arreglo con los nombres de los productos. Se
recomienda que estos coincidan con las imágenes de cada producto. */

app.get('/', (req, res)=>{
    res.render('main', {
        objeto : {banana: '/assets/banana.png', cebollas: '/assets/cebollas.png', lechugas: '/assets/lechuga.png', papas: '/assets/papas.png', pimenton: '/assets/pimenton.png', tomate: '/assets/tomate.png'}   
    });
});

