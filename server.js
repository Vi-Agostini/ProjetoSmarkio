const express = require('express');
const app = express();


var bodyParser = require('body-parser');

global.__basedir = __dirname;

const db = require('./app/config/db.config.js');

// Apaga os dados caso já exista o bd
db.sequelize.sync({ force: false }).then(() => {
  console.log('Banco de dados ok!');
});

let router = require('./app/routers/router.js');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('resources'));

app.use('/', router);

// Cria o servidor
const server = app.listen(8080, function () {

  let host = server.address().address
  let port = server.address().port

  console.log("Escutando em http://%s:%s", host, port);
})