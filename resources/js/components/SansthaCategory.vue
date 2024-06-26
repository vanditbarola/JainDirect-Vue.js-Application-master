<template>
    <section class="bg_image bg_image_log mt-4 pt-5 pb-5" style="background-image: url(images/Group\ 20998.png);">
        <div class="container">
            <div class="card category_selection_card text-center p-2">
                <label class="section_sub_header mt-3">Select Categories</label>
                <label class="section_body text-center mt-3">Please select a minimum 3 categories</label>
                <div class="row g-3 mt-3 px-5 justify-content-center category_card_row">
                    <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4" v-for='(res, index) in results' :key="index + res.title">
                        <div class="check_box_card" @click="toggleCheckbox(res.id)">
                            <input type="checkbox" name="check_box" class="form-check-input" :value="res.id" v-model="info">
                            <label class="check_box_card_label check_box_card1">
                                <div v-for="(side, side_index) in res.banner" :key="side_index">
                                    <img :src="`${side.original_url}`" alt="" class="check_box_img mt-4">
                                </div>
                                <br><span class="check_box_label mt-2">{{ res.title }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <p style="color: red;">{{ this.msg ? this.msg : this.cnt_msg }}</p>
                <button type="button" id="saveButton" class="section_topic_btn mt-3" v-on:click="postSaveCategory()">SAVE & CONTINUE</button>
            </div>
        </div>
    </section>
</template>
<script>
import sansthaCatgeoryService from "../../services/sansthacategory.service"
export default {
    name: "App",
    data() {
        return {
            info: [], results: [], msg: '', cnt_msg: '',
        };
    },
    methods: {
        toggleCheckbox(id) {
            const index = this.info.indexOf(id);
            if (index === -1) {
                this.info.push(id);
            } else {
                this.info.splice(index, 1);
            }
        },
        async getSansthaCategory() {
            const { data } = await sansthaCatgeoryService.getSansthaCategory()
            this.results = data;
        },
        async postSaveCategory() {
            if (this.info == '') {
                this.msg = "Please select categories";
                this.cnt_msg = '';
            } else {
                if (this.info != '' && this.info.length <= 2) {
                    this.msg = '';
                    this.cnt_msg = "Please select atleast 3 categories";
                } else {
                    this.msg = '';
                    const data = { organisation_froms_id: this.info };
                    const response = await sansthaCatgeoryService.createSansthacategory({ ...data })
                    if (response.status === 200 || 201) {
                        localStorage.setItem('userId', response.data.user_id)
                        window.location.href = 'sharvak-dashboard';
                    } else {
                        console.error("Something went wrong!");
                    }
                }
            }
        },
    },
    beforeMount() {
        this.getSansthaCategory();
    },
};
</script>
