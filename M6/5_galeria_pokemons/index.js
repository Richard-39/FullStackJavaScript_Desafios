const http = require('http');
const axios = require('axios');

http
    .createServer((req, res) => {
      
        if (req.url == '/pokemones'){

            let arrayPromesas = [];

            for (i=1; i<=150; i++) {
                const promesa = new Promise((req, rej) => {
                    req(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
                });
                arrayPromesas.push(promesa);
            };

            Promise.all(arrayPromesas)
                .then((resultado) => {

                    const allInfo = [];

                    resultado.forEach((e)=>{

                        allInfo.push({
                            nombre: e.data.name,
                            img:e.data.sprites.front_default
                        });
                    });
                    res.write(JSON.stringify(allInfo));
                    res.end();
                })
        }

    })
    .listen(3000, ()=>{
    console.log('Escuchando el puerto 3000');
});