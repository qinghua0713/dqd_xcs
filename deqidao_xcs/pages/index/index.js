//index.js
//获取应用实例
const app = getApp()
const getInf = (str, key) => str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
import {
  Request
} from "../../utils/request";
Page({
  data: {
    showTop: false, //判断返回按钮是否显示
    isPlay: false, //用来判断是否显示播放按钮
    swiperIndex: 2, //swiper当前下标
    dataList: '', //请求回来的数据列表
    swiper_noe_current: 0,//第一个轮播图的当前下标
    keyword: "",//关键字
    keywordList: [],//关键字列表
    keywordSearchList: '',//请求回来的关键字
    objectList:'',//这里存放搜索请求回来的对象列表
  },
  //搜索框获取焦点
  searchFocus() {
    this.setData({
      isShowCearchCover: true,//显示搜索框的遮罩
      focus: true,//遮罩层的搜素框获取焦点
    })
  },
  //点击隐藏遮罩
  cancelSearch() {
    this.setData({
      isShowCearchCover: false
    })
  },
  //手机键盘输入实时请求数据
  searchShop(e) {
    let that = this
    that.setData({
      keyword: this.trim(e.detail.value)
    })
    //请求搜索关键字
    Request(`goods/search/name/?search=${e.detail.value}`).then(res => {
      var keywordList = []
      var objectList = []//声明一个空数组来储存请求回来的对象
      for (let i = 0; i < res.data.length; i++) {
        //判断如果请求回来的数组中的值不是对象的话
        if (typeof res.data[i] != 'object') {
          keywordList = keywordList.concat({ keyword: res.data[i] })
        } else {//否则是对象
          //把请求回来的对象存起来
          objectList = objectList.concat(res.data[i])
          //拼接对象
          keywordList = keywordList.concat({ keyword: res.data[i].name })
        }
      }
      //循环拼接好的数组
      for (var i = 0; i < keywordList.length; i++) {
        //检索输入框的值
        keywordList[i].keyword = getInf(keywordList[i].keyword, that.data.keyword);
      }
      that.setData({
        keywordList: keywordList,//数组列表
        objectList:objectList//对象列表
      })
    })

  },
  // 去除首尾的空格
  trim: function (s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  },
  // 加载小程序的时候会触发这个 onLoad方法
  onLoad: function () {
    var that = this;
    //请求首页数据
    Request('xcx/page/index/').then(res => {
      console.log(res.data)
      // //循环给图片路径添加上随机数(因为有缓存机制导致部分ios机型图片不显示)
      // for(let i = 0; i < res.data.show_img.length; i++){
      //   res.data.show_img[i].img =  res.data.show_img[i].img+"?"+Math.random()    
      // }
      // for(let j = 0; j < res.data.category.length; j++){
      //   res.data.category[j].img =  res.data.category[j].img+"?"+Math.random()    
      // }
      // for(let a = 0; a < res.data.authors.length; a++){
      //   res.data.authors[a].default_image_url =  res.data.authors[a].default_image_url+"?"+Math.random()    
      // }
      // for(let n = 0; n < res.data.recommend.length; n++){
      //   res.data.recommend[n].goods.default_image_url =  res.data.recommend[n].goods.default_image_url+"?"+Math.random()    
      // }
      // //给视频遮罩图片添加上随机数
      // res.data.video[0].img = res.data.video[0].img+"?"+Math.random()    
      console.log(res.data)
      that.setData({
        dataList: res.data
      })
    })
    //请求热搜关键字
    Request(`good/keyword/search/`).then(res => {
      that.setData({
        keywordSearchList: res.data
      })
    })
  },
  //遮罩防止穿透
  catchTouchmove() {
    return
  },
  //点击跳转艺术家详情
  goToArtDetails(e) {
    console.log(e)
    //wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}`, })
  },
  // 判断返回按钮是否显示
  onPageScroll(e) {
    if (e.scrollTop > 1000) {
      this.setData({
        showTop: true
      })
    } else {
      this.setData({
        showTop: false
      })
    }
  },
  //点击跳转详情
  goToClassify(e) {
    var value = decodeURIComponent(e.currentTarget.dataset.value);
    wx.navigateTo({
      url: `/pages/classify/classify?id=${e.currentTarget.dataset.id}&value=${value}`,
    })
  },
  //点击搜索出来的关键字跳转详情页
  goToclassify_two(e) {
    var keyValue = []
    //循环点击的数组
    for (var i = 0; i < e.currentTarget.dataset.item.keyword.length; i++) {
      //拼接数组每一项
      keyValue = keyValue.concat(e.currentTarget.dataset.item.keyword[i])
    }
    //把数组每一项拼起来变成字符串
    keyValue = keyValue.join('')
    //循环后台发过来的分类对象
     for( var j = 0; j < this.data.objectList.length; j++){
       //如果当前点击的值等于请求回来的对象的name的值话就拿到那个对象的id进行跳转
       if(keyValue == this.data.objectList[j].name){
          wx.navigateTo({ url: `/pages/classify/classify?id=${this.data.objectList[j].category_id}&value=${keyValue}` });
       }
     }
    this.setData({
      keyword: keyValue//把当前点击的值传给输入框的值
    })
    //如果请求回来没有对象的话直接点击直接跳转分类页
    if(this.data.objectList.length < 1){
      wx.navigateTo({ url: '/pages/classify/classify' });
    }
  },
  //点击跳转公众号文章
  goToArticle(e){
    console.log(e)
    let url=encodeURIComponent(e.currentTarget.dataset.src)
  wx.navigateTo({ url: `/pages/article/article?src=${url}` });
  },
  //点击热搜关键字跳转分类页
  goToClassify_three() {
    wx.navigateTo({ url: '/pages/classify/classify' });
  },
  //点击跳转tunnel页面
  goToTunnel() {
    wx.switchTab({
      url: '/pages/tunnel/tunnel'
    });
  },
  // 点击回到顶部
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  //点击跳转艺术家详情页
  goToArtistDateils(e) {
    wx.navigateTo({
      url: `/pages/artistDateils/artistDateils?id=${e.currentTarget.dataset.id}`
    });
  },
  //点击跳转艺术品详情
  goToDetails(e) {
    wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}` });
  },
  //轮播图内容位置改变触发
  swiperChange_one(e) {
    var that = this;
    that.setData({
      swiper_noe_current: e.detail.current,
    })

  },
  // 轮播图改变触发
  swiperChange_two(e) {
    const that = this;
    var current = e.detail.current + 2
    if (e.detail.current == this.data.dataList.authors.length - 1) {
      current = 1
    }
    if (current > this.data.dataList.authors.length - 1) {
      current = 0
    }
    that.setData({
      swiperIndex: current,
    })
  },
  // 点击播放，隐藏播放按钮与视频封面
  videoPlay() {
    this.setData({
      isPlay: !this.data.isPlay
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
    //请求首页数据
    Request('xcx/page/index/').then(res => {
      // for(let i = 0; i < res.data.show_img.length; i++){
      //   res.data.show_img[i].img =  res.data.show_img[i].img+"?"+Math.random()    
      // }
      // for(let j = 0; j < res.data.category.length; j++){
      //   res.data.category[j].img =  res.data.category[j].img+"?"+Math.random()    
      // }
      // for(let a = 0; a < res.data.authors.length; a++){
      //   res.data.authors[a].default_image_url =  res.data.authors[a].default_image_url+"?"+Math.random()    
      // }
      // for(let n = 0; n < res.data.recommend.length; n++){
      //   res.data.recommend[n].goods.default_image_url =  res.data.recommend[n].goods.default_image_url+"?"+Math.random()    
      // }
      // //给视频遮罩图片添加上随机数
      // res.data.video[0].img = res.data.video[0].img+"?"+Math.random()    
      wx.hideLoading();
      wx.showToast({
        title: '刷新成功', //提示的内容,
        icon: 'success', //图标,
        duration: 2000, //延迟时间,
      });
      that.setData({
        dataList: res.data
      })
    })
    //请求热搜关键字
    Request(`good/keyword/search/`).then(res => {
      that.setData({
        keywordSearchList: res.data
      })
    })

  },
  //页面隐藏是触发
  onHide() {
    let that = this
    that.setData({
      isShowCearchCover: false,
      keyword: '',//清空搜索框的值
      keywordList: '',//清空请求回来的关键字列表
    })
  }
})