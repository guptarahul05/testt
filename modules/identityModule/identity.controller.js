const identityService = require('./identity.service');

exports.register = async (req, res, next) => {
  const userObj = { ...req.body };
  const response = await identityService.registerUser(userObj);
  const status = response.isSuccessful ? 200 : 500;
  res.status(status).json(response);
};
exports.login = async (req, res, next) => {
  const username = req.body.username;
  const hashedPassword = req.body.password;
  const response = await identityService.login(username, hashedPassword);
  const status = response.isSuccessful ? 200 : 500;
  res.status(status).json(response);
};
exports.test = (req,res,next)=>{
  res.status(200).json(req.body);
}
function errorCheck(errors) {
  const errorArray = [];
  errors.forEach(e => {
    const error = {
      path: e.path[0],
      message: e.message,
      value: e.context['value'] || ''
    };
    errorArray.push(error);
  });
  return errorArray;
}
