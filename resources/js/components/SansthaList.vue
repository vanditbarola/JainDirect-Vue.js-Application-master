    <template>
        <div x-data="app()" x-cloak>
            <section class="p-3 mt-4" style="background-color: #FFCF88 ;">
                <div class="container p-1 mt-1">
                    <div class="section_header2 text-center mt-4">Search Temples, Dharmasala, Muni Seva,Orphanage, etc...
                    </div>
                    <form class="row justify-content-center g-2" @submit.prevent="getSearchSansthas()">
                        <div class="col-auto">
                            <div class="input-group">
                                <div class="input-group-text sanstha_input_group_text search_dropdowns"
                                    style="background-color: white !important;">
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
                                                @click="selectItemState(state.id)"><a class="dropdown-item" href="#">{{
                        state.name }}</a></b-dropdown-item>
                                        </b-dropdown>
                                    </div>
                                </div>
                                <input type="text" class="form-control search_box  search_box1 sanstha_input_serach"
                                    placeholder="Enter your search keyword here..." v-model="search_term">
                            </div>
                        </div>
                        <div class="col-auto search_buttons">
                            <button type="submit" class="form-control searchbutton mb-3">Search</button>
                            <button type="submit" class="form-control searchbutton mb-3" @click="clearForm()">Clear</button>
                        </div>
                    </form>
                </div>
            </section>

            <section style="box-shadow: 0px 3px 6px #00000029;">
                <div class="container" style="max-width: 1200px;">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link " :class="{active: selectedCategory === null}" @click="selectCategory(null)"  id="show-all" data-bs-toggle="tab"
                                data-bs-target="#show-all-pane" type="button" role="tab" aria-controls="show-all-pane"
                                aria-selected="true">Show All</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{active: selectedCategory === 2}" @click="selectCategory(2)" id="temple" data-bs-toggle="tab" data-bs-target="#temple-pane"
                                type="button" role="tab" aria-controls="temple-pane" aria-selected="false">Temple</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{active: selectedCategory === 1}" @click="selectCategory(1)" id="education" data-bs-toggle="tab" data-bs-target="#education-pane"
                                type="button" role="tab" aria-controls="education-pane"
                                aria-selected="false">Education</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{active: selectedCategory === 4}" @click="selectCategory(4)" id="dharamshala" data-bs-toggle="tab"
                                data-bs-target="#dharamshala-pane" type="button" role="tab" aria-controls="dharamshala-pane"
                                aria-selected="false">Dharamshala</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{active: selectedCategory === 8}" @click="selectCategory(8)" id="bhojnalya" data-bs-toggle="tab" data-bs-target="#bhojnalya-pane"
                                type="button" role="tab" aria-controls="bhojnalya-pane"
                                aria-selected="false">Bhojnalya</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{active: selectedCategory === 3}" @click="selectCategory(3)" id="muniseva" data-bs-toggle="tab" data-bs-target="#muniseva-pane"
                                type="button" role="tab" aria-controls="muniseva-pane" aria-selected="false">Muni
                                Seva</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{active: selectedCategory === 5}" @click="selectCategory(5)" id="orphanage" data-bs-toggle="tab" data-bs-target="#orphanage-pane"
                                type="button" role="tab" aria-controls="orphanage-pane"
                                aria-selected="false">Orphanage</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link"  :class="{active: selectedCategory === 6}" @click="selectCategory(6)" id="oldage" data-bs-toggle="tab" data-bs-target="#oldage-pane"
                                type="button" role="tab" aria-controls="oldage-pane" aria-selected="false">Old Age</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" :class="{active: selectedCategory === 7}" @click="selectCategory(7)" id="gausala" data-bs-toggle="tab" data-bs-target="#gausala-pane"
                                type="button" role="tab" aria-controls="gausala-pane" aria-selected="false">Gausala</button>
                        </li>
                    </ul>
                </div>
            </section>

        <section class="mt-1 p-3 sansthalist_section">
            <div class="container">
                <div class="tab-content mt-3" id="myTabContent">
                    <div v-if="searchSansthaPer" class="tab-pane fade show active" id="search-sanstha-pane"
                        role="tabpanel" aria-labelledby="search-sanstha" tabindex="0">
                        <div class="alert alert-warning" role="alert">
                            No data found.
                        </div>
                    </div>
                    <div v-else-if="searchSanstha.length > 0" class="tab-pane fade show active" id="search-sanstha-pane"
                        role="tabpanel" aria-labelledby="search-sanstha" tabindex="0">
                        <div class="row row-cols-1 g-4 mb-2">
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in searchSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img class="exloreorglocimg img-fluid"
                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                            :title=" res.title" :alt="res.title">
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
                    <div v-else-if="searchSansthaweb.length > 0" class="tab-pane fade show active"
                        id="search-sanstha-pane" role="tabpanel" aria-labelledby="search-sanstha" tabindex="0">
                        <div class="row row-cols-1 g-4 mb-2">
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in searchSansthaweb'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img class="exloreorglocimg img-fluid"
                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                            :title=" res.title" :alt="res.title">
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
                    <div v-if="allSanstha.length >= 0 && searchSanstha.length == 0 && searchSansthaweb.length == 0"
                        class="tab-pane fade show active" id="show-all-pane" role="tabpanel" aria-labelledby="show-all"
                        tabindex="0">
                        <div class="row row-cols-1 g-4">
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in allSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img class="exloreorglocimg img-fluid"
                                            :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                            :title=" res.title" :alt="res.title">
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
                            <infinite-loading @distance="1" @infinite="getAllSansthas"></infinite-loading>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="temple-pane" role="tabpanel" aria-labelledby="temple" tabindex="0" >
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in templeSanstha' >
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                        :title=" res.title" :alt="res.title" class="exloreorglocimg img-fluid">
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
                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1"
                                                            alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="loader-container">
                                <infinite-loading v-if="selectedCategory === 2" istance="1" @infinite="getTempleCategoryFilter"></infinite-loading>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="education-pane" role="tabpanel" aria-labelledby="education"
                        tabindex="0">
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div v-if="educationSanstha.length == 0" class="text-center">{{ this.message }}</div>
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in educationSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                        :title=" res.title" :alt="res.title" class="exloreorglocimg img-fluid">
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
                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1"
                                                            alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="loader-container">
                                <infinite-loading @distance="1"
                                    @infinite="getEducationCategoryFilter"></infinite-loading>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="dharamshala-pane" role="tabpanel" aria-labelledby="dharamshala"
                        tabindex="0">
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div v-if="dharamshalaSanstha.length == 0" class="text-center">{{ this.message }}</div>
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in dharamshalaSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                        :title=" res.title" :alt="res.title"class="exloreorglocimg img-fluid">
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
                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1"
                                                            alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="loader-container">
                                <infinite-loading @distance="1" @infinite="getDharmshalaFilter"></infinite-loading>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="bhojnalya-pane" role="tabpanel" aria-labelledby="bhojnalya"
                        tabindex="0">
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div v-if="bhojnalyaSanstha.length == 0" class="text-center">{{ this.message }}</div>
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in bhojnalyaSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                        :title=" res.title" :alt="res.title" class="exloreorglocimg img-fluid">
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
                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1"
                                                            alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="loader-container">
                                <infinite-loading @distance="1"
                                    @infinite="getBhojnalyaCategoryFilter"></infinite-loading>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="muniseva-pane" role="tabpanel" aria-labelledby="muniseva"
                        tabindex="0">
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div v-if="munisevaSanstha.length == 0" class="text-center">{{ this.message }}</div>
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in munisevaSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                        :title=" res.title" :alt="res.title" class="exloreorglocimg img-fluid">
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
                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1"
                                                            alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="loader-container">
                                <infinite-loading @distance="1" @infinite="getMuniSevaFilter"></infinite-loading>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="orphanage-pane" role="tabpanel" aria-labelledby="orphanage"
                        tabindex="0">
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div v-if="orphanageSanstha.length == 0" class="text-center">{{ this.message }}</div>
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in orphanageSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                        :title=" res.title" :alt="res.title" class="exloreorglocimg img-fluid">
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
                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1"
                                                            alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="loader-container">
                                <infinite-loading @distance="1"
                                    @infinite="getOrphanageCategoryFilter"></infinite-loading>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="oldage-pane" role="tabpanel" aria-labelledby="oldage" tabindex="0">
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in oldageSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                        :title=" res.title" :alt="res.title" class="exloreorglocimg img-fluid">
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
                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1"
                                                            alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <!-- <infinite-loading @distance="1" @infinite="getOldAgeCategoryFilter"></infinite-loading> -->
                            <div class="loader-container">
                                <infinite-loading @distance="1" @infinite="getOldAgeCategoryFilter"></infinite-loading>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="gausala-pane" role="tabpanel" aria-labelledby="gausala" tabindex="0">
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div v-if="gausalaSanstha.length == 0" class="text-center">{{ this.message }}</div>
                            <div class="col-md-6 col-xxl-3 col-lg-3 col-xl-3 col-sm-6 col-xs-6"
                                v-for='(res, index) in gausalaSanstha'>
                                <a class="explore-link" :href="'sanstha-detail/' + res.id">
                                    <div class="card h-100 text-center p-2 card_exploreorg">
                                        <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : 'images/jd_card_logo.png' : 'images/jd_card_logo.png'}`"
                                        :title=" res.title" :alt="res.title" class="exloreorglocimg img-fluid">
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
                                                        <img src="images/ic_place_24px.svg" class="loation_icon me-1"
                                                            alt="...">{{ res.location }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="loader-container">
                                <infinite-loading @distance="1" @infinite="getGausalaCategoryFilter"></infinite-loading>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import sansthaCatgeoryService from "../../services/sansthacategory.service"
import profileSideBarService from "../../services/profilesidebar.service"
import afterLoginSansthaService from "../../services/afterLoginSanstha.service";
export default {
    name: "App",
    data() {
        return {
            token: localStorage.getItem('storeToken'),activeTab: 'show-all',
            selectedCategory: null, selectedItemState: null, searchSansthaPer: false, searchSansthaweb: [],
            search_term: localStorage.getItem('searchTerm') || '', message: '',
            allSanstha: [], templeSanstha: [], gausalaSanstha: [], sanstha_category: [], states: [],
            educationSanstha: [], orphanageSanstha: [], oldageSanstha: [], searchSanstha: [],
            dharamshalaSanstha: [], bhojnalyaSanstha: [], munisevaSanstha: [],
            temple_page: 1, education_page: 1, gausala_page: 1, orphanage_page: 1, oldage_page: 1,
            page: 1, dharmshala_page: 1, bhojnalya_page: 1, muniseva_page: 1, gaushala_page: 1,
        };
    },
    created() {
        this.getDharmshalaFilter();
        this.getBhojnalyaCategoryFilter();
        this.getEducationCategoryFilter();
        this.getTempleCategoryFilter();
        this.getMuniSevaFilter();
        this.getOrphanageCategoryFilter();
        this.getOldAgeCategoryFilter();
        this.getGausalaCategoryFilter();

    },
    methods: {
        setActiveTab() {
            this.activeTab = null || '';
            const categoryMap = {
                1: 'education',
                2: 'temple',
                3: 'dharamshala',
                4: 'bhojnalya',
                5: 'muniseva',
                6: 'orphanage',
                7: 'oldage',
                8: 'gausala',
            };
            this.activeTab = categoryMap[this.selectedCategory] || 'show-all';
        },
        selectCategory(categoryText, id) {
            this.searchSanstha = [];
            this.searchSansthaweb = [];
            this.selectedCategory = categoryText;
            this.setActiveTab();
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
                    document.getElementById('dharamshala').click();
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
            this.searchSanstha = [];
            this.searchSansthaweb = [];
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
        async getAllSansthas($state) {
            this.searchSansthaPer = false;
            const response = await afterLoginSansthaService.getAllSanstha(this.page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.allSanstha.push(value);
                    });
                    $state.loaded();
                    this.page = this.page + 1;
                } else {
                    $state.complete();
                }
            }
        },
        async getSearchSansthas() {
            this.searchSansthaPer = false;
            const storedCategory = localStorage.getItem('selectCategory');
            const storedItemState = localStorage.getItem('selectState');
            this.searchSanstha = [];
            this.searchSansthaweb = [];
            if (storedItemState || storedCategory) {
                return;
            } else {
                const data = {
                    params: {
                        search_term: this.search_term,
                        state_id: this.selectedItemState,
                        category_id: this.selectedCategory,
                    }
                }
                const response = await afterLoginSansthaService.getSearchSanstha({ ...data })
                this.allSanstha = [];
                if (response.status === 200 || 201) {
                    if (response.data.length === 0) {
                        this.searchSansthaPer = true;
                        return;
                    } else {
                        $.each(response.data, (key, value) => {
                            this.searchSansthaweb.push(value);
                        });
                    }
                }
            }
        },
        async clearForm($state) {
            this.searchSansthaPer = true;
            localStorage.removeItem('selectState');
            localStorage.removeItem('selectCategory');
            localStorage.removeItem('searchTerm');
            this.allSanstha = [];
            this.searchSansthaweb = [];
            this.searchSanstha = [];
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
                    this.templeSanstha.push(...response.data);
                    this.temple_page = this.temple_page + 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            };
        },
        async getEducationCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaEducation(this.education_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    this.educationSanstha.push(...response.data);
                    this.education_page = this.education_page + 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            }
        },
        async getGausalaCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaGaushala(this.gausala_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    this.gausalaSanstha.push(...response.data);
                    this.gausala_page = this.gausala_page + 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            }
        },
        async getOldAgeCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaOldAge(this.oldage_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    this.oldageSanstha.push(...response.data);
                    this.oldage_page = this.oldage_page + 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }

            }
        },
        async getMuniSevaFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaMuniSeva(this.muniseva_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    this.munisevaSanstha.push(...response.data);
                    this.muniseva_page = this.muniseva_page + 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            }
        },
        async getOrphanageCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaOrphanage(this.orphanage_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    this.orphanageSanstha.push(...response.data);
                    this.orphanage_page = this.orphanage_page + 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            }
        },
        async getBhojnalyaCategoryFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaBhojnalya(this.bhojnalya_page)
            if (response.status === 200 || 201) {
                if (response.status === 200 || 201) {
                    if (response.data.length > 0) {
                        this.bhojnalyaSanstha.push(...response.data);
                        this.bhojnalya_page = this.bhojnalya_page + 1;
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                }
            }
        },
        async getDharmshalaFilter($state) {
            const response = await afterLoginSansthaService.getAllSansthaDharamshala(this.dharmshala_page)
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    this.dharamshalaSanstha.push(...response.data);
                    this.dharmshala_page = this.dharmshala_page + 1;
                    $state.loaded();

                } else {
                    $state.complete();
                }
            }
        },
        // initializeData() {
        //     this.getTempleCategoryFilter();
        //     this.getEducationCategoryFilter();
        //     this.getGausalaCategoryFilter();
        //     this.getOldAgeCategoryFilter();
        //     this.getMuniSevaFilter();
        //     this.getOrphanageCategoryFilter();
        //     this.getBhojnalyaCategoryFilter();
        //     this.getDharmshalaFilter();
        // },
        searchTabClear() {
            document.addEventListener('DOMContentLoaded', () => {
                document.getElementById('show-all').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                    document.getElementById('show-all-pane').style.display = 'none';
                    window.scrollBy(0, 2);
                });
                document.getElementById('temple').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                });
                document.getElementById('education').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                });
                document.getElementById('dharamshala').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                });
                document.getElementById('bhojnalya').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                });
                document.getElementById('muniseva').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                });
                document.getElementById('orphanage').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                });
                document.getElementById('oldage').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                });
                document.getElementById('gausala').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                });
                document.getElementById('show-all').addEventListener('click', () => {
                    document.getElementById('search-sanstha-pane').style.display = 'none';
                });
            });
        },
    },

    async mounted() {
        const storedCategory = localStorage.getItem('selectCategory');
        if (storedCategory) {
            this.selectedCategory = parseInt(storedCategory);
        }
        const storedItemState = localStorage.getItem('selectState');
        if (storedItemState) {
            this.selectedItemState = parseInt(storedItemState);
        }
        const searchTerm = localStorage.getItem('searchTerm');
        try {
            if (storedCategory || storedItemState || searchTerm) {
                const data = {
                    params: {
                        search_term: searchTerm ? searchTerm : "",
                        state_id: storedItemState ? storedItemState : "",
                        category_id: storedCategory ? storedCategory : "",
                    }
                }
                const response = await afterLoginSansthaService.getSearchSanstha({ ...data })
                this.allSanstha = [];
                if (response.status === 200 || 201) {
                    if (response) {
                        $.each(response.data, (key, value) => {
                            this.searchSanstha.push(value);
                        });
                    } else {
                        console.error('else');
                    }
                }
            }
        } catch (error) {
            console.error("Something went wrong")
        }
    },
    beforeMount() {
        if (!this.token) {
            localStorage.removeItem('storeMobile');
            localStorage.removeItem('storeEmail');
        }
        this.searchTabClear();
        this.getSansthasCategory();
        this.getStates();
        if (performance.navigation.type === 1) {
            // Clear local storage
            localStorage.removeItem('selectCategory');
            localStorage.removeItem('selectState');
            localStorage.removeItem('searchTerm');
        }
    },
};
</script>
<style scoped>
.loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    /* Adjust as needed */
}
</style>