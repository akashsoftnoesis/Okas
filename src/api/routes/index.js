const express = require('express');

const router = express.Router();
const propertiesRoute = require('./properties.route');
const typesRoute = require('./types.route');
const agentsRoute = require('./agents.route');
const seoRoute = require('./seo.route');
const { sendRequestedAppraisal } = require('../controllers/common.controller');

router.use('/properties', propertiesRoute);

router.use('/types', typesRoute)

router.use('/agents', agentsRoute)

router.post('/send/mail', sendRequestedAppraisal)

router.use('/seo-details', seoRoute)

module.exports = router;
