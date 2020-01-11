<template>
  <div class="nav">
    <nav>
      <div class="nav">
        <div class="left-search">
          <h1 class="logo_title">德其道官网</h1>
          <input type="search" class="search" />
          <button class="search_btn" @click="showXiaLa">
            <i class="iconfont icon-sousuo"></i>
            搜索
            <i class="iconfont icon-xiala"></i>
          </button>
          <div class="xiala_content" v-if="isXiaLa">
            <ul>
              <li class="search-item" v-for="(item,index)  in options" :key="index">
                <i class="iconfont icon-sousuo"></i>
                <router-link :to="item.value">{{item.label}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="right_menu">
          <div class="right-nav">
            <ul>
              <li :class="isShowAdd ?  'menu-item bgBlack':'menu-item'  " @click="addClick">
                <div class="item-info">
                  <i class="iconfont icon-icon"></i>
                  <span>增加</span>
                  <i class="iconfont icon-xiala"></i>
                </div>
                <div class="xiala_content" v-if="isShowAdd">
                  <ul>
                    <li class="search-item" v-for="(item,index)  in options" :key="index">
                      <i class="iconfont icon-icon"></i>
                      <router-link :to="item.value">{{item.label}}</router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li :class="isShowZT ?  'menu-item bgBlack':'menu-item'  " @click="themeClick">
                <div class="item-info">
                  <i class="iconfont icon-zhuti"></i>
                  <span>主题</span>
                  <i class="iconfont icon-xiala"></i>
                </div>
                <div class="xiala_content" v-if="isShowZT">
                  <ul>
                    <li class="search-item" v-for="(item,index)  in options" :key="index">
                      <i class="iconfont icon-icon"></i>
                      <router-link :to="item.value">{{item.label}}</router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li :class="isShowUser ?  'menu-item bgBlack':'menu-item'  " @click="userClick">
                <div class="item-info">
                  <span>欢迎，情话</span>
                  <i class="iconfont icon-xiala"></i>
                </div>
                <div class="xiala_content" v-if="isShowUser">
                  <ul>
                    <li class="search-item" v-for="(item,index)  in options" :key="index">
                      <i class="iconfont icon-icon"></i>
                      <router-link :to="item.value">{{item.label}}</router-link>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="menu-item" @click="cancellationClick">
                <div class="item-info">
                  <span>注销</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      options: [
        {
          value: "/xadmin/1",
          label: "黄金糕"
        },
        {
          value: "/xadmin/2",
          label: "双皮奶"
        },
        {
          value: "/xadmin/3",
          label: "蚵仔煎"
        },
        {
          value: "/xadmin/4",
          label: "龙须面"
        },
        {
          value: "/xadmin/5",
          label: "北京烤鸭"
        }
      ],

      isXiaLa: false, //搜索下拉判断
      isShowAdd: false, //增加按钮下拉判断
      isShowZT: false, //主题按钮下拉判断
      isShowUser: false, //用户按钮下拉判断
   
    };
  },
  methods: {
    //点击取反显示搜索框下拉
    showXiaLa() {
      this.isXiaLa = !this.isXiaLa;
    },
    //点击隐藏其他两个取反当前开关
    addClick(e) {
      this.isShowZT = false;
      this.isShowUser = false;
      this.isShowAdd = !this.isShowAdd;
    },
    //点击隐藏其他两个取反当前开关
    themeClick(e) {
      this.isShowAdd = false;
      this.isShowUser = false;
      this.isShowZT = !this.isShowZT;
    },
    //点击隐藏其他两个取反当前开关
    userClick(e) {
      this.isShowAdd = false;
      this.isShowZT = false;
      this.isShowUser = !this.isShowUser;
    },
    //点击注销
    cancellationClick() {
      
        this.$confirm('确定退出登陆吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              sessionStorage.setItem('toke',1)
               this.$router.push({
          path:'/'
        })
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
      
  
       
    }
  },

};
</script>

<style scoped>
</style>