import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const emailSubScribeService = {
    createEmailSubScribe(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.CREATE_EMAILSUBSCRIBE, body);
    }
};

export default emailSubScribeService;