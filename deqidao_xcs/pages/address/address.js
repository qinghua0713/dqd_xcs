import { Request } from '../../utils/request'
import { Login } from '../../utils/login'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    broadcastMsg:'',//广播消息
    isShowHint:true,
    dataList: '',//数据列表
    userTx: [],//展示用户名字最后一个字
    delBtnWidth: 180
  },
  closeHint(){
     this.setData({
       isShowHint:false
     })
  },
  //删除收货地址
  delItem(e){
    
    console.log(e.target.dataset.id)
    let that = this
    wx.getStorage({
        key: 'resultUserInfo',
        success: (_res) => {
            wx.showModal({
                content: '确定删除该地址吗?',
                success(res) {
                    if (res.confirm) {
                        Request(`user/addr`, {
                            addr_id: e.target.dataset.id
                        }, 'DELETE', {
                            openid: _res.data.openid
                        }).then(res => {
                          var userTx = []//用户切割后的头像
                          for (let i = 0; i < res.data.length; i++) {
                            res.data[i].txtStyle = ''
                            userTx = userTx.concat({ userTx: res.data[i].receiver })
                            userTx[i].userTx = userTx[i].userTx.substring(userTx[i].userTx.length - 1, userTx[i].userTx.length)
                            res.data[i].userTx = userTx[i].userTx
                          }
                          that.setData({
                            dataList:res.data
                          })
                            console.log(res)
                        })
                    }
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
  },
  //地址列表手指触摸开始
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
 //地址列表手指移动开始
  touchM: function (e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.dataList;
      list[index]['txtStyle'] = txtStyle;
      //更新列表的状态
      this.setData({
        dataList: list
      });
    }
  },
  //地址列表手指移动结束
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = this.data.dataList;
      var del_index = '';
      disX > delBtnWidth / 2 ? del_index = index : del_index = '';
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        dataList: list,
        del_index: del_index
      });
    }
  },
  goToEditorAddress(e){
     //进行中文转码
     let id = e.currentTarget.dataset.id
     let province = decodeURIComponent(e.currentTarget.dataset.province)
     let city = decodeURIComponent(e.currentTarget.dataset.city)
     let district = decodeURIComponent(e.currentTarget.dataset.district)
     let place = decodeURIComponent(e.currentTarget.dataset.place)
     let receiver = decodeURIComponent(e.currentTarget.dataset.receiver)
     let mobile = decodeURIComponent(e.currentTarget.dataset.mobile)
     let ischecked = e.currentTarget.dataset.ischecked
     let provinceId = e.currentTarget.dataset.provinceid
     let cityId = e.currentTarget.dataset.cityid
     let districtId = e.currentTarget.dataset.districtid
     wx.navigateTo({
       url: `/pages/editorAddress/editorAddress?id=${
         id}&province=${province}&city=${
         city}&district=${district}&place=${place}&receiver=${receiver}&mobile=${mobile}&ischecked=${ischecked}&provinceId=${provinceId}&cityId=${
         cityId}&districtId=${districtId}`
     });
  },
  //点击编辑地址
  redactAddress(e) {
    // console.log(e)
    // if (e.detail.userInfo) {
    //   let nickName = e.detail.userInfo.nickName
    //   let avatarUrl = e.detail.userInfo.avatarUrl
    //   //用户登陆
    //   Login(nickName, avatarUrl)
    //   //进行中文转码
    //   let id = e.target.dataset.id
    //   let province = decodeURIComponent(e.target.dataset.province)
    //   let city = decodeURIComponent(e.target.dataset.city)
    //   let district = decodeURIComponent(e.target.dataset.district)
    //   let place = decodeURIComponent(e.target.dataset.place)
    //   let receiver = decodeURIComponent(e.target.dataset.receiver)
    //   let mobile = decodeURIComponent(e.target.dataset.mobile)
    //   let ischecked = e.target.dataset.ischecked
    //   let provinceId = e.target.dataset.provinceid
    //   let cityId = e.target.dataset.cityid
    //   let districtId = e.target.dataset.districtid
    //   wx.navigateTo({
    //     url: `/pages/editorAddress/editorAddress?id=${
    //       id}&province=${province}&city=${
    //       city}&district=${district}&place=${place}&receiver=${receiver}&mobile=${mobile}&ischecked=${ischecked}&provinceId=${provinceId}&cityId=${
    //       cityId}&districtId=${districtId}`
    //   });
    // }

    
  },
  //点击添加地址
  addAddress(e) {
    if (e.detail.userInfo) {
      let nickName = e.detail.userInfo.nickName
      let avatarUrl = e.detail.userInfo.avatarUrl
      //用户登陆
      Login(nickName, avatarUrl)
      if(this.data.dataList.length >= 7){
        wx.showToast({
          title: '收货地址不能超过7个',
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.navigateTo({ url: '/pages/editorAddress/editorAddress' });
      }
      
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log('执行了')
    wx.connectSocket({
      url: app.globalData.ws
    })
    wx.onSocketOpen(function(res) {
     
      console.log(res)
    })
    wx.onSocketMessage(res=>{
      var data = JSON.parse(res.data)
      console.log(data )
      this.setData({
        value:data.message
      })
    })


    let that = this
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        //发送获取地址请求
        Request(`user/addr`, '', 'GET', {
          'openid': res.data.openid
        }).then(res => {
          var userTx = []//用户切割后的头像
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].txtStyle = ''
            userTx = userTx.concat({ userTx: res.data[i].receiver })
            userTx[i].userTx = userTx[i].userTx.substring(userTx[i].userTx.length - 1, userTx[i].userTx.length)
            res.data[i].userTx = userTx[i].userTx
          }
          console.log(res)
          that.setData({
            dataList: res.data,
          })
        },(err)=>{
          console.log(err)
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
  onShow(){

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
  //点击返回个人中心
  returnMy(){
  wx.switchTab({ url: '/pages/my/my' });
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
          console.log(res.data)
          for (let i = 0; i < res.data.length; i++) {
            userTx = userTx.concat({ userTx: res.data[i].receiver })
            userTx[i].userTx = userTx[i].userTx.substring(userTx[i].userTx.length - 1, userTx[i].userTx.length)
            res.data[i].userTx = userTx[i].userTx
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