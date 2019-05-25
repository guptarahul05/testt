const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const logger = require('morgan');
const cors = require('cors');
const db = require('./utils/database');

const associatons = require('./models/Associations');
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS '
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,' +
      ' Content-Type, Accept,' +
      ' Authorization,' +
      ' Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use('/', routes);
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status ? error.status : 500);
  res.json({
    error: {
      status: error.status,
      message: error.message,
      path: error.path,
      test: '1'
    }
  });
});

associatons();
db.sync({
  // force: true
})
  .then(app.listen(3000, console.log('Server listening on port 3000')))
  .catch(console.log);
