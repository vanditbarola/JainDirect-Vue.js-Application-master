<template>
    <section class="bg_image" style="padding-bottom: 5rem!important;">
        <div class="container">
            <div class="row main_layout mt-2 pb-2 g-2 m-1">
                <div class="col-md-3 col-lg-3 col-xl-3 col-xxl-3 left_layout"
                    :style="{ 'margin-top': emptyDataMarginTop }">
                    <login-sidebar></login-sidebar>
                </div>
                <div class="col-md-8 col-lg-8 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 col-xxs-12 center_layout px-3"
                    id="center-layout">
                    <div class="login_flow p-2">
                        <div class="card">
                            <nav class="shravak_munch_center_tab_activity">
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
                                    <button class="nav-link" id="nav-ShravakMunchAppeal-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-ShravakMunchAppeal" type="button" role="tab"
                                        aria-controls="nav-ShravakMunchAppeal" aria-selected="false">
                                        <img src="/images/appeal_new_icon.svg" class="shrvak_munch_tab_icons mx-2"
                                            alt="...">Appeal</button>
                                </div>
                            </nav>
                        </div>
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-ShravakMunchAll" role="tabpanel"
                                aria-labelledby="nav-ShravakMunchAll-tab">
                                <div class="row g-3 pb-3 mt-1" v-for='(res, index) in sharvakPost' :key="index">
                                    <div class="col-md-12 col-xxl-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12">
                                        <div class="card h-100 p-2 inner_login_cards">
                                            <div class="ribbon-wrapper">
                                                <div :class="{ 'card-badge-appeal': res.type === 'Appeal', 'card-badge-event': res.type === 'Events', 'card-badge-news': res.type === 'News' }"
                                                    :id="res.type">
                                                    <template v-if="res.type === 'Appeal'">Appeals</template>
                                                    <template v-else-if="res.type === 'Events'">Events</template>
                                                    <template v-else-if="res.type === 'News'">News</template>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="ps-4">
                                                    <a class="view_all_latestact"
                                                        :href="`/sanstha-detail/${res.organization_id}`">
                                                        <!-- <a :href="'postdetailpage/' + res.organization.id " class="view_all_latestact"> -->
                                                        <img :src="`${res.organization ? res.organization.banner[0] ? res.organization.banner[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            :alt="res.organization ? res.organization.title : ''"
                                                            class="getallimg img-fluid">
                                                        <span class="getallhead"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            alt="Organization Title">{{
                        res.organization ?
                            res.organization.title : '' }}</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <a class="read_more_card_full" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal">
                                                <div class="card-body" style="margin-top: -10px;">
                                                    <img class="getallnewsimg card-img-top img-fluid text-center"
                                                        :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :title="res.organization ? res.organization.title : ''"
                                                        :alt="res.organization ? res.organization.title : ''">
                                                    <div class="activity_card_body p-1">
                                                        <label class="card_header">{{ res.title }}</label>
                                                        <p class="section_body" style="margin-bottom: -20px;"
                                                            v-html="res.detail"></p>
                                                        <br><label class="card_modal_date pt-3"
                                                            v-if="res.type == 'Events'">
                                                            <img src="images/ic_timer_24px.svg"
                                                                class="loation_icon me-2" alt="...">
                                                            {{ formatDate(res.start_date_and_time) + ' - ' +
                        formatDate1(res.end_date_and_time) }}
                                                        </label>
                                                        <br><label class="card-modal_location py-1"
                                                            v-if="res.type == 'Events'">
                                                            <img src="images/ic_place_24px.svg"
                                                                class="loation_icon me-2" alt="..."> {{ res.location
                                                            }}</label>
                                                        <br><a class="read_more1 " data-bs-toggle="modal"
                                                            data-bs-target="#myNewzModal"
                                                            @click="getData(res.id, res.type)">Read More...</a>
                                                    </div>
                                                </div>
                                            </a>


                                            <div class="card-footer border-0 bg-white activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center like_div">
                                                            <img :src="getImageUrl(res)"
                                                                @click="manageLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                class="footer_img" id="unLike_fav" alt="...">
                                                            <br><span class="icon_font">{{ res.total_like == null ? 0 :
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
                                                        <div class=" text-center view_div">
                                                            <img src="images/ic_visibility_24px.svg"
                                                                class="footer_img_view" alt="...">
                                                            <br><span class="icon_font">{{ res.total_view == null ?
                        0 : res.total_view }}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                        <div class=" text-center sahre_div">
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
                                        v-if="shouldRenderLoginEventSidebarActivity && index === 4">
                                        <login-eventsidebar></login-eventsidebar>
                                    </div>
                                </div>
                                <infinite-loading @distance="1" @infinite="getAllLatestActivity"></infinite-loading>
                            </div>
                            <div class="tab-pane fade" id="nav-ShravakMunchEvent" role="tabpanel"
                                aria-labelledby="nav-ShravakMunchEvent-tab">
                                <div class="row g-4 pb-3 mt-1">
                                    <div class="col-md-12 col-xxl-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12"
                                        v-for='(res, index) in sharvakEventPost'>
                                        <div class="card h-100 p-2 inner_login_cards">
                                            <div class="ribbon-wrapper">
                                                <div class="card-badge-event">{{ res.type }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="ps-4">
                                                    <a class="view_all_latestact"
                                                        :href="`/sanstha-detail/${res.organization_id}`">
                                                        <img :src="`${res.organization ? res.organization.banner[0] ? res.organization.banner[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            :alt="res.organization ? res.organization.title : ''"
                                                            class="getallimg img-fluid">
                                                        <span class="getallhead"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            alt="Organization Title">{{ res.organization ?
                        res.organization.title : '' }}</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <a class="read_more_card_full" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal">
                                                <div class="card-body" style="margin-top: -10px;">
                                                    <img class="getallnewsimg card-img-top img-fluid text-center"
                                                        :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :title="res.organization ? res.organization.title : ''"
                                                        :alt="res.organization ? res.organization.title : ''">
                                                    <div class="activity_card_body p-1">
                                                        <label class="card_header">{{ res.title }}</label>
                                                        <p class="section_body" style="margin-bottom: -20px;"
                                                            v-html="res.detail"></p>
                                                        <br><label class="card_modal_date pt-3"
                                                            v-if="res.type == 'Events'">
                                                            <img src="images/ic_timer_24px.svg"
                                                                class="loation_icon me-2" alt="...">
                                                            {{ formatDate(res.start_date_and_time) + ' - ' +
                        formatDate1(res.end_date_and_time) }}
                                                        </label>
                                                        <br><label class="card-modal_location py-1"
                                                            v-if="res.type == 'Events'">
                                                            <img src="images/ic_place_24px.svg"
                                                                class="loation_icon me-2" alt="...">{{ res.location
                                                            }}</label>

                                                    </div>
                                                    <a class="read_more1" data-bs-toggle="modal"
                                                        data-bs-target="#myNewzModal">Read
                                                        More</a>
                                                </div>
                                            </a>

                                            <div class="card-footer border-0 bg-white activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center like_div">
                                                            <img :src="getImageUrl(res)"
                                                                @click="manageEventLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                class="footer_img" id="unLike_fav" alt="...">
                                                            <br><span class="icon_font">{{ res.total_like == null ?
                        0 : res.total_like }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center save_div">
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
                                                        <div class="text-center view_div">
                                                            <img src="images/ic_visibility_24px.svg"
                                                                class="footer_img_view" alt="...">
                                                            <br><span class="icon_font">{{ res.total_view == null ?
                        0 : res.total_view }}</span>
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
                                    <infinite-loading @distance="1" @infinite="getSharvakEventPost"></infinite-loading>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="nav-ShravakMunchNews" role="tabpanel"
                                aria-labelledby="nav-ShravakMunchNews-tab">
                                <div class="row g-4 pb-3 mt-1">
                                    <div class="col-md-12 col-xxl-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12"
                                        v-for='(res, index) in sharvakNewsPost'>
                                        <div class="card h-100 p-2 inner_login_cards">
                                            <div class="ribbon-wrapper">
                                                <div class="card-badge-news">{{ res.type }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="ps-4">
                                                    <a class="view_all_latestact"
                                                        :href="`/sanstha-detail/${res.organization_id}`">
                                                        <img :src="`${res.organization ? res.organization.banner[0] ? res.organization.banner[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            :alt="res.organization ? res.organization.title : ''"
                                                            class="getallimg img-fluid">
                                                        <span class="getallhead"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            alt="Organization Title">{{ res.organization ?
                        res.organization.title : '' }}</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <a class="read_more_card_full" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal">
                                                <div class="card-body" style="margin-top: -10px;">
                                                    <img class="getallnewsimg card-img-top img-fluid text-center"
                                                        :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :title="res.organization ? res.organization.title : ''"
                                                        :alt="res.organization ? res.organization.title : ''">

                                                    <div class=" activity_card_body p-1">
                                                        <label class="card_header">{{ res.title }}</label>
                                                        <p class="section_body" style="margin-bottom: -20px;"
                                                            v-html="res.detail"></p>
                                                        <br><label class="card_modal_date pt-3"
                                                            v-if="res.type == 'Events'">
                                                            <img src="images/ic_timer_24px.svg"
                                                                class="loation_icon me-2" alt="...">{{
                        res.start_date_and_time }}</label>
                                                        <br><label class="card-modal_location py-1"
                                                            v-if="res.type == 'Events'">
                                                            <img src="images/ic_place_24px.svg"
                                                                class="loation_icon me-2" alt="..."> {{ res.location
                                                            }}</label>
                                                        <a class="read_more1" data-bs-toggle="modal"
                                                            data-bs-target="#myNewzModal"
                                                            @click="getData(res.id, res.type)">Read
                                                            More</a>
                                                    </div>


                                                </div>
                                            </a>

                                            <div class="card-footer border-0 bg-white activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center like_div">
                                                            <img :src="getImageUrl(res)"
                                                                @click="manageNewsLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                class="footer_img" alt="...">
                                                            <br><span class="icon_font">{{ res.total_like == null ?
                        0 : res.total_like }}</span>
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
                                                            <br><span class="icon_font">{{ res.total_view == null ?
                        0 : res.total_view }}</span>
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
                                    <infinite-loading @distance="1" @infinite="getNewsActivity"></infinite-loading>
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
                                                    <a class="view_all_latestact"
                                                        :href="`/sanstha-detail/${res.organization_id}`">
                                                        <img :src="`${res.organization ? res.organization.banner[0] ? res.organization.banner[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            :alt="res.organization ? res.organization.title : ''"
                                                            class="getallimg img-fluid">
                                                        <span class="getallhead"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            alt="Organization Title">{{ res.organization ?
                        res.organization.title : '' }}</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <a class="read_more_card_full" data-bs-toggle="modal"
                                                data-bs-target="#myVideoModal">
                                                <div class="card-body">
                                                    <div
                                                        v-if="res.banner ? res.banner[0] ? isImage(res.banner[0].original_url) : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'">
                                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                                            class="getallnewsimg card-img-top img-fluid m-1 text-center"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            :alt="res.organization ? res.organization.title : ''">
                                                    </div>
                                                    <div v-else>
                                                        <video controls
                                                            class="card-img-top m-1 getallnewsvideo card-img-top img-fluid m-1 text-center"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            :alt="res.organization ? res.organization.title : ''">
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
                                                    <a class="read_more1" data-bs-toggle="modal"
                                                        data-bs-target="#myVideoModal"
                                                        @click="getData(res.id, res.type)">Read
                                                        More</a>
                                                </div>
                                            </a>

                                            <div class="card-footer border-0 bg-white activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center like_div">
                                                            <img :src="getImageUrl(res)"
                                                                @click="manageVideoLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                class="footer_img" alt="...">
                                                            <br><span class="icon_font">{{ res.total_like == null ?
                        0 : res.total_like }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center save_div">
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
                                                            <br><span class="icon_font">{{ res.total_view == null ?
                        0 : res.total_view }}</span>
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
                                    <infinite-loading @distance="1" @infinite="getSharvakVideoPost"></infinite-loading>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="nav-ShravakMunchAppeal" role="tabpanel"
                                aria-labelledby="nav-ShravakMunchAppeal-tab">
                                <div class="row g-4 pb-3 mt-1">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
                                        v-for='(res, index) in sharvakAppealPost'>
                                        <div class="card h-9 p-2 inner_login_cards">
                                            <div class="ribbon-wrapper">
                                                <div class="card-badge-appeal">{{ res.type }}</div>
                                            </div>
                                            <div class="row">
                                                <div class="ps-4">
                                                    <a class="view_all_latestact"> <a class="view_all_latestact"
                                                            :href="`/sanstha-detail/${res.organization_id}`"></a>
                                                        <img :src="`${res.organization ? res.organization.banner[0] ? res.organization.banner[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            :alt="res.organization ? res.organization.title : ''"
                                                            class="getallimg img-fluid">
                                                        <span class="getallhead"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            alt="Organization Title">{{ res.organization ?
                        res.organization.title : '' }}</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <a class="read_more_card_full" data-bs-toggle="modal"
                                                data-bs-target="#myNewzModal">
                                                <div class="card-body">
                                                    <div class="">
                                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                            :class="{ 'video_tab_img': !res.banner == 'images/jd_card_logo.png' || !res.banner[0], 'video_tab': res.banner && res.banner[0] }"
                                                            :title="res.organization ? res.organization.title : ''"
                                                            :alt="res.organization ? res.organization.title : ''">
                                                    </div>
                                                    <div class="activity_card_body p-1">
                                                        <label class="card_header">{{ res.title }}</label>
                                                        <p class="section_body" style="margin-bottom: -20px;"
                                                            v-html="res.detail"></p>
                                                        <a class="read_more1" data-bs-toggle="modal"
                                                            data-bs-target="#myNewzModal">Read
                                                            More</a>
                                                    </div>

                                                </div>
                                            </a>

                                            <div class="card-footer border-0 bg-white activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center like_div">
                                                            <img :src="getImageUrl(res)"
                                                                @click="manageAppealLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                                class="footer_img" id="unLike_fav" alt="...">
                                                            <br><span class="icon_font">{{ res.total_like == null ?
                        0 : res.total_like }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center save_div">
                                                            <img :src="getSaveImageUrl(res)"
                                                                @click="manageAppealSave(res, res.type, res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
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
                                                            <br><span class="icon_font">{{ res.total_view == null ?
                        0 : res.total_view }}</span>
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
                                    <infinite-loading @distance="1" @infinite="getAppealActivity"></infinite-loading>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="col-md-5 col-lg-3 col-xl-3 col-xxl-3 right_layout scroll_bar_login1  d-none d-xl-block d-xxl-block d-xxxl-block"
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
                                <div class="swiper slider swiperLactImg" v-if="img.length > 0">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in img" :key="index"
                                            v-show="index === selectedImageIndex" class="swiper-slide">
                                            <img :src="res.original_url ? res.original_url : 'images/jd_card_logo.png'"
                                                class="image_slider img-fluid" :title="org_title" :alt="org_title">
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="swiper slide">
                                    <img src='/images/jd_card_logo.png' class="image_slider img-fluid"
                                        :title="org_title" :alt="org_title">
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-2 m-1" v-if="img.length > 0">Gallery</label>
                                <div class="swiper thumbnail thumbnailLactImg">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in  img" :key="index" class="swiper-slide">
                                            <img :src="res.original_url" alt="..." class="image_slider_down img-fluid"
                                                @click="selectImage(index)">
                                        </div>
                                    </div>
                                    <div class="next_div" v-if="img.length > 3" @click="nextSlideLactImg"><i
                                            class="bi bi-chevron-right"></i></div>
                                    <div class="prev_div" v-if="img.length > 3" @click="prevSlideLactImg"><i
                                            class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-auto g-0">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${org_id}`">
                                                        <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                            class="modal_card_head_img" :title="org_title"
                                                            :alt="org_title">
                                                    </a>
                                                </div>
                                                <div class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${org_id}`">
                                                        <label
                                                            class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                            :title="org_title" :alt="org_title">{{ org_title }}</label>
                                                    </a>
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
                                            <div
                                                :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': img.length > 0 }">
                                                <p class="card_modal_body_details p-2" v-html="dash_sanstha.detail"></p>
                                                <label v-if="dash_sanstha.type == 'Events'"
                                                    class="card_modal_date py-2">
                                                    <img src="/images/ic_timer_24px.svg" class="location_icon mx-2"
                                                        alt="...">
                                                    {{ formatDate(dash_sanstha.start_date_and_time) + ' - ' +
                        formatDate1(dash_sanstha.end_date_and_time) }}
                                                </label>
                                                <br> <label v-if="dash_sanstha.type == 'Events'"
                                                    class="card-modal_location py-2 ">
                                                    <img src="images/ic_place_24px.svg" class="loation_icon mx-2 "
                                                        alt="..."> {{
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
                                                        <br><span class="icon_font">{{ total_count > 0 ? total_count
                        :
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
                                                        <img src="/images/ic_visibility_24px.svg"
                                                            class="footer_img_view" alt="...">
                                                        <br><span class="icon_font ">{{ dash_sanstha.total_view ==
                        null
                        ? 0 : dash_sanstha.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class=" text-center">
                                                        <a class="view_all_latestact"
                                                            :href="`/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`"
                                                            target="_blank"
                                                            @click.prevent="sendToWhatsApp(org_title, `/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`)"
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
        <div class="modal" id="myVideoModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close">
                        <i class="bi bi-x-lg"></i></button>
                    <div class="modal-body" style="padding-bottom: 0%;">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                <div class="swiper slider swiperLactVideo" v-if="img.length > 0">
                                    <div class="swiper-wrapper" v-for="(res, index) in img" :key="index"
                                        v-if="index === selectedImageIndex">
                                        <video controls :src="res.original_url"
                                            class="video_slider image_slider img-fluid" :title="org_title"
                                            :alt="org_title">
                                        </video>
                                    </div>
                                </div>
                                <div class="swiper slider" v-else>
                                    <embed src="/images/jd_card_logo.png" :title="org_title" :alt="org_title"
                                        class="image_slider img-fluid">
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-2 m-1" v-if="img.length > 0">Gallery</label>
                                <div class="swiper thumbnail thumbnailLactVideo">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in img" :key="index" class="swiper-slide">
                                            <video controls :src="res.original_url"
                                                class="image_slider_down img-fluid video_slider"
                                                @click="selectImage(index)">
                                            </video>
                                        </div>

                                    </div>
                                    <div class="next_div" v-if="img.length > 3" @click="nextSlideLactVideo"><i
                                            class="bi bi-chevron-right"></i></div>
                                    <div class="prev_div" v-if="img.length > 3" @click="prevSlideLactVideo"><i
                                            class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-auto g-0">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${org_id}`">
                                                        <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                            class="modal_card_head_img" :title="org_title"
                                                            :alt="org_title">
                                                    </a>
                                                </div>
                                                <div class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${org_id}`">
                                                        <label
                                                            class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                            :title="org_title" :alt="org_title">{{ org_title }}</label>
                                                    </a>
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
                                            <label class="card_modal_body-title">{{ dash_sanstha.title }}</label>
                                            <div
                                                :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': img.length > 0 }">
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
                                                        <br><span class="icon_font">{{ total_count > 0 ? total_count
                                                            :
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
                                                        <img src="/images/ic_visibility_24px.svg"
                                                            class="footer_img_view" alt="...">
                                                        <br><span class="icon_font ">{{ dash_sanstha.total_view ==
                                                            null
                                                            ? 0 : dash_sanstha.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class=" text-center">
                                                        <a class="view_all_latestact"
                                                            :href="`/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`"
                                                            target="_blank"
                                                            @click.prevent="sendToWhatsApp( org_title , `/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}` )"
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

    </section>
</template>

<script>
import afterLoginActivityService from "../../services/afterLoginActivity.service";
import afterLoginHomeService from "../../services/afterLoginHome.service";
import sansthaDetailService from '../../services/sansthaDetail.service';
import { handleLike, handleSave } from '../../common/common';
import { sendToWhatsApp } from '../../utils/sharefunction.js';
import { initializeSliderActImg, initializeSliderActVideo, initializeThumbnailActImg, initializeThumbnailActVideo } from "../../utils/swiper";
import moment from 'moment';
export default {
    name: "App",
    data() {
        return {
            appeal_page: 1, sharvakAppealPost: [], dash_sanstha: [], img: '', selectedImageIndex: 0, org_logo: '', resExType: '', org_title: '', location: '',
            page: 1, sharvakPost: [], news_page: 1, sharvakNewsPost: [], emptyDataMarginTop: '132px', emptyRightMraginTop: '132px', start_date_and_time: '', total_count: '',
            event_page: 1, sharvakEventPost: [], video_page: 1, sharvakVideoPost: [], add_like: '', org_id: ''
        };
    },
    computed: {
        shouldRenderLoginEventSidebarActivity() {
            return this.sharvakPost.length > 5;
        }
    },
    created() {
        if (this.sharvakEventPost.length === 0) {
            this.getSharvakEventPost();
        }
        if (this.sharvakNewsPost.length === 0) {
            this.getNewsActivity();
        }
        if (this.sharvakVideoPost.length === 0) {
            this.getSharvakVideoPost();
        }
        if (this.sharvakVideoPost.length === 0) {
            this.getSharvakVideoPost();
        }
        if (this.sharvakAppealPost.length === 0) {
            this.getAppealActivity();
        }

    },
    mounted() {

        const thumbnailLactImg = initializeThumbnailActImg();
        initializeSliderActImg(thumbnailLactImg);
        const thumbnailLactVideo = initializeThumbnailActVideo()
        initializeSliderActVideo(thumbnailLactVideo)
    },
    methods: {
        formatTimeAgo(date) {
            return moment(date).fromNow();
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
        nextSlideLactImg() {
            const thumbnailLactImg = document.querySelector('.thumbnailLactImg').swiper;
            thumbnailLactImg.slideNext();
        },
        prevSlideLactImg() {
            const thumbnailLactImg = document.querySelector('.thumbnailLactImg').swiper;
            thumbnailLactImg.slidePrev();
        },
        nextSlideLactVideo() {
            const thumbnailLactVideo = document.querySelector('.thumbnailLactVideo').swiper;
            thumbnailLactVideo.slideNext();
        },
        prevSlideLactVideo() {
            const thumbnailLactVideo = document.querySelector('.thumbnailLactVideo').swiper;
            thumbnailLactVideo.slidePrev();
        },
        getData(resId, resType) {
            this.about_id = resId
            this.resExType = resType;
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
                this.org_id = response.organization_id;
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
        async getAllLatestActivity($state) {
            const response = await afterLoginActivityService.getAllLatestActivity(this.page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.sharvakPost.push(value);
                    });
                    $state.loaded();
                    this.page = this.page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong");
            }
        },
        async getNewsActivity($state) {
            const response = await afterLoginActivityService.getAllNewsLatestActivity(this.news_page);
            if (response.status === 200 || 201) {
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
                        this.sharvakNewsPost = response.data;
                    } else {
                        this.sharvakNewsPost = this.sharvakNewsPost.concat(response.data);
                    }
                    $state.loaded();
                    this.news_page = this.news_page + 1;
                } else {
                    news_page
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getAppealActivity($state) {
            const response = await afterLoginActivityService.getAllLatestAppealActivity(this.appeal_page);
            if (response.status === 200 || 201) {
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
                        this.sharvakAppealPost = response.data;
                    } else {
                        this.sharvakAppealPost = this.sharvakAppealPost.concat(response.data);
                    }
                    $state.loaded();
                    this.appeal_page = this.appeal_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getSharvakEventPost($state) {
            const response = await afterLoginActivityService.getAllLatestEventActivity(this.event_page);
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, async (key, value) => {
                        this.event_id = value.id;
                        const data = {
                            event_id: this.event_id,
                            news_id: '',
                            appeal_id: '',
                            video_id: ''
                        }
                        const response1 = await afterLoginHomeService.viewEventNews({ ...data })
                        if (response1.status === 200 || 201) {
                        } else {
                            console.error("Something went wrong")
                        }
                    });
                    if (this.event_page === 1) {
                        this.sharvakEventPost = response.data;
                    } else {
                        this.sharvakEventPost = this.sharvakEventPost.concat(response.data);
                    }
                    $state.loaded();
                    this.event_page = this.event_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getSharvakVideoPost($state) {
            const response = await afterLoginActivityService.getAllLatestVideos(this.video_page);
            if (response.status === 200 || 201) {
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
                console.error("Something went wrong")
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
        async manageAppealLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.sharvakAppealPost[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.sharvakAppealPost, index, updatedItem);
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
        async manageAppealSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.sharvakAppealPost[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.sharvakAppealPost, index, updatedItem)
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
    beforeMount() {
        this.handleTopPosition();
    },
};
</script>