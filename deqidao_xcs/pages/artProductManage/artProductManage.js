Page({

  /**
   * 页面的初始数据
   */
  data: {
      showCurrent:0,//显示**的内容
      data:0//用来判断tab内容是否有数据
  },
  //点击显示第一个tab的内容
  showTermly(){
    this.setData({
      showCurrent:0
    })
  },
  //点击跳转个人中心
  returnMy() {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  //点击显示第二个tab的内容
  showEarnings(){
    this.setData({
      showCurrent:1,
      data:1
    })
  },
  //点击显示第三个tab的内容
  showCash(){
    this.setData({
      showCurrent:2
    })
  },
  //点击跳转分类页
  goToClassify(){
  wx.navigateTo({
    url: '/pages/classify/classify',
  })
  },
  //点击跳转收益页
  goToEarnings(){
   wx.navigateTo({ url: '/pages/earnings/earnings' });
  },
  //点击跳转退还页
  goToReturnCash(){
    wx.navigateTo({ url: '/pages/returnCash/returnCash' });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
     var that = this
     console.log(e)
     that.setData({
       showCurrent: e.showCurrent
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