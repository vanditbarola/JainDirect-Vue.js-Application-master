export const CONSTANT =  Object.freeze({
    API_CONSTANT: {
        // Login module
        LOGIN: "login",
        LOGINRESENDOTP: "login",
        LOGINVERIFYOTP: "verify",

        // Volunteer module
        CREATE_VOLUNTEER: "web/volunteers",

        // Topic type
        CREATE_TOPICTYPE: "save-topic-type",
        GET_TOPICTYPE: "topic-types",
        
        // sanstha member
        CREATE_SANSTHAMEMBER: "web/get-user-sanstha-member",
        
        // Sanstha Category
        CREATE_SANSTHACATEGORY: "user-preferences",
        GET_SANSTHACATEGORY: "web/get-organisation-form",
        
        // Profile Side-Bar 
        GET_USER: "users/",
        GET_MANAGESANSTHA: "web/get-manage-sanstha",
        GET_USERMANAGESANSTHA: "web/get-user-sanstha-member",
        GET_USERSAVEDPOST: "web/get-saved-post?page=",
        GET_COUNTRY: "getCountries",
        GET_STATE: "web/get-states",
        GET_CITY: "getCity",
        UPDATE_PROFILE_PICTURE: "users/media",
        GET_FOLLOWED_ORGANIZATION: "web/get-followed-organisation?page=",
        GET_FOLLOWERS_ORGANIZATION: "web/get-followers-organisation?page=",

        // After login home
        NEWS_DETAILS: "web/newsDetails",
        GET_ALL_HOME_ACTIVITIES: "web/get-all-latest-activities?page=",
        VIEW_EVENT_NEWS: "view-event-news",
        EVENT_HOME_ADD_LIKE: "event-add-like",
        USER_SAVE_HOME_POST: "user-save-post",
        FOLLOW_UNFOLLOW_HOME: "follow-unfollow-organization",
        UNFOLLOW_HOME: "web/unfollow-organisation",

        // Feedback module
        CREATE_FEEDBACK: "web/feedback",
        
        // Activity module
        NEWS_DETAILS : "web/newsDetails",
        GET_ALL_ACTIVITIES : "web/get-allwithout-latest-activities?page=",
        GET_ALL_NEWS_ACTIVITIES : "web/get-allwithout-news-latest-activities?page=",
        GET_ALL_EVENTS_ACTIVITIES : "web/get-allwithout-events-latest-activities?page=",
        GET_ALL_APPEAL_ACTIVITIES : "web/get-allwithout-appeal-latest-activities?page=",
        GET_ALL_VIDEOS_ACTIVITIES : "web/get-allwithout-videos-latest-activities?page=",
        GET_SEARCH_ACTIVITIES : "web/get-search-activities",

        // Event Side-Bar
        GET_CURRENTEVENT: "get-current-event",
        GET_UPCOMINGEVENT: "get-upcoming-event",
        SIDE_BAR_EVENT_ADD: "event-add-like",
        SIDE_BAR_USER_SAVE: "user-save-post",

        // Email Subscribe
        CREATE_EMAILSUBSCRIBE: "user-email-subscriber",

        // Upcomming Event
        GET_UPCOMMING: "web/get-upcoming-event?page=",

        // Current Event
        GET_CURRENTMOREEVENT: "web/get-current-event?page=",
        CURRENT_EVENT_ADD_LIKE: "event-add-like",
        CURRENT_EVENT_USER_SAVE_POST: "user-save-post",

        // Sharvak POST
        GET_ALLSHARVAK: 'web/get-sharvak-all-post?page=',
        GET_NEWSSHARVAK: 'web/get-sharvak-news?page=',
        GET_EVENTSHARVAK: 'web/get-sharvak-event?page=',
        GET_VIDEOSHARVAK: 'web/get-sharvak-video?page=',
        SHRAVAK_MUNCH_EVENT_LIKE: "event-add-like",
        SHRAVAK_MUNCH_USER_SAVE_POST: "user-save-post",

        // User sanstha
        GET_USER_SANSTHA: 'web/get-manage-sanstha?page=',
        GET_USER_SANSTHA_SEARCH: 'web/get-manage-sanstha-search?page=',

        // After login activity 
        GET_ALL_LATEST_ACTIVITY: 'web/get-all-latest-activities?page=',
        GET_ALL_NEWS_LATEST_ACTIVITY: 'web/get-all-news-latest-activities?page=',
        GET_ALL_EVENTS_LATEST_ACTIVITY: 'web/get-all-events-latest-activities?page=',
        GET_ALL_APPEAL_LATEST_ACTIVITY: 'web/get-all-appeal-latest-activities?page=',
        GET_ALL_LATEST_VIDEOS: 'web/get-all-videos-latest-activities?page=',
        EVENT_ADD_LIKE: 'event-add-like',
        USER_SAVE_POST: 'user-save-post',

        // After login manage member
        GET_ALL_MEMBER_SANSTHA: "web/get-user-sanstha-member?page=",
        
        // After login sanstha
        GET_ALL_SANSTHA: "web/sanstha-list?page=",
        GET_ALL_SANSTHA_TEMPLE: "web/sanstha-temple-list?page=",
        GET_ALL_SANSTHA_EDUCATION: "web/sanstha-education-list?page=",
        GET_ALL_SANSTHA_GAUSHALA: "web/sanstha-gaushala-list?page=",
        GET_ALL_SANSTHA_OLD_AGE: "web/sanstha-oldage-list?page=",
        GET_ALL_SANSTHA_DHARMSHALA: "web/sanstha-dharmshala-list?page=",
        SANSTHA_EVENT_ADD_LIKE: "event-add-like",
        SANSTHA_USER_SAVE_POST: "user-save-post",
        SANSTHA_ORGANIZATION_SEARCH: "organization-search",
        GET_ALL_SANSTHA_MUNISEVA: "web/sanstha-muniseva-list?page=",
        GET_ALL_SANSTHA_ORPHANAGE: "web/sanstha-orphanage-list?page=",
        GET_ALL_SANSTHA_BHOJNALYA: "web/sanstha-bhojnalya-list?page=",
        GET_SEARCH_SANSTHA: "web/search-sanstha",

        // Index 
        INDEX_NEWS_DETAILS: "web/newsDetails",
        GET_COUNT: "web/get-count",
        INDEX_TEMPLE: "web/sanstha-temple-list",
        INDEX_MUNI_SEVA: "web/sanstha-muniseva-list",
        INDEX_DHARMSHALA: "web/sanstha-dharmshala-list",
        INDEX_CATEGORY: "web/get-sanstha-category",
        INDEX_ACTIVITY: "web/get-latest-activities",
        INDEX_SAVE_CONTACT: "web/save-contact-us",

        // Sanstha Detail
        GET_DETAIL_SANSTHA: "web/newsDetails",
        GET_SANSTHA: "web/org-detail",
        GET_EVENTBASEDSANSTHA: "web/get-organisation-event?page=",
        GET_NEWSBASEDSANSTHA: "web/get-organisation-news?page=",
        GET_PARTICULAR_NEWSBASEDSANSTHA: "newss/",
        GET_PARTICULAR_VIDEOBASEDSANSTHA: "videos/",
        ADD_NEWSBASEDSANSTHA: "newss",
        ADD_PROFILEIMG: "organization-details/media",
        GET_STATES: "getStates",
        GET_CITIES: "getCity",
        ADD_EVENTBASEDSANSTHA: "events",
        ADD_EVENT_MEDIA: "events/media",
        ADD_NEWS_MEDIA: "newss/media",
        ADD_APPEAL_MEDIA: "appeals/media",
        ADD_VIDEO_MEDIA: "videos/media",
        UPDATE_PARTICULAR_NEWSBASEDSANSTHA: "newss/",
        UPDATE_PARTICULAR_VIDEOBASEDSANSTHA: "videos/",
        UPDATE_PARTICULAR_GALLARYBASEDSANSTHA: "galleries/",
        UPDATE_PARTICULAR_EVENTBASEDSANSTHA: "events/",
        DELETE_PARTICULAR_NEWSBASEDSANSTHA: "newss/",
        DELETE_PARTICULAR_EVENTBASEDSANSTHA: "events/",
        DELETE_PARTICULAR_VIDEOBASEDSANSTHA: "videos/",
        GET_PARTICULAR_EVENTBASEDSANSTHA: "events/",
        GET_PARTICULAR_CPBASEDSANSTHA: "custom-pages/",
        GET_COMMITTEE_MEMBER: "web/get-org-about-committee",
        GET_EXPLOREMORE_LIST: "get-explore-more-list",
        ADD_SANSTHA_COMMITTEE: "committees",
        ADD_SANSTHA_IMG: "committees/media",
        EDIT_SANSTHA_PARTICULAR: "organization-details/",
        DELETE_COMMITTEE_MEMBER: "committees/",
        UPDATE__GALLARY_FOLDER: "galleries/",
        EDIT_COMMITTEE_MEMBER: "committees/",
        UPDATE_COMMITTEE_MEMBER: "committees/",
        GET_SANSTHA_PARTICULAR: "organization-details/",
        GET_SANSTHA_MEMBER: "get-orgnisation-based-member",
        GET_APPEALBASEDSANSTHA: "web/get-organisation-appeal?page=",
        GET_VIDEOBASEDSANSTHA: "web/get-organisation-video?page=",
        GET_CUSTOMPAGEBASEDSANSTHA: "web/get-organisation-custompage?page=",
        DELETE_PARTICULAR_APPEALBASEDSANSTHA: "appeals/",
        DELETE_PARTICULAR_CPBASEDSANSTHA: "custom-pages/",
        DELETE_PARTICULAR_GALLARYALBUM: "gallery-delete-media",
        DELETE_PARTICULAR_GALLARYFOLDER: "web/delete-album-folder",
        ADD_APPEALBASEDSANSTHA: "appeals",
        ADD_CUSTOMPAGEBASEDSANSTHA: "custom-pages",
        ADD_VIDEOBASEDSANSTHA: "videos",
        ADD_GALLARYBASEDSANSTHA: "galleries",
        ADD_GALLARY_IMG: "galleries/media",
        ADD_CP_IMG: "custom-pages/media",
        GET_PARTICULAR_GALLARYBASEDSANSTHA: "galleries/",
        GET_PARTICULAR_APPEALBASEDSANSTHA: "appeals/",
        UPDATE_PARTICULAR_APPEALBASEDSANSTHA: "appeals/",
        UPDATE_PARTICULAR_CPBASEDSANSTHA: "custom-pages/",
        GET_GALLERYBASEDSANSTHA: "web/get-organisation-gallery",
        GET_GALLERYABOUTSANSTHA: "web/get-org-about-gallery"
    }
})