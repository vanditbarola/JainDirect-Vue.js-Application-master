<template>
    <section class="bg_detailed_page">
        <postHeader></postHeader>
        <section class="indi_imgtop mt-lg-4 mt-md-4 mt-sm-4 mt-xs-4 pt-5 mt-1"
            :style="{ backgroundImage: `url(${get_sanstha.banner ? get_sanstha.banner[0] ? get_sanstha.banner[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'})` }">
            <div class="Sanstha_org_home_head1">
                <div class="container">
                    <div class="d-flex sanstha_d_flex">
                        <div>
                            <img :src="`${get_sanstha.logo ? get_sanstha.logo[0] ? get_sanstha.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                alt="" class="Sanstha_org_home_head_img">
                        </div>
                        <div class="ms-4 mb-2">
                            <div class="row mt-1 mb-1">
                                <label class="Sanstha_org_home_head_title">{{ get_sanstha.title }}</label>
                            </div>
                            <div class="row d-flex ">
                                <label class="Sanstha_org_home_head_stats_box text-center p-1 mx-1">
                                    <span class="Sanstha_org_home_head_stats_counts">{{ get_sanstha.total_members !==
                null ? get_sanstha.total_members : 0 }}</span>
                                    <span class="Sanstha_org_home_head_stats_title">Members</span>
                                </label>
                                <label class="Sanstha_org_home_head_stats_box text-center p-1 mx-1">
                                    <span class="Sanstha_org_home_head_stats_counts">{{ get_sanstha.total_followers !==
                null ? get_sanstha.total_followers : 0 }}</span>
                                    <span class="Sanstha_org_home_head_stats_title">Followers</span>
                                </label>
                                <!-- <label class="Sanstha_org_home_head_stats_box text-center p-1 mx-1">
                                    <span class="Sanstha_org_home_head_stats_counts">{{ get_sanstha.total_following !== null ? get_sanstha.total_following : 0 }}</span>
                                    <span class="Sanstha_org_home_head_stats_title">Following</span>
                                </label> -->
                                <label class="Sanstha_org_home_head_stats_box text-center p-1 mx-1">
                                    <span class="Sanstha_org_home_head_stats_counts">{{ get_sanstha.total_page_view !==
                null ? get_sanstha.total_page_view : 0 }}</span>
                                    <span class="Sanstha_org_home_head_stats_title">Page View</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="sanstahome_tabs">
            <div class="container">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="sanstaabout-tab" data-bs-toggle="tab"
                            data-bs-target="#sanstaabout" type="button" role="tab" aria-controls="sanstaabout"
                            aria-selected="true">
                            <img src="/images/about.svg" class="mx-2" alt="...">About</button>
                    </li>
                    <li class="nav-item" role="presentation" v-if="eventSanstha.length > 0">
                        <button class="nav-link" id="sanstaevent-tab" data-bs-toggle="tab" data-bs-target="#sanstaevent"
                            type="button" role="tab" aria-controls="sanstaevent" aria-selected="false">
                            <img src="/images/Events.svg" class="mx-2" alt="...">Events</button>
                    </li>
                    <li class="nav-item" role="presentation" v-if="newsSanstha.length > 0">
                        <button class="nav-link" id="sanstanews-tab" data-bs-toggle="tab" data-bs-target="#sanstanews"
                            type="button" role="tab" aria-controls="sanstanews" aria-selected="false">
                            <img src="/images/news.svg" class="mx-2" alt="...">News</button>
                    </li>
                    <li class="nav-item" role="presentation" v-if="gallerySanstha.length > 0">
                        <button class="nav-link" id="sanstagallery-tab" data-bs-toggle="tab"
                            data-bs-target="#sanstagallery" type="button" role="tab" aria-controls="sanstagallery"
                            aria-selected="false"><img src="/images/gallery.svg" class="mx-2" alt="...">Gallery</button>
                    </li>
                    <li class="nav-item" role="presentation" v-if="committeeSanstha.length > 0">
                        <button class="nav-link" id="sanstacommitee-tab" data-bs-toggle="tab"
                            data-bs-target="#sanstacommitee" type="button" role="tab" aria-controls="sanstacommitee"
                            aria-selected="false">
                            <img src="/images/commiteee.svg" class="mx-2" alt="...">Committee</button>
                    </li>
                    <div v-if="showMoreTabsDropdown">
                        <b-dropdown text="More" class="sanstha_deatil_more_tab" no-caret
                            v-if="videoSanstha.length > 0 || appealSanstha.length > 0 || cpSanstha.length > 0">
                            <b-dropdown-item id="sanasthaVideo-tab" data-bs-toggle="tab" data-bs-target="#sanasthaVideo"
                                type="button" role="tab" aria-controls="sanasthaVideo" aria-selected="false">
                                <li class="nav-item" role="presentation" v-if="videoSanstha.length > 0">
                                    <button class="nav-link">
                                        <img src="/images/login_video.svg" class="shrvak_munch_tab_icons"
                                            alt="...">Video</button>
                                </li>
                            </b-dropdown-item>
                            <b-dropdown-item id="sanstaAppeal-tab" data-bs-toggle="tab" data-bs-target="#sanstaAppeal"
                                type="button" role="tab" aria-controls="sanstaAppeal" aria-selected="false">
                                <li class="nav-item" role="presentation" v-if="appealSanstha.length > 0">
                                    <button class="nav-link">
                                        <img src="/images/appeal_new_icon.svg" class="sanstha_dashboard_tab_icons"
                                            alt="...">Appeal</button>
                                </li>
                            </b-dropdown-item>
                            <b-dropdown-item id="sanstaCustom-tab" data-bs-toggle="tab" data-bs-target="#sanstaCustom"
                                type="button" role="tab" aria-controls="sanstaCustom" aria-selected="false">
                                <li class="nav-item" role="presentation" v-if="cpSanstha.length > 0">
                                    <button class="nav-link">
                                        <img src="/images/custom_pages.svg" class="sanstha_dashboard_tab_icons"
                                            alt="...">Custom Pages</button>
                                </li>
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <div v-else>
                        <li class="nav-item" role="presentation" v-if="videoSanstha.length > 0">
                            <button class="nav-link" id="sanasthaVideo-tab" data-bs-toggle="tab"
                                data-bs-target="#sanasthaVideo" type="button" role="tab" aria-controls="sanasthaVideo"
                                aria-selected="false">
                                <img src="/images/login_video.svg" class="shrvak_munch_tab_icons"
                                    alt="...">Video</button>
                        </li>
                        <li class="nav-item" role="presentation" v-if="appealSanstha.length > 0">
                            <button class="nav-link" id="sanstaAppeal-tab" data-bs-toggle="tab"
                                data-bs-target="#sanstaAppeal" type="button" role="tab" aria-controls="sanstaAppeal"
                                aria-selected="false">
                                <img src="/images/appeal_icon.svg" class="sanstha_dashboard_tab_icons"
                                    alt="...">Appeal</button>
                        </li>
                        <li class="nav-item" role="presentation" v-if="cpSanstha.length > 0">
                            <button class="nav-link" id="sanstaCustom-tab" data-bs-toggle="tab"
                                data-bs-target="#sanstaCustom" type="button" role="tab" aria-controls="sanstaCustom"
                                aria-selected="false">
                                <img src="/images/custom_pages.svg" class="sanstha_dashboard_tab_icons" alt="...">Custom
                                Pages</button>
                        </li>
                    </div>
                </ul>
            </div>
        </section>

        <section class="bg_santha_home">
            <div class="tab-content pb-2" id="myTabContent">
                <div class="tab-pane fade show active" id="sanstaabout" role="tabpanel"
                    aria-labelledby="sanstaabout-tab">
                    <div class="container section mb-5 pb-5">
                        <div class="row g-3">
                            <div class="col-lg-9 col-xl-9 col-md-7 col-xxl-9 col-sm-12 col-xs-12 ">
                                <lightBox> </lightBox>
                                <section id="about1">
                                    <div class="card p-2 mt-3 aboutdetalbg " >
                                        <div class="indi_about p-2" v-if="get_sanstha.about">
                                            <label class="section_sub_header">About</label>
                                            <!-- <a class="float-end ori_text"><i class="bi bi-translate m-1"
                                                    style="font-size: 18px;"></i>Show Original Text</a> -->
                                        </div>
                                        <label class="about_about px-2" v-html="get_sanstha.about"></label>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12">
                                                <div class="event_location">
                                                    <label class="loc"><i class="bi bi-geo-alt-fill m-1"
                                                            style="font-size:20px; color:grey;"></i>
                                                        {{ get_sanstha.location + ',' }} {{ get_sanstha.cities ?
                get_sanstha.cities.name : "" }} {{ get_sanstha.states ?
                get_sanstha.states.name : "" + ',' }} {{ get_sanstha.pincode
                                                        }}</label>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xs-7 col-sm-7 col-md-7 col-lg-10 col-xl-10 col-xxl-10">
                                                    <div class="mx-2">
                                                        <img class="img_visit"
                                                            :src="get_sanstha.topic_type ? get_sanstha.topic_type.media ? get_sanstha.topic_type.media[0] ? get_sanstha.topic_type.media[0].original_url : '/images/museum.png' : '/images/museum.png' : '/images/museum.png'"
                                                            alt="..."><label class="visit_place m-2">{{
                get_sanstha.topic_type.title }}</label>
                                                    </div>
                                                    <div class="mx-2">
                                                        <img class="img_visit"
                                                            :src="get_sanstha.get_organisation_type ? get_sanstha.get_organisation_type.banner ? get_sanstha.get_organisation_type.banner[0] ? get_sanstha.get_organisation_type.banner[0].original_url : '/images/museum.png' : '/images/museum.png' : '/images/museum.png'"
                                                            alt="..."><label class="visit_place m-2">{{
                get_sanstha.get_organisation_type.title }}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <!-- news section -->
                                <section v-show="newsSanstha.length > 0" class="mt-3 "
                                    id="latestnews">
                                    <div class="container p-3 section">
                                        <div class="latest_news">
                                            <label class="section_header p-2">Latest News</label>
                                            <label class="indi_btn p-2" v-show="newsSanstha.length == 0">
                                                <a id="viewAllNewsBtn" @click="goToNewsTab" class="indi_btn"></a>
                                            </label>
                                            <label class="indi_btn p-2" v-show="newsSanstha.length != 0">
                                                <a id="viewAllNewsBtn" @click="goToNewsTab" class="indi_btn">View
                                                    all</a>
                                            </label>
                                        </div>
                                        <postDetailNews v-show="newsSanstha.length > 0"
                                            @news-fetched="handleNewsFetched" @news-id="handleNewsId">
                                        </postDetailNews>
                                    </div>
                                </section>
                                <div v-show="newsSanstha.length === 0">
                                </div>
                                <section v-if="eventSanstha.length > 0" class="mt-3 "
                                    id="events1">
                                    <div class="container p-3 section">
                                        <div class="latest_news">
                                            <label class="section_header p-2">Latest Events</label>
                                            <label class="indi_btn p-2" v-if="eventSanstha.length == 0"><a
                                                    id="viewAllEventsBtn" @click="goToEventsTab"
                                                    class="indi_btn"></a></label>
                                            <label class="indi_btn p-2" v-if="eventSanstha.length != 0"><a
                                                    id="viewAllEventsBtn" @click="goToEventsTab" class="indi_btn">View
                                                    all</a></label>
                                        </div>
                                        <postDetailEvent @events-fetched="handleEventsFetched"
                                            @event-id="handleEventId">
                                        </postDetailEvent>
                                    </div>
                                </section>
                                <div v-else>
                                </div>
                                <!-- <section class="mt-3">
                                    <div class="card p-3 mt-3 g-2 mb-3" style=" box-shadow: 0px 3px 6px #00000029;">
                                        <label class="section_header p-2">Share directly in your groups</label>
                                        <form class="row g-2">
                                            <div
                                                class="col-lg-10 col-md-8 col-xl-10 col-xxl-10 col-sm-12 col-xs-12 act_form">
                                                <div class="form-control link_text" contenteditable="false"
                                                    data-text="Link will be displayed here"></div>
                                            </div>
                                            <div
                                                class="col-lg-2 col-md-3 col-xl-2 col-xxl-2 col-sm-12 col-xs-12 act_form1">
                                                <button type="button" class="copybtn form-control">
                                                    <i class="bi bi-clipboard p-2"
                                                        style="font-size:20px;color:#FE9A36"></i>Copy</button>
                                            </div>
                                        </form>
                                    </div>
                                </section> -->
                            </div>
                            <div class="col-lg-3 col-xl-3 col-md-5 col-xxl-3 col-sm-12 col-xs-12">
                                <postDetailComitee></postDetailComitee>
                                <div v-if="get_sanstha.facebook || get_sanstha.youtube || get_sanstha.instagram"
                                    class="card mt-3 mb-5 pb-2" style=" box-shadow: 0px 3px 6px #00000029;">
                                    <label class="section_sub_header p-2">Follow us on</label>
                                    <div class="row row-cols-3">
                                        <div class="col" v-if="get_sanstha.facebook != null">
                                            <a :href="facebookLink">
                                                <img class="follow mx-3 my-2" src="/images/facebook.png" alt="...">
                                            </a>
                                        </div>
                                        <div class="col" v-if="get_sanstha.youtbue != null">
                                            <a :href="youtubeLink">
                                                <img class="follow mx-3 my-2" src="/images/youtube.png" alt="...">
                                            </a>
                                        </div>
                                        <div class="col" v-if="get_sanstha.instagram != null > 0">
                                            <a :href="instaLink">
                                                <img class="follow mx-3 my-2"
                                                    src="/images/instagram-social-media-icon-gradient-social-media-logo_197792-4682.avif"
                                                    alt="...">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-pane fade" id="sanstaevent" role="tabpanel" aria-labelledby="sanstaevent-tab">
                    <postDetailViewAllEvent @event-allId="handleEventViewAllId"></postDetailViewAllEvent>
                </div>

                <div class="tab-pane fade" id="sanstanews" role="tabpanel" aria-labelledby="sanstanews-tab">
                    <postDetailViewAllNews @news-allId="handleNewsViewAllId"></postDetailViewAllNews>
                </div>

                <div class="tab-pane fade" id="sanstagallery" role="tabpanel" aria-labelledby="sanstagallery-tab">
                    <div class="container mb-5 pb-3">
                        <div v-if="gallerySanstha.length > 0">
                            <postGallery></postGallery>
                        </div>
                        <div v-else class="latest_news p-3 m-1 mt-2  text-center">
                            <label class="text-danger">No Data found !</label>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="sanstacommitee" role="tabpanel" aria-labelledby="sanstacommitee-tab">
                    <div class="container mb-5 pb-3 mt-2">
                       
                            
                                <div v-if="committeeSanstha.length > 0">
                                    <postDetailViewAllComitee></postDetailViewAllComitee>
                                </div>
                                <div v-else class="latest_news p-3 m-1 mt-2  text-center">
                                    <label class="text-danger">No Data found !</label>
                                </div>
                            
                        
                    </div>
                </div>

                <div class="tab-pane fade" id="sanstalibrary" role="tabpanel" aria-labelledby="sanstalibrary-tab">
                    <library></library>
                </div>

                <div class="tab-pane fade" id="sanstaAppeal" role="tabpanel" aria-labelledby="sanstaAppeal-tab">
                    <div v-if="appealSanstha.length > 0">
                        <postAppeal @appeal-id="handleAppealId"></postAppeal>
                    </div>
                    <div v-else class="latest_news p-3 m-1 mt-2  text-center">
                        <label class="text-danger">No Data found !</label>
                    </div>
                </div>

                <div class="tab-pane fade" id="sanasthaVideo" role="tabpanel" aria-labelledby="sanasthaVideo-tab">
                    <div v-if="videoSanstha.length > 0">
                        <postVideo @video-id="handleVideoId"></postVideo>
                    </div>
                    <div v-else class="latest_news p-3 m-1 mt-2  text-center">
                        <label class="text-danger">No Data found !</label>
                    </div>
                </div>

                <div class="tab-pane fade" id="sanstaCustom" role="tabpanel" aria-labelledby="sanstaCustom-tab">
                    <div v-if="cpSanstha.length > 0">
                        <postCustom></postCustom>
                    </div>
                    <div v-else class="latest_news p-3 m-1 mt-2  text-center">
                        <label class="text-danger">No Data found !</label>
                    </div>
                </div>
            </div>

            <div class="modal" id="myNewzModal">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close"><i
                                class="bi bi-x-lg"></i></button>
                        <div class="modal-body" style="padding-bottom: 0%;">
                            <div class="row">
                                <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                    <div v-if="detail_sanstha.banner.length > 0" class="swiper slider">
                                        <div class="swiper-wrapper">
                                            <div v-for="(res, index) in detail_sanstha.banner" :key="index"
                                                v-show="index === selectedImageIndex" class="swiper-slide">
                                                <img :src="res.original_url ? res.original_url : 'images/jd_card_logo.png'"
                                                    class="image_slider img-fluid" :title="org_title" :alt="org_title">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-slider" v-else>
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <img src="/images/jd_card_logo.png" :alt="org_title" :title="org_title"
                                                class="image_slider img-fluid">
                                        </div>
                                    </div>
                                </div>
                                    <div class="dash mt-2 mb-2"></div>
                                    <label class="title_gallery p-3 m-1" v-show="detail_sanstha.banner.length > 0">Gallery</label>
                                    <div class="swiper thumbnail thumbnailExplore">
                                        <div class="swiper-wrapper">
                                            <div v-for="(res, index) in detail_sanstha.banner" :key="index"
                                                class="swiper-slide">
                                                <img :src="res.original_url" alt="..."
                                                    class="image_slider_down img-fluid" @click="selectImage(index)">
                                            </div>
                                        </div>
                                        <div class="next_div" v-if="detail_sanstha.banner.length > 3"
                                            @click="nextSlideExplore"><i class="bi bi-chevron-right"></i></div>
                                        <div class="prev_div" v-if="detail_sanstha.banner.length > 3"
                                            @click="prevSlideExplore"><i class="bi bi-chevron-left"></i></div>
                                    </div>
                                </div>

                                <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                    <section class="card1">
                                        <div class="card border-0">
                                            <div class="card-head p-2 card_head_modal border-0">
                                                <div class="row row-cols-3 g-0 ">
                                                    <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                        <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                            class="modal_card_head_img":title="org_title" :alt="org_title">
                                                    </div>
                                                    <div
                                                        class="col col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                        <label
                                                            class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                           :title="org_title">{{ org_title }}</label>
                                                    </div>
                                                    <div class="col-md-4 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4  ms-auto">
                                                        <button class="btn btn_following btn_following_modal"
                                                            @click="manageFollowMore()" type="submit">
                                                            <img :src="getFollowImageMore()" class="flw_btn_img"
                                                                alt="..."></button>
                                                    </div>
                                                </div>
                                            </div><!--end of card head-->

                                            <div class="card-body p-2 ">
                                                <label class="card_modal_body-title px-2">{{ detail_sanstha.title }} </label>
                                                <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': detail_sanstha.banner.length > 0 }">
                                                    <p class="card_modal_body_details p-2"
                                                        v-html="detail_sanstha.detail">
                                                    </p>
                                                    <label v-if="forId.type == 'Events'" class="card_modal_date p-2">
                                                    <img src="/images/ic_timer_24px.svg" class="location_icon mx-2"
                                                        alt="...">
                                                    {{ formatDate(detail_sanstha.start_date_and_time) + ' - ' +
                formatDate1(detail_sanstha.end_date_and_time) }}
                                                </label><br>
                                                <label v-if="forId.type == 'Events'" class="card-modal_location p-2 "><img src="/images/ic_place_24px.svg"
                                                    class="loation_icon mx-2 " alt="...">
                                                    {{
                detail_sanstha.location }}</label>
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
                                                        <div class=" text-center">
                                                            <a class="view_all_latestact" :href="`/sharepostcard?id=${btoa(detail_sanstha.id)}&type=${btoa(detail_sanstha.type)}`" @click.prevent="sendToWhatsApp( org_title , `/sharepostcard?id=${btoa(detail_sanstha.id)}&type=${btoa(detail_sanstha.type)}`)" id="share"
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

            
        </section>
    </section>
