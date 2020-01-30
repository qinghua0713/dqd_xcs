const app = getApp()
import { Request } from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide: false//判断用户是否授权
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
        wx.switchTab({
          url: '/pages/index/index',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    let that = this
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
              wx.switchTab({
                url: '/pages/index/index',
              })
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})