import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const userSansthaService = {
    getUserSanstha(body,page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_USER_SANSTHA + page, body);
    },
    getUserSansthaSearch(body,page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_USER_SANSTHA_SEARCH + page, body);
    }
};

export default userSansthaService;