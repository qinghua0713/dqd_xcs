//index.js
//获取应用实例
import { Request } from '../../utils/request'
var app = getApp()
Page({
  data: {
    showTop: false,//用来判断是否显示返回顶部
    dataList: '',//数据列表
    quarterSrc_one:'',//第一阶段的图标
    quarterSrc_two:'',//第二阶段的图标
    quarterSrc_three:'',//第三阶段的图标
    quarterSrc_four:'',//第四阶段的图标
  },
  onLoad(e) {
    var that = this;
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        Request(`xcx/ear/${e.id}`, '', 'GET', {
          openid: res.data.openid
        }).then(res => {
          that.setData({
            dataList: res.data,
            artworkId:e.id
          })
          //循环判断阶段改变图片
          switch (res.data.rate) {
            case 1:
              that.setData({
                quarterSrc_one:'../../assets/image/jd_1_red.png',
                quarterSrc_two:  '../../assets/image/jd_2_gray.png',
                quarterSrc_three:'../../assets/image/jd_3_gray.png',
                quarterSrc_four: '../../assets/image/jd_4_gray.png',
              })
              break;
            case 2:
              that.setData({
                quarterSrc_one:'../../assets/image/jd_1_black.png',
                quarterSrc_two:  '../../assets/image/jd_2_red.png',
                quarterSrc_three:'../../assets/image/jd_3_gray.png',
                quarterSrc_four: '../../assets/image/jd_4_gray.png',
              })
              break;
            case 3:
              that.setData({
                quarterSrc_one:'../../assets/image/jd_1_black.png',
                quarterSrc_two:  '../../assets/image/jd_2_black.png',
                quarterSrc_three:'../../assets/image/jd_3_red.png',
                quarterSrc_four: '../../assets/image/jd_4_gray.png',
              })
              break;
            case 4:
              that.setData({
                quarterSrc_one:'../../assets/image/jd_1_black.png',
                quarterSrc_two:  '../../assets/image/jd_2_black.png',
                quarterSrc_three:'../../assets/image/jd_3_black.png',
                quarterSrc_four: '../../assets/image/jd_4_red.png',
              })
              break;
            default:
          }
        })
      },
    })
  },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        Request(`xcx/ear/${that.data.artworkId}`, '', 'GET', {
          openid: res.data.openid
        }).then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '刷新成功', //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
          });
          that.setData({
            dataList: res.data
          })
          //循环判断阶段改变图片
          switch (res.data.rate) {
            case 1:
              that.setData({
                quarterSrc_one:'../../assets/image/jd_1_red.png',
                quarterSrc_two:  '../../assets/image/jd_2_gray.png',
                quarterSrc_three:'../../assets/image/jd_3_gray.png',
                quarterSrc_four: '../../assets/image/jd_4_gray.png',
              })
              break;
            case 2:
              that.setData({
                quarterSrc_one:'../../assets/image/jd_1_black.png',
                quarterSrc_two:  '../../assets/image/jd_2_red.png',
                quarterSrc_three:'../../assets/image/jd_3_gray.png',
                quarterSrc_four: '../../assets/image/jd_4_gray.png',
              })
              break;
            case 3:
              that.setData({
                quarterSrc_one:'../../assets/image/jd_1_black.png',
                quarterSrc_two:  '../../assets/image/jd_2_black.png',
                quarterSrc_three:'../../assets/image/jd_3_red.png',
                quarterSrc_four: '../../assets/image/jd_4_gray.png',
              })
              break;
            case 4:
              that.setData({
                quarterSrc_one:'../../assets/image/jd_1_black.png',
                quarterSrc_two:  '../../assets/image/jd_2_black.png',
                quarterSrc_three:'../../assets/image/jd_3_black.png',
                quarterSrc_four: '../../assets/image/jd_4_red.png',
              })
              break;
            default:
          }
        })
      },
    })
  },


})
