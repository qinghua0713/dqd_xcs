import { Request } from '../../utils/request'
Page({
  data: {
    showTop: false,
    dataList: null,//轮播图数据
    current: 0,//轮播图当前项
    classifyList: null,//分类每一个藏品的数据列表
    artworkId: null,//艺术品每一类的id
    filtratePirce: {
      lowest: null,
      tallest: null
    },//筛选输入框的最大小值
    isShowCover: true
  },
  //轮播图改变函数
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  onLoad(e) {
    console.log(e)
    var that = this
    Request('xcx/category/imgs/').then(res => {
      that.setData({
        dataList: res.data,
        artworkId: e.id
      })
      console.log(res.data)
    })
    Request('xcx/category/' + e.id).then(res => {
      that.setData({
        classifyList: res.data
      })
      console.log(res.data)
    })
    //判断如果跳转没有传值默认显示第一条
    if (e.value == undefined && e.id == undefined) {
      that.setData({
        value: that.data.dataList.category[0].name,
      })
    } else {
      that.setData({
        value: e.value,
      })
    }

  },
  //获取筛选输入框的最小值
  getMinValue(e) {
    let lowest = 'filtratePirce.lowest'
    this.setData({
      [lowest]: e.detail.value,
    })
  },
  //获取筛选输入框的最大值
  getMaxValue(e) {
    let tallest = 'filtratePirce.tallest'
    this.setData({
      [tallest]: e.detail.value
    })
  },
  //点击艺术家进行筛选
  artistScreening(e){
    let that = this
   Request(`xcx/category/`,{
    author:e.currentTarget.dataset.id
   }).then(res=>{
     console.log(res.data)
        that.setData({
          classifyList:res.data
        })
   })
  },
  //手动输入金额筛选按钮
  filtrateClassify() {
    let that = this
    //如果用户输入的最小值大于最大值那么就交换它们的值再请求
    if (that.data.filtratePirce.lowest > that.data.filtratePirce.tallest) {
      let lowest = 'filtratePirce.lowest'
      let tallest = 'filtratePirce.tallest'
      that.setData({
        [lowest]: that.data.filtratePirce.tallest,
        [tallest]: that.data.filtratePirce.lowest
      })
      Request(`xcx/category/${that.data.artworkId}`, {
        min: that.data.filtratePirce.lowest,
        max: that.data.filtratePirce.tallest
      }).then(res => {
        console.log(res.data)
      })
    } else {
      //否则直接请求
      Request(`xcx/category/${that.data.artworkId}`, {
        min: that.data.filtratePirce.lowest,
        max: that.data.filtratePirce.tallest
      }).then(res => {
        console.log(res.data)
      })
    }

  },
  //从低到高筛选
  LowToTall() {
    let that = this
    Request(`xcx/category/${that.data.artworkId}`, {
      ordering: 'price'
    }).then(res => {
      console.log(res.data)
      that.setData({
        classifyList: res.data
      })
    })
  },
  //从高到低筛选
  TallToLow() {
    let that = this
    Request(`xcx/category/${that.data.artworkId}`, {
      ordering: '-price'
    }).then(res => {
      console.log(res.data)
      that.setData({
        classifyList: res.data
      })
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
  optionValue() {
    this.setData({
      showValue: !this.data.showValue
    })
  },
  //选类别中的值
  selectCentre(e) {
    var index = e.target.dataset.index
    var value = e.target.dataset.item
    this.setData({
      showValue: false,
      value: value,
    })
  },
  //点击显示筛选盒子
  showCover() {
    this.setData({
      isShowCover: true
    })
  },
  //点击隐藏筛选盒子
  hiddenCover() {
    this.setData({
      isShowCover: false
    })
  },
  //点击显示筛选盒子(没办法的办法，不然会触发父盒子的事件)
  showCover() {
    this.setData({
      isShowCover: true
    })
  },
  //弹窗防止穿透
  touchHandler() {
    console.log("想都别想")
    return
  },
  //点击跳转详情页
  goToDateils(e) {
    console.log(e)
    wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}` });
  },


})