<template>
    <div class="modal" tabindex="-1" id="AddCommittemmberModal" aria-labelledby="AddCommittemmberModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog ">
            <div class="modal-content create_comitte_modal">
                <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                    aria-label="Close" alt="...">
                <label class="create_member_title text-center">Add Committee Member</label>
                <div class="create_member_popup_profile_photo mt-4">
                    <div class="background_profile_pic">
                        <label for="fileComInput" class="create_comitte_upload_photo">
                            <img  class="create_member_camera" :src="selectedCommImageURL ? selectedCommImageURL :'/images/add_photo_dark.svg'" alt="...">
                            <br><span class="create_member_camera_label">Upload Photo</span>
                            <input type="file" id="fileComInput" name="filename" ref="fileComInput" hidden @change="handleFileCommChange">
                        </label>
                    </div>
                </div>
                
                <form class="px-4 mx-4 mt-3 mb-5">
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2">
                            <label for="create_comitte_member_name" class="create_comitte_member_label">Name<span class="required mx-1">*</span></label>
                            <input type="text" class="form-control mt-2 create_comitte_member_input"
                                id="create_comitte_member_name" placeholder="Enter name" v-model="name">
                            <div style="color: red;">{{ this.nameErr }}</div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-2">
                            <label for="create_comitte_member_designation"
                                class="create_comitte_member_label">Designation<span class="required mx-1">*</span></label>
                            <input type="text" class="form-control mt-2 create_comitte_member_input"
                                id="create_comitte_member_designation" placeholder="Enter designation" v-model="designation">
                            <div style="color: red;">{{ this.desigErr }}</div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                            <label for="create_comitte_member_contact"
                                class="create_comitte_member_label">Contact<span class="required mx-1">*</span></label>
                            <input type="tel" class="form-control mt-2 create_comitte_member_input"
                                id="create_comitte_member_contact" placeholder="Enter mobile number" v-model="contact">
                            <div style="color: red;">{{ this.mobileErr }}</div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                            <label for="create_comitte_member_wtsappNum" class="create_comitte_member_label">WhatsApp Number</label>
                            <input type="tel" class="form-control mt-2 mb-1 create_comitte_member_input"
                                id="create_comitte_member_wtsappNum" placeholder="Enter mobile number" v-model="wpContact">
                            <input class="form-check-input create_comitte_member_checkbox" type="checkbox" value=""
                                id="flexCheckDefault" v-model="checkSame">
                            <label class="form-check-label create_comitte_member_checkbox_label" for="flexCheckDefault">
                                Same as Contact Number</label>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4 mt-md-2 mt-lg-2 mt-xl-2 mt-xxl-2">
                            <label for="create_comitte_member_email" class="create_comitte_member_label">Email Address<span class="required mx-1">*</span></label>
                            <input type="email" class="form-control mt-2 create_comitte_member_input"
                                id="create_comitte_member_email" placeholder="Enter id" v-model="email">
                            <div style="color: red;">{{ this.emailErr }}</div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                            <button type="button" class="create_comitte_member_btn" data-bs-dismiss="modal" @click="cancleBtn()">cancel</button>
                            <button type="button" class="ms-4 create_comitte_member_btn"  @click.prevent="addCommittee()">submit</button>
                        </div>
                    </div>
                </form>
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
            selectedCommImageURL:'', statusAns:'',selectItemFilter:'',idmodel: '',checkSame: false,
            name:'', email: '',designation:'',contact: '',wpContact: '',nameErr:'',emailErr:'',mobileErr:'',desigErr:'',
        };
    },
    watch: {
        checkSame(newValue) {
            this.wpContact = newValue ? this.contact : '';
        },
    },
    methods:{
        async cancleBtn(){
            await this.clearFields();
        },
        updateFilter(filterText){
            this.selectItemFilter=filterText;
        },
        async addCommittee() {
            this.nameErr = '';
            this.mobileErr = '';
            this.emailErr = '';
            this.desigErr = '';

            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/; 
            const mobilePattern = /^[0-9]+$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!this.name.trim()) {
                this.nameErr = 'Name is required';
            } else if (!spaceRegex.test(this.name)) {
                this.nameErr = 'Name should not start with a space';
            }else if (!namePattern.test(this.name)) {
                this.nameErr = 'Please do not use any numbers or special characters ';
            }
                    
            if (!this.designation.trim()) {
                this.desigErr = 'Designation is required';
            } else if (!spaceRegex.test(this.designation)) {
                this.desigErr = 'Designation should not start with a space';
            } else if (!namePattern.test(this.designation)) {
                this.desigErr = 'Please do not use numbers or special characters in the designation';
            }
            if (!this.contact) {
                this.mobileErr = 'Contact number is required';
            }else if (!spaceRegex.test(this.contact)){
                this.mobileErr = 'Contact number should not start with a space';
            }else if(!mobilePattern.test(this.contact)){
                this.mobileErr = 'Contact number should be only digits';
            }else if (this.contact.length < 10) {
                this.mobileErr = "Contact number should be at least 10 digits";
            }
            if (!this.email) {
                this.emailErr = 'Email is required';
            }else if (!emailPattern.test(this.email)) {
                this.emailErr = 'Please write proper email address';
            } else if (!spaceRegex.test(this.email)) {
                this.emailErr = 'Email should not start with a space';
            }
            if (this.nameErr || this.mobileErr || this.emailErr || this.desigErr) {
                return; 
            }
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            localStorage.setItem('lastParam', lastParam);
            let userId = localStorage.getItem("userId");
            const data = {
                organization_id: lastParam,
                full_name: this.name,
                designation: this.designation,
                contact_number_1: this.contact,
                contact_number_2: this.wpContact,
                email: this.email,
                created_by_id: userId,
                is_primary: false
            };

            try {
                const response = await sansthaDetailService.addSansthaDashCommittee({ ...data });
                if (response.status === 200 || response.status === 201 || response.status === 202) {
                    this.clearFields(); 
                    this.statusAns = "success";
                    this.idmodel = response.data.id;
                    this.$toast.success('Your data is added successfully!');
                    $('#AddCommittemmberModal').modal('hide');

                    if (this.$refs.fileComInput.files[0]) {
                        const formData = new FormData();
                        formData.append('model_id', response.data.id);
                        formData.append('file', this.$refs.fileComInput.files[0]);

                        const response1 = await sansthaDetailService.addImgSanstha(formData);
                        if (response1.status === 200 || response1.status === 201 || response1.status === 202) {
                            if (!response.data.banner) {
                                response.data.banner = [];
                            }
                            response.data.banner[0] = { original_url: response1.originalUrl };
                            this.$emit('status-update', response.data);
                        }
                    } else {
                        this.$emit('status-update', response.data);
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
        handleFileCommChange() {
            const fileComInput = this.$refs.fileComInput;
            if (fileComInput.files && fileComInput.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = fileComInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();
                if (allowedExtensions.includes(fileExtension)) {
                   this.selectedCommImageURL = URL.createObjectURL(fileComInput.files[0]);
                } else {
                   console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                   fileComInput.value = "";
                }
            }
        },
        clearFields() {
            this.name = '';
            this.email = '';
            this.designation = '';
            this.contact = '';
            this.wpContact = '';
            this.selectedCommImageURL = '';
            this.checkSame = false;
        },
    },
}
</script>