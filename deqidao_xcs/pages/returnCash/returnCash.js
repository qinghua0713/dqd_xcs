import { Request } from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,//当前图片的位置
    markers: [{
      iconPath: "/assets/image/hongqi.png",
      id: 0,
      // latitude: 23.099994,
      // longitude: 113.324520,
      width: 50,
      height: 50
    }],
    isShowCtTs:false,//默认不显示提示
    isTsShow:false,//默认不显示提示
    dataList:'',//数据列表
  },
  //轮播图内容位置改变触发
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  //点击显示归还须知提示
  showReturn() {
    this.setData({
      isTsShow: !this.data.isCtShow,
    })
  },
  //点击页面隐藏提示
  hiddenReturn(){
    this.setData({
      isTsShow: false,
      isShowCtTs:false
    })
  },
  //点击显示藏品提示
  showCtTs() {
    this.setData({
      isShowCtTs:!this.data.isShowCtTs,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this
  wx.getStorage({
    key: 'resultUserInfo',
    success: (res) => {
      Request(`xcx/return/${e.id}`,'','GET',{
        openid: res.data.openid
      }).then(res=>{
        console.log(res.data)
        that.setData({
          dataList:res.data,
          artworkId:e.id
        })
      })
    },
  })

  //获取用户当前位置
    wx.getLocation({ //没有特别说明的都是固定写法
      type: 'wgs84',
      success: function (res) {
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            "key": "GEOBZ-TIOWG-KNMQN-IKQEY-JTI7Q-O2FXR",
            "location": locationString
          },
          method: 'GET',
          success: function (r) {
            //输出一下位置信息
            that.setData({
              lat: r.data.result.location.lat,
              lng: r.data.result.location.lng,
              address: r.data.result.address
            })
            //r.data.result.address获得的就是用户的位置信息，将它保存到一个全局变量上
            getApp().globalData.locationInfo = r.data.result.address;
            //这步是将位置信息保存到本地缓存中，key = value的形式
            try {
              wx.setStorageSync('locationInfo', r.data.result.address)
            } catch (e) {
            }
          }
        });
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
    var that = this
    wx.showLoading({
      title: '加载中',
    })
  wx.getStorage({
    key: 'resultUserInfo',
    success: (res) => {
      Request(`xcx/return/${artworkId}`,'','GET',{
        openid: res.data.openid
      }).then(res=>{
        wx.hideLoading();
        wx.showToast({
          title: '刷新成功', //提示的内容,
          icon: 'success', //图标,
          duration: 2000, //延迟时间,
        });
        that.setData({
          dataList:res.data
        })
      })
    },
  })

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