import { CONSTANT } from "../common/constant.js";
import httpCommon from "../utils/http-common.js";

const afterLoginSansthaService = {
    getAllSanstha(page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA + page);
    },
    getAllSansthaTemple(temple_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA_TEMPLE + temple_page);
    },
    getAllSansthaEducation(education_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA_EDUCATION + education_page);
    },
    getAllSansthaGaushala(gausala_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA_GAUSHALA + gausala_page);
    },
    getAllSansthaOldAge(oldage_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA_OLD_AGE + oldage_page);
    },
    getAllSansthaDharamshala(dharamshala_page) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA_DHARMSHALA + dharamshala_page);
    },
    sansthaEventAddLike(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA, body);
    },
    sansthaUserSavePost(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA, body);
    },
    sansthaOrganizationSearch(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.SANSTHA_ORGANIZATION_SEARCH, body);
    },
    getAllSansthaMuniSeva(muniseva_page){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA_MUNISEVA + muniseva_page);
    },
    getAllSansthaOrphanage(orphanage_page){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA_ORPHANAGE + orphanage_page);
    },
    getAllSansthaBhojnalya(bhojnalya_page){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_ALL_SANSTHA_BHOJNALYA + bhojnalya_page);
    },
    getSearchSanstha(body){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_SEARCH_SANSTHA , body);
    }
};

export default afterLoginSansthaService;