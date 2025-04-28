const express = require("express");
const { isAuthorized } = require("../../middleware/authorization");
const { addSEODetails, fetchSEODetails } = require("../controllers/seo.controller");
const router = express.Router();

router.post('/add', isAuthorized , addSEODetails)

router.get('/fetch', fetchSEODetails)

module.exports = router;