/**
● El sistema debe permitir registrar nuevos participantes.
● Se debe crear una vista para que los participantes puedan iniciar sesión con su
correo y contraseña.
● Luego de iniciar la sesión, los participantes deberán poder modificar sus datos,
exceptuando el correo electrónico y su foto. Esta vista debe estar protegida con JWT
y los datos que se utilicen en la plantilla deben ser extraídos del token.
● La vista correspondiente a la ruta raíz debe mostrar todos los participantes
registrados y su estado de revisión.
● La vista del administrador debe mostrar los participantes registrados y permitir
aprobarlos para cambiar su estado

1. Crear una API REST con el Framework Express (3 Puntos)
2. Servir contenido dinámico con express-handlebars (3 Puntos)
3. Ofrecer la funcionalidad Upload File con express-fileupload (2 Puntos)
4. Implementar seguridad y restricción de recursos o contenido con JWT (2 Puntos)

*/

const express = require ('express');
const app = express();

const exphbs = require ('express-handlebars');
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));

const {Pool} = require ('pg');
const pool = new Pool({
    user: 'rabarza',
    host: '93.188.167.75',
    password: 'richard.69',
    database: 'desafios',
    port: '5432'
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

app.listen(3000, () => {
    console.log('escuchando puerto 3000');
});

app.use('', express.static(__dirname + '/assets'));
const fs = require ('fs');
const expressFileUpload = require ('express-fileupload');
app.use(expressFileUpload({
    limit: {filesize: 5000000},
    abortOnLimit : true,
    responseOnLimit: 'El peso del archivo es superior al permitido de 5mb'
}));

const superPass = 'clavesecreta';

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

app.get(['/', '/login'], (req, res) => {
    // quiero mostrar un trozo de html (login) dentro de una plantilla (index)
    res.render('login', {
        layout : 'index',
        messaje : req.query.messaje
    });
});

app.get('/registro', (req, res) => {
    res.render('registro', {
        layout : 'index'
    });
});

app.post('/registro', async (req, res) => {
    const {img} = req.files;
    const params = req.body;
    const name = `skater-${params.name}-${params.especiality}`;

    // validacion si falta algun campo
    if(!params.email || !params.name || !params.password1 || !params.password2 || !params.anios || !params.especiality || !img){
        res.render('registro', {
            layout : 'index',
            messaje: 'Debe completar todos los campos'
        });
    } else {

        const isEmail = await pool.query('select from skaters where email = $1', [`${req.body.email}`]);
    
        // valida si ya existe un usuario con el mismo email
        if (isEmail.rowCount > 0){
            res.render('registro', {
                layout : 'index',
                messaje: 'Usuario ya registrado'
            });
        // valida si ambas contraseñas son iguales    
        } else if (req.body.password1 != req.body.password2){
            res.render('registro', {
                layout : 'index',
                messaje: 'Ambas claves deben coincidir'
            });
        } else {

            const token = jwt.sign({email: params.email, password: params.password1}, superPass);

            const imgDirectory = `${__dirname}/assets/img/${name}.jpg`; 
            await img.mv(`${imgDirectory}`, (err) => {});
            
            try {
                const signUser = await pool.query('insert into skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', [`${params.email}`, `${params.name}`, `${token}`, params.anios, `${params.especiality}`, `${imgDirectory}`, false]);
            } catch (error) {
                console.log('error: ' + error);
            }
            
            res.redirect('/?messaje=Usuario registrado correctamente. Por favor inicie sesión');

        };
    };

});

app.post('/login', (req, res) => {

    const params = req.body;

    if(!params.email || !params.password){
        res.redirect('/?messaje=debe completar los campos');
        return;
    };

    pool.query('select password from skaters where email = $1', [`${params.email}`], (err, data) => {
        if (err) console.log('error al iniciar sesión : ' + err);

        const userToken = data.rows[0].password;

        jwt.verify(userToken, superPass, (err, data) => {
        if (err) console.log('error al descodificar pass : ' + err); 
            if (data.password === params.password){
                
                localStorage.setItem('token',userToken);

                res.redirect('/dashboard');

            }else {
                res.redirect('/?messaje=Usuario o clave incorrectos');
            };
        });

    });

});

app.get('/dashboard', (req, res) => {
    const token = localStorage.getItem('token');
    if (token){
        jwt.verify(token, superPass, (err, data) => {
            if (err) {
                console.log('error al validar el token: ' + err);
                res.redirect('/?messaje=Usuario sin permiso para acceder, contacte con administracion del sitio');
            } else {
                res.render('dashboard', {layout: 'index'});
            }
        });
    } else {
        res.redirect('/?messaje=Debe iniciar sessión para acceder');
    };
});

app.get('/logout', (req, res) => {
    const token = localStorage.getItem('token');
        if (token){
            localStorage.removeItem('token');
        };
        res.redirect('/?messaje=sessión finalizada');
});