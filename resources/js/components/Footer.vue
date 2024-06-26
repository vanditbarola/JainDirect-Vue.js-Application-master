<template>
    <div x-data="app()" x-cloak>
        <section class="p-2" style="background-color: #FFD2AA;">
            <div class="container">
                <p class="whatsp">For assistance in registration & general inquiries Call/ WhatsApp on
                    <a class="wtsapp_call"><b class="whatsb p-2">+91-8851529627</b></a>
                </p>
            </div>
        </section>

        <section class="p-3" style="background-color: #2E2E2E;">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 col-lg-2 col-xl-2 col-xxl-2 col-sm-12 col-xs-12">
                        <img class="footer_image img-fluid" src="images/log_new.png" alt="">
                    </div>
                    <div class="col-md-4 col-lg-5 col-xl-5 col-xxl-5 col-sm-5 col-xs-5 footer_dot">
                        <p class="footer_desc">Provide a world class latest technology enabled platform for Jain organizations and
                        bring them under one roof. Everything to do with Jainism is under one roof and available to everyone.
                        Provide everything at no cost.</p>
                    </div>
                    <div class="col-md-4 col-lg-5 col-xl-5 col-xxl-5 col-sm-5 col-xs-5">
                        <p class="footer_desc1">Subscribe to our Newsletter to get latest updates on causes & donations.</p>
                        <form class="row g-3">
                            <div class="col-md-12 col-sm-12 col-xs-12 col-lg-6 col-xl-6 col-xxl-6">
                                <input type="email" class="form-control footer_input" v-model="email" id="inputEmail4" placeholder="Email id...">
                            </div>
                            <div class="col-md-12 col-sm-12 col-xs-12 col-lg-6 col-xl-6 col-xxl-6">
                                <button class="footer_btn  p-2" @click.prevent="postEmailSubScribe" type="submit">Subscribe</button>
                            </div>
                        </form>
                        <div style="color: #F8F8F8;">{{ this.successmessage }}</div>
                    </div>
                </div>
                <div class="dot m-2" style="border-color:#F8F8F8;"></div>
                <div class="row">
                    <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-12 col-xs-12 col-xs-4">
                        <div class="social">
                            <div class="">
                                <p class="followus">Follow Us on:</p>
                            </div>
                            <div class="">
                                <a href="https://www.facebook.com/jaindirect.org" target="_blank"><img class="facebook" src="images/facebook_new.png" alt="visit facebook page"></a>
                                <a href="https://www.instagram.com/jaindirectorg" target="_blank"><img class="insta" src="images/instagram_new.png" alt="visit instagram page"> </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-12 col-xs-12">
                        <p class="mail text-center">Write to us:<a class="link" href="mailto:info@jaindirect.org">info@jaindirect.org</a>
                    </p>
                    </div>
                    <div class="col-md-4 col-lg-4 col-xl-4 col-xxl-4 col-sm-12 col-xs-12 last">
                        <p style="color: #FFA427;">JainDirect.org <span class="rights">All right Reserved</span></p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import emailSubScribeService from "../../services/emailsubscribe.service"
export default {
    name: "App",
    data() {
        return {
            email:'',successmessage: ''
        };
    },
    methods: {
        async postEmailSubScribe(){
            if(this.email != ""){
                const data = { email: this.email};
                const response = await emailSubScribeService.createEmailSubScribe({...data})
                .then(function( response ){
                    this.successmessage = response.message
                    this.email='';
                }.bind(this));
            }
        },
    }
}
</script>
