var http = require("../../utils/ajax.js")
import { HTTP } from "../../utils/request.js"
Page({
  data: {
    imgUrl: [
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png"
    ],
    current: 0,
  },
  swiperChange(e) {
    var that = this;
      that.setData({
        current: e.detail.current,
      })
    
  },
  onLoad(e) {
    console.log(e)
    var ajax = new HTTP()

  }
})