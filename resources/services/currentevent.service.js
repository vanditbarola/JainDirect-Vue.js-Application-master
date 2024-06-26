import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const currentService = {
    getCurrent(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_CURRENTMOREEVENT + page);
    },
    currentEventAddLike(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.CURRENT_EVENT_ADD_LIKE, body);
    },
    currentUserSavePost(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.CURRENT_EVENT_USER_SAVE_POST, body);
    },
};

export default currentService;