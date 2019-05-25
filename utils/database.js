const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-server', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: true
  },
  timezone: '+05:30'
});

module.exports = sequelize;
