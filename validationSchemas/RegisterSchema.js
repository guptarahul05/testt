const Joi = require('joi');

const RegisterSchema = Joi.object().keys({
  username: Joi.string()
    .min(6)
    .max(15)
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Username cannot be empty';
            break;
          case 'any.empty':
            err.message = 'Username Cannot be Empty';
          case 'string.min':
            err.message = 'Username should br minimum 6 character';
            break;
          case 'string.min':
            err.message = 'Username should br maximum 15 character';
            break;
          default:
            err.message = 'Username error';
        }
      });
      return errors;
    }),
  password: Joi.string()
    .min(8)
    .max(15)
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case 'any.required':
            err.message = 'password cannot be empty';
          case 'any.empty':
            err.message = 'Password Cannot be Empty';
        }
      });
      return errors;
    }),
  name: Joi.string()
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case 'any.required':
            err.message = 'password cannot be empty';
          case 'any.empty':
            err.message = 'Password Cannot be Empty';
        }
      });
    }),
  isAdmin: Joi.any()
});

module.exports = RegisterSchema;
