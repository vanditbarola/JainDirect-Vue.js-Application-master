import { CONSTANT } from "../common/constant.js";
import httpCommon from "../utils/http-common.js";

const eventSideBarService = {
    getCurrentEvent(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.GET_CURRENTEVENT, body);
    },
    getUpcomingEvent(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.GET_UPCOMINGEVENT, body);
    },
    addEventLike(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.SIDE_BAR_EVENT_ADD, body);
    },
    userSavePost(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.SIDE_BAR_USER_SAVE, body);
    },
};

export default eventSideBarService;