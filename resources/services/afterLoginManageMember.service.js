import { CONSTANT } from "../common/constant.js";
import httpCommon from "../utils/http-common.js";

const afterLoginManageMemberSerive = {
    getAllManageMember(body, page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_MEMBER_SANSTHA + page, body);
    },
};

export default afterLoginManageMemberSerive;