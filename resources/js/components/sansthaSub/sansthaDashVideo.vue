<template>
    <div>
        <section class="section_tab_dashboard_news mt-3">
            <div class="mx-3 pt-3 px-1">
                <label class="dashboard_news_title">Video</label>
                <button class="dashboard_news_btn" data-bs-toggle="modal" data-bs-target="#AddVideoModal">Add Video</button>
            </div>
        </section>
        <div class="row dashboard_news_row g-2 mt-1" v-for='(res, index)  in videoSanstha' :key="res.id">
            <div class="col-12">
                <div class="card h-100 p-2 inner_login_cards">
                    <div class="ribbon-wrapper">
                        <div class="card-badge-video">Video</div>
                    </div>
                    <div class="row">
                        <div class="ps-4 d-flex">
                            <a class="view_all_latestact" :href="`/sanstha-detail/${lastParam}`">
                                <img :src="`${get_sanstha.logo ? get_sanstha.logo[0] ? get_sanstha.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                    class="getallimg img-fluid"  :title="get_sanstha.title" :alt="get_sanstha.title">
                                <span class="d-inline-block text-truncate getallhead" :title="get_sanstha.title"
                                    alt="Organization Title">{{ get_sanstha.title }}</span>
                            </a>
                            <div class="more_option_in_cards">
                                <b-dropdown text="" class="sanstha_dashboard_more_tab_cards" no-caret>
                                    <b-dropdown-item type="button" data-bs-toggle="modal"data-bs-target="#editVideo" @click="callTwoFunctions(res.id)">
                                        <li><a class="dropdown-item">
                                            <img src="/images/edit.svg" class="card_option_edit" alt="..."> Edit</a></li>
                                    </b-dropdown-item>
                                    <b-dropdown-item type="button" data-bs-toggle="modal"  data-bs-target="#deleteModalVideo" @click="getDeleteId(res.id)">
                                        <li><a class="dropdown-item" >
                                            <img src="/images/delete.svg" class="card_option_edit" alt="...">Delete</a></li>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>

                    <!--delete modal-->
                    <div class="modal" id="deleteModalVideo">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal"
                                    data-bs-dismiss="modal" aria-label="Close" alt="...">
                                <div class="modal-body">
                                    <label class="discard1 mt-3">Are you sure you want to delete?</label>
                                    <div class="d-flex justify-content-center mt-4 mb-4 ">
                                        <button type="submit" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                        <button type="submit" class="popup_post ms-5" data-bs-dismiss="modal"
                                            @click="deleteVideoSanstha()">DELETE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body card_body_Newz" style="margin-top: -10px;">
                        <div>
                            <video controls class=" card-img-top m-1 getallnewsvideo"  :title="get_sanstha.title" :alt="get_sanstha.title">
                                <source
                                    :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                    type="video/mp4">
                            </video>
                        </div>
                        <div class="activity_card_body p-1">
                            <label class="card_header">{{ res.title }}</label>
                            <p class="section_body" v-html="res.description"></p>
                        </div>
                        <a class="read_more px-1" data-bs-target="#myReadMoreVideoModal" data-bs-toggle="modal"
                            @click="getDataById(res.id)">Read more...</a>
                    </div>
                    <div class="card-footer border-0 bg-white activity_card_footer">
                        <div class="row row-cols-4">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                <div class="text-center" style="margin-left: -45px;">
                                    <img :src="getImageUrl(res)"
                                        @click="manageLike(res, res.type = 'Video', res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                        class="footer_img" alt="...">
                                    <br><span class="icon_font">{{ total_count > 0 ? total_count : res.total_like == null ? 0 : res.total_like }}</span>
                                </div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                <div class="text-center" style="margin-left: -21px;">
                                    <a class="view_all_latestact">
                                        <img :src="getSaveImageUrl(res)"
                                            @click="manageSave(res, res.type = 'Video', res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
                                            class="footer_img" alt="...">
                                        <br>
                                        <span
                                            v-if="res?.get_user_save_post?.is_save == 1"
                                            class="icon_font">Saved
                                            Post</span>
                                        <span v-else class="icon_font">Save Post</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                <div class="text-center" style="margin-left: 16px;">
                                    <img src="/images/ic_visibility_24px.svg" class="footer_img_view" alt="...">
                                    <br><span class="icon_font">{{ res.total_view == null ? 0 : res.total_view }}</span>
                                </div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                <div class=" text-center" style="margin-left: 20px;">
                                    <a class="view_all_latestact" id="share"
                                        :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa('Video')}`"
                                        target="_blank" @click.prevent="sendToWhatsApp(get_sanstha.title , `/sharepostcard?id=${btoa(res.id)}&type=${btoa('Video')}`)">
                                        <img src="/images/Logo-WhatsApp@2x.png"class="footer_img footer_img_share" alt="...">
                                        <br><span class="icon_font">Share</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <infinite-loading @distance="1" @infinite="getVideoBasedSanstha"></infinite-loading>
        <!--edit video card modal-->
        <div class="modal" id="editVideo" tabindex="-1" aria-labelledby="editVideo" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                        aria-label="Close" alt="..." @click="onCancel()">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                <div class="card image_upload_card_media mx-3 my-3">
                                    <form>
                                        <label for="images" class="file_upload_modal_media">
                                            <media-library-collection name="video_data_array" :max-items="5"  v-if="isDataAvailable" 
                                            :validation-rules="{ accept: ['image/*', 'video/*', 'video/mp4']}" :initial-value="video_data_array"/>
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col px-4 ">
                                <div class="mx-1 mt-3 " style=" display: flex;">
                                    <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'" class="img_modal"
                                        alt="...">
                                    <label class="img_modal_title">{{ this.org_title }}</label>
                                </div>
                                <label class="head_event_descr mt-4">Title<span
                                    class="required mx-1">*</span></label><br>
                                <input type="text" class="mt-1 start_date_input" placeholder="Enter Video Title" v-model="videoData.title">
                                <label class="head_event_descr mt-4">Description</label>
                                <div ref="editorVideo2" id="editorVideo2"> </div>
                                <form class="row">
                                    <div class="mt-4">
                                        <label class="head_event_descr">Post visibility<span class="required mx-1">*</span></label>
                                        <div class="media_visiablity_div">
                                            <input class="mediaVisibility_input" type="radio" name="mediaEditVideo"
                                                id="mediaEditVideoMember" v-model="videoData.post_visiblity">
                                            <label class="form-check-label mediaTrue_label"
                                                :checked="videoData.post_visiblity === 1" for="mediaEditVideoMember">Member</label>
                                            <input class="mediaVisibility_input ms-2" type="radio" name="mediaEditVideo"
                                                id="mediaEditVideoPublic" v-model="videoData.post_visiblity">
                                            <label class="form-check-label mediaTrue_label"
                                                :checked="videoData.post_visiblity === 0" for="mediaEditVideoPublic">Public</label>
                                        </div>
                                    </div>

                                    <div class="col-12 mb-5 mt-4 popup_footer">
                                        <button type="button" class="popup_cancel"
                                            data-bs-dismiss="modal" @click="onCancel()">CANCEL</button>
                                        <button type="button" class="popup_post" data-bs-toggle="modal"
                                            data-bs-target="" @click="updateVideoSanstha()">UPDATE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Add Video Modal-->
        <div class="modal" tabindex="-1" id="AddVideoModal" aria-labelledby="AddVideoModalLabel"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                        aria-label="Close" alt="..." @click="clearField()">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                <div class="card image_upload_card_media mx-3 my-3">
                                    <form>
                                        <label for="images" class="file_upload_modal_media">
                                            <media-library-collection name="video"  :validation-rules="{ accept: ['image/png', 'image/*', 'video/mp4','video/*'] }" :before-upload="checkFileValidity"/>
                                        </label>
                                    </form>
                                </div>

                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col">
                                <div class=" mx-3" style="margin-top: 25px !important;">
                                    <img :src="`${get_sanstha.logo ? get_sanstha.logo[0] ? get_sanstha.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                        class="img_modal" alt="...">
                                    <label class="img_modal_title">{{ this.get_sanstha.title }}</label>
                                    <br><label class="head_event_descr mt-4">Title<span
                                        class="required mx-1">*</span></label>
                                    <input type="text" class="mt-1 start_date_input form-control"
                                        placeholder="Enter Video Title" v-model="videoTitle">
                                    <div style="color: red;">{{ this.titleErr }}</div>
                                    <label class="head_event_descr mt-4">Description</label>
                                    <div id="editorVideo1" ref="editorVideo1">
                                    </div>
                                    <form class="row">
                                        <div class="mt-4">
                                            <label class="head_event_descr ">Post visibility<span
                                                class="required mx-1">*</span> </label>
                                            <div class="media_visiablity_div">
                                                <input class="mediaVisibility_input" type="radio" name="mediaAddVideo"
                                                    id="mediaAddVideoMember" value="Member"
                                                    v-model="videoPost_visiblity">
                                                <label class="form-check-label mediaTrue_label"
                                                    for="mediaAddVideoMember">Member</label>
                                                <input class="mediaVisibility_input ms-2" type="radio"
                                                    name="mediaAddVideo" id="mediaAddVideoPublic" value="Public"
                                                    v-model="videoPost_visiblity">
                                                <label class="form-check-label mediaTrue_label"
                                                    for="mediaAddVideoPublic">Public</label>
                                            </div>
                                        </div>

                                        <div class="col-12 mb-5 mt-4 popup_footer">
                                            <button type="button" class="popup_cancel" data-bs-dismiss="modal"
                                                @click="clearField()">CANCEL</button>
                                            <button type="button" class="popup_post" @click="addVideoSanstha()">POST</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Read more -->
        <div class="modal" id="myReadMoreVideoModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close"><i
                            class="bi bi-x-lg"></i></button>
                    <div class="modal-body" style="padding-bottom: 0%;">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                <div class="swiper slider" v-if="img.length > 0">
                                    <div class="swiper-wrapper" v-for="(res, index) in img" :key="index"
                                        v-if="index === selectedImageIndex">
                                        <video controls :src="res.original_url"
                                            class="video_slider image_slider img-fluid" :alt="org_title" :title="org_title">
                                        </video>
                                    </div>
                                </div>
                                <div class="swiper-slide" v-else>
                                    <img src="/images/jd_card_logo.png" :alt="org_title" :title="org_title"  class="image_slider img-fluid">
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-2 m-1">Gallery</label>
                                <div class="swiper thumbnail thumbnailSansthaVideo">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in img" :key="index" class="swiper-slide">
                                            <video controls :src="res.original_url"
                                                class="image_slider_down img-fluid video_slider"
                                                @click="selectImage(index)">
                                            </video>
                                        </div>

                                    </div>
                                    <div class="next_div" v-if="img.length > 3" @click="nextSlideSansthVideo"><i
                                            class="bi bi-chevron-right"></i></div>
                                    <div class="prev_div" v-if="img.length > 3" @click="prevSlideSansthaVideo"><i
                                            class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-3 g-0 ">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <a class="view_all_latestact"
                                                        :href="`/sanstha-detail/${lastParam}`">
                                                        <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                            class="modal_card_head_img" :alt="org_title" :title="org_title">
                                                    </a>
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ">
                                                    <a class="view_all_latestact"
                                                        :href="`/sanstha-detail/${lastParam}`">
                                                        <label
                                                            class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                            :alt="org_title" :title="org_title" >{{ org_title }}</label>
                                                    </a>
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ms-auto ">
                                                    <button class="btn btn_following btn_following_modal"
                                                        @click="manageFollowMore()" type="submit">
                                                        <img :src="getFollowImageMore()" class="flw_btn_img"
                                                            alt="..."></button>
                                                </div>
                                            </div>
                                        </div><!--end of card head-->
                                        <div class="card-body p-2 ">
                                            <label class="card_modal_body-title">{{ dash_sanstha.title }}</label>
                                            <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': img.length > 0 }">
                                                <p class="card_modal_body_details p-2"
                                                    v-html="dash_sanstha.description">
                                                </p>
                                            </div>
                                        </div>
                                        <div class="dash p-2"></div>
                                        <div class="card-footer bg-white border-0 mt-2">
                                            <div class="row text-center row-cols-4 modal_footer_row">
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img :src="getImageLike()" @click="manageLikeMore()"
                                                            class="footer_img" alt="...">
                                                        <br><span class="icon_font">{{ total_count > 0 ? total_count : dash_sanstha.total_like == null ? 0 : dash_sanstha.total_like }}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <a class="view_all_latestact">
                                                            <img :src="getSaveImageMore()" @click="manageSaveMore()"
                                                                class="footer_img" alt="...">
                                                            <br><span class="icon_font">Save Post</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img src="/images/ic_visibility_24px.svg" class="footer_img_view"
                                                            alt="...">
                                                        <br><span class="icon_font ">{{ dash_sanstha.total_view ==
            null
                                                            ? 0 : dash_sanstha.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class=" text-center">
                                                        <a class="view_all_latestact" id="share"
                                                            :href="`/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`"
                                                            target="_blank" @click.prevent="sendToWhatsApp(org_title , `/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`)">
                                                            <img src="/images/Logo-WhatsApp@2x.png"class="footer_img footer_img_share" alt="...">
                                                            <br><span class="icon_font">Share</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div><!--end of card-footer-->
                                    </div><!--end of card-->
                                </section><!--end of section-right-->
                            </div><!--end of col-->
                        </div><!--end of row-->
                    </div><!--end of modal-body-->
                </div><!--end of modal-content-->
            </div><!--end of modal-dialog-->
        </div>
    </div>
</template>
<script>
import sansthaDetailService from '../../../services/sansthaDetail.service';
import afterLoginHomeService from '../../../services/afterLoginHome.service';
import { MediaLibraryCollection } from "@spatie/media-library-pro-vue2-collection";
import { sendToWhatsApp } from '../../../utils/sharefunction.js';
import { initializeQuillEditors } from '../../../utils/quilleditor';
import { handleLike, handleSave } from '../../../common/common';

export default {
    name: "App",
    data() {
        return {
            videoChange: '', dash_sanstha: [], img: '', selectedImageIndex: 0, org_logo: '',media:[],
            videoPost_visiblity: '', titleErr: '',  post_error: '', get_sanstha: [], video_del_id: '', videoTitle: '',
            selectedSansthaVideoURL1: '', selectedVideoURL: '', org_title: '', org_logo: '', org_detail: '', frm_img: '', news_id: '',
            video_page: 1, videoSanstha: [], videoData: [], total_count: '', video_id: '', lastParam: '',  get_sanstha: '',
            video_data_array: {},isDataAvailable:false
        }
    },
    components: {
        MediaLibraryCollection,
    },
    created() {
        if (this.videoSanstha.length === 0) {
            this.getVideoBasedSanstha();
        }
    },
    mounted() {
        const { quill5, quill6 } = initializeQuillEditors(this.$refs.editorVideo1, this.$refs.editorVideo2);
        this.quill5 = quill5;
        this.quill6 = quill6;
        const thumbnailSansthaVideo = new Swiper('.thumbnailSansthaVideo', {
            slidesPerView: 'auto',
        });

        const slider = new Swiper('.slider', {
            loop: true,
            grabCursor: true,
            thumbs: {
                swiper: thumbnailSansthaVideo
            },
        });
    },
    beforeMount() {
        this.activate();
    },
    methods: {
        beforeUpload(file) {
            const isValidType = ['image/jpeg', 'image/png', 'video/mp4'].includes(file.type);
            const isValidSize = file.size / 1024 / 1024 < 15; // Convert size to MB
            if (!isValidType) {
                this.$message.error('You can only upload JPG, PNG, or MP4 files!');
            }
            if (!isValidSize) {
                this.$message.error('File must be smaller than 15MB!');
            }
            return isValidType && isValidSize;
        },
        checkFileValidity(file) {
            this.media.push(file);
        },
        onCancel(){
            this.isDataAvailable = false;
        },
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        btoa(input) {
            return btoa(input);
        },
        selectImage(index) {
            this.selectedImageIndex = index;
        },
        btoa(input) {
            return btoa(input);
        },
        async getTypedSanstha() {
            const data = {
                params: {
                    store_type: "Video",
                    id: this.video_id,
                }
            }
            const response = await sansthaDetailService.getDetailSanstha({ ...data });
            if (response.status === 200 || 201) {
                this.dash_sanstha = response
                this.img = response.banner;
                this.org_logo = this.dash_sanstha.organization.logo[0].original_url
                this.org_title = this.dash_sanstha?.organization?.title
                this.poId = this.dash_sanstha.id
                this.typePo = this.dash_sanstha.type
                this.startDate = this.dash_sanstha.start_date_and_time
                this.endDate = this.dash_sanstha.end_date_and_time
            } else {
                console.error("Something went wrong")
            }
        },
        getImageLike() {
            if (this.dash_sanstha.get_user_likes == null) {
                return '/images/ic_unfavorite_24px.svg';
            } else if (this.dash_sanstha.get_user_likes.is_like === 1) {
                return '/images/ic_favorite_24px.svg';
            } else {
                return '/images/ic_unfavorite_24px.svg';
            }
        },
        async manageLikeMore() {
            let is_like = 0;
            if (this.dash_sanstha.get_user_likes) {
                is_like = this.dash_sanstha.get_user_likes.is_like;
            }
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? this.dash_sanstha.total_like + 1 : this.dash_sanstha.total_like - 1;
            let img = newIsLike === 1 ? 'images/ic_favorite_24px.svg' : 'images/ic_unfavorite_24px.svg';

            this.$set(this.dash_sanstha, 'img', img); // Update the image path
            if (this.dash_sanstha.get_user_likes) {
                this.$set(this.dash_sanstha.get_user_likes, 'is_like', newIsLike);
            } else {
                this.$set(this.dash_sanstha, 'get_user_likes', { is_like: newIsLike });
            }
            this.$set(this.dash_sanstha, 'total_like', newLikeCount); // Update total_like
            const newsIndex = this.videoSanstha.findIndex(video => video.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                this.$set(this.videoSanstha[newsIndex], 'total_like', newLikeCount); // Update total_like
                if (this.videoSanstha[newsIndex].get_user_likes) {
                    this.$set(this.videoSanstha[newsIndex].get_user_likes, 'is_like', newIsLike);
                } else {
                    this.$set(this.videoSanstha[newsIndex], 'get_user_likes', { is_like: newIsLike });
                }
            }
            await handleLike(newIsLike, this.typePo, this.poId);
        },
        getSaveImageMore() {
            if (this.dash_sanstha.get_user_save_posts == null) {
                return '/images/ic_add_box_24px.svg';
            } else if (this.dash_sanstha.get_user_save_posts.is_save === 1) {
                return '/images/ic_add_fav_box_24px.svg';
            } else {
                return '/images/ic_add_box_24px.svg';
            }
        },
        async manageSaveMore() {
            let is_save;
            if (this.dash_sanstha.get_user_save_posts == null) {
                is_save = 0;
            } else {
                is_save = this.dash_sanstha.get_user_save_posts.is_save;
            }
            const newIsSave = is_save === 1 ? 0 : 1;
            let img = newIsSave === 1 ? 'images/ic_add_box_24px.svg' : 'images/ic_add_box_24px.svg';
            this.$set(this.dash_sanstha, 'img', img); // Update the image path
            if (this.dash_sanstha.get_user_save_posts) {
                this.$set(this.dash_sanstha.get_user_save_posts, 'is_save', newIsSave);
            } else {
                this.$set(this.dash_sanstha, 'get_user_save_posts', { is_save: newIsSave });
            }
            const newsIndex = this.videoSanstha.findIndex(video => video.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.videoSanstha[newsIndex].get_user_save_posts) {
                    this.$set(this.videoSanstha[newsIndex].get_user_save_posts, 'is_save', newIsSave);
                } else {
                    this.$set(this.videoSanstha[newsIndex], 'get_user_save_posts', { is_save: newIsSave });
                }
            }
            await handleSave(newIsSave, this.typePo, this.poId);
        },
        getFollowImageMore() {
            if (this.dash_sanstha.get_user_org_follows == null) {
                return '/images/follow_btn.svg';
            } else if (this.dash_sanstha.get_user_org_follows.is_follow === 1) {
                return '/images/following_btn.svg';
            } else {
                return '/images/follow_btn.svg';
            }
        },
        async manageFollowMore() {
            let is_follow = 0;
            if (this.dash_sanstha.get_user_org_follows) {
                is_follow = this.dash_sanstha.get_user_org_follows.is_follow;
            }
            const newIsFollow = is_follow === 1 ? 0 : 1;
            let img = newIsFollow === 1 ? 'images/following_btn.svg' : 'images/follow_btn.svg';

            this.$set(this.dash_sanstha, 'img', img); // Update the image path
            if (this.dash_sanstha.get_user_org_follows) {
                this.$set(this.dash_sanstha.get_user_org_follows, 'is_follow', newIsFollow);
            } else {
                this.$set(this.dash_sanstha, 'get_user_org_follows', { is_follow: newIsFollow });
            }
            const newsIndex = this.videoSanstha.findIndex(video => video.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.videoSanstha[newsIndex].get_user_org_follows) {
                    this.$set(this.videoSanstha[newsIndex].get_user_org_follows, 'is_follow', newIsFollow);
                } else {
                    this.$set(this.videoSanstha[newsIndex], 'get_user_org_follows', { is_follow: newIsFollow });
                }
            }
            const data = {
                is_follow: newIsFollow,
                organisation_id: this.dash_sanstha.organization_id,
            };
            try {
                const response = await afterLoginHomeService.followUnfollowOrganization({ ...data })
                if (response.status === 200 || 201) {
                    // window.location.href = 'select-sanstha-category';
                } else {
                    console.error("Something went wrong")
                }
            } catch (error) {
                console.error("Error making API call:", error);
            }
        },
        nextSlideSansthVideo() {
            const thumbnailSansthaVideo = document.querySelector('.thumbnailSansthaVideo').swiper;
            thumbnailSansthaVideo.slideNext();
        },
        prevSlideSansthaVideo() {
            const thumbnailSansthaVideo = document.querySelector('.thumbnailSansthaVideo').swiper;
            thumbnailSansthaVideo.slidePrev();
        },
        isImage(url) {
            return /\.(jpeg|jpg|png)$/i.test(url);
        },
        isVideo(url) {
            return /\.(mp4)$/i.test(url);
        },
        cancelImg() {
            this.clearField();
        },
        handleVideoSansthaChange() {
            const fileRemoveInput = this.$refs.fileRemoveInput;
            if (fileRemoveInput.files && fileRemoveInput.files[0]) {
                this.videoChange = fileRemoveInput.files[0]
                const allowedExtensions = ["jpg", "jpeg", "png", "mp4", "mov", "avi"];
                const fileName = fileRemoveInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();
                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedSansthaVideoURL1 = URL.createObjectURL(fileRemoveInput.files[0]);
                    fileRemoveInput.value = "";
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, PNG, MP4, MOV, or AVI file.");
                    fileRemoveInput.value = "";
                }
            }
        },
        async activate() {
            const url = window.location.href;
            this.lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: this.lastParam
                }
            }
            const response = await sansthaDetailService.getSanstha({ ...data });
            this.get_sanstha = response;
        },
        async addVideoSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            this.titleErr = '';
            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;

            let post_visiblity = false;
            if (this.videoPost_visiblity === "Member") {
                post_visiblity = true;
            }

            if (!this.videoTitle) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.videoTitle)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.videoTitle)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (!this.videoPost_visiblity) {
                this.post_error = 'Please select any one visibility';
                return;
            }
            if (this.titleErr) {
                return;
            }

            const data = {
                organization_id: lastParam,
                post_visiblity: post_visiblity,
                title: this.videoTitle,
                detail: this.quill5.getText(),
                is_active: 1,
                content_language_id: 1,
                created_by_id: userId
            };
            try {
                const response = await sansthaDetailService.addVideoSanstha({ ...data });
                if (response.status == 200 || response.status == 201) {
                    if (this.media.length > 0) {
                        const formData = new FormData();
                        formData.append('model_id', response.data.id);
                        this.media.forEach(file => {
                            formData.append('file[]', file);
                        });
                        formData.append('type', 'mobile_api');
                        const response1 = await sansthaDetailService.addVideoMedia(formData)
                        if (response1.status == 200 || response1.status == 201) {
                            this.$forceUpdate();
                            const updatedAlbum = response.data;
                            updatedAlbum.banner = [response1];
                            this.videoSanstha.unshift(updatedAlbum);
                            $('#AddVideoModal').modal('hide');
                            const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                            if (mediaLibraryRows) {
                                mediaLibraryRows.forEach(row => {
                                    row.click();
                                });
                            }
                            this.$toast.success("Video added successfully");
                            this.selectedSansthaVideoURL1 = '';
                            this.videoChange = '';
                            this.clearField();
                        } else {
                            this.$toast.error('Please set proper address!');
                        }
                    } else {
                        this.videoSanstha.unshift(response.data);
                        $('#AddVideoModal').modal('hide');
                        this.selectedSansthaVideoURL1 = '';
                        this.clearField();
                        this.$toast.success("Video added successfully");
                        response.data = '';
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        async updateVideoSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;

            const data = {
                organization_id: lastParam,
                post_visiblity: this.videoPost_visiblity,
                title: this.videoData.title,
                detail: this.quill6.getText(),
                is_active: 1,
                content_language_id: 1,
                created_by_id: userId
            };
            try {
                const response = await sansthaDetailService.updateVideoSanstha(this.video_id, data);
                if (response.status == 200 || response.status == 201 || response.status == 202) {
                    if (this.media.length > 0 ) {
                        const formData = new FormData();
                        formData.append('model_id', response.data.id);
                        this.media.forEach(file => {
                            formData.append('file[]', file);
                        });
                        formData.append('type', 'mobile_api');
                        const response1 = await sansthaDetailService.addNewsMedia(formData);
                        if (response1.status === 200 || 201 || 202) {
                            this.$forceUpdate();
                            const updatedVideosIndex = this.videoSanstha.findIndex(video => video.id === this.video_id);
                            if (updatedVideosIndex !== -1) {
                                this.$set(this.videoSanstha[updatedVideosIndex], 'title', response.data.title);
                                this.$set(this.videoSanstha[updatedVideosIndex], 'detail', response.data.detail);
                                this.$set(this.videoSanstha[updatedVideosIndex], 'banner', [{ original_url: response1.original_url }]);
                            }
                            $('#editVideo').modal('hide');
                            this.$toast.success("News updated successfully");
                            this.selectedImageURL = ''
                        } else {
                            this.$toast.error('Please set proper address!');
                        }
                    } else {
                        $('#editNews').modal('hide');
                        this.selectedImageURL = ''
                        this.$toast.success("News updated successfully");
                        const updatedVideoIndex = this.videoSanstha.findIndex(video => video.id === this.video_id);
                        if (updatedVideoIndex !== -1) {
                            this.$set(this.videoSanstha[updatedVideoIndex], 'title', response.data.title);
                            this.$set(this.videoSanstha[updatedVideoIndex], 'detail', response.data.detail);
                        }
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        getDataById(resId) {
            this.video_id = resId
            if (this.video_id) {
                this.getTypedSanstha();
            }
        },
        handleVideoChange() {
            const videoInput = this.$refs.videoInput;
            if (videoInput.files && videoInput.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = videoInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedVideoURL = URL.createObjectURL(videoInput.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    videoInput.value = "";
                }
            }
        },
        getDeleteId(resId) {
            this.video_del_id = resId
        },
        async deleteVideoSanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const response = await sansthaDetailService.deleteVideoSanstha(this.video_del_id);
            if (response.status == 200 || response.status == 201 || response.status == 204) {
                this.$toast.success("News deleted successfully");
                const index = this.videoSanstha.findIndex(video => video.id === this.video_del_id);
                if (index !== -1) {
                    this.videoSanstha.splice(index, 1);
                }
            } else {
                console.error("Something went wrong");
                this.$toast.error("Something went wrong");
            }
        },
        getEditId(resId) {
            this.video_id = resId
        },

        callTwoFunctions(id) {
            this.getEditId(id);
            this.getParticularSansthaVideo();
        },
        async getParticularSansthaVideo() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    type: "web"
                }
            }
            const response = await sansthaDetailService.getParticularVideoSanstha(this.video_id, data);
            if (response.status == 200 || response.status == 201) {
                this.videoData = response.data;
                this.video_data_array = response.media_img;
                this.isDataAvailable = true;
                this.org_title = response.data.organization.title;
                this.org_logo = response.data?.organization?.logo[0]?.original_url;
                this.frm_img = response.data?.banner[0]?.original_url;
                if (this.videoData?.detail && this.videoData?.detail?.ops) {
                    this.quill6.setContents(this.videoData?.detail);
                } else {
                    this.quill6.setText(this.videoData?.detail);
                }
            } else {
                console.error("Something went wrong");
            }
        },
        getImageUrl(res) {
            if (res.get_user_likes == null) {
                return '/images/ic_unfavorite_24px.svg';
            } else if (res.get_user_likes.is_like === 1) {
                return '/images/ic_favorite_24px.svg';
            } else {
                return '/images/ic_unfavorite_24px.svg';
            }
        },
        getSaveImageUrl(res) {
            if (res.get_user_save_posts == null) {
                return '/images/ic_add_box_24px.svg';
            } else if (res.get_user_save_posts.is_save === 1) {
                return '/images/ic_add_fav_box_24px.svg';
            } else {
                return '/images/ic_add_box_24px.svg';
            }
        },
        async manageLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.videoSanstha[index],
                get_user_likes: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.videoSanstha, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.videoSanstha[index],
                get_user_save_posts: { is_save: newIsSave },
            };
            this.$set(this.videoSanstha, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        async getVideoBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllVideoSanstha(this.video_page, data);
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, async (key, value) => {
                        this.video_id = value.id;
                        const data = {
                            event_id: '',
                            news_id: '',
                            appeal_id: '',
                            video_id: this.video_id
                        }
                        const response = await afterLoginHomeService.viewEventNews({ ...data })
                        if (response.status === 200 || 201) {
                        } else {
                            console.error("Something went wrong")
                        }
                    });
                    this.videoSanstha.push(...response.data);
                    this.video_page = this.video_page + 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        clearField() {
            const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
            if (mediaLibraryRows) {
                mediaLibraryRows.forEach(row => {
                    row.click();
                });
            }
            this.titleErr = "";
            this.videoTitle = "";
            this.quill5.setText('');
            this.videoPost_visiblity = "";
            this.selectedSansthaVideoURL1 = "";
        },
    },
}
</script>