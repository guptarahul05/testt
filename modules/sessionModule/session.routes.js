const express = require('express');
var multer = require('multer');

const SchemaValidator = require('../../middlewares/SchemaValidator');
const TokenValidator = require('../../middlewares/TokenValidator');

const sessionController = require('./session.controller');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'files');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const router = express.Router();

const verifyToken = TokenValidator();

router.post('/sessionTest', verifyToken, sessionController.test);
router.post(
  '/sessionStart',
  verifyToken,
  multer({ storage: storage }).single('file'),
  sessionController.startSession
);
router.post('/convert', verifyToken, sessionController.convert);
router.post(
  '/inSessionConvert',
  verifyToken,
  multer({ storage: storage }).single('file'),
  sessionController.inSessionConvert
);
router.post('/makeExcel', verifyToken, sessionController.makeExcel);
router.post('/sessionEnd', verifyToken, sessionController.sessionEnd);

module.exports = router;
