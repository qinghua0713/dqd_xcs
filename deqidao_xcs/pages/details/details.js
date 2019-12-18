Page({
    data: {
        isShow:false
      },
  viewArr(){
     this.setData({
       isShow: !this.data.isShow
     })
     console.log(this.data.isShow)
  }
    
})