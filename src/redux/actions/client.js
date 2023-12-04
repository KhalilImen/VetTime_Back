import { UPDATERATING,ADDLIKE,LIKED} from "../urls";
import { apiGet, apiPost,apiDelete} from "../../utils/utils";


export function AddLike(data){
    console.log("THIS IS THE CALLED URL ",ADDLIKE)
return apiPost(ADDLIKE,data)
}
export function Liked(data){
    const { adminId, clientId } = data;
    const url = LIKED(adminId, clientId);
    console.log("THIS IS THE CALLED URL ",url)
    return apiGet(url,data)
}
