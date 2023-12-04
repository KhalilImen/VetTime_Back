import types from "../types";

const initial_state = {
    userData: {}
}

export default function(state= initial_state, action){
    switch (action.type) {
        case types.SHOW_ALL_CILENTS :
            return
        case types.SHOW_ALL_ADMIN:
            return  
        case types.DELETECLIENT:
            return 
        case types.EDITCLIENT:
            return  
        case types.ADDCLIENT:
            return    
        case types.SORTCLIENT:
            return 
        case types.SHOW_ALL_AGENTS:
            return 
        case types.DELETEAGENT:
            return
        case types.ADDAGENT:
            return
        case types.ADDVISIT:
            return
        case types.ShOWALLCLIENTVISITS:
            return
        case types.DELETEVISIT:
            return
        case types.ShOWALLCLIENTVISITS_THISWEEK:
            return
        case types.ShOWALLCLIENTVISITS_THISMONTH:
            return
        case types.ShOWALLCLIENTVISITS_THISYEAR:
            return
        case types.ADDINTERVENTION:
            return
        case types.SHOW_ALL_INTERVENTION:
            return
        case types.EDITVISIT:
            return
        case types.VISIT_DONE:
            return
        case types.VISIT_UNDONE:
            return
        case types.UPDATEADMINLOCATION:
            return
        // case types.SORTCLIENTALPHABITIC:
        //     return
        default:
            return {...state}
    }
}