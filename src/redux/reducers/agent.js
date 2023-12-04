import types from "../types";

const initial_state = {
}

export default function(state= initial_state, action){
    switch (action.type) {
        case types.SHOW_ALL_INTERVENTION_AGENT:
            return
        case types.SHOW_ALL_INTERVENTION_THISYEAR:
            return  
        case types.SHOW_ALL_INTERVENTION_THISMONTH:
            return 
        case types.SHOW_ALL_INTERVENTION_THISWEEK:
            return 
        case types.SHOW_ALL_INTERVENTION_TODAY:
            return   
        case types.ADDRecette:
            return   
        case types.UpdateRecette:
            return  
        case types.ExistRecette:
            return        
        default:
            return {...state}
    }
}