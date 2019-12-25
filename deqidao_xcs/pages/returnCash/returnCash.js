Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png"
    ],//banner图片数据
    current: 0,//当前图片的位置
    markers: [{
      iconPath: "/assets/image/hongqi.png",
      id: 0,
      // latitude: 23.099994,
      // longitude: 113.324520,
      width: 50,
      height: 50
    }],
    isTsShow: false//默认归还提示不显示
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
    console.log(1)
    this.setData({
      isTsShow: !this.data.isTsShow
    })
    console.log(this.data.isTsShow)
  },
  //Page点击隐藏提示框（一切为了用户体验 T_T）
  // hiddenTs(){
  //   this.setData({
  //     isTsShow:false
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getLocation({ //没有特别说明的都是固定写法
      type: 'wgs84',
      success: function (res) {
        console.log('location', res);
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'http://apis.map.qq.com/ws/geocoder/v1/',
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
            console.log(that.data.lat)
            console.log(that.data.lng)
            console.log(r)
            console.log('用户位置信息', r.data.result.address);
            //r.data.result.address获得的就是用户的位置信息，将它保存到一个全局变量上
            getApp().globalData.locationInfo = r.data.result.address;
            //这步是将位置信息保存到本地缓存中，key = value的形式
            try {
              wx.setStorageSync('locationInfo', r.data.result.address)
            } catch (e) {
              console.log(e)
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