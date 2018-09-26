<template>
  <div class="home">
     <!-- Page Content -->
    <div class="container">

      <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <h1 class="my-4">Join discussion forum 
            <router-link to='/addQuestion' >
              <button type="button" class="btn btn-primary" v-if="token">Click here for add question</button>
            </router-link>
          </h1>

          <!-- Blog Post -->
          <router-view></router-view>
          <all-question/>

        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <!-- Search Widget -->
          <div class="card my-4">
            <h5 class="card-header">Search</h5>
            <div class="card-body">
              <div class="input-group">
                <input type="text" class="form-control" placeholder="Search for...">
                <span class="input-group-btn">
                  <button class="btn btn-secondary" type="button">Go!</button>
                </span>
              </div>
            </div>
          </div>

          <!-- Side Widget -->
          <div class="card my-4">
            <h5 class="card-header">Side Widget</h5>
            <div class="card-body">
              You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!
            </div>
          </div>

        </div>

      </div>
      <!-- /.row -->

    </div>
    <!-- /.container -->
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";
import HelloWorld from "@/components/HelloWorld.vue";
import AllQuestion from "@/components/ListQuestion.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    AllQuestion
  },
  data:function(){
    return{
      token:false
    }
  },
  computed:{
    ...mapState(["isLogin","isLogout"])
  },
  watch:{
    isLogin:function(){
      this.token = true
    },
    isLogout:function(){
      this.token = false
    }
  },
  created() {
    let checkToken = localStorage.getItem("token")
    if(checkToken){
      this.token = true
    }
  },
};
</script>
