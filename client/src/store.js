import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: '',
    isLogout: false,
    allQuestion: [],
    myQuestion: [],
    question: '',
    isDelete: '',
    answer: '',
    message: '',
    user: ''
  },
  mutations: {
    IS_LOGIN(state, payload) {
      state.isLogin = payload
    },
    IS_LOGOUT(state, payload) {
      state.isLogout = payload
    },
    ALL_QUESTION(state, payload) {
      state.allQuestion = payload
    },
    MY_QUESTION(state, payload) {
      state.myQuestion = payload
    },
    SET_QUESTION(state, payload) {
      state.question = payload
    },
    SET_ANSWER(state, payload) {
      state.answer = payload
    },
    SET_MESSAGE(state, payload) {
      state.message = payload
    },
    SET_USER(state, payload) {
      state.user = payload
    },
  },
  actions: {
    login({ commit }, data) {
      axios({
        method: "POST",
        url: `${api}/users/login`,
        data: data
      })
        .then(function ({ data }) {
          // alert('login success')
          commit('IS_LOGIN', data.token)
          localStorage.setItem("token", data.token)
        })
        .catch(function (err) {
          alert('login failed')
          console.log(err.message);
        })
    },
    register(context, data) {
      axios({
        method: "POST",
        url: `${api}/users/register`,
        data: data
      })
        .then(function ({ data }) {
          alert('register success')
        })
        .catch(function (err) {
          // alert('register failed')
          console.log(err.message);
        })
    },
    logout({ commit }, data) {
      localStorage.clear()
      if (this.isLogout) {
        commit('IS_LOGOUT', false)
      } else {
        commit('IS_LOGOUT', true)
      }
    },
    getAllQuestion({ commit }, data) {
      axios({
        method: "GET",
        url: `${api}/questions`
      })
        .then(function ({ data }) {
          commit('ALL_QUESTION', data.data)
        })
        .catch(function (err) {
          console.log(err.message);
        })
    },
    getMyQuestion({ commit }, data) {
      axios({
        method: "GET",
        url: `${api}/questions/user`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function ({ data }) {
          commit('MY_QUESTION', data.data)
        })
        .catch(function (err) {
          console.log(err.message);
        })
    },
    getOneQuestion({ commit }, data) {
      axios({
        method: "GET",
        url: `${api}/questions/${data}`
      })
        .then(function ({ data }) {
          commit('SET_QUESTION', data.data)
        })
        .catch(function (err) {
          console.log(err.message);
        })
    },
    createQuestion({ commit }, data) {
      let self = this
      axios({
        method: "POST",
        url: `${api}/questions`,
        data: data,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function ({ data }) {
          commit('SET_QUESTION', data.data)
          commit('SET_MESSAGE', 'Success')
        })
        .catch(function (err) {
          console.log(err.message);
          commit('SET_MESSAGE', 'Failed')
        })
    },
    deleteQuestion({ commit }, data) {
      axios({
        method: "DELETE",
        url: `${api}/questions/${data}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function (result) {
          commit('SET_QUESTION', result)
        })
        .catch(function (err) {
          console.log(err.message);
        })
    },
    editQuestion({ commit }, data) {
      axios({
        method: "PUT",
        url: `${api}/questions/${data.idQuestion}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: data
      })
        .then(function (result) {
          commit('SET_QUESTION', result)
        })
        .catch(function (err) {
          console.log(err.message);
        })
    },
    upVoteQuestion({ commit }, data) {
      axios({
        method: "POST",
        url: `${api}/questions/upvote/${data}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function ({ data }) {
          commit('SET_QUESTION', data.data)
        })
        .catch(function (err) {
          alert('You cant vote your own question')
          console.log(err.message)
        })
    },
    downVoteQuestion({ commit }, data) {
      axios({
        method: "POST",
        url: `${api}/questions/downvote/${data}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function ({ data }) {
          commit('SET_QUESTION', data.data)
        })
        .catch(function (err) {
          alert('You cant vote your own question')
          console.log(err.message)
        })
    },
    createAnswer({ commit }, data) {
      axios({
        method: "POST",
        url: `${api}/answers/${data.idQuestion}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: data
      })
        .then(function (result) {          
          // this.getOneAnswer()
          // router.push(`/question/${data.idQuestion}`)
          commit('SET_QUESTION', result)
        })
        .catch(function (err) {
          console.log(err.message);
        })
    },
    editAnswer({ commit }, data) {
      axios({
        method: "PUT",
        url: `${api}/answers/${data.idAnswer}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: data
      })
        .then(function ({ data }) {
          commit('SET_QUESTION', data.data)
        })
        .catch(function (err) {
          console.log(err.message);
        })
    },
    getOneAnswer({ commit }, data) {
      axios({
        method: "GET",
        url: `${api}/answers/${data}`,
      })
        .then(function ({data}) {
          commit('SET_QUESTION', data.data)
        })
        .catch(function (err) {
          console.log(err.message);
        })
    },
    upVoteAnswer({ commit }, data) {
      axios({
        method: "POST",
        url: `${api}/answers/upvote/${data}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function ({ data }) {
          commit('SET_QUESTION', data.data)
        })
        .catch(function (err) {
          alert('You cant vote your own answer')
          console.log(err.message);
        })
    },
    downVoteAnswer({ commit }, data) {
      axios({
        method: "POST",
        url: `${api}/answers/downvote/${data}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function ({ data }) {
          commit('SET_QUESTION', data.data)
        })
        .catch(function (err) {
          alert('You cant vote your own answer')
          console.log(err.message);
        })
    },
    getOneUser({ commit }) {
      axios({
        method: "GET",
        url: `${api}/users`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(function ({ data }) {
          commit('SET_USER', data.data)
        })
        .catch(function (err) {
          console.log(err.message);
        })
    }
  },
})
