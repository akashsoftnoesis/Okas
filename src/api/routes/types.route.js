const express = require('express');
const { fetchPropertyClass } = require('../controllers/types.controller');
const router = express.Router();

router.get('/propertyClass', fetchPropertyClass)

module.exports = router;