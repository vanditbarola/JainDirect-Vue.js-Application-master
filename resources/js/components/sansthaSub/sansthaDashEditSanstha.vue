<template>
    <div class="modal" id="editSansthaModal" aria-labelledby="editSansthaModalLabel" data-bs-backdrop="static"
        data-bs-keyboard="false">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                    aria-label="Close" @click="clearfield()" alt="...">
                <div class="modal-body">
                    <form class="px-4 mx-4 mt-3 mb-5">
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="edit_sanstha_title" class="create_comitte_member_label">Title<span
                                        class="required mx-1">*</span></label>
                                <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                    id="edit_sanstha_title" placeholder="Enter title" v-model="committeeSanstha.title">
                                <div style="color: red;">{{ this.titleErr }}</div>

                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="organisation_froms_id" class="create_comitte_member_label">Organization Category<span class="required mx-1">*</span></label>
                                <select class="form-control mt-2 create_comitte_member_input1"
                                    id="organisation_froms_id" v-model="committeeSanstha.get_organisation_type.title">
                                    <option :value="committeeSanstha.get_organisation_type.title" selected>{{ committeeSanstha.get_organisation_type.title }}</option>
                                    <option v-for="category in categories" :key="category.value"
                                        :value="category.value">{{ category.label }}</option>
                                </select>
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="edit_sanstha_about" class="create_comitte_member_label">About</label>
                                <input type="tel" class="form-control mt-2 create_comitte_member_input1"
                                    id="edit_sanstha_about" placeholder="Enter about" v-model="committeeSanstha.about">
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="edit_sanstha_location" class="create_comitte_member_label">Location<span
                                        class="required mx-1">*</span></label>
                                <input type="tel" class="form-control mt-2 mb-1 create_comitte_member_input1"
                                    id="edit_sanstha_location" placeholder="Enter loaction"
                                    v-model="committeeSanstha.location">
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="sanastha_edit_email" class="create_comitte_member_label">Email
                                    Address<span class="required mx-1">*</span></label>
                                <input type="email" class="form-control mt-2 create_comitte_member_input1"
                                    id="sanastha_edit_email" placeholder="Enter email id "
                                    v-model="committeeSanstha.email_id">
                                <div style="color: red;">{{ this.emailErr }}</div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="sanastha_edit_mobile" class="create_comitte_member_label">Mobile
                                    Number<span class="required mx-1">*</span></label>
                                <input type="email" class="form-control mt-2 create_comitte_member_input1"
                                    id="sanastha_edit_mobile" placeholder="Enter mobile number "
                                    v-model="committeeSanstha.mobile_number">
                                <div style="color: red;">{{ this.mobileErr }}</div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="sanastha_edit_youtube" class="create_comitte_member_label">
                                    <i class="bi bi-youtube me-1"></i>Youtube</label>
                                <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                    id="sanastha_edit_youtube" placeholder="Enter youtube link "
                                    v-model="committeeSanstha.youtube">
                                <div style="color: red;">{{ this.youtubeErr }}</div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="sanastha_edit_insta" class="create_comitte_member_label">
                                    <i class="bi bi-instagram me-1"></i>Instagram</label>
                                <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                    id="sanastha_edit_insta" placeholder="Enter instagram link "
                                    v-model="committeeSanstha.instagram">
                                <div style="color: red;">{{ this.instaErr }}</div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="sanastha_edit_fb" class="create_comitte_member_label">
                                    <i class="bi bi-facebook me-1"></i>Facebook</label>
                                <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                    id="sanastha_edit_fb" placeholder="Enter facebook link "
                                    v-model="committeeSanstha.facebook">
                                <div style="color: red;">{{ this.facebookErr }}</div>
                            </div>
                            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                <label for="sanastha_edit_twitter" class="create_comitte_member_label">
                                    <i class="bi bi-twitter me-1"></i>Twitter</label>
                                <input type="text" class="form-control mt-2 create_comitte_member_input1"
                                    id="sanastha_edit_twitter" placeholder="Enter twitter link "
                                    v-model="committeeSanstha.twitter">
                                <div style="color: red;">{{ this.twitterErr }}</div>
                            </div>

                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                                <button type="button" class="create_comitte_member_btn"
                                    data-bs-dismiss="modal" @click="clearfield()">cancel</button>
                                <button type="button" class="ms-2 create_comitte_member_btn"
                                    @click="editSanstha()">submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sansthaDetailService from '../../../services/sansthaDetail.service';
