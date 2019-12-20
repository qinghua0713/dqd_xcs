var http = require("../../utils/ajax.js")
Page({
  data: {
    imgUrl: [
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png"
    ],
    current: 0,
    isSuccee: true,
    second: 5,
    time: null
  },
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  bindclick() {
    var that = this
    that.setData({
      isSuccee: false
    })
    if (!that.data.isSuccee) {
      that.data.time = setInterval(function () {
        that.setData({
          second: that.data.second - 1
        })
        if (that.data.second < 1) {
          clearInterval(that.data.time)
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }, 1000)
    }

  },
  returnMy() {
    clearInterval(this.data.time)
    wx.switchTab({
      url: '/pages/my/my',
    })
  },

  onShow() {

  },
  onLoad(e) {

  },
  onUnload() {


  }
})