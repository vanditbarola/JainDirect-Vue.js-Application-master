import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'; 

export function initializeThumbnailActivityImage() {
    return new Swiper('.thumbnailActivityImage', {
        slidesPerView: 'auto',
    });
}

export function initializeSlider(thumbnailActivityImage) {
    return new Swiper('.slider', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailActivityImage
        },
    });
}

export function initializeThumbnailActivityVideo() {
    return new Swiper('.thumbnailActivityVideo', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderVideo(thumbnailActivityVideo) {
    return new Swiper('.sliderVideo', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailActivityVideo
        },
    });
}
export function initializeThumbnailExplore() {
    return new Swiper('.thumbnail', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderExplore(thumbnail) {
    return new Swiper('.sliderExplore', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnail
        },
    });
}
export function initializeThumbnailLoHome() {
    return new Swiper('.thumbnailLoHome', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderLoHome(thumbnailLoHome) {
    return new Swiper('.slider', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailLoHome
        },
    });
}
export function initializeThumbnailShravakImg() {
    return new Swiper('.thumbnailShravakImg', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderShravakImg(thumbnailShravakImg) {
    return new Swiper('.swiperShravakImg', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailShravakImg
        },
    });
}
export function initializeThumbnailShravakVideo() {
    return new Swiper('.thumbnailShravakVideo', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderShravakVideo(thumbnailShravakVideo) {
    return new Swiper('.swiperShravakVideo', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailShravakVideo
        },
    });
}
export function initializeThumbnailActImg() {
    return new Swiper('.thumbnailLactImg', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderActImg(thumbnailLactImg) {
    return new Swiper('.swiperLactImg', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailLactImg
        },
    });
}

export function initializeThumbnailActVideo() {
    return new Swiper('.thumbnailLactVideo', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderActVideo(thumbnailLactVideo) {
    return new Swiper('.swiperLactVideo', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailLactVideo
        },
    });
}
export function initializeThumbnailProfileImg() {
    return new Swiper('.thumbnailProfile', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderProfileImg(thumbnailProfile) {
    return new Swiper('.slider', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailProfile
        },
    });
}
export function initializeThumbnailUpcoming() {
    return new Swiper('.thumbnailUpcoming', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderUpcoming(thumbnailUpcoming) {
    return new Swiper('.slider', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailUpcoming
        },
    });
}
export function initializeThumbnailCurrent() {
    return new Swiper('.thumbnailCurrent', {
        slidesPerView: 'auto',
    });
}

export function initializeSliderCurrent(thumbnailCurrent) {
    return new Swiper('.slider', {
        loop: true,
        grabCursor: true,
        thumbs: {
            swiper: thumbnailCurrent
        },
    });
}


