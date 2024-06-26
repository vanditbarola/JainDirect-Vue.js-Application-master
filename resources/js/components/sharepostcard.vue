<template>
    <section>
        <div x-data="app()" x-cloak>
            <section class="top_cont fixed-top">
                <div class="container">
                    <div class="row section_topic_head1 d-flex align-items-center">
                        <div
                            class=" col col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-6 col-xxl-6  text-xxl-end text-xl-end text-center">
                            <a class="tops" href="help-guide"><i
                                    class="bi bi-question-circle-fill p-1"></i>Help/Guide</a>
                        </div>
                        <!-- <div class="col col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
                        <b-dropdown text="Select language" class="dropdownMenuButton1"  v-model="selectItemLanguage" :text="selectItemLanguage ? selectItemLanguage : 'Select Language'">
                            <b-dropdown-item @click="updateLanguage('English')"><a class="dropdown-item" href="#">English</a></b-dropdown-item>
                            <b-dropdown-item @click="updateLanguage('Hindi')"><a class="dropdown-item" href="#">Hindi</a></b-dropdown-item>
                            <b-dropdown-item @click="updateLanguage('Kannada')"><a class="dropdown-item" href="#">Kannada</a></b-dropdown-item>
                            <b-dropdown-item @click="updateLanguage('Gujarati')"><a class="dropdown-item" href="#">Gujarati</a></b-dropdown-item>
                        </b-dropdown>
                    </div> -->
                        <div
                            class="col  col-xs-6 col-sm-6  col-md-4 col-lg-4 col-xl-6 col-xxl-6 text-center align-self-center text-xxl-end text-xl-end ">
                            <a class="tops logout" v-on:click="logout()">Logout</a>
                        </div>
                    </div>
                </div>
            </section>
            <section class="inner_login_navbar">
                <b-navbar toggleable="lg" class=" login_bg">
                    <div class="container">
                        <a class="navbar-brand" href="/">
                            <img src="images/log_new.png" class="nav-image-login1" style="margin-top: 20px;" alt="...">
                            <img src="images/logo_mini_new.png" class="nav-image-login2" style=" margin-top: 20px;"
                                alt="...">
                        </a>



                    </div>
                </b-navbar>
            </section>
        </div>
        <div class="share_postdev">
            <div class="row dashboard_news_row share_post_card " id="">
                <div class=" col col-xxxl-6 col-xl-6 col-xxl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-5">
                    <div class="card h-100 p-2 inner_login_cards">

                        <div class="ribbon-wrapper">
                            <div :class="{ 'card-badge-appeal': typePo === 'Appeal', 'card-badge-event': typePo === 'Events', 'card-badge-news': typePo === 'News', 'card-badge-video': typePo === 'Video' }"
                                :id="typePo">
                                <template v-if="typePo === 'Appeal'">Appeals</template>
                                <template v-else-if="typePo === 'Events'">Events</template>
                                <template v-else-if="typePo === 'News'">News</template>
                                <template v-else-if="typePo === 'Video'">Video</template>
                            </div>

                            <!-- <div class="card-badge-news">{{typePo}}</div> -->
                        </div>
                        <div class="row">
                            <div class="ps-4 d-flex">
                                <a class="view_all_latestact">
                                    <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                        class="modal_card_head_img" alt="...">
                                    <span class=" getallhead" alt="Organization Title">{{ org_title }}</span>
                                </a>
                            </div>
                        </div>
                        <div class="card-body card_body_Newz" style="margin-top: -10px;">
                            <div class="swiper slider share_swiper" v-if="img.length > 0">
                                <div class="swiper-wrapper">
                                    <div v-for="(res, index) in img" :key="index" v-show="index === selectedImageIndex"
                                        class="swiper-slide">
                                        <!-- <img :src="res.original_url ? res.original_url : 'images/jd_card_logo.png'"
                                            class="image_slider img-fluid share_post_top" alt="..."> -->


                                        <div v-if="isImage(res.original_url)">
                                            <img :src="res.original_url" class="image_slider img-fluid share_post_top"
                                                alt="...">
                                        </div>
                                        <div v-else-if="isVideo(res.original_url)">
                                            <video controls class="image_slider img-fluid share_post_top">
                                                <source :src="res.original_url" type="video/mp4">
                                            </video>
                                        </div>
                                        <div v-else>
                                            <img src="images/jd_card_logo.png"
                                                class="image_slider img-fluid share_post_top" alt="...">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="swiper slide">
                                <img src='/images/jd_card_logo.png' class="image_slider img-fluid" alt="...">
                            </div>
                            <label class="title_gallery p-3 m-1" v-if="img.length > 1">Gallery</label>
                            <!-- <div class="swiper thumbnail " v-if="img.length > 1">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        

                                        
                                    </div>
                                </div>
                                <div class="next_div_share" v-if="img.length > 3" @click="nextSlide"><i
                                        class="bi bi-chevron-right"></i></div>
                                <div class="prev_div_share" v-if="img.length > 3" @click="prevSlide"><i
                                        class="bi bi-chevron-left"></i></div>
                            </div> -->
                            <div class="swiper thumbnail">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide bottom-nav" v-for="(res, index) in  img" :key="index">
                                        <div v-if="isImage(res.original_url)">
                                            <img :src="res.original_url" class="image_slider_down img-fluid" alt="..."
                                                @click="selectImage(index)">
                                        </div>
                                        <div v-else>
                                            <video controls class="image_slider_down img-fluid">
                                                <source :src="res.original_url" type="video/mp4"
                                                    @click="selectImage(index)">
                                            </video>
                                        </div>
                                    </div>
                                </div>
                                <div class="next_div_share" v-if="img.length > 3" @click="nextSlide"><i
                                        class="bi bi-chevron-right"></i>
                                </div>
                                <div class="prev_div_share" v-if="img.length > 3" @click="prevSlide"><i
                                        class="bi bi-chevron-left"></i>
                                </div>
                            </div>
                            <div class="activity_card_body p-1">
                                <label class="card_header">{{ dash_sanstha.title }}</label>
                                <p class="section_body" v-html="dash_sanstha.detail"></p>
                                <label v-if="dash_sanstha.type == 'Events'" class="card_modal_date p-2">
                                    <img src="/images/ic_timer_24px.svg" class="location_icon mx-2" alt="...">
                                    {{ formatDate(dash_sanstha.start_date_and_time) + ' - ' +
                                formatDate1(dash_sanstha.end_date_and_time) }}
                                </label><br>
                                <label v-if="dash_sanstha.type == 'Events'" class="card-modal_location p-2 ">{{
                                dash_sanstha.location }}</label><br />

                            </div>

                        </div>
                        <div class="card-footer border-0 bg-white activity_card_footer">
                            <div class="row row-cols-4">
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                    <div class="text-center" style="margin-left: -45px;">
                                        <img :src="getImageLike()" class="footer_img" alt="...">
                                        <br><span class="icon_font">{{ total_count > 0 ? total_count :
                                dash_sanstha.total_like == null ? 0 :
                                    dash_sanstha.total_like }}</span>
                                    </div>
                                </div>
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                    <div class="text-center" style="margin-left: -21px;">
                                        <a class="view_all_latestact">
                                            <img :src="getSaveImageMore()" class="footer_img" alt="...">
                                            <br><span class="icon_font">Save Post</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                    <div class="text-center" style="margin-left: 16px;">
                                        <img src="/images/ic_visibility_24px.svg" class="footer_img" alt="...">
                                        <br><span class="icon_font">{{ dash_sanstha.total_view == null
                                            ? 0 : dash_sanstha.total_view }}</span>
                                    </div>
                                </div>
                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 hidden" >
                                    <div class=" text-center" style="margin-left: 20px;">
                                        <a class="view_all_latestact" href="/sharepost" target="_blank">
                                            <img src="/images/Group21431.svg" class="footer_img" alt="...">
                                            <br><span class="icon_font">1.4k</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import sansthaDetailService from '../../services/sansthaDetail.service';
