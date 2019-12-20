Page({
    data: {
        isShow:false,
      imageUrl: [
        "/assets/image/tunnel_banner.png",
        "/assets/image/tunnel_banner2.png",
        "/assets/image/tunnel_banner.png",
        "/assets/image/tunnel_banner2.png",
        "/assets/image/tunnel_banner.png",
      ],
      current:0
      },
  viewArr(){
     this.setData({
       isShow: !this.data.isShow
     })
     console.log(this.data.isShow)
  },
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })
  },
    
})