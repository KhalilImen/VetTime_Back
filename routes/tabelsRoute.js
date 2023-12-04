const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tabelController');

              /****** Admin Table ******/
    router.get('/showAllAdmins', tableController.showAllAdmins);
    router.get('/showAdminRating', tableController.showAdminRating);
    router.get('/SortAdminByRating', tableController.SortAdminByRating);  
    router.get('/SortByNbClient', tableController.SortByNbClient);     
    router.get('/SearchAdminByName', tableController.SearchAdminByName);
    router.get('/sortAdminsByAlphabiticOrder', tableController.sortAdminsByAlphabiticOrder);
    
                /*********Agent*********/
    router.get('/showAllAgents', tableController.showAllAgents);

                  /****** Client Table ******/
    router.get('/showAllClients', tableController.showAllClients);
    router.get('/SearchClientByName', tableController.SearchClientByName);
    router.get('/ThisWeekClient', tableController.ThisWeekClient);
    router.get('/sortClientsByAlphabiticOrder', tableController.sortClientsByAlphabiticOrder);

                 /****** Visit table *******/
    router.get('/showAllVisits', tableController.showAllVisits);
    router.get('/showClientVisits', tableController.showClientVisits);
    router.get('/ThisWeekVisit', tableController.ThisWeekVisit);
    router.get('/ThisWeekClientVisit', tableController.ThisWeekClientVisit);
    router.get('/ThisMonthClientVisit', tableController.ThisMonthClientVisit);
    router.get('/ThisYearClientVisit', tableController.ThisYearClientVisit);
    router.get('/ThismonthVisit', tableController.ThismonthVisit);    
    router.get('/ThisyearVisit', tableController.ThisyearVisit);

               /***********Intervention***********/
   router.get('/showAllInterventions', tableController.showAllInterventions);
   router.get('/showAll_Agent_Interventions', tableController.showAll_Agent_Interventions);
   router.get('/ThisyearInterventions', tableController.ThisyearInterventions);
   router.get('/ThismonthIntervention', tableController.ThismonthIntervention);
   router.get('/ThisWeekIntervention', tableController.ThisWeekIntervention);
   router.get('/ThisDayIntervention', tableController.ThisDayIntervention);

module.exports = router;
