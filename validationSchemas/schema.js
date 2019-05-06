const Joi = require('joi');

const schema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(errors => {
      errors.forEach(err => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Email cannot be empty';
            break;
          case 'any.empty':
            err.message = 'Email Cannot be Empty';
          case 'string.email':
            err.message = 'email is in valid';
            break;
          default:
            err.message = 'Email error';
        }
      });
      return errors;
    }),
  password: Joi.string()
    .alphanum()
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
    })
});

module.exports = schema;
