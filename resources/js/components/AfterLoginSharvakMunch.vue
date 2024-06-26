<template>
    <section class="bg_image" style="padding-bottom: 5rem!important;">
        <div class="container">
            <div class="row main_layout mt-2 pb-2 g-2 m-1">
                <div class="col-lg-3 col-xl-3 col-xxl-3 col-md-3  left_layout"
                    :style="{ 'margin-top': emptyDataMarginTop }">
                    <login-sidebar></login-sidebar>
                </div>
                <div class="col-md-8 col-lg-8 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 col-xxs-12 center_layout px-3"
                    id="center-layout">
                    <div class="login_flow p-2">
                        <div class="card">
                            <nav class="shravak_munch_center_tab">
                                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button class="nav-link active" id="nav-ShravakMunchAll-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-ShravakMunchAll" type="button" role="tab"
                                        aria-controls="nav-ShravakMunchAll" aria-selected="true">All</button>
                                    <button class="nav-link" id="nav-ShravakMunchEvent-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-ShravakMunchEvent" type="button" role="tab"
                                        aria-controls="nav-ShravakMunchEvent" aria-selected="false">
                                        <img src="images/Events.svg" class="mx-2 shrvak_munch_tab_icons"
                                            alt="...">Event</button>
                                    <button class="nav-link" id="nav-ShravakMunchNews-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-ShravakMunchNews" type="button" role="tab"
                                        aria-controls="nav-ShravakMunchNews" aria-selected="false">
                                        <img src="images/news.svg" class="mx-2 shrvak_munch_tab_icons"
                                            alt="...">News</button>
                                    <button class="nav-link" id="nav-ShravakMunchVideo-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-ShravakMunchVideo" type="button" role="tab"
                                        aria-controls="nav-ShravakMunchVideo" aria-selected="false">
                                        <img src="images/login_video.svg" class="shrvak_munch_tab_icons mx-2"
                                            alt="...">Video</button>
                                </div>
                            </nav>
                        </div>
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-ShravakMunchAll" role="tabpanel"
                                aria-labelledby="nav-ShravakMunchAll-tab">
                                <div class="row g-3 pb-3 mt-1" v-for="(res, index) in sharvakPost" :key="index">
                                    <div class="col-md-12 col-xxl-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                                        <div class="card h-100 p-2 inner_login_cards">
                                            <div class="ribbon-wrapper">
                                                <div :class="{ 'card-badge-appeal': res.type === 'Appeal', 'card-badge-event': res.type === 'Event', 'card-badge-news': res.type === 'News' }" :id="res.type">
                                                    <template v-if="res.type === 'Appeal'">Appeals</template>
                                                    <template v-else-if="res.type === 'Event'">Events</template>
                                                    <template v-else-if="res.type === 'News'">News</template>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="ps-4">

                                                    <img :src="`${res.created_by ? res.created_by.profile_photo[0] ? res.created_by.profile_photo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                         :title="res.created_by ? res.created_by.name : ''" :alt="res.created_by ? res.created_by.name : ''" class="getallimg img-fluid">
                                                    <span class="getallhead"
                                                        :title="res.created_by ? res.created_by.name : ''"
                                                        alt="Organization Title">{{
                        res.created_by ? res.created_by.name : '' }}</span>

                                                </div>
                                            </div>
                                            <a class="read_more_card_full" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal">
                                                <div class="card-body" style="margin-top: -10px;">
                                                    <img class="getallnewsimg card-img-top img-fluid text-center"
                                                        :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :title="res.created_by ? res.created_by.name : ''" :alt="res.created_by ? res.created_by.name : ''">
                                                    <div class=" activity_card_body p-1">
                                                        <label class="card_header ">{{ res.title }}</label>
                                                        <br><label class="card_modal_date pt-3"
                                                            v-if="res.type == 'Event'"><img
                                                                src="images/ic_timer_24px.svg" class="loation_icon me-2"
                                                                alt="...">
                                                            {{ formatDate(res.start_date_and_time) + ' - ' +
                        formatDate1(res.end_date_and_time) }}
                                                        </label>
                                                        <br><label class="card-modal_location py-1"
                                                            v-if="res.type == 'Event'">
                                                            <img src="images/ic_place_24px.svg"
                                                                class="loation_icon me-2" alt="..."> {{ res.location
                                                            }}</label>
                                                    </div>
                                                    <a class="read_more1 " data-bs-toggle="modal"
                                                        data-bs-target="#myNewzModal"
                                                        @click="getData(res.id, res.type)">Read More</a>
                                                </div>
                                            </a>

                                            <div class="card-footer border-0 bg-white activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center like_div">
                                                            <img :src="getImageUrl(res)"
                                                                @click="manageLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                class="footer_img" alt="...">
                                                            <br><span class="icon_font">{{ total_count > 0 ? total_count
                        : res.total_like == null ? 0 :
                            res.total_like }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center save_div">
                                                            <img :src="getSaveImageUrl(res)"
                                                                @click="manageSave(res, res.type, res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
                                                                class="footer_img" alt="...">
                                                            <br>
                                                            <!-- <span  class="icon_font">Save Post</span> -->
                                                            <span
                                                                v-if="res?.get_user_save_post?.is_save == 1"
                                                                class="icon_font">Saved
                                                                Post</span>
                                                            <span v-else class="icon_font">Save Post</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center view_div">
                                                            <img src="images/ic_visibility_24px.svg"
                                                                class="footer_img_view" alt="...">
                                                            <br><span class="icon_font">{{ res.total_view == null ? 0 :
                        res.total_view }}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                        <div class=" text-center share_div" >
                                                            <img src="images/Logo-WhatsApp@2x.png"
                                                                class="footer_img footer_img_share" alt="...">
                                                            <br><span class="icon_font">Share</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <label class="post_uploaded_label px-4">{{ formatTimeAgo(res.created_at) }}</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 col-xxs-12 d-xs-block d-sm-block d-md-block d-lg-block d-xl-none d-xxl-none d-xxxl-none"
                                        v-if="shouldRenderLoginEventSidebar && index === 4">
                                        <login-eventsidebar></login-eventsidebar>
                                    </div>
                                </div>
                                <infinite-loading @distance="1" @infinite="getAllSharvakPost"></infinite-loading>
                            </div>
                            <div class="tab-pane fade" id="nav-ShravakMunchEvent" role="tabpanel"
                                aria-labelledby="nav-ShravakMunchEvent-tab">
                                <div class="row g-4 pb-3 mt-1">
                                    <div class="col-md-12 col-xxl-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12"
                                        v-if="sharvakEventPost != ''" v-for='(res, index) in sharvakEventPost'>
                                        <div class="card h-100 p-2 inner_login_cards">
                                            <div class="ribbon-wrapper">
                                                <div class="card-badge-event">{{ res.type }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="ps-4">

                                                    <img :src="`${res.created_by ? res.created_by.profile_photo[0] ? res.created_by.profile_photo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                    :title="res.created_by ? res.created_by.name : ''" :alt="res.created_by ? res.created_by.name : ''"  class="getallimg img-fluid">
                                                    <span class="getallhead"
                                                        :title="res.created_by ? res.created_by.name : ''"
                                                        alt="Organization Title">{{ res.created_by ? res.created_by.name
                        : '' }}</span>

                                                </div>
                                            </div>
                                            <a class="read_more_card_full" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal">
                                                <div class="card-body" style="margin-top: -10px;">
                                                    <img class="getallnewsimg card-img-top img-fluid text-center"
                                                        :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :title="res.created_by ? res.created_by.name : ''" :alt="res.created_by ? res.created_by.name : ''">
                                                    <div class="activity_card_body p-1">
                                                        <label class="card_header">{{ res.title }}</label>
                                                        <br><label class="card_modal_date pt-3"
                                                            v-if="res.type == 'Events'">
                                                            <img src="images/ic_timer_24px.svg"
                                                                class="loation_icon me-2" alt="...">{{
                        formatDate(res.start_date_and_time) + ' - ' +
                        formatDate1(res.end_date_and_time)
                    }}</label>
                                                        <!-- <br><label class="card_modal_time px-2   mx-3">04:00pm  to 07:00pm</label> -->
                                                        <br><label class="card-modal_location py-1"
                                                            v-if="res.type == 'Events'">
                                                            <img src="images/ic_place_24px.svg"
                                                                class="loation_icon me-2" alt="..."> {{ res.location
                                                            }}</label>
                                                    </div>
                                                    <a class="read_more1 " data-bs-toggle="modal"
                                                        data-bs-target="#myNewzModal"
                                                        @click="getData(res.id, res.type)">Read More</a>
                                                </div>
                                            </a>


                                            <div class="card-footer border-0 bg-white activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center like_div" >
                                                            <img :src="getImageUrl(res)"
                                                                @click="manageEventLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                class="footer_img" alt="...">
                                                            <br><span class="icon_font">{{ total_count > 0 ? total_count
                        : res.total_like == null ?
                            0 : res.total_like }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center save_div" >
                                                            <img :src="getSaveImageUrl(res)"
                                                                @click="manageEventSave(res, res.type, res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
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
                                                            <img src="images/ic_visibility_24px.svg"
                                                                class="footer_img_view" alt="...">
                                                            <br><span class="icon_font">{{ res.total_view == null ? 0 : res.total_view }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class=" text-center share_div">
                                                            <a class="view_all_latestact">
                                                                <img src="images/Logo-WhatsApp@2x.png" class="footer_img footer_img_share" alt="...">
                                                                <br><span class="icon_font">Share</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <label class="post_uploaded_label px-4">{{ formatTimeAgo(res.created_at) }}</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12 col-xxl-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12" v-else>
                                        <p>{{ this.message }}</p>
                                    </div>
                                    <infinite-loading @distance="1" @infinite="getSharvakEventPost"></infinite-loading>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="nav-ShravakMunchNews" role="tabpanel"
                                aria-labelledby="nav-ShravakMunchNews-tab">
                                <div class="row g-4 pb-3 mt-1">
                                    <div class="col-md-12 col-xxl-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12"
                                        v-if="sharvakNewsPost != ''" v-for='(res, index) in sharvakNewsPost'>
                                        <div class="card h-100 p-2 inner_login_cards">
                                            <div class="ribbon-wrapper">
                                                <div class="card-badge-news">{{ res.type }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="ps-4">

                                                    <img :src="`${res.created_by ? res.created_by.profile_photo[0] ? res.created_by.profile_photo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                    :title="res.created_by ? res.created_by.name : ''" :alt="res.created_by ? res.created_by.name : ''" class="getallimg img-fluid">
                                                    <span class="getallhead"
                                                        :title="res.created_by ? res.created_by.name : ''"
                                                        alt="Organization Title">{{ res.created_by ?
                        res.created_by.name : '' }}</span>

                                                </div>
                                            </div>
                                            <a class="read_more_card_full" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal">
                                                <div class="card-body" style="margin-top: -10px;">
                                                    <img class="getallnewsimg card-img-top img-fluid text-center"
                                                        :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :title="res.created_by ? res.created_by.name : ''" :alt="res.created_by ? res.created_by.name : ''">
                                                    <div class="activity_card_body p-1">
                                                        <label class="card_header">{{ res.title }}</label>
                                                    </div>
                                                    <a class="read_more1 " data-bs-toggle="modal"
                                                        data-bs-target="#myNewzModal"
                                                        @click="getData(res.id, res.type)">Read More</a>
                                                </div>
                                            </a>

                                            <div class="card-footer border-0 bg-white activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center like_div">
                                                            <img :src="getImageUrl(res)"
                                                                @click="manageNewsLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                class="footer_img" alt="...">
                                                            <br><span class="icon_font">{{ total_count > 0 ?
                        total_count : res.total_like == null ? 0
                            : res.total_like }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center save_div">
                                                            <img :src="getSaveImageUrl(res)"
                                                                @click="manageNewsSave(res, res.type, res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
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
                                                        <div class="text-center view_div">
                                                            <img src="images/ic_visibility_24px.svg"
                                                                class="footer_img_view" alt="...">
                                                            <br><span class="icon_font">{{ res.total_view == null ? 0 : res.total_view }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class=" text-center share_div">
                                                            <a class="view_all_latestact">
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
                                    <div class="col-md-12 col-xxl-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12" v-else>
                                        <p>{{ this.message }}</p>
                                    </div>
                                    <infinite-loading @distance="1" @infinite="getSharvakNewsPost"></infinite-loading>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="nav-ShravakMunchVideo" role="tabpanel"
                                aria-labelledby="nav-ShravakMunchVideo-tab">
                                <div class="row g-4 pb-3 mt-1">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
                                        v-for='(res, index) in sharvakVideoPost'>
                                        <div class="card h-9 p-2 inner_login_cards">
                                            <div class="ribbon-wrapper">
                                                <div class="card-badge-video">{{ res.type }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="ps-4">
                                                    <img :src="`${res.created_by ? res.created_by.profile_photo[0] ? res.created_by.profile_photo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                    :title="res.created_by ? res.created_by.name : ''" :alt="res.created_by ? res.created_by.name : ''" class="getallimg img-fluid">
                                                    <span class="getallhead"
                                                        :title="res.created_by ? res.created_by.name : ''"
                                                        alt="Organization Title">{{ res.created_by ? res.created_by.name : '' }}</span>
                                                </div>
                                            </div>
                                            <a class="read_more_card_full" data-bs-toggle="modal"
                                                data-bs-target="#myVideoModal">
                                                <div class="card-body">
                                                    <div
                                                        v-if="res.banner ? res.banner[0] ? isImage(res.banner[0].original_url) : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'">
                                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                                            class="getallnewsimg card-img-top img-fluid m-1 text-center"
                                                            :title="res.created_by ? res.created_by.name : ''" :alt="res.created_by ? res.created_by.name : ''">
                                                    </div>
                                                    <div v-else>
                                                        <video controls
                                                            class="card-img-top m-1 getallnewsvideo card-img-top img-fluid m-1 text-center"  :title="res.created_by ? res.created_by.name : ''" :alt="res.created_by ? res.created_by.name : ''">
                                                            <source
                                                                :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                                                type="video/mp4">
                                                        </video>
                                                    </div>
                                                    <div class="activity_card_body p-1">
                                                        <label class="card_header">{{ res.title }}</label>
                                                        <br><img src="images/ic_place_24px.svg"
                                                            class="loation_icon me-2" alt="...">{{ res.location
                                                        }}
                                                    </div>
                                                    <a class="read_more1 " data-bs-toggle="modal"
                                                        data-bs-target="#myVideoModal"
                                                        @click="getData(res.id, res.type)">Read More</a>
                                                </div>
                                            </a>
                                            <div class="card-footer border-0 bg-white activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center like_div">
                                                            <img :src="getImageUrl(res)"
                                                                @click="manageVideoLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                class="footer_img" alt="...">
                                                            <br><span class="icon_font">{{ total_count > 0 ?
                        total_count : res.total_like == null ? 0
                            : res.total_like }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center save_div" >
                                                            <img :src="getSaveImageUrl(res)"
                                                                @click="manageVideoSave(res, res.type, res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
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
                                                        <div class="text-center view_div">
                                                            <img src="images/ic_visibility_24px.svg"
                                                                class="footer_img_view" alt="...">
                                                            <br><span class="icon_font">{{ res.total_view == null ? 0 : res.total_view }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class=" text-center share_div">
                                                            <a class="view_all_latestact">
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
                                    <infinite-loading @distance="1" @infinite="getSharvakVideoPost"></infinite-loading>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-5 col-lg-3 col-xl-3 col-xxl-3 right_layout scroll_bar_login1 d-none d-xl-block d-xxl-block d-xxxl-block"
                    :style="{ 'margin-top': emptyRightMraginTop }" id="right-layout">
                    <login-eventsidebar></login-eventsidebar>
                </div>
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
                                <div class="swiper slider swiperShravakImg" v-if="img.length > 0">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in img" :key="index"
                                            v-show="index === selectedImageIndex" class="swiper-slide">
                                            <img :src="res.original_url ? res.original_url : 'images/jd_card_logo.png'"
                                                class="image_slider img-fluid"  :title="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''" :alt="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''">
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="swiper slider swiperShravakImg">
                                    <img src='/images/jd_card_logo.png' class="image_slider img-fluid"  :title="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''" :alt="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''">
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-2 m-1" v-if="img.length > 0">Gallery</label>
                                <div class="swiper thumbnail thumbnailShravakImg">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in  img" :key="index" class="swiper-slide">
                                            <img :src="res.original_url" alt="..." class="image_slider_down img-fluid"
                                                @click="selectImage(index)">
                                        </div>
                                    </div>
                                    <div class="next_div" v-if="img.length > 3" @click="nextSlideShravakImg"><i
                                            class="bi bi-chevron-right"></i></div>
                                    <div class="prev_div" v-if="img.length > 3" @click="prevSlideShravakImg"><i
                                            class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-auto g-0">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <img :src="`${dash_sanstha.created_by ? dash_sanstha.created_by.profile_photo[0] ? dash_sanstha.created_by.profile_photo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                        class="modal_card_head_img"  :title="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''" :alt="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''">
                                                </div>
                                                <div class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                    <label
                                                        class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                        :title="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''" >{{ dash_sanstha.created_by ?
                        dash_sanstha.created_by.name : '' }}</label>
                                                </div>
                                                <div
                                                    class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4 ms-auto">
                                                    <button class="btn btn_following btn_following_modal"
                                                        @click="manageFollowMore()" type="submit"><img
                                                            :src="getFollowImageMore()" class="flw_btn_img"
                                                            alt="..."></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body p-2">
                                            <label class="card_modal_body-title px-2">{{ dash_sanstha.title }}</label>
                                            <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': img.length > 0 }">
                                                <p class="card_modal_body_details p-2" v-html="dash_sanstha.detail"></p>
                                                <label v-if="dash_sanstha.type == 'Events'" class="card_modal_date p-2">
                                                <img src="/images/ic_timer_24px.svg" class="location_icon mx-2"
                                                    alt="...">
                                                {{ formatDate(dash_sanstha.start_date_and_time) + ' - ' +
                        formatDate1(dash_sanstha.end_date_and_time) }}
                                            </label><br>
                                            <label v-if="dash_sanstha.type == 'Events'"
                                                class="card-modal_location p-2 ">{{
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
                        dash_sanstha.total_like == null ? 0 : dash_sanstha.total_like }}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <a class="view_all_latestact">
                                                            <img :src="getSaveImageMore()" @click="manageSaveMore()"
                                                                class="footer_img" alt="...">
                                                            <br>
                                                        <span  class="icon_font">Save Post</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img src="/images/ic_visibility_24px.svg"
                                                            class="footer_img_view" alt="...">
                                                        <br><span class="icon_font ">{{ dash_sanstha.total_view == null
                        ? 0 : dash_sanstha.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class=" text-center">
                                                        <a class="view_all_latestact">
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
        <div class="modal" id="myVideoModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="bi bi-x-lg"></i></button>
                    <div class="modal-body" style="padding-bottom: 0%;">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                <div class="swiper slider swiperShravakVideo" v-if="img.length > 0">
                                    <div class="swiper-wrapper" v-for="(res, index) in img" :key="index"
                                        v-if="index === selectedImageIndex">
                                        <video controls :src="res.original_url"
                                            class="video_slider image_slider img-fluid"  :title="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''" :alt="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''">
                                        </video>
                                    </div>
                                </div>
                                <div class="swiper slide" v-else>
                                    <embed src="/images/jd_card_logo.png"  class="image_slider img-fluid"  :title="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''" :alt="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''">
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-2 m-1" v-if="img.length > 0">Gallery</label>
                                <div class="swiper thumbnail thumbnailShravakVideo">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in img" :key="index" class="swiper-slide">
                                            <video controls :src="res.original_url"
                                                class="image_slider_down img-fluid video_slider"
                                                @click="selectImage(index)">
                                            </video>
                                        </div>

                                    </div>
                                    <div class="next_div" v-if="img.length > 3" @click="nextSlideShravakVideo"><i
                                            class="bi bi-chevron-right"></i></div>
                                    <div class="prev_div" v-if="img.length > 3" @click="prevSlideShravakVideo"><i
                                            class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-auto g-0">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <img :src="`${dash_sanstha.created_by ? dash_sanstha.created_by.profile_photo[0] ? dash_sanstha.created_by.profile_photo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                        class="modal_card_head_img"  :title="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''" :alt="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''">
                                                </div>
                                                <div class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                    <label
                                                        class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                        :title="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''" :alt="dash_sanstha.created_by ? dash_sanstha.created_by.name : ''">{{ dash_sanstha.created_by ?
                        dash_sanstha.created_by.name : '' }}</label>
                                                </div>
                                                <div
                                                    class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4 ms-auto ">
                                                    <button class="btn btn_following btn_following_modal"
                                                        @click="manageFollowMore()" type="submit"><img
                                                            :src="getFollowImageMore()" class="flw_btn_img"
                                                            alt="..."></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body p-2">
                                            <label class="card_modal_body-title px-2">{{ dash_sanstha.title }}</label>
                                            <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': img.length > 0 }">
                                                <p class="card_modal_body_details p-2" v-html="dash_sanstha.detail"></p>
                                                <label v-if="dash_sanstha.type == 'Events'" class="card_modal_date p-2">
                                                <img src="/images/ic_timer_24px.svg" class="location_icon mx-2"
                                                    alt="...">
                                                {{ formatDate(dash_sanstha.start_date_and_time) + ' - ' +
                                                formatDate1(dash_sanstha.end_date_and_time) }}
                                            </label><br>
                                            <label v-if="dash_sanstha.type == 'Events'"
                                                class="card-modal_location p-2 ">{{
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
                                                            <br>
                                                        <span  class="icon_font">Save Post</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img src="/images/ic_visibility_24px.svg"
                                                            class="footer_img_view" alt="...">
                                                        <br><span class="icon_font ">{{ dash_sanstha.total_view == null
                                                            ? 0 : dash_sanstha.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class=" text-center">
                                                        <a class="view_all_latestact">
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
    </section>
</template>

<script>
import sharvakMunchService from "../../services/sharvakmunch.service"
import { handleLike, handleSave } from '../../common/common';
import sansthaDetailService from '../../services/sansthaDetail.service';
import { initializeThumbnailShravakImg , initializeSliderShravakImg , initializeThumbnailShravakVideo , initializeSliderVideo, initializeSliderShravakVideo } from "../../utils/swiper";
import moment from 'moment';
export default {
    name: "App",
    data() {
        return {
            dash_sanstha: [], img: '', selectedImageIndex: 0, org_logo: '', resExType: '', org_title: '', location: '', total_count: '',
            emptyDataMarginTop: '132px', emptyRightMraginTop: '132px', page: 1, sharvakPost: [], news_page: 1, sharvakNewsPost: [], total_count: '',
            event_page: 1, sharvakEventPost: [], video_page: 1, sharvakVideoPost: [],
        };
    },
    created() {
        if (this.sharvakNewsPost.length === 0) {
            this.getSharvakNewsPost();
        }
        if (this.sharvakEventPost.length === 0) {
            this.getSharvakEventPost();
        }
        if (this.sharvakVideoPost.length === 0) {
            this.getSharvakVideoPost();
        }
    },
    mounted() {
        const thumbnailShravakImg = initializeThumbnailShravakImg();
        initializeSliderShravakImg(thumbnailShravakImg);
        const thumbnailShravakVideo = initializeThumbnailShravakVideo();
        initializeSliderShravakVideo(thumbnailShravakVideo);
    },
    methods: {
        formatTimeAgo(date) {
            return moment(date).fromNow();
        },
        btoa(input) {
            return btoa(input);
        },
        selectImage(index) {
            this.selectedImageIndex = index;
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
            const newsIndex = this.sharvakPost.findIndex(all => all.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                this.$set(this.sharvakPost[newsIndex], 'total_like', newLikeCount); // Update total_like
                if (this.sharvakPost[newsIndex].get_user_likes) {
                    this.$set(this.sharvakPost[newsIndex].get_user_like, 'is_like', newIsLike);
                } else {
                    this.$set(this.sharvakPost[newsIndex], 'get_user_like', { is_like: newIsLike });
                }
            }
            if (this.resExType == "News") {
                const newsIndex = this.sharvakNewsPost.findIndex(news => news.id === this.dash_sanstha.id);
                if (newsIndex !== -1) {
                    this.$set(this.sharvakNewsPost[newsIndex], 'total_like', newLikeCount); // Update total_like
                    if (this.sharvakNewsPost[newsIndex].get_user_likes) {
                        this.$set(this.sharvakNewsPost[newsIndex].get_user_like, 'is_like', newIsLike);
                    } else {
                        this.$set(this.sharvakNewsPost[newsIndex], 'get_user_like', { is_like: newIsLike });
                    }
                }
            } else if (this.resExType == "Events") {
                const newsIndex = this.sharvakEventPost.findIndex(event => event.id === this.dash_sanstha.id);
                if (newsIndex !== -1) {
                    this.$set(this.sharvakEventPost[newsIndex], 'total_like', newLikeCount); // Update total_like
                    if (this.sharvakEventPost[newsIndex].get_user_likes) {
                        this.$set(this.sharvakEventPost[newsIndex].get_user_like, 'is_like', newIsLike);
                    } else {
                        this.$set(this.sharvakEventPost[newsIndex], 'get_user_like', { is_like: newIsLike });
                    }
                }
            } else if (this.resExType == "Appeal") {
                const newsIndex = this.sharvakAppealPost.findIndex(appeal => appeal.id === this.dash_sanstha.id);
                if (newsIndex !== -1) {
                    this.$set(this.sharvakAppealPost[newsIndex], 'total_like', newLikeCount); // Update total_like
                    if (this.sharvakAppealPost[newsIndex].get_user_likes) {
                        this.$set(this.sharvakAppealPost[newsIndex].get_user_like, 'is_like', newIsLike);
                    } else {
                        this.$set(this.sharvakAppealPost[newsIndex], 'get_user_like', { is_like: newIsLike });
                    }
                }
            } else if (this.resExType == "Video") {
                const newsIndex = this.sharvakVideoPost.findIndex(video => video.id === this.dash_sanstha.id);
                if (newsIndex !== -1) {
                    this.$set(this.sharvakVideoPost[newsIndex], 'total_like', newLikeCount); // Update total_like
                    if (this.sharvakVideoPost[newsIndex].get_user_likes) {
                        this.$set(this.sharvakVideoPost[newsIndex].get_user_like, 'is_like', newIsLike);
                    } else {
                        this.$set(this.sharvakVideoPost[newsIndex], 'get_user_like', { is_like: newIsLike });
                    }
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
            const newsIndex = this.sharvakPost.findIndex(all => all.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.sharvakPost[newsIndex].get_user_save_posts) {
                    this.$set(this.sharvakPost[newsIndex].get_user_save_post, 'is_save', newIsSave);
                } else {
                    this.$set(this.sharvakPost[newsIndex], 'get_user_save_post', { is_save: newIsSave });
                }
            }
            if (this.resExType == "News") {
                const newsIndex = this.sharvakNewsPost.findIndex(news => news.id === this.dash_sanstha.id);
                if (newsIndex !== -1) {
                    if (this.sharvakNewsPost[newsIndex].get_user_save_posts) {
                        this.$set(this.sharvakNewsPost[newsIndex].get_user_save_post, 'is_save', newIsSave);
                    } else {
                        this.$set(this.sharvakNewsPost[newsIndex], 'get_user_save_post', { is_save: newIsSave });
                    }
                }
            } else if (this.resExType == "Events") {
                const newsIndex = this.sharvakEventPost.findIndex(event => event.id === this.dash_sanstha.id);
                if (newsIndex !== -1) {
                    if (this.sharvakEventPost[newsIndex].get_user_save_posts) {
                        this.$set(this.sharvakEventPost[newsIndex].get_user_save_post, 'is_save', newIsSave);
                    } else {
                        this.$set(this.sharvakEventPost[newsIndex], 'get_user_save_post', { is_save: newIsSave });
                    }
                }
            } else if (this.resExType == "Appeal") {
                const newsIndex = this.sharvakAppealPost.findIndex(appeal => appeal.id === this.dash_sanstha.id);
                if (newsIndex !== -1) {
                    if (this.sharvakAppealPost[newsIndex].get_user_save_posts) {
                        this.$set(this.sharvakAppealPost[newsIndex].get_user_save_post, 'is_save', newIsSave);
                    } else {
                        this.$set(this.sharvakAppealPost[newsIndex], 'get_user_save_post', { is_save: newIsSave });
                    }
                }
            } else if (this.resExType == "Video") {
                const newsIndex = this.sharvakVideoPost.findIndex(video => video.id === this.dash_sanstha.id);
                if (newsIndex !== -1) {
                    if (this.sharvakVideoPost[newsIndex].get_user_save_posts) {
                        this.$set(this.sharvakVideoPost[newsIndex].get_user_save_post, 'is_save', newIsSave);
                    } else {
                        this.$set(this.sharvakVideoPost[newsIndex], 'get_user_save_post', { is_save: newIsSave });
                    }
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
            const newsIndex = this.sharvakPost.findIndex(all => all.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.sharvakPost[newsIndex].get_user_org_follows) {
                    this.$set(this.sharvakPost[newsIndex].get_user_org_follows, 'is_follow', newIsFollow);
                } else {
                    this.$set(this.sharvakPost[newsIndex], 'get_user_org_follows', { is_follow: newIsFollow });
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
        nextSlideShravakImg() {
            const thumbnailShravakImg = document.querySelector('.thumbnailShravakImg').swiper;
            thumbnailShravakImg.slideNext();
        },
        prevSlideShravakImg() {
            const thumbnailShravakImg = document.querySelector('.thumbnailShravakImg').swiper;
            thumbnailShravakImg.slidePrev();
        },
        nextSlideShravakVideo() {
            const thumbnailShravakVideo = document.querySelector('.thumbnailShravakVideo').swiper;
            thumbnailShravakVideo.slideNext();
        },
        prevSlideShravakVideo() {
            const thumbnailShravakVideo = document.querySelector('.thumbnailShravakVideo').swiper;
            thumbnailShravakVideo.slidePrev();
        },
        getData(resId, resType) {
            this.about_id = resId
            if (resType === 'News') {
                this.resExType = "News";
            } else if (resType === 'Event') {
                this.resExType = "Events";
            } else if (resType === 'Appeal') {
                this.resExType = "Appeal";
            } else if (resType === 'Video') {
                this.resExType = "Video";
            } else {
                this.resExType = null;
            }
            if (this.about_id && this.resExType) {
                this.getTypedSanstha();
            }
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
        isImage(url) {
            return /\.(jpeg|jpg|png)$/i.test(url);
        },
        isVideo(url) {
            return /\.(mp4)$/i.test(url);
        },
        nextSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slideNext();
        },
        prevSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slidePrev();
        },
        handleTopPosition() {
            this.emptyDataMarginTop = this.allSanstha.length === 0 ? '132px' : 'initial';
            this.emptyRightMraginTop = this.allSanstha.length === 0 ? '132px' : 'initial';
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
        async getAllSharvakPost($state) {
            const response = await sharvakMunchService.getAllSharvakMunch(this.page)
            if (response.status == 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.sharvakPost.push(value);
                    });
                    $state.loaded();
                    this.page = this.page + 1;
                } else {
                    $state.complete();
                    this.message = "No Data Found";
                }
            } else {
                console.error("something went wrong");
            }
        },
        async getSharvakNewsPost($state) {
            const response = await sharvakMunchService.getNewsSharvakMunch(this.news_page)
            if (response.status == 200 || 201) {
                if (response.data.length > 0) {
                    if (this.news_page === 1) {
                        this.sharvakNewsPost = response.data;
                    } else {
                        this.sharvakNewsPost = this.sharvakNewsPost.concat(response.data);
                    }
                    $state.loaded();
                    this.news_page = this.news_page + 1;
                } else {
                    $state.complete();
                    this.message = "No Data Found";
                }
            } else {
                console.error("something went wrong");
            }
        },
        async getSharvakEventPost($state) {
            const response = await sharvakMunchService.getEventSharvakMunch(this.event_page)
            if (response.status == 200 || 201) {
                if (response.data.length > 0) {
                    if (this.event_page === 1) {
                        this.sharvakEventPost = response.data;
                    } else {
                        this.sharvakEventPost = this.sharvakEventPost.concat(response.data);
                    }
                    $state.loaded();
                    this.event_page = this.event_page + 1;
                } else {
                    $state.complete();
                    this.message = "No Data Found";
                }
            } else {
                console.error("something went wrong");
            }
        },
        async getSharvakVideoPost($state) {
            const response = await sharvakMunchService.getVideoSharvakMunch(this.page)
            if (response.status == 200 || 201) {
                if (response.data.length > 0) {
                    if (this.video_page === 1) {
                        this.sharvakVideoPost = response.data;
                    } else {
                        this.sharvakVideoPost = this.sharvakVideoPost.concat(response.data);
                    }
                    $state.loaded();
                    this.video_page = this.video_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("something went wrong");
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
                ...this.sharvakPost[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.sharvakPost, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageEventLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.sharvakEventPost[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.sharvakEventPost, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageNewsLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.sharvakNewsPost[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.sharvakNewsPost, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageVideoLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.sharvakVideoPost[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.sharvakVideoPost, index, updatedItem);
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
                ...this.sharvakPost[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.sharvakPost, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        async manageEventSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.sharvakEventPost[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.sharvakEventPost, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        async manageNewsSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.sharvakNewsPost[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.sharvakNewsPost, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        async manageVideoSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.sharvakVideoPost[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.sharvakVideoPost, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
    },
    computed: {
        shouldRenderLoginEventSidebar() {
            return this.sharvakPost.length > 5;
        },
    },
    beforeMount() {
        this.handleTopPosition();
    },
};
</script>
