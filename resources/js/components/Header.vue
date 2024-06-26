<template>
    <div x-data="app()" x-cloak @click="closeHeaderOnOutsideClick">
        <section class="top_cont fixed-top">
            <div class="container">
                <div class="row float-end">
                    <div class="col">
                        <a class="tops" href="help-guide"><i
                                class="bi bi-question-circle-fill m-1 p-1"></i>Help/Guide</a>
                    </div>
                    <!-- <div class="col">
                        <b-dropdown text="Select Language" class="dropdownMenuButton1" v-model="selectItemLanguage" :text="selectItemLanguage ? selectItemLanguage : 'Select Language'">
                            <b-dropdown-item @click="updateLanguage('English')"><a class="dropdown-item" href="#">English</a></b-dropdown-item>
                            <b-dropdown-item @click="updateLanguage('Hindi')"><a class="dropdown-item" href="#">Hindi</a></b-dropdown-item>
                            <b-dropdown-item @click="updateLanguage('Kannada')"><a class="dropdown-item" href="#">Kannada</a></b-dropdown-item>
                            <b-dropdown-item @click="updateLanguage('Gujarati')"><a class="dropdown-item" href="#">Gujarati</a></b-dropdown-item>
                        </b-dropdown>
                    </div> -->
                </div>
            </div>
        </section>

        <section class="hambergure_section ">
            <div class=" n1 navbar-expand-lg navbar-expand-xxl navbar-expand-xl fixed-top">
                <div class="container">
                    <b-navbar toggleable="lg" class="">
                        <a class="navbar-brand" href="/">
                            <img class="nav-image" src="images/jd_logo_new.png" alt="logo"></a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <b-navbar-toggle target="nav-collapse" class="vue_nav_collapse"></b-navbar-toggle>
                        </button>

                        <b-collapse id="nav-collapse" class="" is-nav>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="about">About JD</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="sanstha-list">Sanstha's</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="sanstha-activty">Activity</a>
                                    </li>
                                    <li class="nav-item" v-if="token == null">
                                        <a class="nav-link" href="home-login">Login</a>
                                    </li>
                                </ul>
                            </div>
                        </b-collapse>
                    </b-navbar>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            selectItemLanguage: null, token: localStorage.getItem('storeToken'),
        };
    },
    methods: {
        updateLanguage(langText) {
            this.selectItemLanguage = langText;
        },

        closeHeaderOnScroll() {
            var navbar = document.querySelector('.navbar-collapse');
            if (navbar && navbar.classList.contains('show')) {
                navbar.classList.remove('show');
            }
        },
        closeHeaderOnOutsideClick(event) {
            var navbar = document.querySelector('.navbar-collapse');
            if (navbar && navbar.classList.contains('show') && !this.$el.contains(event.target)) {
                navbar.classList.remove('show');
            }
        },
    },
    mounted() {
        var currentPage = window.location.href;
        var navLinks = document.getElementsByTagName('a');
        for (var i = 0; i < navLinks.length; i++) {
            if (navLinks[i].href === currentPage) {
                navLinks[i].classList.add('active');
            }
        }
        document.addEventListener('scroll', this.closeHeaderOnScroll);
        document.addEventListener('click', this.closeHeaderOnOutsideClick);
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.closeHeaderOnScroll);
        document.removeEventListener('click', this.closeHeaderOnOutsideClick);
    },
}
</script>
