<template>
  <div class="right-content" v-if="$store.state.num == 0">
    <div class="top-input-list">
      <ul class="clearfix">
        <li class="list-item clearfix">
          <div class="item-font">
            <label>排序</label>
          </div>
          <el-input class="input-sr" v-model="sorting"  placeholder="数字越大,排名越靠前,如果为空,默认排序方式为创建时间" clearable></el-input>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品名称</label>
          </div>
          <el-input class="input-sr" v-model="artistName" placeholder="艺术品名称" clearable></el-input>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>短标题</label>
          </div>
          <el-input class="input-sr" v-model="artJdDescribe" placeholder="显示于艺术品简单描述" clearable></el-input>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>详细文字描述</label>
          </div>
          <el-input class="dateils_ms" v-model="artXxDescribe"  type="textarea" :rows="5" placeholder="显示于艺术品的详情文字描述" clearable></el-input>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品分类</label>
          </div>
          <div class="artclassify-item" v-for="(item,index) in classifyList" :key="index">
            <input type="checkbox" :value="item" @click="selectBtn($event)" />
            <span>{{item}}</span>
          </div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品年份</label>
          </div>
          <el-input class="input-sr" v-model="artYear" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXX" clearable></el-input>
          <div class="xiala_btn" @click="showRiLi">
            <i class="iconfont icon-xiala"></i>
          </div>
          <Calendar
            class="position"
            v-if="isShowRl"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
          ></Calendar>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品作者</label>
          </div>
          <el-input class="input-sr" v-model="ArtAuthor" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXX" clearable></el-input>
          <div class="xiala_btn">
            <i class="iconfont icon-xiala"></i>
          </div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品价格</label>
          </div>
          <el-input class="input-sr" v-model="ArtPirce" placeholder="精确到0.01" clearable></el-input>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品封面</label>
          </div>
          <el-input  class="input-sr img-input" v-model="ArtCover" placeholder="正方形尺寸为:xxx" clearable></el-input>
          <input
            class="uploadBtn"
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="upArtCover"
            placeholder="正方形尺寸为:xxx"
          />

          <div class="select-img">选择图片</div>
          <div class="img-list">
            <div class="img-item" v-for="(item,index) in artCoverSrc" :key="index">
              <img :src="item" alt />
            </div>
          </div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>详细页banner</label>
          </div>
          <el-input  class="input-sr img-input" v-model="BannerImg" placeholder="建议尺寸为:xxx" clearable></el-input>
          <input
            class="uploadBtn"
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="upBannerImg"
            placeholder="建议尺寸为:xxx"
          />

          <div class="select-img">选择图片</div>
          <div class="img-list">
            <div class="img-item" v-for="(item,index) in upBannerSrc" :key="index">
              <img :src="item" alt />
            </div>
          </div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>商品视频</label>
          </div>
          <el-input class="input-sr img-input" v-model="goodVideo"  placeholder="格式为xxx,大小不可超过xxxMB" clearable></el-input>
          <input
            class="uploadBtn"
            type="file"
            accept="video/*"
            multiple="multiple"
            @change="upGoodsVideo"
            placeholder="建议尺寸为:xxx"
          />
          <div class="select-img">选择视频</div>
          <div class="img-list">
            <div class="video-item" v-for="(item,index) in updataVideoSrc" :key="index">
              <video :src="item" alt />
            </div>
          </div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>前端显示</label>
          </div>
          <div class="artclassify-item">
            <input type="checkbox" value="首页臻品推荐" />
            <span>首页臻品推荐</span>
          </div>
          <div class="artclassify-item">
            <input type="checkbox" value="ACS服务合同" />
            <span>ACS服务合同</span>
          </div>
          <div class="qr_ts">
            <span>确认选择后会在相应的页面显示该艺术品</span>
          </div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品特写</label>
          </div>
          <el-input class="input-sr img-input" v-model="ArtTexie" placeholder="请输入内容" clearable></el-input>
          <input
            class="uploadBtn"
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="updataTexie"
            placeholder="建议尺寸为:xxx"
          />
          <div class="select-img">选择图片</div>
          <div class="img-list">
            <div class="img-item" v-for="(item,index) in upArtTeXeSrc" :key="index">
              <img :src="item" alt />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Calendar from "vue-calendar-component";
