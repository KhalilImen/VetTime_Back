export const API_BASE_URL = "http://192.168.1.136:3000";
export const getApiUrl = (endpoint) => API_BASE_URL + endpoint
//Guest
export const LOGIN = getApiUrl('/login');
export const SHOW_NEAREST_VET = (latitude, longitude) => getApiUrl(`/searchNearest?latitude=${latitude}&longitude=${longitude}`);
//Users
export const SIGNUP = getApiUrl('/signup');
export const RESETPSW = getApiUrl('/ResetPswd');
export const FORGOTPSWD = getApiUrl('/ForgotPswd');
//SupAdmin
            /*Home*/
export const DELETEADMIN    = (id) => getApiUrl(`/deleteAdmin/${id}`);
export const ACTIVEADMIN    = (id) => getApiUrl(`/activate_Admin/${id}`);
export const DESACTIVEADMIN = (id) => getApiUrl(`/desactivate_Admin/${id}`);
export const SHOW_ALL_ADMIN = getApiUrl('/showAllAdmins');
export const SORTADMINRATING = getApiUrl('/SortAdminByRating');
export const SORTADMINCLIENT = getApiUrl('/SortByNbClient');
export const ADDADMIN = getApiUrl('/addAdmin');
export const EDITADMIN = getApiUrl('/updateAdmin');
// export const ADMIN_ALPHABITIC_ORDER = getApiUrl('/sortAdminsByAlphabiticOrder');
//Admin
                /*Admin */
export const UPDATEADMINLOCATION =getApiUrl('/updateLocation');
        /*Client*/

export const SHOW_ALL_CILENTS =(adminId) => getApiUrl(`/showAllClients?adminId=${adminId}`);
export const DELETECLIENT     = (id) => getApiUrl(`/deleteClient/${id}`);
export const EDITCLIENT =  getApiUrl('/updateClient');
export const ADDCLIENT = getApiUrl('/addClient');
export const SORTCLIENT = (adminId) => getApiUrl(`/ThisWeekClient?adminId=${adminId}`);
export const SORTCLIENTALPHABITIC = () => getApiUrl('/updateLocation');


        /*Agent */
export const ADDAGENT = getApiUrl('/addAgent');
export const SHOW_ALL_AGENTS =(adminId) => getApiUrl(`/showAllAgents?adminId=${adminId}`);
export const DELETEAGENT     = (id) => getApiUrl(`/deleteAgent/${id}`);
export const ACTIVEAGENT    = (id) => getApiUrl(`/activate_Agent/${id}`);
export const DESACTIVEAGENT = (id) => getApiUrl(`/desactivate_Agent/${id}`);
export const EDITAGENT =  getApiUrl('/updateAgent');
        /*Visits*/
export const ADDVISIT = getApiUrl('/CreateVisit');
export const EDITVISIT = getApiUrl('/updateVisit');
export const VISIT_DONE    = (id) => getApiUrl(`/DoneVisit/${id}`);
export const VISIT_UNDONE    = (id) => getApiUrl(`/UnDonevisit/${id}`);
export const ShOWALLCLIENTVISITS = (AdminId, ClientId) => getApiUrl(`/showClientVisits?AdminId=${AdminId}&ClientId=${ClientId}`);
export const ShOWALLCLIENTVISITS_THISWEEK = (adminId, clientId) => getApiUrl(`/ThisWeekClientVisit?adminId=${adminId}&clientId=${clientId}`);
export const ShOWALLCLIENTVISITS_THISMONTH = (adminId, clientId) => getApiUrl(`/ThisMonthClientVisit?adminId=${adminId}&clientId=${clientId}`);
export const ShOWALLCLIENTVISITS_THISYEAR = (adminId, clientId) => getApiUrl(`/ThisYearClientVisit?adminId=${adminId}&clientId=${clientId}`);
export const DELETEVISIT     = (id) => getApiUrl(`/deleteVisit/${id}`)
        /*Intervention */
export const ADDINTERVENTION = getApiUrl('/CreateIntervention');
export const SHOW_ALL_INTERVENTION =(visitId) => getApiUrl(`/showAllInterventions?visitId=${visitId}`);
export const SHOW_ALL_INTERVENTION_AGENT =(agentId) => getApiUrl(`/showAll_Agent_Interventions?agentId=${agentId}`);
export const SHOW_ALL_INTERVENTION_THISYEAR =(agentId) => getApiUrl(`/ThisyearInterventions?agentId=${agentId}`);
export const SHOW_ALL_INTERVENTION_THISMONTH=(agentId) => getApiUrl(`/ThismonthIntervention?agentId=${agentId}`);
export const SHOW_ALL_INTERVENTION_THISWEEK =(agentId) => getApiUrl(`/ThisWeekIntervention?agentId=${agentId}`);
export const SHOW_ALL_INTERVENTION_TODAY =(agentId) => getApiUrl(`/ThisDayIntervention/?agentId=${agentId}`);
//Add recette 

export const ADDRecette = getApiUrl('/CreateRecette');
export const UpdateRecette = getApiUrl('/updateRecette');
export const ExistRecette = (interId) => getApiUrl(`/ExistRecette/${interId}`);

//Client 
export const ADDLIKE = getApiUrl('/AddLike');
export const LIKED = (adminId,clientId) => getApiUrl(`/likeValue?adminId=${adminId}&clientId=${clientId}`);

