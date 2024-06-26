<template>
    <section class="bg_image" style="padding-bottom: 5rem!important;">
        <div class="container">
            <div class="row main_layout mt-2 pb-2 g-2 m-1">
                <div class="col-lg-3 col-xl-3 col-xxl-3 left_layout" style="margin-top: 127px;">
                    <login-sidebar></login-sidebar>
                </div>
                <div class="col-md-8 col-lg-9 col-xl-9 col-xxl-9 col-sm-12 col-xs-12 col-xxs-12  col-xxl-9 center_layout center_layout_sanstha px-3" id="center-layout">
                    <div class="login_flow1">                     
                        <div class="d-flex_manage p-2">
                            <div class="label_manage_sanstha mt-1">{{ this.count }} Sanstha Listed</div>
                            <div class="input_manage">
                                <form @submit.prevent="getAllSansthaSearch()">
                                <input type="text" class="manage_sanstha_input" v-model="search_term" id="seach_manage" placeholder="Search by Sanstha name...">
                                    <button type="submit" class="searchbutton_manage">Search</button>
                                    <button type="buton" class="searchbutton_manage" @click="clearForm()">Clear</button>
                                </form>                  
                            </div>    
                        </div>

                        <div class="row mt-1 g-3" v-if="get_user_sanstha_search.length > 0">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xxs-12" v-for='(res,index) in get_user_sanstha_search'>
                                <a class="explore-link" :href="'sanstha-dashboard/'+res.id">
                                <!-- <a class="explore-link"> -->
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${ res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png': 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' }`" class="exloreorglocimg img-fluid" alt="...">
                                        <div class="card-body text-center">
                                            <div class="row">
                                                <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                    <span class="exploreorgname">{{ res.title }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                <div class="footer">
                                                    <span class="m-1 exploreorgloc"><img src="images/ic_place_24px.svg" class="loation_icon me-1" alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>  

                        <div class="row mt-1 g-3" v-else>
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12 col-xxs-12" v-for='(res,index) in get_user_sanstha'>
                                <a class="explore-link" :href="'sanstha-dashboard/'+res.id">
                                <!-- <a class="explore-link"> -->
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${ res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png': 'images/jd_card_logo.png' }`" class="exloreorglocimg img-fluid" alt="...">
                                        <div class="card-body text-center">
                                            <div class="row">
                                                <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                    <span class="exploreorgname">{{ res.title }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                <div class="footer">
                                                    <span class="m-1 exploreorgloc"><img src="images/ic_place_24px.svg" class="loation_icon me-1" alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <infinite-loading @distance="1" v-if="this.message==''" @infinite="getAllSanstha"></infinite-loading>
                        </div>                  
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import userSansthaService from "../../services/usersanstha.service"
export default {
    name: "App",
    data() {
        return {
            user_id: localStorage.getItem('userId'),search_term:'',
            page:1,get_user_sanstha:[],get_user_sanstha_search:[],count:'',message:'',searchSansthaPer:false
        };
    },
    methods: {
        async getAllSanstha($state) {
            this.get_user_sanstha_search = [];
            const userId = this.user_id;
            const data = { params:{user_id: userId,search_term : this.search_term}};
            const response = await userSansthaService.getUserSanstha(data,this.page)
            if (response.status === 200 || response.status === 201) {
                if(response.get_sanstha.data.length != 0){
                    $.each(response.get_sanstha.data, (key, value) => {
                    this.get_user_sanstha.push(value);
                });
                $state.loaded();
                this.page = this.page + 1;
                }else {
                    $state.complete();
                    this.message = 'No more data';
                }
               
            }
        },
        async getAllSansthaSearch() {
            this.get_user_sanstha = [];
            const userId = this.user_id;
            const data = { params:{user_id: userId,search_term : this.search_term}};
            const response = await userSansthaService.getUserSansthaSearch({...data})
            if (response.status === 200 || response.status === 201) {
                if(response.get_sanstha.length != 0){
                    $.each(response.get_sanstha, (key, value) => {
                    this.get_user_sanstha_search.push(value);
                });
                }else {
                    this.message = 'No more data';
                }
            }
        },
        async clearForm($state) {
            this.get_user_sanstha_search = [];
            this.get_user_sanstha = [];
            this.search_term = null || '';
            await this.getAllSanstha($state);
        }
    },
};
</script>
