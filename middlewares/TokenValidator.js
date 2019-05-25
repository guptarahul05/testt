const _ = require('lodash');
const jwt = require('jsonwebtoken');
/**
 * @TODO Add validations to options passed
 */
const identityService = require('../modules/identityModule/identity.service');

const defaultValidateTokenOptions = {};
function verifyToken(validateTokenOptions = defaultValidateTokenOptions) {
  return (req, res, next) => {
    const verifyAdmin =
      _.isBoolean(validateTokenOptions['checkAdmin']) &&
      validateTokenOptions['checkAdmin'];
    var token;
    try {
      token = req.headers['authorization'].split(' ')[1];
      if (token) {
        jwt.verify(token, 'hi', (error, decoded) => {
          if (error)
            res.status(422).json({
              error: {
                path: 'token',
                message: 'invalid token'
              }
            });
          else {
            if (verifyAdmin) {
              const username = decoded.username;
              identityService
                .checkUserisAdmin(username)
                .then(isAdmin => {
                  if (isAdmin) {
                    req.decoded = decoded;
                    next();
                  } else {
                    res.status(403).json({
                      error: {
                        path: 'user',
                        msg: 'Elevated Privilege Required'
                      }
                    });
                  }
                  console.log(isAdmin);
                })
                .catch(e =>
                  res.status(500).json({ endpoint: req.originalUrl, error: e })
                );
            } else {
              req.decoded = decoded;
              next();
            }
          }
        });
      } else {
        res.status(403).json({
          error: {
            path: token,
            msg: 'token not provided uygyg'
          }
        });
      }
    } catch (e) {
      const error = new Error('No Authorization or Auth Token Provided');
      error.status = 403;
      error.path = 'authorization';
      next(error);
    }
  };
}
module.exports = verifyToken;
