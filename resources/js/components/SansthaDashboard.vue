<template>
    <div x-data="app()" x-cloak>
        <sansthaheader-component></sansthaheader-component>
        <section class="pt-3">
            <div class="container">
                <div class="row main_layout mt-2  mb-3 g-2 m-1 pb-5">
                    <div class="col-md-4 col-lg-3 col-xl-3 col-xxl-3 col-sm-12 col-xs-12 left_layout left_layout1">
                        <login-sidebar></login-sidebar>
                    </div>
                    <div class="col-md-8 col-lg-9 col-xl-9 col-xxl-9 col-sm-12 col-xs-12 center_layout center_layout1"
                        id="center-layout">
                        <section class="mt-1 login_flow  pb-2 center_dashboard1">
                            <div class="container">
                                <div class="sanstha_dashboard">
                                    <div class="row sansathadashboard1 px-md-3 px-lg-4 px-xl-4 px-xxl-4 mx-1">
                                        <div class="col">
                                            <a href="/">
                                                <img src="/images/sansathdashboard_home.svg"
                                                    class="sanstha_dashboard_icons" alt="...">
                                                <span class="sansthadashboard_tabs">Home</span></a>
                                        </div>
                                        <div class="col sanstha_dashboard1">
                                            <a class="edit_sanstha_modal" type="button" data-bs-toggle="modal"
                                                data-bs-target="#editSansthaModal" @click="getSansthaDetail()">
                                                <img src="/images/sansath_dashbaoard_edit.svg"
                                                    class="sanstha_dashboard_icons" alt="...">
                                                <span class="sansthadashboard_tabs" >Edit
                                                    Sanstha</span>
                                            </a>
                                        </div>
                                        <!-- <div class="col" style="white-space: nowrap;">
                                            <img src="/images/sansathadashboard_setting.svg" class="sanstha_dashboard_icons"
                                                alt="...">
                                            <span class="sansthadashboard_tabs">Setting</span>
                                        </div> -->
                                        <div class="col sanstha_dashboard2">
                                            <a :href="'/sanstha-detail/' + this.lastParam" class="edit_sanstha_modal"
                                                type="button">
                                                <img src="/images/sansathadashboard_preview.svg"
                                                    class="sanstha_dashboard_icons" alt="...">
                                                <span class="sansthadashboard_tabs">Preview</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="sanstha_dashboard_imagebg px-md-4 px-lg-4 px-xl-4 px-xxl-4">
                                    <img :src="`${selectedCoverURL ? selectedCoverURL : get_sanstha.banner ? get_sanstha.banner[0] ? get_sanstha.banner[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                        class="dashboard_cover_img">
                                    <div class="row mx-1">
                                        <div
                                            class="col-md-6 col-sm-12 col-xs-12 col-lg-4 col-xl-4 col-xxl-4 sanstha_dashboard_imagebg_col1 ">
                                            <img :src="`${selectedProfileURL ? selectedProfileURL : get_sanstha.logo ? get_sanstha.logo[0] ? get_sanstha.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                class="Sanstha_dashboard_img1" alt="...">
                                            <div class="img_text">
                                                <label for="profileInput" class="">
                                                    <img src="/images/ic_add_a_photo_24px.svg"
                                                        class="Sanstha_dashboard_img2" alt="...">
                                                </label>
                                                <input type="file" id="profileInput" @change=" setLogoImg()"
                                                    name="filename" style="display: none;" ref="profileInput">
                                                <label class="sanstha_dashboard_change_photo_title">Change <br>Sanstha
                                                    logo</label>
                                            </div>
                                        </div>
                                        <div
                                            class="col-md-4 col-sm-12 col-xs-12 col-lg-4 col-xl-4 col-xxl-4  sanstha_dashboard_imagebg_col2">
                                            <div class="sanstha_cover">
                                                <label for="coverInput" class="sanstha_dashboard_img3">
                                                    <img src="/images/ic_add_a_photo_24px.svg" alt="...">
                                                </label>
                                                <input type="file" id="coverInput" @change="setCoverImg()"
                                                    name="filename1" style="display: none;" ref="coverInput">
                                                <label class="sanstha_dashboard_change_photo_title1">Change Sanstha
                                                    cover
                                                    photo</label>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="modal" id="editSansthaModal" aria-labelledby="editSansthaModalLabel"
                                        data-bs-backdrop="static" data-bs-keyboard="false"> -->
                                    <sansthaDashEditSanstha :committee-sanstha="committeeSanstha">
                                    </sansthaDashEditSanstha>
                                    <!-- </div> -->
                                </div>
                                <div class="sanstha_dashboard_org_info px-md-4 px-lg-4 px-xl-4 px-xxl-4 pt-3 pb-3">
                                    <div class="row mx-1">
                                        <div class="col col-xxl-6 col-xl-6 cl-lg-6 col-md-12 col-12 col-xs-12 ">
                                            <label class="sanstha_dashboard_name">{{ get_sanstha.title }}</label>
                                        </div>
                                        <div class="col col-xxl-2 col-xl-2 cl-lg-2 col-md-4 col-xs-12 col-sm-4">
                                            <div class="sanstha_dashboard_followers">
                                                <a class="alinks" @click="redirectToMembershipTab">
                                                    <span class="sanstha_dashboard_followers_count">{{
                                                    get_sanstha.total_members }}</span>
                                                    <span class="sanstha_dashboard_followers_count_title">Members</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col col-xxl-2 col-xl-2 cl-lg-2 col-md-4  col-xs-12 col-sm-4">
                                            <div class="sanstha_dashboard_followers">
                                                <a class="alinks" @click="navigateFollower(get_sanstha.id)"
                                                    target="_blank">
                                                    <span class="sanstha_dashboard_followers_count">{{
                                                    get_sanstha.follower_count }}</span>
                                                    <span
                                                        class="sanstha_dashboard_followers_count_title">Followers</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col col-xxl-2 col-xl-2 cl-lg-2 col-md-4 col-xs-12 col-sm-4">
                                            <div class="sanstha_dashboard_followers">

                                                <span class="sanstha_dashboard_followers_count">{{
                                                    get_sanstha.total_page_view }}</span>
                                                <span class="sanstha_dashboard_followers_count_title">Page View</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="sanstha_dashboard_navtabs_section pt-2">
                                    <nav class="sanstha_dashboard_navtabs">
                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button class="nav-link active" id="nav-dashboard-dash-tab"
                                                data-bs-toggle="tab" data-bs-target="#nav-dashboard-dash" type="button"
                                                role="tab" aria-controls="nav-dashboard-dash" aria-selected="true">
                                                <img src="/images/about.svg" class="sanstha_dashboard_tab_icons"
                                                    alt="...">Dashboard</button>
                                            <button class="nav-link" id="nav-dashboard-news-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-dashboard-news" type="button" role="tab"
                                                aria-controls="nav-dashboard-news" aria-selected="false">
                                                <img src="/images/news.svg" class="sanstha_dashboard_tab_icons"
                                                    alt="...">News</button>
                                            <button class="nav-link" id="nav-dashboard-events-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-dashboard-events" type="button" role="tab"
                                                aria-controls="nav-dashboard-events" aria-selected="false">
                                                <img src="/images/Events.svg" class="sanstha_dashboard_tab_icons"
                                                    alt="...">Events
                                            </button>
                                            <button class="nav-link" id="nav-dashboard-video-tab" data-bs-toggle="tab"
                                                data-bs-target="#nav-dashboard-video" type="button" role="tab"
                                                aria-controls="nav-dashboard-video" aria-selected="false">
                                                <img src="/images/login_video.svg" class="shrvak_munch_tab_icons mx-2"
                                                    alt="...">Video
                                            </button>

                                            <button class="nav-link " id="nav-dashboard-gallery-tab"
                                                data-bs-toggle="tab" data-bs-target="#nav-dashboard-gallery"
                                                type="button" role="tab" aria-controls="nav-dashboard-gallery"
                                                aria-selected="true">
                                                <img src="/images/gallery.svg" class="sanstha_dashboard_tab_icons"
                                                    alt="...">Gallery
                                            </button>
                                            <button class="nav-link" id="nav-dashboard-membership-tab"
                                                data-bs-toggle="tab" data-bs-target="#nav-dashboard-membership"
                                                type="button" role="tab" aria-controls="nav-dashboard-membership"
                                                aria-selected="false">
                                                <img src="/images/membership.svg" class="sanstha_dashboard_tab_icons"
                                                    alt="...">Membership
                                            </button>
                                            <div>
                                                <b-dropdown text="More" class="sanstha_dashboard_more_tab" no-caret>
                                                    <b-dropdown-item id="nav-dashboard-appeal-tab" data-bs-toggle="tab"
                                                        data-bs-target="#nav-dashboard-appeal" type="button" role="tab"
                                                        aria-controls="nav-dashboard-appeal">
                                                        <li class="nav-item" role="presentation">
                                                            <button class="nav-link" aria-selected="false">
                                                                <img src="/images/appeal_new_icon.svg"
                                                                    class="sanstha_dashboard_tab_icons"
                                                                    alt="...">Appeal</button>
                                                        </li>
                                                    </b-dropdown-item>

                                                    <b-dropdown-item  id="nav-dashboard-committee-tab" data-bs-toggle="tab"  data-bs-target="#nav-dashboard-committee" type="button"  role="tab" aria-controls="nav-dashboard-committee" aria-selected="false" @click="navigateToCommittee()">
                                                        <li class="nav-item" role="presentation">
                                                            <button class="nav-link">
                                                                <img src="/images/commiteee.svg"
                                                                    class="sanstha_dashboard_tab_icons"
                                                                    alt="...">Committee</button>
                                                        </li>
                                                    </b-dropdown-item>
                                                    <!-- <b-dropdown-item id="nav-dashboard-library-tab"  data-bs-toggle="tab" data-bs-target="#nav-dashboard-library" type="button" role="tab" aria-controls="nav-dashboard-library"  aria-selected="false">
                                                        <li class="nav-item" role="presentation">
                                                            <button class="nav-link" <img src="/images/library.svg" class="sanstha_dashboard_tab_icons" alt="...">Library</button>
                                                        </li>
                                                    </b-dropdown-item> -->
                                                    <!-- <b-dropdown-item  id="nav-dashboard-branch-tab" data-bs-toggle="tab" data-bs-target="#nav-dashboard-branch" type="button" role="tab" aria-controls="nav-dashboard-branch" aria-selected="false">
                                                        <li class="nav-item" role="presentation">
                                                            <button class="nav-link">
                                                            <img src="/images/sanstha_branch.svg" class="sanstha_dashboard_tab_icons" alt="...">Branch</button>
                                                        </li>
                                                    </b-dropdown-item> -->
                                                    <b-dropdown-item id="nav-dashboard-custompage-tab" data-bs-toggle="tab"  data-bs-target="#nav-dashboard-custompage" type="button"    role="tab" aria-controls="nav-dashboard-custompage"  aria-selected="false">
                                                        <li class="nav-item" role="presentation">
                                                            <button class="nav-link" >
                                                                <img src="/images/custom_pages.svg"
                                                                    class="sanstha_dashboard_tab_icons" alt="...">Custom
                                                                Pages</button>
                                                        </li>
                                                    </b-dropdown-item>
                                                </b-dropdown>
                                                <button class="create_post_btn ms-3 mb-1"
                                                    style="color: #FFFFFF !important;font-size: 12px !important;font-family: 'Roboto' !important;"
                                                    data-bs-toggle="modal" data-bs-target="#CreatePostModal">
                                                    <img src="/images/create_post.svg"
                                                        class="sanstha_dashboard_tab_icons1" alt="...">Post</button>
                                            </div>
                                        </div>
                                    </nav>
                                </div>
                                <section>
                                    <div class="tab-content" id="nav-tabContent">
                                        <div class="tab-pane fade show active" id="nav-dashboard-dash" role="tabpanel"
                                            aria-labelledby="nav-dashboard-dash-tab">
                                            <sansthaDashExploreList></sansthaDashExploreList>
                                        </div>
                                        <div class="tab-pane fade" id="nav-dashboard-news" role="tabpanel"
                                            aria-labelledby="nav-dashboard-news-tab">
                                            <sansthaDashNews></sansthaDashNews>
                                        </div>
                                        <div class="tab-pane fade" id="nav-dashboard-events" role="tabpanel"
                                            aria-labelledby="nav-dashboard-events-tab">
                                            <sansthaDashEvent></sansthaDashEvent>
                                        </div>
                                        <div class="tab-pane fade" id="nav-dashboard-video" role="tabpanel"
                                            aria-labelledby="nav-dashboard-video-tab">
                                            <sansthaDashVideo></sansthaDashVideo>
                                        </div>
                                        <div class="tab-pane fade" id="nav-dashboard-gallery" role="tabpanel"
                                            aria-labelledby="nav-dashboard-gallery-tab">
                                            <sansthaDashGallery></sansthaDashGallery>
                                        </div>
                                        <div class="tab-pane fade" id="nav-dashboard-membership" role="tabpanel"
                                            aria-labelledby="nav-dashboard-membership-tab">
                                            <sansthaDashMembership></sansthaDashMembership>
                                        </div>
                                        <div class="tab-pane fade" id="nav-dashboard-appeal" role="tabpanel"
                                            aria-labelledby="nav-dashboard-appeal-tab">
                                            <sansthaDashAppeal></sansthaDashAppeal>
                                        </div>
                                        <div class="tab-pane fade" id="nav-dashboard-committee" role="tabpanel"
                                            aria-labelledby="nav-dashboard-committee-tab">
                                            <sansthaDashMoreCommitee></sansthaDashMoreCommitee>
                                        </div>
                                        <!-- <div class="tab-pane fade" id="nav-dashboard-library" role="tabpanel"
                                            aria-labelledby="nav-dashboard-library-tab">
                                            <library></library>
                                        </div> -->
                                        <div class="tab-pane fade" id="nav-dashboard-branch" role="tabpanel"
                                            aria-labelledby="nav-dashboard-branch-tab">
                                            <branch></branch>
                                        </div>
                                        <div class="tab-pane fade" id="nav-dashboard-custompage" role="tabpanel"
                                            aria-labelledby="nav-dashboard-custompage-tab">
                                            <sansthaCustomPage></sansthaCustomPage>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>

        <div class="modal" id="CreatePostModal" tabindex="-1" aria-labelledby="CreatePostModalLabel" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <div class="create_post_modal_head">Create post</div>
                        <img src="/images/modal_cancel.svg" class="cancel_btn_modal" data-bs-dismiss="modal"
                            aria-label="Close" alt="...">
                    </div>
                    <div class="modal-body">
                        <div class="container create_post_popup mt-4">
                            <form>
                                <div class="popup_radio_btns">
                                    <input type="radio" name="create_post_radio" id="create_post_news_radio"
                                        class="hidebox">
                                    <label for="create_post_news_radio" class="createpost_radio_btn_label">
                                        <img src="/images/news.svg" class="radio_btn_popup_img" alt="...">
                                        <span class="radio_btn_popup_name">News</span>
                                    </label>
                                    <input type="radio" name="create_post_radio" id="create_post_event_radio"
                                        class="hidebox">
                                    <label for="create_post_event_radio" class="createpost_radio_btn_label">
                                        <img src="/images/Events.svg" class="radio_btn_popup_img" alt="...">
                                        <span class="radio_btn_popup_name">Events</span>
                                    </label>
                                    <input type="radio" name="create_post_radio" id="create_post_appeal_radio"
                                        class="hidebox">
                                    <label for="create_post_appeal_radio" class="createpost_radio_btn_label">
                                        <img src="/images/appeal_new_icon.svg" class="radio_btn_popup_img" alt="...">
                                        <span class="radio_btn_popup_name ">Appeals</span>
                                    </label>
                                    <input type="radio" name="create_post_radio" id="create_post_video_radio"
                                        class="hidebox">
                                    <label for="create_post_video_radio" class="createpost_radio_btn_label">
                                        <img src="/images/login_video.svg" class="radio_btn_popup_img" alt="...">
                                        <span class="radio_btn_popup_name">Videos</span>
                                    </label>
                                </div>
                                <div class="popup_btn_group mt-5 mb-5">
                                    <button type="button" class="popup_btn_createpost"
                                        data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="popup_btn_createpost ms-4"
                                        id="next_modal">next</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Createpost modal-popup for News -->
        <div class="modal" id="CreateNewsModal" tabindex="-1" aria-labelledby="CreateNewsModalLabel" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <createNews></createNews>
        </div>
        <!-- Createpost modal-popup for event -->
        <div class="modal" id="CreateEventModal" tabindex="-1" aria-labelledby="CreateEventModalLabel"
            aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
            <createEvent></createEvent>
        </div>
        <!-- Createpost modal-popup for Appeal -->
        <div class="modal" id="CreateAppealModal" tabindex="-1" aria-labelledby="CreateAppealModalLabel"
            aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
            <createAppeal></createAppeal>
        </div>
        <!-- Createpost modal-popup for Video -->
        <div class="modal" id="CreateVideoModal" tabindex="-1" aria-labelledby="CreateVideoModalLabel"
            aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
            <createVideo></createVideo>
        </div>
        <div class="modal" id="ModalDiscard" tabindex="-1" aria-labelledby="ModalDiscard" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content pb-5">
                    <img src="/images/modal_cancel.svg" class="cancel_btn_CreatePost2Modal" data-bs-dismiss="modal"
                        aria-label="Close" alt="...">
                    <label class="discard1 mt-3">If you discard, your edits won't be saved.</label>
                    <div class="d-flex justify-content-center mt-4 ">
                        <button type="submit" class="popup_cancel" data-bs-toggle="modal"
                            data-bs-target="#CreatePost1Modal">CANCEL</button>
                        <button type="submit" class="popup_post ms-5" data-bs-dismiss="modal">DISCARD</button>
                    </div>
                </div>
            </div>
        </div>
        <sansthaDashMoreCommiteeAdd></sansthaDashMoreCommiteeAdd>

    </div>
