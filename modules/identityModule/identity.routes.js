const express = require('express');
const SchemaValidator = require('../../middlewares/SchemaValidator');
const TokenValidator = require('../../middlewares/TokenValidator');

const identityController = require('./identity.controller');

const router = express.Router();
const validateRequest = SchemaValidator(true);

const validateAdminTokenOptions = {
  checkAdmin: true
};
const verifyAdminToken = TokenValidator(validateAdminTokenOptions);
const verifyToken = TokenValidator();
// console.log(verifyAdminToken)
// router.post('/login', validateRequest, identityController.login);
router.post('/register', validateRequest, identityController.register);
router.post('/login', identityController.login);
router.get('/logout', verifyToken, identityController.logout);

router.post('/test', verifyToken, identityController.test);
router.post('/testAdmin', verifyAdminToken, identityController.test);

module.exports = router;
