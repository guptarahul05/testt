const identityService = require('./identity.service');

exports.register = async (req, res, next) => {
  const userObj = { ...req.body, activeLogin: 1 };
  const response = await identityService.registerUser(userObj);
  const status = response.isSuccessful ? 200 : 500;
  res.status(status).json(response);
};
exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const response = await identityService.login(username, password);
  // const status = response.isSuccessful ? 200 : 500;
  res.status(response.status).json(response);
};

exports.logout = async (req, res, next) => {
  const { username } = { ...req.decoded };
  const response = await identityService.logout(username);
  const status = response.isSuccessful ? 200 : 500;
  res.status(status).json(response);
};
exports.test = (req, res, next) => {
  res.status(200).json(req.body);
};
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
