import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const afterLoginActivityService = {
    getAllLatestActivity(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_LATEST_ACTIVITY + page);
    },
    getAllNewsLatestActivity(news_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_NEWS_LATEST_ACTIVITY + news_page);
    },
    getAllLatestEventActivity(event_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_EVENTS_LATEST_ACTIVITY + event_page);
    },
    getAllLatestAppealActivity(appeal_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_APPEAL_LATEST_ACTIVITY + appeal_page);
    },
    getAllLatestVideos(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_LATEST_VIDEOS + page);
    },
    eventAddLike(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.EVENT_ADD_LIKE + body);
    },
    userSavePost(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.USER_SAVE_POST + body);
    },
};

export default afterLoginActivityService;