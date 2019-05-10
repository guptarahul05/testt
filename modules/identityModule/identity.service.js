const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const identityRepo = require('./identity.repository');
const dbErrorResponseGenerator = require('../../utils/SequelizeErrorResponseGenerator');
exports.registerUser = async userObj => {
  userObj.password = bcrypt.hashSync(userObj.password, 8);
  let user = {};
  try {
    user = await identityRepo.createUser(userObj);
    const token = jwt.sign({ id: user.username }, 'hi', {
      expiresIn: 86400
    });
    return { isSuccessful: true, token: token };
  } catch (e) {
    const error = dbErrorResponseGenerator(e);
    return { isSuccessful: false, error: error };
  }
};
exports.login = async (username, hashedPassword) => {
  const user = await identityRepo.findUserByUsername(username);
  if (user) {
    const passwordIsValid = bcrypt.compareSync(hashedPassword, user.password);
    if (passwordIsValid) {
      const token = jwt.sign({ id: user.username }, 'hi', {
        expiresIn: 86400
      });
      return { isSuccessful: true, body: { token: token } };
    } else {
      return {
        isSuccessful: false,
        error: { path: 'password', msg: 'password incorrect' }
      };
    }
  } else {
    return {
      isSuccessful: false,
      error: {
        path: 'username',
        msg: 'username and password combination not matching'
      }
    };
  }
};
exports.checkUserisAdmin = async username => {
  const user = await identityRepo.checkUserIsAdmin(username);
  if (user) {
    console.log(user.isAdmin);
    return user.isAdmin;
  } else {
    return false;
  }
};
