/**
 * currently not being used logic have been moved to TokenValidate.js
 */

const identityService = require('../modules/identityModule/identity.service');
async function adminCheck(req, res, next) {
  const username = req.decoded;
  console.log(req.decoded);
  const isAdmin = await identityService.checkUserisAdmin(username);
  console.log(isAdmin);
  if (isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ error: { path: 'user', msg: 'Elevated Privilege Required' } });
  }
}
module.exports = adminCheck;