export default {
  name: "dateilsModule",
  data() {
    return {
      classifyList: ["字画", "瓷器", "紫砂"],
      isShowRl: false, //是否显示日历
      upBannerSrc: [], //上传图片的路径
      updataVideoSrc: [], //上传商品视频的路径
      upArtTeXeSrc: [], //上传艺术品特写
      artCoverSrc: [], //上传艺术品封面
      artYear: "", //艺术品年份
      sorting:'',//排序输入框的值
      artistName:'',//艺术家名称
      artJdDescribe:'',//艺术品简单描述
      artXxDescribe:'',//艺术品详细描述
      ArtAuthor:'',//艺术品作者
      ArtPirce:'',//艺术品价格
      ArtCover:'',//艺术品封面
      BannerImg:'',//轮播图列表图片
      goodVideo:'',//商品视频列表
      ArtTexie:'',//艺术品特写
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    selectBtn(e) {
      console.log(e.target.checked);
      console.log(e.target.value);
    },
    //日历点击获取当前日期
    clickDay(data) {
      this.isShowRl = !this.isShowRl;
      this.artYear = data;
    },
    changeDate(data) {
      console.log(data); //左右点击切换月份
    },
    clickToday(data) {
      console.log(data); // 跳到了本月
    },
    //点击是否显示日历
    showRiLi() {
      this.isShowRl = !this.isShowRl;
    },
    //上传banner图片事件
    upBannerImg(event) {
      var url = "";
      for (var i = 0; i < event.target.files.length; i++) {
        //  console.log(event.target.files[i])
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(event.target.files[i]);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(event.target.files[i]);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(event.target.files[i]);
        }
        this.upBannerSrc.push(url);
      }
    },
    //上传商品视频
    upGoodsVideo() {
      var url = "";
      for (var i = 0; i < event.target.files.length; i++) {
        //  console.log(event.target.files[i])
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(event.target.files[i]);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(event.target.files[i]);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(event.target.files[i]);
        }
        this.updataVideoSrc.push(url);
      }
    },
    //上传艺术品特写
    updataTexie() {
      var url = "";
      for (var i = 0; i < event.target.files.length; i++) {
        //  console.log(event.target.files[i])
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(event.target.files[i]);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(event.target.files[i]);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(event.target.files[i]);
        }
        this.upArtTeXeSrc.push(url);
      }
    },
    //上传艺术品封面
    upArtCover() {
      var url = "";
      for (var i = 0; i < event.target.files.length; i++) {
        //  console.log(event.target.files[i])
        if (window.createObjectURL != undefined) {
          // basic
          url = window.createObjectURL(event.target.files[i]);
        } else if (window.URL != undefined) {
          // mozilla(firefox)
          url = window.URL.createObjectURL(event.target.files[i]);
        } else if (window.webkitURL != undefined) {
          // webkit or chrome
          url = window.webkitURL.createObjectURL(event.target.files[i]);
        }
        this.artCoverSrc.push(url);
      }
    }
  },

  components: {
    Calendar
  }
};
</script>

<style scoped>
.el-input__inner{
  border-color: #4a4a4a;
}
.position {
  position: absolute;
  z-index: 100;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}

.clearfix:after {
  content: ""; /* 内容为小点， 尽量加不要空， 否则旧版本浏览器有空隙 */
  display: block; /* 转换为块级元素 */
  height: 0; /* 高度为0 */
  visibility: hidden; /* 隐藏盒子 */
  clear: both; /* 清除浮动 */
}

.list-item {
  color: #333;
  margin-bottom: 20px;
  font-size: 14px;
  position: relative;
}
.list-item .input-sr {
  height: 40px;
  float: right;
  width: 83%;
  padding-left: 4px;
  z-index: 0;
}
.item-font {
  height: 40px;
  width: 16%;
  text-align: right;
  padding-right: 20px;
  line-height: 40px;
  float: left;
}
.list-item .dateils_ms {
  width: 83%;
  height: 180px;
  float: right;
  resize: none;
}
.artclassify {
  overflow: hidden;
}
.artclassify ul {
  width: 84%;
  overflow: hidden;
  float: right;
}
.artclassify-item {
  height: 40px;
  float: left;
  margin-right: 20px;
  line-height: 40px;
}
.artclassify-item input {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.art-font {
  width: 16%;
  float: left;
  text-align: right;
  padding-right: 20px;
}
.xiala_btn {
  position: absolute;
  width: 60px;
  height: 40px;
  background: #333;
  text-align: center;
  line-height: 40px;
  right: 0px;
  top: 0px;
  color: #f6f6f6;
}
.rili {
  position: absolute;
  bottom: 0px;
  left: 100px;
  z-index: 200;
}
.select-img {
  height: 40px;
  width: 100px;
  text-align: center;
  line-height: 40px;
  color: #aaa;
  position: absolute;
  top: 0px;
  right: 0px;
  border: 1px solid;
  background: #fff;
}
.img-input {
  margin-bottom: 10px;
}
.img-list {
  width: 84%;
  overflow: hidden;
  float: right;
}
.img-list .img-item {
  width: 20%;
  height: 100px;
  float: left;
  padding-left: 10px;
  margin-bottom: 10px;
}
.img-list .img-item:nth-child(5n + 1) {
  padding-left: 0;
}
.qr_ts {
  width: 84%;
  float: right;
  color: #aaa;
  font-size: 13px;
}
.uploadBtn {
  position: absolute;
  right: 0;
  width: 100px;
  height: 40px;
  z-index: 200;
  opacity: 0;
}
.video-item {
  width: 100%;
  float: right;
}
.video-item video {
  width: 100%;
}
</style>