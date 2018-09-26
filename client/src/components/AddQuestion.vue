<template>
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title">Add Question</h2>
            <form onSubmit ="return false">
            <div class="form-group">
                <label for="validationDefault01">Title:</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder="Question title" v-model="addTitle" required>
            </div>
            <div class="form-group">
                <label for="validationDefault01">Question:</label>
                <input type="text" class="form-control" id="validationDefault01" placeholder="Question description" v-model="addContent" required>
            </div>                
            <button class="btn btn-primary" type="submit" v-on:click="addQuestion">Submit</button>
            <router-link to='/'>
            <button class="btn btn-secondary" type="button">Cancel</button>
            </router-link>
            </form>
            <div v-if="message" class="alert alert-warning alert-dismissible fade show" role="alert">
                {{message}}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AddQuestion",
  data: function() {
    return {
      addTitle: "",
      addContent: ""
    };
  },
  methods: {
    ...mapActions(["createQuestion"]),
    addQuestion() {
      let data = {
        title: this.addTitle,
        question: this.addContent
      };
      this.createQuestion(data);
      this.addTitle = ''
      this.addContent = ''
    }
  },
  computed:{
      ...mapState(["message"])
  }
};
</script>

<style>
</style>
