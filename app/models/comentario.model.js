//Modelo para os comentários a serem armazenados no BD 
module.exports = (sequelize, Sequelize) => {
	const Comentario = sequelize.define('comentario', {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		conteudo: {
			type: Sequelize.STRING
		},
	});

	return Comentario;
}