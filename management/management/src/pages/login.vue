<template>
  <div class="container">
    <div class="login-container">
      <h2 class="ts_title">请登陆:</h2>
      <div class="login_item">
        <div class="icon_cent">
          <label class="iconfont icon-zhanghao"></label>
        </div>
        <input class="userName" type="text" placeholder="用户名" />
      </div>
      <div class="login_item">
        <div class="icon_cent">
          <label class="iconfont icon-mima"></label>
        </div>
        <input class="userPsd" type="password" placeholder="密码" />
      </div>

      <button class="login_btn" @click="loginBtn">登陆</button>
      <div class="change_mima_btn">
        <a href></a>
        <router-link to="/resetPasswords">忘记了您的密码或用户名?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  mounted() {
    console.log("这都行");
  },
  methods: {
    loginBtn() {
      sessionStorage.setItem("toke", 0);
      console.log(!sessionStorage.getItem("toke"))
      if (sessionStorage.getItem("toke")) {
        this.$router.push({
          path: "/index"
        });
      }

      console.log(1);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/login.css";
</style>