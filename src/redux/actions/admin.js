import { UPDATEADMINLOCATION,SHOW_ALL_CILENTS, DELETECLIENT,EDITCLIENT,ADDCLIENT,SORTCLIENT,SORTCLIENTALPHABITIC,
         SHOW_ALL_AGENTS, DELETEAGENT,ADDAGENT,ACTIVEAGENT,DESACTIVEAGENT,EDITAGENT,
         ADDVISIT,ShOWALLCLIENTVISITS,DELETEVISIT,ShOWALLCLIENTVISITS_THISWEEK,ShOWALLCLIENTVISITS_THISMONTH,ShOWALLCLIENTVISITS_THISYEAR,EDITVISIT,VISIT_DONE,VISIT_UNDONE ,
         ADDINTERVENTION,SHOW_ALL_INTERVENTION } from "../urls";
import { apiGet, apiPost, clearUserData, setUserData ,apiDelete} from "../../utils/utils";
import store from "../store";
import types from "../types";


export function ShowAllClients(data) {

    return apiGet(SHOW_ALL_CILENTS(data), data)
    
}
export function DeleteClient(data){
return apiDelete(DELETECLIENT(data),data)
}
export function EditClient(data){
return apiPost(EDITCLIENT,data)
}

export function AddClient(data){
return apiPost(ADDCLIENT,data)
}

export function ThisWeekClients(data) {
    return apiGet(SORTCLIENT(data), data)    
}

export function ShowAllAgents(data) {
    return apiGet(SHOW_ALL_AGENTS(data), data)
    
}

export function DeleteAgent(data){
return apiDelete(DELETEAGENT(data),data)
}


export function AddAgent(data){

    return apiPost(ADDAGENT,data)
}
export function ActivateAgent(data){
return apiGet(ACTIVEAGENT(data),data)
}
export function DesActivateAgent(data){
return apiGet(DESACTIVEAGENT(data),data)
}
export function EditAgent(data){
return apiPost(EDITAGENT,data)
}
export function AddVisit(data){
return apiPost(ADDVISIT,data)
}
export function VisitDone(data){
return apiGet(VISIT_DONE(data),data)
}
export function VisitUndone(data){
return apiGet(VISIT_UNDONE(data),data)
}
export function EditVisit(data){
    console.log("THIS IS THE URL ",EDITVISIT)
return apiPost(EDITVISIT,data)
}

export function showClientVisits(data) {
    const { AdminId, ClientId } = data;
    const url = ShOWALLCLIENTVISITS(AdminId, ClientId);
    return apiGet(url,data);
}
export function showClientVisits_Thisweek(data) {

    const { adminId, clientId } = data;
    const url = ShOWALLCLIENTVISITS_THISWEEK(adminId,clientId);
    console.log("THIS IS THE URL ",url)
    return apiGet(url,data);
}
export function showClientVisits_ThisMonth(data) {
    const { adminId, clientId } = data;
    const url = ShOWALLCLIENTVISITS_THISMONTH(adminId, clientId);
    return apiGet(url,data);
}
export function showClientVisits_ThisYear(data) {
    const { adminId, clientId } = data;
    const url = ShOWALLCLIENTVISITS_THISYEAR(adminId, clientId);
    return apiGet(url,data);
}
export function DeleteVisit(data){
return apiDelete(DELETEVISIT(data),data)
}

export function AddIntervention(data){

    return apiPost(ADDINTERVENTION,data)
}
export function Update_AdminLocation(data){

    return apiPost(UPDATEADMINLOCATION,data)
}
export function ShowAllInterventions(data) {

    return apiGet(SHOW_ALL_INTERVENTION(data), data)
    
}
// export function SortBy_AlphabetClient(data) {
  
//     return apiGet(SORTCLIENTALPHABITIC(data));
   
    
// }