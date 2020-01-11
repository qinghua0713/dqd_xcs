
import { Request } from '../../utils/request'
import { Login } from '../../utils/login'
const app = getApp()
Page({
  data: {
    dataList: '',//数据列表
    current: 0,//当前图片的位置
    isSuccee: false,//绑定成功的开关
    second: 5,//倒计时的秒数
    time: null//声明一个定时器
  },
  onLoad(e) {
    let that = this
    //请求绑定数据
    if (e.q) {
      //获取二维码的携带的链接信息
      let qrUrl = decodeURIComponent(e.q)
      that.getQueryString(qrUrl, 'id')
      this.setData({
        //获取链接中的参数信息
        actId: that.getQueryString(qrUrl, 'id')//用户商品id
      })
      //请求用户扫码进来的数据
      Request(`xcx/bind/${that.getQueryString(qrUrl, 'id')}`).then(res => {
        that.setData({
          dataList: res.data
        })
      })
    }


  },
  //获取url中的值
  getQueryString(url, name) {
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
    var r = url.substr(1).match(reg)
    if (r != null) {
      return r[2]
    }
    return null;
  },
  //轮播图内容位置改变触发
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  //点击绑定按钮绑定成功后的跳转函数
  bindclick(e) {
    var that = this
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.getStorage({
        key: 'resultUserInfo',
        success: (res) => {
          //请求绑定艺术品
          wx.request({
            url: app.globalData.BaseUrl + 'goods/code/bind',
            data: {
              good: that.data.dataList.good.id
            }, //请求的参数",
            header: {
              openid: res.data.openid
            },
            method: 'POST',
            success: res => {
              if (res.statusCode == 201) {
                wx.showToast({
                  title: '绑定成功',
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  isSuccee: true
                })
                //判断如果绑定成功了就执行
                if (that.data.isSuccee) {
                  that.data.time = setInterval(function () {
                    that.setData({
                      second: that.data.second - 1
                    })
                    if (that.data.second < 1) {
                      clearInterval(that.data.time)
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    }
                  }, 1000)
                }
              } else if (res.statusCode == 400) {
                wx.showToast({
                  title: '藏品已被绑定',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          });

        },
      })
    }


  },
  //取消绑定跳去首页
  cancelBtn() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  //点击返回个人中心
  returnMy() {
    clearInterval(this.data.time)
    wx.switchTab({
      url: '/pages/my/my',
    })
  },

  onShow() {

  },

  onUnload() {


  }
})