<template>
    <section class="mt-5 pt-5 pb-5 " >
        <div class="join_volunteer_title text-center">Feedback</div>
        <div class="card join_volunteer_card  mt-3 pb-3 mx-3">
            <form class="px-4">
                <label for="fullname_volunteer" class="fullname_volunteer_label form-label mt-5">Full Name<span class="required mx-1">*</span></label>
                <input type="text" v-model="name" class="fullname_volunteer_input form-control" id="fullname_volunteer" pattern="[A-Za-z\s]+" required>
                <div style="color: red;">{{ this.nameErr }}</div>
                <div class="row">
                    <div class="col-md-6 col-sm-12 col-xs-12 mt-3">
                        <label for="mobile_volunteer" class="fullname_volunteer_label form-label">Mobile No.<span class="required mx-1">*</span></label>
                        <input type="tel" v-model="mobile" class="fullname_volunteer_input form-control" id="mobile_volunteer" pattern="^[0-9]{10}$" required>
                        <div style="color: red;">{{ this.mobileErr }}</div>
                    </div>
                    <div class="col-md-6 col-sm-12 col-xs-12 mt-3">
                        <label for="email_volunteer" class="fullname_volunteer_label form-label">Email<span class="required mx-1">*</span></label>
                        <input type="email" v-model="email" class="fullname_volunteer_input form-control" id="email_volunteer" required>
                        <div style="color: red;">{{ this.emailErr }}</div>
                    </div>
                </div>
                <label for="feedback_volunteer" class="fullname_volunteer_label form-label mt-3">Feedback<span class="required mx-1">*</span></label>
                <textarea class="fullname_volunteer_input form-control" v-model="feedback" id="feedback_volunteer" required></textarea>
                <div style="color: red;">{{ this.feedbackErr }}</div>
                <div class="d-grid gap-2 d-md-block mt-3">
                    <button class="volunteer_btn" type="reset">Clear</button>
                    <button class="volunteer_btn_submit" @click.prevent="postFeedback()" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
import feedBackService from "../../services/feedback.service"
export default {
    name: "App",
    data() {
        return {
            info: '', name: '', email: '', mobile: '', feedback: '',nameErr:'',emailErr:'',mobileErr:'',feedbackErr:''
        };
    },
    methods: {
        async postFeedback(){
            this.nameErr = '';
            this.mobileErr = '';
            this.emailErr = '';
            this.feedbackErr = '';

            const namePattern = /^[A-Za-z\s]+$/;
            const spaceRegex = /^\S.*$/; 
            const mobilePattern = /^[0-9]+$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!this.name.trim()) {
                    this.nameErr = 'Name is required';
                } else if (!spaceRegex.test(this.name)) {
                    this.nameErr = 'Name should not start with a space';
                }else if (!namePattern.test(this.name)) {
                    this.nameErr = 'Please do not use any numbers or special characters ';
                }
            if (!this.mobile) {
            this.mobileErr = 'Mobile number is required';
            }else if (!spaceRegex.test(this.mobile)){
                this.mobileErr = 'Mobile number should not start with a space';
            }else if(!mobilePattern.test(this.mobile)){
                this.mobileErr = 'Mobile number should be only digits';
            }else if (this.mobile.length < 10 || this.mobile.length > 10) {
                this.mobileErr = "Mobile number should be at least 10 digits";
            }
            if (!this.email) {
                    this.emailErr = 'Email is required';
                }else if (!emailPattern.test(this.email)) {
                    this.emailErr = 'Please write proper email address';
                } else if (!spaceRegex.test(this.email)) {
                    this.emailErr = 'Email should not start with a space';
                }
            if (!this.feedback) {
                this.feedbackErr = 'Feedback is required';
            }else if (!spaceRegex.test(this.feedback)){
                this.feedbackErr = 'Feedback should not start with a space';
            }
            if (this.nameErr || this.mobileErr || this.emailErr || this.feedbackErr) {
                return; 
            }
            const data = {
                name: this.name,
                email: this.email,
                mobile: this.mobile,
                feedback: this.feedback,
            }
            if(this.name != '' && this.email != '' && this.mobile != '' && this.feedback != ''){
                this.nameErr = '';this.mobileErr = '';this.feedbackErr = '';this.emailErr='';
                const response = await feedBackService.createFeedback({...data})  
                if (response.status === 201 || 200){
                    this.name='';this.email='';this.mobile='';this.feedback='';
                    this.$toast.success('Your feedback is submitted successfully!"');
                } else {
                    console.error("Something went wrong")
                }
            }
        }
    },
};  
</script>

