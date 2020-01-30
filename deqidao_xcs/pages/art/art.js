import {Request} from '../../utils/request'
Page({
  data: {
    currentId: 1,//用来判断显示tab
    current: 0,//轮播图的当前下标
    isPlay:false,//用来判断是否显示播放按钮
    dataList:null,//数据列表
    currentIndex:0,//当前显示的选项卡
  },
  //页面加载是触发
  onLoad() {
    let that = this
    //请求ACS合同数据
    Request('xcx/asc/').then(res=>{
      for(let i = 0; i < res.data.img.length; i++){
        res.data.img[i].no_img =  res.data.img[i].no_img+"?"+Math.random()    
        res.data.img[i].yes_img =  res.data.img[i].yes_img+"?"+Math.random()    
      }
      res.data.page_serializer[0].video_img = res.data.page_serializer[0].video_img+"?"+Math.random()  
      for(let i = 0; i < res.data.show_img.length; i++){
        res.data.show_img[i].img =  res.data.show_img[i].img+"?"+Math.random()    
      }
      console.log(res.data)
       that.setData({
         dataList:res.data
       })
    })
  },
  goToArticle(e){
    let url = encodeURIComponent(e.currentTarget.dataset.src)
    wx.navigateTo({ url: `/pages/article/article?src=${url}` });
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
      for(let i = 0; i < res.data.img.length; i++){
        res.data.img[i].no_img =  res.data.img[i].no_img+"?"+Math.random()    
        res.data.img[i].yes_img =  res.data.img[i].yes_img+"?"+Math.random()    
      }
      res.data.page_serializer[0].video_img = res.data.page_serializer[0].video_img+"?"+Math.random()  
      for(let j = 0; j < res.data.show_img.length; j++){
        res.data.show_img[j].img =  res.data.show_img[j].img+"?"+Math.random()    
      }
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