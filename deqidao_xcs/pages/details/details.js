Page({
  data: {
    isShow: false,//用来判断是否显示全部内容
    imageUrl: [
      "/assets/image/tunnel_banner.png",
      "/assets/image/tunnel_banner2.png",
      "/assets/image/tunnel_banner.png",
      "/assets/image/tunnel_banner2.png",
      "/assets/image/tunnel_banner.png",
    ],//轮播图数据列表
    current: 0//轮播图当前位置
  },
  //点击显示全部
  viewArr() {
    this.setData({
      isShow: !this.data.isShow
    })
    console.log(this.data.isShow)
  },
  //轮播图改变触发
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })
  },

})