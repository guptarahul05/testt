const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const identityRepo = require('./identity.repository');
const dbErrorResponseGenerator = require('../../utils/SequelizeErrorResponseGenerator');
exports.registerUser = async userObj => {
  /**
   * @TODO remove before deployment
   */
  // userObj.password = bcrypt.hashSync(userObj.password, 8);
  let user = {};
  try {
    user = await identityRepo.createUser(userObj);
    const token = jwt.sign({ username: user.username, userId: user.id }, 'hi', {
      expiresIn: 86400
    });
    return {
      isSuccessful: true,
      token: token,
      activeLogin: user.activeLogin
    };
  } catch (e) {
    const error = dbErrorResponseGenerator(e);
    return { isSuccessful: false, error: error };
  }
};
exports.login = async (username, password) => {
  const user = await identityRepo.findUserByUsername(username);
  if (user && user.activeLogin < 2) {
    /**
     * @TODO remove before deployment
     */
    // const passwordIsValid = bcrypt.compareSync(password, user.password);
    const passwordIsValid = password === user.password ? true : false;
    if (passwordIsValid) {
      const updateActiveLogin = await identityRepo.updateActiveLoginOnLogin(
        username
      );
      if (updateActiveLogin[0]) {
        const token = jwt.sign(
          { username: user.username, userId: user.id },
          'hi',
          {
            expiresIn: 86400
          }
        );
        return {
          isSuccessful: true,
          body: { token: token, activeLogin: user.activeLogin + 1 },
          status: 200
        };
      } else {
        return {
          isSuccessful: false,
          error: { path: 'login', msg: 'Error in update active login' }
        };
      }
    } else {
      return {
        isSuccessful: false,
        error: { path: 'password', msg: 'password incorrect' },
        status: 200
      };
    }
  } else {
    if (!user) {
      return {
        isSuccessful: false,
        error: {
          path: 'username',
          msg: 'username and password combination not matching'
        },
        status: 200
      };
    } else if (user.activeLogin >= 2) {
      return {
        isSuccessful: false,
        error: {
          path: 'max_login',
          msg: 'Maximum login Reached'
        },
        status: 200
      };
    }
  }
};

exports.logout = async username => {
  try {
    const user = await identityRepo.findUserByUsername(username);
    if (user && user.activeLogin > 0) {
      const updateActiveLoginOnLogout = await identityRepo.updateActiveLoginOnLogout(
        username
      );

      return {
        isSuccessful: true,
        body: {
          message: 'Logout successful',
          db: updateActiveLoginOnLogout
        }
      };
    } else {
      if (!user) {
        return {
          isSuccessful: false,
          error: {
            path: 'logout',
            message: 'user not found'
          }
        };
      } else if (user.activeLogin <= 0) {
        return {
          isSuccessful: false,
          error: {
            path: 'logout',
            message: 'No Active sessions found to destroy'
          }
        };
      }
    }
  } catch (e) {
    console.log(e);
    const error = dbErrorResponseGenerator(e);
    return { isSuccessful: false, error: error };
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
