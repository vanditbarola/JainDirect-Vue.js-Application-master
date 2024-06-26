<template>
    <div x-data="app()" x-cloak>
        <div class="row g-2">
            <div v-if="message.length > 0"
                class="col-md-12 col-xxl-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 px-3 text-danger">
                {{ message }}
            </div>

            <div v-else class="col-md-12 col-xxl-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12"
                v-for='(res, index) in eventSanstha.slice(0,2)'>
                <div class="card h-100 card_getallnews p-2">
                    <div class="ribbon-wrapper">
                        <div class="card-badge-event">Events</div>
                    </div>
                    <div class="row">
                        <div class="col">
                           
                                <img class="getallimg img-fluid"
                                    :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                    :title="res.organization.title" :alt="res.organization.title">
                                <span class="d-inline-block text-truncate getallhead" :title="res.organization.title"
                                    alt="Organization Title">{{ res.organization.title }}</span>
                            
                            <button v-if="token == null" class="btn followbtn" type="submit"
                                @click="navigateFollow()">Follow</button>
                            <button v-else class="btn btn_following_log"
                                @click="manageFollowEvent(res, res.organization.id, res.get_user_org_follows == null ? is_follow = 0 : res.get_user_org_follows.is_follow, index)"
                                type="submit">
                                <img :src="getFollowImageUrl(res)" alt="..."></button>
                        </div>
                    </div>
                    <a type="button" class="view_all_latestact" data-bs-toggle="modal" data-bs-target="#myNewzModal">
                        <img class="getallnewsimg card-img-top img-fluid m-1 text-center"
                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                            :title="res.organization.title" :alt="res.organization.title">
                    </a>
                    <div class="activity_card_body p-1">
                        <label class="card_header">{{ res.title }}</label>
                        <p class="section_body" v-html="res.detail"></p>
                        <br><label class="card_modal_date pt-3">
                            <img src="/images/ic_timer_24px.svg" class="loation_icon me-2" alt="...">
                            {{ formatDate(res.start_date_and_time) + ' - ' + formatDate1(res.end_date_and_time) }}
                        </label>
                        <br><label class="card-modal_location py-1">
                            <img src="/images/ic_place_24px.svg" class="loation_icon me-2"
                                alt="...">{{ res.location }}</label>
                    </div>
                    <a v-if="token == null" class="read_more px-1 pt-2" style="margin-left: 10px; margin-top: 10px;"
                        @click="navigateFollow()">Read More </a>
                    <a v-else class="read_more px-1 pt-2" data-bs-toggle="modal"
                        style="margin-left: 10px; margin-top: 10px;" data-bs-target="#myNewzModal"
                        @click="getEditId(res.id)">Read More </a>
                
                        <div class="card-footer border-0 bg-white activity_card_footer">
                            <div class="row row-cols-4">
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3"
                                    @click="navigateFollow()">
                                    <div class="text-center" style="margin-left: -45px;">
                                        <img v-if="token == null" src="/images/ic_unfavorite_24px.svg"
                                            class="footer_img" alt="...">
                                        <img v-else :src="getImageUrl(res)"
                                            @click="manageLike(res, res.type = 'Events', res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                            class="footer_img" alt="...">
                                        <br><span class="icon_font">{{ total_count > 0 ? total_count : res.total_like ==
                null ? 0 : res.total_like }}</span>
                                    </div>
                                </div>
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3"
                                    @click="navigateFollow()">
                                    <div class="text-center" style="margin-left: -21px;">
                                        <img v-if="token == null" src="/images/ic_add_box_24px.svg" class="footer_img"
                                            alt="...">
                                        <img v-else :src="getSaveImageUrl(res)"
                                            @click="manageSave(res, res.type = 'Events', res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
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
                                        <br><span class="icon_font">{{ res.total_view == null ? 0 : res.total_view
                                            }}</span>
                                    </div>
                                </div>
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                    <div class=" text-center" style="margin-left: 20px;">
                                        <a class="view_all_latestact" :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa('Events')}`" target="_blank"  @click.prevent ="sendToWhatsApp( res.organization.title , `/sharepostcard?id=${btoa(res.id)}&type=${btoa('Events')}` )" id="share">
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
    </div>
</template>
<script>
import sansthaDetailService from '../../../services/sansthaDetail.service'
import afterLoginHomeService from '../../../services/afterLoginHome.service';
import { handleLike, handleSave } from '../../../common/common';
import { sendToWhatsApp } from '../../../utils/sharefunction.js';

export default {
    name: "App",
    data() {
        return {
            token: localStorage.getItem('storeToken'), message: '',
            get_sanstha: '', total_count: '', eventSanstha: [], event_page: 1, event_id: ''
        };
    },
    beforeMount() {
        this.getEventsBasedSanstha();
    },
    mounted() {
        const thumbnail = new Swiper('.thumbnail', {
            slidesPerView: 3,
        });

        const slider = new Swiper('.slider', {
            loop: true,
            grabCursor: true,
            thumbs: {
                swiper: thumbnail
            },
        });
    },
    methods: {
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
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
        navigateFollow() {
            const url = window.location.href;
            this.token = localStorage.getItem('storeToken');
            if (this.token == null) {
                window.location.href = '/home-login';
            }
        },
        getEditId(resId) {
            this.event_id = resId
            this.$emit('event-id', { id: this.event_id, type: "Events" });
        },
        getImageUrl(res) {
            if (res.get_user_like == null) {
                return '/images/ic_unfavorite_24px.svg';
            } else if (res.get_user_like.is_like === 1) {
                return '/images/ic_favorite_24px.svg';
            } else {
                return '/images/ic_unfavorite_24px.svg';
            }
        },
        getSaveImageUrl(res) {
            if (res.get_user_save_post == null) {
                return '/images/ic_add_box_24px.svg';
            } else if (res.get_user_save_post.is_save === 1) {
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
                ...this.eventSanstha[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.eventSanstha, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.eventSanstha[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.eventSanstha, index, updatedItem)
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
        async manageFollowEvent(res, resOrgId, is_follow, index) {
            const newIsFollow = is_follow === 1 ? 0 : 1;
            this.$set(res, 'img', this.getFollowImageUrl(res));
            const updatedItem = {
                ...this.eventSanstha[index],
                get_user_org_follows: { is_follow: newIsFollow },
            };
            this.$set(this.eventSanstha, index, updatedItem)
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
        async getEventsBasedSanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllEventSanstha(this.event_page, data);
            if (response.status === 200 || 201) {
                this.$emit('events-fetched', response.data);
                if (response.data.length > 0) {
                    $.each(response.data, async (key, value) => {
                        this.event_id = value.id;
                        const data = {
                            event_id: this.event_id,
                            news_id: '',
                            appeal_id: '',
                            video_id: ''
                        }
                        const response = await afterLoginHomeService.viewEventNews({ ...data })
                        if (response.status === 200 || 201) {
                        } else {
                            console.error("Something went wrong")
                        }
                    });
                    $.each(response.data, (key, value) => {
                        this.eventSanstha.push(value);
                    });
                } else {
                    this.message = "No events found !";
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getTypeSanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllEventSanstha(this.event_page, data);
            if (response.status === 200 || 201) {
                this.$emit('events-fetched', response.data);

                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.eventSanstha.push(value);
                    });
                }
            } else {
                console.error("Something went wrong")
            }
        },
    }
};
</script>