import types from "../types";

const initial_state = {
    userData: {}
}

export default function(state= initial_state, action){
    switch (action.type) {
        case types.SHOW_NEAREST_VET:
            return
             
        default:
            return {...state}
    }
}