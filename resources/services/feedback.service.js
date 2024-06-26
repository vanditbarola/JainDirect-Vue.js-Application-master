import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const feedBackService = {
    createFeedback(body,) {
        return httpCommon.post(CONSTANT.API_CONSTANT.CREATE_FEEDBACK, body);
    }
};

export default feedBackService;