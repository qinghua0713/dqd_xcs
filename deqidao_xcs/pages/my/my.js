Page({
    data: {
      yspIsNo: false
      },
  scanMa(){
      wx.scanCode({
        onlyFromCamera:true,
        success(res){
          console.log(res)
        }
      })
  },
  goToDateils(){
    wx.navigateTo({
      url: '/pages/classify/classify',
    })
  },
  onLoad(){

  }
})