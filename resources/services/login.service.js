import { CONSTANT } from "../common/constant.js";
import httpCommon from "../utils/http-common.js";

const loginService = {
    login(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.LOGIN, body);
    },
    loginResendOtp(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.LOGINRESENDOTP, body);
    },
    loginVerifyOtp(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.LOGINVERIFYOTP, body);
    }
}

export default loginService;
