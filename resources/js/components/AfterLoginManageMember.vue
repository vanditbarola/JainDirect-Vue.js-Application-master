<template>
    <section class="bg_image" style="padding-bottom: 5rem!important;">
        <div class="container">
            <div class="row main_layout mt-2 pb-2 g-2 m-1">
                <div class="col-md-5 col-lg-3 col-xl-3 col-xxl-3 left_layout" style="margin-top: 127px;">
                    <login-sidebar></login-sidebar>
                </div>
                <div class="col-md-7 col-lg-9 col-xl-9 col-xxl-9 col-sm-12 col-xs-12 col-xxs-12 center_layout  px-3 " id="center-layout">
                    <div class="login_flow1">                     
                        <div class="d-flex_manage p-2">
                            <div class="label_manage_sanstha mt-1">Member of <span class="fw-bold" id="">Sanstha</span></div>
                            <div class="input_manage">
                                <input type="text" class="manage_sanstha_input" id="seach_manage" placeholder="Search by Sanstha name...">
                                <button type="button" class="searchbutton_manage">Search</button>
                            </div>                      
                        </div>
                        <div class="row mt-1 g-3">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xxs-12"  v-for='(res,index) in get_user_member'>
                                <a class="explore-link">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img class="exloreorglocimg img-fluid" :src="`${ res.organization.banner ? res.organization.banner[0] ? res.organization.banner[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png': 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' }`"  alt="...">
                                        <div class="card-body text-center">
                                            <div class="row">
                                                <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                    <span class="exploreorgname">{{ res.organization.title }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                <div class="footer">
                                                    <span class="m-1 exploreorgloc">
                                                    <img src="images/ic_place_24px.svg" class="loation_icon me-1" alt="...">{{ res.organization.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <infinite-loading @distance="1" @infinite="getAllMemberSanstha"></infinite-loading>
                        </div>                  
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import afterLoginManageMemberSerive from "../../services/afterLoginManageMember.service";
export default {
    name: "App",
    data() {
        return {
            user_id: localStorage.getItem('userId'),page:1,get_user_member:[]
        };
    },
    methods: {
        async getAllMemberSanstha($state) {
            const userId = this.user_id;
            const data = {
                params: {
                    user_id: userId
                }
            }
            const response = await afterLoginManageMemberSerive.getAllManageMember(this.page, data)
            if (response.status === 200 || 201){
                $.each(res.data, (key, value) => {
                    this.get_user_member.push(value);
                });
                $state.loaded();
                this.page = this.page + 1;
            }
        },
    },
    beforeMount() {
        this.getAllMemberSanstha();
    },
};
</script>
