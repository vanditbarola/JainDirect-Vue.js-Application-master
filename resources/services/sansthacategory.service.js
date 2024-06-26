import { CONSTANT } from "../common/constant.js";
import httpCommon from "../utils/http-common.js";

const sansthaCatgeoryService = {
    createSansthacategory(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.CREATE_SANSTHACATEGORY, body);
    },
    getSansthaCategory() {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_SANSTHACATEGORY);
    },
};

export default sansthaCatgeoryService;