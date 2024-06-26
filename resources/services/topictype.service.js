import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const topicTypeService = {
    createTopicType(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.CREATE_TOPICTYPE, body);
    },
    getTopicType() {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_TOPICTYPE);
    },
};

export default topicTypeService;