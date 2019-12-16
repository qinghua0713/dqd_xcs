Page({
  data: {
    current: 0,
    imageUrl: [
      "/assets/image/tunnel_banner.png",
      "/assets/image/tunnel_banner2.png",
      "/assets/image/tunnel_banner.png",
    ],
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
    swiperIndex: 0,
    erjiMenuIsShow: false,
    tabIsShow:true
  },

  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: e.detail.current,
    })
  },
  showMenu() {
    this.setData({
      erjiMenuIsShow: !this.data.erjiMenuIsShow
    })
  },
  showArtist(){
       this.setData({
         tabIsShow:false
       })
       console.log(this.data.tabIsShow,1)
  },
  showArt(){
    this.setData({
      tabIsShow: true
    })
    console.log(this.data.tabIsShow,2)
  },
  onLoad() {

  }
})