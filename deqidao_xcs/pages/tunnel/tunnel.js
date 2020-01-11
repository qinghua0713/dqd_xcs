import { Request } from "../../utils/request";
Page({
  data: {
    imageUrl2: [
      {
        text: "文明的起源——石器诞生",
        src: "/assets/image/sqdysjs.png"
      },
      {
        text: "早期制造工艺",
        src: "/assets/image/zqzzgy.png",
      },
      {
        text: "石器时代遗迹",
        src: "/assets/image/sqsdyj.png",
      },
      {
        text: "石器的艺术鉴赏",
        src: "/assets/image/sqdysjs.png"
      }
    ],
    imageUrl3: [
      {
        text: "称号——陈冰",
        src: "/assets/image/bg_black.png",
      },
      {
        text: "意与古会 守正出新——常勇钢",
        src: "/assets/image/bg_black.png",
      },
      {
        text: "称号——名字",
        src: "/assets/image/bg_black.png",
      },
      {
        text: "称号——名称",
        src: "/assets/image/bg_black.png",
      },
    ],
    swiperIndex: 0,//轮播图的当前下标
    dataList: null,//数据列表
    defaultValue: '',//默认渲染的分类选项数据
    showClassifyIndex: 0,//默认显示第一个选项卡的内容
  },
  onLoad(e) {
    var that = this

    //请求艺术馆默认列表数据
    Request('xcx/page/art/').then(res => {
      that.setData({
        dataList: res.data,
        defaultValue: {
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
  showMenuContent(e) {
    Request('xcx/page/art/two/' + e.currentTarget.dataset.id).then(res => {
      let two_category_article = 'defaultValue.two_category_article'
      this.setData({
        [two_category_article]:res.data
      })
    })

  },
  // 点击显示第n个tab的内容
  showClassify(e) {
    var that = this
    Request('xcx/page/art/one/' + e.currentTarget.dataset.id).then(res => {
      //更新默认数据
      that.setData({
        defaultValue: {
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
})