<template>
    <section>
        <div class="container">
            <div class="search_fixed_div ">
                <form @submit.prevent="getFollowing()" class="row g-2 search_follower_row">
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
                <div v-for="(res, index) in getFollowings" :key="index" 
                  class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 follower_div_left">
                  <div class="follower_div row">
                    <div class="col-4">
                      <img :src="res.banner && res.banner.length > 0 ? res.banner[0].original_url : 'images/1853608-200@2x.png'" class="img_follower" alt="image" />
                    </div>
                    <div class="col-4">
                      <span class="follower_span">{{ res.title }}</span>
                    </div>
                    <div class="col-4">
                      <button class="follower_btn_following" @click="onClickUnfollow(res.id)">Following</button>
                    </div>
                  </div>
                </div>
                <infinite-loading @distance="1" @infinite="getFollowing"></infinite-loading>
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
            getFollowings: [],page:1,search_term:''
        };
    },
    methods: {
      async getFollowing($state){
        try { 
          const data = {
            params : {
              search_term : this.search_term
            }
          }
          if (this.search_term.length > 0) {
            this.getFollowings = [];
            this.search_page = 1;
          } else {
            data.params.page = this.page;
          }
          const response = await profileSideBarService.getFollowedOrganization(data);
          if (response.status === 200 || response.status === 201) {
            const { data: responseData } = response;
            if (responseData.length != 0) {
              for (const value of responseData) {
                if (value !== 'status') {
                  this.getFollowings.push(value);
                }
              }
              $state.loaded();
              if (this.search_term.length > 0) {
                this.search_page++;
              } else {
                this.page++;
              }
            } else {
              $state.complete();
            }
          } else {
            console.error("Something went wrong");
          }
        } catch (error) {
          console.error("Error making API call:", error);
        }
      },
      async onClickUnfollow(resOrgId) {
        const data = {
            is_follow: 0,
            organisation_id: resOrgId,
        };
        try {
            const response = await afterLoginHomeService.followUnfollowOrganization({ ...data });
            if (response.status === 200 || 201) {
                const indexToRemove = this.getFollowings.findIndex(item => item.id === resOrgId);
                if (indexToRemove !== -1) {
                    this.getFollowings.splice(indexToRemove, 1);
                }
            } else {
                console.error("Something went wrong");
            }
        } catch (error) {
            console.error("Error making API call:", error);
        }
      },
      async clearForm($state) {
            this.getFollowings = [];
            this.search_term = null;
            this.page = 1;
            await this.getFollowing($state);
        },
    },  
};
</script>