export default {
    name: "App",
    props: ['committeeSanstha'],
    data() {
        return {
            categories: [
            { value: "temple", label: "Temple" },
            { value: "education", label: "Education" },
            { value: "dharmashala", label: "Dharamshala" },
            { value: "bhojnalya", label: "Bhojnalya" },
            { value: "muniseva", label: "Muni Seva" },
            { value: "orphanage", label: "Orphanage" },
            { value: "oldage", label: "Old Age" },
            { value: "gausala", label: "Gausala" }
        ],
            instaErr: '', twitterErr: '', facebookErr: '', youtubeErr: '', titleErr: '', mobileErr: '', emailErr: '', selectItemFilter: '', get_sanstha: '', total_count: '', message: ''
        };
    },
    methods: {
        async editSanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            this.titleErr = '';
            this.mobileErr = '';
            this.emailErr = '';
            this.youtubeErr = '';
            this.facebookErr = '';
            this.twitterErr = '';
            this.instaErr = '';

            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;
            const mobilePattern = /^[0-9]+$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const urlPattern = /^https:\/\/\w.*\.com/;



            if (!this.committeeSanstha.title.trim()) {
                this.titleErr = 'Name is required';
            } else if (!spaceRegex.test(this.committeeSanstha.title)) {
                this.titleErr = 'Name should not start with a space';
            } else if (!namePattern.test(this.committeeSanstha.title)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (!this.committeeSanstha.email_id) {
                this.emailErr = 'Email is required';
            } else if (!emailPattern.test(this.committeeSanstha.email_id)) {
                this.emailErr = 'Please write proper email address';
            } else if (!spaceRegex.test(this.committeeSanstha.email_id)) {
                this.emailErr = 'Email should not start with a space';
            }
            if (!this.committeeSanstha.mobile_number) {
                this.mobileErr = 'Mobile number is required';
            } else if (!spaceRegex.test(this.committeeSanstha.mobile_number)) {
                this.mobileErr = 'Mobile number should not start with a space';
            } else if (!mobilePattern.test(this.committeeSanstha.mobile_number)) {
                this.mobileErr = 'Mobile number should be only digits';
            } else if (this.committeeSanstha.mobile_number.length < 10 || this.committeeSanstha.mobile_number.length > 10) {
                this.mobileErr = "Mobile number should be at least 10 digits";
            }
            if (this.committeeSanstha.youtube && !urlPattern.test(this.committeeSanstha.youtube)) {
                this.youtubeErr = 'YouTube link should be in proper form';
            }
            if (this.committeeSanstha.instagram && !urlPattern.test(this.committeeSanstha.instagram)) {
                this.instaErr = 'Instagram link should be in proper form';
            }
            if (this.committeeSanstha.facebook && !urlPattern.test(this.committeeSanstha.facebook)) {
                this.facebookErr = 'Facebook link should be in proper form';
            }
            if (this.committeeSanstha.twitter && !urlPattern.test(this.committeeSanstha.twitter)) {
                this.twitterErr = 'Twitter link should be in proper form';
            }
            if (this.titleErr || this.mobileErr || this.emailErr || this.youtubeErr || this.instaErr || this.facebookErr || this.twitterErr) {
                return;
            }

            const data = {
                topic_type_id: 3,
                title: this.committeeSanstha.title,
                about: this.committeeSanstha.about,
                location: this.committeeSanstha.location,
                email_id: this.committeeSanstha.email_id,
                mobile_number: this.committeeSanstha.mobile_number,
                youtube: this.committeeSanstha.youtube,
                instagram: this.committeeSanstha.instagram,
                facebook: this.committeeSanstha.facebook,
                twitter: this.committeeSanstha.twitter
            }
            const response = await sansthaDetailService.editParticularSanstha(lastParam, data);
            if (response.status === 200 || 201) {
                $('#editSansthaModal').modal('hide');
                this.$toast.success('Your data is updated!')
            } else {
                console.error("Something went wrong")
            }
        },
        clearfield(){
            this.committeeSanstha.title = "";
            this.committeeSanstha.about = "";
            this.committeeSanstha.location = "";
            this.committeeSanstha.email_id = "";
            this.committeeSanstha.mobile_number = "";
            this.committeeSanstha.youtube = "";
            this.committeeSanstha.instagram = "";
            this.committeeSanstha.facebook = "";
            this.committeeSanstha.twitter = "";
            this.titleErr = '';
            this.mobileErr = '';
            this.emailErr = '';
            this.youtubeErr = '';
            this.facebookErr = '';
            this.twitterErr = '';
            this.instaErr = '';

        }
    },
   
};
</script>