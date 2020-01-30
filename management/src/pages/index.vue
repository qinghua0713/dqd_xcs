<template>
  <div class="container">
    <Nav></Nav>
    <section>
      <div class="mian-container">
        <LeftMenu />
        <div class="right-container">
          <div class="content-item">
            <div class="search-district">
              <div class="main-seach">
                <input type="text" placeholder="请输入艺术品名称/艺术品编号/艺术品合同" />
                 <el-button class="main-search-btn" type="info">搜索</el-button>
              </div>
              <el-button class="add_art"  @click="goToDateils" type="info">添加艺术品</el-button>
            </div>
            <div class="bg333"></div>
            <div class="data-container">
              <ul>
                <li class="data-item" >
                  <i class="data-index">01</i>
                  <img src="../assets/image/ysp_img.png" alt />
                  <span class="art_name">艺术品名称</span>
                  <span class="art_price">￥000,000,000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Nav from '../components/topNav'
import LeftMenu from '../components/leftMenu'
export default {
  name: "index",
  data() {
    return {
    
    };
  },
  methods: {
    goToDateils(){
       this.$router.push('/dateils')
    }
  },

  components: {
    Nav,
    LeftMenu
  }
};
</script>

<style scoped>
</style>