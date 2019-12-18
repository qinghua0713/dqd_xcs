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
    console.log(e)
    that.setData({
      current: e.detail.current,
    })

  },
  returnHome() {
    console.log(1)
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  onPageScroll(e) {
    console.log(e.scrollTop)
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