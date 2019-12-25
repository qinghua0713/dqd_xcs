//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showTop: false,//判断返回按钮是否显示
    userInfo: {},//用户信息
    hasUserInfo: false,
    isPlay: false,//用来判断是否显示播放按钮
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperIndex: 2,//swiper当前下标
    imgurl: [
      {
        src: "/assets/image/ysp_img.png",
        name: "XXXXX"
      },
      {
        src: "/assets/image/ysp_img.png",
        name: "常勇钢"
      },
      {
        src: "/assets/image/ysp_img.png",
        name: "陈 冰"
      },
      {
        src: "/assets/image/ysp_img.png",
        name: "杨永亮"
      },
      {
        src: "/assets/image/ysp_img.png",
        name: "XXXXX"
      },
      {
        src: "/assets/image/ysp_img.png",
        name: "常勇钢"
      },
      {
        src: "/assets/image/ysp_img.png",
        name: "陈 冰"
      },
      {
        src: "/assets/image/ysp_img.png",
        name: "杨永亮"
      },

    ],

  },
  // 判断返回按钮是否显示
  onPageScroll(e) {
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
  //点击跳转详情
  goToDateils(){
    wx.navigateTo({
      url: `/pages/classify/classify?value=艺术家&index=0`,
    })
  },
  //点击跳转tunnel页面
  goToTunnel(){
   wx.switchTab({ url: '/pages/tunnel/tunnel' });
  },
  // 点击回到顶部
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  // 轮播图改变触发
  swiperChange(e) {
    const that = this;
    var current = e.detail.current + 2
    if (e.detail.current == this.data.imgurl.length - 1) {
      current = 1
    }
    if (current > this.data.imgurl.length - 1) {
      current = 0
    }
    that.setData({
      swiperIndex: current,
    })
  },
  onLoad: function () {
    //判断globalData里面是否有用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 点击播放，隐藏播放按钮与视频封面
  videoPlay() {
    this.setData({
      isPlay: !this.data.isPlay
    })
    var videoplay = wx.createVideoContext("myVideo")
    videoplay.play()
  },
  //获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
