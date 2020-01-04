//index.js
//获取应用实例
const app = getApp()
import {
  Request
} from "../../utils/request";
Page({
  data: {
    showTop: false, //判断返回按钮是否显示
    isPlay: false, //用来判断是否显示播放按钮
    swiperIndex: 2, //swiper当前下标
    dataList: [], //请求回来的数据列表
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    swiper_noe_current:0,
    imgurl: [{
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


    ],
    isHide: false//判断用户是否授权
  },
  // 加载小程序的时候会触发这个 onLoad方法
  onLoad: function () {
    var that = this;
    wx.getSetting({
      success: function (res) {
        // res.authSetting['scope.userInfo']监测本地缓存是否存在一个登陆状态标识
        if (res.authSetting['scope.userInfo']) {
          // 获取用户信息
          //that.globalData.isHide = false
          wx.getUserInfo({
            // 调用成功走这里，调用成功：没到中途掉线的意思
            success: function (_res) {
              app.globalData.userInfo = _res.userInfo
              wx.setStorageSync('userInfo', _res.userInfo)
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(_res)
              }
            }
          });
        } // 如果没有授权
        else {
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
    Request('xcx/page/index/').then(res=>{
      that.setData({
        dataList:res.data
      })
      console.log(res.data)

    })
  },
  //点击获取用户授权
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      wx.setStorageSync('userInfo', e.detail.userInfo)
      wx.login({
        success: (res) => {
          Request('user/code/' + res.code, {
            username: e.detail.userInfo.nickName,
            profile: e.detail.userInfo.avatarUrl
          }, 'POST').then(res => {
            wx.setStorageSync('resultUserInfo', res.data)
          })
        },
      })
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showToast({
        title: '请授权登陆',
        icon: 'none'
      })
    }
  },

//点击跳转艺术家详情
goToArtDetails(){
  wx.navigateTo({
    url: '/pages/artistDateils/artistDateils',
  })
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
  goToDateils() {
    wx.navigateTo({
      url: `/pages/classify/classify?value=艺术家&index=0`,
    })
  },
  //点击跳转tunnel页面
  goToTunnel() {
    wx.switchTab({
      url: '/pages/tunnel/tunnel'
    });
  },
  // 点击回到顶部
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //点击跳转艺术家详情页
  goToArtistDateils() {
    wx.navigateTo({
      url: '/pages/artistDateils/artistDateils'
    });
  },
    //轮播图内容位置改变触发
    swiperChange_one(e) {
      var that = this;
      that.setData({
        swiper_noe_current: e.detail.current,
      })
  
    },
  // 轮播图改变触发
  swiperChange_two(e) {
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
  // 点击播放，隐藏播放按钮与视频封面
  videoPlay() {
    this.setData({
      isPlay: !this.data.isPlay
    })
    var videoplay = wx.createVideoContext("myVideo")
    videoplay.play()
  },

})