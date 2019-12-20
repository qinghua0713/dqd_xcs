Page({
  data: {
    imageUrl: [
      "/assets/image/tunnel_banner.png",
      "/assets/image/tunnel_banner2.png",
      "/assets/image/tunnel_banner.png",
    ],
    tabShow: true,
    current:0
  },
  showACS() {
    this.setData({
      tabShow: true
    })
  },
  showArtis() {
    this.setData({
      tabShow: false
    })
  },
  swiperChange(e) {
    var that = this;
      that.setData({
        current: e.detail.current,
      })

  },
  onLoad() {

  }
})