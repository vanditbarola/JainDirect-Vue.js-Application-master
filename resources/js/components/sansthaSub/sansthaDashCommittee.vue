<template>
    <div x-data="app()" x-cloak>
        <div class="card dashboard_commitee_member mt-2 px-3">
            <div class="dashboard_commitee_member1 mt-2">
                <label class="dashboard_about_card_title">Committee Member</label>
                <a @click="navigateToCommittee" class="view_all_dashboard" id="committeeLink">View All</a>
            </div>
            <div v-for="(res, index) in committeeSanstha.slice(0,3)"
                :class="['dashboard_comitte_peoples', 'd-flex', 'p-2', index === 2 ? '' : 'dot']">
                <img :src="`${res.banner ? res.banner[0] ? res.banner[0].original_url : '/images/ad_board3.png' : '/images/ad_board3.png'}`"
                    class="dashboard_commitee_member_photo" alt="...">
                <div class="dashboard_commitee_member_right">
                    <label class="dashboard_commitee_member_name">{{ res.full_name ? res.full_name : 'Member' }}</label>
                    <br><label class="dashboard_commitee_member_designation">{{ res.designation ? res.designation :
                    '-' }}</label>
                    <div class="committe_social_media p-1">
                        <div class="dashboard_email_btn">
                            <a :href="'mailto:' + res.email">
                                <span class="mail_logo_icon">
                                    <img src="/images/ic_mail_outline_24px.png" class="mail_logo_icon1" alt="...">
                                </span>
                                <span class="mail_logo_icon_btn">Email</span>
                            </a>
                        </div>
                        <div class="dashboard_wtsapp_btn mt-1 ms-sm-2 ms-md-2 ms-lg-2 ms-xl-5 ms-xs-1">
                            <a :href="'https://wa.me/' + res.contact_number_1">
                                <span class="WhatsApp_logo_icon">
                                    <img src="/images/Logo-WhatsApp@2x.png" class="WhatsApp_logo_icon1" alt="...">
                                </span>
                                <span class="WhatsApp_logo_icon_btn">WhatsApp</span>
                            </a>
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
            selectItemFilter: '', get_sanstha: '', committeeSanstha: [], total_count: '', message: ''
        };
    },
    mounted() {
        document.addEventListener("DOMContentLoaded", function () {
            document.getElementById('committeeLink').addEventListener('click', function (event) {
                event.preventDefault();
                navigateToCommittee();
            });
        });
    },
    methods : {
        navigateToCommittee() {
            document.getElementById('nav-dashboard-committee-tab').click();
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
                    console.error("Something went wrong")
                }
            } else {
                console.error("Something went wrong")
            }
        },
    },
    beforeMount() {
        this.getCommitteeMember();
    }
};
</script>
