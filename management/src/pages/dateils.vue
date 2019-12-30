<template>
  <div class="dateils">
    <Nav />
    <section>
      <div class="mian-container">
        <LeftMenu />
        <div class="right-container">
          <div class="dateils-main">
            <div class="search-district">
              <div class="main-seach">
                <input type="text" placeholder="请输入艺术品名称/艺术品编号/艺术品合同" />
                <button class="main-search-btn">搜索</button>
              </div>
              <div class="btn-hz">
                <button class="add_art">添加艺术品</button>
                <button class="return_btn" @click="returnList">返回列表</button>
              </div>
            </div>

            <div class="tab-container">
              <MainTab />
              <dateilsModule />
              <BuySet />
              <ACS />
            </div>
            <button class="save-btn">保存艺术品</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Nav from "../components/topNav";
import LeftMenu from "../components/leftMenu";
import MainTab from "../components/MainTab";
import dateilsModule from "../components/dateilsModule";
import BuySet from "../components/buySet";
import ACS from "../components/ACS";
export default {
  name: "dateils",
  data() {
    return {};
  },
  methods: {
    returnList() {
      this.$router.push("/index");
    }
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (from.path == "/dateils") {
       this.$store.state.num = 0//页面离开恢复到默认显示第一个tab选项
    }
    next();
  },
  components: {
    Nav, //顶部导航组件
    LeftMenu, //首页左边菜单组件
    MainTab, //详情页的tab菜单组件
    dateilsModule, //详情选项的组件
    BuySet, //购买设置组件
    ACS //ACS组件
  }
};
</script>

<style scoped>
@import url("../assets/css/dateils.css");
</style>