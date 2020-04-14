import { Request } from "../../utils/request";
Page({
  data: {
    swiperIndex: 0,//轮播图的当前下标
    dataList: null,//数据列表
    defaultValue_one: '',//默认渲染的分类选项数据
    defaultValue_two: '',//默认渲染的分类选项数据
    showClassifyIndex: 0,//默认显示第一个选项卡的内容
    current_menu_one:0,//默认菜单第一个下标
  },
  onLoad(e) {
    var that = this
    //请求艺术馆默认列表数据
    Request('xcx/page/art/').then(res => {
      console.log(res.data)
      that.setData({
        dataList: res.data,
        defaultValue_one: {
          two_category: res.data.two_category,
          two_category_article: res.data.two_category_article
        }
      })
    })
  },
  // 轮播图改变触发
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
  },
  //  点击显示二级菜单
  showMenuContent_one(e) {
    let that = this
     //请求艺术家选项下的菜单以及内容
    Request('xcx/page/art/two/' + e.currentTarget.dataset.id).then(res => {
      console.log(res.data)
      let defaultValue_one = 'defaultValue_one.two_category_article'
      let defaultValue_two = 'defaultValue_two.two_category_article'
      that.setData({
        current_menu_one:e.currentTarget.dataset.index,
        [defaultValue_one]: res.data,
        [defaultValue_two]: res.data,
      })
    })
  },

  //点击跳转公众号文章页
  goToArticle(e){
    let url = encodeURIComponent(e.currentTarget.dataset.src)
  wx.navigateTo({ url:`/pages/article/article?src=${url}`});
  },
  // 点击显示第n个tab的内容
  showClassify(e) {
    var that = this
          //请求艺术圈选项下的菜单以及内容数据
    Request('xcx/page/art/one/' + e.currentTarget.dataset.id).then(res => {
      console.log(res.data)
      that.setData({
        defaultValue_two: {
          two_category: res.data.two_category_data,
          two_category_article: res.data.article_data,
        }
      })
    })
    //分开写是因为有异步问题
    that.setData({
      showClassifyIndex: e.currentTarget.dataset.index
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    //请求艺术馆默认列表数据
    Request('xcx/page/art/').then(res => {
      // for(let i = 0; i < res.data.show_image.length; i++){
      //   res.data.show_image[i].img =  res.data.show_image[i].img+"?"+Math.random()    
      // }
      // for(let j = 0; j < res.data.two_category_article.length; j++){
      //   res.data.two_category_article[j].img =  res.data.two_category_article[j].img+"?"+Math.random()    
      // }
      console.log(res.data)
      wx.hideLoading();
      wx.showToast({
        title: '刷新成功', //提示的内容,
        icon: 'success', //图标,
        duration: 2000, //延迟时间,
      });
      that.setData({
        dataList: res.data,
        defaultValue_one: {
          two_category: res.data.two_category,
          two_category_article: res.data.two_category_article
        }
      })
    })
  },
})