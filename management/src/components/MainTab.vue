<template>
  <div class="leftmenu">
    <ul>
      <li
        :class="$store.state.num == index ? 'men-item  bg_bor':'men-item '"
        v-for="(item,index) in tabList"
        :key="index"
        @click="currentIndex(index)"
      >{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MainTab",
  data() {
    return {
      tabList: ["艺术品基本详情", "购买设置", "ACS服务合同"],

      currentIdx:0
    };
  },
  methods: {
    currentIndex(index) {
      this.currentIdx = (this.$store.state.num = index);
      sessionStorage.setItem("num", this.currentIdx);
      console.log(this.$store.state.num)
    }
  },

};
</script>

<style scoped>
.leftmenu {
  width: 12%;
  color: #aaa;
  text-align: right;
  float: left;
}
.men-item {
  height: 30px;
  padding-right: 10px;
  font-size: 12px;
  line-height: 30px;
  margin-bottom: 10px;
  position: relative;
}
.bg_bor {
  width: 101%;
  border: 1px solid #333;
  border-right: none;
  background: #fff;
  color: #333;
}
</style>