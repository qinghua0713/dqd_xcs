<template>
  <div class="right-content" v-if="$store.state.num == 0">
    <div class="top-input-list">
      <ul class="clearfix">
        <li class="list-item clearfix">
          <div class="item-font">
            <label>排序</label>
          </div>
          <input class="input-sr" type="text" placeholder="数字越大,排名越靠前,如果为空,默认排序方式为创建时间" />
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品名称</label>
          </div>

          <input class="input-sr" type="text" placeholder="艺术品名称" />
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>短标题</label>
          </div>
          <input class="input-sr" type="text" placeholder="显示于艺术品简单描述" />
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>详细文字描述</label>
          </div>
          <textarea class="dateils_ms" type="text" placeholder="显示于艺术品的详情文字描述" />
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品分类</label>
          </div>
          <div class="artclassify-item" v-for="(item,index) in classifyList" :key="index">
            <input type="checkbox" :value="item" />
            <span>{{item}}</span>
          </div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品年份</label>
          </div>
          <input
            class="input-sr"
            type="text"
            :value="artYear"
            placeholder="XXXXXXXXXXXXXXXXXXXXXXXXX"
          />
          <div class="xiala_btn" @click="showRiLi">
            <i class="iconfont icon-xiala"></i>
          </div>
          <Calendar
          class="position"
            v-if="isShowRl"
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
          ></Calendar>
          <!-- <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker> -->
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品作者</label>
          </div>
          <input class="input-sr" type="text" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXX" />
          <div class="xiala_btn">
            <i class="iconfont icon-xiala"></i>
          </div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品价格</label>
          </div>
          <input class="input-sr" type="text" placeholder="精确到0.01" />
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>艺术品封面</label>
          </div>
          <input class="input-sr img-input" type="text" placeholder="正方形尺寸为:xxx" />
          <div class="select-img">选择图片</div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>详细页banner</label>
          </div>
          <input class="input-sr img-input" type="text" placeholder="建议尺寸为:xxx" />
          <input
            class="uploadBtn"
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="handleFileChange"
            placeholder="建议尺寸为:xxx"
          />

          <div class="select-img">选择图片</div>
          <div class="img-list">
            <div class="img-item" v-for="(item,index) in updataSrc" :key="index">
              <img :src="item" alt />
            </div>
          </div>
        </li>
        <li class="list-item clearfix">
          <div class="item-font">
            <label>商品视频</label>
          </div>
          <input class="input-sr img-input" type="text" placeholder="格式为xxx,大小不可超过xxxMB" />
          <input
            class="uploadBtn"
            type="file"
            accept="video/*"
            multiple="multiple"
            @change="handleFileChange"
            placeholder="建议尺寸为:xxx"
          />
          <div class="select-img">选择视频</div>
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
          <input class="input-sr img-input" type="text" />
          <input
            class="uploadBtn"
            type="file"
            accept="image/*"
            multiple="multiple"
            @change="handleFileChange"
            placeholder="建议尺寸为:xxx"
          />
          <div class="select-img">选择图片</div>
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
      isShowRl: false,
      updataSrc: [],
      artYear: "", //艺术品年份
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: ""
    };
  },
  methods: {
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
    showRiLi() {
      this.isShowRl = !this.isShowRl;
    },
    handleFileChange(event) {
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
        this.updataSrc.push(url);
      }
      console.log(this.updataSrc);

      console.log(this.updataSrc.length);
    }
  },
  components: {
    Calendar
  }
};
</script>

<style scoped>
.position{
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
  border: 1px solid rgb(169, 169, 169);
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
  background: #f6f6f6;
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
</style>