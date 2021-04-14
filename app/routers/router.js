//Sistema de rotas. Se necessário é posssível criar outras
let express = require('express');
let router = express.Router();

const comentarios = require('../controllers/controller.js');

let path = __basedir + '/view/';

router.get('/', (req, res) => {
    console.log("__basedir" + __basedir);
    res.sendFile(path + "index.html");
});



router.post('/api/comentario/create', comentarios.create);
router.get('/api/comentario/retrieveinfos', comentarios.retrieveInfos);

module.exports = router;