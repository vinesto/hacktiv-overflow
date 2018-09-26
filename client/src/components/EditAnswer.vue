<template>
<div>
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title">Edit Answer</h2>
            <form onSubmit ="return false">
            <div class="form-group">
                <label for="validationDefault01">Answer:{{question}}</label>
                <input type="text" class="form-control" id="validationDefault01" v-model="question.answer" required>
            </div>                 
            <button class="btn btn-primary" type="submit" v-on:click="updateAnswer(question._id)">Submit</button>
            <router-link to='/'>
            <button class="btn btn-secondary" type="button">Cancel</button>
            </router-link>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions(["getOneAnswer", "editAnswer"]),
    updateAnswer(id){
        let data = {
            idAnswer : id,
            answer:this.question.answer
        }
        this.editAnswer(data)
    }
  },
  computed:{
      ...mapState(['question'])
  },
  created() {
      console.log(this.$route.params.id,'ooooooo');
      
      this.getOneAnswer(this.$route.params.id)
  },
};
</script>

<style>
</style>
