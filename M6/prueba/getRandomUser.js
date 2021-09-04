const axios = require('axios');

function getRandomUser(){
    return new Promise((req, rej) => {
        req(axios.get('https://randomuser.me/api'));
    });
}

module.exports = getRandomUser;