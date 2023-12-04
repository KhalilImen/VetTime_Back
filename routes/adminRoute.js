const express = require('express');
const router = express.Router();
const { validateToken ,isAdmin } = require("../JWT");
const adminController = require('../controllers/adminController');

//Get 
    router.get('/desactivate_Agent/:id',/* validateToken,isAdmin, */adminController.desactivate_Agent);
    router.get('/activate_Agent/:id', /*validateToken,isAdmin,*/ adminController.activate_Agent);  
    router.get('/DoneVisit/:id', /*validateToken,isAdmin,*/ adminController.DoneVisit);  
    router.get('/UnDonevisit/:id', /*validateToken,isAdmin,*/ adminController.UnDonevisit);  
    router.get('/ExistRecette/:interId', /*validateToken,isAdmin,*/ adminController.ExistRecette);     
//Post
    router.post('/CreateVisit',/*validateToken,isAdmin, */adminController.CreateVisit);  
    router.post('/updateVisit', /* validateToken, isAdmin, */ adminController.updateVisit); 
    router.post('/CreateIntervention',/*validateToken,isAdmin,*/ adminController.CreateIntervention);
    router.post('/CreateRecette',/*validateToken,isAdmin,*/adminController.CreateRecette);
    router.post('/updateRecette',/*validateToken,isAdmin,*/adminController.updateRecette);
    router.post('/updateLocationAdmin/:adminId',/*validateToken,isAdmin,*/adminController.updateLocationAdmin);
    router.post('/updateLocation', adminController.updateLocation);
    router.post('/addNbClient/:AdminId', adminController.addNbClient);
    router.post('/updateClient', /* validateToken, isAdmin, */ adminController.updateClient);
    router.post('/addClient', adminController.addClient);
    router.post('/addAgent',/* validateToken,isAdmin,*/ adminController.addAgent);
    router.post('/updateAgent', /*validateToken,isAdmin,*/ adminController.updateAgent);
    router.post('/addMessage', /*validateToken,isAdmin,*/ adminController.addMessage);
//delete
    router.delete('/deleteAgent/:id', /*validateToken,isAdmin,*/ adminController.deleteAgent);
    router.delete('/deleteClient/:id',/* validateToken,isAdmin,*/ adminController.deleteClient);
    router.delete('/deleteVisit/:id',/* validateToken,isAdmin,*/ adminController.deleteVisit);  

module.exports = router;

 