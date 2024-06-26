<template>
    <div x-data="app()" x-cloak>
        <!-- <div > -->
            <label class="section_header p-1 m-1">Committee</label>
            <!-- <div class="mt-3 mb-5" > -->
                <div class="row g-3 mt-1">
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-sm-12"
                        v-for='(res, index) in committeeSanstha'>
                        <div class="card">
                            <div class="row row-cols-2 g-2">
                                <div class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-xl-4 col-lg-4 p-2">
                                    <img :src="res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/ad_board2.png' : '/images/ad_board2.png'"
                                        class="committee_member_photo_2" alt="...">
                                </div>
                                <div class="col-md-7 col-lg-8 col-sm-7 col-xs-7  col-xl-8 col-xxl-8 mt-3 p-2 ">
                                    <label class="commitee_member_name">{{ res.full_name ? res.full_name :
                            "Member" }}</label>
                                    <br><label class="commitee_member_designation">Manager</label>
                                    <div class="row g-1 mx-1">
                                        <div
                                            class="col-md-6 col-lg-6 col-sm-6 col-xs-6 col-lg-6 col-xl-6 col-sm-12 col-xxs-12">
                                            <a :href="'mailto:' + res.email"><img src="/images/Group21837.png"
                                                    class="email_sasntha_org_2" alt="..."></a>
                                        </div>
                                        <div
                                            class="col-md-6 col-lg-6 col-sm-6 col-xs-6 col-lg-6 col-xl-6 col-sm-12 col-xxs-12 ">
                                            <a :href="'https://wa.me/' + res.contact_number_1 " target="_blank"><img
                                                    src="/images/Group21839-1.png" class="wtsapp_sasntha_org_2"
                                                    alt="..."></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- </div> -->
        <!-- </div> -->
    </div>
</template>
<script>
import sansthaDetailService from '../../../services/sansthaDetail.service';
export default {
    name: "App",
    data() {
        return {
            get_sanstha: '', total_count: '', committeeSanstha: [], message: ''
        };
    },
    beforeMount() {
        this.getCommitteeMember();
    },
    methods: {
        async getCommitteeMember() {
            const url = window.location.href;
            const lastParam = url.split("/").slice(-1)[0];
            const data = {
                params: {
                    organisation_id: lastParam
                }
            }
            const response = await sansthaDetailService.getCommitteeMember({ ...data });
            if (response.status === 200 || 201) {
                if (response.data.length > 0) {
                    $.each(response.data, (key, value) => {
                        this.committeeSanstha.push(value);
                    });
                } else {
                    console.error("Something went wrong")
                }
            } else {
                console.error("Something went wrong")
            }
        },
    }
};
</script>