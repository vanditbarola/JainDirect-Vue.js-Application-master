<template>
    <div x-data="app()" x-cloak>
        <div class="card border-0  p-2 m-1 text-danger" v-if="message.length > 0">
        </div>
        <div class="card border-0" v-else>
            <div class="card pt-0 border-0 px-1" style="box-shadow: 0px 3px 6px #00000029;">
                <div class="latest_news p-2 m-1 mt-2">
                    <label class="section_sub_header">Committee Member</label>
                    <label class="indi_btn"><a id="viewCommitteBtn" class="indi_btn" @click="goToCommitteeTab">View
                            all</a></label>
                </div>
                <div class="post_committee  m-2" v-for='(res, index) in committeeSanstha.slice(0,2)'>

                    <div>
                        <img :src="res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/ad_board2.png' : '/images/ad_board2.png'"
                            class="committee_member_photo" alt="...">
                    </div>
                    <div>
                        <label class="commitee_member_name">{{ res.full_name ? res.full_name : "Member" }}</label>
                        <br><label class="commitee_member_designation">{{ res.designation ? res.designation :
            "-" }}</label>
                        <div class="row row-cols-2 mt-1 px-1">
                            <div class="col-md-6  col-sm-6 col-xs-6 col-lg-12  col-xl-6 col-xxl-6 col">
                             <a :href="'mailto:' + res.email"><img src="/images/Group21837.png" class="email_sasntha_org" alt="..."></a>
                            </div>
                            <div class="col-md-6  col-sm-6 col-xs-6 col-lg-12  col-xl-6 col-xxl-6 col">
                                <a :href="'https://wa.me/' + res.contact_number_1 " target="_blank"><img src="/images/Group21839-1.png" class="wtsapp_sasntha_org"
                                        alt="..."></a>
                            </div>
                        </div>
                    </div>
                </div>
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
            get_sanstha: '', committeeSanstha: [], news_page: 1, message: ''
        };
    },
    beforeMount() {
        this.getCommitteeMember();
    },
    methods: {
        goToCommitteeTab() {
            const CommiteeTab = document.getElementById('sanstacommitee-tab');
            if (CommiteeTab) {
                CommiteeTab.click();
            }
        },
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
                    this.message = "No News found !";
                    console.error("Something went wrong")
                }
            } else {
                console.error("Something went wrong")
            }
        },
    }
};
</script>