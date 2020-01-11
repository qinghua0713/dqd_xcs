<template>
  <div class="right-content" v-if="$store.state.num == 1">
    <div class="buySet-container">
      <ul>
        <li class="list-item">
          <div class="left-font">
            <span>下架艺术品</span>
          </div>
          <div class="right-info">
            <div class="option-item">
              <input type="checkbox" />
              <span class="xiajia">
                下架
                <span>(下架后艺术品将显示:已认购)</span>
              </span>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="left-font">
            <span>库存</span>
          </div>
          <div class="right-info">
              <el-input class="kucun" v-model="inventoryNum" placeholder="默认为1" clearable></el-input>
          </div>
        </li>
        <li class="list-item">
          <div class="left-font">
            <span>参与ACS服务</span>
          </div>
          <div class="right-info">
            <div class="option-item">
              <input type="checkbox" />
              <span>该艺术品允许参加ACS</span>
            </div>
            <div class="option-item">
              <input type="checkbox" />
              <span>该艺术品不允许参加ACS服务</span>
            </div>
          </div>
        </li>
        <li class="list-item">
          <div class="left-font">
            <span>购买方式</span>
          </div>
          <div class="right-info">
            <div class="option-item">
              <input type="checkbox" />
              <span>快递</span>
            </div>
            <div class="option-item">
              <span>邮费</span>
              <input class="youfei" v-model="price" placeholder="默认为1" @input="inputPrice" />
              <span>元</span>
            </div>
            <div class="option-item">
              <input type="checkbox" />
              <span>包邮</span>
            </div>
            <br />
            <div class="option-item">
              <input type="checkbox" />
              <span>寄卖</span>
            </div>
            <br />
            <div class="option-item">
              <input type="checkbox" />
              <span>寄存</span>
            </div>
            <div class="option-item">
              <span>寄存费用</span>
              <input class="youfei" type="text"   @input="inputPrice" />
              <span>元</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuySet",
  data() {
    return {
      price: "",
      inventoryNum:'',//库存数量
    };
  },
  methods: {
      inputPrice() {
    var reg = new RegExp("^[0-9]+([.]{1}[0-9]{0,2}){0,1}$");
    if (this.price == "") {
      console.log("金额不能为空");
    } else if (!reg.test(this.price)) {
      console.log('额度格式错误')
    }
  }
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.buySet-container ul {
  overflow: hidden;
}
.left-font {
  text-align: right;
  height: 40px;
  float: left;
  width: 16%;
  line-height: 40px;
  font-size: 13px;
}

.list-item {
  overflow: hidden;
}
.right-info {
  float: right;
  width: 84%;
  padding-left: 30px;
  line-height: 40px;
  font-size: 13px;
  color: #333;
}
input {
  vertical-align: middle;
  height: 16px;
  width: 16px;
}
.xiajia {
  color: #333;
  font-size: 13px;
}
.xiajia span {
  color: #aaa;
}
.right-info .kucun {
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  display: block;
  padding-left: 4px;
}
.option-item {
  display: inline-block;
  margin-right: 20px;
}
.youfei {
  height: 30px;
  width: 60px;
  border: 1px solid;
}
</style>