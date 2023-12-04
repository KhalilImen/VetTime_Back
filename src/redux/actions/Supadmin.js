import { DELETEADMIN,SHOW_ALL_ADMIN,ACTIVEADMIN,DESACTIVEADMIN,SORTADMINRATING,SORTADMINCLIENT,ADDADMIN,EDITADMIN,ADMIN_ALPHABITIC_ORDER} from "../urls";
import { apiGet, apiPost,apiDelete} from "../../utils/utils";

export function ShowAllAdmin(data){
return apiGet(SHOW_ALL_ADMIN,data)
}

export function SortAdminByRating(data){
return apiGet(SORTADMINRATING,data)
}
export function SortAdminByNbClient(data){
return apiGet(SORTADMINCLIENT,data)
}

export function DeleteAdmin(data){
return apiDelete(DELETEADMIN(data),data)
}
export function ActivateAdmin(data){
return apiGet(ACTIVEADMIN(data),data)
}
export function DesActivateAdmin(data){
return apiGet(DESACTIVEADMIN(data),data)
}
export function AddAdmin(data){
  console.log("the path I'm using is ",ADDADMIN)
return apiPost(ADDADMIN,data)
}
export function EditAdmin(data) {
  return apiPost(EDITADMIN,data);
}
export function Alphabitic_Sort(data) {
  return apiGet(ADMIN_ALPHABITIC_ORDER,data);
}