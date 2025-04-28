const express = require("express");
const { fetchAllAgents, fetchAgentByID, fetchAllAgentsRecordForRoutes } = require("../controllers/agents.controller");

const router = express.Router();

router.get('/list', fetchAllAgents)

router.get('/single/:id', fetchAgentByID)

router.get('/records', fetchAllAgentsRecordForRoutes)

module.exports = router;
