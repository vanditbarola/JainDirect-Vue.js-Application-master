<template>
    <div x-data="app()" x-cloak>
        <section class="bg_image img-fluid pt-5 mt-4" style="background-image: url(images/Group\ 20998.png);">
            <div class="container">
                <div class="row g-0">
                    <div class="col-md-6 col-lg-8 col-xxl-8 col-xl-8 col-xs-12 col-sm-12">
                        <div class="mt-2 mb-2 p-2">
                            <h3 class="head_title">World’s First Jain S2S (Sanstha to Shravak) Platform</h3>
                            <p class="head_subtitle"><i class="bi bi-arrow-right m-1 p-1"></i>Be part of the World Jain community </p>
                            <p class="head_subtitle"><i class="bi bi-arrow-right m-1 p-1"></i>Universal platform for the Jains globally </p>
                            <p class="head_subtitle"><i class="bi bi-arrow-right m-1 p-1"></i>Digital solutions to manage Jain organizations </p>
                            <p class="head_subtitle"><i class="bi bi-arrow-right m-1 p-1"></i>Enhanced direct connection between Sanstha & Shravaks </p>
                            <p class="head_subtitle"><i class="bi bi-arrow-right m-1 p-1"></i>Based on the ideology of One Religion One Gateway </p>
                        </div>
                    </div>
                    <div class="col-md-4 offset-md-1 col-sm-12 col-lg-3 col-xl-3 col-xxl-3 col-xs-12 ms-lg-5 ms-xl-5 ms-xxl-5 d-flex"
                        v-if="token == null">
                        <div class="card my-3 p-4 mt-3 text-center logincard  mt-auto mb-auto">
                            <button type="button" class="shanstha_login_btn "
                                onclick="window.location.href='home-login'">
                                <img src="images/ic_account_circle_24px.svg" class="mx-2" alt="">LOGIN
                            </button>
                        </div>
                    </div>
                    <div class="col-md-4 offset-md-1 col-sm-12 col-lg-3 col-xl-3 col-xxl-3 col-xs-12 ms-lg-5 ms-xl-5 ms-xxl-5 d-flex"
                        v-else>
                        <div class="card my-3 p-4 mt-3 text-center logincard mt-auto mb-auto">
                            <button type="button" class="shravak_login_btn mt-2"
                                onclick="window.location.href='sharvak-dashboard'">
                                <img src="images/ic_account_circle_24px.svg" class="mx-1" alt="">DASHBOARD
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      
        <advisory></advisory>
        
        <section style="background-color: #FFCF88 ;">
            <div class="container px-5 pt-1 pb-1">
                <div class="section_header2 text-center mt-2">Search Temples, Dharmasala, Muni Seva, Orphanage, etc...
                </div>
                <form class="row justify-content-center g-2" @submit.prevent="getSearchData()">
                    <div class="col-auto">
                        <div class="input-group">
                            <div class="input-group-text search_dropdowns">
                                <div>
                                    <b-dropdown class="search1" v-model="selectedCategory"
                                        :text="selectedCategory ? sanstha_category.find(cat => cat.id === selectedCategory).title : 'Category'">
                                        <b-dropdown-item v-for="(res, index) in sanstha_category" :value="res.id"
                                            :key="index + res.title" @click="selectCategory(res.id)">
                                            <a class="dropdown-item">{{ res.title }}</a>
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
                                <div class="line1_search"></div>
                                <div>
                                    <b-dropdown class="search2" v-model="selectedItemState"
                                        :text="selectedItemState ? states.find(sta => sta.id === selectedItemState).name : 'State'">
                                        <b-dropdown-item v-for="state in states" :key="state.id" :value="state.id"
                                            @click="selectItemState(state.id)"><a class="dropdown-item" href="#">{{ state.name }}</a></b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </div>
                            <input type="text" class="form-control search_box"
                                placeholder="Enter Sanstha Name..." v-model="search_term" @input="updateSearchTerm()">
                        </div>
                    </div>
                    <div class="col-auto">
                        <button type="submit" class="form-control searchbutton mb-3">Search</button>
                    </div>
                </form>
            </div>
        </section>

        <exploreActivity></exploreActivity>

        <section class=" " style="background-color: #F3FDFF;">
            <div class="container">
                <div class="row p-2 text-center">
                    <!-- <div class="col-md-3 col-lg-3 col-sm-12 col-xxs-12 col-xs-3 col-xl-3 col-xxl-3 stats">
                        <p>
                            <label class="totvis">6542+</label>
                            <br><label class="total">Total Visitors</label>
                        </p>
                    </div> -->
                    <div class="col-md-6 col-lg-6 col-sm-12 col-xxs-12 col-xs-6 col-xl-6 col-xxl-6 stats">
                        <p>
                            <label class="totusers">{{ this.results.user_count }}</label>
                            <br><label class="users">Shravak's</label>
                        </p>
                    </div>
                    <div class="col-md-6 col-lg-6 col-sm-12 col-xxs-12 col-xs-6 col-xl-6 col-xxl-6 ">
                        <p>
                            <label class="totorg">{{ this.results.org_count }} </label>
                            <br><label class="org">Sanstha's</label>
                        </p>
                    </div>
                    <!-- <div class="col-md-3 col-lg-3 col-sm-12 col-xxs-12 col-xs-3 col-xl-3 col-xxl-3">
                        <p>
                            <label class="totmem">{{ this.results.member_count }}+</label>
                            <br><label class="mem">Members</label>
                        </p>
                    </div> -->
                </div>
            </div>
        </section>

        <section class="mt-1 p-2 mb-1" style="background-color: #FFFFFF;" id="contact">
            <div class="container">
                <div class="row g-3">
                    <div class="col-md-7 col-lg-8 col-xxl-8 col-sm-12 col-xs-12">
                        <div class="card h-100 p-3 border-0"
                            style="background-color: #F8F8F8; box-shadow: 0px 3px 6px #00000029;">
                            <label class="section_header">Contact Us!</label>
                            <p class="contact_sub">For all your enquiries, please feel free to reach out to us!</p>
                            <form class="row g-2">
                                <div class="col-md-6 col-xs-12 col-sm-12 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                    <label for="fname" class="form-label fname">Full Name<span class="required mx-1">*</span></label>
                                    <input type="text" class="form-control ifname" v-model="name" pattern="[A-Za-z]+"
                                        id="fname" required placeholder="Enter Name..">
                                    <div style="color: red;">{{ this.nameErr }}</div>
                                </div>
                                <div class="col-md-6 col-xs-12 col-sm-12 col-lg-6 col-xl-6 col-xxl-6 mt-4 ">
                                    <label for="number" class="form-label num">Mobile Number<span class="required mx-1 ">*</span></label>
                                    <input type="tel" pattern="^[0-9]{10}$" v-model="mobile" class="form-control inum"
                                        required id="number" placeholder="Enter Mobile Number..">
                                    <div style="color: red;">{{ this.mobileErr }}</div>
                                </div>
                                <div class="col-12 col-xs-12 col-sm-12 mt-4">
                                    <label for="inputmsg" class="form-label msg">Type Your Message Here <span
                                            class="required mx-1">*</span></label>
                                    <input type="text" class="form-control imsg" v-model="message" id="inputmsg"
                                        required placeholder="Enter here...">
                                    <div style="color: red;">{{ this.messageErr }}</div>
                                </div>
                                <div class="col-12 col-xs-12 col-sm-12 mt-4">
                                    <button type="submit" class="btn btn-light submit" @click.prevent="postContactUs">Submit</button>
                                </div>
                            </form>
                            <div>{{ this.successmessage }}</div>
                        </div>
                    </div>

                    <div class="col-md-5 col-lg-4 col-xxl-4 col-xl-4 col-sm-12 col-xs-12">
                        <div class="card py-3 h-100 border-0"
                            style="background-color: #F8F8F8;  box-shadow: 0px 3px 6px #00000029;">
                            <div class="container cont1 p-3 d-flex align-content-center flex-column">
                                <div class="row">
                                    <div class="col-auto me-auto">
                                        <h6 class="help">Want to help? As Volunteers</h6>
                                    </div>
                                    <div class="col-auto text-center "><a href="join-volunter" class="btn helpb p-3 text-center">Join Us</a></div>
                                </div>
                                <div class="line m-3"></div>
                                <div class="row mt-3 ">
                                    <div class="col-auto  me-auto">
                                        <h6 class="feedback">We want to hear from you!</h6>
                                    </div>
                                    <div class="text-center text-wrap col-auto">
                                        <a class="btn feedbackb" href="feedback">
                                            <span class="">Send Feedback</span></a>
                                    </div>
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
import indexService from "../../services/index.service";
import activityService from '../../services/activity.service';
import sansthaCatgeoryService from "../../services/sansthacategory.service"
import profileSideBarService from "../../services/profilesidebar.service"
export default {
    name: "App",
    data() {
        return {
            selectedItem: null, selectedItemCity: null, selectedCategory: null, sanstha_category: [], selectedItemState: null,
            token: localStorage.getItem('storeToken'), states: [], search_term: "",sansthaCategory: [], results: [],
            get_news: '', img: [], title: '', logo: '', detail: '', location: '', start_date_and_time: '', total_like: '', total_view: '', org_title: '',
            info: '', name: '', mobile: '', message: '', successmessage: '', nameErr: '', mobileErr: '', messageErr: '',
        };
    },
    methods: {
        // updateSearchTerm() {
        //     if (this.search_term) {
        //         localStorage.setItem('searchTerm', this.search_term);
        //     }
        // },
        updateSearchTerm() {
            localStorage.setItem('searchTerm', this.search_term || "");
        },
        selectCategory(categoryText) {
            this.selectedCategory = categoryText;
            localStorage.setItem("selectCategory", this.selectedCategory);
        },
        selectItemState(stateText) {
            this.selectedItemState = stateText;
            localStorage.setItem("selectState", this.selectedItemState);
        },
        getSearchData() {
            if (this.selectedCategory || this.selectedItemState || this.search_term) {
                window.location.href = "sanstha-list"
            }
        },
        selectItem(itemText) {
            this.selectedItem = itemText;
        },
        selectItemCity(cityText) {
            this.selectedItemCity = cityText;
        },
        async getSansthasCategory() {
            const { data } = await sansthaCatgeoryService.getSansthaCategory()
            this.sanstha_category = data;
        },
        async getStates() {
            const response = await profileSideBarService.getState();
            $.each(response, (key, value) => {
                this.states.push({
                    id: value.id,
                    name: value.name,
                });
            });
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
        async getCount() {
            const response = await indexService.getCount();
            if (response.status === 200 || 201) {
                this.results = response;
            } else {
                console.error("Something went wrong")
            }
        },
        async postContactUs() {
            this.nameErr = '';
            this.mobileErr = '';
            this.messageErr = '';
            // const namePattern = /^[A-Za-z]+$/;
            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;
            const mobilePattern = /^[0-9]+$/;
            if (!this.name.trim()) {
                this.nameErr = 'Name is required';
            } else if (!spaceRegex.test(this.name)) {
                this.nameErr = 'Name should not start with a space';
            } else if (!namePattern.test(this.name)) {
                this.nameErr = 'Please do not use any numbers or special characters ';
            }
            if (!this.mobile) {
                this.mobileErr = 'Mobile number is required';
            } else if (!spaceRegex.test(this.mobile)) {
                this.mobileErr = 'Mobile number should not start with a space';
            } else if (!mobilePattern.test(this.mobile)) {
                this.mobileErr = 'Mobile number should be only digits';
            } else if (this.mobile.length < 10 || this.mobile.length > 10) {
                this.mobileErr = "Mobile number should be at least 10 digits";
            }
            if (!this.message) {
                this.messageErr = 'Message is required';
            } else if (!spaceRegex.test(this.message)) {
                this.messageErr = 'Message should not start with a space';
            }
            if (this.nameErr || this.mobileErr || this.messageErr) {
                return;
            }
            const data = {
                name: this.name,
                mobile: this.mobile,
                message: this.message,
            };
            const response = await indexService.indexSaveCotact({ ...data });
            if (response.status === 200 || response.status === 201) {
                this.$toast.success('Your inquiry is submitted admin will contact you soon.');
            } else {
                console.error("Something went wrong");
            }
            // Clear fields regardless of response status
            this.name = '';
            this.mobile = '';
            this.message = '';
        }
    },
    navigate() {
        window.location.href = 'sanstha-list';
    },
    beforeMount() {
        if(this.search_term.length == 0){
            localStorage.removeItem('searchTerm');
        }
        if (!this.token) {
            localStorage.removeItem('storeMobile');
            localStorage.removeItem('storeEmail');
        }
        this.successmessage = '';
        this.getCount();
        this.getSansthasCategory();
        this.getStates();
    },
};
</script>
