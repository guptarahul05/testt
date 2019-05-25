const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

class SessionPage extends Sequelize.Model {}

SessionPage.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    pageNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cellCount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    pageRawJson: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    pageUpdatedJson: Sequelize.TEXT,

    errorJson: Sequelize.TEXT,
    errorCount: Sequelize.INTEGER,
    modeOfOperation: Sequelize.ENUM('1', '2', '3')
  },
  { sequelize, modelName: 'sessionpage' }
);

module.exports = SessionPage;
