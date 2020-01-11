import { Request } from '../../utils/request'
import { Login } from '../../utils/login'
const app = getApp()
Page({
  data: {
    property: '',//用户的总资产
    userInfo: '',//用户信息
    artworkDataList:'',//藏品数据列表
  },
  goToAddress(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.navigateTo({ url: '/pages/address/address' });
    }
  },
  onLoad(e) {
    let that = this
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        that.setData({
          userInfo: res.data
        })
         //获取用户的总资产
        Request('user/ear', '', 'GET', {
          openid: res.data.openid
        }).then(res => {
          that.setData({
            property: res.data
          })
        })
         //请求用户购买过的藏品
        Request(`user/good/ear`,'','GET',{
          openid: res.data.openid
        }).then(res=>{
          that.setData({
            artworkDataList:res.data
          })
        })
      }, fail: () => {
        wx.showToast({
          title: '用户未授权',
          icon: 'none',
          duration: 2000
        })
      }
    })
   
  },
  //点击扫码
  scanMa() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
      }
    })
  },
  //点击跳转详情页
  goToDateils() {
    wx.navigateTo({
      url: '/pages/classify/classify',
    })
  },
  //点击跳转收藏页
  goToCollection(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.navigateTo({
        url: '/pages/collection/collection',
      })
    }
  },
  //点击跳转足迹页
  goToFootprint(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.navigateTo({
        url: '/pages/footprint/footprint',
      })
    }

  },
  //点击跳转寄售页
  goToConsignment() {
    wx.navigateTo({
      url: '/pages/consignment/consignment',
    })
  },
  //点击跳转艺术品管理页显示第一个tab的内容
  goToManAgeShowOne(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
    wx.navigateTo({ url: '/pages/artProductManage/artProductManage?showCurrent=1' });
    }

  },
  //点击跳转艺术品管理页显示第二个tab的内容
  goToManAgeShowTwo(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.navigateTo({ url: '/pages/artProductManage/artProductManage?showCurrent=2' });
    }

  },
  //点击跳转艺术品管理页显示第三个tab的内容
  goToManAgeShowThree(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.navigateTo({ url: '/pages/artProductManage/artProductManage?showCurrent=3' });
    }

  },
  //点击跳转earnings页面
  goToEarnings(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
       wx.navigateTo({ url: `/pages/earnings/earnings?id=${e.currentTarget.dataset.id}` });
    }

  },

})