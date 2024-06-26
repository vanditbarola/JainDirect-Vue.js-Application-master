<template>
    <div>
        <section class="mt-2 pb-2">
            <div class="container">
                <label class="section_header p-1 m-1">Video</label>
                <div class="row g-3 my-2 pb-5">
                    <div class="col-md-6 col-xxl-4 col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-6"
                        v-for='(res, index) in videoSanstha'>
                        <div class="card h-100 card_getallnews p-2">
                            <div class="ribbon-wrapper">
                                <div class="card-badge-video">Video</div>
                            </div>
                            <div class="row">
                                <div class="col">

                                    <img class="getallimg img-fluid"
                                        :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                        :title="res.organization.title" :alt="res.organization.title">

                                    <span class="d-inline-block text-truncate getallhead"
                                        :title="res.organization.title" alt="Organization Title">{{
                            res.organization.title }}</span>

                                    <button v-if="token == null" class="btn followbtn" type="submit"
                                        @click="navigateFollow()">Follow</button>
                                    <button v-else class="btn btn_following_log"
                                        @click="manageFollowVideo(res, res.organization.id, res.get_user_org_follows == null ? is_follow = 0 : res.get_user_org_follows.is_follow, index)"
                                        type="submit">
                                        <img :src="getFollowImageUrl(res)" alt="..."></button>
                                </div>
                            </div>
                            <!-- <a type="button" class="view_all_latestact" data-bs-toggle="modal"
                                data-bs-target="#myVideoModal"> -->
                            <div
                                v-if="res.banner ? res.banner[0] ? isImage(res.banner[0].original_url) : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'">
                                <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                    class="getallnewsimg card-img-top img-fluid m-1 text-center"
                                    :title="res.organization.title" :alt="res.organization.title">
                            </div>
                            <div v-else>
                                <video controls class="getallnewsimg card-img-top img-fluid m-1 text-center"
                                    :title="res.organization.title" :alt="res.organization.title">
                                    <source
                                        :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                        type="video/mp4">
                                </video>
                            </div>

                            <div class="activity_card_body p-1">
                                <label class="card_header">{{ res.title }}</label>
                                <p class="section_body">{{ res.detail }}
                                </p>
                            </div>
                            <!-- </a> -->
                            <a v-if="token == null" class="read_more p-1" @click="navigateFollow()">Read More</a>
                            <a v-else class="read_more p-1" data-bs-toggle="modal" data-bs-target="#myVideoReadModal"
                                @click="getEditId(res.id)">Read More</a>

                            <div class="card-footer border-0 bg-white activity_card_footer">
                                <div class="row row-cols-4">
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3"
                                        @click="navigateFollow()">
                                        <div class="text-center" style="margin-left: -45px;">
                                            <img v-if="token == null" src="/images/ic_unfavorite_24px.svg"
                                                class="footer_img" alt="...">
                                            <img v-else :src="getImageUrl(res)"
                                                @click="manageLike(res, res.type = 'Video', res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                                class="footer_img" alt="...">
                                            <br><span class="icon_font">{{ total_count > 0 ? total_count :
                            res.total_like == null ? 0 : res.total_like }}</span>
                                        </div>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3"
                                        @click="navigateFollow()">
                                        <div class="text-center" style="margin-left: -21px;">
                                            <img v-if="token == null" src="/images/ic_add_box_24px.svg"
                                                class="footer_img" alt="...">
                                            <img v-else :src="getSaveImageUrl(res)"
                                                @click="manageSave(res, res.type = 'Video', res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
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
                                        <div class="text-center" style="margin-left: 16px;">
                                            <img src="/images/ic_visibility_24px.svg" class="footer_img_view" alt="...">
                                            <br><span class="icon_font">{{ res.total_view == null ? 0 :
                            res.total_view }}</span>
                                        </div>
                                    </div>
                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                        <div class=" text-center" style="margin-left: 20px;">
                                            <a class="view_all_latestact"
                                                :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa(res.type)}`"
                                                target="_blank" id="share"
                                                @click.prevent="sendToWhatsApp(res.organization.title, `/sharepostcard?id=${btoa(res.id)}&type=${btoa(res.type)}`)">
                                                <img src="/images/Logo-WhatsApp@2x.png"
                                                    class="footer_img footer_img_share" alt="...">
                                                <br><span class="icon_font">Share</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <infinite-loading @distance="1" @infinite="getVideoBasedSanstha"></infinite-loading>
                </div>
                <div class="modal" id="myVideoReadModal">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close"><i
                                    class="bi bi-x-lg"></i></button>
                            <div class="modal-body" style="padding-bottom: 0%;">
                                <div class="row">
                                    <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                        <div class="swiper slider"  v-if="modelBanner.length > 0">
                                            <div class="swiper-wrapper" v-for="(res, index) in modelBanner" :key="index"
                                                v-if="index === selectedImageIndex">
                                                <video controls :src="res.original_url"
                                                    class="video_slider image_slider img-fluid" :alt="org_title"
                                                    :title="org_title"></video>
                                            </div>
                                        </div>
                                        <div v-else class="swiper slider">
                                            <img src='/images/jd_card_logo.png' class="image_slider img-fluid" alt="..."
                                                :alt="org_title" :title="org_title">
                                        </div>
                                        <div class="dash mt-2 mb-2"></div>
                                        <label class="title_gallery p-3 m-1"
                                            v-if="modelBanner.length > 0">Gallery</label>
                                        <div class="swiper thumbnail thumbnailVideo">
                                            <div class="swiper-wrapper">
                                                <div v-for="(res, index) in modelBanner" :key="index"
                                                    class="swiper-slide">
                                                    <video controls :src="res.original_url"
                                                        class="image_slider_down img-fluid video_slider"
                                                        @click="selectImage(index)"></video>
                                                </div>
                                            </div>
                                            <div v-if="modelBanner.length > 3" class="next_div" @click="nextSlideVideo"><i
                                                    class="bi bi-chevron-right"></i></div>
                                            <div v-if="modelBanner.length > 3" class="prev_div" @click="prevSlideVideo"><i
                                                    class="bi bi-chevron-left"></i></div>
                                        </div>
                                    </div>

                                    <div
                                        class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                        <section class="card1">
                                            <div class="card border-0">
                                                <div class="card-head p-2 card_head_modal border-0">
                                                    <div class="row row-cols-auto g-0 ">
                                                        <div
                                                            class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                            <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                                class="modal_card_head_img" :alt="org_title"
                                                                :title="org_title">
                                                        </div>
                                                        <div
                                                            class="col col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
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
                                                    <label class="card_modal_body-title px-2">{{ detail_sanstha.title }}
                                                    </label>
                                                    <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': modelBanner.length > 0 }">
                                                        <p class="card_modal_body_details p-2"
                                                            v-html="detail_sanstha.description"></p>
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
                            total_count
                            : detail_sanstha.total_like == null ? 0 :
                                detail_sanstha.total_like }}</span>
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
                                                                <br><span class="icon_font ">{{
                            detail_sanstha.total_view ==
                                null ? 0 : detail_sanstha.total_view }}</span>
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                            <div class=" text-center">
                                                                <a class="view_all_latestact"
                                                                    :href="`/sharepostcard?id=${btoa(detail_sanstha.id)}&type=${btoa(detail_sanstha.type)}`"
                                                                    @click="sendToWhatsApp(org_title , `/sharepostcard?id=${btoa(detail_sanstha.id)}&type=${btoa(detail_sanstha.type)}`)"
                                                                    id="share" target="_blank">
                                                                    <img src="/images/Logo-WhatsApp@2x.png"
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
        </section>
    </div>
</template>
<script>
import sansthaDetailService from '../../../services/sansthaDetail.service';
import afterLoginHomeService from '../../../services/afterLoginHome.service';
import { handleLike, handleSave } from '../../../common/common';
import { sendToWhatsApp } from '../../../utils/sharefunction.js';

export default {
    name: "App",
    data() {
        return {
            detail_sanstha: {
                banner: [],
                organization: {
                    logo: [],
                    title: ''
                }
            }, org_logo: '', org_title: '',
            modelBanner: '',
            selectedImageIndex: 0,
            token: localStorage.getItem('storeToken'),
            titleErr: '', newsTitle: '', post_error: '', video_id: '',
            videoTitle: '', videoPost_visiblity: '', selectedImageURL3: '', selectedImageURL2: '', org_title: '', org_logo: '', org_detail: '', frm_img: '', video_data: [], video_page: 1, video_id: '', video_del_id: '', selectItemFilter: '', get_sanstha: '', total_count: '', videoSanstha: [], message: ''
        };
    },
    created() {
        if (this.videoSanstha.length === 0) {
            this.getVideoBasedSanstha();
        }
    },
    mounted() {
        const thumbnailVideo = new Swiper('.thumbnailVideo', {
            slidesPerView: 'auto',
        });
        const slider = new Swiper('.slider', {
            loop: true,
            grabCursor: true,
            thumbs: {
                swiper: thumbnailVideo
            },
        });
    },
    methods: {
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        nextSlideVideo() {
            const thumbnailVideo = document.querySelector('.thumbnailVideo').swiper;
            thumbnailVideo.slideNext();
        },
        prevSlideVideo() {
            const thumbnailVideo = document.querySelector('.thumbnailVideo').swiper;
            thumbnailVideo.slidePrev();
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
                this.detail_sanstha = response
                this.modelBanner = response.banner
                this.img = response.banner;
                this.org_logo = this.detail_sanstha.organization.logo[0].original_url
                this.org_title = this.detail_sanstha.organization.title
                this.poId = this.detail_sanstha.id
                this.typePo = this.detail_sanstha.type
                this.startDate = this.detail_sanstha.start_date_and_time
                this.endDate = this.detail_sanstha.end_date_and_time
            } else {
                console.error("Something went wrong")
            }
        },
        getImageLike() {
            if (this.detail_sanstha.get_user_likes == null) {
                return '/images/ic_unfavorite_24px.svg';
            } else if (this.detail_sanstha.get_user_likes.is_like === 1) {
                return '/images/ic_favorite_24px.svg';
            } else {
                return '/images/ic_unfavorite_24px.svg';
            }
        },
        async manageLikeMore() {
            let is_like = 0;
            if (this.detail_sanstha.get_user_likes) {
                is_like = this.detail_sanstha.get_user_likes.is_like;
            }
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? this.detail_sanstha.total_like + 1 : this.detail_sanstha.total_like - 1;
            let img = newIsLike === 1 ? '/images/ic_favorite_24px.svg' : '/images/ic_unfavorite_24px.svg';

            // Update the detail_sanstha object
            this.$set(this.detail_sanstha, 'img', img); // Update the image path
            if (this.detail_sanstha.get_user_likes) {
                this.$set(this.detail_sanstha.get_user_likes, 'is_like', newIsLike);
            } else {
                this.$set(this.detail_sanstha, 'get_user_likes', { is_like: newIsLike });
            }
            this.$set(this.detail_sanstha, 'total_like', newLikeCount); // Update total_like
            const newsIndex = this.videoSanstha.findIndex(video => video.id === this.detail_sanstha.id);
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
            if (this.detail_sanstha.get_user_save_posts == null) {
                return '/images/ic_add_box_24px.svg';
            } else if (this.detail_sanstha.get_user_save_posts.is_save === 1) {
                return '/images/ic_add_fav_box_24px.svg';
            } else {
                return '/images/ic_add_box_24px.svg';
            }
        },
        async manageSaveMore() {
            let is_save;
            if (this.detail_sanstha.get_user_save_posts == null) {
                is_save = 0;
            } else {
                is_save = this.detail_sanstha.get_user_save_posts.is_save;
            }
            const newIsSave = is_save === 1 ? 0 : 1;
            let img = newIsSave === 1 ? 'images/ic_add_box_24px.svg' : 'images/ic_add_box_24px.svg';
            this.$set(this.detail_sanstha, 'img', img); // Update the image path
            if (this.detail_sanstha.get_user_save_posts) {
                this.$set(this.detail_sanstha.get_user_save_posts, 'is_save', newIsSave);
            } else {
                this.$set(this.detail_sanstha, 'get_user_save_posts', { is_save: newIsSave });
            }
            const newsIndex = this.videoSanstha.findIndex(video => video.id === this.detail_sanstha.id);
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
            if (this.detail_sanstha.get_user_org_follows == null) {
                return '/images/follow_btn.svg';
            } else if (this.detail_sanstha.get_user_org_follows.is_follow === 1) {
                return '/images/following_btn.svg';
            } else {
                return '/images/follow_btn.svg';
            }
        },
        async manageFollowMore() {
            let is_follow = 0;
            if (this.detail_sanstha.get_user_org_follows) {
                is_follow = this.detail_sanstha.get_user_org_follows.is_follow;
            }
            const newIsFollow = is_follow === 1 ? 0 : 1;
            let img = newIsFollow === 1 ? 'images/following_btn.svg' : 'images/follow_btn.svg';

            this.$set(this.detail_sanstha, 'img', img); // Update the image path
            if (this.detail_sanstha.get_user_org_follows) {
                this.$set(this.detail_sanstha.get_user_org_follows, 'is_follow', newIsFollow);
            } else {
                this.$set(this.detail_sanstha, 'get_user_org_follows', { is_follow: newIsFollow });
            }
            const newsIndex = this.videoSanstha.findIndex(video => video.id === this.detail_sanstha.id);
            if (newsIndex !== -1) {
                if (this.videoSanstha[newsIndex].get_user_org_follows) {
                    this.$set(this.videoSanstha[newsIndex].get_user_org_follows, 'is_follow', newIsFollow);
                } else {
                    this.$set(this.videoSanstha[newsIndex], 'get_user_org_follows', { is_follow: newIsFollow });
                }
            }
            const data = {
                is_follow: newIsFollow,
                organisation_id: this.detail_sanstha.organization_id,
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
        isImage(url) {
            return /\.(jpeg|jpg|png)$/i.test(url);
        },
        isVideo(url) {
            return /\.(mp4)$/i.test(url);
        },
        navigateFollow() {
            const url = window.location.href;
            this.token = localStorage.getItem('storeToken');
            if (this.token == null) {
                window.location.href = '/home-login';
            }
        },
        getEditId(resId) {
            this.video_id = resId;
            if (this.video_id) {
                this.getTypedSanstha();
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
        getFollowImageUrl(res) {
            if (res.get_user_org_follows == null) {
                return '/images/follow_btn.svg';
            } else if (res.get_user_org_follows.is_follow === 1) {
                return '/images/following_btn.svg';
            } else {
                return '/images/follow_btn.svg';
            }
        },
        async manageFollowVideo(res, resOrgId, is_follow, index) {
            const newIsFollow = is_follow === 1 ? 0 : 1;
            this.$set(res, 'img', this.getFollowImageUrl(res));
            const updatedItem = {
                ...this.videoSanstha[index],
                get_user_org_follows: { is_follow: newIsFollow },
            };
            this.$set(this.videoSanstha, index, updatedItem)
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
        },

        async getVideoBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllVideoSanstha(this.video_page, { ...data });
            if (response.status === 200 || response.status === 201) {
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
                    if (this.video_page === 1) {
                        this.videoSanstha = response.data;
                    } else {
                        this.videoSanstha = this.videoSanstha.concat(response.data);
                    }
                    $state.loaded();
                    this.video_page = this.video_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong");
            }
        },
        // async getParticularSansthaVideo() {
        //     const url = window.location.href;
        //     const lastParam = url.split("/").slice(-1)[0];
        //     const data = {
        //         params: {
        //             type: "web"
        //         }
        //     }
        //     const response = await sansthaDetailService.getParticularAppealSanstha(this.appeal_id, data);
        //     if (response.status == 200 || response.status == 201) {
        //         this.appeal_data = response.data;
        //         this.org_title = response.data.organization.title;
        //         this.org_logo = response.data.organization.logo[0].original_url;
        //         this.frm_img = response.data.banner[0].original_url;
        //         if (this.appeal_data.detail && this.appeal_data.detail.ops) {
        //             this.quill2.setContents(this.appeal_data.detail);
        //         } else {
        //             this.quill2.setText(this.appeal_data.detail);
        //         }
        //     } else {
        //         console.error("Something went wrong");
        //     }
        // },
    }
}
</script>