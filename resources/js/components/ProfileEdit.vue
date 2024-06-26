<template>
    <section class="bg_image" style="padding-bottom: 5rem!important;">
        <div class="container">
            <div class="row main_layout mt-2 mb-3 g-2 m-1">
                <div class="col-md-3 col-lg-3 col-xl-3 col-xxl-3 left_layout" :style="{ 'margin-top': emptyDataMarginTop }">
                    <login-sidebar></login-sidebar>
                </div>
                <div class="col-md-8 col-lg-9 col-xl-9 col-xxl-9 center_layout" id="center-layout">
                    <div class=" login_flow pb-2 px-2">
                        <section class="mt-1 pt-1 login_profile_user">
                            <div class="container">
                                <div class="">
                                    <div class="login_profile_user1 p-3">
                                        <!-- <div class="profile_follower text-center">
                                            <span class="profile_follower_count">&nbsp;</span>
                                            <br><span class="profile_follower_head">&nbsp;</span>
                                        </div> -->
                                        <div class="profile_photo_login">
                                            <img class="pic" accept="image/x-png,image/jpeg,image/jpg"
                                                :src="selectedImageURL ? selectedImageURL : (users.profile_photo ? (users.profile_photo[0] ? users.profile_photo[0].original_url : 'images/ad_board3.png') : 'images/ad_board3.png')"
                                                alt="...">
                                            <label for="file-input" class="upload_camera_photo">
                                                <img src="images/profile_upload_camera.svg" class="camera" alt="...">
                                            </label>
                                            <input type="file" id="file-input" name="filename" style="display: none;"
                                                ref="fileInput" @change="handleFileChange">

                                        </div>
                                        <div class="profile_follower text-center">
                                            <span class="profile_follower_count">{{ this.get_followed_sanstha_count
                                            }}</span>
                                            <br><span class="profile_follower_head">Following</span>
                                        </div>
                                    </div>
                                    <div class="profile_user_name mt-2 mb-2">{{ this.users.name }}</div>
                                </div>
                                <div class="profile_section px-5 pb-4">
                                    <div class="back_arrow">
                                        <a class="view_all_latestact" onclick="window.location.href = '/profile'"><i
                                                class="bi bi-arrow-left"></i>
                                        <label class="profile_details mt-4">Back to Profile information</label></a>
                                    </div>
                                    <form class="row ">
                                        <div class="col-sm-12 col-xs-12 col-ms-12 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                            <label for="edit_name" class="profile_title">Name <span class="required mx-1">*</span></label>
                                            <input type="text" id="edit_name" v-model="users.name" class="form-control input_edit_name" pattern="[A-Za-z]+" required>
                                            <div style="color: red;">{{ this.nameErr }}</div>
                                        </div>
                                        <div
                                            class="col-sm-12 col-xs-12 col-ms-12 col-lg-6 col-xl-6 col-xxl-6 ps-lg-3 ps-xxl-3 ps-xl-3 mt-4">
                                            <label for="edit_mbl" class="profile_title">Mobile Number <span class="required mx-1">*</span></label>
                                            <input type="text" v-if="users.mobile == null" id="edit_mbl" v-model="users.mobile" class="form-control input_edit_name"
                                                 @input="onMoInput" pattern="[0-9]{1,9}" maxlength="10" required>
                                            <input type="text" v-else id="edit_mbl" v-model="users.mobile" class="form-control input_edit_name"
                                                @input="onMoInput" :disabled="isMobileReadOnly" pattern="[0-9]{1,9}" maxlength="10" required>
                                            <div style="color: red;">{{ this.mobileErr }}</div>
                                        </div>
                                        <div class="col-sm-12 col-xs-12 col-ms-12 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                            <label for="edit_name" class="profile_title">Email <span class="required mx-1 ">*</span></label>
                                            <input type="text" v-if="users.email == null" v-model="users.email" class="form-control input_edit_name" required>
                                            <input type="text" v-else v-model="users.email" :disabled="isEmailReadOnly" class="form-control input_edit_name" required>
                                            <div style="color: red;">{{ this.emailErr }}</div>
                                        </div>
                                        <div class="col-sm-12 col-xs-12 col-ms-12 col-lg-6 col-xl-6 col-xxl-6 mt-4  ps-lg-3 ps-xxl-3 ps-xl-3">
                                            <label for="edit_gender_male" class="profile_title profile_edit_gender">Gender
                                                <span class="required mx-1">*</span></label>
                                            <br>
                                            <div class=" gender_radio_btns mt-2">
                                                <div>
                                                    <input class="gender_radio" type="radio" id="edit_gender_male" name="editRadios"
                                                    value="male" v-model="users.gender" :checked="users.gender == 'male'"
                                                    style="accent-color: #676767 ;">
                                                <label class="profile_edit_radio" for="edit_gender_male">Male</label>
                                                </div>
                                                <div>
                                                    <input class="gender_radio" type="radio" id="edit_gender_female" name="editRadios"
                                                    value="female" v-model="users.gender"
                                                    :checked="users.gender == 'female'" style="accent-color: #676767 ;">
                                                <label class="profile_edit_radio" for="edit_gender_female">Female</label>

                                                </div>
                                                <div>
                                                    <input class="gender_radio" type="radio" id="edit_gender_other" name="editRadios"
                                                    value="any" v-model="users.gender" :checked="users.gender == 'none'"
                                                    style="accent-color: #676767 ;">
                                                <label class="profile_edit_radio" for="edit_gender_other">I Prefer not to
                                                    say</label>
                                                </div>
                                               
                                                
                                            </div>
                                        </div>
                                        <div class="col-sm-12 col-xs-12 col-ms-12 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                            <label for="edit_adress_profile" class="profile_title">Address Line 1  <span
                                                    class="required mx-1">*</span></label>
                                            <input type="text" v-model="users.address" id="edit_adress_profile"
                                                class="form-control input_edit_name2" maxlength="5000" required>
                                        </div>
                                        <div
                                            class="col-sm-12 col-xs-12 col-ms-12 col-lg-6 col-xl-6 col-xxl-6 mt-4 ps-lg-3 ps-xxl-3 ps-xl-3">
                                            <label for="edit_state" class="profile_title">State <span class="required mx-1">*</span></label>
                                            <select class="form-select input_edit_name3" v-model="selectedState" id="edit_state">
                                                <option v-for="state in states" :key="state.id" :value="state.name">{{state.name }}</option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12 col-xs-12 col-ms-12 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                            <label for="edit_city" class="profile_title">City <span
                                                    class="required mx-1">*</span></label>
                                            <select class="form-select input_edit_name1" id="edit_city" v-model="selectedCity">
                                                <!-- <option :value="selectedCity" selected>{{ selectedCity }}</option> -->
                                                <option v-for="city in cities" :key="city.id" :value="city.name">{{ city.name }}</option>
                                            </select>
                                        </div>
                                        <div
                                            class="col-sm-12 col-xs-12 col-ms-12 col-lg-6 col-xl-6 col-xxl-6 mt-4 ps-lg-3 ps-xxl-3 ps-xl-3">
                                            <label for="edit_pincode_profile" class="profile_title">Pincode <span
                                                    class="required mx-1">*</span></label>
                                            <input type="text" v-model="users.pincode" id="edit_pincode_profile"
                                                class="form-control input_edit_name" @input="onInput" pattern="[0-9]{1,6}" maxlength="6" required>
                                            <div style="color: red;">{{ this.pincodeErr }}</div>
                                        </div>
                                        <div class="d-flex mt-4">
                                            <button class="btn profile_edit_pro_btn" type="button"
                                                onclick="window.location.href = '/profile'">CANCEL</button>
                                            <button class="btn ms-3 profile_edit_pro_btn" @click.prevent="postUpdateProfile()">SUBMIT</button>
                                        </div>
                                    </form>
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
import profileSideBarService from "../../services/profilesidebar.service"
export default {
    name: "App",
    data() {
        return {
            users: {
                email: '', mobile: ''
            },
            nameErr:'',emailErr:'',mobileErr:'',pincodeErr:'',
            token: localStorage.getItem('storeToken'), user_id: localStorage.getItem('userId'),
            users: [], get_followed_sanstha_count: [], state_name: '', emptyDataMarginTop: '132px',
            get_followers_sanstha_count: [], user_name: '', countries: [], selectedCountry: null,
            states: [], cities: [], selectedCity: [], selectedState: '', selectedImageURL: ""
        };
    },
    watch: {
        selectedState: function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.getCities();
            }
        },

    },
    computed: {
        isEmailReadOnly() {
            return this.users.email.length > 0;
        },
        isMobileReadOnly() {
            return this.users.mobile.length > 0;    
        }
    },
    methods: {
        onInput(event) {
            const newValue = event.target.value.replace(/\D/g, ''); 
            this.users.pincode = newValue;
        },
        onMoInput(event) {
            const newValue = event.target.value.replace(/\D/g, ''); 
            this.users.mobile = newValue;
        },
        async getUser() {
            const userId = this.user_id;
            const response = await profileSideBarService.getUser(userId)
            this.users = response.data;
            this.state_name = response.data.state;
            this.selectedState = response.data.state
            this.selectedCity = response.data.city
            this.get_followers_sanstha_count = response.get_followers_sanstha_count;
            this.get_followed_sanstha_count = response.get_followed_sanstha_count;
        },
        async getCountries() {
            const response = await profileSideBarService.getCountry()
            $.each(response, (key, value) => {
                this.countries.push({
                    id: value.id,
                    name: value.name,
                });
            });
        },
        handleTopPosition() {
            this.emptyDataMarginTop = this.allSanstha.length === 0 ? '132px' : 'initial';
        },
        async getStates() {
            let data;
            if (this.selectedCountry) {
                data = {
                    params: {
                        country_id: this.selectedCountry,
                    }
                };
            }
            const response = await profileSideBarService.getState({ ...data });
            $.each(response, (key, value) => {
                this.states.push({
                    id: value.id,
                    name: value.name,
                });
            });
        },
        async getCities() {
            this.cities = [];
            let data;
            if (this.selectedState) {
                data = {
                    params: {
                        type: "web",
                        state_id: this.selectedState,
                    }
                };
            }
            const response = await profileSideBarService.getCity({ ...data });
            $.each(response, (key, value) => {
                this.cities.push({
                    id: value.id,
                    name: value.name,
                });
            });
        },
        handleFileChange() {
            const fileInput = this.$refs.fileInput;
            if (fileInput.files && fileInput.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = fileInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedImageURL = URL.createObjectURL(fileInput.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    fileInput.value = "";
                }
            }
        },
        async postUpdateProfile() {
            const userId = this.user_id;
                if (!this.users.name || !this.users.mobile || !this.users.email || !this.users.address || !this.selectedState || !this.selectedCity || !this.users.pincode) {
                    if (!this.users.name) {
                        this.$toast.error('Please fill in the Name field!');
                    }
                    if (!this.users.mobile) {
                        this.$toast.error('Please fill in the Mobile Number field!');
                    }
                    if (!this.users.email) {
                        this.$toast.error('Please fill in the Email field!');
                    }
                    if (!this.users.address) {
                        this.$toast.error('Please fill in the Address field!');
                    }
                    if (!this.selectedState) {
                        this.$toast.error('Please select a State!');
                    }
                    if (!this.selectedCity) {
                        this.$toast.error('Please select a City!');
                    }
                    if (!this.users.pincode) {
                        this.$toast.error('Please fill in the Pincode field!');
                    }
                    return; 
                }   
                this.nameErr = '';
                this.mobileErr = '';
                this.emailErr = '';
                this.pincodeErr = '';
                const namePattern = /^[A-Za-z\s]+$/;
                const spaceRegex = /^\S.*$/; 
                const mobilePattern = /^[0-9]+$/;
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!this.users.name.trim()) {
                    this.nameErr = 'Name is required';
                } else if (!spaceRegex.test(this.users.name)) {
                    this.nameErr = 'Name should not start with a space';
                }else if (!namePattern.test(this.users.name)) {
                    this.nameErr = 'Please do not use any numbers or special characters ';
                }
            if (!this.users.mobile) {
            this.mobileErr = 'Mobile number is required';
            }else if (!spaceRegex.test(this.users.mobile)){
                this.mobileErr = 'Mobile number should not start with a space';
            }else if(!mobilePattern.test(this.users.mobile)){
                this.mobileErr = 'Mobile number should be only digits';
            }else if (this.users.mobile.length < 10 || this.users.mobile.length > 12) {
                this.mobileErr = "Mobile number should be at least 10 digits";
            }
            if (!this.users.pincode) {
            this.pincodeErr = 'Pincode is required';
            }else if (!spaceRegex.test(this.users.pincode)){
                this.pincodeErr = 'Pincode should not start with a space';
            }else if(!mobilePattern.test(this.users.pincode)){
                this.pincodeErr = 'Pincode should be only digits';
            }else if (this.users.pincode.length < 6 || this.users.pincode.length > 6) {
                this.pincodeErr = "Pincode should be at least 6 digits";
            }
            if (!this.users.email) {
                    this.emailErr = 'Email is required';
                }else if (!emailPattern.test(this.users.email)) {
                    this.emailErr = 'Please write proper email address';
                } else if (!spaceRegex.test(this.users.email)) {
                    this.emailErr = 'Email should not start with a space';
                }
            
            if (this.nameErr || this.mobileErr || this.emailErr || this.pincodeErr ) {
            return; 
            }
            if (this.users.address.length > 150) {
                this.$toast.error('Please set proper address!');
            } else { 
                try {
                const data = {
                    name: this.users.name,
                    mobile: this.users.mobile,
                    email: this.users.email,
                    gender: this.users.gender,
                    address: this.users.address,
                    // country: this.countries.find(country => country.name === this.selectedCountry)?.name,
                    state: this.states.find(state => state.name === this.selectedState)?.name,
                    city: this.cities.find(city => city.name === this.selectedCity)?.name,
                    pincode: this.users.pincode,
                    default_language_id: 1,
                    topic_type_id: 1,
                }
                const response = await profileSideBarService.updateUserProfile(userId, data)
                if (response.status === 200 || 201 || 202) {
                    localStorage.setItem('status', response.status);
                    if (this.$refs.fileInput.files[0]) {
                        const formData = new FormData();
                        formData.append('model_id', userId);
                        formData.append('file', this.$refs.fileInput.files[0]);
                        const response = await profileSideBarService.updateProfilePicture(formData)
                        if (response.status === 200 || 201 || 202) {
                            this.$forceUpdate();
                        }
                        this.$toast.error('Please set proper address!');
                    }
                    this.successmessage = "You have successfully update detail"
                    window.location.href = '/profile';
                } else {
                    console.error("Something went wrong")
                }
            } catch (error) {
                console.error("Something went wrong")
            }
            }
           
        },
    },
    beforeMount() {
        this.getUser();
        this.getCountries();
        this.getStates();
        this.handleTopPosition();
    },
};
</script>
