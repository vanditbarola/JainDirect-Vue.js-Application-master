<template>
    <section class="bg_image bg_image_log mt-4 pt-5 pb-5 mb-5" style="background-image: url(images/Group\ 20998.png);">
        <div class="container">
            <div class="card section_topic_card text-center pb-3 mb-5">
                <label class="section_sub_header mt-5">Select your favorite Topic</label>
                <div class="row px-5 g-3 mt-4 justify-content-center">
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4" v-for='(res,index) in results' :key="index+res.title">
                        <div class="radio_card">
                            <input type="radio" name="radio_btn" :id="'card'+index" class="radio_card_1" :name="`${res.title}`" v-model="info" :value="`${res.id}`">
                            <label :for="'card'+index" class="radio_card_label radio_card2">
                                <div v-for="(side, side_index) in res.topic_type_banner" :key="side_index">
                                    <img :src="`${ side.original_url }`" alt="" class="section_topic_img">
                                </div>
                                <span class="section_topic_img_label text-center">{{ res.title }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <p style="color: red;">{{ this.msg }}</p>
                <button type="button" class="btn section_topic_btn mt-3" v-on:click="postSaveTopicType()">SAVE & CONTINUE</button>
                <br><label class="section_topic_label mt-4">You can always change the above settings <br> from the
                    "Preference" menu in the Left navigation</label>
            </div>
        </div>
    </section>
</template>

<script>
import topicTypeService from "../../services/topictype.service"
export default {
    name: "App",
    data() {
        return {
            info: '',results: [],msg:'',
        };
    },
    methods: {
        async getTopicType() {
            const {data} = await topicTypeService.getTopicType()
            this.results = data;
        },
        async postSaveTopicType() {
            if(this.info == ''){
                this.msg = "Please select your topic type";
            }else{
                this.msg = '';
                const data = { topic_type_id: this.info};
                const response = await topicTypeService.createTopicType({...data})
                if(response.status === 200 || 201){
                    window.location.href = 'select-sanstha-category';
                }else{
                    console.error("Something went wrong!");
                }
            }
        },
    },
    beforeMount() {
        this.getTopicType();
    },
};
</script>
