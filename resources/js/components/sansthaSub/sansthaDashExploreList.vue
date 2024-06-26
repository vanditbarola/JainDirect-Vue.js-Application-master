<template>
    <div x-data="app()" x-cloak>
        <section class="dashboard_tab_section mt-3">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-xs-12 col-md-12 col-lg-7 col-xl-7 col-xxl-7 mt-1 filter_post_card_col">
                        <!-- <div class="card filter_post_card">
                            <div class="filter_post_card1">
                                <label class="filter_post_card_title">Posts</label>
                                <b-dropdown text="Filters" v-model="selectItemFilter"
                                    :text="selectItemFilter ? selectItemFilter : 'Filters'"
                                    class="filter_post_card_button" no-caret>
                                    <b-dropdown-item @click="updateFilter('News')">
                                        <li><a class="dropdown-item" href="#">News</a></li>
                                    </b-dropdown-item>
                                    <b-dropdown-item @click="updateFilter('Events')">
                                        <li><a class="dropdown-item" href="#">Events</a> </li>
                                    </b-dropdown-item>
                                    <b-dropdown-item @click="updateFilter('Appeals')">
                                        <li><a class="dropdown-item" href="#">Appeals</a></li>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div> -->
                        <div class="row g-3">
                            <div class="col-12" v-for='(res, index) in exploreSanstha'>
                                <div class="card h-100 p-2 mt-2 inner_login_cards">
                                    <div class="ribbon-wrapper">
                                        <div :class="{
                                'card-badge-appeal': res.type === 'appeal',
                                'card-badge-event': res.type === 'event',
                                'card-badge-news': res.type === 'news'
                            }" :id="res.type">
                                            <template v-if="res.type === 'appeal'">Appeals</template>
                                            <template v-else-if="res.type === 'event'">Events</template>
                                            <template v-else-if="res.type === 'news'">News</template>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="ps-4 d-flex">
                                            <a class="view_all_latestact" :href="`/sanstha-detail/${lastParam}`">
                                                <img :src="`${res.organization.logo ? res.organization.logo[0] ? res.organization.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                    class="getallimg img-fluid"  :title="get_sanstha.title" :alt="get_sanstha.title">
                                                <span class="d-inline-block text-truncate getallhead"
                                                    :title="res.organization.title" alt="Organization Title"> {{
                                res.organization.title }}</span>
                                            </a>
                                            <!-- <div class="more_option_in_cards">
                                                <b-dropdown text="" class="sanstha_dashboard_more_tab_cards" no-caret>
                                                    <b-dropdown-item>
                                                        <li><a class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#editModalDashboard" @click="getEditId(res.id, res.type)">
                                                        <img src="/images/edit.svg" class="card_option_edit" alt="..."> Edit</a> </li>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item>
                                                        <li><a class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#deleteModalDashboard">
                                                        <img src="/images/delete.svg" class="card_option_edit" alt="...">Delete</a></li>
                                                    </b-dropdown-item>
                                                </b-dropdown>
                                            </div> -->
                                        </div>
                                    </div>
                                    <!-- <div class="modal" id="editModalDashboard">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <button type="button" class="btn_close btn_close_edit"
                                                    data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                                                <label class="discard1 mt-3">Are you sure you want to edit?</label>
                                                <div class="d-flex justify-content-center mt-4 mb-4">
                                                    <button type="submit" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                                    <button type="submit" class="popup_post ms-5" data-bs-target="#editNewsAbout" data-bs-toggle="modal" @click="getParticularSansthaNews()">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal" id="deleteModalDashboard">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <button type="button" class="btn_close btn_close_edit"
                                                    data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                                                <label class="discard1 mt-3">Are you sure you want to delete this post?</label>
                                                <div class="d-flex justify-content-center mt-4 mb-4">
                                                    <button type="submit" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                                    <button type="submit" class="popup_post ms-5" data-bs-dismiss="modal">DELETE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div> -->

                                    <div class="card-body card_body_event" style="margin-top: -10px;">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                            class="getallnewsimg card-img-top img-fluid m-1 text-center"  :title="get_sanstha.title" :alt="get_sanstha.title">
                                        <div class="activity_card_body p-1">
                                            <label class="card_header">{{ res.title }}</label>
                                            <p class="section_body" style="margin-bottom: -20px;" v-html="res.detail"></p>
                                            <a class="read_more1 px-1" data-bs-target="#myReadNewzModal1"
                                                data-bs-toggle="modal" @click="getDataById(res.id, res.type)"
                                                style="margin-left:-4px;">Read More...</a><br>
                                            <br><label class="card_modal_date">
                                                <img src="/images/ic_timer_24px.svg" v-if="res.type == 'event'"
                                                    class="loation_icon mx-2" alt="...">
                                                {{ formatDate(res.start_date_and_time) + ' - ' +
                                formatDate1(res.end_date_and_time) }}
                                            </label>
                                            <br><label class="card-modal_location py-1">
                                                <img src="/images/ic_place_24px.svg" v-if="res.location"
                                                    class="loation_icon mx-2" alt="...">{{ res.location
                                                }}</label>
                                        </div>
                                    </div>
                                    <div class="card-footer border-0 bg-white  activity_card_footer">
                                        <div class="row row-cols-4 footer_dashboard">
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                                <div class="text-center" style="margin-left: -45px;">
                                                    <img :src="getImageUrl(res)"
                                                        @click="manageLike(res, res.type, res.id, res.get_user_like == null ? is_like = 0 : res.get_user_like.is_like, res.total_like, index)"
                                                        class="footer_img" id="unLike_fav" alt="...">
                                                    <br><span class="icon_font">{{ res.total_like == null ? 0 :
                                res.total_like }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center" style="margin-left: -21px;">
                                                    <a class="view_all_latestact">
                                                        <img :src="getSaveImageUrl(res)"
                                                            @click="manageSave(res, res.type, res.id, res.get_user_save_post == null ? is_save = 0 : res.get_user_save_post.is_save, index)"
                                                            class="footer_img" alt="...">
                                                        <br>
                                                        <span
                                                            v-if="res?.get_user_save_post?.is_save == 1"
                                                            class="icon_font">Saved
                                                            Post</span>
                                                        <span v-else class="icon_font">Save Post</span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class="text-center" style="margin-left: 16px;">
                                                    <img src="/images/ic_visibility_24px.svg" class="footer_img_view"
                                                        alt="...">
                                                    <br><span class="icon_font">{{ res.total_view == null ? 0 :
                                res.total_view }}</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                                <div class=" text-center" style="margin-left: 20px;">
                                                    <a class="view_all_latestact" id="share" :href="`/sharepostcad?id=${btoa(res.id)}&type=${btoa(res.type)}`" target="_blank"  @click.prevent="sendToWhatsApp(res.organization.title,`/sharepostcard?id=${btoa(res.id)}&type=${btoa(res.type)}`)">
                                                        <img src="/images/Logo-WhatsApp@2x.png"class="footer_img footer_img_share" alt="...">
                                                        <br><span class="icon_font">Share</span>
                                                    </a>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <infinite-loading @distance="1" @infinite="getExploreMoreList"></infinite-loading> -->
                        </div>
                    </div>
                    <div class="col-sm-12 col-xs-12 col-md-12 col-lg-5 col-xl-5 col-xxl-5  mt-1 about_card_col">
                        <div class="card dashboard_about_card px-3 pb-2">
                            <div class="dashboard_about_card1 mt-2" v-if="get_sanstha.detail">
                                <label class="dashboard_about_card_title">About</label>
                                <button class="dashboard_about_card_btn">
                                    <i class="bi bi-translate m-1" style="font-size: 14px;"></i>Show Original
                                    Text</button>
                            </div>
                            <p class="dashboard_about_card_details " v-if="get_sanstha.detail">{{ get_sanstha.detail }}
                            </p>
                            <div class="dashboard_about_card_address mt-3">
                                <div class="dashboard_about_card_address1 d-flex">
                                    <img src="/images/ic_place_24px.svg" alt="..." class="loation_icon1">
                                    <span class="location_place">{{ get_sanstha.location + ',' }} {{ get_sanstha.cities
                                ?
                                get_sanstha.cities.name : "" }} {{ get_sanstha.states ? get_sanstha.states.name :
                                "" }} {{
                                get_sanstha.pincode }}</span>
                                </div>
                            </div>
                            <div class="dashboard_about_card_address">
                                <div class="dashboard_about_card_address1 d-flex">
                                    <img :src="get_sanstha.topic_type ? get_sanstha.topic_type.media ? get_sanstha.topic_type.media[0] ? get_sanstha.topic_type.media[0].original_url : '/images/museum.png' : '/images/museum.png' : '/images/museum.png'"
                                        alt="..." class="temple_icon">
                                    <span class="location_place">{{ get_sanstha.topic_type.title }}</span>
                                </div>
                            </div>
                        </div>
                        <sansthaDashCommittee></sansthaDashCommittee>
                        <div v-if="get_sanstha.facebook || get_sanstha.youtube || get_sanstha.instagram"
                            class="card dashboard_followus mt-2 px-3">
                            <label class="dashboard_about_card_title mt-2">Follow us on</label>
                            <div class="follows_us_div">
                                <div v-if="get_sanstha.facebook != null">
                                    <a :href="facebookLink">
                                        <img class="follow mx-3 my-2" src="/images/facebook.png" alt="...">
                                    </a>
                                </div>
                                <div v-if="get_sanstha.youtbue != null">
                                    <a :href="youtubeLink">
                                        <img class="follow mx-3 my-2" src="/images/youtube.png" alt="...">
                                    </a>
                                </div>
                                <div class="col" v-if="get_sanstha.instagram != null > 0">
                                    <a :href="instaLink">
                                        <img class="follow mx-3 my-2" src="/images/insta.png" alt="...">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="modal" id="editNewsAbout" tabindex="-1" aria-labelledby="editNewsAbout" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                        aria-label="Close" alt="..." @click="clearField()">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                <div class="card image_upload_card mx-3 my-3">
                                    <form>
                                        <label for="file-input5" class="file_upload_modal">
                                            <img :src="selectedImageURL5 ? selectedImageURL5 : frm_img ? frm_img : '/images/jd_card_logo.png'"
                                                class="file_img_edit" alt="...">
                                            <input type="file" id="file-input5" name="filename" hidden multiple
                                                @change="handleFileChange5" ref="fileInput5">
                                            <br><label class="file_upload_modal_title"> Upload Photos &
                                                Videos</label>
                                        </label>
                                    </form>
                                </div>
                                <div id="filewrapper">
                                    <label class="uploaded_photos_title mx-3">Uploaded Photos</label>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col px-4 ">
                                <div class="mx-1 mt-3 " style=" display: flex;">
                                    <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                        class="img_modal" alt="...">
                                    <label class="img_modal_title">{{ org_title }}</label>
                                </div>
                                <label class="head_event_descr mt-4">Title<span class="required mx-1">*</span></label>
                                <input type="text" class="mt-1 start_date_input form-control"
                                    placeholder="Enter News Title" v-model="newsData.title">
                                <!-- <div style="color: red;">{{ this.titleErr }}</div> -->
                                <label class="head_event_descr mt-4">News Description</label>
                                <div ref="editorExpl1" id="editorExpl1">
                                </div>
                                <form class="row ">
                                    <div class="mt-4">
                                        <label class="head_event_descr">Post visibility<span
                                                class="required mx-1">*</span></label>
                                        <div class="media_visiablity_div">
                                            <input class="mediaVisibility_input" type="radio" name="mediaNews"
                                                id="mediaEditNewsMember" v-model="newsData.post_visiblity" :value=1>
                                            <label class="form-check-label mediaTrue_label" for="mediaEditNewsMember"
                                                :checked="newsData.post_visiblity === 1">Member</label>

                                            <input class="mediaVisibility_input ms-2" type="radio" name="mediaNews"
                                                id="mediaEditNewsPublic" v-model="newsData.post_visiblity" :value=0>
                                            <label class="form-check-label mediaTrue_label" for="mediaEditNewsPublic"
                                                :checked="newsData.post_visiblity === 0">Public</label>
                                        </div>
                                        <!-- <div style="color: red;">{{ this.post_error }}</div> -->
                                    </div>

                                    <div class="col-12 mb-5 mt-4 popup_footer">
                                        <button type="button" class="popup_cancel" data-bs-dismiss="modal"
                                            @click="clearField()">CANCEL</button>
                                        <button type="button" class="popup_post" data-bs-toggle="modal"
                                            data-bs-target="" @click="updateDashSanstha()">UPDATE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="myReadNewzModal1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close"><i
                            class="bi bi-x-lg"></i></button>
                    <div class="modal-body" style="padding-bottom: 0%;">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                <div class="swiper slider" v-if="img.length > 0">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in img" :key="index"
                                            v-show="index === selectedImageIndex" class="swiper-slide">
                                            <img :src="res.original_url ? res.original_url : 'images/jd_card_logo.png'"
                                                class="image_slider img-fluid" :alt="org_title" :title="org_title">
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="swiper slider">
                                    <img src='/images/jd_card_logo.png' class="image_slider img-fluid" :alt="org_title" :title="org_title">
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-2 m-1" v-if="img.length > 0">Gallery</label>
                                <div class="swiper thumbnail thumbnailSansthaExplore">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in  img" :key="index" class="swiper-slide">
                                            <img :src="res.original_url" alt="..." class="image_slider_down img-fluid"
                                                @click="selectImage(index)">
                                        </div>
                                    </div>
                                    <div class="next_div" v-if="img.length > 3" @click="nextSlideSnsthaExplore"><i
                                            class="bi bi-chevron-right"></i></div>
                                    <div class="prev_div" v-if="img.length > 3" @click="prevSlideSnasthaExplore"><i
                                            class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-3 g-0 ">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${lastParam}`">
                                                    <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                        class="modal_card_head_img" :alt="org_title" :title="org_title">
                                                        </a>
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${lastParam}`">
                                                    <label
                                                        class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                        :title="org_title">{{ org_title }}</label>
                                                        </a>
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4  ms-auto ">
                                                    <button class="btn btn_following btn_following_modal"
                                                        @click="manageFollowMore()" type="submit"><img
                                                            :src="getFollowImageMore()" class="flw_btn_img"
                                                            alt="..."></button>
                                                </div>
                                            </div>
                                        </div><!--end of card head-->
                                        <div class="card-body p-2 ">
                                            <label class="card_modal_body-title px-2">{{ dash_sanstha.title }} </label>
                                            <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': img.length > 0 }">
                                                <p class="card_modal_body_details p-2" v-html="dash_sanstha.detail"></p>
                                                <label v-if="dash_sanstha.type == 'Events'" class="card_modal_date py-2">
                                                <img src="/images/ic_timer_24px.svg" class="location_icon mx-2"
                                                    alt="...">
                                                {{ formatDate(dash_sanstha.start_date_and_time) + ' - ' +
                                formatDate1(dash_sanstha.end_date_and_time) }}
                                            </label><br>
                                            <label v-if="dash_sanstha.type == 'Events'"
                                                class="card-modal_location py-2 "><img src="images/ic_place_24px.svg"
                                                class="loation_icon mx-2 " alt="...">{{
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
                                                            <br><span class="icon_font">Save Post</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img src="/images/ic_visibility_24px.svg" class="footer_img_view"
                                                            alt="...">
                                                        <br><span class="icon_font ">{{ dash_sanstha.total_view == null
                                                            ? 0 : dash_sanstha.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class=" text-center">
                                                        <a class="view_all_latestact"  id="share" :href="`/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`" target="_blank" @click.prevent="sendToWhatsApp(org_title , `/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`)">
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
</template>
<script>



import sansthaDetailService from '../../../services/sansthaDetail.service';
import { handleLike, handleSave } from '../../../common/common';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { sendToWhatsApp } from '../../../utils/sharefunction.js';

export default {
    name: "App",
    data() {
        return {
            facebookLink: '', instaLink: '', youtubeLink: '', resExType: '', dash_sanstha: [], img: '', selectedImageIndex: 0, org_logo: '',
            newsTitle: '', post_error: '', newsPost_visiblity: '', typeTp: '',
            selectedImageURL5: '', selectedImageURL: '', org_title: '', org_logo: '', org_detail: '', frm_img: '', newsData: [], news_id: '', news_del_id: '', selectItemFilter: '', get_sanstha: [], event_page: 1, eventSanstha: [], total_count: '', newsSanstha: [], news_page: 1, message: '', exploreSanstha: [], total_count: '', news_page: 1,lastParam:''
        };
    },
    mounted() {
        const thumbnailSansthaExplore = new Swiper('.thumbnailSansthaExplore', {
            slidesPerView: 'auto',
        });

        const slider = new Swiper('.slider', {
            loop: true,
            grabCursor: true,
            thumbs: {
                swiper: thumbnailSansthaExplore
            },
        });
    },
    updated() {
        try {
            if (!this.quill1 && this.$refs.editorExpl1) {
                this.quill1 = new Quill(this.$refs.editorExpl1, {
                    modules: {
                        toolbar: [
                            [{ 'font': [] }],
                            ["bold", "italic", "underline", "strike"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['blockquote', 'code-block'],
                            ["image", "link", "video"]
                        ]
                    },
                    placeholder: 'Enter Description',
                    theme: 'snow'
                });
            }
        } catch (error) {
            console.error("Error initializing Quill:", error);
        }
    },
    methods: {
        selectImage(index) {
            this.selectedImageIndex = index;
        },
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        btoa(input) {
            return btoa(input);
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
                this.typePo = this.dash_sanstha.type
                this.startDate = this.dash_sanstha.start_date_and_time
                this.endDate = this.dash_sanstha.end_date_and_time
            } else {
                console.error("Something went wrong")
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
            const newsIndex = this.exploreSanstha.findIndex(explore => explore.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                this.$set(this.exploreSanstha[newsIndex], 'total_like', newLikeCount); // Update total_like
                if (this.exploreSanstha[newsIndex].get_user_likes) {
                    this.$set(this.exploreSanstha[newsIndex].get_user_like, 'is_like', newIsLike);
                } else {
                    this.$set(this.exploreSanstha[newsIndex], 'get_user_like', { is_like: newIsLike });
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
            const newsIndex = this.exploreSanstha.findIndex(explore => explore.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.exploreSanstha[newsIndex].get_user_save_posts) {
                    this.$set(this.exploreSanstha[newsIndex].get_user_save_post, 'is_save', newIsSave);
                } else {
                    this.$set(this.exploreSanstha[newsIndex], 'get_user_save_post', { is_save: newIsSave });
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
            const newsIndex = this.exploreSanstha.findIndex(explore => explore.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.exploreSanstha[newsIndex].get_user_org_follows) {
                    this.$set(this.exploreSanstha[newsIndex].get_user_org_follows, 'is_follow', newIsFollow);
                } else {
                    this.$set(this.exploreSanstha[newsIndex], 'get_user_org_follows', { is_follow: newIsFollow });
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
        nextSlideSnsthaExplore() {
            const thumbnailSansthaExplore = document.querySelector('.thumbnailSansthaExplore').swiper;
            thumbnailSansthaExplore.slideNext();
        },
        prevSlideSnasthaExplore() {
            const thumbnailSansthaExplore = document.querySelector('.thumbnailSansthaExplore').swiper;
            thumbnailSansthaExplore.slidePrev();
        },
        getDataById(resId, resType) {
            console.log("getDataById", resId, resType)
            this.about_id = resId
            if (resType === 'news') {
                this.resExType = "News";
            } else if (resType === 'event') {
                this.resExType = "Events";
            } else if (resType === 'appeal') {
                this.resExType = "Appeal";
            } else if (resType === 'video') {
                this.resExType = "Video";
            } else {
                this.resExType = null;
            }
            // this.$emit('about-id', { id: this.about_id, type: this.resExType });

            if (this.about_id && this.resExType) {
                this.getTypedSanstha();
            }

        },
        async activate() {
            const url = window.location.href;
            this.lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: this.lastParam
                }
            }
            const response = await sansthaDetailService.getSanstha({ ...data });
            this.get_sanstha = response;
            this.facebookLink = response.facebook
            this.instaLink = response.instagram
            this.youtbueLink = response.youtube

        },
        handleFileChange5() {
            const fileInput5 = this.$refs.fileInput5;
            if (fileInput5.files && fileInput5.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = fileInput5.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedImageURL5 = URL.createObjectURL(fileInput5.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    fileInput5.value = "";
                }
            }
        },
        async getParticularSansthaNews() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    store_type: this.typeTp,
                    id: this.news_id,
                }
            }
            const response = await sansthaDetailService.getDetailSanstha({ ...data });
            if (response.status == 200 || response.status == 201) {
                this.newsData = response;
                this.org_title = response.organization.title;
                this.org_logo = response.organization.logo[0].original_url;
                this.frm_img = response.banner[0].original_url;
                if (this.newsData.detail && this.newsData.detail.ops) {
                    this.quill1.setContents(this.newsData.detail);
                } else {
                    this.quill1.setText(this.newsData.detail);
                }
            } else {
                console.error("Something went wrong");
            }
        },
        async updateDashSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
            const spaceRegex = /^\S.*$/;

            if (!this.newsData.title) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.newsData.title)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.newsData.title)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (!this.newsData.post_visiblity) {
                this.post_error = 'Please select any one visibility';
                return;
            }
            if (this.titleErr) {
                return;
            }

            const data = {
                organization_id: lastParam,
                post_visiblity: this.newsData.post_visiblity,
                title: this.newsData.title,
                detail: this.quill1.getText(),
                is_active: 1,
                content_language_id: 1,
                created_by_id: userId
            };
            try {
                const response = await sansthaDetailService.updateNewsSanstha(this.news_id, data);
                if (response.status == 200 || response.status == 201 || response.status == 202) {
                    if (this.$refs.fileInput1.files[0]) {
                        const formData = new FormData();
                        formData.append('model_id', this.news_id);
                        formData.append('file', this.$refs.fileInput1.files[0]);
                        const response1 = await sansthaDetailService.addNewsMedia(formData);
                        if (response1.status === 200 || 201 || 202) {
                            this.$forceUpdate();
                            const updatedNewsIndex = this.newsSanstha.findIndex(news => news.id === this.news_id);
                            if (updatedNewsIndex !== -1) {
                                this.$set(this.newsSanstha[updatedNewsIndex], 'title', response.data.title);
                                this.$set(this.newsSanstha[updatedNewsIndex], 'detail', response.data.detail);
                                this.$set(this.newsSanstha[updatedNewsIndex], 'banner', [{ original_url: response1.original_url }]);
                            }
                            $('#editNews').modal('hide');
                            this.$toast.success("News updated successfully");
                            this.selectedImageURL = ''
                        } else {
                            this.$toast.error('Please set proper address!');
                        }
                    } else {
                        $('#editNews').modal('hide');
                        this.selectedImageURL = ''
                        this.$toast.success("News updated successfully");
                        const updatedNewsIndex = this.newsSanstha.findIndex(news => news.id === this.news_id);
                        if (updatedNewsIndex !== -1) {
                            this.$set(this.newsSanstha[updatedNewsIndex], 'title', response.data.title);
                            this.$set(this.newsSanstha[updatedNewsIndex], 'detail', response.data.detail);
                        }
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        clearField() {
            this.selectedImageURL5 = "";
        },

        getEditId(resId, resType) {
            this.news_id = resId,
                this.typeTp = resType
            if (resType == "news") {
                this.typeTp = "News";
            } else if (resType == "event") {
                this.typeTp = "Events";
            } else if (resType == "appeal") {
                this.typeTp = "Appeal";
            } else if (resType == "video") {
                this.typeTp = "Video";
            }
        },
        updateFilter(filterText) {
            this.selectItemFilter = filterText;
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
        async getExploreMoreList($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getExploreSansthaList({ ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.exploreSanstha.push(value);
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
        async manageLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.exploreSanstha[index],
                get_user_like: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.exploreSanstha, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.exploreSanstha[index],
                get_user_save_post: { is_save: newIsSave },
            };
            this.$set(this.exploreSanstha, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
        },
    },

    beforeMount() {
        this.getExploreMoreList();
        this.activate();
    }
}
</script>