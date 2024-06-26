<template>
    <div x-data="app()" x-cloak>
        <section class="section_dashboard_membership mt-3 px-3">
            <label class="dashboard_membership_title mt-md-2 mt-lg-4 mt-xl-4 mt-xxl-4 mt-sm-2 mt-xs-2 mt-2">Membership
                Management</label>
            <!-- <div class=" g-4 mt-lg-4 mt-xl-4 mt-xxl-4 mt-md-2 mt-4  membership_mangement">
                <button class="dashboard_membership_btn">Disable Membership</button>
                <button class="dashboard_membership_btn">Edit/View Form</button>
                <button class="dashboard_membership_btn">Add Member</button>
            </div> -->
        </section>
        <section class="section_dashboard_membership1 mt-3">
            <br>
            <div class="section_dashboard_membership2">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="dashboard-membership-members-tab" data-bs-toggle="tab"
                            data-bs-target="#dashboard-membership-members" type="button" role="tab"
                            aria-controls="dashboard-membership-members" aria-selected="true">Members ({{ sansthaMember.length }})</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="dashboard-membership-new-requests-tab" data-bs-toggle="tab"
                            data-bs-target="#dashboard-membership-new-requests" type="button" role="tab"
                            aria-controls="dashboard-membership-new-requests" aria-selected="false">New Requests ({{ newMember.length }})</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="dashboard-membership-disapprove-tab" data-bs-toggle="tab"
                            data-bs-target="#dashboard-membership-disapprove" type="button" role="tab"
                            aria-controls="dashboard-membership-disapprove" aria-selected="false">Disapprove ({{ rejectMember.length }})</button>
                    </li>
                </ul>
            </div>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="dashboard-membership-members" role="tabpanel"
                    aria-labelledby="dashboard-membership-members-tab">
                    <!-- <form class="mt-3 mx-4">
                        <input type="search" class="search_dashboard_membership form-control"
                            placeholder="Search member by Name/City/Pincode">
                        <button type="submit" class="search_dashboard_membership_btn">
                            <img src="/images/ic_search_24px.svg" alt="..."></button>
                    </form> -->
                    <div class="table_div mt-3">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" class="table_head">Member #</th>
                                    <th scope="col" class="table_head">Name & Photo</th>
                                    <th scope="col" class="table_head">State</th>
                                    <th scope="col" class="table_head">City</th>
                                    <th scope="col" class="table_head">Status </th>
                                    <th scope="col" class="table_head">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="sansthaMember">
                              
                                <tr class="col1_table" v-for="(res, index) in sansthaMember" :key="index">
                                    <td class="table_details" style="cursor: pointer;">{{ res.id }}</td>
                                    <td style="cursor: pointer;">
                                        <div class="d-flex">
                                            <img :src="`${res.profile ? res.profile[0] ? res.profile[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                class="table_img" alt="...">
                                            <label class="table_img_name mt-2 pt-1 ms-2">{{ res.name }}</label>
                                        </div>
                                    </td>
                                  
                                    <td class="table_details" style="cursor: pointer;">{{ res.state }}</td>
                                    <td class="table_details" style="cursor: pointer;">{{ res.city }}</td>
                                    <td class="table_details" style="cursor: pointer;"><span
                                            class="status_btn_member"></span>Active</td>
                                    <td class="table_details membership_table">
                                        <div class="table_dropdown table_dropdown_table">
                                            <b-dropdown text="" class="sanstha_dashboard_more_tab_cards" no-caret>
                                                <!-- <b-dropdown-item>
                                                    <li><a class="dropdown-item">
                                                            <img src="/images/table_contact.svg" class="table_icon"
                                                                alt="...">Contact</a>
                                                    </li>
                                                </b-dropdown-item> -->

                                                    <li>
                                                        <a class="dropdown-item"  :href="'https://wa.me/' + res.mobile"  target="_blank" >
                                                            <img src="/images/table_WhatsApp.png" class="table_icon2"
                                                                alt="...">WhatsApp</a>
                                                    </li>
                                                    <li><a class="dropdown-item" :href="'mailto:' + res.email"  target="_blank">
                                                            <img src="/images/table_email.png" class="table_icon"
                                                                alt="...">Email</a>
                                                    </li>                                               
                                                    <li><a class="dropdown-item" type="button" data-bs-toggle="modal"
                                                            data-bs-target="#editModal">
                                                            <img src="/images/table_update.png" class="table_icon"
                                                                alt="...">Update</a>
                                                    </li>                                               
                                                    <li><a class="dropdown-item" type="button" data-bs-toggle="modal"
                                                            data-bs-target="#deleteModal">
                                                            <img src="/images/delete_dark.svg" class="table_icon"
                                                                alt="...">Delete</a>
                                                   </li>                                             
                                            </b-dropdown>
                                        </div>
                                        <div class="modal" id="editModal">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <img src="/images/modal_cancel.svg"
                                                        class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                                                        aria-label="Close" alt="...">
                                                    <div class="modal-body">
                                                        <label class="discard1 mt-3">Are you sure you want to
                                                            edit?</label>
                                                        <div class="d-flex justify-content-center mt-4 mb-4">
                                                            <button type="submit" class="popup_cancel"
                                                                data-bs-dismiss="modal">CANCEL</button>
                                                            <button type="submit" class="popup_post ms-5"
                                                                data-bs-dismiss="modal">Edit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal" id="deleteModal">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <img src="/images/modal_cancel.svg"
                                                        class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                                                        aria-label="Close" alt="...">
                                                    <div class="modal-body">
                                                        <label class="discard1 mt-3">Are you sure you want to
                                                            delete?</label>
                                                        <div class="d-flex justify-content-center mt-4 mb-4 ">
                                                            <button type="submit" class="popup_cancel"
                                                                data-bs-dismiss="modal">CANCEL</button>
                                                            <button type="submit" class="popup_post ms-5"
                                                                data-bs-dismiss="modal">DELETE</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>{{ this.message }}</tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade" id="dashboard-membership-new-requests" role="tabpanel"
                    aria-labelledby="dashboard-membership-new-requests-tab">
                    <!-- <form class="mt-3 mx-4">
                        <input type="search" class="search_dashboard_membership form-control"
                            placeholder="Search member by Name/City/Pincode">
                        <button type="submit" class="search_dashboard_membership_btn">
                            <img src="/images/ic_search_24px.svg" alt="..."> </button>
                    </form> -->
                    <div class="table_div mt-3">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" class="table_head">Member #</th>
                                    <th scope="col" class="table_head">Name & Photo</th>
                                    <th scope="col" class="table_head">State</th>
                                    <th scope="col" class="table_head">City</th>
                                    <th scope="col" class="table_head">Status </th>
                                    <th scope="col" class="table_head">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="newMember != ''">
                                <tr class="col1_table" v-for="(res, index) in newMember" :key="index">
                                    <td class="table_details" style="cursor: pointer;">{{ res.id }}</td>
                                    <td style="cursor: pointer;">
                                        <div class="d-flex">
                                            <img :src="`${res.profile ? res.profile[0] ? res.profile[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                class="table_img" alt="...">
                                            <label class="table_img_name mt-2 pt-1 ms-2">{{ res.name }}</label>
                                        </div>
                                    </td>
                                    <td class="table_details" style="cursor: pointer;">{{ res.state }}</td>
                                    <td class="table_details" style="cursor: pointer;">{{ res.city }}</td>
                                    <td class="table_details" style="cursor: pointer;"><span
                                            class="status_btn_new"></span>Active</td>
                                    <td class="table_details membership_table">
                                        <div class="table_dropdown table_dropdown_table">
                                            <b-dropdown text="" class="sanstha_dashboard_more_tab_cards" no-caret>
                                                <b-dropdown-item>
                                                    <a class="dropdown-item" type="button" data-bs-toggle="modal"
                                                        data-bs-target="#aproveModal">
                                                        <span class="approve_span"></span>Approve</a>
                                                </b-dropdown-item>
                                                <b-dropdown-item>
                                                    <a class="dropdown-item" type="button" data-bs-toggle="modal"
                                                        data-bs-target="#dissaproveModal">
                                                        <span class="dissapprove_span"></span> Disapprove</a>

                                                </b-dropdown-item>
                                            </b-dropdown>
                                        </div>
                                        <!--modal aprove-->
                                        <div class="modal fade" id="aproveModal" tabindex="-1"
                                            aria-labelledby="aproveModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <img src="/images/modal_cancel.svg"
                                                        class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                                                        aria-label="Close" alt="...">
                                                    <div class="modal-body mt-3">
                                                        <!-- <label class="discard">Approve !</label> -->
                                                        <label class="discard1 mt-3 ">Are you sure you want to approve
                                                            this member for the sanstha </label>

                                                        <div class="d-flex justify-content-center mt-3 mb-4 ">
                                                            <button type="submit" class="popup_cancel"
                                                                data-bs-dismiss="modal">NO</button>
                                                            <button type="submit" class="popup_post ms-5">YES</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!--modal dissaprove-->
                                        <div class="modal fade" id="dissaproveModal" tabindex="-1"
                                            aria-labelledby="dissaproveModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <img src="/images/modal_cancel.svg"
                                                        class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                                                        aria-label="Close" alt="...">
                                                    <div class="modal-body mt-3">
                                                        <label for="reasonfordissaprrove"
                                                            class="lable_disapprove mb-2">reason for dissapprove</label>
                                                        <input type="text" class="form-control diss_input"
                                                            placeholder="Enter the message" id="reasonfordissaprrove">

                                                        <div class="d-flex justify-content-center mt-2 mb-4 ">
                                                            <button type="submit" class="popup_cancel"
                                                                data-bs-dismiss="modal">CANCEL</button>
                                                            <button type="submit"
                                                                class="popup_post ms-5">SUBMIT</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="6" class="text-center">
                                        <label>{{ this.message }}</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane fade" id="dashboard-membership-disapprove" role="tabpanel"
                    aria-labelledby="dashboard-membership-disapprove-tab">
                    <!-- <form class="mt-3 mx-4">
                        <input type="search" class="search_dashboard_membership form-control"
                            placeholder="Search member by Name/City/Pincode">
                        <button type="submit" class="search_dashboard_membership_btn">
                            <img src="/images/ic_search_24px.svg" alt="..."></button>
                    </form> -->
                    <div class="table_div mt-3">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" class="table_head">Member #</th>
                                    <th scope="col" class="table_head">Name & Photo</th>
                                    <th scope="col" class="table_head">State</th>
                                    <th scope="col" class="table_head">City</th>
                                    <th scope="col" class="table_head">Status </th>
                                    <th scope="col" class="table_head">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="rejectMember != ''">
                                <tr class="col1_table" v-for="(res, index) in rejectMember" :key="index">
                                    <td class="table_details" style="cursor: pointer;">{{ res.id }}</td>
                                    <td style="cursor: pointer;">
                                        <div class="d-flex">
                                            <img :src="`${res.profile ? res.profile[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'}`"
                                                class="table_img" alt="...">
                                            <label class="table_img_name mt-2 pt-1 ms-2">{{ res.name }}</label>
                                        </div>
                                    </td>
                                    <td class="table_details" style="cursor: pointer;">{{ res.state }}</td>
                                    <td class="table_details" style="cursor: pointer;">{{ res.city }}</td>
                                    <td class="table_details" style="cursor: pointer;"><span
                                            class="status_btn_dissapproved"></span>Disapproved</td>
                                    <td class="table_details membership_table">
                                        <div class="table_dropdown table_dropdown_table">
                                            <b-dropdown text="" class="sanstha_dashboard_more_tab_cards" no-caret>
                                                <!-- <b-dropdown-item>
                                                    <li><a class="dropdown-item">
                                                            <img src="/images/table_contact.svg" class="table_icon"
                                                                alt="...">Contact</a>
                                                    </li>
                                                </b-dropdown-item> -->
                                                <li>
                                                        <a class="dropdown-item"  :href="'https://wa.me/' + res.mobile"  target="_blank" >
                                                            <img src="/images/table_WhatsApp.png" class="table_icon2"
                                                                alt="...">WhatsApp</a>
                                                    </li>
                                                    <li><a class="dropdown-item" :href="'mailto:' + res.email"  target="_blank">
                                                            <img src="/images/table_email.png" class="table_icon"
                                                                alt="...">Email</a>
                                                    </li>                                               
                                                    <li><a class="dropdown-item" type="button" data-bs-toggle="modal"
                                                            data-bs-target="#editModal">
                                                            <img src="/images/table_update.png" class="table_icon"
                                                                alt="...">Update</a>
                                                    </li>                                               
                                                    <li><a class="dropdown-item" type="button" data-bs-toggle="modal"
                                                            data-bs-target="#deleteModal">
                                                            <img src="/images/delete_dark.svg" class="table_icon"
                                                                alt="...">Delete</a>
                                                   </li>           
                                            </b-dropdown>
                                        </div>
                                        <div class="modal" id="editModalDissaproved">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <button type="button" class="btn_close btn_close_edit"
                                                        data-bs-dismiss="modal" aria-label="Close">
                                                        <i class="bi bi-x-lg"></i></button>

                                                    <label class="discard1 mt-3">Are you sure you want to edits?</label>
                                                    <div class="d-flex justify-content-center mt-4 mb-4 ">
                                                        <button type="submit" class="popup_cancel"
                                                            data-bs-dismiss="modal">CANCEL</button>
                                                        <button type="submit" class="popup_post ms-5"
                                                            data-bs-dismiss="modal">Edit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal" id="deleteModalDissaproved">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <button type="button" class="btn_close btn_close_edit"
                                                        data-bs-dismiss="modal" aria-label="Close">
                                                        <i class="bi bi-x-lg"></i></button>

                                                    <label class="discard1 mt-3">Are you sure you want to delete this
                                                        post?</label>
                                                    <div class="d-flex justify-content-center mt-4 mb-4">
                                                        <button type="submit" class="popup_cancel"
                                                            data-bs-dismiss="modal">CANCEL</button>
                                                        <button type="submit" class="popup_post ms-5"
                                                            data-bs-dismiss="modal">DELETE</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="6" class="text-center">
                                        <label>{{ this.message }}</label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
            selectItemFilter: '', get_sanstha: '', sansthaMember: [], total_count: '', message: '', rejectMember: [], newMember: [],
        };
    },
    methods: {
        async getsansthaActiveMembers() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam,
                    type: "sanstha",
                    status: 1,
                }
            }
            const response = await sansthaDetailService.getActiveSansthaMember({ ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.sansthaMember.push(value);
                    });
                } else {
                    this.message = "No data found";
                    console.error("Something went wrong")
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getsansthaNewMembers() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam,
                    type: "sanstha",
                    status: 3,
                }
            }
            const response = await sansthaDetailService.getNewSansthaMember({ ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.newMember.push(value);
                    });
                } else {
                    this.message = "No data found";
                    console.error("Something went wrong")
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async getsansthaRejectMembers() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam,
                    type: "sanstha",
                    status: 2,
                }
            }
            const response = await sansthaDetailService.getRejectSansthaMember({ ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.rejectMember.push(value);
                    });
                } else {
                    this.message = "No data found";
                    console.error("Something went wrong")
                }
            } else {
                console.error("Something went wrong")
            }
        },
    },
    beforeMount() {
        this.getsansthaActiveMembers();
        this.getsansthaNewMembers();
        this.getsansthaRejectMembers();
    }
};
</script>
