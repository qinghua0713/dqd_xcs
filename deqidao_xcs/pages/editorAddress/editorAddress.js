Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    // customItem: '全部'
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  inputShowed(e){
    console.log(e)
    var value = e.detail.value
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if(!myreg.test(value)){
      wx.showToast({
        title: '手机号码有误',
        icon:'none',
        duration:1500
      })
    }else{
      wx.showToast({
        title: '输入正确',
        icon: 'none',
        duration: 1500
      })
    }
  },
  inputName(e){
    var isName = /^[A-Za-z\u4e00-\u9fa5]+$/
    var name = e.detail.value
    //name = parseInt(name)
    console.log(typeof name)
    console.log(!isName.test(name))
    if (!isName.test(name)){
      wx.showToast({
        title: '请输入合法名字',
        icon: 'none',
        duration: 1500
      })
    }else{
      console.log("这是对的")
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