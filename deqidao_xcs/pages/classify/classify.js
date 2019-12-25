Page({
  data: {
    showTop: false,
    imgUrl: [
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png",
      "/assets/image/cp_banner.png"
    ],//轮播图数据
    current: 0,//轮播图当前项
    val: ["艺术家", "字 画", "瓷 器","紫 砂"],
  },
  //轮播图改变函数
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  //点击返回首页
  returnHome() {
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  //判断回到顶部按钮是否显示
  onPageScroll(e) {
    if (e.scrollTop > 100) {
      this.setData({
        showTop: true
      })
    } else {
      this.setData({
        showTop: false
      })
    }
  },
  //点击回到顶部
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //点击显示类别选项
  optionValue(){
   this.setData({
     showValue:!this.data.showValue
   })
  },
  //选类别中的值
  selectCentre(e){
    var index = e.target.dataset.index
    var value = e.target.dataset.item
    this.setData({
      showValue: false,
      value: value,
      valIndex:index
    })
  },
  //点击显示筛选盒子
  showCover(){
    this.setData({
      isShowCover:true
    })
  },
  //点击隐藏筛选盒子
  hiddenCover(){
    this.setData({
      isShowCover: false
    })
  },
  //弹窗防止穿透
  touchHandler(){
    console.log("想都别想")
    return 
  },
  onLoad(e) {
 
   console.log(e)
   var that = this
   that.setData({
     value:e.value,
     valIndex:e.index
   })
  }

})