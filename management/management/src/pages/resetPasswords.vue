<template>
  <div class="container">
    <div class="change-psd">
      <h2 class="change-title">密码重设</h2>
      <div class="prompt">
        <p>忘记了你的密码？请在下面输入你的 e-mail 地址，我们将把新密码设置说明通过邮件发送给你。</p>
      </div>
      <div class="email-container">
        <div class="email-icon">
          <label class="iconfont icon-youxiang"></label>
        </div>
        <input type="email" v-model="emailVal" @input="emailYz" placeholder="E-mail地址" />
      </div>
      <div class="reset_btn">
        <button>重置密码</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "resetPasswords",
  data() {
    return {
      emailVal: ""
    };
  },
  methods: {
    emailYz() {
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if (!reg.test(this.emailVal)) {
        console.log("邮箱格式错误");
      } else {
        console.log("恭喜你输入正确，奖励一个么么哒");
      }
    }
  }
};
</script>

<style scoped>
@import "../assets/css/resetPasswords.css";
</style>