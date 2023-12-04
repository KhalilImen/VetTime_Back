const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

//Get methods
    router.get('/updateAdminId/:clientId/:adminId', clientController.updateAdminId);
    router.get('/searchNearest', clientController.searchNearest);
    router.get('/SearchByName', clientController.SearchByName);
    router.get('/likeValue', clientController.likeValue);
    
//Post methods
    router.post('/updateLocationClient/:clientId', clientController.updateLocationClient);
    router.post('/AddLike', clientController.AddLike);
    router.post('/AddRating', clientController.AddRating);
    

module.exports = router;