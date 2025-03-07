import { Request } from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: ''//数据列表
  },
  //点击跳转艺术品详情
  goToDetails(e){
    wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}` });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        // 请求历史记录以及推荐数据
        Request('user/history/', '', 'GET', {
          'content-type': 'application/json',
          'openid': res.data.openid
        }).then(res => {
          console.log(res.data)
          that.setData({
            dataList: res.data
          })
        })
      },
    })

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

  //下拉刷新
  onPullDownRefresh() {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        // 请求历史记录以及推荐数据
        Request('user/history/', '', 'GET', {
          'content-type': 'application/json',
          'openid': res.data.openid
        }).then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '刷新成功', //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
          });
          that.setData({
            dataList: res.data
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