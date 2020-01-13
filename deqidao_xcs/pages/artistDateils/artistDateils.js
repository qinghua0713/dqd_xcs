import { Request } from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     dataList:'',//数据列表
     artistId:'',//艺术家ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this
    //请求艺术家数据
           Request(`xcx/details/${e.id}`).then(res=>{
             console.log(res.data)
             that.setData({
               dataList:res.data,
               artistId:e.id
             })
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
     //请求艺术家数据
     Request(`xcx/details/${that.data.artistId}`).then(res=>{
      console.log(res.data)
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