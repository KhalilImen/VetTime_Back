
import { combineReducers } from "redux";
import types from "../types";
import auth from './auth';
import admin from './admin';
import supadmin from './Supadmin'
import guest from './guest'
import client from "./client";
import agent from "./agent"

const appReducer = combineReducers({
    auth,admin,supadmin,guest,client,agent
})
const rootReducer = (state, action) => {
    if (action.type == types.CLEAR_REDUX_STATE) {
        state = undefined
    }
    return appReducer(state, action)
}
export default rootReducer