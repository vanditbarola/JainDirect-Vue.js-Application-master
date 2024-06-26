import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const sansthaMemberService = {
    createSansthaMember(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.CREATE_SANSTHAMEMBER, body);
    }
};

export default sansthaMemberService;