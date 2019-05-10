const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

class User extends Sequelize.Model {}
User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [6, 15]
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        isIn: [[true, false, undefined, '']]
      }
    }
  },
  { sequelize, modelName: 'user' }
);
module.exports = User;
/*
#client_id :
		*user_id :
		user_name :
		user_password :
		user_is_admin :
		current_no_of_active_login_sessions :
*/
