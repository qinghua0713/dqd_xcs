Page({
  data: {
    imageUrl: [
      "/assets/image/tunnel_banner.png",
      "/assets/image/tunnel_banner2.png",
      "/assets/image/tunnel_banner.png",
    ],
    tabShow: false
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
  onLoad() {

  }
})