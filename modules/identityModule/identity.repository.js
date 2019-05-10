const User = require('./../../models/User');

exports.createUser = user => {
  return User.create(user);
};
exports.findUserByUsername = username => {
  console.log(username);
  return User.findOne({
    where: { username: username }
  });
};
exports.checkUserIsAdmin = username => {
  return User.findOne({
    attributes: ['isAdmin'],
    where: { username: username }
  });
};
