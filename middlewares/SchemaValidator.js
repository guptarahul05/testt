const _ = require('lodash');
const Joi = require('joi');
const Schemas = require('../validationSchemas/Schemas');

function ValidataSchema(useJoiError = false) {
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError;
  const _supportedMethods = ['post', 'get'];
  const _validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };
  return (req, res, next) => {
    const route = req.originalUrl;
    const method = req.method.toLowerCase();

    if (_.includes(_supportedMethods, method) && _.has(Schemas, route)) {
      const _schema = _.get(Schemas, route);
      if (_schema) {
        return Joi.validate(
          req.body,
          _schema,
          _validationOptions,
          (err, data) => {
            if (err) {
              const JoiError = {
                status: 'failed',
                error: {
                  orignal: err._object,
                  details: _.map(err.details, ({ message, type, path }) => ({
                    message: message.replace(/['"]/g, ''),
                    type,
                    path: path[0]
                  }))
                }
              };
              const CustomError = {
                status: 'failed',
                error:
                  'Invalid request data. Please review request and try again.'
              };
              res.status(422).json(_useJoiError ? JoiError : CustomError);
            } else {
              req.body = data;
              next();
            }
          }
        );
      }
    }
    next();
  };
}
module.exports = ValidataSchema;
