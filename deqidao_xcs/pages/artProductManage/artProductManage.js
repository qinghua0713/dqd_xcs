import { Request } from '../../utils/request'
import { Login } from '../../utils/login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCurrent: 1,//显示**的内容
    deadline_one: '',//锁定期数据列表
    deadline_two: '',//收益期数据列表
    deadline_three: '',//兑现期数据列表

  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (e) {
    var that = this
    that.setData({
      showCurrent: e.showCurrent
    })
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        //请求锁定期数据
        Request(`xcx/deadline/1`, '', 'GET', {
          openid: res.data.openid
        }).then(res => {
          that.setData({
            deadline_one: res.data
          })
        })
        //请求收益其数据
        Request(`xcx/deadline/2`, '', 'GET', {
          openid: res.data.openid
        }).then(res => {
          that.setData({
            deadline_two: res.data
          })
        })
        //请求兑现期的数据
        Request(`xcx/deadline/3`, '', 'GET', {
          openid: res.data.openid
        }).then(res => {
          that.setData({
            deadline_three: res.data
          })
        })
      },
      fail: () => { },
    })
  },
  //点击显示第一个tab的内容
  showTermly() {
    this.setData({
      showCurrent: 1
    })
  },
  //点击跳转个人中心
  returnMy() {
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  //点击显示第二个tab的内容
  showEarnings() {
    this.setData({
      showCurrent: 2,
    })
  },
  //点击显示第三个tab的内容
  showCash() {
    this.setData({
      showCurrent: 3
    })
  },
  //点击跳转分类页
  goToClassify() {
    wx.navigateTo({
      url: '/pages/classify/classify',
    })
  },
  //点击跳转收益页
  goToEarnings(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.navigateTo({ url: `/pages/earnings/earnings?id=${e.currentTarget.dataset.id}` });
    }

  },
  //点击跳转退还页
  goToReturnCash(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
       wx.navigateTo({ url: `/pages/returnCash/returnCash?id=${e.currentTarget.dataset.id}` });
    }

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