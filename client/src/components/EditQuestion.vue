<template>
<div>
    <div class="card mb-4">
        <div class="card-body">
            <h2 class="card-title">Edit Question</h2>
            <form onSubmit ="return false">
            <div class="form-group">
                <label for="validationDefault01">Title:</label>
                <input type="text" class="form-control" id="validationDefault01"  v-model="question.title" required>
            </div>
            <div class="form-group">
                <label for="validationDefault01">Question:</label>
                <input type="text" class="form-control" id="validationDefault01" v-model="question.question" required>
            </div>                  
            <button class="btn btn-primary" type="submit" v-on:click="updateQuestion(question._id)">Submit</button>
            <router-link to='/'>
            <button class="btn btn-secondary" type="button">Cancel</button>
            </router-link>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
// import router from '@/router.js'

export default {
    data:function(){
        return{

        }
    },
    methods:{
        ...mapActions(["editQuestion","getOneQuestion"]),
        updateQuestion(id){
            let data = {
                idQuestion:id,
                title: this.question.title,
                question: this.question.question
            }
            this.editQuestion(data)
        }
    },
    computed:{
        ...mapState(["question"])
    },  

}
</script>

<style>

</style>
