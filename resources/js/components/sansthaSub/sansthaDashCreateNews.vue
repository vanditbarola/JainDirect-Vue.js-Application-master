<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                aria-label="Close" alt="...">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                        <div class="card image_upload_card_media mx-3 my-3">
                            <form>
                                <label for="newsimages" class="file_upload_modal_media">
                                    <media-library-collection name="newsimages" :max-items="5"
                                        :validation-rules="{ accept: ['image/jpeg', 'image/png'], }" :before-upload="checkFileValidity" />
                                </label>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col px-4 ">
                        <div class="mx-1 mt-3 " style=" display: flex;">
                            <img :src="`${get_sanstha.logo ? get_sanstha.logo[0] ? get_sanstha.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                class="img_modal" alt="...">
                            <label class="img_modal_title">{{ this.get_sanstha.title }}</label>
                        </div>
                        <label class="head_event_descr mt-4">Title<span class="required mx-1">*</span></label><br>
                        <input type="text" class="mt-1 form-control start_date_input" v-model="newsTitle"
                            placeholder="Enter News Title">
                        <div style="color: red;">{{ this.titleErr }}</div>
                        <label class="head_event_descr mt-4">Description</label>
                        <div id="editorNewsCreate1" ref="editorNewsCreate1">
                        </div>
                        <form class="row">
                            <div class="mt-4">
                                <label class="head_event_descr">Post visibility<span
                                        class="required mx-1">*</span></label>
                                <div class="media_visiablity_div">
                                    <input class="mediaVisibility_input" type="radio" name="mediaNews"
                                        id="mediamemberEvent" value="Member" v-model="newsPost_visiblity">
                                    <label class="form-check-label mediaTrue_label"
                                        for="mediamemberEvent">Member</label>
                                    <input class="mediaVisibility_input ms-2" type="radio" name="mediaNews"
                                        id="mediaPublicEvent" value="Public" v-model="newsPost_visiblity">
                                    <label class="form-check-label mediaTrue_label"
                                        for="mediaPublicEvent">Public</label>
                                </div>
                                <div style="color: red;">{{ this.post_error }}</div>
                            </div>

                            <div class="col-12 mb-5 mt-4 popup_footer">
                                <button type="button" class="popup_cancel" data-bs-dismiss="modal"
                                    @click="clearField()">CANCEL</button>
                                <button type="button" class="popup_post" @click="addNewSanstha()">POST</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sansthaDetailService from '../../../services/sansthaDetail.service';
import { MediaLibraryCollection } from "@spatie/media-library-pro-vue2-collection";
import { initializeQuillEditors } from '../../../utils/quilleditor.js';
export default {
    name: "App",
    data() {
        return {
            get_sanstha: '', titleErr: '', newsTitle: '', post_error: '', newsPost_visiblity: '', newsSanstha: [],
            selectedNewsImageURL: '', get_sanstha: '',media:[],
        };
    },
    components: {
        MediaLibraryCollection,
    },
    beforeMount() {
        this.activate();
    },
    mounted() {
        const quill9 = initializeQuillEditors(this.$refs.editorNewsCreate1, );
        this.quill9 = quill9;
    },
    methods: {
        async activate() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getSanstha({ ...data });
            this.get_sanstha = response;
        },
        handleNewsFileChange() {
            const fileNewsInput = this.$refs.fileNewsInput;
            if (fileNewsInput.files && fileNewsInput.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = fileNewsInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedNewsImageURL = URL.createObjectURL(fileNewsInput.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    fileNewsInput.value = "";
                }
            }
        },
        checkFileValidity(file) {
            this.media.push(file);
        },
        async addNewSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            this.titleErr = '';
            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;

            let post_visiblity = false;
            if (this.newsPost_visiblity === "Member") {
                post_visiblity = true;
            }
            if (!this.newsTitle) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.newsTitle)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.newsTitle)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (!this.newsPost_visiblity) {
                this.post_error = 'Please select any one visibility';
                return;
            }
            if (this.titleErr) {
                return;
            }
            const data = {
                organization_id: lastParam,
                post_visiblity: post_visiblity,
                title: this.newsTitle,
                detail: this.quill9.getText(),
                is_active: 1,
                content_language_id: 1,
                created_by_id: userId
            };

            try {
                const response = await sansthaDetailService.addNewsSanstha({ ...data });
                if (response.status == 200 || response.status == 201) {
                    $('#CreateNewsModal').modal('hide');
                    if (this.media.length > 0) {
                        const formData = new FormData();
                        formData.append('model_id', response.data.id);
                        this.media.forEach(file => {
                            formData.append('file[]', file);
                        });
                        formData.append('type', 'mobile_api');
                        const response1 = await sansthaDetailService.addNewsMedia(formData)
                        if (response1.status === 200 || 201 || 202) {
                            const updatedAlbum = response.data;
                            updatedAlbum.banner = [response1];
                            this.newsSanstha.unshift(updatedAlbum);
                            $('#AddNewsModal').modal('hide');
                            const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                            if (mediaLibraryRows) {
                                mediaLibraryRows.forEach(row => {
                                    row.click();
                                });
                            }
                            this.$toast.success("News added successfully");
                            this.$forceUpdate();
                            this.selectedNewsImageURL = '';
                            this.clearField();
                        } else {
                            this.$toast.error('Please set proper address!');
                        }
                    }
                    else {
                        $('#AddNewsModal').modal('hide');
                        const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                        if (mediaLibraryRows) {
                            mediaLibraryRows.forEach(row => {
                                row.click();
                            });
                        }
                        this.selectedNewsImageURL = '';
                        this.clearField();
                        this.$toast.success("News added successfully");
                        this.newsSanstha.unshift(response.data);
                        this.$forceUpdate();
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        clearField() {
            const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
            if (mediaLibraryRows) {
                mediaLibraryRows.forEach(row => {
                    row.click();
                });
            }
            this.titleErr = "";
            this.newsTitle = "";
            this.quill9.setText('');
            this.newsPost_visiblity = "";
            this.selectedNewsImageURL = "";
        },
    }
}
</script>