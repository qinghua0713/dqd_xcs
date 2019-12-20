Page({
  data: {
    imageUrl: [
      "/assets/image/tunnel_banner.png",
      "/assets/image/tunnel_banner2.png",
      "/assets/image/tunnel_banner.png",
    ],//轮播图数据列表
    tabShow: true,//用来判断显示tab
    current: 0,//轮播图的当前下标
    isPlay:false//用来判断是否显示播放按钮
  },
  //点击显示tab第n项
  showACS() {
    this.setData({
      tabShow: true
    })
  },
    //点击显示tab第n项
  showArtis() {
    this.setData({
      tabShow: false
    })
  },
  // 轮播图改变触发
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  // 点击播放，隐藏播放按钮与视频封面
  videoPlay(){
      this.setData({
        isPlay:!this.data.isPlay
      })
    var videoplay = wx.createVideoContext("myVideo")
    videoplay.play()
  },
  onLoad() {

  }
})