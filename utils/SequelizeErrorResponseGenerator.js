function SequelizeErrorResponseGenerator(error) {
  switch (error.name) {
    case 'SequelizeUniqueConstraintError':
      return {
        message: error.errors[0].message,
        path: error.errors[0].path,
        value: error.errors[0].value
      };
  }
}
module.exports = SequelizeErrorResponseGenerator;
