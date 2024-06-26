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
                                <label for="images" class="file_upload_modal_media">
                                    <media-library-collection name="video_data_array"
                                        :validation-rules="{ accept: ['image/*', 'video/*'], }" :before-upload="checkFileValidity" />
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
                        <input type="text" class="mt-1 start_date_input form-control" v-model="videoTitle"
                            placeholder="Enter Video Title">
                        <div style="color: red;">{{ this.titleErr }}</div>
                        <label class="head_event_descr mt-4">Description</label>
                        <div id="editorVideoCreate" ref="editorVideoCreate"></div>
                        <form class="row">
                            <div class="mt-4">
                                <label class="head_event_descr ">Post visibility <span
                                        class="required mx-1">*</span></label>
                                <div class="media_visiablity_div">
                                    <input class="mediaVisibility_input" type="radio" name="mediaAddVideo"
                                        id="mediaAddVideoMember" value="Member" v-model="videoPost_visiblity">
                                    <label class="form-check-label mediaTrue_label"
                                        for="mediaAddVideoMember">Member</label>
                                    <input class="mediaVisibility_input ms-2" type="radio" name="mediaAddVideo"
                                        id="mediaAddVideoPublic" value="Public" v-model="videoPost_visiblity">
                                    <label class="form-check-label mediaTrue_label"
                                        for="mediaAddVideoPublic">Public</label>
                                </div>
                            </div>

                            <div class="col-12 mb-5 mt-4 popup_footer">
                                <button type="button" class="popup_cancel" data-bs-dismiss="modal"
                                    @click="clearField()">CANCEL</button>
                                <button type="button" class="popup_post" @click="addVideoSanstha()">POST</button>
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
import { initializeQuillEditors } from '../../../utils/quilleditor';
export default {
    name: "App",
    data() {
        return {
            videoChange: '', videoPost_visiblity: '', titleErr: '', post_error: '', get_sanstha: '',
            selectedVideosURL: '', videoSanstha: [], videoTitle: '',media:[]
        }
    },
    components: {
        MediaLibraryCollection,
    },
    beforeMount() {
        this.activate();
    },
    mounted() {
        const quill12 = initializeQuillEditors(this.$refs.editorVideoCreate, );
        this.quill12 = quill12;
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
        handleVideosChange() {
            const fileVideoInput = this.$refs.fileVideoInput;
            if (fileVideoInput.files && fileVideoInput.files[0]) {
                this.videoChange = fileVideoInput.files[0]
                const allowedExtensions = ["jpg", "jpeg", "png", "mp4", "mov", "avi"];
                const fileName = fileVideoInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();
                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedVideosURL = URL.createObjectURL(fileVideoInput.files[0]);
                    fileVideoInput.value = "";
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, PNG, MP4, MOV, or AVI file.");
                    fileVideoInput.value = "";
                }
            }
        },
        checkFileValidity(file) {
            this.media.push(file);
        },
        async addVideoSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            this.titleErr = '';
            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;

            let post_visiblity = false;
            if (this.videoPost_visiblity === "Member") {
                post_visiblity = true;
            }

            if (!this.videoTitle) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.videoTitle)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.videoTitle)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (!this.videoPost_visiblity) {
                this.post_error = 'Please select any one visibility';
                return;
            }
            if (this.titleErr) {
                return;
            }

            const data = {
                organization_id: lastParam,
                post_visiblity: post_visiblity,
                title: this.videoTitle,
                detail: this.quill12.getText(),
                is_active: 1,
                content_language_id: 1,
                created_by_id: userId
            };
            try {
                const response = await sansthaDetailService.addVideoSanstha({ ...data });
                if (response.status == 200 || response.status == 201) {
                    $('#CreateVideoModal').modal('hide');
                    if (this.media.length > 0) {
                        const formData = new FormData();
                        formData.append('model_id', response.data.id);
                        this.media.forEach(file => {
                            formData.append('file[]', file);
                        });
                        formData.append('type', 'mobile_api');
                        const response1 = await sansthaDetailService.addVideoMedia(formData)
                        if (response1.status == 200 || response1.status == 201) {
                            this.$forceUpdate();
                            const updatedAlbum = response.data;
                            updatedAlbum.banner = [response1];
                            this.videoSanstha.unshift(updatedAlbum);
                            $('#AddVideoModal').modal('hide');
                            const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                            if (mediaLibraryRows) {
                                mediaLibraryRows.forEach(row => {
                                    row.click();
                                });
                            }
                            this.$toast.success("Video added successfully");
                            this.selectedVideosURL = '';
                            this.videoChange = '';
                            this.clearField();
                        } else {
                            this.$toast.error('Please set proper address!');
                        }
                    } else {
                        this.videoSanstha.unshift(response.data);
                        $('#AddVideoModal').modal('hide');
                        const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                        if (mediaLibraryRows) {
                            mediaLibraryRows.forEach(row => {
                                row.click();
                            });
                        }
                        this.selectedVideosURL = '';
                        this.clearField();
                        this.$toast.success("Video added successfully");
                        response.data = '';
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
            this.videoTitle = "";
            this.quill12.setText('');
            this.videoPost_visiblity = "";
            this.selectedVideosURL = "";
        },
    }
}
</script>