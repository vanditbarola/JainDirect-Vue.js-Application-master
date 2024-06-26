<template>
    <div x-data="app()" x-cloak>
        <section class="section_gallery_dashboard mt-3">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation" hidden>
                    <button class="nav-link active" id="gallery-tab" data-bs-toggle="tab" data-bs-target="#gallery"
                        type="button" role="tab" aria-controls="gallery" aria-selected="true">gallery</button>
                </li>
                <li class="nav-item" role="presentation" hidden>
                    <button class="nav-link" id="album-tab" data-bs-toggle="tab" data-bs-target="#album" type="button"
                        role="tab" aria-controls="album" aria-selected="false">album</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="gallery" role="tabpanel" aria-labelledby="gallery-tab">
                    <div class="gallery_dashboard_top_div">
                        <label class="gallery_dashboard_title">Gallery</label>
                        <button type="button" class="gallery_dashboard_btn" data-bs-toggle="modal" data-bs-target="#uploadGallerModal">
                            <img class="file_upload_icon_dashboard" src="/images/ic_file_upload_24px(1).svg" alt="...">Upload
                        </button>
                    </div>
                    <div class="container pb-5 mt-3">
                        <div class="row gallery_row gy-3">
                            <div v-for="(album, index) in allGallerySanstha" :key="index"
                                class="col col-sm-12 col-xs-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                                <div class="card card_santha_gallery_card1">
                                    <div class="more_option_in_cards gallery_dropdown">
                                        <b-dropdown text="" class="sanstha_dashboard_more_tab_cards" no-caret>
                                            <b-dropdown-item  type="button" data-bs-toggle="modal" data-bs-target="#editGallerModal" @click="getFolderEditId(album.id) ; getParticularGallarySanstha()">
                                                <li><a class="dropdown-item">
                                                        <img src="/images/edit.svg" class="card_option_edit" alt="..." >
                                                        Edit</a></li>
                                            </b-dropdown-item>
                                            <b-dropdown-item  type="button" @click="getFolderId(album.id)" data-bs-target="#deleteGallery" data-bs-toggle="modal">
                                                <li><a class="dropdown-item"><img
                                                            src="/images/delete.svg" class="card_option_edit"
                                                            alt="...">Delete</a></li>
                                            </b-dropdown-item>
                                        </b-dropdown>
                                        <div class="modal" id="deleteGallery" tabindex="-1" aria-labelledby="deleteGallery" 
                                            aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                                            <div class="modal-dialog">
                                                <div class="modal-content pb-5">
                                                    <img src="/images/modal_cancel.svg" class="cancel_btn_CreatePost2Modal" data-bs-dismiss="modal"
                                                        aria-label="Close" alt="...">
                                                    <label class="discard1 mt-3">Are you sure you want to delete?</label>
                                                    <div class="d-flex justify-content-center mt-4 ">
                                                        <button type="submit" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                                        <button type="submit" class="popup_post ms-5"
                                                            data-bs-dismiss="modal" @click="deleteGallaryFolder()">DELETE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a class="light_box_gallery" @click="goToAlbumTab(album.id); getParticularGallarySanstha()">
                                        <div class="image_stack">
                                            <div v-if="album.gallery && album.gallery[0]" class="image_stack_bottom">
                                                <img :src="album.gallery[0].original_url || '/images/jd_card_logo.png'" class="image1" alt="...">
                                            </div>
                                            <div v-else class="image_stack_bottom">
                                                <img src='/images/jd_card_logo.png' class="image1" alt="...">
                                            </div>
                                            <div v-if="album.gallery && album.gallery.length > 1">
                                                <div v-for="(image, imageIndex) in album.gallery.slice(1, 2)"
                                                    :key="imageIndex" class="image_stack_top">
                                                    <img :src="image.original_url || '/images/jd_card_logo.png'"
                                                        class="image1" alt="...">
                                                </div>
                                                <div v-if="album.gallery.length > 2" class="photo_count_div">
                                                    <span class="more_images photos_counts"> +{{ album.gallery.length - 2 }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <label class="gallery_folder_title mt-4">{{ album.album_name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="album" role="tabpanel" aria-labelledby="album-tab">
                    <section>
                        <div class="gallery_dashboard_top_div">
                            <a class="folder_back" @click="goToGallery">
                                <label class="gallery_dashboard_title"><i class="bi bi-arrow-left me-2"></i>Gallery<span
                                        class="mx-2">|</span>{{ this.albumName }}</label>
                            </a>
                            <button type="button" class="gallery_dashboard_btn" data-bs-toggle="modal"
                                data-bs-target="#uploadGallerFolderModal"><img class="file_upload_icon_dashboard"
                                    src="/images/ic_file_upload_24px(1).svg" alt="...">Upload</button>
                        </div>
                        <div class="container pb-5 mt-3">
                            <div class="row gallery_row gy-3">
                                <div v-for="(image, index) in particularGalleryImages" :key="index"
                                    class="col col-sm-12 col-xs-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
                                    <div class="image_folder_div">
                                        <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal_gallery"
                                            type="button" data-bs-toggle="modal" data-bs-target="#DeleteSinglePhoto"
                                            alt="..." @click=getAlbumDelId(image.id)>

                                        <a data-fancybox="gallery" :href="`${image.original_url}`">
                                            <img :src="image.original_url" class="galleryFolder_img" alt="...">
                                        </a>
                                    </div>
                                    <div class="modal" id="DeleteSinglePhoto" tabindex="-1"
                                        aria-labelledby="DeleteSinglePhoto" aria-hidden="true" data-bs-backdrop="static"
                                        data-bs-keyboard="false">
                                        <div class="modal-dialog">
                                            <div class="modal-content pb-5">
                                                <img src="/images/modal_cancel.svg" class="cancel_btn_CreatePost2Modal"
                                                    data-bs-dismiss="modal" aria-label="Close" alt="...">
                                                <label class="discard1 mt-3">Are you sure you want to delete?</label>
                                                <div class="d-flex justify-content-center mt-4 ">
                                                    <button type="submit" class="popup_cancel"
                                                        data-bs-dismiss="modal">CANCEL</button>
                                                    <button type="submit" class="popup_post ms-5"
                                                        data-bs-dismiss="modal" @click="deleteAlbumGallary()">DELETE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <div class="modal" tabindex="-1" id="uploadGallerModal" aria-labelledby="uploadGallerModalLabel"
                data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                            aria-label="Close" @click="clearField()" alt="...">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                    <div class="card image_upload_card mx-3 my-3">
                                        <form>
                                            <label for="gallaryInput1" class="file_upload_modal">
                                                <img :src="selectedGallaryURL1 ? selectedGallaryURL1 : '/images/add_photo_dark.svg'"
                                                    class="file_img_edit" alt="...">
                                                <input type="file" id="gallaryInput1" name="filename" hidden multiple
                                                    @change="handleGallaryChange" ref="gallaryInput1">
                                                <br><label class="file_upload_modal_title"> Upload Photos &
                                                    Videos</label>
                                            </label>
                                        </form>
                                    </div>
                                    <div id="filewrapper1">
                                        <label class="uploaded_photos_title mx-3">Uploaded Photos</label>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col">
                                    <div class=" mx-3" style="margin-top: 25px !important;">
                                        <form>
                                            <div class="col-md-12 mt-4">
                                                <label for="albumName" class="form-label start_date_title">Album
                                                    Name</label>
                                                <input type="text" class="form-control start_date_input" id="albumName"
                                                    placeholder="Enter the album name" v-model="add_album_name">
                                                <div style="color: red;">{{ this.titleErr }}</div>
                                            </div>
                                            <div>
                                                <label class="head_event_descr mt-4">Post visibility <span class="required mx-1">*</span></label>
                                                <div class="media_visiablity_div">
                                                    <input class="mediaVisibility_input" type="radio" name="mediaNews"
                                                        id="mediamemberEvent" value="Member"
                                                        v-model="gallaryPost_visiblity">
                                                    <label class="form-check-label mediaTrue_label"
                                                        for="mediamemberEvent">Member</label>

                                                    <input class="mediaVisibility_input ms-2" type="radio"
                                                        name="mediaNews" id="mediaPublicEvent" value="Public"
                                                        v-model="gallaryPost_visiblity">
                                                    <label class="form-check-label mediaTrue_label"
                                                        for="mediaPublicEvent">Public</label>
                                                </div>
                                                <div style="color: red;">{{ this.post_error }}</div>
                                            </div>
                                            <div class="col-12 mb-0 mt-5 popup_footer galler_modal_footer ">
                                                <button type="button" class="popup_cancel" data-bs-dismiss="modal"
                                                    @click="clearField()">CANCEL</button>
                                                <button type="button" class="popup_post"
                                                    @click="addGallarySanstha()">POST</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" tabindex="-1" id="uploadGallerFolderModal" aria-labelledby="uploadGallerFolderModalLabel"
                data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                            aria-label="Close" @click="clearFieldLbum()" alt="...">
                        <div class="modal-body subfolder_modal">
                            <div class="row">
                                <div class="col-12 modal_left_col">
                                    <div class="card image_upload_card mx-3 my-3">
                                        <form>
                                            <label class="file_upload_modal" for="gallaryAlbumInput">
                                                <img :src="selectedGallaryAlbumURL ? selectedGallaryAlbumURL : '/images/add_photo_dark.svg'"
                                                    class="file_img_edit" alt="...">
                                                <input type="file" hidden id="gallaryAlbumInput"
                                                    @change="handleGallaryAlbumChange" name="filename" multiple ref="gallaryAlbumInput">
                                                <br><label class="file_upload_modal_title"> Upload Photos & Videos</label>
                                            </label>
                                        </form>
                                    </div>
                                    <div id="filewrapper1" class="mx-3">
                                        <label class="uploaded_photos_title mt-3">Uploaded
                                            Photos</label>
                                    </div>
                                    <div class="mx-3">
                                        <button type="button" class="popup_cancel mt-4" data-bs-dismiss="modal"
                                            @click="clearFieldLbum()">CANCEL</button>
                                        <button type="button" class="popup_post mt-4 ms-3" data-bs-dismiss="modal"
                                            @click="addGallaryAlbumImg()">POST</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal" tabindex="-1" id="editGallerModal" aria-labelledby="editGallerModalLabel"
                data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                            aria-label="Close" @click="clearField()" alt="...">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                    <div class="card image_upload_card mx-3 my-3">
                                        <form>
                                            <label for="gallaryInput2" class="file_upload_modal">
                                                <img :src="selectedGallaryURL2 ? selectedGallaryURL2 : '/images/add_photo_dark.svg'"
                                                    class="file_img_edit" alt="...">
                                                <input type="file" id="gallaryInput2" name="filename" hidden multiple
                                                    @change="handleGallaryChange2" ref="gallaryInput2">
                                                <br><label class="file_upload_modal_title"> Upload Photos &
                                                    Videos</label>
                                            </label>
                                        </form>
                                    </div>
                                    <div id="filewrapper1">
                                        <label class="uploaded_photos_title mx-3">Uploaded Photos</label>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col">
                                    <div class="mx-3" style="margin-top: 25px !important;">
                                        <form>
                                            <div class="col-md-12 mt-4">
                                                <label for="albumName" class="form-label start_date_title">Album Name</label>
                                                <input type="text" class="form-control start_date_input" id="albumName"
                                                    placeholder="Enter the album name" v-model="forEdit.album_name">
                                                <div style="color: red;">{{ this.titleErr }}</div>
                                            </div>
                                            <div>
                                                <label class="head_event_descr mt-4">Post visibility <span class="required mx-1">*</span></label>
                                                <div class="media_visiablity_div">
                                                    <input class="mediaVisibility_input" type="radio" name="mediaNews"
                                                        id="mediamemberEvent" value="Member" v-model="forEdit.post_visiblity">
                                                    <label class="form-check-label mediaTrue_label"
                                                        for="mediamemberEvent" :checked="forEdit.post_visiblity === 1">Member</label>
                                                    <input class="mediaVisibility_input ms-2" type="radio"
                                                        name="mediaNews" id="mediaPublicEvent" value="Public" v-model="forEdit.post_visiblity">
                                                    <label class="form-check-label mediaTrue_label"
                                                        for="mediaPublicEvent" :checked="forEdit.post_visiblity === 0">Public</label>
                                                </div>
                                                <div style="color: red;">{{ this.post_error }}</div>
                                            </div>
                                            <div class="col-12 mb-0 mt-5 popup_footer galler_modal_footer ">
                                                <button type="button" class="popup_cancel" data-bs-dismiss="modal"
                                                    @click="clearField()">CANCEL</button>
                                                <button type="button" class="popup_post" @click="updateGallarySanstha()">POST</button>
                                            </div>
                                        </form>
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
import sansthaDetailService from '../../../services/sansthaDetail.service';

export default {
    name: "App",
    data() {
        return {
            edit_folder_id:'',forEdit:[],selectedGallaryURL1:'',del_folder_id:'',del_album_id:'', post_error: '', titleErr: '', 
            gallaryPost_visiblity: '', gallerySanstha: [], allGallerySanstha: [], selectedGallaryURL: '', add_album_name: '', 
            album_id: '', particularGalleryImages: [], selectedGallaryAlbumURL: '', albumName: '',selectedGallaryURL2:''
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
        getAlbumDelId(resId){
            this.del_album_id = resId;
        },
        getFolderEditId(resId){
            this.album_id = resId;
        },
        getFolderId(resId){
            this.del_folder_id = resId;
        },
        goToAlbumTab(albumId) {
            this.album_id = albumId;
            const albumTab = document.getElementById('album-tab');
            if (albumTab) {
                albumTab.click();
            }
        },
        goToGallery() {
            const gallery = document.getElementById('gallery-tab');
            if (gallery) {
                gallery.click();
            }
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
        async deleteAlbumGallary() {
            const data = {
                params: {
                    'media_id[]': this.del_album_id
                }
            }
            const response = await sansthaDetailService.deleteGallaryAlbum(data);
            if (response.status == 200 || response.status == 201 || response.status == 204) {
                this.$toast.success("Album image deleted successfully");
                const album = this.allGallerySanstha.find(album => album.gallery.some(image => image.id === this.del_album_id));
                if (album) {
                    const imageIndex = album.gallery.findIndex(image => image.id === this.del_album_id);
                    if (imageIndex !== -1) {
                        album.gallery.splice(imageIndex, 1);
                        this.$set(this.allGallerySanstha, this.allGallerySanstha.indexOf(album), {...album});
                    }
                }
                const index = this.particularGalleryImages.findIndex(album => album.id === this.del_album_id);
                if (index !== -1) {
                    this.particularGalleryImages.splice(index, 1);
                }
            } else {
                console.error("Something went wrong");
                this.$toast.error("Something went wrong");
            }
        },
        async deleteGallaryFolder() {
            const data = {
                gallery_id : this.del_folder_id
            }
            const response = await sansthaDetailService.deleteGallaryFolder({...data});
            if (response.status == 200 || response.status == 201 || response.status == 204) {
                this.$toast.success("Album image deleted successfully");
                const index = this.allGallerySanstha.findIndex(folder => folder.id === this.del_folder_id);
                if (index !== -1) {
                    this.allGallerySanstha.splice(index, 1);
                }
            } else {
                console.error("Something went wrong");
                this.$toast.error("Something went wrong");
            }
        },
        async getParticularGallarySanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    type: "web"
                }
            }
            const response = await sansthaDetailService.getParticularGallarySanstha(this.album_id, data);
            if (response.status == 200 || response.status == 201) {
                this.forEdit = response.data
                this.particularGalleryImages = response.data.gallery;
                this.albumName = response.data.album_name;
            } else {
                console.error("Something went wrong");
            }
        },
        clearFieldLbum() {
            this.selectedGallaryAlbumURL = "";
        },
        clearField() {
            this.add_album_name = "";
            this.gallaryPost_visiblity = "";
            this.titleErr = "";
            this.post_error = "";
            this.selectedGallaryURL = '';
        },
        async addGallarySanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;

            this.titleErr = '';
            let post_visiblity = false;
            if (!this.add_album_name) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.add_album_name)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.add_album_name)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (this.newsPost_visiblity === "Member") {
                post_visiblity = true;
            }
            if (!this.gallaryPost_visiblity) {
                this.post_error = 'Please select any one visibility';
                return;
            }
            if (this.titleErr) {
                return;
            }
            const data = {
                organization_id: lastParam,
                album_name: this.add_album_name,
                post_visiblity: post_visiblity,
            }

            const response = await sansthaDetailService.addGallarySanstha({ ...data });
            if (response.status == 200 || response.status == 201) {
                if (this.$refs.gallaryInput1.files[0]) {
                    const formData = new FormData();
                    formData.append('model_id', response.data.id);
                    formData.append('file', this.$refs.gallaryInput1.files[0]);
                    const response1 = await sansthaDetailService.addGallaryMedia(formData)
                    if (response1.status === 200 || 201 || 202) {
                        this.$forceUpdate();
                        const updatedAlbum = response.data;
                        updatedAlbum.gallery = [response1];
                        this.allGallerySanstha.unshift(updatedAlbum);
                        $('#uploadGallerModal').modal('hide');
                        this.$toast.success("Gallery added successfully");
                    } else {
                        this.$toast.error('Please set proper address!');
                    }
                } else {
                    this.allGallerySanstha.unshift(response.data);
                    $('#uploadGallerModal').modal('hide');
                    this.$toast.success("Gallery added successfully");
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async addGallaryAlbumImg() {
            if (this.$refs.gallaryAlbumInput.files[0]) {
                const formData = new FormData();
                formData.append('model_id', this.album_id);
                formData.append('file', this.$refs.gallaryAlbumInput.files[0]);
                const response1 = await sansthaDetailService.addGallaryMedia(formData)
                if (response1.status === 200 || response1.status === 201 || response1.status === 202) {
                    const index = this.allGallerySanstha.findIndex(album => album.id === this.album_id);
                    this.particularGalleryImages.push(response1.data);
                    this.$toast.success("Album image added successfully");
                    if (index !== -1) {
                        this.$set(this.allGallerySanstha[index].gallery, 'length', (this.allGallerySanstha[index].gallery.length || 0) + 1);
                    }
                    this.$forceUpdate();
                    await this.getParticularGallarySanstha();
                    this.selectedGallaryAlbumURL = '';
                } else {
                    this.$toast.error('Please set proper address!');
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async updateGallarySanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;

            if (!this.forEdit.title) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.forEdit.title)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.forEdit.title)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (!this.forEdit.post_visiblity) {
                this.post_error = 'Please select any one visibility';
                return;
            }
            if (this.titleErr) {
                return;
            }

            const data = {
                organization_id: lastParam,
                post_visiblity: this.forEdit.post_visiblity,
                title: this.forEdit.title,
                is_active: 1,
                content_language_id: 1,
                created_by_id: userId
            };
            try {
                const response = await sansthaDetailService.updateGallarySanstha(this.album_id, data);
                if (response.status == 200 || response.status == 201 || response.status == 202) {
                        $('#editGallerModal').modal('hide');
                        this.selectedImageURL2 = ''
                        this.$toast.success("Gallary updated successfully");
                        const updatedGallaryIndex = this.allGallerySanstha.findIndex(gallary => gallary.id === this.album_id);
                        if (updatedGallaryIndex !== -1) {
                            this.$set(this.allGallerySanstha[updatedGallaryIndex], 'title', response.data.title);
                        }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        handleGallaryChange() {
            const gallaryInput1 = this.$refs.gallaryInput1;
            if (gallaryInput1.files && gallaryInput1.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = gallaryInput1.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedGallaryURL1 = URL.createObjectURL(gallaryInput1.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    gallaryInput1.value = "";
                }
            }
        },
        handleGallaryChange2() {
            const gallaryInput2 = this.$refs.gallaryInput2;
            if (gallaryInput2.files && gallaryInput2.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = gallaryInput2.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedGallaryURL2 = URL.createObjectURL(gallaryInput2.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    gallaryInput2.value = "";
                }
            }
        },
        handleGallaryAlbumChange() {
            const gallaryAlbumInput = this.$refs.gallaryAlbumInput;
            if (gallaryAlbumInput.files && gallaryAlbumInput.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = gallaryAlbumInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedGallaryAlbumURL = URL.createObjectURL(gallaryAlbumInput.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    gallaryAlbumInput.value = "";
                }
            }
        },
    }
};
</script>