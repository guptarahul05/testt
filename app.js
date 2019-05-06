const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/router');
const logger = require('morgan');

const app = express();
app.use(logger('dev'))
app.use(bodyParser.json());
// app.use(expressValidator())
app.use('/', routes);
// app.post('/', (req, res) => {
//   console.log(req.body);
//   res.json(req.body);
// });
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status);
  res.json({ error: { status: error.status, message: error.message } });
});
app.listen(3000, console.log('Server listening on port 3000'));
