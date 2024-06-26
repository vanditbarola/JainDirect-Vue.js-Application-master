<template>
    <div x-data="app()" x-cloak  @click="closeHeaderOnOutsideClickLogin" >
        <section class="top_cont fixed-top">
            <div class="container">
                <div class="row section_topic_head1 d-flex align-items-center">
                    <div
                        class=" col col-xs-6 col-sm-6 col-md-8 col-lg-8 col-xl-6 col-xxl-6  text-xxl-end text-xl-end text-center">
                        <a class="tops" href="help-guide"><i class="bi bi-question-circle-fill p-1"></i>Help/Guide</a>
                    </div>
                    <!-- <div class="col col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center">
                        <b-dropdown text="Select language" class="dropdownMenuButton1"  v-model="selectItemLanguage" :text="selectItemLanguage ? selectItemLanguage : 'Select Language'">
                            <b-dropdown-item @click="updateLanguage('English')"><a class="dropdown-item" href="#">English</a></b-dropdown-item>
                            <b-dropdown-item @click="updateLanguage('Hindi')"><a class="dropdown-item" href="#">Hindi</a></b-dropdown-item>
                            <b-dropdown-item @click="updateLanguage('Kannada')"><a class="dropdown-item" href="#">Kannada</a></b-dropdown-item>
                            <b-dropdown-item @click="updateLanguage('Gujarati')"><a class="dropdown-item" href="#">Gujarati</a></b-dropdown-item>
                        </b-dropdown>
                    </div> -->
                    <div
                        class="col  col-xs-6 col-sm-6  col-md-4 col-lg-4 col-xl-6 col-xxl-6 text-center align-self-center text-xxl-end text-xl-end ">
                        <a class="tops logout" v-on:click="logout()">Logout</a>
                    </div>
                </div>
            </div>
        </section>
        <section class="inner_login_navbar">
            <b-navbar toggleable="lg" class=" login_bg">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <img src="images/log_new.png" class="nav-image-login1" style="margin-top: 20px;" alt="...">
                        <img src="images/logo_mini_new.png" class="nav-image-login2" style=" margin-top: 20px;" alt="...">
                    </a>
                    <button class="navbar-toggler leftcard_hamburger" type="button" data-bs-toggle="collapse"
                        data-bs-target="#left_card_inner_login" aria-controls="left_card_inner_login" aria-expanded="false"
                        aria-label="Toggle navigation" @click="toggleAndCloseNavbar">
                        <b-navbar-toggle target="nav-collapse-sidebar"></b-navbar-toggle>
                    </button>
                    

                    <button class="navbar-toggler login_menu" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation" @click="toggleAndCloseSidebar">
                        <b-navbar-toggle target="nav-collapse-login" class="hamburger_menu_login">Menu</b-navbar-toggle>
                    </button>

                    <b-collapse id="nav-collapse-login" is-nav>
                        <b-navbar-nav class="ms-auto">
                            <div class="collapse navbar-collapse" id="navbarNav" style="margin-bottom: -10px;">
                                <ul class="navbar-nav ms-auto g-3">
                                    <li class="nav-item">
                                        <a class="nav-link p-2" aria-current="page" href="sharvak-dashboard">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-2" href="sharvak-munch">Shravak Munch</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-2" href="sanstha">Sansthas</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link p-2" href="activity">Activity</a>
                                    </li>
                                    <!-- <li class="nav-item">
                                        <a class="nav-link" href="#"><i class="bi bi-search p-2"></i></a>
                                    </li> -->
                                </ul>
                            </div>
                        </b-navbar-nav>
                    </b-collapse>
                </div>
            </b-navbar>
        </section>
    </div>
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
        toggleAndCloseNavbar() {
            this.toggleSidebar();
            this.closeNavbar();
        },
        toggleSidebar() {
            const sidebar = document.getElementById('left_card_inner_login');
            const isVisible = window.getComputedStyle(sidebar).display !== 'none';
            sidebar.style.display = isVisible ? 'none' : 'block';
        },
        closeNavbar() {
            const navbar = document.getElementById('nav-collapse-login');
            navbar.style.display = 'none';
        },
        toggleAndCloseSidebar() {
            this.toggleNavbar();
            this.closeSidebar();
        },
        toggleNavbar() {
            const sidebar = document.getElementById('left_card_inner_login');
            const isVisible = window.getComputedStyle(sidebar).display !== 'none';
            sidebar.style.display = isVisible ? 'none' : 'block';
        },
        closeSidebar() {
            const sidebar = document.getElementById('left_card_inner_login');
            sidebar.style.display = 'none';
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
        closeNavbarOnScroll() {
            this.closeNavbar();
            this.closeSidebar();
            
        },
        closeNavbarAndSidebar() {
            this.closeNavbar();
            this.closeSidebar();
        },
        closeHeaderOnOutsideClickLogin(event) {
            const navbar = document.getElementById('nav-collapse-login');
            const sidebar = document.getElementById('left_card_inner_login');

            if (navbar && navbar.classList.contains('show') && !this.$el.contains(event.target)) {
                navbar.classList.remove('show');
            }

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
        document.addEventListener('scroll', this.closeNavbarOnScroll);
        document.addEventListener('click', this.closeHeaderOnOutsideClickLogin);
    },
    beforeDestroy() {
        document.removeEventListener('scroll', this.closeNavbarOnScroll);
        document.removeEventListener('click', this.closeHeaderOnOutsideClickLogin);
    },
}
</script>