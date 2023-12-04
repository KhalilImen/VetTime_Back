
import { LOGIN ,SIGNUP,RESETPSW,COMPARE_OLD_PSW,FORGOTPSWD,SHOW_ALL_ADMIN} from "../urls";
import { apiGet, apiPost, clearUserData, setUserData } from "../../utils/utils";
import store from "../store";
import types from "../types";

const { dispatch } = store
export const saveUserData = (data) => {
    dispatch({
        type: types.LOGIN,
        payload: data
    })
}
export function login(data) {
    return new Promise((resolve, reject) => {
        return apiPost(LOGIN, data)
            .then((res) => {
                if (typeof res === 'object' ) {
                    setUserData(res).then(() => {
                        saveUserData(res); // Directly pass the data object to saveUserData
                        resolve(res);
                         console.log('Invalid user data received:', res);
                    });
                } else {
                   
                    console.log(res)
                    resolve(res);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export function signup(data) {
    return apiPost(SIGNUP, data)
}
export function UpdatePswd(data){
    return apiPost(RESETPSW,data)
}

export function ForgotPswd(data)
{
    return apiPost(FORGOTPSWD,data)
}

/*export function logout(){
    dispatch({type: types.CLEAR_REDUX_STATE})
    clearUserData()
}*/