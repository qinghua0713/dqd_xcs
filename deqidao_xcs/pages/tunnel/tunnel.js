Page({
  data: {
    imageUrl: [
      "/assets/image/tunnel_banner.png",
      "/assets/image/tunnel_banner2.png",
      "/assets/image/tunnel_banner.png",
    ],//轮播图数据
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
    imageUrl3:[
      {
        text:"称号——陈冰",
        src:"/assets/image/bg_black.png",
      },
      {
        text:"意与古会 守正出新——常勇钢",
        src:"/assets/image/bg_black.png",
      },
      {
        text:"称号——名字",
        src:"/assets/image/bg_black.png",
      },
      {
        text:"称号——名称",
        src:"/assets/image/bg_black.png",
      },
    ],
    swiperIndex: 0,//轮播图的当前下标
    erjiMenuIsShow: false,//用来判断二级菜单是否显示
    tabIsShow:true//用来判断显示哪个选项卡的内容
  },
// 轮播图改变触发
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
  },
  //  点击显示二级菜单
  showMenu() {
    this.setData({
      erjiMenuIsShow: !this.data.erjiMenuIsShow
    })
  },
  // 点击显示第n个tab的内容
  showArtist(){
       this.setData({
         tabIsShow:false
       })
  },
    // 点击显示第n个tab的内容
  showArt(){
    this.setData({
      tabIsShow: true
    })
  },
  onLoad() {

  }
})