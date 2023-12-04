import types from "../types";

const initial_state = {
    userData: {}
}

export default function(state= initial_state, action){
    switch (action.type) {
        case types.ADDLIKE:
            return
        case types.LIKED:
            return
             
        default:
            return {...state}
    }
}