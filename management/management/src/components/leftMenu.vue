<template>
  <div class="left-menu">
    <div class="mian-menu">
      <ul>
        <li
          :class="current == index ?'mian-menu-list current_red':'mian-menu-list'"
          v-for="(item,index) in menuList"
          :key="index"
        >{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
  data() {
    return {
      menuList: ["Banner管理", "搜索管理", "咨询管理", "艺术品档案"],
      current: 0 //给当前菜单添加样式
    };
  },
  mounted() {
    this.current = this.menuList.length - 1;
  }
};
</script>

<style scoped>
</style>