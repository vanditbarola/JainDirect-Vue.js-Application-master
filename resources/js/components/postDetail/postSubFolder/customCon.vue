<template>
    <div x-data="app()" x-cloak>
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
                                    <span class="Sanstha_org_home_head_stats_counts">{{ get_sanstha.total_members !== null ? get_sanstha.total_members : 0 }}</span>
                                    <span class="Sanstha_org_home_head_stats_title">Members</span>
                                </label>
                                <label class="Sanstha_org_home_head_stats_box text-center p-1 mx-1">
                                    <span class="Sanstha_org_home_head_stats_counts">{{ get_sanstha.total_followers !== null ? get_sanstha.total_followers : 0 }}</span>
                                    <span class="Sanstha_org_home_head_stats_title">Followers</span>
                                </label>
                                <!-- <label class="Sanstha_org_home_head_stats_box text-center p-1 mx-1">
                                    <span class="Sanstha_org_home_head_stats_counts">12k</span>
                                    <span class="Sanstha_org_home_head_stats_title">Following</span>
                                </label> -->
                                <label class="Sanstha_org_home_head_stats_box text-center p-1 mx-1">
                                    <span class="Sanstha_org_home_head_stats_counts">{{ get_sanstha.total_page_view !== null ? get_sanstha.total_page_view : 0 }}</span>
                                    <span class="Sanstha_org_home_head_stats_title">Page View</span>
                                </label>
                            </div>
                            <!-- <div class="col-sm-12 col-md-12 col-xs-12  col-xl-12 join_member mb-3">
                                <button type="submit" class="join_membership_btn1" data-bs-toggle="modal"
                                    data-bs-target="#myLoginModal"> Join Membership </button>
                            </div> -->
                        </div>
                    </div>
                    <!-- <div class="col-lg-3 col-xl-3 col-xxl-3 p-2">
                            <div class="text-center Sanstha_org_home_head_scanner_card">
                                <span class="text-center Sanstha_org_home_head_scanner_title">Scan Here</span>
                                <img src="/images/ScreenShotPM.png" class="Sanstha_org_home_head_scanner_img" alt="...">
                            </div>
                        </div> -->
                    <!-- </div> -->
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
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="sanstaevent-tab" data-bs-toggle="tab" data-bs-target="#sanstaevent"
                            type="button" role="tab" aria-controls="sanstaevent" aria-selected="false">
                            <img src="/images/Events.svg" class="mx-2" alt="...">Events</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="sanstanews-tab" data-bs-toggle="tab" data-bs-target="#sanstanews"
                            type="button" role="tab" aria-controls="sanstanews" aria-selected="false">
                            <img src="/images/news.svg" class="mx-2" alt="...">News</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="sanstagallery-tab" data-bs-toggle="tab"
                            data-bs-target="#sanstagallery" type="button" role="tab" aria-controls="sanstagallery"
                            aria-selected="false"><img src="/images/gallery.svg" class="mx-2" alt="...">Gallery</button>
                    </li>
                    <!-- <li class="nav-item" role="presentation">
                        <button class="nav-link" id="sanstahistory-tab" data-bs-toggle="tab"
                            data-bs-target="#sanstahistory" type="button" role="tab" aria-controls="sanstahistory"
                            aria-selected="false"><img src="/images/history.svg" class="mx-2" alt="...">History</button>
                    </li> -->
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="sanstacommitee-tab" data-bs-toggle="tab"
                            data-bs-target="#sanstacommitee" type="button" role="tab" aria-controls="sanstacommitee"
                            aria-selected="false">
                            <img src="/images/commiteee.svg" class="mx-2" alt="...">Committee</button>
                    </li>
                    <!-- <li class="nav-item" role="presentation">
                        <button class="nav-link" id="sanstalibrary-tab" data-bs-toggle="tab"
                            data-bs-target="#sanstalibrary" type="button" role="tab" aria-controls="sanstalibrary"
                            aria-selected="false"><img src="/images/library.svg" class="mx-2" alt="...">Library</button>
                    </li> -->
                    <div>
                        <b-dropdown text="More" class="sanstha_deatil_more_tab" no-caret>
                            <b-dropdown-item>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="sanasthaVideo-tab" data-bs-toggle="tab"
                                        data-bs-target="#sanasthaVideo" type="button" role="tab"
                                        aria-controls="sanasthaVideo" aria-selected="false"> <img
                                            src="/images/login_video.svg" class="shrvak_munch_tab_icons "
                                            alt="...">Video</button>
                                </li>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="sanstaAppeal-tab" data-bs-toggle="tab"
                                        data-bs-target="#sanstaAppeal" type="button" role="tab"
                                        aria-controls="sanstaAppeal" aria-selected="false">
                                        <img src="/images/appeal_icon.svg" class="sanstha_dashboard_tab_icons"
                                            alt="...">Appeal</button>
                                </li>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="sanstaCustom-tab" data-bs-toggle="tab"
                                        data-bs-target="#sanstaCustom" type="button" role="tab"
                                        aria-controls="sanstaCustom" aria-selected="false">
                                        <img src="/images/custom_pages.svg" class="sanstha_dashboard_tab_icons"
                                            alt="...">Custom
                                        Pages</button>
                                </li>
                            </b-dropdown-item>
                        </b-dropdown>
                    </div>

                </ul>
            </div>
        </section>
        <section class="bg_santha_home">
            <section class="mt-2 pb-2">
                        <div class="container">
                            <a :href="'sanstha-detail/' + org_id" class="view_all_latestact mt-2"><i class="bi bi-arrow-left"></i> <label class="section_header">Content As HTML</label></a>
                            <div class="custom_div">
                                <input type="text" class="custom_input_html1 form-control" v-model="cp_page_content" readonly>
                            </div>
                        </div>
            </section>
        </section>
        </section>
    </div>
</template>
<script>
import sansthaDetailService from '../../../../services/sansthaDetail.service';
export default {
    name: "App",
    data() {
        return {
            org_id:'', get_sanstha:'',selectedImageURL4:'',selectItemIcon: null,cp_data: [], cp_page: 1, cp_id: '', cp_del_id: '',cp_page_content:'', selectItemFilter: '', get_sanstha: '', total_count: '', cpSanstha: [], message: ''
        };
    },
    beforeMount(){
        this.getParticularCustomPage();
       
    },
    methods: {
        async activate() {
            const data = {
                params : {
                    organisation_id : this.org_id
                }
            }
            const response = await sansthaDetailService.getSanstha({...data});
            this.get_sanstha = response;
        },
        async getParticularCustomPage($state) {
            const cp_id = localStorage.getItem('cp_id');
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getParticularCp(cp_id,data);
            if (response.status === 200 || 201) {
                this.cp_page_content = response.data.page_content;
                this.org_id = response.data.organization_id;
                if(this.org_id){
                    this.activate();
                }
            } else {
                console.error("Something went wrong")
            }
        },
    }
};
</script>