export default {
    name: "App",
    data() {
        return {
            selectItemLanguage: null, decryptedId: '', decryptedType: '', dash_sanstha: [], img: '', org_logo: '', org_title: '', startDate: '', endDate: '',
            token: localStorage.getItem('storeToken'), selectedImageIndex: 0,
        };
    },
    mounted() {
        const thumbnail = new Swiper('.thumbnail', {
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
        isImage(url) {
            return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
        },
        isVideo(url) {
            return /\.(mp4|webm|ogg)$/i.test(url);
        },
        selectImage(index) {
            this.selectedImageIndex = index;
        },
        formatDate(dateTimeString) {
            if (!dateTimeString) {
                return '';
            }
            try {
                const [datePart, timePart] = dateTimeString.split(' ');
                if (!datePart || !timePart) {
                    return '';
                }
                const [day, month, year] = datePart.split('/');
                const rearrangedDate = `${month}/${day}/${year} ${timePart}`;
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
            } catch (error) {
                console.error("Error formatting date:", error);
                return '';
            }
        },

        formatDate1(dateTimeString1) {
            if (!dateTimeString1) {
                return '';
            }
            try {
                const [datePart, timePart] = dateTimeString1.split(' ');
                if (!datePart || !timePart) {
                    return '';
                }
                const [day, month, year] = datePart.split('/');
                const rearrangedDate1 = `${month}/${day}/${year} ${timePart}`;
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
            } catch (error) {
                console.error("Error formatting date:", error);
                return '';
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
        getSaveImageMore() {
            if (this.dash_sanstha.get_user_save_posts == null) {
                return '/images/ic_add_box_24px.svg';
            } else if (this.dash_sanstha.get_user_save_posts.is_save === 1) {
                return '/images/ic_add_fav_box_24px.svg';
            } else {
                return '/images/ic_add_box_24px.svg';
            }
        },
        async logout() {
            localStorage.removeItem('storeToken');
            localStorage.removeItem('storeEmail');
            localStorage.removeItem('storeMobile');
            localStorage.removeItem('userId');
            window.location.href = '/';
        },
        nextSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slideNext(); 
        },
        prevSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slidePrev();
        },
        decrypt(value) {
            return atob(value);
        },
        async getTypedSanstha() {
            const urlParams = new URLSearchParams(window.location.search);
            const encryptedId = urlParams.get('id');
            const encryptedType = urlParams.get('type');

            if (encryptedId && encryptedType) {
                this.decryptedId = this.decrypt(encryptedId);
                this.decryptedType = this.decrypt(encryptedType);
            }
            if (this.decryptedType === 'news') {
                this.decryptedType = "News";
            } else if (this.decryptedType === 'event') {
                this.decryptedType = "Events";
            } else if (this.decryptedType === 'appeal') {
                this.decryptedType = "Appeal";
            } else if (this.decryptedType === 'video') {
                this.decryptedType = "Video";
            } else {
                this.decryptedType = this.decryptedType
            }
            const data = {
                params: {
                    store_type: this.decryptedType,
                    id: this.decryptedId,
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
    },
    async beforeMount() {
        await this.getTypedSanstha();
    }
}
</script>