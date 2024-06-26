<template>
    <div>
        <section class="section_dashboard_committe mt-3 ">
            <div class="dashboard_committe_div mx-3">
                <label class="dashboard_committe_title mt-1 px-3">Custom Page</label>
                <button class="custom_page_btn" type="button" data-bs-toggle="modal" data-bs-target="#AddCustomPage">Add Custom Page</button>
            </div>
            <div class="modal" tabindex="-1" id="AddCustomPage" aria-labelledby="AddCustomPageLabel"
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
                                            <label for="cpImg" class="file_upload_modal">
                                                <img :src="selectedCpImage ? selectedCpImage : '/images/add_photo_dark.svg'"
                                                    class="file_img_edit" alt="...">
                                                <input type="file" id="cpImg" class="file_img_edit" alt="..." hidden
                                                    accept="images/*" @change="handleCpChange4" ref="cpImg">
                                                <br><label class="file_upload_modal_title"> Upload Photos & Videos</label>
                                            </label>
                                        </form>
                                    </div>
                                    <div id="filewrapper">
                                        <label class="uploaded_photos_title mx-3">Uploaded Photos</label>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col px-4 ">
                                    <form>
                                        <div class="row custom_row ">
                                            <div class="col col-12 col-xs-12 col-sm-12  col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                                                <label class="head_event_descr ">Title<span class="required mx-1">*</span></label>
                                                <input type="text" class=" form-control mt-1 start_date_input" placeholder="Title" v-model="cpTitle">
                                            </div>
                                            <div class="col col-12  col-xs-12 col-sm-12  col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                                                <label class="head_event_descr ">Icon <span class="required mx-1">*</span></label>
                                                <b-dropdown id="dropdown_icon_custom" text="Select Icon" class="custome_page_btn mt-1" v-model="selectItemIcon">
                                                    <template v-slot:button-content>
                                                        <label class="custom_dropdown_label">
                                                            <img v-if="selectItemIcon && selectItemIcon !== 'Select Icon'"
                                                                :src="getImagePath(selectItemIcon)" class="custom_img"
                                                                alt="Selected Icon" /> {{ selectItemIcon ? selectItemIcon : 'Select Icon' }}
                                                        </label>
                                                    </template>
                                                    <b-dropdown-item @click="updateIcon('Image', '/images/custompage_img.svg')">
                                                        <label class="custom_dropdown_label"> 
                                                            <img src="/images/custompage_img.svg" class="custom_img" alt="...">image
                                                        </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Star', '/images/custompage_star.svg')">
                                                        <label class="custom_dropdown_label"> 
                                                            <img src="/images/custompage_star.svg" class="custom_img" alt="...">star
                                                        </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Music', '/images/custompage_music.svg')">
                                                        <label class="custom_dropdown_label"> 
                                                            <img src="/images/custompage_music.svg" class="custom_img" alt="...">music
                                                        </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Heart', '/images/custompage_heart.svg')">
                                                        <label class="custom_dropdown_label"> <img
                                                                src="/images/custompage_heart.svg" class="custom_img" alt="...">heart
                                                        </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Face Smile', '/images/custompage_smile.svg')">
                                                        <label class="custom_dropdown_label"> <img
                                                                src="/images/custompage_smile.svg" class="custom_img" alt="...">face Smile </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Calender Days', '/images/custompage_date.svg')">
                                                        <label class="custom_dropdown_label"> <img
                                                                src="/images/custompage_date.svg" class="custom_img" alt="...">Clender Days </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Bell', '/images/custompage_notiication.svg')">
                                                        <label class="custom_dropdown_label"> <img
                                                                src="/images/custompage_notiication.svg" class="custom_img" alt="...">bell </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Bolt', '/images/custompage_bolt.svg')">
                                                        <label class="custom_dropdown_label"> <img
                                                                src="/images/custompage_bolt.svg" class="custom_img" alt="...">bolt
                                                        </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Gift', '/images/custompage_gift.svg')">
                                                        <label class="custom_dropdown_label"> <img
                                                                src="/images/custompage_gift.svg" class="custom_img" alt="...">gift
                                                        </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Pen', '/images/custompage_edit.svg')">
                                                        <label class="custom_dropdown_label"> <img
                                                                src="/images/custompage_edit.svg" class="custom_img" alt="...">pen
                                                        </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Tag', '/images/custompage_tag.svg')">
                                                        <label class="custom_dropdown_label"> <img
                                                                src="/images/custompage_tag.svg" class="custom_img" alt="...">tag
                                                        </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Book', '/images/custompage_book.svg')">
                                                        <label class="custom_dropdown_label"> 
                                                            <img src="/images/custompage_book.svg" class="custom_img" alt="...">book
                                                        </label>
                                                    </b-dropdown-item>
                                                    <b-dropdown-item @click="updateIcon('Bookmark', '/images/custompage_bookmark.svg')">
                                                        <label class="custom_dropdown_label"> 
                                                            <img src="/images/custompage_bookmark.svg" class="custom_img" alt="...">bookmark </label>
                                                    </b-dropdown-item>
                                                </b-dropdown>
                                            </div>
                                            <div class="col col-12 mt-2 col-xs-12 col-sm-12  col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                                                <label class="head_event_descr">Page Content <span class="required mx-1">*</span> </label>
                                                <div id="editorCustomPage" ref="editorCustomPage"></div>
                                            </div>
                                        </div>
                                        <div class="col-12 mb-5 mt-4 popup_footer">
                                            <button type="button" class="popup_cancel" data-bs-dismiss="modal" @click="clearField()">CANCEL</button>
                                            <button type="button" class="popup_post" @click="addcustomPageSanstha()">SUBMIT</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="row">
            <div class="col col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 mt-4" v-for='(res, index) in cpSanstha'>
                <div class="custom_col">
                    <div class="more_option_in_cards  Custom_dropdown">
                        <b-dropdown text="" class="sanstha_dashboard_more_tab_cards" no-caret>
                            <b-dropdown-item>
                                <li><a class="dropdown-item" type="button" data-bs-toggle="modal"
                                        data-bs-target="#editCustomPage" @click="getEditId(res.id); getParticularCp()">
                                        <img src="/images/edit.svg" class="card_option_edit" alt="...">
                                        Edit</a></li>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <li><a class="dropdown-item" type="button" data-bs-target="#deleteCustom"
                                        data-bs-toggle="modal" @click="getDelId(res.id)"><img src="/images/delete.svg"
                                            class="card_option_edit" alt="...">Delete</a></li>
                            </b-dropdown-item>
                        </b-dropdown>

                        <div class="modal" id="deleteCustom" tabindex="-1" aria-labelledby="deleteCustom"
                            aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                            <div class="modal-dialog">
                                <div class="modal-content pb-5">
                                    <img src="/images/modal_cancel.svg" class="cancel_btn_CreatePost2Modal"
                                        data-bs-dismiss="modal" aria-label="Close" alt="...">
                                    <label class="discard1 mt-3">Are you sure you want to delete?</label>
                                    <div class="d-flex justify-content-center mt-4">
                                        <button type="submit" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                        <button type="submit" class="popup_post ms-5" data-bs-dismiss="modal"
                                            @click="deleteCustomPageSanstha()">DELETE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <img :src="getBannerImageUrl(res.banner) ? getBannerImageUrl(res.banner) : '/images/jd_card_logo.png' "
                        alt="..." class="dynamic_custompage">
                    <span class="custompAGE_title">{{ res.title }}</span>
                </div>
            </div>
        </div>

        <infinite-loading @distance="1" @infinite="getCustomPageBasedSanstha"></infinite-loading>

        <div class="modal" tabindex="-1" id="editCustomPage" aria-labelledby="editCustomPageLabel"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <img src="/images/modal_cancel.svg" class="cancel_createmmbr_btn_modal" data-bs-dismiss="modal"
                        aria-label="Close" alt="...">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_left_col">
                                <div class="card image_upload_card mx-3 my-3">
                                    <form>
                                        <label for="cpChangeImg" class="file_upload_modal">
                                            <img :src="selectedCpChangeImage ? selectedCpChangeImage : getBannerImageUrl(cp_parti.banner)"
                                                class="file_img_edit" alt="...">
                                            <input type="file" id="cpChangeImg" class="file_img_edit" alt="..." hidden
                                                accept="images/*" ref="cpChangeImg" @change="handleCpChangeImg">
                                            <br><label class="file_upload_modal_title"> Upload Photos & Videos</label>
                                        </label>
                                    </form>
                                </div>
                                <div id="filewrapper">
                                    <label class="uploaded_photos_title mx-3">Uploaded Photos</label>
                                </div>
                            </div>
                            <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 col-sm-6 col-xs-6 modal_right_col px-4 ">
                                <form>
                                    <div class="row custom_row ">
                                        <div class="col col-12 col-xs-12 col-sm-12  col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                                            <div class="mx-1 mt-3" style=" display: flex;">
                                                <img src="/images/1d5ebecd-0ce3-4a2e-b546-7b6cd6bd5bc9 - Copy.png"
                                                    class="img_modal" alt="...">
                                                <label class="img_modal_title">csjdhd jahdja</label>
                                            </div>
                                            <label class="head_event_descr mt-4 ">Title<span class="required mx-1">*</span></label>
                                            <input type="text" class=" form-control mt-1 start_date_input" placeholder="Title" v-model="cp_parti.title">
                                        </div>
                                        <div class="col col-12  col-xs-12 col-sm-12  col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                                            <label class="head_event_descr ">Icon <span class="required mx-1">*</span></label>
                                            <b-dropdown id="dropdown_icon_custom" text="Select Icon" class="custome_page_btn mt-1" v-model="selectItemIcon">
                                                <template v-slot:button-content>
                                                    <label class="custom_dropdown_label">
                                                        <img v-if="selectItemIcon && selectItemIcon !== 'Select Icon'"
                                                            :src="getImagePath(selectItemIcon)" class="custom_img"
                                                            alt="Selected Icon" /> {{ selectItemIcon ? selectItemIcon : 'Select Icon' }}
                                                    </label>
                                                </template>
                                                <b-dropdown-item @click="updateIcon('Image', '/images/custompage_img.svg')">
                                                    <label class="custom_dropdown_label"> 
                                                        <img src="/images/custompage_img.svg" class="custom_img" alt="...">image
                                                    </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Star', '/images/custompage_star.svg')">
                                                    <label class="custom_dropdown_label"> 
                                                        <img src="/images/custompage_star.svg" class="custom_img" alt="...">star
                                                    </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Music', '/images/custompage_music.svg')">
                                                    <label class="custom_dropdown_label"> <img
                                                            src="/images/custompage_music.svg" class="custom_img"
                                                            alt="...">music</label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Heart', '/images/custompage_heart.svg')">
                                                    <label class="custom_dropdown_label"> <img
                                                            src="/images/custompage_heart.svg" class="custom_img"
                                                            alt="...">heart</label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Face Smile', '/images/custompage_smile.svg')">
                                                    <label class="custom_dropdown_label"> <img
                                                            src="/images/custompage_smile.svg" class="custom_img"
                                                            alt="...">face Smile </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Calender Days', '/images/custompage_date.svg')">
                                                    <label class="custom_dropdown_label"> <img
                                                            src="/images/custompage_date.svg" class="custom_img"
                                                            alt="...">Clender Days </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Bell', '/images/custompage_notiication.svg')">
                                                    <label class="custom_dropdown_label"> <img
                                                            src="/images/custompage_notiication.svg" class="custom_img"
                                                            alt="...">bell </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Bolt', '/images/custompage_bolt.svg')">
                                                    <label class="custom_dropdown_label"> 
                                                        <img src="/images/custompage_bolt.svg" class="custom_img" alt="...">bolt
                                                    </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Gift', '/images/custompage_gift.svg')">
                                                    <label class="custom_dropdown_label"> 
                                                        <img src="/images/custompage_gift.svg" class="custom_img" alt="...">gift
                                                    </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Pen', '/images/custompage_edit.svg')">
                                                    <label class="custom_dropdown_label"> 
                                                        <img src="/images/custompage_edit.svg" class="custom_img" alt="...">pen
                                                    </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Tag', '/images/custompage_tag.svg')">
                                                    <label class="custom_dropdown_label"> 
                                                        <img src="/images/custompage_tag.svg" class="custom_img" alt="...">tag
                                                    </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Book', '/images/custompage_book.svg')">
                                                    <label class="custom_dropdown_label"> 
                                                        <img src="/images/custompage_book.svg" class="custom_img" alt="...">book
                                                    </label>
                                                </b-dropdown-item>
                                                <b-dropdown-item @click="updateIcon('Bookmark', '/images/custompage_bookmark.svg')">
                                                    <label class="custom_dropdown_label"> 
                                                        <img src="/images/custompage_bookmark.svg" class="custom_img" alt="...">bookmark
                                                    </label>
                                                </b-dropdown-item>
                                            </b-dropdown>
                                        </div>
                                        <div class="col col-12 mt-2 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-4">
                                            <label class="head_event_descr">Page Content <span class="required mx-1">*</span>
                                            </label>
                                            <div id="editorCustomPageEdit" ref="editorCustomPageEdit"></div>
                                        </div>
                                    </div>
                                    <div class="col-12 mb-5 mt-4 popup_footer">
                                        <button type="button" class="popup_cancel" data-bs-dismiss="modal">CANCEL</button>
                                        <button type="button" class="popup_post" @click="updateAppealSanstha()">SUBMIT</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.core.css';
