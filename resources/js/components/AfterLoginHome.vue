<template>
    <section class="bg_image" style="padding-bottom: 5rem!important;">
        <div class="container">
            <div class="row main_layout mt-2 pb-2 g-2 m-1">
                <div class=" col-lg-3 col-xl-3 col-xxl-3 col-md-3 left_layout" :style="{ 'margin-top': emptyDataMarginTop }">
                    <login-sidebar></login-sidebar>
                </div>
                <div class="col-md-8 col-lg-8 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 col-xxs-12 center_layout px-3"
                    id="center-layout">
                    <div class="login_flow">
                        <div class="text-center">
                            <label class="section_header" style="font-weight: 600;">Jai Jinendra
                                <span class="section_header" style="color: #F7872B; font-weight: 600;">{{ this.user_name
                                    }}</span>
                            </label>
                            <br><label class="section_sub_header">Your favorite Daily feed is ready from your
                                Sanstha!</label>
                        </div>
                        <div class="row g-4 px-3 pb-3" v-for="(res, index) in latestAllActivities" :key="index">
                            <div class="col-md-12 col-xxl-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12 col-xxs-12">
                                <div class="card h-100 p-2 inner_login_cards">
                                    <div class="ribbon-wrapper">
                                        <!-- <div class="card-badge-event">{{ res.type }}</div> -->
                                        <div :class="{
                    'card-badge-appeal': res.type === 'Appeal',
                    'card-badge-event': res.type === 'Events',
                    'card-badge-news': res.type === 'News'
                }" :id="res.type">
                                            <template v-if="res.type === 'Appeal'">Appeals</template>
                                            <template v-else-if="res.type === 'Events'">Events</template>
                                            <template v-else-if="res.type === 'News'">News</template>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="ps-4">
                                            <a class="view_all_latestact"
                                                :href="`/sanstha-detail/${res.organization_id}`">
                                                <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                    :title="res.organization.title" :alt="res.organization.title"
                                                    class="getallimg img-fluid">
                                                <span class="d-inline-block text-truncate getallhead"
                                                    :title="res.organization.title" alt="Organization Title">{{
                    res.organization.title }}</span>
                                            </a>
                                            <button class="btn btn_following_log"
                                                @click="manageFollow(res, res.organization.id, res.get_user_org_follow == null ? is_follow = 0 : res.get_user_org_follow.is_follow, index)"
                                                type="submit">
                                                <img :src="getFollowImageUrl(res)" alt="..."></button>
                                        </div>
                                    </div>
                                    <div class="card-body" style="margin-top: -10px;">
                                        <a class="view_all_latestact" @click="activate(res.id, res.type)"
                                            data-bs-toggle="modal" data-bs-target="#myNewzModal">
                                            <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                :title="res.organization.title" :alt="res.organization.title"
                                                class="getallnewsimg card-img-top img-fluid m-1 text-center">
                                        </a>
                                        <div class="activity_card_body p-1">
                                            <a class="view_all_latestact" @click="activate(res.id, res.type)"
                                                data-bs-toggle="modal" data-bs-target="#myNewzModal">
                                                <label class="card_header">{{ res.title }}</label>
                                                <p class="section_body" style="margin-bottom: -20px;"
                                                    v-html="res.detail">
                                                </p>
                                            </a>

                                            <br><label class="card_modal_date pt-3" v-if="res.type == 'Events'"><img
                                                    src="images/ic_timer_24px.svg" class="loation_icon me-2" alt="...">
                                                {{ formatDate(res.start_date_and_time) + ' - ' +
                    formatDate1(res.end_date_and_time) }}</label>
                                            <br><label class="card-modal_location py-1" v-if="res.type == 'Events'">
                                                <img src="images/ic_place_24px.svg" class="loation_icon me-2"
                                                    alt="...">{{ res.location }}</label>
                                            <br> <a class="read_more1 px-1" @click="activate(res.id, res.type)"
                                                style="margin-left: -4px;" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal">Read More</a>
                                        </div>
                                    </div>
                                    <div class="card-footer border-0 bg-white activity_card_footer">
                                        <div class="row row-cols-4">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center like_div" >
                                                    <img :src="getImageUrl(res)"
                                                        @click="manageLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                        class="footer_img" alt="...">
                                                    <br><span class="icon_font">{{ total_count > 0 ? total_count :
                    res.total_like == null ? 0 :
                        res.total_like }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center save_div">
                                                    <img :src="getSaveImageUrl(res)"
                                                        @click="manageSave(res, res.type, res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
                                                        class="footer_img" alt="...">
                                                    <br>
                                                    <span
                                                        v-if="res?.get_user_save_post?.is_save == 1"
                                                        class="icon_font">Saved
                                                        Post</span>
                                                    <span v-else class="icon_font">Save Post</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center view_div" >
                                                    <img src="images/ic_visibility_24px.svg" class="footer_img_view"
                                                        alt="...">
                                                    <br><span class="icon_font">{{ res.total_view == null ? 0 :
                    res.total_view }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class=" text-center share_div"> 
                                                    <a class="view_all_latestact"
                                                        :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa(res.type)}`"
                                                        target="_blank"
                                                        @click.prevent="sendToWhatsApp(res.organization.title, `/sharepostcard?id=${btoa(res.id)}&type=${btoa(res.type)}`)"
                                                        id="share">
                                                        <img src="images/Logo-WhatsApp@2x.png"
                                                            class="footer_img footer_img_share" alt="...">
                                                        <br><span class="icon_font">Share</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <label class="post_uploaded_label px-4">{{ formatTimeAgo(res.created_at) }}</label>

                                </div>
                            </div>
                            <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 col-xxs-12 d-xs-block d-sm-block d-md-block d-lg-block d-xl-none d-xxl-none d-xxxl-none"
                                v-if="shouldRenderLoginEventSidebarHome && index === 4">
                                <login-eventsidebar></login-eventsidebar>
                            </div>
                        </div>
                        <infinite-loading @distance="1" @infinite="getAllActivities"></infinite-loading>
                    </div>
                </div>
                <div class="modal" id="myNewzModal">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x-lg"></i></button>
                            <div class="modal-body" style="padding-bottom: 0%;">
                                <div class="row">
                                    <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                        <div v-if="get_news.banner.length > 0" class="swiper slider">
                                            <div class="swiper-wrapper">
                                                <div v-for="(res, index) in get_news.banner" :key="index"
                                                    class="swiper-slide" v-show="index === selectedImageIndex">
                                                    <img :src="res.original_url" class="image_slider img-fluid"
                                                        :title="org_title" :alt="org_title">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="swiper-slider" v-else>
                                            <img src="images/jd_card_logo.png" :title="org_title" :alt="org_title"
                                                class="image_slider img-fluid">
                                        </div>
                                        <div class="dash mt-2 mb-2 "></div>
                                        <label class="title_gallery p-3 m-1">Gallery</label>
                                        <div class="swiper thumbnail thumbnailLoHome ">
                                            <div class="swiper-wrapper">
                                                <div v-for="(res, index) in get_news.banner" :key="index"
                                                    class="swiper-slide">
                                                    <img :src="res.original_url" alt="..."
                                                        class="image_slider_down img-fluid" @click="selectImage(index)">
                                                </div>
                                            </div>
                                            <div v-if="get_news.banner.length > 3" class="next_div"
                                                @click="nextSlideLoHome"><i class="bi bi-chevron-right"></i>
                                            </div>
                                            <div v-if="get_news.banner.length > 3" class="prev_div"
                                                @click="prevSlideLoHome"><i class="bi bi-chevron-left"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                        <section class="card1">
                                            <div class="card border-0">
                                                <div class="card-head p-2 card_head_modal border-0">
                                                    <div class="row row-cols-auto g-0">
                                                        <div
                                                            class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                            <a class="view_all_latestact"
                                                                :href="`/sanstha-detail/${org_id}`">
                                                                <img :src="`${logo.original_url ? logo.original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                                    class="modal_card_head_img" :title="org_title"
                                                                    :alt="org_title">
                                                            </a>
                                                        </div>
                                                        <div
                                                            class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                            <a class="view_all_latestact"
                                                                :href="`/sanstha-detail/${org_id}`">
                                                                <label
                                                                    class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                                    :title="org_title" :alt="org_title">{{ org_title
                                                                    }}</label>
                                                            </a>
                                                        </div>
                                                        <div
                                                            class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4 ms-auto">
                                                            <button class="btn btn_following btn_following_modal"
                                                                @click="manageFollowMore()" type="submit">
                                                                <img :src="getFollowImageMore()" alt="..."></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card-body p-2">
                                                    <label class="card_modal_body-title px-2">{{ title }}</label>
                                                    <div
                                                        :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': get_news.banner.length > 0 }">
                                                        <p class="card_modal_body_details p-2" v-html="detail"></p>
                                                        <br><label class="card_modal_date p-2"
                                                            v-if="start_date_and_time"><img
                                                                src="images/ic_timer_24px.svg"
                                                                class="location_icon mx-2" alt="...">{{
                    start_date_and_time }}</label>
                                                        <p v-if="location"><img src="images/ic_place_24px.svg"
                                                                class="loation_icon mx-2 ms-3" alt="..."><label
                                                                class="card-modal_location p-2 ">{{ location }}</label>
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
                                                                <br><span class="icon_font">{{ total_count > 0 ?
                                                                    total_count :
                                                                    this.get_news.total_like == null ? 0 :
                                                                    this.get_news.total_like
                                                                    }}</span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                            <div class="text-center">
                                                                <img :src="getSaveImageMore()" @click="manageSaveMore()"
                                                                    class="footer_img" alt="...">
                                                                <br><span class="icon_font">Save Post</span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                            <div class="text-center">
                                                                <img src="images/ic_visibility_24px.svg"
                                                                    class="footer_img_view" alt="...">
                                                                <br><span class="icon_font">{{ total_view == null ? 0 :
                                                                    total_view
                                                                    }}</span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                            <div class=" text-center">
                                                                <a class="view_all_latestact"
                                                                    :href="`/sharepostcard?id=${btoa(get_news.id)}&type=${btoa(get_news.type)}`"
                                                                    target="_blank"
                                                                    @click.prevent="sendToWhatsApp( org_title , `/sharepostcard?id=${btoa(get_news.id)}&type=${btoa(get_news.type)}`  )"
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
                        </div>
                    </div>
                </div>
                <div class="col-md-8 col-lg-9 col-xl-3 col-xxl-3 right_layout scroll_bar_login1 d-none  d-xl-block d-xxl-block d-xxxl-block "
                    :style="{ 'margin-top': emptyRightMraginTop }" id="right-layout">
                    <div class="login_flow">
                        <div>
                            <login-eventsidebar></login-eventsidebar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import profileSideBarService from "../../services/profilesidebar.service"
import afterLoginHomeService from "../../services/afterLoginHome.service";
import { handleLike, handleSave } from '../../common/common';
import { sendToWhatsApp } from '../../utils/sharefunction.js';
import moment from 'moment';
export default {
    name: "App",
    data() {
        return {
            selectedImageIndex: 0, emptyDataMarginTop: '132px', emptyRightMraginTop: '132px',
            get_news: { banner: [] }, img: [], title: '', logo: '', detail: '', location: '', start_date_and_time: '', total_like: '', total_view: '', org_title: '',
            user_id: localStorage.getItem('userId'), user_name: [], page: 1, latestAllActivities: [], total_count: '', org_id: ''
        };
    },
    methods: {
        formatTimeAgo(date) {
            return moment(date).fromNow();
        },
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        nextSlideLoHome() {
            const thumbnailLoHome = document.querySelector('.thumbnailLoHome').swiper;
            thumbnailLoHome.slideNext();

        },
        prevSlideLoHome() {
            const thumbnailLoHome = document.querySelector('.thumbnailLoHome').swiper;
            thumbnailLoHome.slidePrev();
        },
        btoa(input) {
            return btoa(input);
        },
        formatDate(dateTimeString) {
            const [datePart, timePart] = dateTimeString.split(' '); // Split date and time
            const [day, month, year] = datePart.split('/'); // Split date into day, month, year
            const rearrangedDate = `${month}/${day}/${year} ${timePart}`; // Rearrange date and time
            const formattedDateTime = new Date(rearrangedDate);

            return formattedDateTime.toLocaleDateString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric'
            }) + ' ' +
                formattedDateTime.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
        },
        formatDate1(dateTimeString1) {
            const [datePart, timePart] = dateTimeString1.split(' '); // Split date and time
            const [day, month, year] = datePart.split('/'); // Split date into day, month, year
            const rearrangedDate1 = `${month}/${day}/${year} ${timePart}`; // Rearrange date and time
            const formattedDateTime1 = new Date(rearrangedDate1);

            return formattedDateTime1.toLocaleDateString('en-US', {
                month: 'long',
                day: '2-digit',
                year: 'numeric'
            }) + ' ' +
                formattedDateTime1.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                });
        },
        selectImage(index) {
            this.selectedImageIndex = index;
        },
        handleTopPosition() {
            this.emptyDataMarginTop = this.allSanstha.length === 0 ? '132px' : 'initial';
            this.emptyRightMraginTop = this.allSanstha.length === 0 ? '132px' : 'initial';

        },
        async activate(resId, resType) {
            const data = {
                params: {
                    id: resId,
                    store_type: resType
                }
            }
            const response = await afterLoginHomeService.newsDetails({ ...data });
            if (response.status === 200 || 201) {
                this.get_news = response;
                this.org_id = response.organization_id;
                this.img = response.banner;
                this.title = response.title;
                this.detail = response.detail;
                this.location = response.location; this.start_date_and_time = response.start_date_and_time;
                this.total_like = response.total_like; this.total_view = response.total_view;
                this.org_title = response.organization.title;
                this.logo = response.organization.logo[0];
                this.typePo = response.type;
                this.poId = response.id;
            } else {
                console.error("Something went wrong")
            }
        },
        async getAllActivities($state) {
            const response = await afterLoginHomeService.getAllHomeActivities(this.page)
            if (response.status === 200 || 201) {
                $.each(response.data, async (key, value) => {
                    if (value.type == 'News') {
                        this.news_id = value.id;
                    } else if (value.type == 'Events') {
                        this.event_id = value.id;
                    } else if (value.type == 'Appeal') {
                        this.appeal_id = value.id;
                    } else {
                        this.video_id = value.id;
                    }
                    const data = {
                        event_id: this.event_id,
                        news_id: this.news_id,
                        appeal_id: this.appeal_id,
                        video_id: this.video_id
                    }
                    const response = await afterLoginHomeService.viewEventNews({ ...data })
                    if (response.status === 200 || 201) {
                    } else {
                        console.error("Something went wrong")
                    }
                });
                $.each(response.data, (key, value) => {
                    this.latestAllActivities.push(value);
                });
                $state.loaded();
                this.page = this.page + 1;
            } else {
                console.error("Something went wrong")
            }
        },
        async getUser() {
            const userId = this.user_id;
            const response = await profileSideBarService.getUser(userId)
            this.user_name = response.data.name;
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
        getImageLike() {
            if (this.get_news.get_user_likes == null) {
                return 'images/ic_unfavorite_24px.svg';
            } else if (this.get_news.get_user_likes.is_like === 1) {
                return 'images/ic_favorite_24px.svg';
            } else {
                return 'images/ic_unfavorite_24px.svg';
            }
        },
        async manageLikeMore() {
            let is_like = 0;
            if (this.get_news.get_user_likes) {
                is_like = this.get_news.get_user_likes.is_like;
            }
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? this.get_news.total_like + 1 : this.get_news.total_like - 1;
            let img = newIsLike === 1 ? 'images/ic_favorite_24px.svg' : 'images/ic_unfavorite_24px.svg';

            this.$set(this.get_news, 'img', img); // Update the image path
            if (this.get_news.get_user_likes) {
                this.$set(this.get_news.get_user_likes, 'is_like', newIsLike);
            } else {
                this.$set(this.get_news, 'get_user_likes', { is_like: newIsLike });
            }
            this.$set(this.get_news, 'total_like', newLikeCount); // Update total_like
            await handleLike(newIsLike, this.typePo, this.poId);
        },
        async manageLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.latestAllActivities[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.latestAllActivities, index, updatedItem);
            // Call the common function
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
                ...this.latestAllActivities[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.latestAllActivities, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        getSaveImageMore() {
            if (this.get_news.get_user_save_posts == null) {
                return 'images/ic_add_box_24px.svg';
            } else if (this.get_news.get_user_save_posts.is_save === 1) {
                return 'images/ic_add_fav_box_24px.svg';
            } else {
                return 'images/ic_add_box_24px.svg';
            }
        },
        async manageSaveMore() {
            let is_save;
            if (this.get_news.get_user_save_posts == null) {
                is_save = 0;
            } else {
                is_save = this.get_news.get_user_save_posts.is_save;
            }
            const newIsSave = is_save === 1 ? 0 : 1;
            let img = newIsSave === 1 ? 'images/ic_add_box_24px.svg' : 'images/ic_add_box_24px.svg';
            this.$set(this.get_news, 'img', img); // Update the image path
            if (this.get_news.get_user_save_posts) {
                this.$set(this.get_news.get_user_save_posts, 'is_save', newIsSave);
            } else {
                this.$set(this.get_news, 'get_user_save_posts', { is_save: newIsSave });
            }
            await handleSave(newIsSave, this.typePo, this.poId);
        },
        getFollowImageUrl(res) {
            if (res.get_user_org_follow == null) {
                return 'images/follow_btn.svg';
            } else if (res.get_user_org_follow.is_follow === 1) {
                return 'images/following_btn.svg';
            } else {
                return 'images/follow_btn.svg';
            }
        },
        getFollowImageMore() {
            if (this.get_news.get_user_org_follows == null) {
                return 'images/follow_btn.svg';
            } else if (this.get_news.get_user_org_follows.is_follow === 1) {
                return 'images/following_btn.svg';
            } else {
                return 'images/follow_btn.svg';
            }
        },
        async manageFollowMore() {
            let is_follow = 0;
            if (this.get_news.get_user_org_follows) {
                is_follow = this.get_news.get_user_org_follows.is_follow;
            }
            const newIsFollow = is_follow === 1 ? 0 : 1;
            let img = newIsFollow === 1 ? 'images/following_btn.svg' : 'images/follow_btn.svg';

            this.$set(this.get_news, 'img', img); // Update the image path
            if (this.get_news.get_user_org_follows) {
                this.$set(this.get_news.get_user_org_follows, 'is_follow', newIsFollow);
            } else {
                this.$set(this.get_news, 'get_user_org_follows', { is_follow: newIsFollow });
            }
            const data = {
                is_follow: newIsFollow,
                organisation_id: this.get_news.organization_id,
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
        async manageFollow(res, resOrgId, is_follow, index) {
            const newIsFollow = is_follow === 1 ? 0 : 1;
            this.$set(res, 'img', this.getFollowImageUrl(res));
            const updatedItem = {
                ...this.latestAllActivities[index],
                get_user_org_follow: { is_follow: newIsFollow },
            };
            this.$set(this.latestAllActivities, index, updatedItem)
            const data = {
                is_follow: newIsFollow,
                organisation_id: resOrgId,
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
        }
    },
    computed: {
        shouldRenderLoginEventSidebarHome() {
            return this.latestAllActivities.length > 5;
        },
    },
    mounted() {
        const thumbnailLoHome=initializeThumbnailLoHome();
        initializeSliderLoHome(thumbnailLoHome);
        this.handleTopPosition();
        this.getUser();
    },
};
</script>