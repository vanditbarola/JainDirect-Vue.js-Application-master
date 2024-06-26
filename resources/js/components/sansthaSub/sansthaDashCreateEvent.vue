<template>
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal"
                                       data-bs-dismiss="modal" aria-label="Close" alt="...">
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                        <div class="card image_upload_card_media mx-3 my-3">
                            <form>
                                <label for="eventimages" class="file_upload_modal_media">
                                    <media-library-collection name="eventimages" :max-items="5"
                                        :validation-rules="{ accept: ['image/jpeg', 'image/png','image/*'], }" :before-upload="checkFileValidity" />
                                </label>
                            </form>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col">
                        <div class=" mx-3" style="margin-top: 25px !important;">
                            <img :src="`${get_sanstha.logo ? get_sanstha.logo[0] ? get_sanstha.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`" class="img_modal"
                                alt="...">
                            <label class="img_modal_title">{{ this.get_sanstha.title }}</label>
                            <br><label class="head_event_descr mt-4">Title<span class="required mx-1">*</span></label>
                            <input type="text" class="mt-1  start_date_input form-control" placeholder="Enter Event Title" v-model="eventTitle">
                            <div style="color: red;">{{ this.titleErr }}</div>
                            <label class="head_event_descr mt-4">Description</label>
                            <div id="editorEventCreate" ref=editorEventCreate></div>
                            <form class="row">
                                <div class="col-md-6 mt-4">
                                    <label for="start_date" class="form-label start_date_title">Start
                                        Date<span class="required mx-1">*</span></label>
                                    <input type="text" class="form-control start_date_input" id="start_date"
                                        placeholder="Date" onfocus="(this.type='date')" v-model="startDate"
                                        :min="getCurrentDate()">
                                </div>
                                <div class="col-md-6 mt-4">
                                    <label for="start_time" class="form-label start_date_title">
                                        <img src="/images/ic_timer_24px.svg" class="start_date_icon"
                                            alt="...">Start time<span class="required mx-1">*</span></label>
                                    <input type="time" class="form-control start_date_input" id="start_time"
                                        placeholder="Date" v-model="startTime" :min="getCurrentTime()">
                                </div>
                                <div class="col-md-6 mt-4">
                                    <label for="end_date" class="form-label start_date_title">End Date<span
                                        class="required mx-1">*</span></label>
                                    <input type="text" class="form-control start_date_input" id="end_date"
                                        placeholder="Date" onfocus="(this.type='date')" v-model="endDate" :min="getCurrentDate()">
                                </div>
                                <div class="col-md-6 mt-4">
                                    <label for="end_time" class="form-label start_date_title">
                                        <img src="/images/ic_timer_24px.svg" class="start_date_icon"
                                            alt="...">End time<span class="required mx-1">*</span></label>
                                    <input type="time" class="form-control start_date_input" id="end_time"
                                        placeholder="Date" v-model="endTime" :min="getCurrentTime()">
                                </div>

                                <div class="col-12 mt-4">
                                    <label for="inputAddress" class="form-label start_date_title">
                                        <img src="/images/ic_place_24px.svg" class="popup_loction_icon"
                                            alt="...">Add Event Location<span class="required mx-1">*</span></label>
                                    <input type="text" class="form-control start_date_input" id="inputAddress"
                                        placeholder="Enter Location" v-model="eventLocation">
                                </div>
                                <div class="mt-4">
                                    <label class="head_event_descr ">Post visibility<span class="required mx-1">*</span></label>
                                    <div class="media_visiablity_div">
                                        <input class="mediaVisibility_input" type="radio" name="mediaNews"
                                            id="mediamemberEventAdd" value="Member" v-model="eventPost_visiblity">
                                        <label class="form-check-label mediaTrue_label" for="mediamemberEventAdd">Member</label>
                                        <input class="mediaVisibility_input ms-2" type="radio" name="mediaNews"
                                            id="mediaPublicEventAdd" value="Public" v-model="eventPost_visiblity">
                                        <label class="form-check-label mediaTrue_label" for="mediaPublicEventAdd">Public</label>
                                    </div>
                                </div>
                                <div class="col-12 mt-4">
                                    <label for="event_state_create" class="head_event_descr">State<span class="required mx-1">*</span></label>
                                    <select class="form-select start_date_input" id="event_state_create"
                                        v-model="selectedState" @change="getCities">
                                        <option class=" create_comitte_member_label" value="" selected hidden disabled>Select State</option>
                                        <option v-for="state in states" :value="state.id">{{ state.name }}
                                        </option>
                                    </select>
                                </div>
                                
                                <div class="col-12 mt-4">
                                    <label for="event_city" class="head_event_descr">City<span
                                        class="required mx-1">*</span></label>
                                    <select class="form-select start_date_input" id="event_city" v-model="selectedCity">
                                        <option class="create_comitte_member_label " value="" selected hidden disabled>Select City</option>
                                        <option v-for="city in cities" :value="city.id">{{ city.name }}</option>
                                    </select>
                                </div>
                                <div class="col-12 mt-4">
                                    <input class="rsvp_checkBox" type="checkbox" v-model="checkboxCheckedAdd">
                                    <label class="check_box_label ms-1" for="">RSVP</label>
                                </div>
                                <div class="col-12 mt-4" id="inputBoxContainer" v-if="checkboxCheckedAdd">
                                    <input type="text" id="textInput" class="form-control start_date_input"
                                        placeholder="Number of attendees">
                                </div>
                                <div class="col-12 mb-5 mt-4 popup_footer">
                                    <button type="button" class="popup_cancel" data-bs-dismiss="modal" @click="clearField">CANCEL</button>
                                    <button type="button" class="popup_post" @click="addEventSanstha()">POST</button>
                                </div>
                            </form>
                        </div>
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
            frm_event_img: '', org_event_logo: '', startTimeOnly: '', endTimeOnly: '', eventTitle: '', startDate: '',
            startTime: '', endDate: '', endTime: '', eventLocation: '', eventPost_visiblity: '',
            titleErr: '', newsTitle: '', post_error: '', checkboxCheckedAdd: false, checkboxCheckedEdit: false,
            selectedImageURL6: '', selectedEventImageURL: '', selectedCity: '', cities: [], selectedState: '', states: [],
            cityName: '', stateName: '', endDateTrimmed: '', startDateTrimmed: '', org_event_title: '', eventData: [], event_id: '',
            selectItemFilter: '', event_page: 1, eventSanstha: [], total_count: '', get_sanstha: [],
            checkboxChecked: false,get_sanstha:'',media:[],
        }
    },
    components: {
        MediaLibraryCollection,
    },
    beforeMount(){
        this.getStates();
        this.activate();
    },
    computed: {
        formattedStart() {
            const [day, month, year] = this.startDateTrimmed.split('/');
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        },
        formattedEndDate() {
            const [day, month, year] = this.endDateTrimmed.split('/');
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        }
    },
    watch: {
        selectedState: function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.getCities();
            }
        },
        startDateTrimmed: function (newVal, oldVal) {
            const [day, month, year] = newVal.split('/');
            const formattedDate = `${year}-${month}-${day}`;
            this.formattedStart = formattedDate;
        }
    },
    mounted() {
        const quill10 = initializeQuillEditors(this.$refs.editorEventCreate, );
        this.quill10 = quill10;
    },
    methods:{
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
        getCurrentDate() {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            let month = currentDate.getMonth() + 1;
            let day = currentDate.getDate();

            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;

            return `${year}-${month}-${day}`;
        },
        getCurrentTime() {
            const currentDate = new Date();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();

            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            return `${hours}:${minutes}`;
        },
        handleEventFileChange() {
            const fileEventInput = this.$refs.fileEventInput;
            if (fileEventInput.files && fileEventInput.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = fileEventInput.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedEventImageURL = URL.createObjectURL(fileEventInput.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    fileEventInput.value = "";
                }
            }
        },
        checkFileValidity(file) {
            this.media.push(file);
        },
        async addEventSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            let post_visiblity = false;
            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;
            this.titleErr = '';

            if (this.eventPost_visiblity === "Member") {
                post_visiblity = true;
            }
            const formattedStartDate = new Date(this.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const formattedEndDate = new Date(this.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

            let formattedStartTime = this.startTime + ":00"
            let formattedEndTime = this.endTime + ":00"

            if (!this.eventTitle) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.eventTitle)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.eventTitle)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (!this.eventPost_visiblity) {
                this.post_error = 'Please select any one visibility';
                return;
            }
            if (this.titleErr) {
                return;
            }
            const data = {
                organization_id: lastParam,
                title: this.eventTitle,
                detail: this.quill10.getText(),
                post_visiblity: post_visiblity,
                is_active: 1,
                content_language_id: 1,
                location: this.eventLocation,
                start_date_and_time: formattedStartDate + ' ' + formattedStartTime,
                end_date_and_time: formattedEndDate + ' ' + formattedEndTime,
                city_id: this.selectedCity,
                state_id: this.selectedState,
                created_by_id: userId,
            }
            const response = await sansthaDetailService.addEventSanstha({ ...data });
            if (response.status == 200 || response.status == 201 || response.status == 202) {
                $('#CreateEventModal').modal('hide');
                if (this.media.length > 0) {
                    const formData = new FormData();
                    formData.append('model_id', response.data.id);
                    this.media.forEach(file => {
                        formData.append('file[]', file);
                    });
                    formData.append('type', 'mobile_api');
                    const response1 = await sansthaDetailService.addEventMedia(formData)
                    if (response1.status === 200 || 201 || 202) {
                        this.$forceUpdate();
                        const updatedAlbum = response.data;
                        updatedAlbum.banner = [response1];
                        this.eventSanstha.unshift(updatedAlbum);
                        $('#AddEventModal').modal('hide');
                        const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                        if (mediaLibraryRows) {
                            mediaLibraryRows.forEach(row => {
                                row.click();
                            });
                        }
                        this.clearField();
                        this.$toast.success("Event add successfully!");
                        this.selectedEventImageURL = '';
                        this.$forceUpdate();
                    } else {
                        this.$toast.error('Please set proper address!');
                    }
                } else {
                    $('#AddEventModal').modal('hide');
                    const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                    if (mediaLibraryRows) {
                        mediaLibraryRows.forEach(row => {
                            row.click();
                        });
                    }
                    this.selectedImageURL = '';
                    this.$toast.success("Event add successfully!");
                    this.eventSanstha.unshift(response.data);
                    this.$forceUpdate();
                }
            } else {
                this.$toast.error("Something went wrong");
            }
        },
        async getStates() {
            const response = await sansthaDetailService.getStates();
            if (response.status == 200 || response.status == 201) {
                this.states = response;
            } else {
                console.error("Something went wrong");
            }
        },
        async getCities() {
            let data;
            if (this.selectedState) {
                data = {
                    params: {
                        state_id: this.selectedState,
                    }
                };
            }
            const response = await sansthaDetailService.getCities({ ...data });
            if (response.status == 200 || response.status == 201) {
                this.cities = response;
                if (this.selectedCity) {
                    this.selectedCity = this.cities.find(city => city.id === this.selectedCity);
                }
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
            this.eventTitle = "";
            this.quill10.setText('');
            this.eventPost_visiblity = "";
            this.startDate = "";
            this.startTime = "";
            this.endDate = "";
            this.endTime = "";
            this.selectedEventImageURL = '';
            this.eventLocation = '';
            this.selectedState = '';
            this.selectedCity = '';
        },
    }
}
</script>