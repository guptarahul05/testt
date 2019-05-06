// const Joi = require('joi');
// const schema =  require('../../validationSchemas/schema');

exports.login = (req, res, next) => {
  const data = { ...req.body };
  //   Joi.validate(data, schema, { abortEarly: false })
  //     .then(r => res.json({ messagesuccess: r }))
  //     .catch(e => {
  //       const errors = errorCheck(e.details);
  //       res.json({
  //         messageerror: e
  //         //  errors
  //       });
  //     });
  res.json({ message: data });
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
/*
{
    "messageerror": [
        {
            "path": "email",
            "message": "email is in valid",
            "value": "rahul"
        },
        {
            "path": "password",
            "message": "password cannot be empty",
            "value": ""
        }
    ]
}
*/
