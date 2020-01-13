import { Request } from '../../utils/request'
import { Login } from '../../utils/login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: '',//数据列表
    userTx: [],//展示用户名字最后一个字
  },
  //点击编辑地址
  redactAddress(e) {
    console.log(e)
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      let id = e.target.dataset.id
      let province = decodeURIComponent(e.target.dataset.province)
      let city = decodeURIComponent(e.target.dataset.city)
      let district = decodeURIComponent(e.target.dataset.district)
      let place = decodeURIComponent(e.target.dataset.place)
      let receiver = decodeURIComponent(e.target.dataset.receiver)
      let mobile = decodeURIComponent(e.target.dataset.mobile)
      let isChecked = e.target.dataset.isChecked
      let provinceId = e.target.dataset.provinceid
      let cityId = e.target.dataset.cityid
      let districtId = e.target.dataset.districtid
      wx.navigateTo({
        url: `/pages/editorAddress/editorAddress?id=${
          id}&province=${province}&city=${
          city}&district=${district}&place=${place}&receiver=${receiver}&mobile=${mobile}&isChecked=${isChecked}&provinceId=${provinceId}&cityId=${
          cityId}&districtId=${districtId}`
      });
    }
  },
  //点击添加地址
  addAddress(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.navigateTo({ url: '/pages/editorAddress/editorAddress' });
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        //发送获取地址请求
        Request(`user/addr`, '', 'GET', {
          'openid': res.data.openid
        }).then(res => {
          var userTx = []//用户切割后的头像
          for (let i = 0; i < res.data.results.length; i++) {
            userTx = userTx.concat({ userTx: res.data.results[i].receiver })
            userTx[i].userTx = userTx[i].userTx.substring(userTx[i].userTx.length - 1, userTx[i].userTx.length)
            res.data.results[i].userTx = userTx[i].userTx
          }
          that.setData({
            dataList: res.data,
          })
        })

      },
      fail: () => {
        wx.showToast({
          title: '用户未授权',
          icon: 'none',
          duration: 2000
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
        //发送获取地址请求
        Request(`user/addr`, '', 'GET', {
          'openid': res.data.openid
        }).then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '刷新成功', //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
          });
          var userTx = []//用户切割后的头像
          for (let i = 0; i < res.data.results.length; i++) {
            userTx = userTx.concat({ userTx: res.data.results[i].receiver })
            userTx[i].userTx = userTx[i].userTx.substring(userTx[i].userTx.length - 1, userTx[i].userTx.length)
            res.data.results[i].userTx = userTx[i].userTx
          }
          that.setData({
            dataList: res.data,
          })
        })

      },
      fail: () => {
        wx.showToast({
          title: '用户未授权',
          icon: 'none',
          duration: 2000
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