<template>
     <section class="top_cont fixed-top" @click="closeHeaderOnOutsideClickLoginSanstha">
            <div class="container">
                <div class="row section_topic_head1">
                    <div class="col  sanstha_dashborad_hamberg">
                        <b-navbar toggleable="lg" >
                            <button class="navbar-toggler leftcard_hamburger sanstha_haeder_top" type="button" data-bs-toggle="collapse"
                        data-bs-target="#left_card_inner_login" aria-controls="left_card_inner_login" aria-expanded="false"
                        aria-label="Toggle navigation"  @click="toggleAndCloseNavbarSanstha">
                        <b-navbar-toggle target="nav-collapse-sidebar" ><i class="bi bi-three-dots"></i></b-navbar-toggle>
                    </button>
                        </b-navbar>
                    </div>
                    <div class="col  col col-xxl-4 col-xl-4 col-lg-4 col-md-8 col-sm-4 col-xs-4 text-center align-self-center">
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
                    <div class=" col col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center align-self-center">
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
            selectItemLanguage: null,
            token: localStorage.getItem('storeToken'),
        };
    },
    methods: {
        toggleAndCloseNavbarSanstha() {
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
        closeHeaderOnOutsideClickLoginSanstha(event) {
            const sidebar = document.getElementById('left_card_inner_login');
            if (sidebar && window.getComputedStyle(sidebar).display !== 'none' && !this.$el.contains(event.target)) {
                sidebar.style.display = 'none';
            }
        },
    },
    mounted() {
        var currentPage = window.location.href;
        var navLinks = document.getElementsByTagName('a');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', this.closeNavbarAndSidebar);
            if (navLinks[i].href === currentPage) {
                navLinks[i].classList.add('active');
            }
        }
        document.addEventListener('scroll', this.closeHeaderOnOutsideClickLoginSanstha);
        document.addEventListener('click', this.closeHeaderOnOutsideClickLoginSanstha);
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.closeHeaderOnOutsideClickLoginSanstha);
        document.removeEventListener('click', this.closeHeaderOnOutsideClickLoginSanstha);
    },
}
</script>