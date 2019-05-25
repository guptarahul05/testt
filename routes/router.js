const express = require('express');
const identityRouter = require('./../modules/identityModule/identity.routes')
const sessionRouter = require('../modules/sessionModule/session.routes');
const router = express.Router();

router.use('/auth',identityRouter);
router.use('/session',sessionRouter);

module.exports = router;
