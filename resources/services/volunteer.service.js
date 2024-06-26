import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const volunteerService = {
    createVolunteer(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.CREATE_VOLUNTEER, body);
    }
};

export default volunteerService;