<template>   
  <div class="container-fluid">
    <nav  class="navbar_login" id="nav-collapse-sidebar">
        <div class="collapse navbar-collapse left_collapse scroll_bar_login" id="left_card_inner_login" style="margin-bottom: -36px;">
            <ul class="menu p-1">
                <li>
                    <div class="login_flow">
                        <div class="left_card1 card py-2">
                            <div class="row mt-2">
                                <div class="col-12 px-4">
                                    <label style="display: flex;">
                                        <img class="profile_photo" :src="users.profile_photo ? users.profile_photo[0] ? users.profile_photo[0].original_url : '/images/ad_board3.png' :  '/images/ad_board3.png' " alt="...">
                                        <span class="profile_photo_name ms-3 mt-3">{{ this.user_name != '' ? this.user_name : 'Guest User'}}</span>
                                    </label>
                                </div>
                            </div>
                            <div class="row py-0 mt-0">
                                <div class="col-12 px-4">
                                    <a href="/profile" class="view_all_latestact">
                                        <div class="mt-2">
                                            <img src="/images/login_profile.svg" class="image_profile2 ms-2" alt="...">
                                            <span class="image_profile_label2 ms-3">Profile</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-12 px-4" hidden>
                                    <label class="mt-3">
                                        <img src="images/login_posts.svg" class="image_profile2 ms-2" alt="...">
                                        <span class="image_profile_label2 ms-3">Posts</span>
                                    </label>
                                </div>
                                <div class="col-12 px-4" hidden>
                                    <label class="mt-3">
                                        <img src="images/login_preference.svg" class="image_profile2 ms-2" alt="...">
                                        <span class="image_profile_label2 ms-3">Preferences</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="card pt-1 mt-3 left_card2" v-if="get_user_sanstha.length > 0 ">
                            <label class="section_body p-1 px-3" style="font-weight: 400;">Manage My Sanstha</label>
                            <div class="row mt-2">
                                <div class="col-12 px-4" v-for='(res,index) in get_user_sanstha'>
                                    <a class="view_all_latestact" :href="'/sanstha-dashboard/'+res.id">
                                        <div style="display: flex;">
                                            <img :src="`${ res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png': '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' }`" class="manage_my_sanstha_img" alt="...">
                                            <span class="manage_my_sanstha_label ms-2 mt-3 ">{{ res.title }}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="dash p-1"></div>
                            <div class="row px-3 mb-2">
                                <div class="col-12 px-3">
                                    <label style="display: flex;" class="mt-2">
                                        <a href="/managesanstha" class="view_all_latestact">
                                            <img src="/images/login_.svg" class="add_new_sanstha_img" alt="...">
                                            <span class="manage_my_sanstha_label ms-auto" style="font-weight: bold;">Show All My Sanstha</span>
                                        </a>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!-- add sanstha code --> 
                        <!-- <div class="card p-2 px-2 mt-3 left_card3">
                            <div class="row px-3">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <label style="display: flex;" class="">
                                        <a class="view_all_latestact">
                                            <img src="images/login_add.svg" class="add_new_sanstha_img1" alt="...">
                                            <span class="manage_my_sanstha_label ms-4" style="font-weight: bold;">Add New Sanstha</span>
                                        </a>
                                    </label>
                                </div>
                            </div>
                        </div> -->
                        <!-- <div class="card pt-1 mt-3 left_card4" v-if="get_user_member.length > 0">
                            <label class="section_body px-3" style="font-weight: 400;">Member Of</label>
                            <div class="row mt-2">
                                <div class="col-12 px-4" v-for='(res,index) in get_user_member'>
                                    <a class="view_all_latestact">
                                        <div style="display: flex;">
                                            <img src="/images/Group21809.png" class="manage_my_sanstha_img" alt="...">
                                            <div class="manage_my_sanstha_label ms-3">{{ res.organization.title }}
                                                <br><span class="exploreorgloc">
                                                <img :src="`${ res.organization.banner ? res.organization.banner[0] ? res.organization.banner[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png': 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' }`" class="loation_icon1" alt="...">{{ res.organization.location }}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="dash p-1"></div>
                            <div class="row mt-2 px-4 mb-2">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                                    <label style="display: flex;">
                                        <a href="/manage-member" class="view_all_latestact">
                                            <img src="/images/login_viewall.svg" class="add_new_sanstha_img1" alt="...">
                                            <span class="manage_my_sanstha_label ms-4" style="font-weight: bold;">View All</span>
                                        </a>
                                    </label>
                                </div>
                            </div>
                        </div> -->
                        <div class="card mt-3 left_card5">
                            <div class="row py-2">
                                <div class="col-12 px-4">
                                    <a href="/about" class="view_all_latestact" target="_blank">
                                        <div class="mt-2">
                                            <img src="/images/login_about.svg" class="image_profile2 ms-1" alt="...">
                                            <span class="image_profile_label2 ms-3">About JainDirect</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-12 px-4">
                                    <a href="/#contact" class="view_all_latestact" target="_blank">
                                        <div class="mt-2">
                                            <img src="/images/login_contactus.svg" class="image_profile2 ms-1" alt="...">
                                            <span class="image_profile_label2 ms-3">Contact Us</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="col-12 px-4">
                                    <a href="/feedback" class="view_all_latestact" target="_blank">
                                        <div class="mt-2">
                                            <img src="/images/login_feedback.svg" class="image_profile2 ms-1" alt="...">
                                            <span class="image_profile_label2 ms-3">FeedBack</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </nav>
  </div>
</template>
<script>
import profileSideBarService from "../../services/profilesidebar.service"
export default {
    name: "App",
    data() {
        return {
            user_id: localStorage.getItem('userId'),user_name:[],get_user_sanstha:[],get_user_member:[],users:[]
        };
    },
    methods: {
        async getUser() {
            const userId = this.user_id;
            const response = await profileSideBarService.getUser(userId)
            this.user_name = response.data.name;
            this.users = response.data;
        },
        async getManageSanstha() {
            const userId = this.user_id;
            const data = {
                params : {
                    type:"side_bar",user_id: userId
                }
            }
            const response = await profileSideBarService.getManageSanstha({...data})
            if(response.status == 200 || 201){
                this.get_user_sanstha = response.data
            }
        },
        async getUserSansthaMember() {
            const userId = this.user_id;
            const data = {
                params : {
                    type:"side_bar",user_id: userId
                }
            }
            const response = await profileSideBarService.getUserManageSanstha({...data})
            if(response.status == 200 || 201){
                this.get_user_member = response.data
            }
        },
    },
    beforeMount() {
        this.getUser();
        this.getManageSanstha();
        this.getUserSansthaMember();
    },
};
</script>
