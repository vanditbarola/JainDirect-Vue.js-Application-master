<template>
    <section class="mt-2">
        <div class="container">
            <label class="section_header p-1 m-1">News</label>
            <div class="row g-3 my-2">
                <div class="col-md-6 col-xxl-4 col-lg-4 col-xl-4 col-md-6 col-sm-12 col-xs-6"
                    v-for='(res, index) in newsSanstha'>
                    <div class="card h-100 p-2 card_getallnews">
                        <div class="ribbon-wrapper">
                            <div class="card-badge-news">News</div>
                        </div>
                        <div class="row">
                            <div class="col">
                             
                                    <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                    :title="res.organization.title" :alt="res.organization.title" class="getallimg img-fluid">
                                    <span class="d-inline-block text-truncate getallhead"
                                        :title="res.organization.title" alt="Organization Title">{{
                        res.organization.title }}</span>
                               
                                <button v-if="token == null" class="btn followbtn" type="submit"
                                    @click="navigateFollow()">Follow</button>
                                <button v-else class="btn btn_following_log"
                                    @click="manageFollowNews(res, res.organization.id, res.get_user_org_follows == null ? is_follow = 0 : res.get_user_org_follows.is_follow, index)"
                                    type="submit">
                                    <img :src="getFollowImageUrl(res)" alt="..."></button>
                            </div>
                        </div>
                        <!-- <a type="button" class="view_all_latestact" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal"> -->
                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                        :title="res.organization.title" :alt="res.organization.title" class="getallnewsimg card-img-top img-fluid m-1 text-center">
                        <!-- </a> -->
                        <div class="activity_card_body p-1">
                            <!-- <a type="button" class="view_all_latestact" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal"> -->
                            <label class="card_header">{{ res.title }}</label>
                            <p class="section_body" v-html="res.detail"></p>
                            <!-- </a> -->
                            <br>
                            <a v-if="token == null" type="button" class="read_more p-1" @click="navigateFollow()">Read
                                More </a>
                            <a v-else type="button" class="read_more p-1" data-bs-toggle="modal"
                                data-bs-target="#myNewzReadModal" @click="getEditId(res.id)">Read More </a>
                        </div>

                        <div class="card-footer border-0 bg-white activity_card_footer">
                            <div class="row row-cols-4">
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3"
                                    @click="navigateFollow()">
                                    <div class="text-center" style="margin-left: -45px;">
                                        <img v-if="token == null" src="/images/ic_unfavorite_24px.svg"
                                            class="footer_img" alt="...">
                                        <img v-else :src="getImageUrl(res)"
                                            @click="manageLike(res, res.type = 'News', res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                            class="footer_img" alt="...">
                                        <br><span class="icon_font">{{ total_count > 0 ? total_count :
                        res.total_like == null ? 0 : res.total_like }}</span>
                                    </div>
                                </div>
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3"
                                    @click="navigateFollow()">
                                    <div class="text-center" style="margin-left: -21px;">
                                        <img v-if="token == null" src="/images/ic_add_box_24px.svg" class="footer_img"
                                            alt="...">
                                        <img v-else :src="getSaveImageUrl(res)"
                                            @click="manageSave(res, res.type = 'News', res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
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
                                        <a class="view_all_latestact" :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa('News')}`" target="_blank"  @click.prevent="sendToWhatsApp( res.organization.title , `/sharepostcard?id=${btoa(res.id)}&type=${btoa('News')}` )" id="share">
                                            <img src="/images/Logo-WhatsApp@2x.png"class="footer_img footer_img_share" alt="...">
                                            <br><span class="icon_font">Share</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <infinite-loading @distance="1" @infinite="getNewsBasedSanstha" class="pb-3"></infinite-loading>
            </div>
            <div class="modal" id="myNewzReadModal">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close"><i
                                class="bi bi-x-lg"></i></button>
                        <div class="modal-body" style="padding-bottom: 0%;">
                            <div class="row">
                                <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                    <div v-if="modelBanner && modelBanner.length > 0" class="swiper slider">
                                        <div class="swiper-wrapper">
                                            <div v-for="(res, index) in modelBanner" :key="index"
                                                v-show="index === selectedImageIndex" class="swiper-slide">
                                                <img :src="res.original_url ? res.original_url : 'images/jd_card_logo.png'"
                                                    class="image_slider img-fluid"  :title="org_title" :alt="org_title">
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="swiper slider">
                                        <img src='/images/jd_card_logo.png' class="image_slider img-fluid" alt="..."  :alt="org_title"  :title="org_title">
                                    </div>
                                    <div class="dash mt-2 mb-2"></div>
                                    <label class="title_gallery p-3 m-1" v-if="modelBanner.length > 0">Gallery</label>
                                    <div class="swiper thumbnail thumbnailNews">
                                        <div class="swiper-wrapper">
                                            <div v-for="(res, index) in modelBanner" :key="index" class="swiper-slide">
                                                <img :src="res.original_url" :title="org_title" :alt="org_title"
                                                    class="image_slider_down img-fluid" @click="selectImage(index)">
                                            </div>
                                        </div>
                                        <div class="next_div" v-if="modelBanner.length > 3" @click="nextSlideNews"><i
                                                class="bi bi-chevron-right"></i></div>
                                        <div class="prev_div" v-if="modelBanner.length > 3" @click="prevSlideNews"><i
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
                                                            class="modal_card_head_img"  :title="org_title" :alt="org_title">
                                                    </div>
                                                    <div
                                                        class="col col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                        <label
                                                            class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                             :title="org_title" :alt="org_title">{{ org_title }}</label>
                                                    </div>
                                                    <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4  ms-auto ">
                                                        <button class="btn btn_following btn_following_modal"
                                                            @click="manageFollowMore()" type="submit">
                                                            <img :src="getFollowImageMore()" class="flw_btn_img"
                                                                alt="..."></button>
                                                    </div>
                                                </div>
                                            </div><!--end of card head-->

                                            <div class="card-body p-2 ">
                                                <label class="card_modal_body-title px-2">{{ detail_sanstha.title }} </label>
                                                <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': modelBanner.length  > 0 }">
                                                    <p class="card_modal_body_details p-2"
                                                        v-html="detail_sanstha.detail"></p>
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
                                                            <br><span class="icon_font">{{ total_count > 0 ? total_count
                        : detail_sanstha.total_like == null ? 0 :
                            detail_sanstha.total_like }}</span>
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
                                                            <br><span class="icon_font ">{{ detail_sanstha.total_view ==
                                                                null ? 0 : detail_sanstha.total_view }}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                        <div class=" text-center" style="margin-left: 20px;">
                                                            <a class="view_all_latestact" :href="`/sharepostcard?id=${btoa(detail_sanstha.id)}&type=${btoa(detail_sanstha.type)}`"  @click.prevent ="sendToWhatsApp( org_title ,`/sharepostcard?id=${btoa(detail_sanstha.id)}&type=${btoa(detail_sanstha.type)}` )" id="share"
                                                                target="_blank">
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
    </section>
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
            news_id: '', token: localStorage.getItem('storeToken'),
            detail_sanstha: {
                banner: [],
                organization: {
                    logo: [],
                    title: ''
                }
            }, org_logo: '', org_title: '',
            modelBanner: '',
            selectedImageIndex: 0,
            get_sanstha: '', total_count: '', newsSanstha: [], message: '', news_page: 1, detail_sanstha: ""
        };
    },
    created() {
        this.getNewsBasedSanstha();
    },
    methods: {
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        btoa(input) {
            return btoa(input);
        },
        nextSlideNews() {
            const thumbnailNews = document.querySelector('.thumbnailNews').swiper;
            thumbnailNews.slideNext();
        },
        prevSlideNews() {
            const thumbnailNews = document.querySelector('.thumbnailNews').swiper;
            thumbnailNews.slidePrev();
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
                this.detail_sanstha = response
                this.modelBanner = response.banner
                console.log("Det", this.modelBanner.length)
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
            const newsIndex = this.newsSanstha.findIndex(news => news.id === this.detail_sanstha.id);
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
            const newsIndex = this.newsSanstha.findIndex(news => news.id === this.detail_sanstha.id);
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
            const newsIndex = this.newsSanstha.findIndex(news => news.id === this.detail_sanstha.id);
            if (newsIndex !== -1) {
                if (this.newsSanstha[newsIndex].get_user_org_follows) {
                    this.$set(this.newsSanstha[newsIndex].get_user_org_follows, 'is_follow', newIsFollow);
                } else {
                    this.$set(this.newsSanstha[newsIndex], 'get_user_org_follows', { is_follow: newIsFollow });
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
        navigateFollow() {
            const url = window.location.href;
            this.token = localStorage.getItem('storeToken');
            if (this.token == null) {
                window.location.href = '/home-login';
            }
        },
        getEditId(resId) {
            this.news_id = resId;
            if (this.news_id) {
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
        getFollowImageUrl(res) {
            if (res.get_user_org_follows == null) {
                return '/images/follow_btn.svg';
            } else if (res.get_user_org_follows.is_follow === 1) {
                return '/images/following_btn.svg';
            } else {
                return '/images/follow_btn.svg';
            }
        },
        async manageFollowNews(res, resOrgId, is_follow, index) {
            const newIsFollow = is_follow === 1 ? 0 : 1;
            this.$set(res, 'img', this.getFollowImageUrl(res));
            const updatedItem = {
                ...this.newsSanstha[index],
                get_user_org_follows: { is_follow: newIsFollow },
            };
            this.$set(this.newsSanstha, index, updatedItem)
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
        async getNewsBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllNewsSanstha(this.news_page, { ...data });
            if (response.status === 200 || response.status === 201) {
                if (response.data.length > 0) {
                    $.each(response.data, async (key, value) => {
                        this.news_id = value.id;
                        const data = {
                            event_id: '',
                            news_id: this.news_id,
                            appeal_id: '',
                            video_id: ''
                        }
                        const response = await afterLoginHomeService.viewEventNews({ ...data })
                        if (response.status === 200 || 201) {
                        } else {
                            console.error("Something went wrong")
                        }
                    });
                    if (this.news_page === 1) {
                        this.newsSanstha = response.data;
                    } else {
                        this.newsSanstha = this.newsSanstha.concat(response.data);
                    }
                    $state.loaded();
                    this.news_page = this.news_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong");
            }
        },

    },
    mounted() {

        const thumbnailNews = new Swiper('.thumbnailNews', {
            slidesPerView: 'auto',

        });

        const slider = new Swiper('.slider', {
            loop: true,
            grabCursor: true,
            thumbs: {
                swiper: thumbnailNews
            },

        });
    },
};
</script>
<style scoped>
/* .swiper-slide{
        display: block !important;
    } */
</style>