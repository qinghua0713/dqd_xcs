import { Request } from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     dataList:'',//数据列表
     artistId:'',//艺术家ID
  },
  goToArticle(e){
    let url = encodeURIComponent(e.currentTarget.dataset.src)
 wx.navigateTo({ url: `/pages/article/article?src=${url}` });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let that = this
    //请求艺术家数据
           Request(`xcx/details/${e.id}`).then(res=>{
                  //循环给图片路径添加上随机数(因为有缓存机制导致部分ios机型图片不显示)
      for(let i = 0; i < res.data.consult.length; i++){
        res.data.consult[i].imgs =  res.data.consult[i].imgs+"?"+Math.random()    
      }
      for(let i = 0; i < res.data.goods.length; i++){
        res.data.goods[i].default_image_url =  res.data.goods[i].default_image_url+"?"+Math.random()    
      }
             res.data.aut.default_image_url = res.data.aut.default_image_url+"?"+Math.random()  
             console.log(res.data)
             that.setData({
               dataList:res.data,
               artistId:e.id
             })
           })
  },
//点击跳转详情页
goToDdetails(e){
  wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}` });
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  //下拉刷新
  onPullDownRefresh() {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
     //请求艺术家数据
     Request(`xcx/details/${that.data.artistId}`).then(res=>{
                       //循环给图片路径添加上随机数(因为有缓存机制导致部分ios机型图片不显示)
      for(let i = 0; i < res.data.consult.length; i++){
        res.data.consult[i].imgs =  res.data.consult[i].imgs+"?"+Math.random()    
      }
      for(let j = 0; j < res.data.goods.length; j++){
        res.data.goods[j].default_image_url =  res.data.goods[j].default_image_url+"?"+Math.random()    
      }
      wx.hideLoading();
      wx.showToast({
        title: '刷新成功', //提示的内容,
        icon: 'success', //图标,
        duration: 2000, //延迟时间,
      });
      that.setData({
        dataList:res.data
      })
    })

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})