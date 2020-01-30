import { Request } from '../../utils/request'
Page({
  data: {
    dataList: null,//轮播图数据
    current: 0,//轮播图当前项
    classifyList: [],//分类每一个藏品的数据列表
    artworkId: null,//艺术品每一类的id
    filtratePirce: {
      lowest: '',
      tallest: ''
    },//筛选输入框的最大小值
    artistId: 0,//当前选中的艺术家
    PageUrl: '',//下拉加载更多的请求地址
    currentClass: '',//路由传过来当前分类值
    isLowOrTall: 0,//用来判断用户是否点击了从高到底或者从低到高(0代表没点)
  },
  //轮播图改变函数
  swiperChange(e) {
    var that = this;
    that.setData({
      current: e.detail.current,
    })

  },
  onLoad(e) {
    var that = this
    //请求分类页的轮播图
    console.log(e.id)
    Request('xcx/category/imgs/').then(res => {
      that.setData({
        dataList: res.data,
        artworkId: e.id,
        currentClass: e.value
      })
      //判断如果跳转没有传值默认显示第一条  
      if (e.value == undefined && e.id == undefined) {
        //请求分类的列表数据
        Request('xcx/category/').then(res => {
          that.setData({
            classifyList: res.data,
            PageUrl: res.data.next,
            value: '分类',
          })
        })
      } else {
        that.setData({
          value: e.value,
        })
        //请求分类的列表数据
        Request('xcx/category/' + e.id).then(res => {
          that.setData({
            classifyList: res.data,
            PageUrl: res.data.next
          })
        })
      }

    })
  },
  //滚动条触底函数
  onReachBottom() {
    let that = this
    wx.request({
      url: that.data.PageUrl, //开发者服务器接口地址",
      success: res => {
        if (res.data.next == null) {
          wx.showToast({
            title: '已经到底了',
            icon: 'none',
            duration: 2000
          })
        }
        let results = 'classifyList.results'
        //拼接请求回来的数据
        var results_two = that.data.classifyList.results.concat(res.data.results)
        that.setData({
          PageUrl: res.data.next,//请求成功从新给更新请求地址
          [results]: results_two
        })
      },
    });

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
  artistScreening(e) {

    let that = this
    that.setData({
      artistId_two: e.currentTarget.dataset.id
    })
    if (that.data.artistId == e.target.dataset.id) {
      that.setData({
        artistId: 0,//用来判断加样式

      })
    } else {
      //请求艺术家的分类
      Request(`xcx/category/`, {
        author: e.currentTarget.dataset.id
      }).then(res => {
        that.setData({
          classifyList: res.data,
          artistId: e.target.dataset.id,//用来判断加样式
        })
      })
    }
    console.log(that.data.artistId)
  },
  //输入的最小金额比最大金额大的话就调用
 priceChange(){
   let that = this
        //如果输入的最小值大于最大值则把两个值调换过来再请求
        if (parseFloat(that.data.filtratePirce.lowest) > parseFloat(that.data.filtratePirce.tallest)) {
          let lowest = 'filtratePirce.lowest'
          let tallest = 'filtratePirce.tallest'
          that.setData({
            [lowest]: that.data.filtratePirce.tallest,
            [tallest]: that.data.filtratePirce.lowest
          })
       
        }
 },
  //手动输入金额筛选按钮
  filtrateClassify() {
    let that = this
    let reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^[1-9]$)|(^\d\.[1-9]{1,2}$)|(^\d\.[0]{1}[1-9]{1}$|(^\d\.[1-9]{1}[0]{1}$)$)/;//判断金额合法性
    //如果用户输入的最小值大于最大值那么就交换它们的值再请求
    //如果输入的值不为空
    if (that.data.filtratePirce.lowest != '' && that.data.filtratePirce.tallest != '') {
      //如果输入的金额合法
      if (reg.test(that.data.filtratePirce.lowest) && reg.test(that.data.filtratePirce.tallest)) {
        //如果分类id不等于undefined
        if (that.data.artworkId != undefined) {
          //如果作者是选中状态
          //有分类id 且 选中了艺术家
          if (that.data.artistId == that.data.artistId_two) {
     
           // 点击了从高到低或低到高
            if (that.data.isLowOrTall != 0) {
              that.priceChange()
              Request(`xcx/category/${that.data.artworkId}?author=${that.data.artistId_two}&ordering=${that.data.isLowOrTall == 1 ? 'price' : '-price'}`, {
                min: that.data.filtratePirce.lowest,
                max: that.data.filtratePirce.tallest
              }).then(res => {
                console.log(res.data)
                that.setData({
                  classifyList: res.data,
                  isShowCover: false,
                })
              })

            } else {
              that.priceChange()
              //没有点击从高到低或低到高
              Request(`xcx/category/${that.data.artworkId}?author=${that.data.artistId_two}`, {
                min: that.data.filtratePirce.lowest,
                max: that.data.filtratePirce.tallest
              }).then(res => {
                console.log(res.data)
                that.setData({
                  classifyList: res.data,
                  isShowCover: false,
                })
              })
            }
          } else {//else走的是有分类id 且 没选中艺术家
            //点击了从高到低或低到高
            if(that.data.isLowOrTall != 0){
              that.priceChange()
              Request(`xcx/category/${that.data.artworkId}?ordering=${that.data.isLowOrTall == 1 ? 'price' : '-price'}`, {
                min: that.data.filtratePirce.lowest,
                max: that.data.filtratePirce.tallest
              }).then(res => {
                console.log(res.data)
                that.setData({
                  classifyList: res.data,
                  isShowCover: false,
                })
              })
            }else{
              that.priceChange()
                //只传了分类id
              Request(`xcx/category/${that.data.artworkId}`, {
                min: that.data.filtratePirce.lowest,
                max: that.data.filtratePirce.tallest
              }).then(res => {
                console.log(res.data)
                that.setData({
                  classifyList: res.data,
                  isShowCover: false,
                })
              })
            }
      
          }
        } else {//else走的是没有分类Id
          that.priceChange()
          //没有分类Id 且 点击了艺术家
          if (that.data.artistId == that.data.artistId_two) {
             //点击了从高到低或低到高
            if (that.data.isLowOrTall != 0 ) {
              that.priceChange()
              Request(`xcx/category/?author=${that.data.artistId_two}&ordering=${that.data.isLowOrTall == 1 ? 'price' : '-price'}`, {
                min: that.data.filtratePirce.lowest,
                max: that.data.filtratePirce.tallest
              }).then(res => {
                console.log(res.data)
                that.setData({
                  classifyList: res.data,
                  isShowCover: false,
                })
              })

            }else{
              that.priceChange()
              //只传了艺术家id
              Request(`xcx/category/?author=${that.data.artistId_two}`, {
                min: that.data.filtratePirce.lowest,
                max: that.data.filtratePirce.tallest
              }).then(res => {
                console.log(res.data)
                that.setData({
                  classifyList: res.data,
                  isShowCover: false,
                })
              })
            }
          }else{// 这里是 没有分类Id 且 没有点击艺术家
            //输入了金额 且 点击了从高到低或低到高
            if(that.data.isLowOrTall != 0){
              that.priceChange()
              Request(`xcx/category/?ordering=${that.data.isLowOrTall == 1 ? 'price' : '-price'}`, {
                min: that.data.filtratePirce.lowest,
                max: that.data.filtratePirce.tallest
              }).then(res => {
                console.log(res.data)
                that.setData({
                  classifyList: res.data,
                  isShowCover: false,
                })
              }) 
            }else{
              that.priceChange()
              //只输入了金额筛选
              Request(`xcx/category/`, {
                min: that.data.filtratePirce.lowest,
                max: that.data.filtratePirce.tallest
              }).then(res => {
                console.log(res.data)
                that.setData({
                  classifyList: res.data,
                  isShowCover: false,
                })
              }) 
            }
       
          }

        }
      } else {
        wx.showToast({
          title: '筛选格式错误',
          icon: 'none',
          duration: 2000
        })
      }
    } else if (that.data.filtratePirce.lowest == '' && that.data.filtratePirce.tallest == '') {
      that.setData({
        isShowCover: false,
        artistId: 0,//设置为0就是去除了选中
        isLowOrTall: 0,//设置为0就是清空上一次的点击高到低或者低到高
      })
      //可以不用return 但是为了保险起见加上
    } else if (that.data.filtratePirce.lowest == '' || that.data.filtratePirce.tallest == '') {

      wx.showToast({
        title: '筛选金额不能为空',
        icon: 'none',
        duration: 2000
      })
    }

  },
  //从低到高筛选
  LowToTall() {
    let that = this
    Request(`xcx/category/?ordering=price`).then(res => {
      that.setData({
        classifyList: res.data,
        isLowOrTall: 1
      })
      console.log(that.data.isLowOrTall)
    })


  },
  //从高到低筛选
  TallToLow() {
    let that = this
    Request(`xcx/category/?ordering=-price`).then(res => {
      that.setData({
        classifyList: res.data,
        isLowOrTall: 2
      })
      console.log(that.data.isLowOrTall)
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
    if (e.scrollTop > 300) {
      this.setData({
        showTop: true//滚动的高度大于300显示回到顶部按钮
      })
    } else {
      this.setData({
        showTop: false//否则隐藏
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
  //点击页面任何地方隐藏下拉框的值
  concealOptionsValue() {
    this.setData({
      showValue: false
    })
  },
  //选类别中的值
  selectCentre(e) {
    Request(`xcx/category/${e.target.dataset.id}`).then(res => {
      this.setData({
        showValue: false,
        value: e.target.dataset.item,
        classifyList: res.data,
        artworkId:e.target.dataset.id
      })
    })
  },
  //点击显示筛选盒子
  showCover_one() {
    this.setData({
      isShowCover: true
    })
  },
  //点击隐藏筛选盒子
  hiddenCover() {
    this.setData({
      isShowCover: false,//隐藏遮罩
      artistId: 0,//从新赋值0
      isLowOrTall: 0,//从新赋值0
    })
  },
  //点击显示筛选盒子(没办法的办法，不然会触发父盒子的事件)
  showCover_two() {
    this.setData({
      isShowCover: true
    })
  },
  //弹窗防止穿透
  touchHandler() {
    return
  },
  //点击跳转详情页
  goToDateils(e) {
    wx.navigateTo({ url: `/pages/details/details?id=${e.currentTarget.dataset.id}` });
  },

  //下拉刷新
  onPullDownRefresh() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    //请求分类页的轮播图
    Request('xcx/category/imgs/').then(res => {
      that.setData({
        dataList: res.data,
      })
      //判断如果跳转没有传值默认显示第一条
      if (that.data.currentClass == undefined && that.data.artworkId == undefined) {
        //请求分类的列表数据
        Request('xcx/category/').then(res => {
          wx.hideLoading();
          wx.showToast({
            title: '刷新成功', //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
          });
          that.setData({
            classifyList: res.data,
            PageUrl: res.data.next,
            value: '分类',
          })
        })
      } else {
        console.log(that.data.artworkId)
        //请求分类的列表数据
        Request('xcx/category/' + that.data.artworkId).then(res => {
          wx.hideLoading();
          console.log(res)
          wx.showToast({
            title: '刷新成功', //提示的内容,
            icon: 'success', //图标,
            duration: 2000, //延迟时间,
          });
          that.setData({
            classifyList: res.data,
            PageUrl: res.data.next
          })
        })
      }

    })

  },
})