<template>
    <div x-data="app()" x-cloak>
        <section class="mt-2 mb-3 aboutbg">
            <div class="container ">
                <div class="row">
                    <div class="col-sm-12 col-xs-10 col-lg-4 col-md-4 col-xl-5 col-xxl-5">
                        <label class="section_header px-2">Explore Sanstha's</label>
                    </div>
                    <div class="col-sm-12 col-xs-12 col-lg-8 col-md-8 col-xl-7 col-xxl-7">
                        <ul class="nav nav-tabs float-lg-end float-xl-end float-xxl-end" id="myTabOexp" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link orgexp active" id="temple" data-bs-toggle="tab"
                                    data-bs-target="#temple-pane" type="button" role="tab" aria-controls="temple-pane"
                                    aria-selected="true">Temple</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link orgexp" id="muniseva" data-bs-toggle="tab"
                                    data-bs-target="#muniseva-pane" type="button" role="tab"
                                    aria-controls="muniseva-pane" aria-selected="false">Muni Seva</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link orgexp" id="dharamshala" data-bs-toggle="tab"
                                    data-bs-target="#dharamshala-pane" type="button" role="tab"
                                    aria-controls="dharamshala-pane" aria-selected="false">Dharamshala</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link orgexp" @click="navigate">Show All</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <p class="exploreorgp px-2">Get detailed information & updates regarding Organisations, You can make
                    direct Donations to your favourite Organisations.</p>
                <div class="tab-content" id="myTabOexpContent">
                    <div class="tab-pane fade show active" id="temple-pane" role="tabpanel" aria-labelledby="temple"
                        tabindex="0">
                        <div class="row row-cols-md-4 g-4">
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in this.templeSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 card_exploreorg text-center p-2">

                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                            :title="res.title" :alt="res.title" class="exloreorglocimg">
                                        <div class=" text-center">
                                            <div class="row">
                                                <div
                                                    class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                    <label class="exploreorgname">{{ res.title }}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                <div class=" card-footer border-0 bg-white text-center footer">
                                                    <label class="m-1 exploreorgloc"><img src="images/ic_place_24px.svg"
                                                            class="loation_icon me-1" alt="...">{{ res.cities ?
                                    res.cities.name : res.location }}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade show" id="muniseva-pane" role="tabpanel" aria-labelledby="muniseva"
                        tabindex="0">
                        <div class="row row-cols-md-4 g-4">
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in this.munisevaSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 card_exploreorg text-center p-2">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                            :title="res.title" :alt="res.title" class="exloreorglocimg">
                                        <div class="card-body text-center">
                                            <div class="row">
                                                <div
                                                    class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                    <label class="exploreorgname">{{ res.title }}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                <div class=" card-footer border-0 bg-white text-center footer">
                                                    <label class="m-1 exploreorgloc"><img src="images/ic_place_24px.svg"
                                                            class="loation_icon me-1" alt="...">{{ res.cities.name
                                                        }}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade show" id="dharamshala-pane" role="tabpanel" aria-labelledby="dharamshala"
                        tabindex="0">
                        <div class="row row-cols-md-4 g-4">
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in this.dharamshalaSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 card_exploreorg text-center p-2">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                            :title="res.title" :alt="res.title" class="exloreorglocimg">
                                        <div class="card-body text-center">
                                            <div class="row">
                                                <div
                                                    class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                    <label class="exploreorgname">{{ res.title }}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                <div class="card-footer border-0 bg-white text-center footer">
                                                    <label class="m-1 exploreorgloc"><img src="images/ic_place_24px.svg"
                                                            class="loation_icon me-1" alt="...">{{ res.cities.name
                                                        }}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="pb-3 actbg">
            <div class="container">
                <div class="row">
                    <div class="col-sm-10 col-xs-10 col-lg-7 col-md-6 col-xl-7 col-xxl-7">
                        <label class="section_header px-2">Get all the latest Activities here</label>
                    </div>
                    <div class="col-sm-12 col-xs-12 col-lg-5 col-md-6 col-xl-5 col-xxl-5"
                        @keydown.prevent="handleKeyDown">
                        <ul class="nav nav-tabs float-lg-end float-xl-end float-xxl-end" id="myTabGact" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link orgexp active" id="news" data-bs-toggle="tab"
                                    data-bs-target="#news-pane" type="button" role="tab" aria-controls="news-pane"
                                    aria-selected="false">News</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link orgexp" id="events" data-bs-toggle="tab"
                                    data-bs-target="#events-pane" type="button" role="tab" aria-controls="events-pane"
                                    aria-selected="false">Events</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link orgexp" id="appeal" data-bs-toggle="tab"
                                    data-bs-target="#appeal-pane" type="button" role="tab" aria-controls="appeal-pane"
                                    aria-selected="false">Appeal</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link orgexp" @click="navigateActivity()" id="show-allAc"
                                    data-bs-toggle="tab" type="button" role="tab" aria-selected="true">Show All</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <p class="getallp p-2">Get the latest News & events updates from Organisations.</p>
                <div class="tab-content" id="myTabGactContent">
                    <div class="tab-pane fade show active" id="news-pane" role="tabpanel" aria-labelledby="news"
                        tabindex="0">
                        <div class="row g-4">
                            <div class="col-md-6 col-xxl-4 col-lg-4 col-xl-4 col-sm-6 col-xs-6"
                                v-for='(res, index) in latestActivitiesNews'>
                                <div class="card h-100 card_getallnews p-2">
                                    <div class="ribbon-wrapper">
                                        <div class="card-badge-news">News</div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <a class="view_all_latestact" :href="`/sanstha-detail/${res.id}`">
                                                <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                    :title="res.organization.title" :alt="res.organization.title"
                                                    class="getallimg img-fluid">
                                                <span class="d-inline-block text-truncate getallhead"
                                                    :title="res.organization.title" alt="Organization Title">{{
                                    res.organization.title }}</span>

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
                                        :title="res.organization.title" :alt="res.organization.title"
                                        class="getallnewsimg card-img-top img-fluid m-1 text-center">
                                    <div class="activity_card_body p-1">
                                        <label class="card_header">{{ res.title }}</label>
                                        <p class="section_body" v-html="res.detail"></p>
                                    </div>
                                    <a class="read_more" @click="activate(res.id, res.type)" style="margin-left: 4px;"
                                        data-bs-toggle="modal" data-bs-target="#myNewzModal">Read More</a>
                                    <div @click="navigateFollow()">
                                        <div class="card-footer border-0 bg-white activity_card_footer">
                                            <div class="row row-cols-4">
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                    <div class="text-center like_div like_div_about">
                                                        <img v-if="token == null" src="images/ic_unfavorite_24px.svg"
                                                            class="footer_img" alt="...">
                                                        <img v-else :src="getImageUrl(res)"
                                                            @click="manageLike(res, res.type, res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                                            class="footer_img" id="unLike_fav" alt="...">
                                                        <br><span class="icon_font">{{ res.total_like == null ? 0 :
                                    res.total_like }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                    <div class="text-center save_div" >
                                                        <img v-if="token == null" src="images/ic_add_box_24px.svg"
                                                            class="footer_img" alt="...">
                                                        <img v-else :src="getSaveImageUrl(res)"
                                                            @click="manageSave(res, res.type, res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
                                                            class="footer_img" alt="...">
                                                        <br>
                                                        <span
                                                            v-if="getSaveImageUrl(res) === '/images/ic_add_fav_box_24px.svg'"
                                                            class="icon_font">Saved Post</span>
                                                        <span v-else class="icon_font">Save Post</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                    <div class="text-center view_div" >
                                                        <img src="images/ic_visibility_24px.svg"
                                                            class="footer_img_view " alt="...">
                                                        <br><span class="icon_font">{{ res.total_view == null ? 0 :
                                    res.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                    <div class=" text-center share_div" >
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
                    </div>

                    <div class="tab-pane fade" id="events-pane" role="tabpanel" aria-labelledby="events" tabindex="0">
                        <div class="row g-4">
                            <div class="col-md-6 col-xxl-4 col-lg-4 col-xl-4 col-sm-6 col-xs-6"
                                v-for='(res, index) in latestActivitiesEvent'>
                                <div class="card h-100 card_getallnews p-2">
                                    <div class="ribbon-wrapper">
                                        <div class="card-badge-event">Events</div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <a class="view_all_latestact" :href="`/sanstha-detail/${res.id}`">
                                                <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                    :title="res.organization.title" :alt="res.organization.title"
                                                    class="getallimg img-fluid">
                                                <span class="d-inline-block text-truncate getallhead"
                                                    style="max-width: 100px;">{{ res.organization.title }}</span>
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
                                        :title="res.organization.title" :alt="res.organization.title"
                                        class="getallnewsimg card-img-top img-fluid m-1 text-center">

                                    <div class="activity_card_body p-1">
                                        <label class="card_header">{{ res.title }}</label>
                                        <br><label class="card_modal_date pt-3"><img src="images/ic_timer_24px.svg"
                                                class="loation_icon me-2" alt="...">{{ res.start_date_and_time
                                            }}</label>
                                        <br><label class="card-modal_location py-1">
                                            <img src="images/ic_place_24px.svg" class="loation_icon me-2" alt="...">{{
                                    res.location }}</label>
                                    </div>
                                    <a class="read_more px-1 pt-2" @click="activate(res.id, res.type)"
                                        data-bs-toggle="modal" style="margin-left: 10px; margin-top: 10px;"
                                        data-bs-target="#myNewzModal">Read More</a>
                                    <div @click="navigateFollow()">
                                        <div class="card-footer border-0 bg-white activity_card_footer">
                                            <div class="row row-cols-4">
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                    <div class="text-center like_div like_div_about">
                                                        <img v-if="token == null" src="images/ic_unfavorite_24px.svg"
                                                            class="footer_img" alt="...">
                                                        <img v-else :src="getImageUrl(res)"
                                                            @click="manageLikeEvent(res, res.type, res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                                            class="footer_img" id="unLike_fav" alt="...">
                                                        <br><span class="icon_font">{{ res.total_like == null ? 0 :
                                    res.total_like }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                    <div class="text-center save_div">
                                                        <img v-if="token == null" src="images/ic_add_box_24px.svg"
                                                            class="footer_img" alt="...">
                                                        <img v-else :src="getSaveImageUrl(res)"
                                                            @click="manageSaveEvent(res, res.type, res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
                                                            class="footer_img" alt="...">
                                                        <br>
                                                        <span
                                                            v-if="getSaveImageUrl(res) === '/images/ic_add_fav_box_24px.svg'"
                                                            class="icon_font">Saved Post</span>
                                                        <span v-else class="icon_font">Save Post</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                    <div class="text-center view_div">
                                                        <img src="images/ic_visibility_24px.svg" class="footer_img_view"
                                                            alt="...">
                                                        <br><span class="icon_font">{{ res.total_view == null ? 0 :
                                    res.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                    <div class=" text-center share_div">
                                                        <a class="view_all_latestact"
                                                            :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa(res.type)}`"
                                                            target="_blank"
                                                            @click.prevent="(res.organization.title, `/sharepostcard?id=${btoa(res.id)}&type=${btoa(res.type)}`)"
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
                    </div>

                    <div class="tab-pane fade" id="appeal-pane" role="tabpanel" aria-labelledby="appeal" tabindex="0">
                        <div class="row g-4">
                            <div class="col-md-6 col-xxl-4 col-lg-4 col-xl-4 col-sm-6 col-xs-6"
                                v-for='(res, index) in latestActivitiesAppeal'>
                                <div class="card h-100 card_getallnews p-2">
                                    <div class="ribbon-wrapper">
                                        <div class="card-badge-appeal">Appeals</div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <a class="view_all_latestact" :href="`/sanstha-detail/${res.id}`">
                                                <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                    :title="res.organization.title" :alt="res.organization.title"
                                                    class="getallimg img-fluid">
                                                <span class="d-inline-block text-truncate getallhead"
                                                    :title="res.organization.title" style="max-width: 100px;">{{
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
                                        :title="res.organization.title" :alt="res.organization.title"
                                        class="getallnewsimg card-img-top img-fluid m-1 text-center">

                                    <div class="activity_card_body p-1">
                                        <label class="card_header">{{ res.title }}</label>
                                        <p class="section_body" v-html="res.detail"></p>
                                        <button type="button" @click="activate(res.id, res.type)" class="btn read_more"
                                            style="margin-left: -10px;" data-bs-toggle="modal"
                                            data-bs-target="#myNewzModal">Read More</button>
                                    </div>
                                    <div @click="navigateFollow()">
                                        <div class="card-footer border-0 bg-white activity_card_footer">
                                            <div class="row row-cols-4">
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                    <div class="text-center like_div like_div_about">
                                                        <img v-if="token == null" src="images/ic_unfavorite_24px.svg"
                                                            class="footer_img" alt="...">
                                                        <img v-else :src="getImageUrl(res)"
                                                            @click="manageLikeAppeal(res, res.type, res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                                            class="footer_img" id="unLike_fav" alt="...">
                                                        <br><span class="icon_font">{{ res.total_like == null ? 0 :
                                    res.total_like }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                    <div class="text-center save_div">
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
                                                    <div class="text-center view_div">
                                                        <img src="images/ic_visibility_24px.svg" class="footer_img_view"
                                                            alt="...">
                                                        <br><span class="icon_font">{{ res.total_view == null ? 0 :
                                    res.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                    <div class=" text-center share_div" >
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
                                            <label class="post_uploaded_label px-4">{{ formatTimeAgo(res.created_at) }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="modal" id="myNewzModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close"><i
                            class="bi bi-x-lg"></i></button>
                    <div class="modal-body" style="padding-bottom: 0%;">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                <div v-if="get_news.banner.length > 0" class="swiper slider">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in get_news.banner" :key="index" class="swiper-slide"
                                            v-show="index === selectedImageIndex">
                                            <img :src="res.original_url" class="image_slider img-fluid"
                                                :title="org_title" :alt="org_title">
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper slider" v-else>
                                    <div class="swiper-wrapper">
                                        <div class="swiper-slide">
                                            <img src="images/jd_card_logo.png" :alt="org_title" :title="org_title"
                                                class="image_slider img-fluid">
                                        </div>
                                    </div>
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-3 m-1" v-if="get_news.banner.length > 0">Gallery</label>
                                <div class="swiper thumbnail">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in get_news.banner" :key="index" class="swiper-slide">
                                            <img :src="res.original_url" alt="..." class="image_slider_down img-fluid"
                                                @click="selectImage(index)">
                                        </div>
                                    </div>
                                    <div v-if="get_news.banner.length > 3" class="next_div" @click="nextSlide"><i
                                            class="bi bi-chevron-right"></i></div>
                                    <div v-if="get_news.banner.length > 3" class="prev_div" @click="prevSlide"><i
                                            class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <!-- <swiper></swiper> -->
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-auto g-0">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <img :src="`${logo.original_url ? logo.original_url : 'images/jd_card_logo.png'}`"
                                                        class="modal_card_head_img" :title="org_title" :alt="org_title">
                                                </div>
                                                <div class="col-md-6 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4">
                                                    <label
                                                        class="modal_card_head_title margin_left text-truncate mt-2  ms-2"
                                                        :title="org_title">{{ org_title }}</label>
                                                </div>
                                                <div
                                                    class="col-md-4 col-lg-4 col-sm-4 col-lg-4 col-xl-4 col-xs-4 ms-auto ">
                                                    <button class="btn_following btn_following_modal btn "
                                                        @click="navigateFollow()" type="submit">Follow</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body p-2">
                                            <label class="card_modal_body-title px-2">{{ title }}</label>
                                            <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': get_news.banner.length > 0 }">
                                                <p class="card_modal_body_details p-2" v-html="detail">
                                                </p>
                                                <br><label class="card_modal_date p-2" v-if="start_date_and_time">
                                                    <img src="images/ic_timer_24px.svg" class="location_icon mx-2"
                                                        alt="...">{{ start_date_and_time }}</label>
                                                <br>
                                                <p v-if="location"><img src="images/ic_place_24px.svg"
                                                        class="loation_icon mx-2 ms-3" alt="..."><label
                                                        class="card-modal_location p-2 ">{{ location }}</label></p>
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
                                                            get_news.total_like == null ? 0 :
                                                            get_news.total_like }}</span>
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
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img src="images/ic_visibility_24px.svg" class="footer_img_view"
                                                            alt="...">
                                                        <br><span class="icon_font">{{ total_view == null ? 0 :
                                                            total_view }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
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
    </div>
</template>

<script>
import indexService from "../../../services/index.service";
import activityService from '../../../services/activity.service';
import { sendToWhatsApp } from '../../../utils/sharefunction.js';
import { handleLike, handleSave } from '../../../common/common';
import afterLoginHomeService from "../../../services/afterLoginHome.service";
import { initializeThumbnailExplore , initializeSliderExplore }  from '../../../utils/swiper.js';
import moment from 'moment';

export default {
    name: "App",
    data() {
        return {
            selectedImageIndex: 0,total_count:'',
            token: localStorage.getItem('storeToken'), latestActivitiesNews: [], latestActivitiesEvent: [],
            get_news: { banner: [] }, img: [], title: '', logo: '', detail: '', location: '', start_date_and_time: '', total_like: '', total_view: '', org_title: '',
            info: '', name: '', mobile: '', message: '', successmessage: '', nameErr: '', mobileErr: '', messageErr: '',
            latestActivitiesAppeal: [], templeSanstha: [], munisevaSanstha: [], dharamshalaSanstha: [],
        };
    },
    methods: {
        formatTimeAgo(date) {
            return moment(date).fromNow();
        },
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        nextSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slideNext();
        },
        prevSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slidePrev();
        },
        btoa(input) {
            return btoa(input);
        },
        selectImage(index) {
            this.selectedImageIndex = index;
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
                ...this.latestActivitiesNews[index],
                get_user_likes: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.latestActivitiesNews, index, updatedItem);
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
        async manageLikeEvent(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count == null ? 0 : like_count + 1 : like_count - 1;
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
                ...this.latestActivitiesNews[index],
                get_user_save_posts: { is_save: newIsSave },
            };
            this.$set(this.latestActivitiesNews, index, updatedItem)
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
        getImageLike() {
            if (this.get_news.get_user_likes == null) {
                return '/images/ic_unfavorite_24px.svg';
            } else if (this.get_news.get_user_likes.is_like === 1) {
                return '/images/ic_favorite_24px.svg';
            } else {
                return '/images/ic_unfavorite_24px.svg';
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
            if(this.typePo == "News"){
                const newsIndex = this.latestActivitiesNews.findIndex(explore => explore.id === this.get_news.id);
                if (newsIndex !== -1) {
                    this.$set(this.latestActivitiesNews[newsIndex], 'total_like', newLikeCount); // Update total_like
                    if (this.latestActivitiesNews[newsIndex].get_user_likes) {
                        this.$set(this.latestActivitiesNews[newsIndex].get_user_likes, 'is_like', newIsLike);
                    } else {
                        this.$set(this.latestActivitiesNews[newsIndex], 'get_user_likes', { is_like: newIsLike });
                    }
                }
            }else if(this.typePo == "Events"){
                const newsIndex = this.latestActivitiesEvent.findIndex(explore => explore.id === this.get_news.id);
                if (newsIndex !== -1) {
                    this.$set(this.latestActivitiesEvent[newsIndex], 'total_like', newLikeCount); // Update total_like
                    if (this.latestActivitiesEvent[newsIndex].get_user_likes) {
                        this.$set(this.latestActivitiesEvent[newsIndex].get_user_likes, 'is_like', newIsLike);
                    } else {
                        this.$set(this.latestActivitiesEvent[newsIndex], 'get_user_likes', { is_like: newIsLike });
                    }
                }
            }else if(this.typePo == "Appeal"){
                const newsIndex = this.latestActivitiesAppeal.findIndex(explore => explore.id === this.get_news.id);
                if (newsIndex !== -1) {
                    this.$set(this.latestActivitiesAppeal[newsIndex], 'total_like', newLikeCount); // Update total_like
                    if (this.latestActivitiesAppeal[newsIndex].get_user_likes) {
                        this.$set(this.latestActivitiesAppeal[newsIndex].get_user_likes, 'is_like', newIsLike);
                    } else {
                        this.$set(this.latestActivitiesAppeal[newsIndex], 'get_user_likes', { is_like: newIsLike });
                    }
                }
            }
            await handleLike(newIsLike, this.typePo, this.poId);
        },
        getSaveImageMore() {
            if (this.get_news.get_user_save_posts == null) {
                return '/images/ic_add_box_24px.svg';
            } else if (this.get_news.get_user_save_posts.is_save === 1) {
                return '/images/ic_add_fav_box_24px.svg';
            } else {
                return '/images/ic_add_box_24px.svg';
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
        async activate(resId, resType) {
            const data = {
                params: {
                    id: resId,
                    store_type: resType
                }
            }
            const response = await activityService.newsDetails({ ...data });
            if (response.status === 200 || 201) {
                this.get_news = response;
                this.typePo = response.type;
                this.poId = response.id;
                this.img = response.banner;
                this.title = response.title;
                this.detail = response.detail;
                this.location = response.location; this.start_date_and_time = response.start_date_and_time;
                this.total_like = response.total_like; this.total_view = response.total_view;
                this.org_title = response.organization.title;
                this.logo = response.organization.logo[0];

            } else {
                console.error("Something went wrong")
            }
        },
        async getTempleFilter() {
            const response = await indexService.indexTemple()
            if (response.status === 200 || 201) {
                this.templeSanstha = response.data;
            } else {
                console.error("Something went wrong")
            }
        },
        async getMuniSevaFilter() {
            const response = await indexService.indexMuniSeva()
            if (response.status === 200 || 201) {
                this.munisevaSanstha = response.data;
            } else {
                console.error("Something went wrong")
            }
        },
        async getDharmshalaFilter() {
            const response = await indexService.indexDharamshala()
            if (response.status === 200 || 201) {
                this.dharamshalaSanstha = response.data;
            } else {
                console.error("Something went wrong")
            }
        },
        async getActivities() {
            const response = await indexService.indexActivity()
            if (response.status === 200 || 201) {
                this.latestActivitiesNews = response.news;
                this.latestActivitiesEvent = response.event;
                this.latestActivitiesAppeal = response.appeal;
            } else {
                console.error("Something went wrong")
            }
        },
        navigate() {
            window.location.href = 'sanstha-list';
        },
        navigateActivity() {
            window.location.href = 'sanstha-activty';
        },
        navigateFollow() {
            this.token = localStorage.getItem('storeToken');
            if (this.token == null) {
                window.location.href = 'home-login';
            }
        },
    },
    mounted() {
        const thumbnail = initializeThumbnailExplore();
        initializeSliderExplore(thumbnail);
    },
    beforeMount() {
        this.successmessage = '';
        this.getActivities();
        this.getTempleFilter();
        this.getMuniSevaFilter();
        this.getDharmshalaFilter();
        // this.getSansthasCategory();
    },
};
</script>