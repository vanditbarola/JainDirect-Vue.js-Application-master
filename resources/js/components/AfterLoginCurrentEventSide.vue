<template>
    <div class="right_card1" v-if="currentEvent.length > 0">
        <div class="right_top p-2" style="display: block;">
            <label class="section_body p-1" style="font-weight: bold;">Current Events</label>
            <label class="indi_btn"><a href="current-more-event" class="indi_btn" style="margin-top: -28px;">View all</a></label>
            <div id="carousel_inner_login_events1" class="carousel slide" data-bs-ride="carousel" ref="carousel">
                <div class="carousel-inner">
                    <div v-for="(res, index) in currentEvent" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }">
                        <div class="card h-9 p-2 card_getallnews">
                            <div class="ribbon-wrapper">
                                <div class="card-badge-event">Events</div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <a style="text-decoration: none;">
                                        <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                            alt="" class="getallimg img-fluid">
                                        <span class="d-inline-block text-truncate getallhead" style="max-width: 100px;">{{ res.organization.title }}</span>
                                    </a>
                                </div>
                            </div>
                            <a class="view_all_latestact">
                                <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                    alt="" class="getallnewsimg card-img-top img-fluid m-1 text-center">
                            </a>
                            <div class="activity_card_body p-1">
                                <label class="card_header">{{ res.title }}</label>
                                <br><label class="card_modal_date pt-3"><img src="images/ic_timer_24px.svg"
                                        class="loation_icon me-2" alt="..."> {{ formatDate(res.start_date_and_time) + ' - ' + formatDate1(res.end_date_and_time) }}</label>
                                <br><label class="card-modal_location py-1">
                                    <img src="images/ic_place_24px.svg" class="loation_icon me-2" alt="..."> {{ res.location }}</label>
                            </div>

                            <a class="view_all_latestact">
                                <div class="card-footer border-0 bg-white activity_card_footer">
                                    <div class="row row-cols-4">
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                            <div class="text-center" style="margin-left: -45px;">
                                                <img :src="getImageUrl(res)"
                                                    @click="manageLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                    class="footer_img" id="unLike_fav" alt="...">
                                                <br><span class="icon_font">{{ res.total_like == null ? 0 : res.total_like }}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                            <div class="text-center" style="margin-left: -21px;">
                                                <img :src="getSaveImageUrl(res)"
                                                    @click="manageSave(res, res.type, res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
                                                    class="footer_img" alt="...">
                                                <br>
                                                <span v-if="getSaveImageUrl(res) === '/images/ic_add_fav_box_24px.svg'" class="icon_font">Saved Post</span>
                                                <span v-else class="icon_font">Save Post</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                            <div class="text-center" style="margin-left: 16px;">
                                                <img src="images/ic_visibility_24px.svg" class="footer_img" alt="...">
                                                <br><span class="icon_font">{{ res.total_view == null ? 0 : res.total_view
                                                }}</span>
                                            </div>
                                        </div>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                            <div class="text-center" style="margin-left: 20px;">
                                                <img src="images/Group21431.svg" class="footer_img" alt="...">
                                                <br><span class="icon_font">1.4k</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <br><br>
                <div class="carousel-indicators">
                    <button v-for="(res, index) in currentEvent" :key="index" type="button"
                        :data-bs-target="'#carousel_inner_login_events1'" :data-bs-slide-to="index"
                        :class="{ 'active': index === 0 }" aria-current="true" :aria-label="`Slide ${index + 1}`"
                        @click="goToSlide(index)"></button>
                </div>
            </div>
        </div>
    </div>

    <div class="right_card2 mt-3" v-else>
        <div class="right_top p-2" style="display: block;">
            <label class="section_body p-1" style="font-weight: bold;">Current Events</label>
            <label class="indi_btn"><a href="upcomming-more-event" class="indi_btn" style="margin-top: -28px;">View all</a></label>
            <div id="carousel_inner_login_events2" class="carousel slide" data-bs-ride="carousel">
                <div>
                    <p>No data found !</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import eventSideBarService from "../../services/eventsidebar.service"
import { handleLike, handleSave } from '../../common/common';
export default {
    name: "App",
    data() {
        return {
            user_name: [], currentEvent: [], upcomingEvent: [], add_like: '', save_img: ''
        };
    },
    methods: {
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
        goToSlide(index) {
            const carousel = new bootstrap.Carousel(this.$refs.carousel);
            carousel.to(index);
        },
        async getCurrentEvent() {
            const data = { topic_type_id: this.info };
            const response = await eventSideBarService.getCurrentEvent({ ...data })
                .then(function (response) {
                    this.currentEvent = response.data
                }.bind(this));
        },
        async getUpcommingEvent() {
            const data = { topic_type_id: this.info };
            const response = await eventSideBarService.getUpcomingEvent({ ...data })
                .then(function (response) {
                    this.upcomingEvent = response.data
                }.bind(this));
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
            await handleLike(newIsLike, resType, resId);
        },
        async manageLike1(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.upcomingEvent[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.upcomingEvent, index, updatedItem);
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
                ...this.currentEvent[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.currentEvent, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        async manageSave1(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.upcomingEvent[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.upcomingEvent, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        }
    },
    beforeMount() {
        this.getUpcommingEvent();
        this.getCurrentEvent();
    },
};
</script>