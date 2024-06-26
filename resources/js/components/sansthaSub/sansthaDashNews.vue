<template>
    <div x-data="app()" x-cloak>
        <section class="section_tab_dashboard_news mt-3">
            <div class="mx-3 pt-3 px-1">
                <label class="dashboard_news_title">News</label>
                <button class="dashboard_news_btn" data-bs-toggle="modal" data-bs-target="#AddNewsModal">Add News</button>
            </div>
        </section>

        <div class="row dashboard_news_row g-2 mt-1" id="news-data" v-for='(res, index) in newsSanstha' :key="res.id">
            <div class="col-12">
                <div class="card h-100 p-2 inner_login_cards">
                    <div class="ribbon-wrapper">
                        <div class="card-badge-news">News</div>
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
                                    <b-dropdown-item type="button" data-bs-target="#editNews"
                                    data-bs-toggle="modal" @click="callTwoFunctions(res.id)">
                                        <li><a class="dropdown-item">
                                            <img src="/images/edit.svg" class="card_option_edit" alt="...">Edit</a>
                                        </li>
                                    </b-dropdown-item>
                                    <b-dropdown-item  type="button" data-bs-toggle="modal"
                                    data-bs-target="#deleteModalNews" @click="getDeleteId(res.id)">
                                        <li><a class="dropdown-item">
                                            <img src="/images/delete.svg" class="card_option_edit" alt="...">Delete</a></li>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="modal" id="deleteModalNews">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal"
                                    data-bs-dismiss="modal" aria-label="Close" alt="...">
                                <div class="modal-body">
                                    <label class="discard1 mt-3">Are you sure you want to delete?</label>
                                    <div class="d-flex justify-content-center mt-4 mb-4 ">
                                        <button type="submit" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                        <button type="submit" class="popup_post ms-5" data-bs-dismiss="modal" @click="deleteNewsSanstha()">DELETE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body card_body_Newz" style="margin-top: -10px;">
                        <!-- <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                            class="getallnewsimg card-img-top img-fluid m-1 text-center" alt="..."> -->
                        <img :src="getBannerImageUrl(res.banner)" class="getallnewsimg card-img-top img-fluid m-1 text-center"  :title="get_sanstha.title" :alt="get_sanstha.title">
                        <div class="activity_card_body p-1">
                            <label class="card_header">{{ res.title }}</label>
                            <p class="section_body" v-html="res.detail"></p>
                        </div>
                        <a class="read_more px-1" data-bs-target="#myReadMoreNewsModal" data-bs-toggle="modal"
                            @click="getDataById(res.id)">Read more...</a>
                    </div>
                    <div class="card-footer border-0 bg-white activity_card_footer">
                        <div class="row row-cols-4">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                <div class="text-center" style="margin-left: -45px;">
                                    <img :src="getImageUrl(res)"
                                        @click="manageLike(res, res.type = 'News', res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                        class="footer_img" alt="...">
                                    <br><span class="icon_font">{{ total_count > 0 ? total_count : res.total_like == null ? 0 : res.total_like }}</span>
                                </div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                <div class="text-center" style="margin-left: -21px;">
                                    <a class="view_all_latestact">
                                        <img :src="getSaveImageUrl(res)"
                                            @click="manageSave(res, res.type = 'News', res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
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
                                        :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa('News')}`"
                                        @click.prevent="sendToWhatsApp(get_sanstha.title , `/sharepostcard?id=${btoa(res.id)}&type=${btoa('News')}`)" target="_blank">
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
        <infinite-loading @distance="1" @infinite="getNewsBasedSanstha"></infinite-loading>
        <!--edit news-->
        <div class="modal" id="editNews" tabindex="-1" aria-labelledby="editNews" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                        aria-label="Close" @click="onCancel()" alt="...">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                <div class="card image_upload_card_media mx-3 my-3">
                                    <form>
                                        <label for="images" class="file_upload_modal_media">
                                            <media-library-collection v-if="isDataAvailable" name="news_data_array" :max-items="5" :initial-value="news_data_array" :validation-rules="{ accept: ['image/png', 'image/jpeg', 'image/*'] }" :before-upload="checkFileValidity" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col px-4 ">
                                <div class="mx-1 mt-3 " style=" display: flex;">
                                    <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                        class="img_modal" alt="...">
                                    <label class="img_modal_title">{{ org_title }}</label>
                                </div>
                                <label class="head_event_descr mt-4">Title<span class="required mx-1">*</span></label>
                                <input type="text" class="mt-1 start_date_input form-control" placeholder="Enter News Title" v-model="newsData.title">
                                <div style="color: red;">{{ this.titleErr }}</div>
                                <label class="head_event_descr mt-4">News Description</label>
                                <div id="editorNews2" ref="editorNews2"></div>
                                <form class="row ">
                                    <div class="mt-4">
                                        <label class="head_event_descr">Post visibility<span class="required mx-1">*</span></label>
                                        <div class="media_visiablity_div">
                                            <input class="mediaVisibility_input" type="radio" name="mediaNews"
                                                id="mediaEditNewsMember" v-model="newsData.post_visiblity" :value=1>
                                            <label class="form-check-label mediaTrue_label" for="mediaEditNewsMember"
                                                :checked="newsData.post_visiblity === 1">Member</label>
                                            <input class="mediaVisibility_input ms-2" type="radio" name="mediaNews"
                                                id="mediaEditNewsPublic" v-model="newsData.post_visiblity" :value=0>
                                            <label class="form-check-label mediaTrue_label" for="mediaEditNewsPublic"
                                                :checked="newsData.post_visiblity === 0">Public</label>
                                        </div>
                                        <div style="color: red;">{{ this.post_error }}</div>
                                    </div>

                                    <div class="col-12 mb-5 mt-4 popup_footer">
                                        <button type="button" class="popup_cancel" data-bs-dismiss="modal" @click="onCancel()">CANCEL</button>
                                        <button type="button" class="popup_post" data-bs-toggle="modal" data-bs-target="" @click="updateNewsSanstha()">UPDATE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--add news-->
        <div class="modal" tabindex="-1" id="AddNewsModal" aria-labelledby="AddNewsModalLabel" data-bs-backdrop="static"
            data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                        aria-label="Close" @click="clearField()" alt="...">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                <div class="card image_upload_card_media  mx-3 my-3">
                                    <form>
                                        <label for="images" class="file_upload_modal_media">
                                            <media-library-collection name="images" :max-items="5" ref="images"
                                                :validation-rules="{ accept: ['image/jpeg', 'image/png', 'image/*'], }"
                                                :before-upload="checkFileValidity" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col">
                                <div class=" mx-3" style="margin-top: 25px !important;">
                                    <img :src="`${get_sanstha.logo ? get_sanstha.logo[0] ? get_sanstha.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                        class="img_modal" alt="...">
                                    <label class="img_modal_title">{{ this.get_sanstha.title }}</label>
                                    <br><label class="head_event_descr mt-4">Title<span class="required mx-1">*</span></label>
                                    <input type="text" class="mt-1 start_date_input form-control" placeholder="Enter News Title" v-model="newsTitle">
                                    <div style="color: red;">{{ this.titleErr }}</div>
                                    <label class="head_event_descr mt-4">Description</label>
                                    <div id="editorNews1" ref="editorNews1"></div>
                                    <form class="row">
                                        <div class="mt-4">
                                            <label class="head_event_descr">Post visibility<span class="required mx-1">*</span></label>
                                            <div class="media_visiablity_div">
                                                <input class="mediaVisibility_input" type="radio" name="mediaNews"
                                                    id="mediamemberEvent" value="Member" v-model="newsPost_visiblity">
                                                <label class="form-check-label mediaTrue_label" for="mediamemberEvent">Member</label>
                                                <input class="mediaVisibility_input ms-2" type="radio" name="mediaNews"
                                                    id="mediaPublicEvent" value="Public" v-model="newsPost_visiblity">
                                                <label class="form-check-label mediaTrue_label" for="mediaPublicEvent">Public</label>
                                            </div>
                                            <div style="color: red;">{{ this.post_error }}</div>
                                        </div>

                                        <div class="col-12 mb-5 mt-4 popup_footer">
                                            <button type="button" class="popup_cancel" data-bs-dismiss="modal" @click="clearField()">CANCEL</button>
                                            <button type="button" class="popup_post" @click="addNewsSanstha()" :disabled="isSubmitting">
                                                <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                <span v-if="!isSubmitting">POST</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- read more -->
        <div class="modal" id="myReadMoreNewsModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close"><i
                            class="bi bi-x-lg"></i></button>
                    <div class="modal-body" style="padding-bottom: 0%;">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                <div class="swiper slider" v-if="img.length > 0">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in img" :key="index"
                                            v-show="index === selectedImageIndex" class="swiper-slide">
                                            <img :src="res.original_url ? res.original_url : 'images/jd_card_logo.png'"
                                                class="image_slider img-fluid" :alt="org_title" :title="org_title">
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="swiper slider">
                                    <img src='/images/jd_card_logo.png' class="image_slider img-fluid" :alt="org_title" :title="org_title">
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-2 m-1" v-if="img.length > 0">Gallery</label>
                                <div class="swiper thumbnail thumbnailSansthaNews">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in  img" :key="index" class="swiper-slide">
                                            <img :src="res.original_url" alt="..." class="image_slider_down img-fluid"
                                                @click="selectImage(index)">
                                        </div>
                                    </div>
                                    <div class="next_div" v-if="img.length > 3" @click="nextSlideSansthaNews"><i class="bi bi-chevron-right"></i></div>
                                    <div class="prev_div" v-if="img.length > 3" @click="prevSlideSnasthNews"><i class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-3 g-0 ">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${lastParam}`">
                                                        <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                            class="modal_card_head_img" :alt="org_title" :title="org_title">
                                                    </a>
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${lastParam}`">
                                                        <label class="modal_card_head_title margin_left text-truncate mt-1 ms-2"
                                                         :title="org_title">{{ org_title }}</label>
                                                    </a>
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ms-auto">
                                                    <button class="btn btn_following btn_following_modal" @click="manageFollowMore()" type="submit">
                                                        <img :src="getFollowImageMore()" class="flw_btn_img" alt="..."></button>
                                                </div>
                                            </div>
                                        </div><!--end of card head-->
                                        <div class="card-body p-2 ">
                                            <label class="card_modal_body-title px-2">{{ dash_sanstha.title }}</label>
                                            <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': img.length > 0 }">
                                                <p class="card_modal_body_details p-2" v-html="dash_sanstha.detail"></p>
                                            </div>
                                            <label v-if="dash_sanstha.type == 'Events'" class="card_modal_date p-2">
                                                <img src="/images/ic_timer_24px.svg" class="location_icon mx-2" alt="...">
                                                {{ formatDate(dash_sanstha.start_date_and_time) + ' - ' + formatDate1(dash_sanstha.end_date_and_time) }}
                                            </label><br>
                                            <label v-if="dash_sanstha.type == 'Events'" class="card-modal_location p-2 ">{{ dash_sanstha.location }}</label>
                                        </div>
                                        <div class="dash p-2"></div>
                                        <div class="card-footer bg-white border-0 mt-2">
                                            <div class="row text-center row-cols-4 modal_footer_row">
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img :src="getImageLike()" @click="manageLikeMore()"
                                                            class="footer_img" alt="...">
                                                        <br><span class="icon_font">{{ total_count > 0 ? total_count : dash_sanstha.total_like == null ? 0 : dash_sanstha.total_like }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <a class="view_all_latestact">
                                                            <img :src="getSaveImageMore()" @click="manageSaveMore()" class="footer_img" alt="...">
                                                            <br><span class="icon_font">Save Post</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img src="/images/ic_visibility_24px.svg" class="footer_img_view" alt="...">
                                                        <br><span class="icon_font ">{{ dash_sanstha.total_view == null ? 0 : dash_sanstha.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class=" text-center">
                                                        <a class="view_all_latestact" :href="`/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`"target="_blank"  @click.prevent="sendToWhatsApp(org_title , `/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`)" id="share">
                                                            <img src="/images/Logo-WhatsApp@2x.png"class="footer_img footer_img_share" alt="...">
                                                            <br><span class="icon_font">Share</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div><!--end of modal-content-->
            </div><!--end of modal-dialog-->
        </div>
    </div>
</template>
<script>

import sansthaDetailService from '../../../services/sansthaDetail.service';
import afterLoginHomeService from "../../../services/afterLoginHome.service";
import { handleLike, handleSave } from '../../../common/common';
import { MediaLibraryCollection } from "@spatie/media-library-pro-vue2-collection";
import { sendToWhatsApp } from '../../../utils/sharefunction.js';
import { initializeQuillEditors } from '../../../utils/quilleditor.js';


export default {
    name: "App",
    data() {
        return {
            lastParam: '', get_sanstha: '', changeBanner: '', dash_sanstha: [], img: '', selectedImageIndex: 0, org_logo: '', org_title: '', media: [], isSubmitting: false,isDataAvailable:false,
            titleErr: '', newsTitle: '', post_error: '', newsPost_visiblity: '', org_detail: '', frm_img: '', newsSanstha: [], news_page: 1, uploadProgress: [],post_error:'',news_data_array: {},
            selectedImageURL1: '', selectedImageURL: '', org_title: '', org_logo: '', newsData: [], news_id: '', news_del_id: '', selectItemFilter: '', get_sanstha: '', total_count: '',
        };
    },
    components: {
        MediaLibraryCollection,
    },
    created() {
        if (this.newsSanstha.length === 0) {
            this.getNewsBasedSanstha();
        }
    },
    mounted() {
        this.getMoreUploadedPhotos();
        const { quill1, quill2 } = initializeQuillEditors(this.$refs.editorNews1, this.$refs.editorNews2);
        this.quill1 = quill1;
        this.quill2 = quill2;

        const thumbnailSansthaNews = new Swiper('.thumbnailSansthaNews', {
            slidesPerView: 'auto',
        });

        const slider = new Swiper('.slider', {
            loop: true,
            grabCursor: true,
            thumbs: {
                swiper: thumbnailSansthaNews
            },
        });
    },
    beforeMount() {
        this.activate();
    },
    computed: {
        updatedNewsSanstha() {
            return this.newsSanstha.slice();
        },
    },
    methods: {
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        btoa(input) {
            return btoa(input);
        },
        selectImage(index) {
            this.selectedImageIndex = index;
        },
        async getTypedSanstha() {
            const data = {
                params: {
                    store_type: "News",
                    id: this.news_id,
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
            const newsIndex = this.newsSanstha.findIndex(news => news.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                this.$set(this.newsSanstha[newsIndex], 'total_like', newLikeCount); // Update total_like
                if (this.newsSanstha[newsIndex].get_user_likes) {
                    this.$set(this.newsSanstha[newsIndex].get_user_likes, 'is_like', newIsLike);
                } else {
                    this.$set(this.newsSanstha[newsIndex], 'get_user_likes', { is_like: newIsLike });
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
            const newsIndex = this.newsSanstha.findIndex(news => news.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.newsSanstha[newsIndex].get_user_save_posts) {
                    this.$set(this.newsSanstha[newsIndex].get_user_save_posts, 'is_save', newIsSave);
                } else {
                    this.$set(this.newsSanstha[newsIndex], 'get_user_save_posts', { is_save: newIsSave });
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
            const newsIndex = this.newsSanstha.findIndex(news => news.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.newsSanstha[newsIndex].get_user_org_follows) {
                    this.$set(this.newsSanstha[newsIndex].get_user_org_follows, 'is_follow', newIsFollow);
                } else {
                    this.$set(this.newsSanstha[newsIndex], 'get_user_org_follows', { is_follow: newIsFollow });
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
        nextSlideSansthaNews() {
            const thumbnailSansthaNews = document.querySelector('.thumbnailSansthaNews').swiper;
            thumbnailSansthaNews.slideNext();
        },
        prevSlideSnasthNews() {
            const thumbnailSansthaNews = document.querySelector('.thumbnailSansthaNews').swiper;
            thumbnailSansthaNews.slidePrev();
        },
        getMoreUploadedPhotos() {
            window.addEventListener("load", () => {
                const input = document.getElementById("addNews");
                const filewrapper = document.getElementById("filewrapper1");

                input.addEventListener("change", (e) => {
                    const files = e.target.files;
                    if (files.length > 0) {
                        for (const file of files) {
                            const fileName = file.name;
                            addFileDisplayBox(fileName, file);
                        }
                    }
                });

                const addFileDisplayBox = (fileName, file) => {
                    const showfileboxElem = document.createElement("div");
                    showfileboxElem.classList.add("showfilebox");

                    const leftElem = document.createElement("div");
                    leftElem.classList.add("left");
                    showfileboxElem.append(leftElem);

                    const imageElem = document.createElement("img");
                    imageElem.src = URL.createObjectURL(file);
                    imageElem.style.width = "100px";
                    imageElem.style.height = "60px";
                    leftElem.append(imageElem);

                    const filetitleElem = document.createElement("span");
                    filetitleElem.innerHTML = fileName;
                    filetitleElem.style.position = "absolute";
                    leftElem.append(filetitleElem);

                    const rightElem = document.createElement("div");
                    rightElem.classList.add("right");
                    showfileboxElem.append(rightElem);

                    const crossElem = document.createElement("button");
                    crossElem.classList.add("delete1");
                    crossElem.innerHTML = "Delete";
                    rightElem.append(crossElem);

                    filewrapper.append(showfileboxElem);

                    crossElem.addEventListener("click", () => {
                        filewrapper.removeChild(showfileboxElem);
                    });

                    let progress = 0;
                    const progressInterval = setInterval(() => {
                        progress += 10;
                        if (progress <= 100) {
                            progressBarInnerElem.style.width = progress + "%";
                        } else {
                            clearInterval(progressInterval);
                        }
                    }, 500);
                };


            });

        },
        getBannerImageUrl(banner) {
            if (banner && banner.length > 0) {
                const lastIndex = banner.length - 1;
                return banner[lastIndex].original_url;
            }
            return '/images/jd_card_logo.png';
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


        handleFileChange() {
            const fileInput = this.$refs.fileInput;
            if (fileInput.files && fileInput.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = fileInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedImageURL = URL.createObjectURL(fileInput.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    fileInput.value = "";
                }
            }
        },
        handleFileChange1() {
            const fileInput1 = this.$refs.fileInput1;
            if (fileInput1.files && fileInput1.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = fileInput1.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedImageURL1 = URL.createObjectURL(fileInput1.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    fileInput1.value = "";
                }
            }
        },
        getQuillContent() {
            return this.quill.root.innerHTML;
        },
        getEditId(resId) {
            this.news_id = resId
        },
        getDataById(resId) {
            this.news_id = resId
            if (this.news_id) {
                this.getTypedSanstha()
            }
        },
        getDeleteId(resId) {
            this.news_del_id = resId
        },
        updateFilter(filterText) {
            this.selectItemFilter = filterText;
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
        callTwoFunctions(id) {
            this.getEditId(id);
            this.getParticularSansthaNews();
        },
        onCancel(){
            this.isDataAvailable = false;
        },
        async getParticularSansthaNews() {
            this.news_data_array = {};
            const url = window.location.href;
            const data = {
                params: {
                    type: "web"
                }
            }
            const response = await sansthaDetailService.getParticularNewsSanstha(this.news_id, data);
            if (response.status == 200 || response.status == 201) {
                this.newsData = response.data;
                this.news_data_array = response.media_img;
                this.isDataAvailable = true;
                this.org_title = response.data.organization.title;
                this.org_logo = response.data?.organization?.logo[0]?.original_url;
                this.frm_img = response.data?.banner[0]?.original_url;
                if (this.newsData?.detail && this.newsData?.detail?.ops) {
                    this.quill2.setContents(this.newsData?.detail);
                } else {
                    this.quill2.setText(this.newsData?.detail);
                }
            } else {
                console.error("Something went wrong");
            }
        },
        async updateNewsSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;

            if (!this.newsData.title) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.newsData.title)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.newsData.title)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (this.titleErr) {
                return;
            }

            const data = {
                organization_id: lastParam,
                post_visiblity: this.newsData.post_visiblity,
                title: this.newsData.title,
                detail: this.quill2.getText(),
                is_active: 1,
                content_language_id: 1,
                created_by_id: userId
            };
            try {
                const response = await sansthaDetailService.updateNewsSanstha(this.news_id, data);
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
                            const updatedNewsIndex = this.newsSanstha.findIndex(news => news.id === this.news_id);
                            if (updatedNewsIndex !== -1) {
                                this.$set(this.newsSanstha[updatedNewsIndex], 'title', response.data.title);
                                this.$set(this.newsSanstha[updatedNewsIndex], 'detail', response.data.detail);
                                this.$set(this.newsSanstha[updatedNewsIndex], 'banner', [{ original_url: response1.original_url }]);
                            }
                            $('#editNews').modal('hide');
                            this.$toast.success("News updated successfully");
                            this.selectedImageURL = ''
                        } else {
                            this.$toast.error('Please set proper address!');
                        }
                    } else {
                        $('#editNews').modal('hide');
                        this.selectedImageURL = ''
                        this.$toast.success("News updated successfully");
                        const updatedNewsIndex = this.newsSanstha.findIndex(news => news.id === this.news_id);
                        if (updatedNewsIndex !== -1) {
                            this.$set(this.newsSanstha[updatedNewsIndex], 'title', response.data.title);
                            this.$set(this.newsSanstha[updatedNewsIndex], 'detail', response.data.detail);
                        }
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        checkFileValidity(file) {
            this.media.push(file);
        },
        async addNewsSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            this.titleErr = '';
            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;

            let post_visiblity = false;
            if (this.newsPost_visiblity === "Member") {
                post_visiblity = true;
            }
            if (!this.newsTitle) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.newsTitle)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.newsTitle)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (!this.newsPost_visiblity) {
                this.post_error = 'Please select any one visibility';
                return;
            }
            if (this.titleErr) {
                return;
            }
            const data = {
                organization_id: lastParam,
                post_visiblity: post_visiblity,
                title: this.newsTitle,
                detail: this.quill1.getText(),
                is_active: 1,
                content_language_id: 1,
                created_by_id: userId
            };
            this.isSubmitting = true;
            try {
                const response = await sansthaDetailService.addNewsSanstha({ ...data });
                if (response.status == 200 || response.status == 201) {
                    if (this.media.length > 0) {
                        const formData = new FormData();
                        formData.append('model_id', response.data.id);
                        this.media.forEach(file => {
                            console.log('-----------',file)
                            formData.append('file[]', file);
                        });
                        formData.append('type', 'mobile_api');
                        const response1 = await sansthaDetailService.addNewsMedia(formData)
                        if (response1.status === 200 || 201 || 202) {
                            const updatedAlbum = response.data;
                            updatedAlbum.banner = [response1];
                            this.newsSanstha.unshift(updatedAlbum);
                            $('#AddNewsModal').modal('hide');
                            const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                            if (mediaLibraryRows) {
                                mediaLibraryRows.forEach(row => {
                                    row.click();
                                });
                            }
                            this.isSubmitting = false;
                            this.$toast.success("News added successfully");
                            this.$forceUpdate();
                            this.selectedImageURL = '';
                            this.clearField();
                            this.getNewsBasedSanstha();
                        } else {
                            this.$toast.error('Please set proper address!');
                        }
                    }
                    else {
                        $('#AddNewsModal').modal('hide');
                        const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                            if (mediaLibraryRows) {
                                mediaLibraryRows.forEach(row => {
                                    row.click();
                                });
                            }
                        this.isSubmitting = false;
                        this.selectedImageURL = '';
                        this.clearField();
                        this.$toast.success("News added successfully");
                        this.newsSanstha.unshift(response.data);
                        this.$forceUpdate();
                        this.getNewsBasedSanstha();
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        async deleteNewsSanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const response = await sansthaDetailService.deleteNewsSanstha(this.news_del_id);
            if (response.status == 200 || response.status == 201 || response.status == 204) {
                this.$toast.success("News deleted successfully");
                const index = this.newsSanstha.findIndex(news => news.id === this.news_del_id);
                if (index !== -1) {
                    this.newsSanstha.splice(index, 1);
                }
            } else {
                console.error("Something went wrong");
                this.$toast.error("Something went wrong");
            }
        },
        async getNewsBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            };

            const response = await sansthaDetailService.getAllNewsSanstha(this.news_page, data);
            if (response.status === 200 || response.status === 201) {
                if (response.data.length > 0) {
                    for (const value of response.data) {
                        this.news_id = value.id;
                        const data = {
                            event_id: '',
                            news_id: this.news_id,
                            appeal_id: '',
                            video_id: ''
                        };
                        const afterLoginResponse = await afterLoginHomeService.viewEventNews({ ...data });
                        if (response.status === 200 || 201) {
                            console.error("Something went wrong")
                        }
                    }
                    this.newsSanstha.push(...response.data);
                    this.news_page = this.news_page + 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong while fetching news data");
            }
        },
        async manageLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.newsSanstha[index],
                get_user_likes: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.newsSanstha, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.newsSanstha[index],
                get_user_save_posts: { is_save: newIsSave },
            };
            this.$set(this.newsSanstha, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        clearField() {
            const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
            if (mediaLibraryRows) {
                mediaLibraryRows.forEach(row => {
                    row.click();
                });
            }
            this.titleErr = "";
            this.newsTitle = "";
            this.quill1.setText('');
            this.newsPost_visiblity = "";
            this.selectedImageURL = "";
        },
    },
}
</script>
