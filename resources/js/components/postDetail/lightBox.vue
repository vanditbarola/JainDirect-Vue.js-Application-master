<template>
    <section>
        <div v-if="message.length > 0">
        </div>
        <div v-else>
            <div class="card p-3" style="box-shadow: 0px 3px 6px #00000029;">
                <label class="section_header p-2 m-1">Gallery</label>
                <div class="swiper swiper1 lightbox">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(res, index) in gallerySanstha" :key="index">
                            <a data-fancybox="gallery" :href="`${res.original_url}`">
                                <!-- <embed :src="res.original_url" class="img-fluid gallery1" alt="..." style="cursor:pointer;"> -->
                                <div v-if="isImage(res.original_url)">
                                    <img :src="`${res.original_url}`" class="img-fluid gallery1" alt="..."
                                        style="cursor:pointer;">
                                </div>
                                <div v-else-if="isVideo(res.original_url)">
                                    <video controls class="img-fluid gallery1" style="cursor:pointer;">
                                        <source :src="`${res.original_url}`" type="video/mp4">
                                    </video>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- <div class="swiper-button-next" @click="nextSlide"></div>
                <div class="swiper-button-prev" @click="prevSlide"></div> -->
                    <div class="next_div" v-if="gallerySanstha.length > 5" @click="nextSlide"><i
                            class="bi bi-chevron-right"></i></div>
                    <div class="prev_div" v-if="gallerySanstha.length > 5" @click="prevSlide"><i
                            class="bi bi-chevron-left"></i></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Swiper from 'swiper';
import sansthaDetailService from '../../../services/sansthaDetail.service';

export default {
    name: "App",
    data() {
        return {
            gallerySanstha: [], message: '',
        };
    },
    methods: {
        isImage(url) {
            return /\.(jpeg|jpg|png)$/i.test(url);
        },
        isVideo(url) {
            return /\.(mp4)$/i.test(url);
        },
        async getGalleryBasedSanstha() {
            try {
                const url = window.location.href;
                const lastParam = url.split("/").slice(-1)[0];
                const data = {
                    params: {
                        organisation_id: lastParam
                    }
                };
                const response = await sansthaDetailService.getAboutGallerySanstha({ ...data });
                if (response.status === 200 || response.status === 201) {
                    if (response.data.length > 0) {
                        this.gallerySanstha = response.data;
                        this.$nextTick(() => {
                            this.initSlickSlider();
                        });
                    } else {
                        this.message = 'No Gallary found !';
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        nextSlide() {
            const thumbnail = document.querySelector('.swiper1').swiper;
            if (thumbnail.isEnd) {
                thumbnail.slideTo(0);
            } else {
                thumbnail.slideNext();
            }
        },
        prevSlide() {
            const thumbnail = document.querySelector('.swiper1').swiper;
            thumbnail.slidePrev();
        },
    },
    mounted() {
        var swiper = new Swiper(".swiper1", {
            slidesPerView: 'auto',
            spaceBetween: 10,

        });

        this.$refs.swiper = swiper;
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
        this.getGalleryBasedSanstha();
    }
};
</script>
