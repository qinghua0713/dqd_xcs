import {Request} from '../../utils/request'
Page({
  data: {
    currentId: 1,//用来判断显示tab
    current: 0,//轮播图的当前下标
    isPlay:false,//用来判断是否显示播放按钮
    dataList:null,//数据列表
    currentIndex:0,//当前显示的选项卡
  },
  onLoad() {
    let that = this
    //请求ACS合同数据
    Request('xcx/asc/').then(res=>{
       that.setData({
         dataList:res.data
       })
    })
  },
  //点击显示tab第n项
  showACS(e) {
    this.setData({
      currentIndex:e.currentTarget.dataset.index,
      currentId:e.currentTarget.dataset.id
    })
  },

  // 轮播图改变触发
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  // 点击播放，隐藏播放按钮与视频封面
  videoPlay(){
      this.setData({
        isPlay:!this.data.isPlay
      })
    var videoplay = wx.createVideoContext("myVideo")
    videoplay.play()
  },
  //下拉刷新
  onPullDownRefresh() {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
  //请求ACS合同数据
    Request('xcx/asc/').then(res=>{
      wx.hideLoading();
      wx.showToast({
        title: '刷新成功', //提示的内容,
        icon: 'success', //图标,
        duration: 2000, //延迟时间,
      });
      that.setData({
        dataList:res.data
      })
   })
  },
})