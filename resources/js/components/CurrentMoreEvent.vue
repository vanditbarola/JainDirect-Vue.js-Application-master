<template>
    <section class="pt-5">
        <div class="container pt-5 mt-5">
            <div class="row g-4">
                <a href="sharvak-dashboard" class="view_all_latestact label_manage_sanstha mt-5 mt-xl-2 mt-md-3 mt-lg-2 mt-xxl-2"><i class="bi bi-arrow-left me-3"></i>Current Events</a>
                <div v-if="currentEvent.length == 0">{{ this.message }}</div>
                <div class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 "
                    v-for='(res, index) in currentEvent'>
                    <div class="card h-100 p-2 card_getallnews">
                        <div class="ribbon-wrapper">
                            <div class="card-badge-event">Events</div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <a class="view_all_latestact"  :href="`/sanstha-detail/${res.organization_id}`">
                                    <img :src="`${res.organization ? res.organization.logo ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                    :title="res.organization.title"  :alt="res.organization.title" class="getallimg img-fluid">
                                    <span class="d-inline-block text-truncate getallhead"
                                        :title="res.organization.title" alt="Organization Title">{{ res.organization ? res.organization.title : '' }}</span>
                                </a>
                            </div>
                        </div>
                    
                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                        :title="res.organization.title"  :alt="res.organization.title" class="getallnewsimg card-img-top img-fluid m-1 text-center">
                       
                        <div class="activity_card_body p-1">
                            <label class="card_header">{{ res.title }}</label>
                            <br><label class="card_modal_date pt-3"><img src="images/ic_timer_24px.svg"
                                    class="loation_icon me-2" alt="..."> {{ formatDate(res.start_date_and_time) + ' - '
                    + formatDate1(res.end_date_and_time) }}</label>
                            <!-- <br><label class="card_modal_time px-2 mx-3">04:00pm  to 07:00pm</label> -->
                            <br><label class="card-modal_location py-1">
                                <img src="images/ic_place_24px.svg" class="loation_icon me-2" alt="...">{{ res.location
                                }}</label>
                        </div>
                        <a class="read_more1 px-1" data-bs-target="#myReadNewzModal1" data-bs-toggle="modal"
                            @click="getDataById(res.id)" style="margin-left:-4px;">Read More...</a><br>

                            <div class="card-footer border-0 bg-white activity_card_footer">
                                <div class="row row-cols-4">
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                        <div class="text-center like_div_current" >
                                            <img :src="getImageUrl(res)"
                                                @click="manageLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                class="footer_img" alt="...">
                                            <br><span class="icon_font">{{ total_count > 0 ? total_count : res.total_like == null ? 0 : res.total_like }}</span>
                                        </div>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                        <div class="text-center save_div_current">
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
                                        <div class="text-center view_div_current">
                                            <img src="images/ic_visibility_24px.svg" class="footer_img_view" alt="...">
                                            <br><span class="icon_font">{{ res.total_view == null ? 0 : res.total_view
                                                }}</span>
                                        </div>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                        <div class=" text-center share_div_current" >
                                            <a class="view_all_latestact" :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa('Events')}`" target="_blank"  @click.prevent="sendToWhatsApp(  res.organization.title , `/sharepostcard?id=${btoa(res.id)}&type=${btoa('Events')}` )" id="share">
                                                <img src="images/Logo-WhatsApp@2x.png"class="footer_img footer_img_share" alt="...">
                                                <br><span class="icon_font">Share</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label class="post_uploaded_label px-4">{{ formatTimeAgo(res.created_at) }}</label>
                    </div>
                </div>
            </div>
            <infinite-loading class="pb-5" v-if="this.message == ''" @distance="1" @infinite="getCurrentEvent"></infinite-loading>
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
                                        <div v-for="(res, index) in img" :key="index" v-show="index === selectedImageIndex" class="swiper-slide">
                                            <img :src="res.original_url ? res.original_url : 'images/jd_card_logo.png'"
                                                class="image_slider img-fluid" :title="org_title"  :alt="org_title">
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="swiper slider">
                                    <img src='/images/jd_card_logo.png' class="image_slider img-fluid" :title="org_title"  :alt="org_title">
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-2 m-1" v-if="img.length > 0">Gallery</label>
                                <div class="swiper thumbnail thumbnailCurrent">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in  img" :key="index" class="swiper-slide">
                                            <img :src="res.original_url" alt="..." class="image_slider_down img-fluid"
                                                @click="selectImage(index)">
                                        </div>
                                    </div>
                                    <div class="next_div" v-if="img.length > 3" @click="nextSlideCurrent"><i
                                            class="bi bi-chevron-right"></i></div>
                                    <div class="prev_div" v-if="img.length > 3" @click="prevSlideCurrent"><i
                                            class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-3 g-0 ">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                        class="modal_card_head_img":title="org_title"  :alt="org_title">
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ">
                                                    <label
                                                        class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                        :title="org_title"  :alt="org_title">{{ org_title }}</label>
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ms-auto ">
                                                    <button class="btn btn_following btn_following_modal"
                                                        @click="manageFollowMore()" type="submit"><img
                                                            :src="getFollowImageMore()" class="flw_btn_img"
                                                            alt="..."></button>
                                                </div>
                                            </div>
                                        </div><!--end of card head-->
                                        <div class="card-body p-2 ">
                                            <label class="card_modal_body-title px-2">{{ dash_sanstha.title }} </label>
                                            <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': img.length > 0 }">
                                                <p class="card_modal_body_details p-2" v-html="dash_sanstha.detail"></p>
                                                <label v-if="dash_sanstha.type == 'Events'" class="card_modal_date py-2">
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
                                                        <br><span class="icon_font">{{ total_count > 0 ? total_count :
                    dash_sanstha.total_like == null ? 0 :
                        dash_sanstha.total_like }}</span>
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
                                                        <br><span class="icon_font ">{{ dash_sanstha.total_view == null
                                                            ? 0 : dash_sanstha.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class=" text-center">
                                                        <a class="view_all_latestact" :href="`/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`" target="_blank"   @click.prevent="sendToWhatsApp( org_title  , `/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`)" id="share">
                                                            <img src="images/Logo-WhatsApp@2x.png"class="footer_img footer_img_share" alt="...">
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
    </section>
</template>
<script>
import currentService from "../../services/currentevent.service";
import sansthaDetailService from '../../services/sansthaDetail.service';
import { handleLike, handleSave } from '../../common/common';
import { sendToWhatsApp } from '../../utils/sharefunction.js';
import { initializeSliderCurrent, initializeThumbnailCurrent } from "../../utils/swiper";
import moment from 'moment';

export default {
    name: "App",
    data() {
        return {
            message: '', page: 1, currentEvent: [], total_count: '', dash_sanstha: [], img: '', selectedImageIndex: 0, org_logo: '', org_title: '', total_count: '', resExType: '', about_id: '',
        };
    },
    methods: {
        formatTimeAgo(date) {
            return moment(date).fromNow();
        },
        nextSlideCurrent() {
            const thumbnailCurrent = document.querySelector('.thumbnailCurrent').swiper;
            thumbnailCurrent.slideNext();

        },
        prevSlideCurrent() {
            const thumbnailCurrent = document.querySelector('.thumbnailCurrent').swiper;
            thumbnailCurrent.slidePrev();
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
        async getCurrentEvent($state) {
            const response = await currentService.getCurrent(this.page)
            if (response.status == 200 || 201) {
                if (response.data.length != 0) {
                    $.each(response.data, (key, value) => {
                        this.currentEvent.push(value);
                    });
                    $state.loaded();
                    this.page = this.page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("something went wrong");
            }
        },
        async getTypedSanstha() {
            const data = {
                params: {
                    store_type: "Events",
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
            const newsIndex = this.currentEvent.findIndex(explore => explore.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                this.$set(this.currentEvent[newsIndex], 'total_like', newLikeCount); // Update total_like
                if (this.currentEvent[newsIndex].get_user_likes) {
                    this.$set(this.currentEvent[newsIndex].get_user_like, 'is_like', newIsLike);
                } else {
                    this.$set(this.currentEvent[newsIndex], 'get_user_like', { is_like: newIsLike });
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
            const newsIndex = this.currentEvent.findIndex(explore => explore.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.currentEvent[newsIndex].get_user_save_posts) {
                    this.$set(this.currentEvent[newsIndex].get_user_save_post, 'is_save', newIsSave);
                } else {
                    this.$set(this.currentEvent[newsIndex], 'get_user_save_post', { is_save: newIsSave });
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
            const newsIndex = this.currentEvent.findIndex(explore => explore.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.currentEvent[newsIndex].get_user_org_follows) {
                    this.$set(this.currentEvent[newsIndex].get_user_org_follows, 'is_follow', newIsFollow);
                } else {
                    this.$set(this.currentEvent[newsIndex], 'get_user_org_follows', { is_follow: newIsFollow });
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
        nextSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slideNext();
        },
        prevSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slidePrev();
        },
        getDataById(resId) {
            this.about_id = resId
            if (this.about_id) {
                this.getTypedSanstha();
            }
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
                ...this.currentEvent[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.currentEvent, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, 'event', resId);
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
                ...this.currentEvent[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.currentEvent, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, 'event', resId);
        },
    },
    mounted() {
        const thumbnailCurrent =initializeThumbnailCurrent();
        initializeSliderCurrent(thumbnailCurrent);
    },
};
</script>
