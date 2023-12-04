import types from "../types";

const initial_state = {
    userData: {}
}

export default function(state= initial_state, action){
    switch (action.type) {
        case types.DELETE:
            return
        case types.SHOW_ALL_ADMIN:
            return  
        case types.ACTIVEADMIN:
            return 
        case types.DESACTIVEADMIN:
            return  
        case types.SORTADMINRATING:
            return    
        case types.SORTADMINCLIENT:
            return 
        case types.ADDADMIN:
            return 
        case types.EDITADMIN:
            return 
        case types.ADMIN_ALPHABITIC_ORDER:
            return              
        default:
            return {...state}
    }
}