<template>
<div>
    <div class="card mb-4" v-for="(question, index) in allQuestion" :key="index">
        <div class="card-body">
            <h2 class="card-title">{{question.title}}</h2>
            <p class="card-text">{{question.question}}
            </p>
            <router-link :to="`/question/${question._id}`">
                <a class="btn btn-primary text-white">Read More &rarr;</a>
            </router-link>

            <div class="row text-right">
                <div v-if="token">
                    <router-link :to="`/edit/question/${question._id}`">
                    <i class="btn far fa-edit"></i>
                    </router-link>
                    <i class="btn far fa-trash-alt" v-on:click="deleteQuestion(question._id)"></i>
                </div>
                <div class="text-left" v-if="token">
                    <i class="btn far fa-thumbs-up" v-on:click="upVoteQuestion(question._id)">{{question.upVote.length}}</i>
                    <i class="btn far fa-thumbs-down" v-on:click="downVoteQuestion(question._id)">{{question.downVote.length}}</i>
                </div>
            </div>
        </div>
        <div class="card-footer text-muted">
            Posted on {{convertDate(question.createdAt)}} by
            <a href="#">{{question.userId.name}}</a>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  data: function() {
    return {
      token: false
    };
  },
  methods: {
    ...mapActions(["getAllQuestion", "deleteQuestion", "getOneUser","upVoteQuestion","downVoteQuestion"]),
    convertDate(input) {
      return moment(input).format("MMMM Do YYYY");
    }
  },
  computed: {
    ...mapState(["allQuestion", "question", "user", "isLogin", "isLogout"])
  },
  created() {
    let checkToken = localStorage.getItem("token");
    if (checkToken) {
      this.token = true;
    }
    this.getAllQuestion();
  },
  watch: {
    question: function() {
      this.getAllQuestion();
    },
    isLogin: function() {
      this.token = true;
    },
    isLogout: function() {
      this.token = false;
    }
  }
};
</script>

<style>
</style>
