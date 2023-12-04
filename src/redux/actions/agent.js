import { SHOW_ALL_INTERVENTION_AGENT,SHOW_ALL_INTERVENTION_THISYEAR,SHOW_ALL_INTERVENTION_THISMONTH,SHOW_ALL_INTERVENTION_THISWEEK,SHOW_ALL_INTERVENTION_TODAY,ADDRecette,UpdateRecette,ExistRecette} from "../urls";
import { apiGet, apiPost,apiDelete} from "../../utils/utils";


export function ShowAgentInterventions(data){

return apiGet(SHOW_ALL_INTERVENTION_AGENT(data),data)
}

export function ShowAgentInterventions_thisWeek(data){   
return apiGet(SHOW_ALL_INTERVENTION_THISWEEK(data),data)
}

export function ShowAgentInterventions_thisMonth(data){
return apiGet(SHOW_ALL_INTERVENTION_THISMONTH(data),data)
}

export function ShowAgentInterventions_thisYear(data){
return apiGet(SHOW_ALL_INTERVENTION_THISYEAR(data),data)
}

export function ShowAgentInterventions_today(data){
return apiGet(SHOW_ALL_INTERVENTION_TODAY(data),data)
}

export function AddRecette(data){
return apiPost(ADDRecette,data)
}

export function EditRecette(data){
return apiPost(UpdateRecette,data)
}
export function Recette_Exist(data){
return apiGet(ExistRecette(data),data)
}

