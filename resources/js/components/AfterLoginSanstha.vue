<template>
    <section class="bg_image" style="padding-bottom: 5rem!important;">
        <div class="container">
            <div class="row main_layout mt-2 pb-2 g-2 m-1">
                <div class="col-md-3 col-lg-3 col-xl-3 col-xxl-3 left_layout" :style="{ 'margin-top': emptyDataMarginTop }">
                    <login-sidebar></login-sidebar>
                </div>
                <div class="col-md-8 col-lg-9 col-xl-9 col-xxl-9  col-sm-12 col-xs-12 col-xxs-12 px-4 center_layout center_layout_sanstha" id="center-layout">
                    <div class="login_flow ">
                        <section class="login_sanstha mt-1" style="background-color: #FFCF88 ; border-radius: 5px 5px 0px 0px;">
                            <div class="container p-1">
                                <div class="section_header2 text-center mt-2">Search Temples, Dharmasala, Muni Seva, Orphanage, etc...</div>
                                <form class="row justify-content-center g-2" @submit.prevent="getSearchSanstha()">
                                    <div class="col-auto col-xl-9">
                                        <div class="input-group">
                                            <div class="input-group-text sanstha_input_group_text search_dropdowns" style="background-color: white !important;">
                                                <div>
                                                    <b-dropdown class="search1" v-model="selectedCategory" :text="selectedCategory ? sanstha_category.find(cat => cat.id === selectedCategory).title : 'Category'">
                                                        <b-dropdown-item v-for="(res, index) in sanstha_category" :value="res.id" :key="index + res.title" @click="selectCategory(res.id)">
                                                            <a class="dropdown-item">{{ res.title }}</a>
                                                        </b-dropdown-item>
                                                    </b-dropdown>
                                                </div>
                                                <div class="line1_search"></div>
                                                <div>
                                                    <b-dropdown class="search2"  v-model="selectedItemState" :text="selectedItemState ? states.find(sta => sta.id === selectedItemState).name : 'State'">
                                                        <b-dropdown-item v-for="state in states" :key="state.id"
                                                            :value="state.id" @click="selectItemState(state.id)"><a class="dropdown-item">{{state.name }}</a></b-dropdown-item>
                                                    </b-dropdown>
                                                </div>
                                            </div>
                                            <input type="text" class="form-control search_box search_box_sanstha" v-model="search_term" placeholder="Enter your search keyword here...">
                                        </div>
                                    </div>
                                    <div class="col-auto col-xl-3 d-flex">
                                        <button type="submit" class="form-control searchbutton mb-3 mx-2">Search</button>
                                        <button type="clear" class="form-control searchbutton  mb-3 mx-2" @click="clearForm()">Clear</button>
                                    </div>
                                </form>
                            </div>
                        </section>
                        <section style="background-color: #FFFFFF;border-radius: 0px 0px 15px 15px !important;">
                            <div class="container">
                                <ul class="login_sanstha_inner nav nav-tabs pt-2" id="myTab" role="tablist">
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link " :class="{active: selectedCategory === null}" @click="selectCategory(null)" id="show-all" data-bs-toggle="tab"
                                            data-bs-target="#show-all-pane" type="button" role="tab"
                                            aria-controls="show-all-pane" aria-selected="true">Show All</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" :class="{active: selectedCategory === 2}" @click="selectCategory(2)" id="temple" data-bs-toggle="tab"
                                            data-bs-target="#temple-pane" type="button" role="tab"
                                            aria-controls="temple-pane" aria-selected="false">Temple</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="education" :class="{active: selectedCategory === 1}" @click="selectCategory(1)" data-bs-toggle="tab"
                                            data-bs-target="#education-pane" type="button" role="tab"
                                            aria-controls="education-pane" aria-selected="false">Education</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" id="dharmasala" :class="{active: selectedCategory === 4}" @click="selectCategory(4)" data-bs-toggle="tab"
                                            data-bs-target="#dharmasala-pane" type="button" role="tab"
                                            aria-controls="dharmasala-pane" aria-selected="false">Dharmasala</button>
                                    </li>
                                    <li class="nav-item" role="presentation">
                                        <button class="nav-link" :class="{active: selectedCategory === 6}" @click="selectCategory(6)" id="oldage" data-bs-toggle="tab"
                                            data-bs-target="#oldage-pane" type="button" role="tab"
                                            aria-controls="oldage-pane" aria-selected="false">Old Age</button>
                                    </li>
                                    <div>
                                        <b-dropdown text="More" class="dropdownMenuButton2" no-caret>
                                            <b-dropdown-item id="orphanage" :class="{active: selectedCategory === 5}" @click="selectCategory(5)" data-bs-toggle="tab" data-bs-target="#orphanage-pane" type="button" role="tab"   aria-controls="orphanage-pane" aria-selected="false">
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link" >Orphanage</button>
                                                </li>
                                            </b-dropdown-item>
                                            <b-dropdown-item  id="gausala" :class="{active: selectedCategory === 7}" @click="selectCategory(7)" data-bs-toggle="tab" data-bs-target="#gausala-pane" type="button" role="tab" aria-controls="gausala-pane" aria-selected="false">
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link">Gausala</button>
                                                </li>
                                            </b-dropdown-item>
                                            <b-dropdown-item id="bhojnalya" :class="{active: selectedCategory === 8}" @click="selectCategory(8)" data-bs-toggle="tab" data-bs-target="#bhojnalya-pane" type="button" role="tab" aria-controls="bhojnalya-pane" aria-selected="false">
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link" >Bhojnalya</button>
                                                </li>
                                            </b-dropdown-item>
                                            <b-dropdown-item id="muniseva" :class="{active: selectedCategory === 3}" @click="selectCategory(3)" data-bs-toggle="tab" data-bs-target="#muniseva-pane" type="button" role="tab" aria-controls="muniseva-pane" aria-selected="false">
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link" >Muni Seva</button>
                                                </li>
                                            </b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                </ul>
                            </div>
                        </section>
                        <section class="mt-0" style="background-color: #F4F4F4;">
                            <div class="container m-2">
                                <div class="tab-content mt-3" id="myTabContent" style="margin-left: -10px;">
                                    <div v-if="searchSansthaPer" class="tab-pane fade show active" id="search-sanstha-pane" role="tabpanel" aria-labelledby="show-all" tabindex="0">
                                        <div class="alert alert-warning" role="alert">
                                            No data found.
                                        </div>
                                    </div>

                                    <!-- <div v-if="searchSanstha.length > 0" class="tab-pane fade show active" id="search-sanstha-pane" role="tabpanel" aria-labelledby="show-all" tabindex="0"> -->
                                    <div v-else-if="searchSanstha.length > 0" class="tab-pane fade show active" id="search-sanstha-pane" role="tabpanel" aria-labelledby="show-all" tabindex="0">
                                        <div class="row row-cols-1 g-4">
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in searchSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img class="exloreorglocimg img-fluid"
                                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                            :alt="res.title" :title="res.title">
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
                                                                    <span class="m-1 exploreorgloc"><i class="bi bi-geo-alt-fill px-1"></i>{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <!-- <infinite-loading @distance="1" @infinite="getSearchSanstha"></infinite-loading> -->
                                        </div>
                                    </div>
                                    <div v-else-if="searchSansthaweb.length > 0" class="tab-pane fade show active"
                                        id="search-sanstha-pane" role="tabpanel" aria-labelledby="search-sanstha" tabindex="0">
                                        <div class="row row-cols-1 g-4 mb-2">
                                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                                v-for='(res, index) in searchSansthaweb'>
                                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img class="exloreorglocimg img-fluid"
                                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                            :alt="res.title" :title="res.title">
                                                        <div class="card-body text-center">
                                                            <div class="row">
                                                                <div
                                                                    class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                                    <span class="exploreorgname">{{ res.title }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12 col-lg-12 col-sm-12 col-xxl-12 col-xs-12 col-xl-12">
                                                                <div class="footer">
                                                                    <span class="m-1 exploreorgloc">
                                                                        <i class="bi bi-geo-alt-fill px-1"></i>{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div v-else class="tab-pane fade show active" id="show-all-pane" role="tabpanel" aria-labelledby="show-all" tabindex="0"> -->
                                    <div v-if="allSanstha.length >= 0 && searchSanstha.length == 0 && searchSansthaweb.length == 0" class="tab-pane fade show active" id="show-all-pane" role="tabpanel" aria-labelledby="show-all" tabindex="0">
                                        <div class="row  g-4">
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in allSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img class="exloreorglocimg img-fluid"
                                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                            :alt="res.title" :title="res.title">
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
                                                                    <span class="m-1 exploreorgloc"><i class="bi bi-geo-alt-fill px-1"></i>{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <infinite-loading @distance="1" @infinite="getAllSansthas"></infinite-loading>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="temple-pane" role="tabpanel" aria-labelledby="temple" tabindex="0">
                                        <div class="row g-4">
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in templeSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img class="exloreorglocimg img-fluid"
                                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                            :alt="res.title" :title="res.title">
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
                                                                    <span class="m-1 exploreorgloc"><i class="bi bi-geo-alt-fill px-1"></i>{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <infinite-loading @distance="1" @infinite="getTempleCategoryFilter"></infinite-loading>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="education-pane" role="tabpanel" aria-labelledby="education" tabindex="0">
                                        <div class="row g-4">
                                            <div v-if="educationSanstha.length == 0"  class="text-center">{{ this.message }}</div>
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in educationSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img class="exloreorglocimg img-fluid"
                                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                            :alt="res.title" :title="res.title">
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
                                                                    <span class="m-1 exploreorgloc"><i class="bi bi-geo-alt-fill px-1"></i>{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <infinite-loading @distance="1" @infinite="getEducationCategoryFilter"></infinite-loading>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="dharmasala-pane" role="tabpanel" aria-labelledby="dharmasala" tabindex="0">
                                        <div class="row g-4">
                                            <div v-if="dharamshalaSanstha.length == 0" class="text-center">{{ this.message }}</div>
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in dharamshalaSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img class="exloreorglocimg img-fluid"
                                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                            :alt="res.title" :title="res.title">
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
                                                                    <span class="m-1 exploreorgloc"><i class="bi bi-geo-alt-fill px-1"></i>{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <infinite-loading @distance="1" @infinite="getDharmshalaFilter"></infinite-loading>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="oldage-pane" role="tabpanel" aria-labelledby="oldage" tabindex="0">
                                        <div class="row  g-4">
                                            <div v-if="oldageSanstha.length == 0"  class="text-center">{{ this.message }}</div>
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in oldageSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img class="exloreorglocimg img-fluid"
                                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                            :alt="res.title" :title="res.title">
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
                                                                    <span class="m-1 exploreorgloc"><i class="bi bi-geo-alt-fill px-1"></i>{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <infinite-loading @distance="1" @infinite="getOldAgeCategoryFilter"></infinite-loading>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="orphanage-pane" role="tabpanel" aria-labelledby="orphanage" tabindex="0">
                                        <div class="row g-4">
                                            <div v-if="orphanageSanstha.length == 0" class="text-center">{{ this.message }}</div>
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in orphanageSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :alt="res.title" :title="res.title" class="exloreorglocimg img-fluid">
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
                                                                    <span class="m-1 exploreorgloc">
                                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1" alt="...">{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <infinite-loading @distance="1" @infinite="getOrphanageCategoryFilter"></infinite-loading>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="muniseva-pane" role="tabpanel" aria-labelledby="muniseva" tabindex="0">
                                        <div class="row g-4">
                                            <div v-if="munisevaSanstha.length == 0"  class="text-center">{{ this.message }}</div>
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in munisevaSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :alt="res.title" :title="res.title"class="exloreorglocimg img-fluid">
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
                                                                    <span class="m-1 exploreorgloc">
                                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1" alt="...">{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <infinite-loading @distance="1" @infinite="getMuniSevaFilter"></infinite-loading>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="gausala-pane" role="tabpanel" aria-labelledby="gausala" tabindex="0">
                                        <div class="row g-4">
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in gausalaSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :alt="res.title" :title="res.title" class="exloreorglocimg img-fluid">
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
                                                                    <span class="m-1 exploreorgloc">
                                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1" alt="...">{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <infinite-loading @distance="1" @infinite="getGausalaCategoryFilter"></infinite-loading>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="bhojnalya-pane" role="tabpanel" aria-labelledby="bhojnalya" tabindex="0">
                                        <div class="row g-4">
                                            <div v-if="bhojnalyaSanstha.length == 0"  class="text-center">{{ this.message }}</div>
                                            <div class="col-md-12 col-xxl-4 col-lg-6 col-xl-4 col-sm-12 col-xs-12" v-for='(res, index) in bhojnalyaSanstha'>
                                                <a class="explore-link" :href="'sanstha-detail/'+res.id">
                                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                                        :alt="res.title" :title="res.title" class="exloreorglocimg img-fluid">
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
                                                                    <span class="m-1 exploreorgloc">
                                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1" alt="...">{{ res.location }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <infinite-loading @distance="1" @infinite="getBhojnalyaCategoryFilter"></infinite-loading>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import afterLoginSansthaService from "../../services/afterLoginSanstha.service";
import profileSideBarService from "../../services/profilesidebar.service"
import sansthaCatgeoryService from "../../services/sansthacategory.service"
export default {
    name: "App",
    data() {
        return {
            selectedCategory: null,selectedItemState: null,emptyDataMarginTop: 'initial',searchSansthaPer: false,searchSansthaweb:[],
            allSanstha: [], page: 1, search_term: '', message: '', sanstha_category: [],
            templeSanstha: [], gausalaSanstha: [], educationSanstha: [], oldageSanstha: [], munisevaSanstha: [],
            orphanageSanstha: [], bhojnalyaSanstha: [], states: [],searchSanstha:[],
            dharamshalaSanstha: [], temple_page: 1, education_page: 1, gausala_page: 1, orphanage_page: 1, oldage_page: 1,
            dharmshala_page: 1, bhojnalya_page: 1, muniseva_page: 1, gaushala_page: 1,search_page: 1,
        };
    },
    
    methods: {
        selectCategory(categoryText) {
            this.selectedCategory = categoryText;
            switch(categoryText) {
                case 1:
                    document.getElementById('education').click();
                    break;
                case 2:
                    document.getElementById('temple').click();
                    break;
                case 3:
                    document.getElementById('muniseva').click();
                    break;
                case 4:
                    document.getElementById('dharmasala').click();
                    break;
                case 5:
                    document.getElementById('orphanage').click();
                    break;
                case 6:
                    document.getElementById('oldage').click();
                    break;
                case 7:
                    document.getElementById('gausala').click();
                    break;
                case 8:
                    document.getElementById('bhojnalya').click();
                    break;
                default:
                    document.getElementById('show-all').click();
            }
        },
        selectItemState(stateText) {
            // this.allSanstha = [];
            // this.searchSanstha = [];
            // this.searchSansthaweb = [];
            this.selectedItemState = stateText;
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
        handleTopPosition() {
            this.emptyDataMarginTop = this.allSanstha.length === 0 ? '132px' : 'initial';
        },
        async getSearchSanstha(){
        this.searchSansthaPer = false;
        this.searchSanstha = [];
        this.searchSansthaweb = [];
            const data = {
                params: {
                    search_term: this.search_term,
                    state_id: this.selectedItemState,
                    category_id: this.selectedCategory,
                }
            }
            const response = await afterLoginSansthaService.getSearchSanstha({...data})
            this.allSanstha = [];
            if(response.status === 200 || 201){
                if(response.data.length === 0){
                        this.searchSansthaPer = true;
                        return ;
                    }else {
                        $.each(response.data, (key, value) => {
                        this.searchSansthaweb.push(value);
                    });
                }
            }
        },
        async getAllSansthas($state) {
            this.searchSansthaPer = false;
            const response = await afterLoginSansthaService.getAllSanstha(this.page);
            if (response.status === 200 || response.status === 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.allSanstha.push(value);
                    });
                    $state.loaded();
                    this.page = this.page + 1;
                }else {
                    $state.complete();
                }
            }
        },
        async clearForm($state){
            this.searchSansthaPer = false;
            this.allSanstha = [];
            this.searchSanstha = [];
            this.searchSansthaweb = [];
            this.selectedCategory = null;
            this.selectedItemState = null;
            this.search_term = null || '';
            this.page = 1; 
            await this.getAllSansthas($state);
        },
        async getTempleCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaTemple(this.temple_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.templeSanstha.push(value);
                    });
                    $state.loaded();
                    this.temple_page = this.temple_page + 1;
                }else {
                    $state.complete();
                }
            }
        },
        async getEducationCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaEducation(this.education_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.educationSanstha.push(value);
                    });
                    $state.loaded();
                    this.education_page = this.education_page + 1;
                }else {
                    $state.complete();
                }
            }
        },
        async getGausalaCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaGaushala(this.gausala_page)
            if (response.status === 200 || 201) {
                if(response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.gausalaSanstha.push(value);
                    });
                    $state.loaded();
                    this.gausala_page = this.gausala_page + 1;
                }else{
                    $state.complete();
                }
            }
        },
        async getOldAgeCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaOldAge(this.oldage_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.oldageSanstha.push(value);
                    });
                    $state.loaded();
                    this.oldage_page = this.oldage_page + 1;
                }else {
                    $state.complete();
                }
            }
        },
        async getMuniSevaFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaMuniSeva(this.muniseva_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.munisevaSanstha.push(value);
                    });
                    $state.loaded();
                    this.muniseva_page = this.muniseva_page + 1;
                }else {
                    $state.complete();
                }
            }
        },
        async getOrphanageCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaOrphanage(this.orphanage_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.orphanageSanstha.push(value);
                    });
                    $state.loaded();
                    this.orphanage_page = this.orphanage_page + 1;
                }else {
                    $state.complete();
                }
            }
        },
        async getBhojnalyaCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaBhojnalya(this.bhojnalya_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.bhojnalyaSanstha.push(value);
                    });
                    $state.loaded();
                    this.bhojnalya_page = this.bhojnalya_page + 1;
                }else {
                    $state.complete();
                }
            }
        },
        async getDharmshalaFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaDharamshala(this.dharmshala_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.dharamshalaSanstha.push(value);
                    });
                    $state.loaded();
                    this.dharmshala_page = this.dharmshala_page + 1;
                }else {
                    $state.complete();
                }
                
            }
        },
        async postSearchFilter() {
            const data = {
                params: {
                    flag: "frontend",
                    search_key: this.name,
                }
            }
            const response = await afterLoginSansthaService.sansthaOrganizationSearch({ ...data })
            if (response.status === 200 || 201) {
                this.page = this.page + 1;
            } else {
                console.error("Something went wrong")
            }
        },
        ScrollnavarSanstha() {
            window.onload = function () {
                document.getElementById('temple').addEventListener('click', function () {
                    window.scrollBy(0, 1);
                });
                document.getElementById('education').addEventListener('click', function () {
                    window.scrollBy(0, 2);
                });
                document.getElementById('dharmasala').addEventListener('click', function () {
                    window.scrollBy(0, 3);
                });
                document.getElementById('oldage').addEventListener('click', function () {
                    window.scrollBy(0, 4);
                });
                document.getElementById('orphanage').addEventListener('click', function () {
                    window.scrollBy(0, 5);
                });
                document.getElementById('muniseva').addEventListener('click', function () {
                    window.scrollBy(0, 6);
                });
                document.getElementById('gausala').addEventListener('click', function () {
                    window.scrollBy(0, 7);
                });
                document.getElementById('bhojnalya').addEventListener('click', function () {
                    window.scrollBy(0, 8);
                });
            };
        },
    },
    beforeMount() {
        this.ScrollnavarSanstha();
        this.getStates();
        this.handleTopPosition();
        this.getSansthasCategory();
    },
};
</script>