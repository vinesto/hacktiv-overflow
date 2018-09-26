<template>
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title">{{question.title}}</h2>
            <p class="card-text">{{question.question}}</p>
            <router-link to='/'>
            <button class="btn btn-secondary" type="button">Close</button>
            </router-link>
        </div>
        <div class="card-footer bg-dark ">
            <div class="card bg-dark">
                <div class="card-header bg-success">
                    Question answer
                </div>

                <div>
                    <router-view></router-view>
                </div>
                <div class="card-body" v-for="(answer, index) in question.answerId" :key="index">
                    <div class="card">
                        <div class="card-body">
                            {{answer.userName}} : {{answer.answer}}
                        </div>
                        <div>
                            <div>
                                <router-link :to="`/edit/answer/${answer._id}`">
                                <i class="btn far fa-edit"></i>
                                </router-link>
                                <i class="btn far fa-thumbs-up" v-on:click="upVoteAnswer(answer._id)">{{answer.upVote.length}}</i>
                                <i class="btn far fa-thumbs-down" v-on:click="downVoteAnswer(answer._id)">{{answer.downVote.length}}</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            <div class="form-group">
                <label for="comment">Input:</label>
                <textarea class="form-control" rows="5" id="comment" v-model="inputAnswer"></textarea>
                <button class="btn btn-primary" type="submit" v-on:click="addAnswer(question._id)">Add Answer</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: function() {
    return {
      inputAnswer: ""
    };
  },
  props: ['id'],
  methods: {
    ...mapActions([
      "getOneQuestion",
      "createAnswer",
      "upVoteAnswer",
      "downVoteAnswer"
    ]),
    addAnswer(id) {
      let data = {
        idQuestion: id,
        answer: this.inputAnswer
      };
      this.createAnswer(data).then(() => {
        this.getOneQuestion(this.questionId)
      })
     }
  },
  computed: {
    ...mapState(["question","questionId"])
  },
  created() {
    this.getOneQuestion(this.$route.params.id);
  },
  watch: {
    question: function() {
        console.log('masuk kesini')
    //   this.getOneQuestion(this.questionId);
    }
  }
};
</script>

<style>
</style>
