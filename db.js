const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('Vetime1', 'root', '', {
  host: 'localhost', // process.env.HOST
  dialect: 'mysql',
});

module.exports = sequelize;
