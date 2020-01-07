import { Request } from '../../utils/request'
const app = getApp()
Page({
  data: {
    yspIsNo: false,//用来判断是否有数据
    property:'',//用户的总资产
    userInfo:'',//用户信息
  },
  goToAddress(){
     wx.navigateTo({ url: '/pages/address/address' });
  },
  onLoad(e) {
    let that = this
    //获取用户的总资产
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        that.setData({
          userInfo:res.data
        })
        Request('user/ear', '', 'GET', {
          'openid': res.data.openid
        }).then(res => {
          that.setData({
            property:res.data
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
  //点击扫码
  scanMa() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
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
  goToCollection() {
    wx.navigateTo({
      url: '/pages/collection/collection',
    })
  },
  //点击跳转足迹页
  goToFootprint() {
    wx.navigateTo({
      url: '/pages/footprint/footprint',
    })
  },
  //点击跳转寄售页
  goToConsignment() {
    wx.navigateTo({
      url: '/pages/consignment/consignment',
    })
  },
  //点击跳转艺术品管理页显示第一个tab的内容
  goToManAgeShowOne() {
    wx.navigateTo({ url: '/pages/artProductManage/artProductManage?showCurrent=0' });
  },
  //点击跳转艺术品管理页显示第二个tab的内容
  goToManAgeShowTwo() {
    wx.navigateTo({ url: '/pages/artProductManage/artProductManage?showCurrent=1' });
  },
  //点击跳转艺术品管理页显示第三个tab的内容
  goToManAgeShowThree() {
    wx.navigateTo({ url: '/pages/artProductManage/artProductManage?showCurrent=2' });
  },
  //点击跳转earnings页面
  goToEarnings() {
    wx.navigateTo({ url: '/pages/earnings/earnings' });
  },

})