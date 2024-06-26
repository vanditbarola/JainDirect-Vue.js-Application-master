import { CONSTANT } from "../common/constant.js";
import httpCommon from "../utils/http-common.js";

const indexService = {
    indexNewsDetails(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.INDEX_NEWS_DETAILS);
    },
    getCount(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_COUNT);
    },
    indexTemple(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.INDEX_TEMPLE);
    },
    indexMuniSeva(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.INDEX_MUNI_SEVA);
    },
    indexDharamshala(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.INDEX_DHARMSHALA);
    },
    indexCategory(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.INDEX_CATEGORY);
    },
    indexActivity(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.INDEX_ACTIVITY);
    },
    indexSaveCotact(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.INDEX_SAVE_CONTACT, body);
    },
};

export default indexService;