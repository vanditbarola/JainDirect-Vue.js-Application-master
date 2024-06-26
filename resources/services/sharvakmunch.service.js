import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const sharvakMunchService = {
    getAllSharvakMunch(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALLSHARVAK + page);
    },
    getNewsSharvakMunch(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_NEWSSHARVAK + page);
    },
    getEventSharvakMunch(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_EVENTSHARVAK + page);
    },
    getVideoSharvakMunch(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_VIDEOSHARVAK + page);
    },
    shravakMunchEVentLike(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.SHRAVAK_MUNCH_EVENT_LIKE , body);
    },
    sharvakMunchUserSavePost(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.SHRAVAK_MUNCH_USER_SAVE_POST , body);
    },
};


export default sharvakMunchService;