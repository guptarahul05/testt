const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];
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
        req.decoded = decoded.id;
        next();
      }
    });
  } else {
    res.status(403).json({
      error: {
        path: token,
        msg: 'token not provided'
      }
    });
  }
}
module.exports = verifyToken;
