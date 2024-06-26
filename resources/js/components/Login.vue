<template>
    <section class="bg_image mt-4 pt-5 pb-5" style="background-image: url(images/Group\ 20998.png);">
        <div class="container">
            <div class="card mt-3 p-3 text-center log">
                <form class="mt-3">
                   <label class="log_head">"If you are located outside of India, kindly log in by using your email id.</label>
                    <div class="dash m-2 p-1"></div>
                    <label class="log1 p-2">Enter your Mobile Number or Email Id to receive 4 digit Security Code</label>
                    <label for="login_number" class="login_textbox_label p-2">Login with mobile number</label>
                    <input type="tel" @input="toggleFields" v-if="getMobile == '91' || ''" v-model="mobile_number" :disabled="isMobileEntered" class="form-control log_email_text" id="login_number" placeholder="Enter your 10-digit mobile number." pattern="^[0-9]{10}$">
                    <input type="tel" @input="toggleFields" v-else  v-model="getlocalMno" :disabled="isMobileEntered" class="form-control log_email_text" id="login_number" placeholder="Enter your 10-digit mobile number." pattern="^[0-9]{10}$">
                    <p style="color: red;">{{ this.mobileErr }}</p>

                    
                    <label class="login_opt m-2 p-1">or</label><br/>

                    <label for="login_email" class="login_textbox_label p-2">Login with Email Id</label>
                    <input type="email" @input="toggleFields" v-if="getlocalEmail == ''" v-model="email" :disabled="isEmailEntered" class="form-control log_email_text" id="login_email" placeholder="Enter your email address">
                    <input type="email" @input="toggleFields" v-else v-model="getlocalEmail" :disabled="isEmailEntered" class="form-control log_email_text" id="login_email" placeholder="Enter your email address">
                    <p style="color: red;">{{ this.emailErr }}</p>

                    <input type="checkbox" v-model="chk_terms" class="login_checkbox form-check-input mt-4" id="exampleCheck1">
                    <label class="form-check-label atc_check mt-4" for="exampleCheck1"><a href="terms-condition" class="atc_check">Agree to Terms & Conditions</a></label>
                    <p style="color: red;">{{ this.chk_msg }}</p>
                    <br><button type="button" class="btn form-control mt-4 log_button" v-on:click="postSendOtp()">GET SECURITY CODE</button>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
import loginService from "../../services/login.service";
export default {
    name: "App",
    data() {
        return { mobileErr:'', emailErr:'',
            isEmailEntered:false,isMobileEntered:false,mobile_number: '',email: '',msg:'',chk_terms:'',chk_msg:'',
            getMobile: localStorage.getItem('storeMobile') ? localStorage.getItem('storeMobile') : '',
            getlocalEmail: localStorage.getItem('storeEmail') ? localStorage.getItem('storeEmail') : '',
            getlocalMno: localStorage.getItem('storeMobile') ? localStorage.getItem('storeMobile').startsWith("91") ? localStorage.getItem('storeMobile').substring(2) : '' : '',
        };
    },
    methods: {
        toggleFields() {
            this.chk_msg = '';
            if (this.mobile_number !== '' || this.getlocalMno !== '') {
                this.isEmailEntered = true;
                this.getlocalEmail  = '';
                this.email = '';
            } else if (this.email !== '' || this.getlocalEmail != '') {
                this.isMobileEntered = true;
                this.mobile_number   = '';
                this.getlocalMno = '';
            } else {
                this.isEmailEntered  = false;
                this.isMobileEntered = false;
            }
        },
       
        async postSendOtp() {
            if (!(this.mobile_number || this.getlocalMno || this.email || this.getlocalEmail)) {
                this.$toast.error('Please enter either mobile number or email');
                return;
            } else {
                this.mobileErr = '';
                this.emailErr = '';
    
                if (this.chk_terms == '') {
                    this.msg = '';
                    this.chk_msg = "Please agree to terms & conditions";
                } else {
                    if (this.mobile_number || this.email || this.getlocalMno || this.getlocalEmail) {
                        let mobileNUmber = '';
                        if (this.mobile_number) {
                            mobileNUmber = '91' + this.mobile_number;
                        } else if (this.getlocalMno) {
                            mobileNUmber = '91' + this.getlocalMno;
                        }
    
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        const spaceRegex = /^\S.*$/;
    
                        if (mobileNUmber) {
                            if (!spaceRegex.test(mobileNUmber)) {
                                this.mobileErr = 'Mobile number should not start with a space';
                            } else if (!/^[0-9]+$/.test(mobileNUmber)) {
                                this.mobileErr = 'Mobile number should be only digits';
                            } else if (mobileNUmber.length !== 12) {
                                this.mobileErr = "Mobile number should be 10 digits";
                            }
                        }
                        if(this.email){
                            if (!emailPattern.test(this.email)) {
                                this.emailErr = 'Please enter a valid email address';
                            } else if (!spaceRegex.test(this.email)) {
                                this.emailErr = 'Email should not start with a space';
                            }
                        }
                        if (this.mobileErr || this.emailErr) {
                            return;
                        }
                        const data = {
                            type: mobileNUmber ? 'mobile' : '',
                            mobile_number: mobileNUmber,
                            email: this.email ? this.email : this.getlocalEmail
                        };
                        const response = await loginService.login({...data})
                        if(response.status === 200 || 201){
                            localStorage.setItem('storeMobile', mobileNUmber)
                            localStorage.setItem('storeEmail', this.email ? this.email : this.getlocalEmail )
                            window.location.href = 'login-otp';
                        } else {
                            console.error("Something went wrong")
                        }
                    } else {
                        this.chk_msg = '';
                        this.msg = "Please enter a valid mobile number";
                    }
                    
                }
            }
            
        }

    },
    beforeMount(){
        if(this.getlocalEmail !== '' || this.getMobile == '91'){
            this.isMobileEntered = true;
        }else if(this.getMobile !== '' ){
            this.isEmailEntered = true;
        }else{
            this.isEmailEntered  = false;
            this.isMobileEntered = false;
        }
    },
    mounted(){
        const storeMo = localStorage.getItem("storeMobile");
        const storeEmail = localStorage.getItem("storeEmail");
        if (storeMo && !storeEmail) {
            this.$toast.success('Remove your mobile number and enter an email address to login with your email Id.');
        } else if (storeEmail || storeMo === '91') {
            this.$toast.success('Remove your email address and enter mobile number to login with your mobile number.');
        } else {
            // If no key has a value, do nothing or display a default message
        }
    }
};
</script>
