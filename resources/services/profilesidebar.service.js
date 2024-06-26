import { CONSTANT } from "../common/constant.js";
import httpCommon from "../utils/http-common.js";

const profileSideBarService = {
    getUser(userId) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_USER + userId);
    },
    getManageSanstha(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_MANAGESANSTHA,body);
    },
    getUserManageSanstha(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_USERMANAGESANSTHA,body);
    },
    getUserSavedPost(page,body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_USERSAVEDPOST + page,body);
    },
    updateUserProfile(userId, body) {
        return httpCommon.put(CONSTANT.API_CONSTANT.GET_USER + userId, body);
    },
    getCountry() {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_COUNTRY);
    },
    getState(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_STATE, body);
    },
    getCity(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_CITY, body);
    },
    updateProfilePicture(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.UPDATE_PROFILE_PICTURE, body);
    },
    getFollowedOrganization(page, body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_FOLLOWED_ORGANIZATION + page, body);
    },
    getFollowersOrganization(page, body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_FOLLOWERS_ORGANIZATION + page, body);
    },
};

export default profileSideBarService;