import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const activityService = {
    newsDetails(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.NEWS_DETAILS, body);
    },
    getAllActivity(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_ACTIVITIES + page);
    },
    getAllNewsActivity(news_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_NEWS_ACTIVITIES + news_page);
    },
    getAllEventsActivity(event_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_EVENTS_ACTIVITIES + event_page);
    },
    getAllAppealActivity(appeal_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_APPEAL_ACTIVITIES + appeal_page);
    },
    getAllVideoActivity(video_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_VIDEOS_ACTIVITIES + video_page);
    },
    getAllSearchActivity(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_SEARCH_ACTIVITIES, body);
    },
};

export default activityService;