import { CONSTANT } from "../common/constant";
import httpCommon from "../utils/http-common.js";

const sansthaDetailService = {
    getDetailSanstha(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_DETAIL_SANSTHA, body );
    },
    // getSanstha(lastParam) {
    //     return httpCommon.get(CONSTANT.API_CONSTANT.GET_SANSTHA + lastParam);
    // },
    getSanstha(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_SANSTHA, body);
    },
    getSansthaParticular(lastParam) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_SANSTHA_PARTICULAR + lastParam);
    },
    getAllEventSanstha(event_page,body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_EVENTBASEDSANSTHA + event_page,body);
    },
    getAllNewsSanstha(news_page,body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_NEWSBASEDSANSTHA + news_page,body);
    },
    getParticularNewsSanstha(news_id, body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_PARTICULAR_NEWSBASEDSANSTHA + news_id, body);
    },
    addNewsSanstha(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_NEWSBASEDSANSTHA , body);
    },
    addProfileChange(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_PROFILEIMG , body);
    },
    updateGallarySanstha(album_id, body) {
        return httpCommon.put(CONSTANT.API_CONSTANT.UPDATE_PARTICULAR_GALLARYBASEDSANSTHA + album_id, body);
    },
    deleteNewsSanstha(news_id) {
        return httpCommon.delete(CONSTANT.API_CONSTANT.DELETE_PARTICULAR_NEWSBASEDSANSTHA + news_id);
    },
    deleteVideoSanstha(video_id) {
        return httpCommon.delete(CONSTANT.API_CONSTANT.DELETE_PARTICULAR_VIDEOBASEDSANSTHA + video_id);
    },
    getParticularEventsSanstha(event_id, data) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_PARTICULAR_EVENTBASEDSANSTHA + event_id, data);
    },
    updateEventSanstha(event_id, body) {
        return httpCommon.put(CONSTANT.API_CONSTANT.UPDATE_PARTICULAR_EVENTBASEDSANSTHA + event_id, body);
    },
    deleteEventSanstha(event_id) {
        return httpCommon.delete(CONSTANT.API_CONSTANT.DELETE_PARTICULAR_EVENTBASEDSANSTHA + event_id);
    },
    getCommitteeMember(body){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_COMMITTEE_MEMBER,body);
    },
    getExploreSansthaList(body){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_EXPLOREMORE_LIST ,body);
    },
    addSansthaDashCommittee(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_SANSTHA_COMMITTEE ,body);
    },
    addImgSanstha(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_SANSTHA_IMG ,body);
    },
    deleteCommittee(commiteeId) {
        return httpCommon.delete(CONSTANT.API_CONSTANT.DELETE_COMMITTEE_MEMBER + commiteeId);
    },
    editCommittee(commiteeEditId) {
        return httpCommon.get(CONSTANT.API_CONSTANT.EDIT_COMMITTEE_MEMBER + commiteeEditId);
    },
    updateCommittee(commiteeEditId,body) {
        return httpCommon.put(CONSTANT.API_CONSTANT.UPDATE_COMMITTEE_MEMBER + commiteeEditId, body);
    },
    addEventSanstha(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_EVENTBASEDSANSTHA , body);
    },
    getParticularSanstha(sansthaId) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_SANSTHA_PARTICULAR + sansthaId);
    },
    getActiveSansthaMember(body){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_SANSTHA_MEMBER ,body);
    },
    getNewSansthaMember(body){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_SANSTHA_MEMBER ,body);
    },
    getRejectSansthaMember(body){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_SANSTHA_MEMBER ,body);
    },
    editParticularSanstha(orgId,body){
        return httpCommon.put(CONSTANT.API_CONSTANT.EDIT_SANSTHA_PARTICULAR + orgId ,body);
    },
    deleteAppealSanstha(appeal_id) {
        return httpCommon.delete(CONSTANT.API_CONSTANT.DELETE_PARTICULAR_APPEALBASEDSANSTHA + appeal_id);
    },
    deleteCpSanstha(cp_id) {
        return httpCommon.delete(CONSTANT.API_CONSTANT.DELETE_PARTICULAR_CPBASEDSANSTHA + cp_id);
    },
    deleteGallaryAlbum(body) {
        return httpCommon.delete(CONSTANT.API_CONSTANT.DELETE_PARTICULAR_GALLARYALBUM , body);
    },
    deleteGallaryFolder(body) {
        return httpCommon.delete(CONSTANT.API_CONSTANT.DELETE_PARTICULAR_GALLARYFOLDER , body);
    },
    editParticularGallaryFolder(orgId,body){
        return httpCommon.put(CONSTANT.API_CONSTANT.EDIT_SANSTHA_PARTICULAR + gallaryId ,body);
    },
    getAllAppealSanstha(appeal_id,body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_APPEALBASEDSANSTHA + appeal_id,body);
    },
    getParticularAppealSanstha(appeal_id, body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_PARTICULAR_APPEALBASEDSANSTHA + appeal_id, body);
    },
    updateAppealSanstha(appeal_id, body) {
        return httpCommon.put(CONSTANT.API_CONSTANT.UPDATE_PARTICULAR_APPEALBASEDSANSTHA + appeal_id, body);
    },
    updateNewsSanstha(news_id, body) {
        return httpCommon.put(CONSTANT.API_CONSTANT.UPDATE_PARTICULAR_NEWSBASEDSANSTHA + news_id, body);
    },
    updateVideoSanstha(video_id, body) {
        return httpCommon.put(CONSTANT.API_CONSTANT.UPDATE_PARTICULAR_VIDEOBASEDSANSTHA + video_id, body);
    },
    updateCpSanstha(cp_id, body) {
        return httpCommon.put(CONSTANT.API_CONSTANT.UPDATE_PARTICULAR_CPBASEDSANSTHA + cp_id, body);
    },
    getStates(){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_STATES);
    },
    getCities(body){
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_CITIES, body);
    },
    addEventMedia(body){
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_EVENT_MEDIA, body);
    },
    addNewsMedia(body){
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_NEWS_MEDIA, body);
    },
    addAppealMedia(body){
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_APPEAL_MEDIA, body);
    },
    addVideoMedia(body){
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_VIDEO_MEDIA, body);
    },
    addAppealSanstha(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_APPEALBASEDSANSTHA , body);
    },
    addVideoSanstha(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_VIDEOBASEDSANSTHA , body);
    },
    getAllVideoSanstha(video_id,body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_VIDEOBASEDSANSTHA + video_id,body);
    },
    getAllCustomPageSanstha(customPage_id,body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_CUSTOMPAGEBASEDSANSTHA + customPage_id,body);
    },
    getAllGallerySanstha(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_GALLERYBASEDSANSTHA ,body);
    },
    addGallarySanstha(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_GALLARYBASEDSANSTHA , body);
    },
    getAboutGallerySanstha(body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_GALLERYABOUTSANSTHA ,body);
    },
    getParticularCp(cp_id, body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_PARTICULAR_CPBASEDSANSTHA + cp_id, body);
    },
    getParticularVideoSanstha(video_id, body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_PARTICULAR_VIDEOBASEDSANSTHA + video_id, body);
    },
    getParticularGallarySanstha(gallary_id, body) {
        return httpCommon.get(CONSTANT.API_CONSTANT.GET_PARTICULAR_GALLARYBASEDSANSTHA + gallary_id, body);
    },
    addGallaryMedia(body){
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_GALLARY_IMG, body);
    },
    addCpSanstha(body) {
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_CUSTOMPAGEBASEDSANSTHA , body);
    },
    addCpMedia(body){
        return httpCommon.post(CONSTANT.API_CONSTANT.ADD_CP_IMG, body);
    },
};

export default sansthaDetailService;