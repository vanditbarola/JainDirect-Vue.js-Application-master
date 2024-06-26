<template>
    <div class="container mb-5 pb-3">
       
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation" hidden>
                    <button class="nav-link active" id="custom-tab" data-bs-toggle="tab" data-bs-target="#custom"
                        type="button" role="tab" aria-controls="custom" aria-selected="true">custom</button>
                </li>
                <li class="nav-item" role="presentation" hidden>
                    <button class="nav-link" id="customhtml-tab" data-bs-toggle="tab" data-bs-target="#customhtml"
                        type="button" role="tab" aria-controls="customhtml" aria-selected="false">customhtml</button>
                </li>
            </ul>
            <div class="tab-content mt-2" id="myTabContent">
                <div class="tab-pane fade show active" id="custom" role="tabpanel" aria-labelledby="custom-tab">
                    <!-- <div class="latest_news p-3 m-1 mt-2"> -->
                        <label class="section_header p-1 m-1">Custom Page</label>
                        <!-- <div class=" mt-3 mb-5"> -->
                        <div class="row ">

                            <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 mt-3"
                                v-for='(res, index) in cpSanstha'>
                               <div class="card p-3">
                                <div v-if="token == null" @click="navigateFollow()">
                                    <a>
                                        <img class="post_CustomImage"
                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                            alt="...">
                                        <span class="post_customPage_span">{{ res.title }}</span>
                                    </a>
                                </div>
                                <div v-else @click="customHtml">
                                    <a @click="getSeeId(res.id)">
                                        <img class="post_CustomImage"
                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'}`"
                                            alt="...">
                                        <span class="post_customPage_span">{{ res.title }}</span>
                                    </a>
                                </div>
                               </div>
                            </div>
                            <div class="col col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3"></div>
                        </div>
                        <infinite-loading @distance="1" @infinite="getCustomPageBasedSanstha"></infinite-loading>
                    <!-- </div> -->
                </div>
                <div class="tab-pane fade " id="customhtml" role="tabpanel" aria-labelledby="customhtml-tab">
                    <div class="container">
                        <a @click="customNav()" class="view_all_latestact mt-4"><i class="bi bi-arrow-left"></i> <label
                                class="section_header_cus mt-3">{{ cp_data.title }}</label></a>
                        <div class="custom_div ">

                            <div class="card h-100 custom_card">
                                <div id="carouselExampleCaptions" class="carousel slide mt-2 mb-3"
                                    data-bs-ride="carousel">
                                    <div class="carousel-inner">
                                        <template v-if="cp_data.banner && cp_data.banner.length > 0">
                                            <div v-for="(banner, index) in cp_data.banner" :key="index"
                                                :class="{ 'carousel-item': true, 'active': shouldDisplay(index) }">
                                                <embed class="custom1_img" :src="banner.original_url"
                                                    alt="Card image cap">
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="carousel-item active">
                                                <embed class="custom1_img" src="/images/jd_card_logo.png"
                                                    alt="Card image cap">
                                            </div>
                                        </template>
                                    </div>
                                    <br><br>
                                    <div class="carousel-indicators">
                                        <button v-for="(banner, index) in cp_data.banner" :key="index" type="button"
                                            :data-bs-target="'#carouselExampleCaptions'" :data-bs-slide-to="index"
                                            :class="{ active: index === activeIndex }" aria-current="true"
                                            :aria-label="'Slide ' + (index + 1)" @click="activeIndex = index"></button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <label class="custom_page1_desc" v-html="cp_page_content"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
</template>
<script>
import sansthaDetailService from '../../../services/sansthaDetail.service';
export default {
    name: "App",
    data() {
        return {
            token: null, selectItemIcon: null, cp_page: 1, cp_id: '', cpSanstha: [], org_id: '', get_sanstha: '', selectedImageURL4: '', selectItemIcon: null, cp_data: [], cp_page: 1, cp_id: '', cp_del_id: '', cp_page_content: '', selectItemFilter: '', get_sanstha: '', total_count: '', message: '', activeIndex: 0
        };
    },
    created() {
        if (this.cpSanstha.length === 0) {
            this.getCustomPageBasedSanstha();
        }
    },
    methods: {
        navigateFollow() {
            const url = window.location.href;
            this.token = localStorage.getItem('storeToken');
            if (this.token == null) {
                window.location.href = '/home-login';
            }
        },
        customNav() {
            const custom = document.getElementById('custom-tab');
            if (custom) {
                custom.click();
            }
        },
        customHtml() {
            const customhtml = document.getElementById('customhtml-tab');
            if (customhtml) {
                customhtml.click();
            }
        },
        shouldDisplay(index) {
            return this.cp_data.banner.length === 1 || index === this.activeIndex;
        },
        getSeeId(resId) {
            this.cp_id = resId
            if (this.cp_id) {
                this.getParticularCustomPage();
            }
        },
        async activate() {
            const data = {
                params: {
                    organisation_id: this.org_id
                }
            }
            const response = await sansthaDetailService.getSanstha({ ...data });
            this.get_sanstha = response;
        },
        async getCustomPageBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllCustomPageSanstha(this.cp_page, { ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    if (this.cp_page === 1) {
                        this.cpSanstha = response.data;
                    } else {
                        this.cpSanstha = [...this.cpSanstha, ...response.data];
                    }
                    $state.loaded();
                    this.cp_page = this.cp_page + 1;
                }
                else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getParticularCustomPage($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getParticularCp(this.cp_id, data);
            if (response.status === 200 || 201) {
                this.cp_data = response.data
                this.cp_length = response.data.banner.length
                this.cp_page_content = response.data.page_content;
                this.org_id = response.data.organization_id;
                if (this.org_id) {
                    this.activate();
                }
            } else {
                console.error("Something went wrong")
            }
        },
    }
};
</script>