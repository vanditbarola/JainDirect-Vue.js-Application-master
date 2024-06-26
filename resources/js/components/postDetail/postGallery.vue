<template>
     
    <div class="container mb-5 pb-3 mt-2">
        <label class="section_header p-1 m-1">Gallery</label>
                    <!-- <label class="section_body" style="float: right;"><a href="" class="gallery_link"><i
                        class="bi bi-filter-left"></i>Sort By Name</a></label> -->
               
                <div class=" mt-1 mb-5" >
                <ul class="nav nav-tabs gallery_tab " id="myTab1" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="album-tab" data-bs-toggle="tab" data-bs-target="#album"
                            type="button" role="tab" aria-controls="album" aria-selected="true">Album</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="photos-tab" data-bs-toggle="tab" data-bs-target="#photos"
                            type="button" role="tab" aria-controls="photos" aria-selected="false"> All Photos</button>
                    </li>
                </ul>
                <div class="tab-content mt-3 pb-3 mx-3" id="myTabContent1">
                    <div class="tab-pane fade show active" id="album" role="tabpanel" aria-labelledby="album-tab">
                        <div class="container">
                            <div class="row g-3 pb-4">
                                <div class="col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 ">
                                    <a class="more_images photos_counts" @click="goToPhotosTab">
                                        <div class="card card_santha_gallery_card1">
                                            <div class="image_stack">
                                                <div class="image_stack_bottom_post">
                                                    <img :src="gallerySanstha[0] ? gallerySanstha[0].gallery[0] ? gallerySanstha[0].gallery[0].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[0].gallery[1]" class="image_stack_top">
                                                    <img :src="gallerySanstha[0] ? gallerySanstha[0].gallery[1] ? gallerySanstha[0].gallery[1].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[0].gallery[2]" class="image_stack_top2">
                                                    <img :src="gallerySanstha[0] ? gallerySanstha[0].gallery[2] ? gallerySanstha[0].gallery[2].original_url : '/images/jd_card_logo.png' : '/images/jd_card_logo.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[0].gallery[3]" class="photo_count_div">
                                                    <span class="more_images photos_counts">
                                                        {{ gallerySanstha[0] ? Math.max(gallerySanstha[0].gallery.length  -  3, 0) + ' +' : '' }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <!-- <div class="col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 modal_right_div">
                                <div class="card card_santha_gallery_card1">
                                    <iframe class="image2"
                                        src="https://s3.ap-south-1.amazonaws.com/jaindirect.org/3622/6374ea5b713d9_WhatsApp-Video-2022-11-14-at-4.03.56-PM.mp4"
                                        title="YouTube video" allowfullscreen>
                                    </iframe>
                                </div>
                            </div> -->
                                <div v-if="gallerySanstha[1]"
                                    class="col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 ">
                                    <a class="more_images photos_counts" @click="goToPhotosTab">
                                        <div class="card card_santha_gallery_card1">
                                            <div class="image_stack">
                                                <div v-if="gallerySanstha[1].gallery[0]"
                                                    class="image_stack_bottom_post">
                                                    <img :src="gallerySanstha[1] ? gallerySanstha[1].gallery[0] ? gallerySanstha[1].gallery[0].original_url : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png' : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[1].gallery[1]" class="image_stack_top">
                                                    <img :src="gallerySanstha[1] ? gallerySanstha[1].gallery[1] ? gallerySanstha[1].gallery[1].original_url : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png' : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[1].gallery[2]" class="image_stack_top2">
                                                    <img :src="gallerySanstha[1] ? gallerySanstha[1].gallery[2] ? gallerySanstha[1].gallery[2].original_url : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png' : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[1].gallery[3]" class="photo_count_div">
                                                    <span class="more_images photos_counts">
                                                        {{ gallerySanstha[1] ? Math.max(gallerySanstha[1].gallery.length  -  3, 0) + ' +' : '' }}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div v-if="gallerySanstha[2]"
                                    class="col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 ">
                                    <a class="more_images photos_counts" @click="goToPhotosTab">
                                        <div class="card card_santha_gallery_card1">
                                            <div class="image_stack">
                                                <div v-if="gallerySanstha[2].gallery[0]"
                                                    class="image_stack_bottom_post">
                                                    <img :src="gallerySanstha[2] ? gallerySanstha[2].gallery[0] ? gallerySanstha[2].gallery[0].original_url : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png' : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[2].gallery[1]" class="image_stack_top">
                                                    <img :src="gallerySanstha[2] ? gallerySanstha[2].gallery[1] ? gallerySanstha[2].gallery[1].original_url : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png' : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[2].gallery[2]" class="image_stack_top2">
                                                    <img :src="gallerySanstha[2] ? gallerySanstha[2].gallery[2] ? gallerySanstha[2].gallery[2].original_url : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png' : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[2].gallery[3]" class="photo_count_div">
                                                    <span class="more_images photos_counts">{{ gallerySanstha[2] ? Math.max(gallerySanstha[2].gallery.length - 3, 0) + ' +' : ''  }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div v-if="gallerySanstha[3]"
                                    class="col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3 ">
                                    <a class="more_images photos_counts" @click="goToPhotosTab">
                                        <div class="card card_santha_gallery_card1">
                                            <div class="image_stack">
                                                <div v-if="gallerySanstha[3].gallery[0]"
                                                    class="image_stack_bottom_post">
                                                    <img :src="gallerySanstha[3] ? gallerySanstha[3].gallery[0] ? gallerySanstha[3].gallery[0].original_url : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png' : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[3].gallery[1]" class="image_stack_top">
                                                    <img :src="gallerySanstha[3] ? gallerySanstha[3].gallery[1] ? gallerySanstha[3].gallery[1].original_url : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png' : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[3].gallery[2]" class="image_stack_top2">
                                                    <img :src="gallerySanstha[3] ? gallerySanstha[3].gallery[2] ? gallerySanstha[3].gallery[2].original_url : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png' : '/images/5cb3ea93-a96b-4ddf-9d38-07f3384c97b6.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="gallerySanstha[3].gallery[3]" class="photo_count_div">
                                                    <span class="more_images photos_counts">{{ gallerySanstha[3] ? Math.max(gallerySanstha[3].gallery.length - 3, 0) + ' +' : ''    }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- tab for all photos -->
                    <div class="tab-pane fade" id="photos" role="tabpanel" aria-labelledby="photos-tab">
                        <section>
                            <div class="container">
                                <div class="card p-3 border-0">
                                    <div class="row">
                                        <template v-for="(res, index) in allGallerySanstha">
                                            <template v-for="(r, idx) in res.gallery">
                                                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 col-xxl-3">
                                                    <figure>
                                                        <a data-fancybox="gallery" :href="`${r.original_url}`">
                                                            <div v-if="isImage(r.original_url)">
                                                                <img :src="`${r.original_url}`"
                                                                    class="all_photos_images img-fluid" alt="...">
                                                            </div>
                                                            <div v-else-if="isVideo(r.original_url)">
                                                                <video controls class="all_photos_images img-fluid">
                                                                    <source :src="`${r.original_url}`" type="video/mp4">
                                                                </video>
                                                            </div>
                                                        </a>
                                                    </figure>
                                                </div>
                                            </template>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </section>
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
            gallerySanstha: [], allGallerySanstha: [],
        };
    },
    beforeMount() {
        this.getGalleryBasedSanstha();
    },
    mounted() {
        $(document).ready(function () {
            $('[data-fancybox="gallery"]').fancybox({
                buttons: [
                    "slideShow",
                    "thumbs",
                    "zoom",
                    "fullScreen",
                    "share",
                    "close"
                ],
                loop: false,
                protect: true
            });
        });
    },
    methods: {
        isImage(url) {
            return /\.(jpeg|jpg|png)$/i.test(url);
        },
        isVideo(url) {
            return /\.(mp4)$/i.test(url);
        },
        async getGalleryBasedSanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllGallerySanstha({ ...data });
            if (response.status === 200 || 201) {
                this.gallerySanstha = response;
                $.each(response, (key, value) => {
                    this.allGallerySanstha.push(value);
                });
            } else {
                console.error("Something went wrong")
            }
        },
        goToPhotosTab() {
            const photosTab = document.getElementById('photos-tab');
            if (photosTab) {
                photosTab.click();
            }
        },
    }
};
</script>