</template>
<script>
import sansthaDetailService from '../../services/sansthaDetail.service';
import { handleLike, handleSave } from '../../common/common';
import afterLoginHomeService from "../../services/afterLoginHome.service";
export default {
    name: "App",
    data() {
        return {
            lastParam: '', org_title: '', org_banner: '', forId: '', committeeSanstha: [],
            selectItemFilter: '', get_sanstha: '', event_page: 1, eventSanstha: [], total_count: '', selectedCoverURL: '', selectedProfileURL: '',
        };
    },
    mounted() {
        this.createpost();
        const thumbnail = new Swiper('.thumbnail', {
            slidesPerView: 4,
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
        formatTimeAgo(date) {
            return moment(date).fromNow();
        },
        redirectToMembershipTab() {
            document.getElementById("nav-dashboard-membership-tab").click();
        },
        async getSansthaDetail() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const response = await sansthaDetailService.getParticularSanstha(lastParam);
            if (response.status === 200 || 201) {
                this.committeeSanstha = response.data
            } else {
                console.error("Something went wrong")
            }
        },
        createpost() {
            document.getElementById('next_modal').addEventListener('click', function () {
                $('#CreatePostModal').modal('hide');
                var selectedRadio = document.querySelector('input[name="create_post_radio"]:checked');
                if (selectedRadio) {
                    if (selectedRadio.id === 'create_post_news_radio') {
                        $('#CreateNewsModal').modal('show');
                    } else if (selectedRadio.id === 'create_post_event_radio') {
                        $('#CreateEventModal').modal('show');
                    } else if (selectedRadio.id === 'create_post_appeal_radio') {
                        $('#CreateAppealModal').modal('show');
                    } else if (selectedRadio.id === 'create_post_video_radio') {
                        $('#CreateVideoModal').modal('show');
                    }
                }
            });
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
        navigateToCommittee() {
            function navigateToCommittee() {
                document.getElementById('nav-dashboard-committee-tab').click();
            }
            document.addEventListener("DOMContentLoaded", function () {
                document.getElementById('committeeLink').addEventListener('click', function (event) {
                    event.preventDefault();
                    navigateToCommittee();
                });
            });
        },
        ScrollnavarSanstha() {
            document.getElementById('nav-dashboard-news-tab').addEventListener('click', function () {
                window.scrollBy(0, 1);
            });
        },


        async getCommitteeMember() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organization_id: lastParam
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
        updateFilter(filterText) {
            this.selectItemFilter = filterText;
        },
        async activate() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            this.lastParam = lastParam;
            const response = await sansthaDetailService.getSansthaParticular(lastParam);
            if (response.status == 200 || response.status == 201) {
                this.get_sanstha = response.data;
                this.org_banner = response.data.banner[0].original_url
            }
            else {
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
        nextSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slideNext();
        },
        prevSlide() {
            const thumbnail = document.querySelector('.thumbnail').swiper;
            thumbnail.slidePrev();
        },
        handleProfileChange() {
            const profileInput = this.$refs.profileInput;
            if (profileInput.files && profileInput.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = profileInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedProfileURL = URL.createObjectURL(profileInput.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    profileInput.value = "";
                }
            }
        },
        handleCoverChange() {
            const coverInput = this.$refs.coverInput;
            if (coverInput.files && coverInput.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = coverInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedCoverURL = URL.createObjectURL(coverInput.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    coverInput.value = "";
                }
            }
        },
        async setLogoImg() {
            this.handleProfileChange();
            await this.changeLogoImg()
        },
        async setCoverImg() {
            this.handleCoverChange();
            await this.changeCoverImg();
        },
        async changeLogoImg() {
            if (this.selectedProfileURL) {
                if (this.$refs.profileInput.files[0]) {
                    const formData = new FormData();
                    formData.append('model_id', this.lastParam);
                    formData.append('organization_detail_logo', this.$refs.profileInput.files[0]);
                    formData.append('type', 'mobile_api');
                    const response1 = await sansthaDetailService.addProfileChange(formData)
                    if (response1.status === 200 || 201 || 202) {
                        this.$forceUpdate();
                    } else {
                        this.$toast.error('Please set proper address!');
                    }
                }
            } else {
                console.error('Something went wrong')
            }
        },
        async changeCoverImg() {
            if (this.selectedCoverURL) {
                if (this.$refs.coverInput.files[0]) {
                    const formData = new FormData();
                    formData.append('model_id', this.lastParam);
                    formData.append('organization_detail_banner', this.$refs.coverInput.files[0]);
                    formData.append('type', 'mobile_api');
                    const response1 = await sansthaDetailService.addProfileChange(formData)
                    if (response1.status === 200 || 201 || 202) {
                        this.$forceUpdate();
                    } else {
                        this.$toast.error('Please set proper address!');
                    }
                }
            } else {
                console.error('Something went wrong')
            }
        },
        async changeLogoImg() {
            if (this.$refs.profileInput.files[0]) {
                const formData = new FormData();
                formData.append('model_id', this.lastParam);
                formData.append('organization_detail_logo', this.$refs.profileInput.files[0]);
                formData.append('type', 'mobile_api');
                const response1 = await sansthaDetailService.addProfileChange(formData)
                if (response1.status === 200 || 201 || 202) {
                    this.$forceUpdate();
                } else {
                    this.$toast.error('Please set proper address!');
                }
            }
        },
        navigateFollower(id) {
            window.location.href = `/followerslist?id=${id}`;
        }
    },
    beforeMount() {
        if (localStorage.getItem('storeToken') == null) {
            window.location.href = '/home-login';
        }
        this.activate();
        this.ScrollnavarSanstha();
    }
}
</script>