import sansthaDetailService from '../../../services/sansthaDetail.service';

export default {
    name: "App",
    data() {
        return {
            cp_del_id: '', selectedCpChangeImage: '', selectedCpImage: '', selectedIconName: '', cpTitle: '', selectedImageURL4: '', 
            selectItemIcon: null, cp_page: 1, cp_id: '', cp_del_id: '', selectItemFilter: '', get_sanstha: '', cpSanstha: [],cp_parti: [],
        };
    },
    beforeMount() {
        this.activate();
    },
    mounted() {
        this.quill1 = new Quill(this.$refs.editorCustomPage, {
            modules: {
                toolbar: [
                    [{ 'font': [] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['blockquote', 'code-block'],
                    ["image", "link", "video"]
                ]
            },
            placeholder: 'Enter Page Content',
            theme: 'snow'
        });

        this.quill2 = new Quill(this.$refs.editorCustomPageEdit, {
            modules: {
                toolbar: [
                    [{ 'font': [] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'align': [] }],
                    ['blockquote', 'code-block'],
                    ["image", "link", "video"]
                ]
            },
            placeholder: 'Enter Page Content',
            theme: 'snow'
        });
    },
    created() {
        if (this.cpSanstha.length === 0) {
            this.getCustomPageBasedSanstha();
        }
    },
    methods: {
        getEditId(resId) {
            this.cp_id = resId
        },
        getDelId(resId) {
            this.cp_del_id = resId
        },
        updateIcon(iconText, iconImage) {
            this.selectItemIcon = iconText;
            this.selectedIconName = iconText;
        },
        handleCpChange4() {
            const cpImg = this.$refs.cpImg;
            if (cpImg.files && cpImg.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = cpImg.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedCpImage = URL.createObjectURL(cpImg.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    cpImg.value = "";
                }
            }
        },
        handleCpChangeImg() {
            const cpChangeImg = this.$refs.cpChangeImg;
            if (cpChangeImg.files && cpChangeImg.files[0]) {
                const allowedExtensions = ["jpg", "jpeg", "png"];
                const fileName = cpChangeImg.files[0].name;
                const fileExtension = fileName.split(".").pop().toLowerCase();

                if (allowedExtensions.includes(fileExtension)) {
                    this.selectedCpChangeImage = URL.createObjectURL(cpChangeImg.files[0]);
                } else {
                    console.error("Invalid file extension. Please choose a JPG, JPEG, or PNG file.");
                    cpChangeImg.value = "";
                }
            }
        },
        async deleteCustomPageSanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const response = await sansthaDetailService.deleteCpSanstha(this.cp_del_id);
            if (response.status == 204) {
                this.$toast.success("Appeal deleted successfully");
                const index = this.cpSanstha.findIndex(cp => cp.id === this.cp_del_id);
                if (index !== -1) {
                    this.cpSanstha.splice(index, 1);
                }
            } else {
                console.error("Something went wrong");
                this.$toast.error("Something went wrong");
            }
        },
        getImagePath(iconText) {
            const imagePathMap = {
                'Image': '/images/custompage_img.svg',
                'Star': '/images/custompage_star.svg',
                'Music': '/images/custompage_music.svg',
                'Heart': '/images/custompage_heart.svg',
                'Face Smile': '/images/custompage_smile.svg',
                'Calender Days': '/images/custompage_date.svg',
                'Bell': '/images/custompage_notiication.svg',
                'Bolt': '/images/custompage_bolt.svg',
                'Gift': '/images/custompage_gift.svg',
                'Pen': '/images/custompage_edit.svg',
                'Tag': '/images/custompage_tag.svg',
                'Book': '/images/custompage_book.svg',
                'Bookmark': '/images/custompage_bookmark.svg'
            };
            return imagePathMap[iconText] || '';
        },
        async getCustomPageBasedSanstha($state) {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getAllCustomPageSanstha(this.cp_page, { ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    if (this.cp_page === 1) {
                        this.cpSanstha = response.data;
                    } else {
                        this.cpSanstha = [...this.cpSanstha, ...response.data];
                    }
                    $state.loaded();
                    this.cp_page = this.cp_page + 1;
                }
                else {
                    $state.complete();
                }
            } else {
                console.error("Something went wrong")
            }
        },
        async addcustomPageSanstha() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            this.titleErr = '';
            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;
            if (!this.cpTitle) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.cpTitle)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.cpTitle)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (this.titleErr) {
                return;
            }
            const data = {
                organization_id: lastParam,
                icon: this.selectedIconName,
                title: this.cpTitle,
                page_content: this.quill1.getText(),
                is_active: 1,
                content_language_id: 1,
            };
            try {
                const response = await sansthaDetailService.addCpSanstha({ ...data });
                if (response.status == 200 || response.status == 201) {
                    if (this.$refs.cpImg.files[0]) {
                        const formData = new FormData();
                        formData.append('model_id', response.data.id);
                        formData.append('file', this.$refs.cpImg.files[0]);
                        const response1 = await sansthaDetailService.addCpMedia(formData)
                        if (response1.status === 200 || 201 || 202) {
                            this.$forceUpdate();
                            const updatedAlbum = response.data;
                            updatedAlbum.banner = [response1];
                            this.cpSanstha.unshift(updatedAlbum);
                            $('#AddCustomPage').modal('hide');
                            this.$toast.success("Custome page added successfully");
                            this.clearField();
                        } else {
                            this.$toast.error('Please set proper address!');
                        }
                    } else {
                        $('#AddCustomPage').modal('hide');
                        this.$toast.success("Custome page added successfully");
                        this.cpSanstha.unshift(response.data);
                        this.clearField();
                        response.data = '';
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        async updateAppealSanstha() {
            const userId = localStorage.getItem("userId");
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];

            this.titleErr = '';
            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/;
            if (!this.cp_parti.title) {
                this.titleErr = 'Title is required';
            } else if (!spaceRegex.test(this.cp_parti.title)) {
                this.titleErr = 'Title should not start with a space';
            } else if (!namePattern.test(this.cp_parti.title)) {
                this.titleErr = 'Please do not use any numbers or special characters ';
            }
            if (this.titleErr) {
                return;
            }
            try {
                const data = {
                    organization_id: lastParam,
                    icon: this.selectedIconName,
                    title: this.cp_parti.title,
                    page_content: this.quill2.getText(),
                    is_active: 1,
                    content_language_id: 1,
                };
                const response = await sansthaDetailService.updateCpSanstha(this.cp_id, data);
                if (response.status == 200 || response.status == 201 || response.status == 202) {
                    if (this.$refs.cpChangeImg.files[0]) {
                        const formData = new FormData();
                        formData.append('model_id', this.cp_id);
                        formData.append('file', this.$refs.cpChangeImg.files[0]);
                        const response1 = await sansthaDetailService.addCpMedia(formData);
                        if (response1.status === 200 || 201 || 202) {
                            this.$forceUpdate();
                            const updatedCpIndex = this.cpSanstha.findIndex(cp => cp.id === this.cp_id);
                            if (updatedCpIndex !== -1) {
                                this.$set(this.cpSanstha[updatedCpIndex], 'title', response.data.title);
                                this.$set(this.cpSanstha[updatedCpIndex], 'banner', [{ original_url: response1.original_url }]);
                            }
                            $('#editCustomPage').modal('hide');
                            this.$toast.success("Custom page updated successfully");
                        } else {
                            this.$toast.error('Please set proper address!');
                        }
                    } else {
                        $('#editCustomPage').modal('hide');
                        this.$toast.success("Custom page updated successfully");
                        const updatedCpIndex = this.cpSanstha.findIndex(cp => cp.id === this.cp_id);
                        if (updatedCpIndex !== -1) {
                            this.$set(this.cpSanstha[updatedCpIndex], 'title', response.data.title);
                        }
                    }
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error("Something went wrong", error);
            }
        },
        getBannerImageUrl(banner) {
            if (banner && banner.length > 0) {
                const lastIndex = banner.length - 1;
                return banner[lastIndex].original_url;
            }
            return '/images/add_photo_dark.svg';
        },
        async getParticularCp() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    type: "web"
                }
            }
            const response = await sansthaDetailService.getParticularCp(this.cp_id, data);
            if (response.status == 200 || response.status == 201) {
                this.cp_parti = response.data;
                this.selectItemIcon = response.data.icon
                if (this.cp_parti?.page_content && this.cp_parti?.page_content?.ops) {
                    this.quill2.setContents(this.cp_parti?.page_content);
                } else {
                    this.quill2.setText(this.cp_parti?.page_content);
                }
                this.org_title = response.data?.organization?.title;
                this.org_logo = response.data.organization?.logo[0]?.original_url;
                this.frm_img = response.data?.banner[0]?.original_url;
            } else {
                console.error("Something went wrong");
            }
        },
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
        clearField() {
            this.titleErr = "";
            this.cpTitle = "";
            this.quill1.setText('');
            this.selectedCpImage = "";
            this.selectedIconName = "";
            this.selectItemIcon = null;
        },
    },
}
</script>