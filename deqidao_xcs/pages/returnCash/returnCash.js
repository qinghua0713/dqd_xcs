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
    latitude: 23.099994,
    longitude: 113.324520,
  },
  //轮播图内容位置改变触发
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
    getLocation:function(){
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          wx.openLocation({
            latitude:latitude,
            longitude:longitude,
          })
        }
      })
    },
  onShareAppMessage() {
    return {
      title: 'cover-view',
      path: 'page/component/pages/cover-view/cover-view'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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