var SocketTask
var socketOpen = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

    // SocketTask.onSocketOpen(res => {
    //   socketOpen = true
    //   console.log("监听 websocket 链接打开事件", res)
    // })
    // SocketTask.onSocketClose(onClose => {
    //   socketOpen = false
    //   console.log("监听 websocket 链接关闭事件", onClose)
    //   this.websocket()
    // })
    // SocketTask.onSocketError(onError =>{
    //   console.log("监听 websocket 错误。错误信息",onError)
    //   socketOpen = false
    // })
    // SocketTask.onSocketMessage( onMessage =>{
    //   console.log("监听 websocket 接收到服务器的消息，服务器返回的消息",JSON.parse(onMessage.data))
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 

   

    }
  ,

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