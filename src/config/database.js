const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('back_constructor_chatbot', 'postgres', 'postgresql', {
  host: 'localhost',
  port: 5433,
  dialect: 'postgres'
});

async function testConexion(){
    try {
        await sequelize.authenticate();
        console.log('CONEXION CORRECTA CON BD...');
    } catch (error) {
        console.error('ERROR DE CONEXION CON BD: ', error);
    }
}
testConexion();

module.exports = sequelize;