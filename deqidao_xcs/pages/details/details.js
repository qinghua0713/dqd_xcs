import { Request } from '../../utils/request'
import { Login } from '../../utils/login'
const app = getApp()
Page({
  data: {
    isShow: false,//用来判断是否显示全部内容
    current: 0,//轮播图当前位置
    dataList: null,//数据列表
    current: 0,//当前所在滑块的 index
    artworkId: '',//艺术品id
    buyStatus: "立即订购",//藏品状态
    orderDataList: '',//订单数据列表
    currentWay: 1,//默认选中第中存储方式
    collectNum: ''//收藏人数
  },

  //用户点击收藏发送数据给后台
  Collect(e) {
    let that = this
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.getStorage({
        key: 'resultUserInfo',
        success: (res) => {
          //发送收藏请求
          Request('goods/collect', {
            good: that.data.artworkId
          }, 'POST', {
            'openid': res.data.openid
          }).then(res => {
            //判断请求回来的状态是0的话就是没有收藏
            if (res.data.status) {
              //否则就是收藏了
              that.setData({
                collectNum: "已收藏"
              })
            } else {
              that.setData({
                collectNum: res.data.collect + "人收藏"
              })
            }
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

    }
  },
  //轮播图，图片点击全屏展示
  previewimgs: function (e) {
    var imgList = []
    for (var i = 0; i < this.data.dataList.img_data.length; i++) {
      console.log(this.data.dataList.img_data[i])
      if (this.data.dataList.img_data[i].img != undefined ) {
        imgList.push(this.data.dataList.img_data[i].img)
      }
    }
    console.log(imgList);
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接 String
      urls: imgList // 需要预览的图片http链接列表 Array
    })
  },
  //页面分享事件
  onShareAppMessage(res) {
    let that = this
    // 来自页面内转发按钮
    return {
      title: '这个艺术家很牛逼哦~~~',
      path: `/pages/details/details?id=${that.data.artworkId}`
    }

  },
  goToArticle(e) {
    let url = encodeURIComponent(e.currentTarget.dataset.src)
    wx.navigateTo({ url: `/pages/article/article?src=${url}` });
  },
  //点击跳转艺术家详情页
  goToArtistDateils(e) {
    wx.navigateTo({ url: `/pages/artistDateils/artistDateils?id=${e.currentTarget.dataset.id}` });
  },
  //页面加载时触发
  onLoad(e) {
    let that = this

    //请求商品详情页数据
    Request(`goods/details/${e.id}`).then(res => {
      //循环给图片路径添加上随机数(因为有缓存机制导致部分ios机型图片不显示)
      // for (let i = 0; i < res.data.img_data.length; i++) {
      //   if (res.data.img_data[i] != null) {
      //     res.data.img_data[i].image = res.data.img_data[i].image + "?" + Math.random()
      //   }
      // }
   //   res.data.aut_data.aut.default_image_url = res.data.aut_data.aut.default_image_url + "?" + Math.random()
      console.log(res.data)
      that.setData({
        dataList: res.data,
        artworkId: e.id,
      })

      //如果他已被订购
      if (that.data.dataList.good_data.order_status_num != 1) {
        that.setData({
          buyStatus: '已订购'
        })
      }
    })
    //请求用户是否收藏接口
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        Request(`goods/collect?good_id=${e.id}`, '', 'GET', {
          openid: res.data.openid
        }).then(res => {
          console.log(res)
          if (res.data.status) {
            that.setData({
              collectNum: "已收藏"
            })
          } else {
            that.setData({
              collectNum: that.data.dataList.good_data.collect + "人收藏"
            })
          }
        })
      },
      fail: () => {
          wx.navigateTo({ url: '/pages/authorization/authorization' });
       },
    })

    //发送用户足迹给后台
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        wx.request({
          url: app.globalData.BaseUrl + 'user/history/', //开发者服务器接口地址",
          data: {
            good: e.id
          }, //请求的参数",
          method: 'POST',
          dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
          header: {
            'openid': res.data.openid
          },
          success: res => {
          },
        });
      }, fail: () => {
        wx.showToast({
          title: '用户未授权',
          icon: 'none',
          duration: 2000
        })
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
  promptlyOrder(e) {
    let that = this
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      //判断藏品是否已被订购
      if (that.data.dataList.good_data.order_status_num != 1) {
        wx.showToast({
          title: '该艺术品已被订购',
          icon: 'none',
          duration: 2000
        })
        return
      }
      //请求订单数据
      Request(`xcx/order/${that.data.artworkId}`).then(res => {
        this.setData({
          orderDataList: res.data,
          order: true,//显示支付遮罩
        })
      })
    }
  },
  //点击支付
  payment(e) {
    let that = this
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      wx.showToast({
        title: '该功能暂未开放',
        icon: 'none',
        duration: 2000
      })
      //  that.setData({
      //   order:false
      //  })
    }
  },
  //点击跳转商品详情页
  goToDetails(e) {
    wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}` });
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
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    //请求商品详情页数据
    Request(`goods/details/${that.data.artworkId}`).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '刷新成功', //提示的内容,
        icon: 'success', //图标,
        duration: 2000, //延迟时间,
      });
      that.setData({
        dataList: res.data,
      })

      if (that.data.dataList.good_data.order_status != 1) {
        that.setData({
          buyStatus: '已订购'
        })
      }
    })
    //请求用户是否收藏接口
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        Request(`goods/collect?good_id=${that.data.artworkId}`, '', 'GET', {
          openid: res.data.openid
        }).then(res => {
          console.log(res)
          if (res.data.status) {
            that.setData({
              collectNum: "已收藏"
            })
          } else {
            that.setData({
              collectNum: that.data.dataList.good_data.collect + "人收藏"
            })
          }
        })
      },
      fail: () => {
        wx.navigateTo({ url: '/pages/authorization/authorization' });
     },
    })
  },

})