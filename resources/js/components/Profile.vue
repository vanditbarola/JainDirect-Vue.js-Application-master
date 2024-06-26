<template>
    <section class="bg_image" style="padding-bottom: 5rem!important;">
        <div class="container">
            <div class="row main_layout mt-2 mb-3 g-2 m-1">
                <div class="col-md-3 col-lg-3 col-xl-3 col-xxl-3 left_layout"
                    :style="{ 'margin-top': emptyDataMarginTop }">
                    <login-sidebar></login-sidebar>
                </div>
                <div class="col-md-8 col-lg-9 col-xl-9 col-xxl-9 center_layout center_layout_sanstha "
                    id="center-layout">
                    <div class="login_flow pb-2 px-2">
                        <section class="mt-1 pt-1 login_profile_user">
                            <div class="container">
                                <div class="">
                                    <div class="login_profile_user1 p-3">
                                        <!-- <a href="followers">
                                            <div class="profile_follower text-center">
                                                <span class="profile_follower_count">{{ this.get_followers_sanstha_count }}</span>
                                                <br><span class="profile_follower_head">Followers</span>
                                            </div>
                                        </a> -->
                                        <div class="profile_photo_login">
                                            <img class="pic"
                                                :src="users.profile_photo ? users.profile_photo[0] ? users.profile_photo[0].original_url : 'images/ad_board3.png' : 'images/ad_board3.png'"
                                                alt="...">

                                            <input type="file" id="file-input" name="filename" style="display: none;">
                                        </div>
                                        <a href="following">
                                            <div class="profile_follower text-center">
                                                <span class="profile_follower_count">{{ this.get_followed_sanstha_count
                                                    }}</span>
                                                <br><span class="profile_follower_head">Following</span>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="profile_user_name mt-2 mb-2">{{ this.users.name }}</div>
                                </div>
                                <div class="profile_section px-5">
                                    <nav class="profile_section_nav">
                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                            <!-- <button class="nav-link active mt-2" id="nav-ProInfo-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-ProInfo" type="button" role="tab"
                                                aria-controls="nav-ProInfo" aria-selected="true">Profile Information</button> -->
                                            <button class="nav-link" :class="{ active: activeTab === 'profileInfo' }"
                                                @click="changeTab('profileInfo')" role="tab" aria-controls="nav-ProInfo"
                                                aria-selected="true">Profile Information</button>
                                            <!-- <button class="nav-link mt-2" id="nav-SavedPost-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-SavedPost" type="button" role="tab"
                                                aria-controls="nav-SavedPost" aria-selected="false">Saved Post</button> -->
                                            <button class="nav-link" :class="{ active: activeTab === 'savedPost' }"
                                                @click="changeTab('savedPost')" role="tab" aria-controls="nav-SavedPost"
                                                aria-selected="false">Saved Post</button>
                                        </div>
                                    </nav>
                                    <div class="tab-content" id="nav-tabContent">
                                        <!-- <div class="tab-pane fade show active" id="nav-ProInfo" role="tabpanel" aria-labelledby="nav-ProInfo-tab"> -->
                                        <div v-if="activeTab === 'profileInfo'" class="tab-pane fade show active"
                                            id="nav-ProInfo">
                                            <div class="row g-3 mt-1">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                                    <label class="profile_title">Name:</label>
                                                    <br><label class="profile_details profile_name_overflow mt-1">{{
                        this.users.name }}</label>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                                    <label class="profile_title">State:</label>
                                                    <br><label class="profile_details mt-1">{{ this.users.state
                                                        }}</label>
                                                </div>
                                            </div>
                                            <div class="row g-3 mt-2">
                                                <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                                    <label class="profile_title">Mobile Number:</label>
                                                    <br><label class="profile_details mt-1">+{{ this.users.mobile }}</label>
                                                </div> -->
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                                    <label class="profile_title">Mobile Number:</label>
                                                    <br>
                                                    <label class="profile_details mt-1">
                                                        {{ formattedMobileNumber }}
                                                    </label>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                                    <label class="profile_title">City:</label>
                                                    <br><label class="profile_details mt-1">{{ this.users.city
                                                        }}</label>
                                                </div>
                                            </div>
                                            <div class="row g-3 mt-2">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                                    <label class="profile_title">Email Id:</label>
                                                    <br><label class="profile_details mt-1">{{ this.users.email
                                                        }}</label><br>
                                                    <label class="profile_title mt-4">Gender:</label>
                                                    <br>
                                                    <label for="flexRadioDefault1" class="profile_details">{{
                        this.users.gender == 'any' ? 'I Prefer not to say' :
                            this.users.gender }}</label>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                                    <label class="profile_title">Address:</label>
                                                    <br><label class="profile_details mt-1">{{ this.users.address
                                                        }}<br>{{ this.users.city }} - {{ this.users.pincode }}</label>
                                                </div>
                                            </div>
                                            <div class="row g-3 mt-4 pb-5">
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                                                    <button type="submit" class="btn profile_edit_btn"
                                                        onclick="window.location.href='profile-edit'">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="tab-pane fade" id="nav-SavedPost" role="tabpanel" aria-labelledby="nav-SavedPost-tab"> -->
                                        <div v-if="activeTab === 'savedPost'" class="tab-pane fade show active"
                                            id="nav-SavedPost">
                                            <div class="row justify-content-center g-3 mb-3 mt-3 pb-3 ">
                                                <div class="col-sm-12 col-xs-12 col-md-12 col-lg-8 col-xxl-8 col-xl-8"
                                                    v-for='(res, index) in savedPost'>
                                                    <div class="card h-100 card_getallnews p-2">
                                                        <div class="ribbon-wrapper">
                                                            <!-- <div class="card-badge-event">{{ res.type }}</div> -->
                                                            <div :class="{
                        'card-badge-appeal': res.type === 'appeal',
                        'card-badge-event': res.type === 'event',
                        'card-badge-news': res.type === 'news'
                    }" :id="res.type">
                                                                <template
                                                                    v-if="res.type === 'appeal'">Appeals</template>
                                                                <template
                                                                    v-else-if="res.type === 'event'">Events</template>
                                                                <template
                                                                    v-else-if="res.type === 'news'">News</template>
                                                            </div>
                                                        </div>
                                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                            :title="dash_sanstha.organization ? dash_sanstha.organization.title : ''"
                                                            class="getallnewsimg card-img-top img-fluid m-1 text-center">

                                                        <div class="activity_card_body p-1">
                                                            <label class="card_header">{{ res.title }}</label>
                                                            <br><label class="card_modal_date pt-3"
                                                                v-if="res.type == 'Events'"><img
                                                                    src="images/ic_timer_24px.svg"
                                                                    class="loation_icon me-2" alt="..."> {{
                        res.start_date_and_time }}</label>
                                                            <!-- <br><label class="card_modal_time px-2 mx-3">04:00pm to 07:00pm</label> -->
                                                            <br><label class="card-modal_location py-1"
                                                                v-if="res.type == 'Events'">
                                                                <img src="images/ic_place_24px.svg"
                                                                    class="loation_icon me-2" alt="...">{{ res.location
                                                                }}</label>
                                                        </div>
                                                        <a class="read_more px-1 pt-2" data-bs-toggle="modal"
                                                            style="margin-top: 10px;" data-bs-target="#myReadNewzModal1"
                                                            @click="getDataById(res.id, res.type)">Read
                                                            More </a>

                                                        <div  class="card-footer border-0 bg-white activity_card_footer profile_card_footer">
                                                            <div class="row row-cols-4">
                                                                <div
                                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                                    <div class="text-center like_div">
                                                                        <img :src="getImageUrl(res)"
                                                                            @click="manageLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                            class="footer_img" alt="...">
                                                                        <br><span class="icon_font">{{ total_count > 0 ?
                        total_count : res.total_like == null ? 0 :
                            res.total_like }}</span>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                                    <div class="text-center save_div">
                                                                        <img :src="getSaveImageUrl(res)"
                                                                            @click="manageSave(res, res.type, res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
                                                                            class="footer_img" alt="...">
                                                                        <br>
                                                                        <span
                                                                            v-if="getSaveImageUrl(res) === '/images/ic_add_fav_box_24px.svg'"
                                                                            class="icon_font">Saved
                                                                            Post</span>
                                                                        <span v-else class="icon_font">Save Post</span>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                                    <div class="text-center view_div">
                                                                        <img src="images/ic_visibility_24px.svg"
                                                                            class="footer_img_view" alt="...">
                                                                        <br><span class="icon_font ">{{ res.total_view
                        == null ? 0 : res.total_view }}</span>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                                    <div class="text-center share_div share_div_profile">
                                                                        <a class="view_all_latestact"
                                                                            :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa(res.type)}`"
                                                                            target="_blank"
                                                                            @click.prevent="sendToWhatsApp(org_title, `/sharepostcard?id=${btoa(res.id)}&type=${btoa(res.type)}`)"
                                                                            id="share">
                                                                            <img src="images/Logo-WhatsApp@2x.png"
                                                                                class="footer_img footer_img_share"
                                                                                alt="...">
                                                                            <br><span class="icon_font">Share</span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <label class="post_uploaded_label px-2">2 days ago</label>
                                                    </div>
                                                </div>
                                                <infinite-loading @distance="1"
                                                    @infinite="getSavedPost"></infinite-loading>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="modal" id="myReadNewzModal1">
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
                                                        class="image_slider img-fluid" :alt="org_title"
                                                        :title="org_title">
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="swiper slider">
                                            <img src='/images/jd_card_logo.png' class="image_slider img-fluid"
                                                :alt="org_title" :title="org_title">
                                        </div>
                                        <div class="dash mt-2 mb-2 "></div>
                                        <label class="title_gallery p-2 m-1" v-if="img.length > 0">Gallery</label>
                                        <div class="swiper thumbnail thumbnailProfile">
                                            <div class="swiper-wrapper">
                                                <div v-for="(res, index) in  img" :key="index" class="swiper-slide">
                                                    <img :src="res.original_url" alt="..."
                                                        class="image_slider_down img-fluid" @click="selectImage(index)">
                                                </div>
                                            </div>
                                            <div class="next_div" v-if="img.length > 3" @click="nextSlideProfile"><i
                                                    class="bi bi-chevron-right"></i></div>
                                            <div class="prev_div" v-if="img.length > 3" @click="prevSlideProfile"><i
                                                    class="bi bi-chevron-left"></i></div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                        <section class="card1">
                                            <div class="card border-0">
                                                <div class="card-head p-2 card_head_modal border-0">
                                                    <div class="row row-cols-3 g-0 ">
                                                        <div
                                                            class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                            <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                                class="modal_card_head_img" :alt="org_title"
                                                                :title="org_title">
                                                        </div>
                                                        <div
                                                            class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ">
                                                            <label
                                                                class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                                :alt="org_title" :title="org_title">{{ org_title
                                                                }}</label>
                                                        </div>
                                                        <div
                                                            class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4  ms-auto">
                                                            <button class="btn btn_following btn_following_modal"
                                                                @click="manageFollowMore()" type="submit"><img
                                                                    :src="getFollowImageMore()" class="flw_btn_img"
                                                                    alt="..."></button>
                                                        </div>
                                                    </div>
                                                </div><!--end of card head-->
                                                <div class="card-body p-2 ">
                                                    <label class="card_modal_body-title px-2">{{ dash_sanstha.title }}
                                                    </label>
                                                    <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data':img.length > 0 }">
                                                        <p class="card_modal_body_details py-2"
                                                            v-html="dash_sanstha.detail"></p>
                                                            <label v-if="dash_sanstha.type == 'Events'"
                                                        class="card_modal_date p-2">
                                                        <img src="/images/ic_timer_24px.svg" class="location_icon mx-2"
                                                            alt="...">
                                                        {{ formatDate(dash_sanstha.start_date_and_time) + ' - ' +
                        formatDate1(dash_sanstha.end_date_and_time) }}
                                                    </label><br>
                                                    <label v-if="dash_sanstha.type == 'Events'"
                                                        class="card-modal_location py-2 "><img src="images/ic_place_24px.svg"
                                                        class="loation_icon mx-2 " alt="...">{{
                        dash_sanstha.location }}</label>
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
                                                                <br><span class="icon_font">{{ total_count > 0 ?
                        total_count :
                        dash_sanstha.total_like == null ? 0 :
                                                                    dash_sanstha.total_like }}</span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                            <div class="text-center">
                                                                <a class="view_all_latestact">
                                                                    <img :src="getSaveImageMore()"
                                                                        @click="manageSaveMore()" class="footer_img"
                                                                        alt="...">
                                                                    <br><span class="icon_font">Save Post</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                            <div class="text-center">
                                                                <img src="/images/ic_visibility_24px.svg"
                                                                    class="footer_img_view" alt="...">
                                                                <br><span class="icon_font ">{{ dash_sanstha.total_view
                                                                    == null
                                                                    ? 0 : dash_sanstha.total_view }}</span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                            <div class=" text-center">
                                                                <a class="view_all_latestact"
                                                                    :href="`/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`"
                                                                    target="_blank"
                                                                    @click.prevent="sendToWhatsApp(org_title , `/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`)"
                                                                    id="share">
                                                                    <img src="images/Logo-WhatsApp@2x.png"
                                                                        class="footer_img footer_img_share" alt="...">
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
        </div>
    </section>
</template>

<script>
import profileSideBarService from "../../services/profilesidebar.service"
import afterLoginHomeService from "../../services/afterLoginHome.service";
import sansthaDetailService from '../../services/sansthaDetail.service';
import { handleLike, handleSave } from '../../common/common';
import InfiniteLoading from 'vue-infinite-loading';
import { sendToWhatsApp } from '../../utils/sharefunction.js';
import { initializeSliderProfileImg, initializeThumbnailProfileImg } from "../../utils/swiper";

export default {
    name: "App",
    data() {
        return {
            activeTab: 'profileInfo', emptyDataMarginTop: '132px', user_id: localStorage.getItem('userId'),
            users: [], page: 1, get_followed_sanstha_count: [], dash_sanstha: [], img: '', selectedImageIndex: 0, org_logo: '', org_title: '', total_count: '', resExType: '', about_id: '', resExType: '',
            get_followers_sanstha_count: [], detail_type: '', total_count: '',
            savedPost: [], total_view: '', start_date_and_time: '',
            get_news: '', img: '', title: '', logo: '', detail: '', location: '', total_like: '', org_title: '', selectedImageIndex: 0, get_news: { banner: [] },
        };
    },
    computed: {
        formattedMobileNumber() {
            if (this.users.mobile && this.users.mobile.startsWith("91") && this.users.mobile.length === 12) {
                return "+" + this.users.mobile;
            } else {
                return "+91" + this.users.mobile;
            }
        }
    },
    mounted() {
        const thumbnailProfile = initializeThumbnailProfileImg()
        initializeSliderProfileImg(thumbnailProfile);
        
        let status = localStorage.getItem('status');
        if (status == 202) {
            this.$toast.success('Your data is updated successfully!')
        }
        if (status) {
            setTimeout(() => {
                localStorage.removeItem("status");
            }, 7000);
        }
    },
    beforeMount() {
        this.getUser();
        this.handleTopPosition();
    },

    methods: {
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        btoa(input) {
            return btoa(input);
        },
        async getTypedSanstha() {
            const data = {
                params: {
                    store_type: this.resExType,
                    id: this.about_id,
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
            const newsIndex = this.savedPost.findIndex(explore => explore.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                this.$set(this.savedPost[newsIndex], 'total_like', newLikeCount); // Update total_like
                if (this.savedPost[newsIndex].get_user_likes) {
                    this.$set(this.savedPost[newsIndex].get_user_like, 'is_like', newIsLike);
                } else {
                    this.$set(this.savedPost[newsIndex], 'get_user_like', { is_like: newIsLike });
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
            const newsIndex = this.savedPost.findIndex(explore => explore.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.savedPost[newsIndex].get_user_save_posts) {
                    this.$set(this.savedPost[newsIndex].get_user_save_post, 'is_save', newIsSave);
                } else {
                    this.$set(this.savedPost[newsIndex], 'get_user_save_post', { is_save: newIsSave });
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
            const newsIndex = this.savedPost.findIndex(explore => explore.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.savedPost[newsIndex].get_user_org_follows) {
                    this.$set(this.savedPost[newsIndex].get_user_org_follows, 'is_follow', newIsFollow);
                } else {
                    this.$set(this.savedPost[newsIndex], 'get_user_org_follows', { is_follow: newIsFollow });
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
        selectImage(index) {
            this.selectedImageIndex = index;
        },
        getDataById(resId, resType) {
            this.about_id = resId
            if (resType === 'news') {
                this.resExType = "News";
            } else if (resType === 'event') {
                this.resExType = "Events";
            } else if (resType === 'appeal') {
                this.resExType = "Appeal";
            } else if (resType === 'video') {
                this.resExType = "Video";
            } else {
                this.resExType = null;
            }
            // this.$emit('about-id', { id: this.about_id, type: this.resExType });

            if (this.about_id && this.resExType) {
                this.getTypedSanstha();
            }

        },
        selectImage(index) {
            this.selectedImageIndex = index;
            this.img = this.get_news.banner[index].original_url;
        },
        changeTab(tab) {
            this.activeTab = tab;
        },
        handleTopPosition() {
            this.emptyDataMarginTop = this.allSanstha.length === 0 ? '132px' : 'initial';
        },
        nextSlideProfile() {
            const thumbnailProfile = document.querySelector('.thumbnailProfile').swiper;
            thumbnailProfile.slideNext();
        },
        prevSlideProfile() {
            const thumbnailProfile = document.querySelector('.thumbnailProfile').swiper;
            thumbnailProfile.slidePrev();
        },

        async getSavedPost($state) {
            const userId = this.user_id;
            const data = {
                params: {
                    user_id: userId
                }
            }
            const response = await profileSideBarService.getUserSavedPost(this.page, { ...data })
            if (response.status === 200 || 201) {
                if (response.get_data.length != 0) {
                    $.each(response.get_data, (key, value) => {
                        this.savedPost.push(value);
                    });
                    $state.loaded();
                    this.page = this.page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getUser() {
            const userId = this.user_id;
            const response = await profileSideBarService.getUser(userId)
            this.users = response.data;
            this.get_followers_sanstha_count = response.get_followers_sanstha_count;
            this.get_followed_sanstha_count = response.get_followed_sanstha_count;
        },
        getImageUrl(res) {
            if (res.get_user_like == null) {
                return 'images/ic_unfavorite_24px.svg';
            } else if (res.get_user_like.is_like === 1) {
                return 'images/ic_favorite_24px.svg';
            } else {
                return 'images/ic_unfavorite_24px.svg';
            }
        },
        async manageLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.savedPost[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.savedPost, index, updatedItem);
            await handleLike(newIsLike, resType, resId);
        },
        getSaveImageUrl(res) {
            if (res.get_user_save_post == null) {
                return 'images/ic_add_box_24px.svg';
            } else if (res.get_user_save_post.is_save === 1) {
                return 'images/ic_add_fav_box_24px.svg';
            } else {
                return 'images/ic_add_box_24px.svg';
            }
        },
        async manageSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.savedPost[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.savedPost, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
            if (newIsSave === 0) {
                const indexToRemove = this.savedPost.findIndex(item => item.id === resId);
                if (indexToRemove !== -1) {
                    this.savedPost.splice(indexToRemove, 1);
                }
            }
        },
    },

};
</script>
