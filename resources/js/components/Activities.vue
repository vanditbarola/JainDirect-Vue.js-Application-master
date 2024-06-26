<template>
    <div x-data="app()" x-cloak>
        <section class="p-5 mt-4" style="background-color: #FFCF88 ;">
            <div class="container">
                <label class="activity_header mt-2 d-flex justify-content-center">Get all the latest Activities
                    here</label>
                <label class="activity_sub_header d-flex justify-content-center mt-2">Search News , Events ,
                    Appeals</label>
                <form @submit.prevent="getSearchAct()"
                    class="row p-1 px-xxl-5 px-xl-5 px-lg-5 mx-xxl-5 mx-xl-5 mx-lg-5  justify-content-center">
                    <div class="col col-lg-8 col-xl-8 col-xxl-8  col-md-12 col-sm-12 col-xs-12 act_form mt-2">
                        <input type="text" v-model="search_term" class="form-control emailbtn " id="exampleInputEmail1"
                            placeholder="Enter your search keyword here..">
                    </div>
                    <div class="col col-lg-4 col-xl-4 col-xxl-4 col-md-12 col-sm-12 col-xs-12 act_form1 mt-2 d-flex ">
                        <button class="activitybtn form-control" v-on:click="seen = !seen">Submit</button>
                        <button class="activitybtn form-control ms-2" @click="clearForm()">Clear</button>
                    </div>
                </form>
            </div>
        </section>

        <section style="box-shadow: 0px 3px 6px #00000029;">
            <div class="container">
                <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="show-Act" data-bs-toggle="tab"
                            data-bs-target="#show-Act-pane" type="button" role="tab" aria-controls="show-Act-pane"
                            aria-selected="true">Show All</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="news" data-bs-toggle="tab" data-bs-target="#news-pane"
                            type="button" role="tab" aria-controls="news-pane" aria-selected="false">News</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="events" data-bs-toggle="tab" data-bs-target="#events-pane"
                            type="button" role="tab" aria-controls="events-pane" aria-selected="false">Events</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="appeal" data-bs-toggle="tab" data-bs-target="#appeal-pane"
                            type="button" role="tab" aria-controls="appeal-pane" aria-selected="false">Appeal</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="video" data-bs-toggle="tab" data-bs-target="#video-pane"
                            type="button" role="tab" aria-controls="video-pane" aria-selected="false">Video</button>
                    </li>
                </ul>
            </div>
        </section>

        <section class="mt-1 p-3 sansthalist_section">
            <div class="tab-content mt-3 mx-lg-5 mx-xl-5 mx-xxl-5 mx-sm-2 mx-xs-2 mx-md-3 px-lg-2 px-xl-2 px-xxl-2 px-md-1 px-sm-1 px-xs-2"
                id="myTabActContent">
                <div v-if="searchActivityPer" class="tab-pane fade show active" id="search-sanstha-pane" role="tabpanel"
                    aria-labelledby="show-all" tabindex="0">
                    <div class="alert alert-warning" role="alert">
                        No data found.
                    </div>
                </div>

                <div v-else-if="searchActivities.length > 0" class="tab-pane fade show active" id="show-Act-pane"
                    role="tabpanel" aria-labelledby="show-Act" tabindex="0">
                    <div class="row g-4 activity_cards">
                        <div class=" col col-md-6 col-xxl-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12"
                            v-for='(res, index) in searchActivities'>
                            <div class="card h-100 card_getallnews p-2">
                                <div class="ribbon-wrapper">
                                    <div :class="{
                    'card-badge-appeal': res.type === 'Appeal', 'card-badge-event': res.type === 'Events',
                    'card-badge-news': res.type === 'News', 'card-badge-video': res.type === 'Video'
                }" :id="res.type">
                                        <template v-if="res.type === 'Appeal'">Appeals</template>
                                        <template v-else-if="res.type === 'Events'">Events</template>
                                        <template v-else-if="res.type === 'News'">News</template>
                                        <template v-else-if="res.type === 'Video'">Videos</template>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <a class="view_all_latestact" :href="`/sanstha-detail/${res.organization_id}`">
                                            <img :src="`${res.organization ? res.organization.logo ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                :title="res.organization ? res.organization.title : ''"
                                                :alt="res.organization ? res.organization.title : ''"
                                                class="getallimg img-fluid">
                                            <span class="d-inline-block text-truncate getallhead"
                                                :title="res.organization ? res.organization.title : ''"
                                                alt="Organization Title">{{ res.organization ?
                    res.organization.title : '' }}</span>
                                        </a>
                                        <button class="btn followbtn" type="submit"
                                            @click="navigateFollow()">Follow</button>
                                    </div>
                                </div>

                                <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                    :title="res.organization ? res.organization.title : ''"
                                    :alt="res.organization ? res.organization.title : ''"
                                    class="getallnewsimg card-img-top img-fluid m-1 text-center">

                                <div class=" activity_card_body p-1">
                                    <label class="card_header">{{ res.title }}</label>
                                    <br><label class="card_modal_date pt-3" v-if="res.type == 'Events'">
                                        <img src="images/ic_timer_24px.svg" class="loation_icon me-2" alt="...">{{
                    res.start_date_and_time }}</label>
                                    <!-- <br><label class="card_modal_time px-2 mx-3">04:00pm  to 07:00pm</label> -->
                                    <br><label class="card-modal_location py-1" v-if="res.type == 'Events'">
                                        <img src="images/ic_place_24px.svg" class="loation_icon me-2" alt="...">{{
                    res.location }}</label>
                                </div>
                                <a class="read_more px-1 pt-2" @click="activate(res.id, res.type)"
                                    data-bs-toggle="modal" style="margin-left: 10px; margin-top: 10px;"
                                    data-bs-target="#myNewzModal">Read More
                                </a>
                                <div @click="navigateFollow()">
                                    <div class="card-footer border-0 bg-white activity_card_footer">
                                        <div class="row row-cols-4">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class=" text-center like_div1">
                                                    <img v-if="res.total_like != null" src="images/ic_favorite_24px.svg"
                                                        class="footer_img" alt="...">
                                                    <img v-if="res.total_like == null"
                                                        src="images/ic_unfavorite_24px.svg" class="footer_img"
                                                        alt="...">
                                                    <br><span class="icon_font">{{ res.total_like == null ? 0 :
                    res.total_like }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center save_div1">
                                                    <img src="images/ic_add_box_24px.svg" class="footer_img" alt="...">
                                                    <br><span class="icon_font">Save Post</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center view_div1">
                                                    <img src="images/ic_visibility_24px.svg" class="footer_img"
                                                        alt="...">
                                                    <br><span class="icon_font ">{{ res.total_view == null ? 0 :
                    res.total_view }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center share_div1">
                                                    <img src="images/Logo-WhatsApp@2x.png"
                                                        class="footer_img footer_img_share" alt="...">
                                                    <br><span class="icon_font">Share</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <label class="post_uploaded_label px-2">2 days ago</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="tab-pane fade show active" id="show-Act-pane" role="tabpanel"
                    aria-labelledby="show-Act" tabindex="0">
                    <div class="row g-4 activity_cards">
                        <div class="col-sm-12 col-xs-12 col-md-6 col-xxl-6 col-lg-6 col-xl-6"
                            v-for='(res, index) in latestSearchAllActivities'>
                            <div class="card h-100 card_getallnews p-2">
                                <div class="ribbon-wrapper">
                                    <div :class="{
                    'card-badge-appeal': res.type === 'Appeal', 'card-badge-event': res.type === 'Events',
                    'card-badge-news': res.type === 'News', 'card-badge-video': res.type === 'Video'
                }" :id="res.type">
                                        <template v-if="res.type === 'Appeal'">Appeals</template>
                                        <template v-else-if="res.type === 'Events'">Events</template>
                                        <template v-else-if="res.type === 'News'">News</template>
                                        <template v-else-if="res.type === 'Video'">Videos</template>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <a class="view_all_latestact" :href="`/sanstha-detail/${res.organization_id}`">
                                            <img :src="`${res.organization ? res.organization.logo ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                :title="res.organization ? res.organization.title : ''"
                                                :alt="res.organization ? res.organization.title : ''"
                                                class="getallimg img-fluid">
                                            <span class="d-inline-block text-truncate getallhead"
                                                :title="res.organization ? res.organization.title : ''"
                                                alt="Organization Title">{{
                    res.organization ? res.organization.title : '' }}</span>
                                        </a>
                                        <button v-if="token == null" class="btn followbtn" type="submit"
                                            @click="navigateFollow()">Follow</button>
                                        <button v-else class="btn btn_following_log"
                                            @click="manageFollow(res, res.organization.id, res.get_user_org_follows == null ? is_follow = 0 : res.get_user_org_follows.is_follow, index)"
                                            type="submit">
                                            <img :src="getFollowImageUrl(res)" alt="..."></button>
                                    </div>
                                </div>

                                <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                    :title="res.organization ? res.organization.title : ''"
                                    :alt="res.organization ? res.organization.title : ''"
                                    class="getallnewsimg card-img-top img-fluid m-1 text-center">

                                <div class=" activity_card_body p-1">
                                    <label class="card_header">{{ res.title }}</label>
                                    <p class="section_body" v-html="res.detail"></p>
                                    <label class="card_modal_date pt-3" v-if="res.type == 'Events'"><img
                                            src="images/ic_timer_24px.svg" class="loation_icon me-2" alt="...">{{
                    formatDate(res.start_date_and_time) + ' - ' + formatDate1(res.end_date_and_time)
                }}</label>
                                    <br><label class="card-modal_location py-1" v-if="res.type == 'Events'">
                                        <img src="images/ic_place_24px.svg" class="loation_icon me-2" alt="...">{{
                    res.location }}</label>
                                </div>
                                <a class="read_more px-1 pt-2" @click="activate(res.id, res.type)"
                                    data-bs-toggle="modal" style="margin-top: 10px;" data-bs-target="#myNewzModal">read
                                    More </a>
                                <div @click="navigateFollow()">
                                    <div class="card-footer border-0 bg-white  activity_card_footer">
                                        <div class="row row-cols-4">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center like_div1">
                                                    <img v-if="token == null" src="images/ic_unfavorite_24px.svg"
                                                        class="footer_img" alt="...">
                                                    <img v-else :src="getImageUrl(res)"
                                                        @click="manageLike(res, res.type, res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                                        class="footer_img" id="unLike_fav" alt="...">
                                                    <br><span class="icon_font">{{ res.total_like == null ? 0 :
                    res.total_like }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center save_div1">
                                                    <img v-if="token == null" src="images/ic_add_box_24px.svg"
                                                        class="footer_img" alt="...">
                                                    <img v-else :src="getSaveImageUrl(res)"
                                                        @click="manageSave(res, res.type, res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
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
                                                <div class="text-center view_div1">
                                                    <img src="images/ic_visibility_24px.svg" class="footer_img_view"
                                                        alt="...">
                                                    <br><span class="icon_font ">{{ res.total_view == null ? 0 :
                    res.total_view
                                                        }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class=" text-center share_div1">
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
                                    <label class="post_uploaded_label px-2">2 days ago</label>
                                </div>
                            </div>
                        </div>
                        <infinite-loading @distance="1" @infinite="getSearchAllActivities"></infinite-loading>
                    </div>
                </div>

                <div class="tab-pane fade" id="news-pane" role="tabpanel" aria-labelledby="news" tabindex="0">
                    <div class="row g-4 activity_cards">
                        <div class=" col-md-6 col-xxl-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12"
                            v-for='(res, index) in latestActivitiesNews'>
                            <div class="card h-100 card_getallnews p-2">
                                <div class="ribbon-wrapper">
                                    <div class="card-badge-news">News</div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <a class="view_all_latestact" :href="`/sanstha-detail/${res.organization_id}`">
                                            <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                :title="res.organization ? res.organization.title : ''"
                                                :alt="res.organization ? res.organization.title : ''"
                                                class="getallimg img-fluid">
                                            <span class="d-inline-block text-truncate getallhead"
                                                :title="res.organization.title" alt="Organization Title">{{
                    res.organization.title }}</span>
                                        </a>
                                        <button v-if="token == null" class="btn followbtn" type="submit"
                                            @click="navigateFollow()">Follow</button>
                                        <button v-else class="btn btn_following_log"
                                            @click="manageFollowNews(res, res.organization.id, res.get_user_org_follows == null ? is_follow = 0 : res.get_user_org_follows.is_follow, index)"
                                            type="submit">
                                            <img :src="getFollowImageUrl(res)" alt="..."></button>
                                    </div>
                                </div>

                                <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                    :title="res.organization ? res.organization.title : ''"
                                    :alt="res.organization ? res.organization.title : ''"
                                    class="getallnewsimg card-img-top img-fluid m-1 text-center">

                                <div class="activity_card_body p-1">
                                    <label class="card_header">{{ res.title }}</label>
                                    <p class="section_body" v-html="res.detail"></p>
                                </div>
                                <a class="read_more px-1 pt-2" @click="activate(res.id, res.type)"
                                    data-bs-toggle="modal" style=" margin-top: 10px;" data-bs-target="#myNewzModal">read
                                    More </a>
                                <div @click="navigateFollow()">
                                    <div class="card-footer border-0 bg-white activity_card_footer">
                                        <div class="row row-cols-4">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center like_div1">
                                                    <img v-if="token == null" src="images/ic_unfavorite_24px.svg"
                                                        class="footer_img" alt="...">
                                                    <img v-else :src="getImageUrl(res)"
                                                        @click="manageLikeNews(res, res.type, res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                                        class="footer_img" id="unLike_fav" alt="...">
                                                    <br><span class="icon_font">{{ res.total_like == null ? 0
                    : res.total_like }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center save_div1">
                                                    <img v-if="token == null" src="images/ic_add_box_24px.svg"
                                                        class="footer_img" alt="...">
                                                    <img v-else :src="getSaveImageUrl(res)"
                                                        @click="manageSaveNews(res, res.type, res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
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
                                                <div class="text-center view_div1">
                                                    <img src="images/ic_visibility_24px.svg" class="footer_img_view"
                                                        alt="...">
                                                    <br><span class="icon_font ">{{ res.total_view == null ? 0 :
                    res.total_view
                                                        }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                <div class=" text-center share_div1">
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
                                    <label class="post_uploaded_label px-2">2 days ago</label>
                                </div>
                            </div>
                        </div>
                        <infinite-loading @distance="1" @infinite="getNewsActivities"></infinite-loading>
                    </div>
                </div>

                <div class="tab-pane fade" id="events-pane" role="tabpanel" aria-labelledby="events" tabindex="0">
                    <div class="row g-4 activity_cards">
                        <div class="col-md-6 col-xxl-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12"
                            v-for='(res, index) in latestActivitiesEvent'>
                            <div class="card h-100 card_getallnews p-2">
                                <div class="ribbon-wrapper">
                                    <div class="card-badge-event">Events</div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <a class="view_all_latestact" :href="`/sanstha-detail/${res.organization_id}`">
                                            <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                :title="res.organization ? res.organization.title : ''"
                                                :alt="res.organization ? res.organization.title : ''"
                                                class="getallimg img-fluid">
                                            <span class="d-inline-block text-truncate getallhead"
                                                :title="res.organization.title" alt="Organization Title">{{
                    res.organization.title }}</span>
                                        </a>
                                        <button v-if="token == null" class="btn followbtn" type="submit"
                                            @click="navigateFollow()">Follow</button>
                                        <button v-else class="btn btn_following_log"
                                            @click="manageFollowEvent(res, res.organization.id, res.get_user_org_follows == null ? is_follow = 0 : res.get_user_org_follows.is_follow, index)"
                                            type="submit">
                                            <img :src="getFollowImageUrl(res)" alt="..."></button>
                                    </div>
                                </div>

                                <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                    :title="res.organization ? res.organization.title : ''"
                                    :alt="res.organization ? res.organization.title : ''"
                                    class="getallnewsimg card-img-top img-fluid m-1 text-center">

                                <div class="activity_card_body p-1">
                                    <label class="card_header">{{ res.title }}</label>
                                    <br><label class="card_modal_date pt-3">
                                        <img src="images/ic_timer_24px.svg" class="loation_icon me-2" alt="...">{{
                    formatDate(res.start_date_and_time) + ' - ' + formatDate1(res.end_date_and_time)
                }}</label>
                                    <!-- <br><label class="card_modal_time px-2 mx-3">04:00pm  to 07:00pm</label> -->
                                    <br><label class="card-modal_location py-1">
                                        <img src="images/ic_place_24px.svg" class="loation_icon me-2" alt="...">{{
                        res.location
                    }}</label>
                                </div>
                                <a class="read_more px-1 pt-2" @click="activate(res.id, res.type)"
                                    data-bs-toggle="modal" style=" margin-top: 10px;" data-bs-target="#myNewzModal">read
                                    More </a>
                                <div @click="navigateFollow()">
                                    <div class="card-footer border-0 bg-white  activity_card_footer">
                                        <div class="row row-cols-4">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class=" text-center like_div1">
                                                    <img v-if="token == null" src="images/ic_unfavorite_24px.svg"
                                                        class="footer_img" alt="...">
                                                    <img v-else :src="getImageUrl(res)"
                                                        @click="manageLikeEvent(res, res.type, res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                                        class="footer_img" id="unLike_fav" alt="...">
                                                    <br><span class="icon_font">{{ total_count > 0 ? total_count :
                    res.total_like ==
                        null ? 0 : res.total_like }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center save_div1">
                                                    <img v-if="token == null" src="images/ic_add_box_24px.svg"
                                                        class="footer_img" alt="...">
                                                    <img v-else :src="getSaveImageUrl(res)"
                                                        @click="manageSaveEvent(res, res.type, res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
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
                                                <div class="text-center view_div1">
                                                    <img src="images/ic_visibility_24px.svg" class="footer_img_view"
                                                        alt="...">
                                                    <br><span class="icon_font">{{ res.total_view == null ? 0 :
                    res.total_view }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                <div class=" text-center share_div1">
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
                                    <label class="post_uploaded_label px-2">2 days ago</label>
                                </div>
                            </div>
                        </div>
                        <infinite-loading @distance="1" @infinite="getEventActivities"></infinite-loading>
                    </div>
                </div>

                <div class="tab-pane fade" id="appeal-pane" role="tabpanel" aria-labelledby="appeal" tabindex="0">
                    <div class="row g-4 activity_cards">
                        <div class="col-md-6 col-xxl-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12"
                            v-for='(res, index) in latestActivitiesAppeal'>
                            <div class="card h-100 card_getallnews p-2">
                                <div class="ribbon-wrapper">
                                    <div class="card-badge-appeal">Appeal</div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <a class="view_all_latestact" :href="`/sanstha-detail/${res.organization_id}`">
                                            <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                :title="res.organization ? res.organization.title : ''"
                                                :alt="res.organization ? res.organization.title : ''"
                                                class="getallimg img-fluid">
                                            <span class="d-inline-block text-truncate getallhead"
                                                :title="res.organization.title" alt="Organization Title">{{
                    res.organization.title }}</span>
                                        </a>
                                        <button v-if="token == null" class="btn followbtn" type="submit"
                                            @click="navigateFollow()">Follow</button>
                                        <button v-else class="btn btn_following_log"
                                            @click="manageFollowAppeal(res, res.organization.id, res.get_user_org_follows == null ? is_follow = 0 : res.get_user_org_follows.is_follow, index)"
                                            type="submit">
                                            <img :src="getFollowImageUrl(res)" alt="..."></button>
                                    </div>
                                </div>
                                <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                    :title="res.organization ? res.organization.title : ''"
                                    :alt="res.organization ? res.organization.title : ''"
                                    class="getallnewsimg card-img-top img-fluid m-1 text-center">

                                <div class="activity_card_body p-1">
                                    <label class="card_header">{{ res.title }}</label>
                                    <p class="section_body" v-html="res.detail"></p>
                                    <a class="read_more px-1 pt-2" @click="activate(res.id, res.type)"
                                        data-bs-toggle="modal" style="margin-top: 10px;"
                                        data-bs-target="#myNewzModal">Read More </a>
                                    <div @click="navigateFollow()">
                                        <div class="card-footer border-0 bg-white  activity_card_footer">
                                            <div class="row row-cols-4">
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                    <div class=" text-center like_div1">
                                                        <img v-if="token == null" src="images/ic_unfavorite_24px.svg"
                                                            class="footer_img" alt="...">
                                                        <img v-else :src="getImageUrl(res)"
                                                            @click="manageLikeAppeal(res, res.type, res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                                            class="footer_img" id="unLike_fav" alt="...">
                                                        <br><span class="icon_font">{{ res.total_like == null ? 0 :
                    res.total_like
                                                            }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                    <div class="text-center save_div1">
                                                        <img v-if="token == null" src="images/ic_add_box_24px.svg"
                                                            class="footer_img" alt="...">
                                                        <img v-else :src="getSaveImageUrl(res)"
                                                            @click="manageSaveAppeal(res, res.type, res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
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
                                                    <div class="text-center view_div1">
                                                        <img src="images/ic_visibility_24px.svg" class="footer_img_view"
                                                            alt="...">
                                                        <br><span class="icon_font">{{ res.total_view == null ? 0 :
                    res.total_view
                                                            }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                    <div class=" text-center share_div1">
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
                                        <label class="post_uploaded_label px-2">2 days ago</label>
                                    </div>
                                </div>
    
                            </div>
                        </div>
                        <infinite-loading @distance="1" @infinite="getAppealActivities"></infinite-loading>
                    </div>
                </div>

                <div class="tab-pane fade" id="video-pane" role="tabpanel" aria-labelledby="video" tabindex="0">
                    <div class="container">
                        <div class="row g-4 activity_cards">
                            <div class=" col-md-6 col-xxl-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12"
                                v-for='(res, index) in latestActivitiesVideo'>
                                <div class="card h-9 p-2 card_getallnews">
                                    <div class="ribbon-wrapper">
                                        <div class="card-badge-video">Video</div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <a class="view_all_latestact"
                                                :href="`/sanstha-detail/${res.organization_id}`">
                                                <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                    :title="res.organization ? res.organization.title : ''"
                                                    :alt="res.organization ? res.organization.title : ''"
                                                    class="getallimg img-fluid">
                                                <span class="d-inline-block text-truncate getallhead"
                                                    :title="res.organization.title" alt="Organization Title">{{
                    res.organization.title }}</span>
                                            </a>
                                            <button v-if="token == null" class="btn followbtn" type="submit"
                                                @click="navigateFollow()">Follow</button>
                                            <button v-else class="btn btn_following_log"
                                                @click="manageFollowVideo(res, res.organization.id, res.get_user_org_follows == null ? is_follow = 0 : res.get_user_org_follows.is_follow, index)"
                                                type="submit">
                                                <img :src="getFollowImageUrl(res)" alt="..."></button>
                                        </div>
                                    </div>
                                    <div
                                        v-if="res.banner ? res.banner[0] ? isImage(res.banner[0].original_url) : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                            class="video_tab_img"
                                            :title="res.organization ? res.organization.title : ''"
                                            :alt="res.organization ? res.organization.title : ''">
                                    </div>
                                    <div v-else>
                                        <video controls class="video_tab_img"
                                            :title="res.organization ? res.organization.title : ''"
                                            :alt="res.organization ? res.organization.title : ''">
                                            <source
                                                :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                                type="video/mp4">
                                        </video>
                                    </div>
                                    <div class="activity_card_body p-1">
                                        <label class="card_header">{{ res.title }}</label>
                                        <p class="section_body" v-html="res.detail"></p>
                                        <a class="read_more px-1 pt-2" @click="activate(res.id, res.type)"
                                            data-bs-toggle="modal" style=" margin-top: 10px;"
                                            data-bs-target="#myNewzModal1">Read More </a>
                                        <div @click="navigateFollow()">
                                            <div class="card-footer border-0 bg-white  activity_card_footer">
                                                <div class="row row-cols-4">
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class=" text-center like_div1">
                                                            <img v-if="token == null"
                                                                src="images/ic_unfavorite_24px.svg" class="footer_img"
                                                                alt="...">
                                                            <img v-else :src="getImageUrl(res)"
                                                                @click="manageLikeVideo(res, res.type, res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                                                class="footer_img" id="unLike_fav" alt="...">
                                                            <br><span class="icon_font">{{ res.total_like == null ? 0 :
                    res.total_like
                                                                }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                        <div class="text-center save_div1">
                                                            <img v-if="token == null" src="images/ic_add_box_24px.svg"
                                                                class="footer_img" alt="...">
                                                            <img v-else :src="getSaveImageUrl(res)"
                                                                @click="manageSaveVideo(res, res.type, res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
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
                                                        <div class="text-center view_div1">
                                                            <img src="images/ic_visibility_24px.svg"
                                                                class="footer_img_view" alt="...">
                                                            <br><span class="icon_font">{{ res.total_view == null ? 0 :
                    res.total_view
                                                                }}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                        <div class=" text-center share_div1">
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
                                            <label class="post_uploaded_label px-2">2 days ago</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <infinite-loading @distance="1" @infinite="getVideoActivities"></infinite-loading>
                        </div>
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
                                    <div v-if="get_news.banner.length > 0" class="swiper slider">
                                        <div class="swiper-wrapper">
                                            <div v-for="(res, index) in get_news.banner" :key="index"
                                                class="swiper-slide" v-show="index === selectedImageIndex">
                                                <img :src="res.original_url" class="image_slider img-fluid"
                                                    :alt="org_title" :title="org_title">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-slider" v-else>
                                        <div class="swiper-wrapper">
                                            <div class="swiper-slide">
                                                <img src="images/jd_card_logo.png" :alt="org_title" :title="org_title"
                                                    class="image_slider img-fluid">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dash mt-2 mb-2"></div>
                                    <label class="title_gallery p-3 m-1"
                                        v-show="get_news.banner.length > 0">Gallery</label>
                                    <div class="swiper thumbnail thumbnailActivityImage ">
                                        <div class="swiper-wrapper">
                                            <div v-for="(res, index) in get_news.banner" :key="index"
                                                class="swiper-slide">
                                                <img :src="res.original_url" alt="..."
                                                    class="image_slider_down img-fluid" @click="selectImage(index)">
                                            </div>
                                        </div>
                                        <div v-if="get_news.banner.length > 3" class="next_div"
                                            @click="nextSlideActivityImage"><i class="bi bi-chevron-right"></i></div>
                                        <div v-if="get_news.banner.length > 3" class="prev_div"
                                            @click="prevSlideActivityImage"><i class="bi bi-chevron-left"></i></div>
                                    </div>
                                </div>
                                <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                    <section class="card1">
                                        <div class="card border-0">
                                            <div class="card-head p-2 card_head_modal border-0">
                                                <div class="row row-cols-auto g-0">
                                                    <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                        <img :src="`${logo.original_url ? logo.original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                            class="modal_card_head_img" :alt="org_title"
                                                            :title="org_title">
                                                    </div>
                                                    <div class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                        <label
                                                            class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                            :alt="org_title" :title="org_title">{{ org_title }}</label>
                                                    </div>
                                                    <div
                                                        class="col-md-4 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4 ms-auto ms-lg-0 ms-xl-0 ms-xxl-0">
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
                                                    <br><label class="card_modal_date p-2" v-if="start_date_and_time">
                                                        <img src="images/ic_timer_24px.svg" class="location_icon mx-2"
                                                            alt="...">{{
                    start_date_and_time }}</label>
                                                    <br>
                                                    <p v-if="location">
                                                        <img src="images/ic_place_24px.svg"
                                                            class="loation_icon mx-2 ms-3" alt="...">
                                                        <label class="card-modal_location p-2">{{ location }}</label>
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
                    this.get_news.total_like == null ? 0
                        : this.get_news.total_like
                                                                }}</span>
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
                                                            <img src="images/ic_visibility_24px.svg"
                                                                class="footer_img_view" alt="...">
                                                            <br><span class="icon_font">{{ total_view == null ? 0 :
                    total_view
                                                                }}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                        <div class=" text-center" style="margin-left: 20px;">
                                                            <a class="view_all_latestact"
                                                                :href="`/sharepostcard?id=${btoa(get_news.id)}&type=${btoa(get_news.type)}`"
                                                                target="_blank"
                                                                @click.prevent="sendToWhatsApp(org_title, `/sharepostcard?id=${btoa(get_news.id)}&type=${btoa(get_news.type)}`)"
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

            <div class="modal" id="myNewzModal1">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close">
                            <i class="bi bi-x-lg"></i></button>
                        <div class="modal-body" style="padding-bottom: 0%;">
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                    <div v-if="get_news.banner.length > 0" class="swiper slider swiperVideo">
                                        <div class="swiper-wrapper">
                                            <div v-for="(res, index) in get_news.banner" :key="index"
                                                class="swiper-slide" v-show="index === selectedImageIndex">
                                                <video controls class="video_slider image_slider img-fluid"
                                                    :alt="org_title" :title="org_title" :src="res.original_url"></video>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="swiper-slider" v-else>
                                        <div class="swiper-wrapper">
                                            <div class="swiper-slide">
                                                <img src="images/jd_card_logo.png" :alt="org_title" :title="org_title"
                                                    class="image_slider img-fluid">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dash mt-2 mb-2"></div>
                                    <label class="title_gallery p-3 m-1"
                                        v-show="get_news.banner.length > 0">Gallery</label>
                                    <div class="swiper thumbnail thumbnailActivityVideo">
                                        <div class="swiper-wrapper">
                                            <div v-for="(res, index) in get_news.banner" :key="index"
                                                class="swiper-slide">
                                                <video controls :src="res.original_url"
                                                    class="image_slider_down img-fluid video_slider"
                                                    @click="selectImage(index)"></video>
                                            </div>
                                        </div>
                                        <div v-if="get_news.banner.length > 3" class="next_div"
                                            @click="nextSlideActivityVideo"><i class="bi bi-chevron-right"></i></div>
                                        <div v-if="get_news.banner.length > 3" class="prev_div"
                                            @click="prevSlideActivityVideo"><i class="bi bi-chevron-left"></i></div>
                                    </div>
                                </div>

                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                    <section class="card1">
                                        <div class="card border-0">
                                            <div class="card-head p-2 card_head_modal border-0">
                                                <div class="row row-cols-auto g-0">
                                                    <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                        <img :src="`${logo.original_url ? logo.original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                            class="modal_card_head_img" :alt="org_title"
                                                            :title="org_title">
                                                    </div>
                                                    <div class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                        <label
                                                            class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                            :title="org_title">{{ org_title }}</label>
                                                    </div>
                                                    <div
                                                        class="col-md-4 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4 ms-auto ">
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
                                                    <br><label class="card_modal_date p-2" v-if="start_date_and_time">
                                                        <img src="images/ic_timer_24px.svg" class="location_icon mx-2"
                                                            alt="...">{{
                                                        start_date_and_time }}</label>
                                                    <br>
                                                    <p v-if="location">
                                                        <img src="images/ic_place_24px.svg"
                                                            class="loation_icon mx-2 ms-3" alt="...">
                                                        <label class="card-modal_location p-2">{{ location }}</label>
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="dash p-2"></div>
                                            <div class="card-footer bg-white border-0 mt-2">
                                                <div class="row text-center row-cols-4 modal_footer_row">
                                                    <div
                                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                        <div class="text-center">
                                                            <a class="view_all_latestact">
                                                                <img :src="getImageLike()" @click="manageLikeMore()"
                                                                    class="footer_img" alt="...">
                                                                <br><span class="icon_font">{{ total_count > 0 ?
                                                                    total_count :
                                                                    this.get_news.total_like == null ? 0
                                                                    :this.get_news.total_like}}</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                        <div class="text-center">
                                                            <a class="view_all_latestact">
                                                                <img :src="getSaveImageMore()" @click="manageSaveMore()"
                                                                    class="footer_img" alt="...">
                                                                <br> <span class="icon_font">Save Post</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                        <div class="text-center">
                                                            <img src="images/ic_visibility_24px.svg"
                                                                class="footer_img_view" alt="...">
                                                            <br><span class="icon_font">{{ total_view == null ? 0
                                                                :total_view}}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                        <div class=" text-center">
                                                            <a class="view_all_latestact"
                                                                :href="`/sharepostcard?id=${btoa(get_news.id)}&type=${btoa(get_news.type)}`"
                                                                target="_blank"
                                                                @click.prevent="sendToWhatsApp( org_title , `/sharepostcard?id=${btoa(get_news.id)}&type=${btoa(get_news.type)}` )"
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
    </div>
</template>

<script>
import activityService from '../../services/activity.service';
import { handleLike, handleSave } from '../../common/common';
import { sendToWhatsApp } from '../../utils/sharefunction.js';
import afterLoginHomeService from "../../services/afterLoginHome.service";
import {   initializeThumbnailActivityImage, initializeSlider, initializeThumbnailActivityVideo,initializeSliderVideo } from '../../utils/swiper.js';
export default {
    name: "App",
    data() {
        return {
            selectedImageIndex: 0, total_count: '',
            get_news: { banner: [] }, img: [], title: '', logo: '', detail: '', location: '', start_date_and_time: '', total_like: '', total_view: '', org_title: '', searchpage: 1,
            latestSearchAllActivities: [], search_term: '', appeal_page: 1, video_page: 1, seen: true, searchActivityPer: false,
            latestActivitiesNews: [], latestActivitiesVideo: [], latestActivitiesEvent: [], latestActivitiesAppeal: [],
            page: 1, news_page: 1, event_page: 1, searchActivities: [], token: localStorage.getItem('storeToken')
        };
    },
    methods: {
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        btoa(input) {
            return btoa(input);
        },
        isImage(url) {
            return /\.(jpeg|jpg|png)$/i.test(url);
        },
        isVideo(url) {
            return /\.(mp4)$/i.test(url);
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
        async activate(resId, resType) {
            const data = {
                params: {
                    id: resId, store_type: resType
                }
            }
            const response = await activityService.newsDetails({ ...data });
            this.get_news = response;
            this.img = response.banner;
            this.title = response.title;
            this.detail = response.detail;
            this.location = response.location; this.start_date_and_time = response.start_date_and_time;
            this.total_like = response.total_like; this.total_view = response.total_view;
            this.org_title = response.organization.title;
            this.logo = response.organization.logo[0];
        },
        getImageUrl(res) {
            if (res.get_user_likes == null) {
                return 'images/ic_unfavorite_24px.svg';
            } else if (res.get_user_likes.is_like === 1) {
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
                ...this.latestSearchAllActivities[index],
                get_user_likes: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.latestSearchAllActivities, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageLikeEvent(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesEvent[index],
                get_user_likes: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.latestActivitiesEvent, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageLikeAppeal(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesAppeal[index],
                get_user_likes: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.latestActivitiesAppeal, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageLikeVideo(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesVideo[index],
                get_user_likes: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.latestActivitiesVideo, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageLikeNews(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesNews[index],
                get_user_likes: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.latestActivitiesNews, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
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
        async manageSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.latestSearchAllActivities[index],
                get_user_save_posts: { is_save: newIsSave },
            };
            this.$set(this.latestSearchAllActivities, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        async manageSaveEvent(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesEvent[index],
                get_user_save_posts: { is_save: newIsSave },
            };
            this.$set(this.latestActivitiesEvent, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        async manageSaveAppeal(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesAppeal[index],
                get_user_save_posts: { is_save: newIsSave },
            };
            this.$set(this.latestActivitiesAppeal, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        async manageSaveVideo(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesVideo[index],
                get_user_save_posts: { is_save: newIsSave },
            };
            this.$set(this.latestActivitiesVideo, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        async manageSaveNews(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesNews[index],
                get_user_save_posts: { is_save: newIsSave },
            };
            this.$set(this.latestActivitiesNews, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
        getFollowImageUrl(res) {
            if (res.get_user_org_follows == null) {
                return 'images/follow_btn.svg';
            } else if (res.get_user_org_follows.is_follow === 1) {
                return 'images/following_btn.svg';
            } else {
                return 'images/follow_btn.svg';
            }
        },
        async manageFollow(res, resOrgId, is_follow, index) {
            const newIsFollow = is_follow === 1 ? 0 : 1;
            this.$set(res, 'img', this.getFollowImageUrl(res));
            const updatedItem = {
                ...this.latestSearchAllActivities[index],
                get_user_org_follows: { is_follow: newIsFollow },
            };
            this.$set(this.latestSearchAllActivities, index, updatedItem)
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
        async manageFollowNews(res, resOrgId, is_follow, index) {
            const newIsFollow = is_follow === 1 ? 0 : 1;
            this.$set(res, 'img', this.getFollowImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesNews[index],
                get_user_org_follows: { is_follow: newIsFollow },
            };
            this.$set(this.latestActivitiesNews, index, updatedItem)
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
        async manageFollowEvent(res, resOrgId, is_follow, index) {
            const newIsFollow = is_follow === 1 ? 0 : 1;
            this.$set(res, 'img', this.getFollowImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesEvent[index],
                get_user_org_follows: { is_follow: newIsFollow },
            };
            this.$set(this.latestActivitiesEvent, index, updatedItem)
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
        async manageFollowAppeal(res, resOrgId, is_follow, index) {
            const newIsFollow = is_follow === 1 ? 0 : 1;
            this.$set(res, 'img', this.getFollowImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesAppeal[index],
                get_user_org_follows: { is_follow: newIsFollow },
            };
            this.$set(this.latestActivitiesAppeal, index, updatedItem)
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
        async manageFollowVideo(res, resOrgId, is_follow, index) {
            const newIsFollow = is_follow === 1 ? 0 : 1;
            this.$set(res, 'img', this.getFollowImageUrl(res));
            const updatedItem = {
                ...this.latestActivitiesVideo[index],
                get_user_org_follows: { is_follow: newIsFollow },
            };
            this.$set(this.latestActivitiesVideo, index, updatedItem)
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
        async getNewsActivities($state) {
            const response = await activityService.getAllNewsActivity(this.news_page);
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
                    $.each(response.data, (key, value) => {
                        this.latestActivitiesNews.push(value);
                    });
                    $state.loaded();
                    this.news_page = this.news_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getEventActivities($state) {
            const response = await activityService.getAllEventsActivity(this.event_page);
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
                        const response = await afterLoginHomeService.viewEventNews({ ...data })
                        if (response.status === 200 || 201) {
                        } else {
                            console.error("Something went wrong")
                        }
                    });
                    $.each(response.data, (key, value) => {
                        this.latestActivitiesEvent.push(value);
                    });
                    $state.loaded();
                    this.event_page = this.event_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getAppealActivities($state) {
            const response = await activityService.getAllAppealActivity(this.appeal_page);
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
                    $.each(response.data, (key, value) => {
                        this.latestActivitiesAppeal.push(value);
                    });
                    $state.loaded();
                    this.appeal_page = this.appeal_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getVideoActivities($state) {
            const response = await activityService.getAllVideoActivity(this.video_page);
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
                    $.each(response.data, (key, value) => {
                        this.latestActivitiesVideo.push(value);
                    });
                    $state.loaded();
                    this.video_page = this.video_page + 1;
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        navigateFollow() {
            this.token = localStorage.getItem('storeToken');
            if (this.token == null) {
                window.location.href = 'home-login';
            }
        },
        async clearForm($state) {
            this.searchActivityPer = true;
            this.latestSearchAllActivities = [];
            this.searchActivities = [];
            this.search_term = '' || null;
            this.page = 1;
            await this.getSearchAllActivities($state);
        },
        async getSearchAct() {
            this.latestSearchAllActivities = [];
            this.searchActivityPer = false;
            try {
                const data = {
                    params: {
                        search_term: this.search_term
                    }
                }
                const response = await activityService.getAllSearchActivity({ ...data })
                this.latestSearchAllActivities = [];
                if (response.status === 200 || 201) {
                    if (response.data.length === 0) {
                        this.searchActivityPer = true;
                        return;
                    } else {
                        $.each(response.data, (key, value) => {
                            this.searchActivities.push(value);
                        });
                    }
                }
            } catch (error) {
                console.error("Something went wrong")
            }
        },
        async getSearchAllActivities($state) {
            try {
                this.searchActivityPer = false;
                const response = await activityService.getAllActivity(this.page);
                if (response.status === 200 || 201) {
                    if (response.data == '') {
                        this.message = "No Data Found";
                    } else {
                        $.each(response.data, (key, value) => {
                            this.latestSearchAllActivities.push(value);
                        });
                        $state.loaded();
                        this.page = this.page + 1;
                    }
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        ScrollnavarActi() {
            window.onload = function () {
                document.getElementById('news').addEventListener('click', function () {
                    window.scrollBy(0, 1);
                });
                document.getElementById('events').addEventListener('click', function () {
                    window.scrollBy(0, 2);
                });
                document.getElementById('appeal').addEventListener('click', function () {
                    window.scrollBy(0, 3);
                });
                document.getElementById('video').addEventListener('click', function () {
                    window.scrollBy(0, 4);
                });
            };
        },
        nextSlideActivityImage() {
            const thumbnailActivityImage = document.querySelector('.thumbnailActivityImage').swiper;
            thumbnailActivityImage.slideNext();
        },
        prevSlideActivityImage() {
            const thumbnailActivityImage = document.querySelector('.thumbnailActivityImage').swiper;
            thumbnailActivityImage.slidePrev();
        },
        nextSlideActivityVideo() {
            const thumbnailActivityVideo = document.querySelector('.thumbnailActivityVideo').swiper;
            thumbnailActivityVideo.slideNext();
        },
        prevSlideActivityVideo() {
            const thumbnailActivityVideo = document.querySelector('.thumbnailActivityVideo').swiper;
            thumbnailActivityVideo.slidePrev();
        },
    },
    mounted() {
        const thumbnailActivityImage = initializeThumbnailActivityImage();
        initializeSlider(thumbnailActivityImage);

        const thumbnailActivityVideo = initializeThumbnailActivityVideo();
        initializeSliderVideo(thumbnailActivityVideo);
    },
    beforeMount() {
        if (!this.token) {
            localStorage.removeItem('storeMobile');
            localStorage.removeItem('storeEmail');
        }
        this.ScrollnavarActi();
    }
}
</script>
