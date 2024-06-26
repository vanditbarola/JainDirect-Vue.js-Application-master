<template>
    <section>
        <div class="container">
            <div class="search_fixed_div ">
                <form @submit.prevent="getFollowersList()" class="row g-2 search_follower_row">
                    <div class="search_follower_div  col-12">
                        <input v-model="search_term" type="text" class="serach_follower_input form-control mx-2"
                            placeholder="Search for following">
                        <button type="submit" class="search_follower_btn form-control mx-2">Search</button>
                        <button type="submit" class="search_follower_btn form-control mx-2" @click="clearForm()">Clear</button>
                    </div>
                </form>
            </div>
            <section class="follower_section">
              <div class="row follower_row">
                <div v-for="(res, index) in getFollowers" :key="index" 
                  class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 follower_div_left">
                  <div class="follower_div row">
                    <div class="col-4">
                      <img :src="res.follow_user ? res.follow_user.profile_photo ? res.follow_user.profile_photo[0] ? res.follow_user.profile_photo[0].original_url : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png' : 'images/20d42aa2-c51f-45bb-9cdf-05c6ed26f99d.png'" class="img_follower" alt="image" />
                    </div>
                    <div class="col-4">
                      <span class="follower_span">{{ res.follow_user.name }}</span>
                    </div>
                    <div class="col-4">
                      <button class="follower_btn_following" @click="onClickUnfollow(res.id)">Following</button>
                    </div>
                  </div>
                </div>
                <infinite-loading @distance="1" @infinite="getFollowersList"></infinite-loading>
              </div>
            </section>
        </div>
    </section>
</template>

<script>
import profileSideBarService from "../../services/profilesidebar.service"
import afterLoginHomeService from "../../services/afterLoginHome.service";
export default {
    name: "App",
    data() {
        return {
            getFollowers: [],page:1,search_term:''
        };
    },
    methods: {
      async getFollowersList($state){
        try { 
          const params = new URLSearchParams(window.location.search);
          const organisation_id = params.get('id');
          const data = {
            params : {
              search_term : this.search_term,
              organisation_id : organisation_id
            }
          }
          if (this.search_term.length > 0) {
            this.getFollowers = [];
            this.search_page = 1;
          }
          const response = await profileSideBarService.getFollowersOrganization(this.search_term.length > 0 ? this.search_page : this.page, data);
          if (response.status === 200 || response.status === 201) {
              if (response.data.length !== 0) {
                  this.getFollowers.push(...Object.values(response.data).filter(key => key !== 'status'));
                  this.page = this.search_term.length > 0 ? this.search_page + 1 : this.page + 1;
                  $state.loaded();
              } else {
                  $state.complete();
              }
          } else {
              console.error("Something went wrong");
          }
        } catch (error) {
            console.error("Something went wrong");
        }
      },
      async onClickUnfollow(Id) {
        const data = {
            id: Id,
        }
        try {
            const response = await afterLoginHomeService.unfollowOrganization({ ...data });
            if (response.status === 200 || 201) {
                const indexToRemove = this.getFollowers.findIndex(item => item.id === Id);
                if (indexToRemove !== -1) {
                    this.getFollowers.splice(indexToRemove, 1);
                }
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error making API call:", error);
        }
      },
      async clearForm($state) {
            this.getFollowers = [];
            this.search_term = null;
            this.page = 1;
            await this.getFollowersList($state);
        },
    },
};
</script>