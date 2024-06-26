import { CONSTANT } from "../common/constant.js";
import httpCommon from "../utils/http-common.js";

const afterLoginHomeService = {
    newsDetails(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.NEWS_DETAILS, body);
    },
    getAllHomeActivities(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_HOME_ACTIVITIES + page);
    },
    viewEventNews(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.VIEW_EVENT_NEWS, body);
    },
    eventAddLike(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.EVENT_HOME_ADD_LIKE, body);
    },
    userSavePost(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.USER_SAVE_HOME_POST , body);
    },
    followUnfollowOrganization(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.FOLLOW_UNFOLLOW_HOME , body);
    },
    unfollowOrganization(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.UNFOLLOW_HOME , body);
    },
};

export default afterLoginHomeService;