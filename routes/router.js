const express = require('express');
const identityRouter = require('./../modules/identityModule/identity.routes')

const router = express.Router();

router.use('/auth',identityRouter);


module.exports = router;