</template>

<script>
import sansthaDetailService from '../../services/sansthaDetail.service';
import afterLoginHomeService from "../../services/afterLoginHome.service";
import { handleLike, handleSave } from '../../common/common';
import { sendToWhatsApp } from '../../utils/sharefunction.js';
export default {
    name: "App",
    data() {
        return {
            org_logo: '', org_title: '', facebookLink: '', instaLink: '', youtubeLink: '', selectedImageIndex: 0,appeal_page:1,video_page:1,
            committeeSanstha: [], videoSanstha: [], appealSanstha: [], cpSanstha: [], gallerySanstha: [], allGallerySanstha: [], loading: false,cp_page:1,
            detail_sanstha: { banner: [] }, get_sanstha: '', event_page: 1, eventSanstha: [], total_count: '', newsSanstha: [], news_page: 1, message: '', forId: '',
        };
    },
    computed: {
        showMoreTabsDropdown() {
            let dataArrays = [this.newsSanstha, this.eventSanstha, this.appealSanstha, this.videoSanstha, this.gallerySanstha, this.cpSanstha, this.committeeSanstha];
            let dataCount = dataArrays.filter(arr => arr.length > 0).length;
            return dataCount >= 4;
        }
    },
    mounted() {
        const thumbnailExplore = new Swiper('.thumbnailExplore', {
            slidesPerView: 'auto',

        });
        const slider = new Swiper('.slider', {
            loop: true,
            grabCursor: true,
            thumbs: {
                swiper: thumbnailExplore
            },

        });
        document.addEventListener('DOMContentLoaded', function () {
            document.getElementById('viewAllNewsBtn').addEventListener('click', function (e) {
                e.preventDefault();
                var newsTab = new bootstrap.Tab(document.getElementById('sanstanews-tab'));
                newsTab.show();
            });
            document.getElementById('viewAllEventsBtn').addEventListener('click', function (e) {
                e.preventDefault();
                var eventTab = new bootstrap.Tab(document.getElementById('sanstaevent-tab'));
                eventTab.show();
            });
            document.getElementById('viewCommitteBtn').addEventListener('click', function (e) {
                e.preventDefault();
                var committeTab = new bootstrap.Tab(document.getElementById('sanstacommitee-tab'));
                committeTab.show();
            });
        })
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
        async getGalleryBasedSanstha() {
            try {
                const url = window.location.href;
                const lastParam = url.split("/").slice(-1)[0];
                const data = {
                    params: {
                        organisation_id: lastParam
                    }
                };
                const response = await sansthaDetailService.getAboutGallerySanstha({ ...data });
                if (response.status === 200 || response.status === 201) {
                    if (response.data.length > 0) {
                        this.gallerySanstha = response.data;
                        this.$nextTick(() => {
                            this.initSlickSlider();
                        });
                    } else {
                        this.message = 'No Gallary found !';
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        selectImage(index) {
            this.selectedImageIndex = index;
        },
        handleNewsFetched(newsData) {
            this.newsSanstha = newsData;
        },
        handleNewsId(newsId) {
            this.forId = newsId;
            if (this.forId.id) {
                this.getTypedSanstha()
            }
        },
        handleVideoId(videoId) {
            this.forId = videoId;
            if (this.forId.id) {
                this.getTypedSanstha()
            }
        },
        handleNewsViewAllId(newsAllId) {
            this.forId = newsAllId;
            if (this.forId.id) {
                this.getTypedSanstha()
            }
        },
        handleEventViewAllId(newsId) {
            this.forId = newsId;
            if (this.forId.id) {
                this.getTypedSanstha()
            }
        },
        handleAppealId(appealId) {
            this.forId = appealId;
            if (this.forId.id) {
                this.getTypedSanstha()
            }
        },
        handleEventId(eventId) {
            this.forId = eventId;
            if (this.forId.id) {
                this.getTypedSanstha()
            }
        },
        handleEventsFetched(eventsData) {
            this.eventSanstha = eventsData;
        },

        async activate() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getSanstha({ ...data });
            this.get_sanstha = response;
            this.facebookLink = response.facebook
            this.instaLink = response.instagram
            this.youtbueLink = response.youtube

        },
        async getEventsBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllEventSanstha(this.event_page, { ...data });
            if (response.status === 200 || 201) {
                $.each(response.data, (key, value) => {
                    this.eventSanstha.push(value);
                });
                $state.loaded();
                this.event_page = this.event_page + 1;
            } else {
                console.error("Something went wrong")
            }
        },
        async getTypedSanstha() {
            const data = {
                params: {
                    store_type: this.forId.type,
                    id: this.forId.id,
                }
            }
            const response = await sansthaDetailService.getDetailSanstha({ ...data });

            if (response.status === 200 || 201) {
                this.detail_sanstha = response
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
        async getNewsBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllNewsSanstha(this.news_page, { ...data });
            if (response.status === 200 || 201) {
                if (response.data > 0) {
                    $.each(response.data, (key, value) => {
                        this.newsSanstha.push(value);
                    });
                    $state.loaded();
                    this.news_page = this.news_page + 1;
                } else {
                    this.message = "No More Data:)";
                }
            } else {
                console.error("Something went wrong")
            }
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
            let img = newIsLike === 1 ? 'images/ic_favorite_24px.svg' : 'images/ic_unfavorite_24px.svg';

            this.$set(this.detail_sanstha, 'img', img); // Update the image path
            if (this.detail_sanstha.get_user_likes) {
                this.$set(this.detail_sanstha.get_user_likes, 'is_like', newIsLike);
            } else {
                this.$set(this.detail_sanstha, 'get_user_likes', { is_like: newIsLike });
            }
            this.$set(this.detail_sanstha, 'total_like', newLikeCount); // Update total_like
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
        async manageLike1(res, resType, resId, is_like, like_count, index) {
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
        getSaveImageUrl(res) {
            if (res.get_user_save_post == null) {
                return '/images/ic_add_box_24px.svg';
            } else if (res.get_user_save_post.is_save === 1) {
                return '/images/ic_add_fav_box_24px.svg';
            } else {
                return '/images/ic_add_box_24px.svg';
            }
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
        goToNewsTab() {
            const newsTab = document.getElementById('sanstanews-tab');
            if (newsTab) {
                newsTab.click();
            }
        },
        goToEventsTab() {
            const EventTab = document.getElementById('sanstaevent-tab');
            if (EventTab) {
                EventTab.click();
            }
        },
        goToCommitteeTab() {
            const CommiteeTab = document.getElementById('sanstacommitee-tab');
            if (CommiteeTab) {
                CommiteeTab.click();
            }
        },
        nextSlideExplore() {
            const thumbnailExplore = document.querySelector('.thumbnailExplore').swiper;
            thumbnailExplore.slideNext();
        },
        prevSlideExplore() {
            const thumbnailExplore = document.querySelector('.thumbnailExplore').swiper;
            thumbnailExplore.slidePrev();
        },
        async getCommitteeMember() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getCommitteeMember({ ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.committeeSanstha.push(value);
                    });
                } else {
                    console.error("Something went wrong")
                }
            } else {
                console.error("Something went wrong")
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
        async getAppealBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllAppealSanstha(this.appeal_page, { ...data });
            if (response.status === 200 || response.status === 201) {
                if (response.data.length > 0) {
                    $.each(response.data, async (key, value) => {
                        this.appeal_id = value.id;
                        const data = {
                            event_id: '',
                            news_id: '',
                            appeal_id: this.appeal_id,
                            video_id: ''
                        }
                        const response = await afterLoginHomeService.viewEventNews({ ...data })
                        if (response.status === 200 || 201) {
                        } else {
                            console.error("Something went wrong")
                        }
                    });
                    if (this.appeal_page === 1) {
                        this.appealSanstha = response.data;
                    } else {
                        this.appealSanstha = this.appealSanstha.concat(response.data);
                    }
                    $state.loaded();
                    this.appeal_page = this.appeal_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong");
            }
        },
        async getCustomPageBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllCustomPageSanstha(this.cp_page, { ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    if (this.cp_page === 1) {
                        this.cpSanstha = response.data;
                    } else {
                        this.cpSanstha = [...this.cpSanstha, ...response.data];
                    }
                    $state.loaded();
                    this.cp_page = this.cp_page + 1;
                }
                else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
    },
    beforeMount() {
        this.activate();
        this.getEventsBasedSanstha();
        this.getNewsBasedSanstha();
        this.getGalleryBasedSanstha();
        this.getCommitteeMember();
        this.getVideoBasedSanstha();
        this.getAppealBasedSanstha();
        this.getCustomPageBasedSanstha();
        const checkHashAndActivateTab = () => {
            const hash = window.location.hash.substring(1);
            const activeTab = document.getElementById(hash);
            if (activeTab) {
                const tab = new bootstrap.Tab(activeTab);
                tab.show();
            }
        };
        checkHashAndActivateTab();
    }
}
</script>