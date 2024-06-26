<template>
    <section class="bg_image mt-4 pt-5 pb-5" style="background-image: url(images/Group\ 20998.png);">
        <div class="container">
            <div class="card mt-3 p-3 text-center log">
                <form class="mt-3" @submit.prevent="postVerifyOtp()">
                    <label class="log2 p-2 mt-5">We sent a verification code to below number</label>
                    <label class="entered_number mt-4">{{ getMobile == '91' || getMobile == '' ?  getEmail : mno}}
                        <a href="home-login"><img src="images/ic_edit_24px.png" class="edit_img_login" alt="..."></a>
                    </label><br/>
                    <label for="otp" class="login_otp_label mt-5 p-2">Enter security code</label>
                    <input type="password"  v-model="otp" class="form-control log_num" id="otp" placeholder="0000" pattern="[0-9]{4}" @keyup.enter="postVerifyOtp">
                    <p style="color: red;">{{ this.msg ? this.msg : this.otp_msg }}</p>
                    <label class="otp_resend mt-5">Did not receive code?<a class="resend_link mx-2" v-on:click="postResendOtp()">Resend</a></label>
                   <br><button type="submit" class="btn form-control mt-4 log_button" > VERIFY CODE</button>
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
    return {
        mobile_number: '',type: 'mobile',email: '', otp: '',msg:'',otp_msg:'',
        getMobile: localStorage.getItem('storeMobile'), getEmail: localStorage.getItem('storeEmail'),
        mno: localStorage.getItem('storeMobile').startsWith("91") ? localStorage.getItem('storeMobile').substring(2) : '',
    };
  },
  methods: {
    async postResendOtp(){
        const data = {
            type: this.getMobile ? 'mobile' : '',
            mobile_number: parseInt(this.getMobile),
            email: this.getEmail,
        };
        const response = await loginService.loginResendOtp({...data})
        if(response.status === 200 || 201){
            this.otp_msg = "Otp sent successfully";
            this.$toast.success('Otp sent successfully !');
            // if(response.data.message == 'SUCCESS'){
            //     localStorage.setItem('storeToken', response.data.token)
            //     window.location.href = 'select-topic-type';
            // }
        }else {
            console.error("Something went wrong")
        }
    },
    async postVerifyOtp() {
        if(this.otp == ''){
            this.msg = "Please enter otp";
        }else{
            this.msg = '';
            if(this.getMobile == '91'){
                this.passNumber = '';
            }else{
                this.passNumber = '91' + this.mno;
            }
            const data = {
                type: this.getMobile ? this.type : '',
                mobile_number: this.passNumber,
                otp: this.otp,
                email: this.email ? this.email : this.getEmail
            };
            const response = await loginService.loginVerifyOtp({...data})
            if(response.status === 200 || 201){
                this.otp_msg = response.message;
                if(this.otp_msg.length > 0){
                    this.otp = ''
                }
                if(response.message == 'SUCCESS'){
                    localStorage.setItem('userId', response.user_data.id)
                    localStorage.setItem('storeToken', response.token)
                    if(response.user_data.is_topic_type_update == '1'){
                        window.location.href = 'sharvak-dashboard';
                    }else{
                        window.location.href = 'select-topic-type';
                    }
                }
            }else{
                console.error("Something went wrong")
            }
        }
    },
  },
};
</script>
