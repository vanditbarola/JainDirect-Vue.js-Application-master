import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function lazyLoad(view){
    return() => import(`@/views/${view}.vue`)
  }

  const routes = [
    {
        path: '/',
        name: 'welcome',
        component: () => import('./components/Index.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('./components/About.vue')
    },
    {
        path: '/sansthalist',
        name: 'sansthalist',
        component: () => import('./components/SansthaList.vue')
    },
    {
        path: '/sansthaactivty',
        name: 'sansthaactivty',
        component: () => lazyLoad('Acivities')
    },
    {
        path: '/homelogin',
        name: 'homelogin',
        component: () => import('./components/Login.vue')
    },
    {
        path: '/loginotp',
        name: '/loginotp',
        component: () => import('./components/LoginOtp.vue')
    }, {
        path: '/afterloginhome',
        name: '/afterloginhome',
        component: () => import('./components/AfterLoginHome.vue')
    },  {
        path: '/afterloginactivity',
        name: '/afterloginactivity',
        component: () => import('./components/AfterLoginActivity.vue')
    }, {
        path: '/afterloginSanstha',
        name: '/afterloginSanstha',
        component: () => import('./components/AfterLoginSanstha.vue')
    }, {
        path: '/afterloginManageSanstha',
        name: '/afterloginManageSanstha',
        component: () => import('./components/AfterLoginManageSanstha.vue')
    },  {
        path: '/afterloginManageMember',
        name: '/afterloginManageMember',
        component: () => import('./components/AfterLoginManageMember.vue')
    }, {
        path: '/profile',
        name: '/profile',
        component: () => import('./components/Profile.vue')
    }, {
        path: '/profileEdit',
        name: '/profileEdit',
        component: () => import('./components/ProfileEdit.vue')
    },{
        path: '/sharvakMunch',
        name: '/sharvakMunch',
        component: () => import('./components/AfterLoginSharvakMunch.vue')
    },{
        path: '/currentmoreevent',
        name: '/currentmoreevent',
        component: () => import('./components/CurrentMoreEvent.vue')
    },{
        path: '/upcommingmoreevent',
        name: '/upcommingmoreevent',
        component: () => import('./components/UpcommingMoreEvent.vue')
    },{
        path: '/helpguide',
        name: '/helpguide',
        component: () => import('./components/HelpGuide.vue')
    },{
        
        path: '/customcontent',
        name: '/customcontent',
        component: () => import('./components/postDetail/postSubFolder/customCon.vue')
},
{
        
    path: '/foldergallery',
    name: '/foldergallery',
    component: () => import('./components/sansthaSub/sansthaFolderGallery.vue')
},

{
    
    path: '/followerslist',
    name: '/followerslist',
    component: () => import('/components/Followers.vue')
},
{
    
    path: '/managesanstha',
    name: '/managesanstha',
    component: () => import('./components/AfterLoginManageSanstha.vue')
},
{
    
    path: '/sharepostcard',
    name: '/sharepostcard',
    component: () => import('/components/sharepost.vue')
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
