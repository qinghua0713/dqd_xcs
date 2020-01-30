<template>
  <div class="right-content" v-if="$store.state.num == 0">
    <div class="top-input-list">
      <ul>
        <li class="list-item">
          <div class="item-font">
            <label>排序</label>
          </div>
          <input class="input-sr" type="text" placeholder="数字越大,排名越靠前,如果为空,默认排序方式为创建时间" />
        </li>
        <li class="list-item">
          <div class="item-font">
            <label>艺术品名称</label>
          </div>

          <input class="input-sr" type="text" placeholder="艺术品名称" />
        </li>
        <li class="list-item">
          <div class="item-font">
            <label>短标题</label>
          </div>
          <input class="input-sr" type="text" placeholder="显示于艺术品简单描述" />
        </li>
        <li class="list-item">
          <div class="item-font">
            <label>详细文字描述</label>
          </div>
          <textarea class="dateils_ms" type="text" placeholder="显示于艺术品的详情文字描述" />
        </li>
        <li class="list-item">
          <div class="item-font">
            <label>艺术品分类</label>
          </div>
          <div class="artclassify-item" v-for="(item,index) in classifyList" :key="index">
            <input type="checkbox" :value="item" />
            <span>{{item}}</span>
          </div>
        </li>
        <li class="list-item">
          <div class="item-font">
            <label>艺术品年份</label>
          </div>
          <input class="input-sr" type="text" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXX" />
          <div class="xiala_btn" @click="showRiLi">
            <i class="iconfont icon-xiala"></i>
          </div>
        </li>
        <li class="list-item">
          <div class="item-font">
            <label>艺术品作者</label>
          </div>
          <input class="input-sr" type="text" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXX" />
          <div class="xiala_btn">
            <i class="iconfont icon-xiala"></i>
          </div>
        </li>
        <li class="list-item">
          <div class="item-font">
            <label>艺术品价格</label>
          </div>
          <input class="input-sr" type="text" placeholder="精确到0.01" />
        </li>
        <li class="list-item">
          <div class="item-font">
            <label>艺术品封面</label>
          </div>
          <input class="input-sr img-input" type="text" placeholder="正方形尺寸为:xxx" />
          <div class="select-img">选择图片</div>
        </li>
        <li class="list-item">
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
        <li class="list-item">
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
        <li class="list-item">
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
        <li class="list-item">
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
export default {
  name: "dateilsModule",
  data() {
    return {
      classifyList: ["字画", "瓷器", "紫砂"],
      isShowRl: false,
      updataSrc: []
    };
  },
  methods: {
    showRiLi() {
      this.isShowRl = !this.isShowRl;
    },
    handleFileChange(event) {
      var url = "";
      console.log(event);
      
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
         this.updataSrc.push(url)

      }
         console.log(this.updataSrc)
     
      console.log(this.updataSrc.length);
    }
  }
};
</script>

<style scoped>
.list-item {
  color: #333;
  overflow: hidden;
  margin-bottom: 20px;
  font-size: 14px;
  position: relative;
  z-index: 100;
}
.list-item .input-sr {
  height: 40px;
  float: right;
  border: 1px solid rgb(169, 169, 169);
  width: 84%;
  padding-left: 4px;
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
  width: 84%;
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