import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const upcommingService = {
    getUpcomming(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_UPCOMMING + page);
    }
};

export default upcommingService;