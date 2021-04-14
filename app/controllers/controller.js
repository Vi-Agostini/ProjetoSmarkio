const db = require('../config/db.config.js');
const Comentario = db.Comentario;
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({ apikey: 'B3RoggXFp8qUhag_zxbZiuwecFNDgXq7Fo6oPkFE6F5F' }),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/03722381-4cee-4a7f-92ae-31efbba0c881'
  });
  

/**
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {

    let comentario = {};

    try {
        // Construção do objeto do comentário
        comentario.conteudo = req.body.conteudo;

        Comentario.create(comentario).then(result => {
            res.status(200).json({
                message: "Comentário adicionado com sucesso!",
                comentario: result
            });
            var params = {
                text: comentario.conteudo,
                voice: 'pt-BR_IsabelaVoice', // Optional voice
                accept: 'audio/wav'
              };
              
              textToSpeech.synthesize(params)
              .then(response => {
                const audio = response.result;
                return textToSpeech.repairWavHeaderStream(audio);
              })
              .then(repairedFile => {
                fs.writeFileSync('public/'+comentario.conteudo+'-ler.wav', repairedFile);
                console.log('Audio criado com sucesso!');
              })
              .catch(err => {
                console.log(err);
              });
        });
        
    } catch (error) {
        res.status(500).json({
            formdata: comentario,
            error: error.message
        });
    }
}

/**
 * @param {*} req 
 * @param {*} res 
 */
exports.retrieveInfos = (req, res) => {
    // Recupera os comentários
    try {
        Comentario.findAll({ attributes: ['id', 'conteudo'] })
            .then(comentarioInfos => {
                res.status(200).json({
                    comentarioInfos: comentarioInfos
                });
            })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error
        });
    }

}

