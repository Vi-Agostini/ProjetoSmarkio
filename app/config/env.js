//Dados necessários para a conexão com o BD
const env = {
  database: 'comentariosdb',
  username: 'root', //insira aqui o usuário que vai acessar o banco de dados
  password: '1234', //insira aqui a senha
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;