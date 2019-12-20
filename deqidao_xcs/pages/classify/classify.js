Page({
  data: {
    showTop: true,
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
  returnHome() {
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  onPageScroll(e) {
    if (e.scrollTop > 100) {
      this.setData({
        showTop: false
      })
    } else {
      this.setData({
        showTop: true
      })
    }
  },
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  onLoad() {

  }

})