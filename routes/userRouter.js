const express = require('express');
const router = express.Router();
const { validateToken ,isSupAdmin } = require("../JWT");
const userController = require('../controllers/userController');

//Post method
    router.post('/login',userController.login);
    router.post('/ResetPswd',userController.ResetPswd);
    router.post('/ForgotPswd',userController.ForgotPswd);
//Get methods
    router.get('/comparePswd',userController.comparePswd);

    
module.exports = router;
