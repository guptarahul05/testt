const User = require('./../../models/User');
const Sequelize = require('sequelize');

exports.createUser = user => {
  return User.create(user);
};
exports.findUserByUsername = username => {
  console.log(username);
  return User.findOne({
    where: { username: username }
  });
};
exports.updateActiveLoginOnLogin = username => {
  return User.update(
    { activeLogin: Sequelize.literal(`activeLogin + 1`) },
    { where: { username: username } }
  );
};
exports.updateActiveLoginOnLogout = username => {
  return User.update(
    { activeLogin: Sequelize.literal(`activeLogin - 1`) },
    { where: { username: username } }
  );
};
exports.checkUserIsAdmin = username => {
  return User.findOne({
    attributes: ['isAdmin'],
    where: { username: username }
  });
};
exports.test = a => {
  return User.bulkCreate();
};
// drop table sessions;
// drop table users;
