import { Request } from '../../utils/request'
const app = getApp()
Page({
  data: {
    isShow: false,//用来判断是否显示全部内容
    current: 0,//轮播图当前位置
    //order:true,
    dataList: null,//数据列表
    current: 0,//当前所在滑块的 index
    artworkId: '',//艺术品id
    buyStatus: "立即订购",//藏品状态
    orderDataList: '',//订单数据列表
    currentWay: 1,//默认选中第中存储方式
  },
  onLoad(e) {
    let that = this
    console.log(e.id)
    Request(`goods/details/${e.id}`).then(res => {
      that.setData({
        dataList: res.data,
        artworkId: e.id
      })
      if (that.data.dataList.details.order_status != 1) {
        that.setData({
          buyStatus: '已订购'
        })
      }
    })

    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        console.log(parseInt(e.id))
         wx.request({
          url: app.globalData.BaseUrl + 'user/history/', //开发者服务器接口地址",
          data: {
            good: e.id
          }, //请求的参数",
          method: 'POST',
          dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
          header: {
            'content-type': 'application/json',
            'openid': res.data.openid
          },
          success: res => {
            console.log(res.data)
          },
        });
      },
    })

  },
  //点击显示轮播图的第一张(也就是视频)
  swiperVideo() {
    this.setData({
      current: 0
    })
  },
  //点击显示轮播图的第二张(也就是图片)
  siwperImage() {
    this.setData({
      current: 1
    })
  },
  //点击遮罩隐藏
  hiddenCover() {
    this.setData({
      order: false
    })
  },
  //点击遮罩子盒子显示(事件冒泡真恶心)
  showCover() {
    this.setData({
      order: true
    })
  },
  //点击立即预定按钮事件
  promptlyOrder() {
    let that = this
    if (that.data.dataList.details.order_status != 1) {
      wx.showToast({
        title: '该艺术品已被订购',
        icon: 'none',
        duration: 2000
      })
      return
    }
    Request(`xcx/order/${that.data.artworkId}`).then(res => {
      console.log(res.data)
      this.setData({
        orderDataList: res.data,
        order: true,
      })
    })

  },
  //点击选中存储方式
  storageWay(e) {
    this.setData({
      currentWay: e.target.dataset.index
    })
  },
  //点击X隐藏遮罩
  closeShop() {
    this.setData({
      order: false
    })
  },
  //防止遮罩穿透
  doNotMove() {
    console.log(11)
    return
  },
  //点击显示收货地址模块
  addAddress() {
    wx.navigateTo({ url: '/pages/address/address' });
  },
  //点击编辑显示地址编辑模块

  //轮播图改变触发
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })
  },

})