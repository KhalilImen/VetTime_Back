const express = require('express');
const router = express.Router();
const { validateToken ,isSupAdmin } = require("../JWT");
const supAdminController = require('../controllers/supAdminController');


//Get methods
    router.get('/desactivate_Admin/:id'/*, validateToken,isSupAdmin*/, supAdminController.desactivate_Admin);
    router.get('/activate_Admin/:id',/* validateToken,isSupAdmin,*/ supAdminController.activate_Admin);
    
   
//Post methods
 router.post('/updateAdmin',/*validateToken,isSupAdmin,*/ supAdminController.updateAdmin);
    router.post('/addSupAdmin', supAdminController.addSupAdmin);
    router.post('/addAdmin', /*validateToken,isSupAdmin,*/supAdminController.addAdmin);
//delete method
    router.delete('/deleteAdmin/:id',/* validateToken,isSupAdmin,*/ supAdminController.deleteAdmin);

module.exports = router;