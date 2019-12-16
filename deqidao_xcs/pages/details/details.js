Page({
    data: {
        isShow:false
      },
  viewArr(){
   //  this.data.isShow = !this.data.isShow
     this.setData({
       isShow: !this.data.isShow
     })
     console.log(this.data.isShow)
  }
    
})