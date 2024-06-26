/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
window.Vue = require('vue').default;
import VueResource from 'vue-resource';
Vue.use(VueResource);


import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// import router from "../js/router"
Vue.use(Toast, {
    position: 'top-center', 
    timeout: 7000, 
  });
  



import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

// ... other configurations and code

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('sansthaheader-component', require('./components/SansthaHeader.vue').default);
Vue.component('sansthadashboard-component', require('./components/SansthaDashboard.vue').default);
Vue.component('following-component', require('./components/Following.vue').default);
Vue.component('followerslist', require('./components/Followers.vue').default);
Vue.component('termscondition-component', require('./components/TermsCondition.vue').default);
Vue.component('helpguide-component', require('./components/HelpGuide.vue').default);
Vue.component('postdetailpage-component', require('./components/PostDetailPage.vue').default);
Vue.component('afterloginmanagemember-component', require('./components/AfterLoginManageMember.vue').default);
Vue.component('afterloginmanagesanstha-component', require('./components/AfterLoginManageSanstha.vue').default);
Vue.component('afterlogin-sanstha-component', require('./components/AfterLoginSanstha.vue').default);
Vue.component('afterloginactivity-component', require('./components/AfterLoginActivity.vue').default);
Vue.component('afterloginsharvakmunch-component', require('./components/AfterLoginSharvakMunch.vue').default);
Vue.component('login-sidebar', require('./components/AfterLoginSideBar.vue').default);
Vue.component('login-eventsidebar', require('./components/AfterLoginEventSideBar.vue').default);
Vue.component('feedback-component', require('./components/feedback.vue').default);
Vue.component('joinvolunter-component', require('./components/JoinVolunter.vue').default);
Vue.component('profileedit-component', require('./components/ProfileEdit.vue').default);
Vue.component('profile-component', require('./components/Profile.vue').default);
Vue.component('current-more-event-component', require('./components/CurrentMoreEvent.vue').default);
Vue.component('upcomming-more-event-component', require('./components/UpcommingMoreEvent.vue').default);
Vue.component('afterloginheader-component', require('./components/AfterLoginHeader.vue').default);
Vue.component('afterloginhome-component', require('./components/AfterLoginHome.vue').default);
Vue.component('selectsansthacategory-component', require('./components/SansthaCategory.vue').default);
Vue.component('afterloginfooter-component', require('./components/AfterLoginFooter.vue').default);
Vue.component('selecttopictype-component', require('./components/TopicTypeSelection.vue').default);
Vue.component('loginotp-component', require('./components/LoginOtp.vue').default);
Vue.component('login-component', require('./components/Login.vue').default);
Vue.component('activities-component', require('./components/Activities.vue').default);
Vue.component('sansthalist-component', require('./components/SansthaList.vue').default);
Vue.component('header-component', require('./components/Header.vue').default);
Vue.component('index-component', require('./components/Index.vue').default);
Vue.component('footer-component', require('./components/Footer.vue').default);
Vue.component('about-component', require('./components/About.vue').default);
Vue.component('InfiniteLoading', require('vue-infinite-loading'));
Vue.component('sansthaDashNews', require('./components/sansthaSub/sansthaDashNews.vue').default);
Vue.component('sansthaDashEvent', require('./components/sansthaSub/sansthaDashEvent.vue').default);
Vue.component('sansthaDashCommittee', require('./components/sansthaSub/sansthaDashCommittee.vue').default);
Vue.component('sansthaDashExploreList', require('./components/sansthaSub/sansthaDashExploreList.vue').default);
Vue.component('sansthaDashGallery', require('./components/sansthaSub/sansthaDashGallery.vue').default);
Vue.component('sansthaDashMembership', require('./components/sansthaSub/sansthaDashMembership.vue').default);
Vue.component('lightBox', require('./components/postDetail/lightBox.vue').default);
Vue.component('library', require('./components/postDetail/library.vue').default);
Vue.component('sansthaDashMoreCommitee', require('./components/sansthaSub/sansthaDashMoreCommittee.vue').default);
Vue.component('sansthaDashMoreCommiteeAdd', require('./components/sansthaSub/sansthaDashMoreCommitteeAdd.vue').default);
Vue.component('sansthaCustomPage',require('./components/sansthaSub/sansthaCustomPage.vue').default);
Vue.component('sansthaDashEditSanstha', require('./components/sansthaSub/sansthaDashEditSanstha.vue').default);
Vue.component('afterlogin-currentevntsidebar',require('./components/AfterLoginCurrentEventSide.vue').default);
Vue.component('afterlogin-upcomingeventsidebar',require('./components/AfterLoginUpcomingEventSide.vue').default);
Vue.component('exploreActivity', require('./components/index/exploreActivity.vue').default);
Vue.component('createNews', require('./components/sansthaSub/sansthaDashCreateNews.vue').default);
Vue.component('createEvent', require('./components/sansthaSub/sansthaDashCreateEvent.vue').default);
Vue.component('createAppeal', require('./components/sansthaSub/sansthaDashCreateAppeal.vue').default);
Vue.component('createVideo', require('./components/sansthaSub/sansthaDashCreateVideo.vue').default);
Vue.component('postHeader' , require('./components/postDetail/PostHeader.vue').default);
Vue.component('branch' , require('./components/sansthaSub/sansthaBranch.vue').default);
Vue.component('sansthaDashVideo', require('./components/sansthaSub/sansthaDashVideo.vue').default)
Vue.component('sansthaDashAppeal', require('./components/sansthaSub/sansthaDashAppeal.vue').default);
Vue.component('postAppeal', require('./components/postDetail/postAppeal.vue').default);
Vue.component('postDetailComitee', require('./components/postDetail/postDetailComitee.vue').default);
Vue.component('postDetailViewAllComitee', require('./components/postDetail/postDetailViewAllComitee.vue').default);
Vue.component('postDetailNews', require('./components/postDetail/postDetailNews.vue').default);
Vue.component('postDetailViewAllNews', require('./components/postDetail/postDetailViewAllNews.vue').default);
Vue.component('postDetailEvent', require('./components/postDetail/postDetailEvent.vue').default);
Vue.component('postDetailViewAllEvent', require('./components/postDetail/postDetailViewAllEvent.vue').default);
Vue.component('postVideo' , require('./components/postDetail/postVideo.vue').default);
Vue.component('postCustom', require('./components/postDetail/postCustom.vue').default);
Vue.component('postGallery', require('./components/postDetail/postGallery.vue').default);
Vue.component('customcontent' , require('./components/postDetail/postSubFolder/customCon.vue').default);
Vue.component('advisory' , require('./components/index/advisoryBoard.vue').default);
Vue.component('managesanstha' , require('./components/AfterLoginManageSanstha.vue').default);
Vue.component('sharepostcard' , require('./components/sharepostcard.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
});

