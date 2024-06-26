<template>
    <div x-data="app()" x-cloak>
        <section class="section_tab_dashboard_news mt-3">
            <div class="mx-3 pt-3 px-1">
                <label class="dashboard_news_title">Events</label>
                <button class="dashboard_news_btn" data-bs-toggle="modal" data-bs-target="#AddEventModal">Add Event</button>
            </div>
        </section>

        <div class="row dashboard_news_row g-2 mt-1" v-for='(res, index) in eventSanstha' :key="res.id">
            <div class="col-12">
                <div class="card h-100 p-2 inner_login_cards">
                    <div class="ribbon-wrapper">
                        <div class="card-badge-event">Events</div>
                    </div>
                    <div class="row">
                        <div class="ps-4 d-flex">
                            <a class="view_all_latestact" :href="`/sanstha-detail/${lastParam}`">
                                <img :src="`${get_sanstha.logo ? get_sanstha.logo[0] ? get_sanstha.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                    class="getallimg img-fluid" :title="get_sanstha.title" :alt="get_sanstha.title">
                                <span class="d-inline-block text-truncate getallhead" :title="get_sanstha.title"
                                    alt="Organization Title">{{ get_sanstha.title }}</span>
                            </a>
                            <div class="more_option_in_cards">
                                <b-dropdown text="" class="sanstha_dashboard_more_tab_cards" no-caret>
                                    <b-dropdown-item   type="button" data-bs-toggle="modal"
                                    data-bs-target="#editEvents" @click="callTwoFunctions(res.id)">
                                        <li><a class="dropdown-item">
                                            <img src="/images/edit.svg" class="card_option_edit" alt="...">Edit</a>
                                        </li>
                                    </b-dropdown-item>
                                    <b-dropdown-item  type="button" data-bs-toggle="modal"
                                    data-bs-target="#deleteModalEvents" @click="getDeleteId(res.id)">
                                        <li><a class="dropdown-item" >
                                            <img src="/images/delete.svg" class="card_option_edit" alt="...">Delete</a></li>
                                    </b-dropdown-item>
                                </b-dropdown>
                            </div>
                        </div>
                    </div>
                    <!--delete modal-->
                    <div class="modal" id="deleteModalEvents">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal" aria-label="Close" alt="...">
                                <div class="modal-body">
                                    <label class="discard1 mt-3">Are you sure you want to delete?</label>
                                    <div class="d-flex justify-content-center mt-4 mb-4">
                                        <button type="submit" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                        <button type="submit" class="popup_post ms-5" data-bs-dismiss="modal"
                                            @click="deleteEventSanstha">DELETE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-body card_body_Newz" style="margin-top: -10px;">
                        <img :src="getBannerImageUrl(res.banner)"
                            class="getallnewsimg card-img-top img-fluid m-1 text-center"  :title="get_sanstha.title" :alt="get_sanstha.title">
                        <div class="activity_card_body p-1 mb-3">
                            <label class="card_header">{{ res.title }}</label>
                            <p class="section_body" v-html="res.detail"></p>
                            <label class="card_modal_date mt-1"><img src="/images/ic_timer_24px.svg" class="location_icon me-2" alt="...">
                                {{ formatDate(res.start_date_and_time) + ' - ' + formatDate1(res.end_date_and_time) }}
                            </label><br/>
                            <label class="card-modal_location mt-1 "><img src="/images/ic_place_24px.svg" alt="..."
                                class="loation_icon me-2">{{ res.location }}</label>
                        </div>
                        <a class="read_more px-1 " data-bs-target="#myReadMoreEventModal" data-bs-toggle="modal"
                            @click="getDataById(res.id)">Read More...</a>
                    </div>

                    <div class="card-footer border-0 bg-white  activity_card_footer">
                        <div class="row row-cols-4">
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                <div class="text-center" style="margin-left: -45px;">
                                    <img :src="getImageUrl(res)"
                                        @click="manageLike(res, res.type = 'Events', res.id, res.get_user_likes == null ? is_like = 0 : res.get_user_likes.is_like, res.total_like, index)"
                                        class="footer_img" alt="...">
                                    <br><span class="icon_font">{{ total_count > 0 ? total_count : res.total_like == null ? 0 : res.total_like }}</span>
                                </div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                <div class="text-center" style="margin-left: -21px;">
                                    <a class="view_all_latestact">
                                        <img :src="getSaveImageUrl(res)"
                                            @click="manageSave(res, res.type = 'Events', res.id, res.get_user_save_posts == null ? is_save = 0 : res.get_user_save_posts.is_save, index)"
                                            class="footer_img" alt="...">
                                        <br>
                                        <span
                                            v-if="res?.get_user_save_post?.is_save == 1"
                                            class="icon_font">Saved
                                            Post</span>
                                        <span v-else class="icon_font">Save Post</span>
                                    </a>
                                </div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3">
                                <div class="text-center" style="margin-left: 16px;">
                                    <img src="/images/ic_visibility_24px.svg" class="footer_img_view" alt="...">
                                    <br><span class="icon_font ">{{ res.total_view == null ? 0 : res.total_view }}</span>
                                </div>
                            </div>
                            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 ">
                                <div class=" text-center" style="margin-left: 20px;">
                                    <a class="view_all_latestact" id="share" :href="`/sharepostcard?id=${btoa(res.id)}&type=${btoa('Events')}`" target="_blank"   @click.prevent="sendToWhatsApp(get_sanstha.title , `/sharepostcard?id=${btoa(res.id)}&type=${btoa('Events')}`)">
                                        <img src="/images/Logo-WhatsApp@2x.png"class="footer_img footer_img_share" alt="...">
                                        <br><span class="icon_font">Share</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <infinite-loading @distance="1" @infinite="getEventsBasedSanstha"></infinite-loading>

        <!--edit event modal-->
        <div class="modal" id="editEvents" tabindex="-1" aria-labelledby="editEvents" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                        aria-label="Close" alt="..." @click="onCancel()">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                <div class="card image_upload_card_media eventadd mx-3 my-3">
                                    <form>
                                        <label for="images" class="file_upload_modal_media">
                                            <media-library-collection   v-if="isDataAvailable"  name="appeal_data_array" :max-items="5" :initial-value="appeal_data_array" :validation-rules="{ accept: ['image/png', 'image/jpeg', 'image/*'] }" :before-upload="checkFileValidity" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col px-4">
                                <div class="mx-1 mt-3" style=" display: flex;">
                                    <img :src="org_event_logo ? org_event_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                        class="img_modal" alt="...">
                                    <label class="img_modal_title">{{ org_event_title }}</label>
                                </div>
                                <label class="head_event_descr mt-4">Title</label>
                                <input type="text" class="mt-1 start_date_input form-control" placeholder="Enter Event Title" v-model="eventData.title">
                                <label class="head_event_descr mt-4">Description</label>
                                <div id="editorEvent2" ref="editorEvent2">{{ eventData.detail }}</div>
                                <form class="row">
                                    <div class="col-md-6 mt-4">
                                        <label for="start_date1" class="form-label start_date_title">
                                            <img src="/images/ic_timer_24px.svg" class="start_date_icon" alt="...">Start Date</label>
                                        <input type="date" class="form-control start_date_input" id="start_date1"
                                            v-model="formattedStartDate" @change="handleDateChangeStart"
                                            value="22-04-2024">
                                    </div>
                                    <div class="col-md-6 mt-4">
                                        <label for="start_time_edit" class="form-label start_date_title">
                                            <img src="/images/ic_timer_24px.svg" class="start_date_icon" alt="...">Start Time</label>
                                        <input type="time" class="form-control start_date_input" id="start_time_edit"
                                            placeholder="Date" v-model="startTimeOnly">
                                    </div>
                                    <div class="col-md-6 mt-4">
                                        <label for="end_date1" class="form-label start_date_title">End Date</label>
                                        <input type="date" class="form-control start_date_input" id="end_date1"
                                            v-model="formattedEndDate" @change="handleDateChangeEnd">
                                    </div>
                                    <div class="col-md-6 mt-4">
                                        <label for="End_time_edit" class="form-label start_date_title">
                                        <img src="/images/ic_timer_24px.svg" class="start_date_icon" alt="...">End Time</label>
                                        <input type="time" class="form-control start_date_input" id="End_time_edit"
                                            placeholder="Date" v-model="endTimeOnly">
                                    </div>
                                    <div class="col-12 mt-4">
                                        <label for="inputAddress" class="form-label start_date_title">
                                            <img src="/images/ic_place_24px.svg" class="popup_loction_icon" alt="...">Add Event Location</label>
                                        <input type="text" class="form-control start_date_input" id="inputAddress"
                                            placeholder="Enter Location" v-model="eventData.location">
                                    </div>
                                    <div class="mt-4">
                                        <label class="head_event_descr ">Post visibility</label>
                                        <div class="media_visiablity_div">
                                            <input class="mediaVisibility_input" type="radio" name="mediaNews"
                                                id="mediatrueEvent" v-model="eventData.post_visiblity" :value=1>
                                            <label class="form-check-label mediaTrue_label" for="mediatrueEvent"
                                                :checked="eventData.post_visiblity === 1">Member</label>
                                            <input class="mediaVisibility_input ms-2" type="radio" name="mediaNews"
                                                id="mediafalseEvent" v-model="eventData.post_visiblity" :value=0>
                                            <label class="form-check-label mediaTrue_label" for="mediafalseEvent"
                                                :checked="eventData.post_visiblity === 0">Public</label>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-4">
                                        <label for="event_state_edit" class="head_event_descr">State</label>
                                        <select class="form-select start_date_input" id="event_state_edit"
                                            v-model="selectedState" @change="getCities">
                                            <option class="create_comitte_member_label" value="" selected hidden
                                                disabled>Select State</option>
                                            <option v-for="state in states" :key="state.id" :value="state.id">
                                                {{ state.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-12 mt-4">
                                        <label for="event_city_edit" class="head_event_descr">City</label>
                                        <select class="form-select start_date_input" id="event_city_edit" v-model="selectedCity">
                                            <option :value="city.id" v-for="city in cities" :key="city.id">{{ city.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-12 mt-4">
                                        <input class="rsvp_checkBox" type="checkbox" v-model="checkboxCheckedEdit">
                                        <label class="check_box_label ms-1" for="">RSVP</label>
                                    </div>
                                    <div class="col-12 mt-4" id="inputBoxContainer" v-if="checkboxCheckedEdit">
                                        <input type="text" id="textInput" class="form-control start_date_input" placeholder="Number of attendees">
                                    </div>
                                    <div class="col-12 mb-5 mt-4 popup_footer">
                                        <button type="button" class="popup_cancel" data-bs-dismiss="modal" @click="onCancel()">CANCEL</button>
                                        <button type="button" class="popup_post" @click="updateEventSanstha()">POST</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Add event-->
        <div class="modal" tabindex="-1" id="AddEventModal" aria-labelledby="AddEventModalLabel"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content  ">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                        aria-label="Close" alt="..." @click="clearField()">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                <div class="card image_upload_card_media eventadd mx-3 my-3">
                                    <form>
                                        <label for="images" class="file_upload_modal_media">
                                            <media-library-collection name="images" ref="images" :max-items="5"
                                                :validation-rules="{ accept: ['image/jpeg', 'image/png','image/*'], }"
                                                :before-upload="checkFileValidity" />
                                        </label>
                                    </form>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col">
                                <div class=" mx-3" style="margin-top: 25px !important;">
                                    <img :src="`${get_sanstha.logo ? get_sanstha.logo[0] ? get_sanstha.logo[0].original_url : '/images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                        class="img_modal" alt="...">
                                    <label class="img_modal_title">{{ this.get_sanstha.title }}</label>
                                    <br><label class="head_event_descr mt-4">Title<span class="required mx-1">*</span></label>
                                    <input type="text" class="mt-1  start_date_input form-control"
                                        placeholder="Enter Event Title" v-model="eventTitle">
                                    <div style="color: red;">{{ this.titleErr }}</div>
                                    <label class="head_event_descr mt-4">Description</label>
                                    <div id="editorEvent1" ref=editorEvent1></div>
                                    <form class="row">
                                        <div class="col-md-6 mt-4">
                                            <label for="start_date" class="form-label start_date_title">Start Date<span class="required mx-1">*</span></label>
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
                                                placeholder="Date" onfocus="(this.type='date')" v-model="endDate"
                                                :min="getCurrentDate()">
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
                                                <label class="form-check-label mediaTrue_label"
                                                    for="mediamemberEventAdd">Member</label>
                                                <input class="mediaVisibility_input ms-2" type="radio" name="mediaNews"
                                                    id="mediaPublicEventAdd" value="Public" v-model="eventPost_visiblity">
                                                <label class="form-check-label mediaTrue_label" for="mediaPublicEventAdd">Public</label>
                                            </div>
                                        </div>
                                        <div class="col-12 mt-4">
                                            <label for="event_state_add" class="head_event_descr">State<span class="required mx-1">*</span></label>
                                            <select class="form-select start_date_input" id="event_state_add"
                                                v-model="selectedState" @change="getCities">
                                                <option class="create_comitte_member_label create_comitteplaceholder"
                                                    value="" selected hidden disabled>Select State</option>
                                                <option v-for="state in states" :value="state.id">{{ state.name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-12 mt-4">
                                            <label for="event_city" class="head_event_descr">City<span class="required mx-1">*</span></label>
                                            <select class="form-select start_date_input" id="event_city"
                                                v-model="selectedCity">
                                                <option class="create_comitte_member_label create_comitteplaceholder"
                                                    value="" selected hidden disabled>Select City</option>
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
                                            <button type="button" class="popup_cancel" data-bs-dismiss="modal"
                                                @click="clearField">CANCEL</button>
                                            <button type="button" class="popup_post" @click="addAppealSanstha()"
                                                :disabled="isSubmitting">
                                                <span v-if="isSubmitting" class="spinner-border spinner-border-sm"
                                                    role="status" aria-hidden="true"></span>
                                                <span v-if="!isSubmitting">POST</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- read more -->
        <div class="modal" id="myReadMoreEventModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <button type="button" class="btn_close" data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>
                    <div class="modal-body" style="padding-bottom: 0%;">
                        <div class="row">
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12">
                                <div class="swiper slider" v-if="img.length > 0">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in img" :key="index"
                                            v-show="index === selectedImageIndex" class="swiper-slide">
                                            <img :src="res.original_url ? res.original_url : 'images/jd_card_logo.png'"
                                                class="image_slider img-fluid" :alt="org_title" :title="org_title">
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="swiper slider">
                                    <img src='/images/jd_card_logo.png' class="image_slider img-fluid" :alt="org_title" :title="org_title">
                                </div>
                                <div class="dash mt-2 mb-2 "></div>
                                <label class="title_gallery p-2 m-1" v-if="img.length > 0">Gallery</label>
                                <div class="swiper thumbnail thumbnailSansthaEvent">
                                    <div class="swiper-wrapper">
                                        <div v-for="(res, index) in  img" :key="index" class="swiper-slide">
                                            <img :src="res.original_url" alt="..." class="image_slider_down img-fluid" @click="selectImage(index)">
                                        </div>
                                    </div>
                                    <div class="next_div" v-if="img.length > 3" @click="nextSlideSanasthEvent"><i class="bi bi-chevron-right"></i></div>
                                    <div class="prev_div" v-if="img.length > 3" @click="prevSlideSanasthaEvent"><i class="bi bi-chevron-left"></i></div>
                                </div>
                            </div>
                            <div class="col-md-12 col-lg-6 col-xl-6 col-xxl-6 col-sm-12 col-xs-12 modal_right_div">
                                <section class="card1">
                                    <div class="card border-0">
                                        <div class="card-head p-2 card_head_modal border-0">
                                            <div class="row row-cols-3 g-0 ">
                                                <div class="col-md-2 col-xs-1 col-sm-1 col-lg-2 col-xl-2 col-xxl-2">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${lastParam}`">
                                                        <img :src="org_logo ? org_logo : '/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9.png'"
                                                            class="modal_card_head_img" :alt="org_title" :title="org_title">
                                                    </a>
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ">
                                                    <a class="view_all_latestact" :href="`/sanstha-detail/${lastParam}`">
                                                        <label class="modal_card_head_title margin_left text-truncate mt-2 ms-2"
                                                        :title="org_title">{{ org_title }}</label>
                                                    </a>
                                                </div>
                                                <div class="col-md-3 col-lg-4 col-sm-5 col-lg-4 col-xl-4 col-xs-4 ms-auto ">
                                                    <button class="btn btn_following btn_following_modal" @click="manageFollowMore()" type="submit">
                                                        <img :src="getFollowImageMore()" class="flw_btn_img" alt="..."></button>
                                                </div>
                                            </div>
                                        </div><!--end of card head-->
                                        <div class="card-body p-2 ">
                                            <label class="card_modal_body-title px-2">{{ dash_sanstha.title }} </label>
                                            <div  :class="{ 'overflow_auto_dynamic': true, 'overflow_auto_dynamic_data': img.length > 0 }">
                                                <p class="card_modal_body_details p-2" v-html="dash_sanstha.detail"></p>
                                                <label v-if="dash_sanstha.type == 'Events'" class="card_modal_date py-2">
                                                <img src="/images/ic_timer_24px.svg" class="location_icon mx-2" alt="...">
                                                {{ formatDate(dash_sanstha.start_date_and_time) + ' - ' + formatDate1(dash_sanstha.end_date_and_time) }}</label><br>
                                            <label v-if="dash_sanstha.type == 'Events'" class="card-modal_location py-2 "><img src="/images/ic_place_24px.svg"  class="loation_icon mx-2 " alt="...">{{ dash_sanstha.location }}</label>
                                            </div>
                                           
                                        </div>
                                        <div class="dash p-2"></div>
                                        <div class="card-footer bg-white border-0 mt-2">
                                            <div class="row text-center row-cols-4 modal_footer_row">
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img :src="getImageLike()" @click="manageLikeMore()" class="footer_img" alt="...">
                                                        <br><span class="icon_font">{{ total_count > 0 ? total_count : dash_sanstha.total_like == null ? 0 : dash_sanstha.total_like }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <a class="view_all_latestact">
                                                            <img :src="getSaveImageMore()" @click="manageSaveMore()" class="footer_img" alt="...">
                                                            <br><span class="icon_font">Save Post</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class="text-center">
                                                        <img src="/images/ic_visibility_24px.svg" class="footer_img_view" alt="...">
                                                        <br><span class="icon_font ">{{ dash_sanstha.total_view == null ? 0 : dash_sanstha.total_view }}</span>
                                                    </div>
                                                </div>
                                                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xxl-3 col-xl-3 col-xxs-3">
                                                    <div class=" text-center">
                                                        <a class="view_all_latestact" id="share" :href="`/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`" target="_blank"   @click.prevent="sendToWhatsApp(org_title , `/sharepostcard?id=${btoa(dash_sanstha.id)}&type=${btoa(dash_sanstha.type)}`)">
                                                            <img src="/images/Logo-WhatsApp@2x.png"class="footer_img footer_img_share" alt="...">
                                                            <br><span class="icon_font">Share</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div><!--end of modal-content-->
            </div><!--end of modal-dialog-->
        </div>
    </div>
</template>
<script>
import sansthaDetailService from '../../../services/sansthaDetail.service';
import afterLoginHomeService from "../../../services/afterLoginHome.service";
import { handleLike, handleSave } from '../../../common/common';
import { MediaLibraryCollection } from "@spatie/media-library-pro-vue2-collection";
import { sendToWhatsApp } from '../../../utils/sharefunction.js';
import { initializeQuillEditors } from '../../../utils/quilleditor.js';

export default {
    name: "App",
    data() {
        return {
            changeStart: '', changeEnd: '', frm_event_img: '', org_event_logo: '', startTimeOnly: '', endTimeOnly: '', eventTitle: '', startDate: '',
            startTime: '', endDate: '', endTime: '', eventLocation: '', eventPost_visiblity: '', dash_sanstha: [], img: '', selectedImageIndex: 0, org_logo: '', org_title: '',
            titleErr: '', newsTitle: '', post_error: '', checkboxCheckedAdd: false, checkboxCheckedEdit: false,
            selectedImageURL6: '', selectedImageURL7: '', selectedCity: '', cities: [], selectedState: '', states: [],
            cityName: '', stateName: '', endDateTrimmed: '', startDateTrimmed: '', org_event_title: '', eventData: [], event_id: '',
            selectItemFilter: '', event_page: 1, eventSanstha: [], total_count: '', get_sanstha: [],isDataAvailable:false,
            formattedStartDate: '', formattedEndDate: '', isSubmitting: false, lastParam: '',event_data_array: {}
        };
    },
    components: {
        MediaLibraryCollection,
    },
    created() {
        if (this.eventSanstha.length === 0) {
            this.getEventsBasedSanstha();
        }
    },
    beforeMount() {
        this.getStates();
        this.activate();
    },
    watch: {
        selectedState: function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.getCities();
            }
        },

    },
    mounted() {
        const { quill1, quill2 } = initializeQuillEditors(this.$refs.editorEvent1, this.$refs.editorEvent2);
        this.quill3 = quill3;
        this.quill4 = quill4;
        // this.quill1 = new Quill(this.$refs.editorEvent1, {
        //     modules: {
        //         toolbar: [
        //             [{ 'font': [] }],
        //             ["bold", "italic", "underline", "strike"],
        //             [{ list: "ordered" }, { list: "bullet" }],
        //             [{ 'color': [] }, { 'background': [] }],
        //             [{ 'align': [] }],
        //             ['blockquote', 'code-block'],
        //             ["image", "link", "video"]
        //         ]
        //     },
        //     placeholder: 'Enter Description',
        //     theme: 'snow'
        // });

        // Initialize Quill editor 2
        // this.quill2 = new Quill(this.$refs.editorEvent2, {
        //     modules: {
        //         toolbar: [
        //             [{ 'font': [] }],
        //             ["bold", "italic", "underline", "strike"],
        //             [{ list: "ordered" }, { list: "bullet" }],
        //             [{ 'color': [] }, { 'background': [] }],
        //             [{ 'align': [] }],
        //             ['blockquote', 'code-block'],
        //             ["image", "link", "video"]
        //         ]
        //     },
        //     placeholder: 'Enter Description',
        //     theme: 'snow'
        // });
        const thumbnailSansthaEvent = new Swiper('.thumbnailSansthaEvent', {
            slidesPerView: 'auto',
        });

        const slider = new Swiper('.slider', {
            loop: true,
            grabCursor: true,
            thumbs: {
                swiper: thumbnailSansthaEvent
            },
        });
    },
    methods: {
        sendToWhatsApp(title, href) {
            sendToWhatsApp(title, href);
        },
        btoa(input) {
            return btoa(input);
        },
        formatDate(dateTimeString) {
            if (!dateTimeString) {
                return '';
            }
            try {
                const [datePart, timePart] = dateTimeString.split(' ');
                if (!datePart || !timePart) {
                    return '';
                }
                const [day, month, year] = datePart.split('/');
                const rearrangedDate = `${month}/${day}/${year} ${timePart}`;
                const formattedDateTime = new Date(rearrangedDate);
                return formattedDateTime.toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric'
                }) + ' ' +
                    formattedDateTime.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
            } catch (error) {
                console.error("Error formatting date:", error);
                return '';
            }
        },

        formatDate1(dateTimeString1) {
            if (!dateTimeString1) {
                return '';
            }
            try {
                const [datePart, timePart] = dateTimeString1.split(' ');
                if (!datePart || !timePart) {
                    return '';
                }
                const [day, month, year] = datePart.split('/');
                const rearrangedDate1 = `${month}/${day}/${year} ${timePart}`;
                const formattedDateTime1 = new Date(rearrangedDate1);

                return formattedDateTime1.toLocaleDateString('en-US', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric'
                }) + ' ' +
                    formattedDateTime1.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
            } catch (error) {
                console.error("Error formatting date:", error);
                return '';
            }
        },
        selectImage(index) {
            this.selectedImageIndex = index;
        },
        async getTypedSanstha() {
            const data = {
                params: {
                    store_type: "Events",
                    id: this.event_id,
                }
            }
            const response = await sansthaDetailService.getDetailSanstha({ ...data });
            if (response.status === 200 || 201) {
                this.dash_sanstha = response
                this.img = response.banner;
                this.org_logo = this.dash_sanstha.organization.logo[0].original_url
                this.org_title = this.dash_sanstha?.organization?.title
                this.poId = this.dash_sanstha.id
                this.typePo = this.dash_sanstha.type
                this.startDate = this.dash_sanstha.start_date_and_time
                this.endDate = this.dash_sanstha.end_date_and_time
            } else {
                console.error("Something went wrong")
            }
        },
        getImageLike() {
            if (this.dash_sanstha.get_user_likes == null) {
                return '/images/ic_unfavorite_24px.svg';
            } else if (this.dash_sanstha.get_user_likes.is_like === 1) {
                return '/images/ic_favorite_24px.svg';
            } else {
                return '/images/ic_unfavorite_24px.svg';
            }
        },
        async manageLikeMore() {
            let is_like = 0;
            if (this.dash_sanstha.get_user_likes) {
                is_like = this.dash_sanstha.get_user_likes.is_like;
            }
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? this.dash_sanstha.total_like + 1 : this.dash_sanstha.total_like - 1;
            let img = newIsLike === 1 ? 'images/ic_favorite_24px.svg' : 'images/ic_unfavorite_24px.svg';

            this.$set(this.dash_sanstha, 'img', img); // Update the image path
            if (this.dash_sanstha.get_user_likes) {
                this.$set(this.dash_sanstha.get_user_likes, 'is_like', newIsLike);
            } else {
                this.$set(this.dash_sanstha, 'get_user_likes', { is_like: newIsLike });
            }
            this.$set(this.dash_sanstha, 'total_like', newLikeCount); // Update total_like
            const newsIndex = this.eventSanstha.findIndex(news => news.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                this.$set(this.eventSanstha[newsIndex], 'total_like', newLikeCount); // Update total_like
                if (this.eventSanstha[newsIndex].get_user_likes) {
                    this.$set(this.eventSanstha[newsIndex].get_user_likes, 'is_like', newIsLike);
                } else {
                    this.$set(this.eventSanstha[newsIndex], 'get_user_likes', { is_like: newIsLike });
                }
            }
            await handleLike(newIsLike, this.typePo, this.poId);
        },
        getSaveImageMore() {
            if (this.dash_sanstha.get_user_save_posts == null) {
                return '/images/ic_add_box_24px.svg';
            } else if (this.dash_sanstha.get_user_save_posts.is_save === 1) {
                return '/images/ic_add_fav_box_24px.svg';
            } else {
                return '/images/ic_add_box_24px.svg';
            }
        },
        async manageSaveMore() {
            let is_save;
            if (this.dash_sanstha.get_user_save_posts == null) {
                is_save = 0;
            } else {
                is_save = this.dash_sanstha.get_user_save_posts.is_save;
            }
            const newIsSave = is_save === 1 ? 0 : 1;
            let img = newIsSave === 1 ? 'images/ic_add_box_24px.svg' : 'images/ic_add_box_24px.svg';
            this.$set(this.dash_sanstha, 'img', img); // Update the image path
            if (this.dash_sanstha.get_user_save_posts) {
                this.$set(this.dash_sanstha.get_user_save_posts, 'is_save', newIsSave);
            } else {
                this.$set(this.dash_sanstha, 'get_user_save_posts', { is_save: newIsSave });
            }
            const newsIndex = this.eventSanstha.findIndex(news => news.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.eventSanstha[newsIndex].get_user_save_posts) {
                    this.$set(this.eventSanstha[newsIndex].get_user_save_posts, 'is_save', newIsSave);
                } else {
                    this.$set(this.eventSanstha[newsIndex], 'get_user_save_posts', { is_save: newIsSave });
                }
            }
            await handleSave(newIsSave, this.typePo, this.poId);
        },
        getFollowImageMore() {
            if (this.dash_sanstha.get_user_org_follows == null) {
                return '/images/follow_btn.svg';
            } else if (this.dash_sanstha.get_user_org_follows.is_follow === 1) {
                return '/images/following_btn.svg';
            } else {
                return '/images/follow_btn.svg';
            }
        },
        async manageFollowMore() {
            let is_follow = 0;
            if (this.dash_sanstha.get_user_org_follows) {
                is_follow = this.dash_sanstha.get_user_org_follows.is_follow;
            }
            const newIsFollow = is_follow === 1 ? 0 : 1;
            let img = newIsFollow === 1 ? 'images/following_btn.svg' : 'images/follow_btn.svg';

            this.$set(this.dash_sanstha, 'img', img); // Update the image path
            if (this.dash_sanstha.get_user_org_follows) {
                this.$set(this.dash_sanstha.get_user_org_follows, 'is_follow', newIsFollow);
            } else {
                this.$set(this.dash_sanstha, 'get_user_org_follows', { is_follow: newIsFollow });
            }
            const newsIndex = this.eventSanstha.findIndex(news => news.id === this.dash_sanstha.id);
            if (newsIndex !== -1) {
                if (this.eventSanstha[newsIndex].get_user_org_follows) {
                    this.$set(this.eventSanstha[newsIndex].get_user_org_follows, 'is_follow', newIsFollow);
                } else {
                    this.$set(this.eventSanstha[newsIndex], 'get_user_org_follows', { is_follow: newIsFollow });
                }
            }
            const data = {
                is_follow: newIsFollow,
                organisation_id: this.dash_sanstha.organization_id,
            };
            try {
                const response = await afterLoginHomeService.followUnfollowOrganization({ ...data })
                if (response.status === 200 || 201) {
                } else {
                    console.error("Something went wrong")
                }
            } catch (error) {
                console.error("Error making API call:", error);
            }
        },
        nextSlideSanasthEvent() {
            const thumbnailSansthaEvent = document.querySelector('.thumbnailSansthaEvent').swiper;
            thumbnailSansthaEvent.slideNext();
        },
        prevSlideSanasthaEvent() {
            const thumbnailSansthaEvent = document.querySelector('.thumbnailSansthaEvent').swiper;
            thumbnailSansthaEvent.slidePrev();
        },
        getBannerImageUrl(banner) {
            if (banner && banner.length > 0) {
                const lastIndex = banner.length - 1;
                return banner[lastIndex].original_url;
            }
            return '/images/jd_card_logo.png';
        },
        handleDateChangeStart(event) {
            this.changeStart = event.target.value
        },
        handleDateChangeEnd(event) {
            this.changeEnd = event.target.value
        },
        async activate() {
            const url = window.location.href;
            this.lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: this.lastParam
                }
            }
            const response = await sansthaDetailService.getSanstha({ ...data });
            this.get_sanstha = response;
        },
        getDataById(resId) {
            this.event_id = resId
            if (this.event_id) {
                this.getTypedSanstha()
            }
        },
        callTwoFunctions(id) {
            this.getEditId(id);
            this.getParticularSansthaEvent();
        },
        nextSlideSanasthEvent() {
            const thumbnailSansthaEvent = document.querySelector('.thumbnailSansthaEvent').swiper;
            thumbnailSansthaEvent.slideNext();
        },
        prevSlideSanasthaEvent() {
            const thumbnailSansthaEvent = document.querySelector('.thumbnailSansthaEvent').swiper;
            thumbnailSansthaEvent.slidePrev();
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
        handleFileChange7() {
            const fileInput7 = this.$refs.fileInput7;
            if (fileInput7.files && fileInput7.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = fileInput7.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedImageURL7 = URL.createObjectURL(fileInput7.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    fileInput7.value = "";
                }
            }
        },
        handleFileChange6() {
            const fileInput6 = this.$refs.fileInput6;
            if (fileInput6.files && fileInput6.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = fileInput6.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedImageURL6 = URL.createObjectURL(fileInput6.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    fileInput6.value = "";
                }
            }
        },
        getEditId(resId) {
            this.event_id = resId;
        },
        getDeleteId(resId) {
            this.event_del_id = resId
        },
        updateFilter(filterText) {
            this.selectItemFilter = filterText;
        },
        onCancel(){
            this.isDataAvailable = false;
        },
        async getParticularSansthaEvent() {
            this.event_data_array = {};
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    type: "web"
                }
            }
            const response = await sansthaDetailService.getParticularEventsSanstha(this.event_id, data);
            if (response.status == 200 || response.status == 201) {
                this.eventData = response.data;
                this.event_data_array = response.media_img;
                this.isDataAvailable = true;
                this.org_event_title = response.data.organization.title;
                this.org_event_logo = response.data.organization?.logo[0]?.original_url;
                this.frm_event_img = response.data?.banner[0]?.original_url;
                this.selectedState = response.data.states.id;
                this.selectedCity = response.data.cities.id;

                const startDateString = response.data.start_date_and_time;
                const startDateTrimmed = startDateString.split(' ')[0];
                const [day, month, year] = startDateTrimmed.split('/');
                this.formattedStartDate = `${year}-${month}-${day}`;

                const startTimeOnly = startDateString.split(' ')[1];
                this.startTimeOnly = startTimeOnly;

                const endDateString = response.data.end_date_and_time;
                const endDateTrimmed = endDateString.split(' ')[0];
                const [day1, month1, year1] = endDateTrimmed.split('/');
                this.formattedEndDate = `${year1}-${month1}-${day1}`;

                const endTimeOnly = endDateString.split(' ')[1];
                this.endTimeOnly = endTimeOnly;
                if (this.eventData?.detail && this.eventData?.detail?.ops) {
                    this.quill4.setContents(this.eventData?.detail);
                } else {
                    this.quill4.setText(this.eventData?.detail);
                }

            } else {
                console.error("Something went wrong");
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
                detail: this.quill4.getText(),
                post_visiblity: post_visiblity,
                is_active: 1,
                content_language_id: 1,
                location: this.eventLocation,
                start_date_and_time: formattedStartDate + ' ' + formattedStartTime,
                end_date_and_time: formattedEndDate + ' ' + formattedEndTime,
                city_id: this.selectedCity,
                state_id: this.selectedState,
                created_by_id: userId,
            };
            this.isSubmitting = true;
            const response = await sansthaDetailService.addEventSanstha({ ...data });
            if (response.status == 200 || response.status == 201 || response.status == 202) {
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
                        this.isSubmitting = false;
                        const mediaLibraryRows = document.querySelectorAll('.media-library-row-remove');
                        if (mediaLibraryRows) {
                            mediaLibraryRows.forEach(row => {
                                row.click();
                            });
                        }
                        this.clearField();
                        this.$toast.success("Event add successfully!");
                        this.selectedImageURL = '';
                        this.$forceUpdate();
                    } else {
                        this.$toast.error('Please set proper address!');
                    }
                } else {
                    $('#AddEventModal').modal('hide');
                    this.isSubmitting = false;
                    this.selectedImageURL = '';
                    this.$toast.success("Event add successfully!");
                    this.eventSanstha.unshift(response.data);
                    this.$forceUpdate();
                }
            } else {
                this.$toast.error("Something went wrong");
            }
        },
        async updateEventSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            let formattedStartDate;
            let formattedEndDate;
            if (this.changeStart) {
                formattedStartDate = new Date(this.changeStart).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            } else {
                formattedStartDate = new Date(this.formattedStartDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }
            if (this.changeEnd) {
                formattedEndDate = new Date(this.changeEnd).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            } else {
                formattedEndDate = new Date(this.formattedEndDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }
            let formattedStartTime = this.startTimeOnly
            let formattedEndTime = this.endTimeOnly

            const data = {
                organization_id: lastParam,
                post_visiblity: this.eventData.post_visiblity,
                title: this.eventData.title,
                location: this.eventData.location,
                detail: this.quill4.getText(),
                start_date_and_time: formattedStartDate + ' ' + formattedStartTime,
                end_date_and_time: formattedEndDate + ' ' + formattedEndTime,
                state_id: this.selectedState,
                city_id: this.selectedCity,
                content_language_id: 1,
                created_by_id: userId,
            }
            const response = await sansthaDetailService.updateEventSanstha(this.event_id, data);
            if (response.status == 200 || response.status == 201 || response.status == 202) {
                if (this.media.length > 0 ) {
                    const formData = new FormData();
                    formData.append('model_id', response.data.id);
                    this.media.forEach(file => {
                        formData.append('file[]', file);
                    });
                    formData.append('type', 'mobile_api');
                    const response1 = await sansthaDetailService.addEventMedia(formData)
                    if (response1.status === 200 || 201 || 202) {
                        this.$forceUpdate();
                        $('#editEvents').modal('hide');
                        this.$toast.success("Event updated successfully");
                        const updatedEventIndex = this.eventSanstha.findIndex(event => event.id === this.event_id);
                        if (updatedEventIndex !== -1) {
                            this.$set(this.eventSanstha[updatedEventIndex], 'title', response.data.title);
                            this.$set(this.eventSanstha[updatedEventIndex], 'detail', response.data.detail);
                            this.$set(this.eventSanstha[updatedEventIndex], 'banner', [{ original_url: response1.original_url }]);
                        }
                    } else {
                        this.$toast.error('Please set proper address!');
                    }
                } else {
                    $('#editEvents').modal('hide');
                    this.$toast.success("Event updated successfully");
                    const updatedEventIndex = this.eventSanstha.findIndex(event => event.id === this.event_id);
                    if (updatedEventIndex !== -1) {
                        this.$set(this.eventSanstha[updatedEventIndex], 'title', response.data.title);
                        this.$set(this.eventSanstha[updatedEventIndex], 'detail', response.data.detail);
                    }
                }
            } else {
                this.$toast.error("Something went wrong");
            }
        },
        async deleteEventSanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const response = await sansthaDetailService.deleteEventSanstha(this.event_del_id);
            if (response.status == 200 || response.status == 201 || response.status == 204) {
                this.$toast.success("Event deleted successfully");
                const index = this.eventSanstha.findIndex(event => event.id === this.event_del_id);
                if (index !== -1) {
                    this.eventSanstha.splice(index, 1);
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
        cancelImg() {
            this.selectedImageURL1 = ''
            this.selectedImageURL = ''
        },
        getImageUrl(res) {
            if (res.get_user_likes == null) {
                return '/images/ic_unfavorite_24px.svg';
            } else if (res.get_user_likes.is_like === 1) {
                return '/images/ic_favorite_24px.svg';
            } else {
                return '/images/ic_unfavorite_24px.svg';
            }
        },
        getSaveImageUrl(res) {
            if (res.get_user_save_posts == null) {
                return '/images/ic_add_box_24px.svg';
            } else if (res.get_user_save_posts.is_save === 1) {
                return '/images/ic_add_fav_box_24px.svg';
            } else {
                return '/images/ic_add_box_24px.svg';
            }
        },
        async getEventsBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllEventSanstha(this.event_page, data);
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, async (key, value) => {
                        this.event_id = value.id;
                        const data = {
                            event_id: this.event_id,
                            news_id: '',
                            appeal_id: '',
                            video_id: ''
                        }
                        const response = await afterLoginHomeService.viewEventNews({ ...data })
                        if (response.status === 200 || 201) {
                        } else {
                            console.error("Something went wrong")
                        }
                    });

                    this.eventSanstha.push(...response.data);
                    this.event_page = this.event_page + 1;
                    $state.loaded();
                } else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async manageLike(res, resType, resId, is_like, like_count, index) {
            const newIsLike = is_like === 1 ? 0 : 1;
            const newLikeCount = newIsLike === 1 ? like_count + 1 : like_count - 1;
            this.$set(res, 'img', this.getImageUrl(res));
            const updatedItem = {
                ...this.eventSanstha[index],
                get_user_likes: { is_like: newIsLike },
                total_like: newLikeCount,
            };
            this.$set(this.eventSanstha, index, updatedItem);
            // Call the common function
            await handleLike(newIsLike, resType, resId);
        },
        async manageSave(res, resType, resId, is_save, index) {
            const newIsSave = is_save === 1 ? 0 : 1;
            this.$set(res, 'img', this.getSaveImageUrl(res));
            const updatedItem = {
                ...this.eventSanstha[index],
                get_user_save_posts: { is_save: newIsSave },
            };
            this.$set(this.eventSanstha, index, updatedItem)
            // Call the common function
            await handleSave(newIsSave, resType, resId);
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
            this.quill3.setText('');
            this.eventPost_visiblity = "";
            this.startDate = "";
            this.startTime = "";
            this.endDate = "";
            this.endTime = "";
            this.selectedImageURL7 = '';
            this.eventLocation = '';
            this.selectedState = '';
            this.selectedCity = '';
        },
    },
};
</script>
