<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <router-link to="/">
          <a class="navbar-brand text-white"><i class="fas fa-newspaper"></i></a>
        </router-link>
        <router-link to="/">
          <a class="navbar-brand text-white">Overflow</a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link">
                <router-link class="text-white" to="/">Home</router-link>
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item ">
              <a class="nav-link ">
                <router-link class="text-white" to="/about">About</router-link>
              </a>
            </li>

            <li class="nav-item" v-if="!token">
              <div class="dropdown">
                <button class="btn bg-transparent dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Login
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <!-- loginform -->
                  <form class="px-4 py-3" onSubmit="return false">
                    <div class="form-group">
                      <label for="exampleDropdownFormEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleDropdownFormEmailLogin" placeholder="email@example.com" v-model="loginEmail" required>
                    </div>
                    <div class="form-group">
                      <label for="exampleDropdownFormPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleDropdownFormPasswordLogin" placeholder="Password" v-model="loginPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary" v-on:click="onLogin">Sign in</button>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                  </form>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">New around here? Sign up</a>
            <!-- loginform -->
                </div>
              </div>
            </li>

            <li class="nav-item" v-if="!token">
              <div class="dropdown">
                <button class="btn bg-transparent dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Register
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <!-- loginform -->
                  <form class="px-4 py-3" onSubmit="return false">
                    <div class="form-group">
                      <label for="exampleDropdownFormEmail1">Name</label>
                      <input type="text" class="form-control" id="exampleDropdownFormName1" placeholder="your name" v-model="registerName" required>
                    </div>
                    <div class="form-group">
                      <label for="exampleDropdownFormEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" v-model="registerEmail" required>
                    </div>
                    <div class="form-group">
                      <label for="exampleDropdownFormPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" v-model="registerPassword" required>
                    </div>
                    <button type="submit" class="btn btn-primary" v-on:click="onRegister">Sign up</button>
                  </form>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Already have a account? Please Login</a>
            <!-- loginform -->
                </div>
              </div>
            </li>
            <li class="nav-item" v-if="token">
              <a  class="btn nav-link text-white" v-on:click="onLogout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Navbar",
  data: function() {
    return {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
      loginEmail: "",
      loginPassword: "",
      token: false
    };
  },
  computed: {
    ...mapState(["isLogin", "isLogout"])
  },
  methods: {
    ...mapActions(["login", "register", "logout"]),
    onLogin() {
      let data = {
        email: this.loginEmail,
        password: this.loginPassword
      };
      this.login(data);
      this.loginEmail = "";
      this.loginPassword = "";
    },
    onLogout() {
      this.logout();
      this.$router.replace("/");
    },
    onRegister() {
      let data = {
        name: this.registerName,
        email: this.registerEmail,
        password: this.registerPassword
      };
      this.register(data);
      this.registerName = "";
      this.registerEmail = "";
      this.registerPassword = "";
    }
  },
  watch: {
    isLogin: function() {
      this.token = true;
      //   this.$router.push('/')
    },
    isLogout: function() {
      this.token = false;
    }
  },
  created() {
    let checkToken = localStorage.getItem("token");
    if (checkToken) {
      this.token = true;
    }
  }
};
</script>

<style>
</style>
