import {Request} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     dataList:''//数据列表
  },
  goToDetails(e){
   wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}` });
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
  onShow: function (e) {
    let that = this
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        Request('goods/collect','','GET',{
          'openid': res.data.openid
        }).then(res=>{
          console.log(res.data)
          that.setData({
            dataList:res.data
          })
  
        })
      },fail: () => { 
        wx.showToast({
          title: '用户未授权',
          icon: 'none',
          duration: 2000
        })
      }
    })
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
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        Request('goods/collect','','GET',{
          'openid': res.data.openid
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
      },fail: () => { 
        wx.showToast({
          title: '用户未授权',
          icon: 'none',
          duration: 2000
        })
      }
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