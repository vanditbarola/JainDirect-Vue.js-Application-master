<template>
    <div x-data="app()" x-cloak>
        <section class="section_dashboard_committe mt-3">
            <div class="dashboard_committe_div">
                <label class="dashboard_committe_title">Committee</label>
                <button type="button" class="dashboard_committe_btn"
                    data-bs-toggle="modal"
                    data-bs-target="#AddCommittemmberModal">Add</button>
            </div>
            <sansthaDashMoreCommiteeAdd @status-update="handleStatusUpdate"></sansthaDashMoreCommiteeAdd>

            <div class="table_div">
                <table class="table dashboard_committe_table">
                    <thead>
                        <tr class="dashboard_committe_table_header">
                            <th>Name</th>
                            <th>Designation</th>  
                            <th>Contact Number</th>
                            <th>Email address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="dashboard_committe_table_tr" v-for="(res, index) in paginatedCommittee" :key="index">
                            <td>
                                <div class="d-flex">
                                    <img :src="getImageSource(index, res.banner)" class="dashboard_committe_table_img" alt="Add photo">
                                    <label class="dashboard_committe_table_details1">{{ res.full_name ? res.full_name : "Member" }}</label>
                                </div>
                            </td>
                            <td class="dashboard_committe_table_details">{{ res.designation ? res.designation : "-" }}</td>
                            <td class="dashboard_committe_table_details2">{{ res.contact_number_1 ? res.contact_number_1 : "-" }}</td>
                            <td class="dashboard_committe_table_details">{{ res.email ? res.email : "-" }}</td>
                            <td class="table_details">
                                <div class="table_dropdown table_dropdown_table">
                                    <b-dropdown text="" class="sanstha_dashboard_more_tab_cards" no-caret>
                                        <b-dropdown-item type="button" data-bs-toggle="modal"
                                                    data-bs-target="#editModalCommitte" @click="editCommitee(res.id)">
                                            <li><a class="dropdown-item" >
                                                <img src="/images/table_update.png" class="table_icon" alt="...">Update</a>
                                            </li>
                                        </b-dropdown-item>
                                        <b-dropdown-item type="button" data-bs-toggle="modal"
                                        data-bs-target="#deleteModalCommitte" @click="delteCommitee(res.id, index)">
                                            <li><a class="dropdown-item" >
                                                <img src="/images/delete_dark.svg" class="table_icon" alt="...">Delete</a>
                                            </li>
                                        </b-dropdown-item>
                                    </b-dropdown>
                                </div>
                                <div class="modal" id="editModalCommitte">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal"
                                                data-bs-dismiss="modal" aria-label="Close" alt="...">
                                            <div class="modal-body">
                                                <label class="discard1 mt-3">Are you sure you want to edit?</label>
                                                <div class="d-flex justify-content-center mt-4 mb-4 ">
                                                    <button type="submit" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                                    <button type="submit" class="popup_post ms-5" data-bs-toggle="modal"
                                                        data-bs-target="#aditCommittemmberModal" @click="editCommiteeMember(index)">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal" id="deleteModalCommitte">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal"
                                                data-bs-dismiss="modal" aria-label="Close" alt="...">
                                            <div class="modal-body">
                                                <label class="discard1 mt-3">Are you sure you want to delete?</label>
                                                <div class="d-flex justify-content-center mt-4 mb-4 ">
                                                    <button type="submit" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                                    <button type="submit" class="popup_post ms-5" data-bs-dismiss="modal"
                                                        @click="deleteCommiteeMember()">DELETE</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal" tabindex="-1" id="aditCommittemmberModal" aria-labelledby="aditCommittemmberModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                                    <div class="modal-dialog ">
                                        <div class="modal-content create_comitte_modal">
                                            <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal"
                                                data-bs-dismiss="modal" aria-label="Close" alt="...">
                                            <label class="create_member_title text-center">Edit Committee Member</label>
                                            <div class="create_member_popup_profile_photo mt-4">
                                                <div class="background_profile_pic"></div>
                                                <label for="file-input1" class="create_comitte_upload_photo">
                                                    <img class="create_member_camera1"
                                                        :src="selectedImageURL1 ? selectedImageURL1 : commiteeData && commiteeData.banner && commiteeData.banner[0] ?
                                                        commiteeData.banner[0].original_url : '/images/add_photo_dark.svg'" alt="...">
                                                    <br><span class="create_member_camera_label">Upload Photo</span>
                                                </label>
                                                <input type="file" id="file-input1" name="filename" ref="fileInput"
                                                    @change="changeFile(index)" hidden>
                                            </div>

                                            <form class="px-4 mx-4 mt-3 mb-5">
                                                <div class="row">
                                                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                                        <label for="create_comitte_member_name"
                                                            class="create_comitte_member_label">Name</label>
                                                        <input type="text" class="form-control mt-2 create_comitte_member_input"
                                                            id="create_comitte_member_name" placeholder="Enter name"
                                                            v-model="commiteeData.full_name">
                                                    </div>
                                                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                                        <label for="create_comitte_member_designation"
                                                            class="create_comitte_member_label">Designation</label>
                                                        <input type="text" class="form-control mt-2 create_comitte_member_input"
                                                            id="create_comitte_member_designation" placeholder="Enter designation"
                                                            v-model="commiteeData.designation">
                                                    </div>
                                                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                                        <label for="create_comitte_member_contact"
                                                            class="create_comitte_member_label">Contact</label>
                                                        <input type="tel" class="form-control mt-2 create_comitte_member_input"
                                                            id="create_comitte_member_contact" placeholder="Enter mobile number"
                                                            v-model="commiteeData.contact_number_1">
                                                    </div>
                                                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4">
                                                        <label for="create_comitte_member_wtsappNum"
                                                            class="create_comitte_member_label">WhatsApp
                                                            Number</label>
                                                        <input type="tel" class="form-control mt-2 mb-1 create_comitte_member_input"
                                                            id="create_comitte_member_wtsappNum" placeholder="Enter mobile number"
                                                            v-model="commiteeData.contact_number_2">
                                                        <input class="form-check-input create_comitte_member_checkbox  "
                                                            type="checkbox" value="" id="flexCheckDefault" v-model="checkSame">
                                                        <label class="form-check-label create_comitte_member_checkbox_label"
                                                            for="flexCheckDefault">
                                                            Same as Contact Number</label>
                                                    </div>
                                                    <div
                                                        class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mt-4 mt-md-2 mt-lg-2 mt-xl-2 mt-xxl-2">
                                                        <label for="create_comitte_member_email"
                                                            class="create_comitte_member_label">Email
                                                            Address</label>
                                                        <input type="email" class="form-control mt-2 create_comitte_member_input"
                                                            id="create_comitte_member_email" placeholder="Enter id"
                                                            v-model="commiteeData.email">
                                                    </div>
                                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                                                        <button type="button" class="create_comitte_member_btn"
                                                            data-bs-dismiss="modal">cancel</button>
                                                        <button type="button" class="ms-4 create_comitte_member_btn"
                                                            data-bs-dismiss="modal"
                                                            @click.prevent="updateCommittee()">submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <nav aria-label="Page navigation example" class="me-2 mt-2">
                    <ul class="pagination justify-content-end">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" @click.prevent="prevPage()">Previous</a>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: page === currentPage }">
                        <a class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" @click.prevent="nextPage()">Next</a>
                        </li>
                    </ul>
                </nav>
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
            currentPage: 1,itemsPerPage: 5,selectedImageURL1: '',idmodel : '', selectedImageIndex:1,total_count: '',
            commiteeData: [], commiteeEditId: '', commiteeId: '', indexNo: '', selectItemFilter: '',committeeSanstha: [], 
            name: '', email: '',designation: '',contact: '',wpContact: '',checkSame: false,
        };
    },
    computed: {
        paginatedCommittee() {
           const startIndex = (this.currentPage - 1) * this.itemsPerPage;
           const endIndex = startIndex + this.itemsPerPage;
           return this.committeeSanstha;
        },
        totalPages() {
           return Math.ceil(this.total_count / this.itemsPerPage); 
        },
    },
    methods: {
        getImageSource(index, banner) {
            if (this.selectedImageURL1 && this.selectedImageIndex === index) {
                return this.selectedImageURL1;
            }
            else if (banner && banner.length > 0 && banner[0].original_url) {
                return banner[0].original_url;
            }
            else {
                return '/images/ad_board2.png';
            }
        },
        async handleStatusUpdate(status) {
            await this.getCommitteeMember()
        },
        updateFilter(filterText) {
            this.selectItemFilter = filterText;
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.getCommitteeMember(); 
            }
        },
        changePage(page) {
            if (this.currentPage !== page) {
                this.currentPage = page;
                this.getCommitteeMember(); // Fetch committee members for the new page
            }
        },
        async getCommitteeMember() {
            this.committeeSanstha = [];
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam,
                    page: this.currentPage,
                    limit: this.itemsPerPage,
                    type: "web"
                }
            }
            const response = await sansthaDetailService.getCommitteeMember({ ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.committeeSanstha.push(value);
                    });
                    this.total_count = response.count;
                } else {
                    console.error("Something went wrong")
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async delteCommitee(resId, index) {
           this.commiteeId = resId,
           this.indexNo = index;
        },
        async deleteCommiteeMember() {
            const response = await sansthaDetailService.deleteCommittee(this.commiteeId);
            if (response.status === 200 || 201) {
               this.committeeSanstha.splice(this.indexNo, 1);
               this.$toast.success('Your data is deleted successfully!')
            } else {
               console.error("Something went wrong")
            }
        },
        editCommitee(resId) {
            this.commiteeEditId = resId
        },
        async editCommiteeMember(index) {
            const response = await sansthaDetailService.editCommittee(this.commiteeEditId);
            if (response.status === 200 || 201) {
                this.commiteeData = response.data
            } else {
                console.error("Something went wrong")
            }
        },
        async updateCommittee() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            localStorage.setItem('lastParam', lastParam);
            let userId = localStorage.getItem("userId");
            const data = {
                organization_id: lastParam,
                full_name: this.commiteeData.full_name,
                designation: this.commiteeData.designation,
                contact_number_1: this.commiteeData.contact,
                contact_number_2: this.commiteeData.wpContact,
                email: this.commiteeData.email,
                created_by_id: userId,
                is_primary: false
            }
            const response = await sansthaDetailService.updateCommittee(this.commiteeEditId, data);
            if (response.status === 200 || response.status === 201 || response.status === 202) {
                this.idmodel = response.data.id

                const updatedIndex = this.committeeSanstha.findIndex(item => item.id === this.commiteeEditId);
                if (updatedIndex !== -1) {
                    this.committeeSanstha.splice(updatedIndex, 1, this.commiteeData);
                    // Check if a new image is selected
                    if (this.$refs.fileInput[0].files[0]) {
                        const formData = new FormData();
                        formData.append('model_id', this.idmodel);
                        formData.append('type', "mobile_api");
                        formData.append('file', this.$refs.fileInput[0].files[0]);
                        const response1 = await sansthaDetailService.addImgSanstha(formData)
                        if (response1.status === 200 || response1.status === 201 || response1.status === 202) {
                            this.selectedImageURL1 = '';
                            if (!this.committeeSanstha[updatedIndex].banner || this.committeeSanstha[updatedIndex].banner.length === 0) {
                                this.$set(this.committeeSanstha[updatedIndex], 'banner', []);
                            }
                            if (this.committeeSanstha[updatedIndex].banner.length > 0) {
                                this.$set(this.committeeSanstha[updatedIndex].banner[0], 'original_url', response1.original_url);
                            } else {
                                this.committeeSanstha[updatedIndex].banner.push({ original_url: response1.original_url });
                            }
                        } else {
                            this.$forceUpdate();
                        }
                    }
                }
                this.$toast.success('Your data is updated successfully!')
            } else {
                console.error("Something went wrong");
            }
        },
        changeFile(index) {
           const fileInput = this.$refs.fileInput;
           if (fileInput[0].files && fileInput[0].files[0]) {
               const allowedExtensions = ["jpg", "jpeg", "png"];
               const fileName = fileInput[0].files[0].name;
               const fileExtension = fileName.split(".").pop().toLowerCase();
               if (allowedExtensions.includes(fileExtension)) {
                   this.selectedImageURL1 = URL.createObjectURL(fileInput[0].files[0]);
                   this.selectedImageIndex = this.indexNo;
               } else {
                   console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                   fileInput.value = "";
               }
           }
        }
    },
    beforeMount() {
        this.getCommitteeMember();
    }
};
</script>