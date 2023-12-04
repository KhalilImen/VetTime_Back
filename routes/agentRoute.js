const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

//Get methods
    router.get('/updateAgentId/:clientId/:adminId', agentController.updateAgentId);

module.exports = router;