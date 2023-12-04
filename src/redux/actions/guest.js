import { SHOW_NEAREST_VET} from "../urls";
import { apiGet} from "../../utils/utils";

export function ShowNearestVet(data){
    const { latitude, longitude } = data;
    const url = SHOW_NEAREST_VET(latitude, longitude);
    return apiGet(url,data);
}
