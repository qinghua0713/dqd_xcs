import {Request} from '../../utils/request'
Page({
  data: {
    currentId: 1,//用来判断显示tab
    current: 0,//轮播图的当前下标
    isPlay:false,//用来判断是否显示播放按钮
    dataList:null,//数据列表
  },
  onLoad() {
    let that = this
    Request('xcx/asc/').then(res=>{
       that.setData({
         dataList:res.data
       })
    })
  },
  //点击显示tab第n项
  showACS(e) {
    this.setData({
      tabShow: true,
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
 
})