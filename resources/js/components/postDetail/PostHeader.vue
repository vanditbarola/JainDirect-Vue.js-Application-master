<template>
    <section class="top_cont fixed-top">
           <div class="container">
               <div class="row section_topic_head1">
                <div class="col  col col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center align-self-center">
                       <a class="tops" href="/"><i class="bi bi-house-door-fill p-1"></i>Home</a>
                   </div>
                   <div class="col  col col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center align-self-center">
                       <a class="tops" href="/help-guide"><i class="bi bi-question-circle-fill p-1"></i>Help/Guide</a>
                   </div>
                   <!-- <div class=" col col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center align-self-center">
                       <b-dropdown text="Select Language" class="dropdownMenuButton1" v-model="selectItemLanguage" :text="selectItemLanguage ? selectItemLanguage : 'Select Language'">
                           <b-dropdown-item @click="updateLanguage('English')"><a class="dropdown-item" href="#">English</a></b-dropdown-item>
                           <b-dropdown-item @click="updateLanguage('Hindi')"><a class="dropdown-item" href="#">Hindi</a></b-dropdown-item>
                           <b-dropdown-item @click="updateLanguage('Kannada')" ><a class="dropdown-item" href="#">Kannada</a></b-dropdown-item>
                           <b-dropdown-item @click="updateLanguage('Gujarati')"><a class="dropdown-item" href="#">Gujarati</a></b-dropdown-item>
                       </b-dropdown>
                   </div> -->
                   <div v-if="token" class=" col col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center align-self-center">
                       <a class="tops" v-on:click="logout()">Logout</a>
                   </div>
               </div>
           </div>
       </section>
</template>

<script>
export default {
    name: "App",
    data() {
       return {
           selectItemLanguage:null,token: localStorage.getItem('storeToken'),
       };
    },
    methods: {
        toggleSidebar() {
            const sidebar = document.getElementById('left_card_inner_login');
            const isVisible = window.getComputedStyle(sidebar).display !== 'none';
            sidebar.style.display = isVisible ? 'none' : 'block';
        },
        updateLanguage(langText) {
            this.selectItemLanguage = langText;
        },
        async logout() {
            localStorage.removeItem('storeToken');
            localStorage.removeItem('storeEmail');
            localStorage.removeItem('storeMobile');
            localStorage.removeItem('userId');
            window.location.href = '/';
        },
    },
    computed: {
        shouldDisplayLogout() {
            return !!this.token; 
        }
    },
}
</script>