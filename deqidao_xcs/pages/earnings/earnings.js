//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    showTop: false,//用来判断是否显示返回顶部
  },
  //点击返回首页
  returnHome() {
    console.log(1)
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  //判断返回按钮是否显示
  onPageScroll(e) {
    console.log(e.scrollTop)
    if (e.scrollTop > 100) {
      this.setData({
        showTop: true
      })
    } else {
      this.setData({
        showTop: false
      })
    }
  },
  // 点击回到顶部
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  onLoad(option) {
    var that = this;

  },
  onShow: function (e) {
  },
  
})
