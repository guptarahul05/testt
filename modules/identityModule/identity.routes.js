const express = require('express');
const SchemaValidator = require('../../middlewares/SchemaValidator');
const identityController = require('./identity.controller');
const router = express.Router();
const validateRequest = SchemaValidator(true);
router.post('/login', validateRequest, identityController.login);

module.exports = router;
