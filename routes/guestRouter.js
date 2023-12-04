const express = require('express');
const router = express.Router();
const { validateToken ,isSupAdmin } = require("../JWT");
const guestController = require('../controllers/guestController');

//Post method
    router.post('/signup', guestController.signup);

module.exports = router;