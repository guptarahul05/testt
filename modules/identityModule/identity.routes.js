const express = require('express');
const SchemaValidator = require('../../middlewares/SchemaValidator');
const identityController = require('./identity.controller');
const verifyToken = require('../../middlewares/TokenValidator');
const checkAdmin = require('../../middlewares/CheckAdmin');

const router = express.Router();
const validateRequest = SchemaValidator(true);
// router.post('/login', validateRequest, identityController.login);
router.post('/register',validateRequest,identityController.register)
router.post('/login', identityController.login);
router.post('/test',verifyToken,identityController.test);
router.post('/testAdmin',verifyToken,checkAdmin,identityController.test);




module.exports = router;
