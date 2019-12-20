//index.js
//获取应用实例
// var app = getApp()
var utils = require("../../utils/util.js")
var request = require("../../utils/request.js")
Page({
  data: {
    dateList: [],   // 日历数据数组
    swiperCurrent: 0, // 日历轮播正处在哪个索引位置
//    dateCurrent: new Date(),  // 正选择的当前日期
    dateCurrentStr: '', // 正选择日期的 id
    currentDate: '',  // 正显示日期
    dateListArray: ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
    showTop: true,
  },
  returnHome() {
    console.log(1)
    wx.switchTab({
      url: "/pages/index/index",
    })
  },
  onPageScroll(e) {
    console.log(e.scrollTop)
    if (e.scrollTop > 100) {
      this.setData({
        showTop: false
      })
    } else {
      this.setData({
        showTop: true
      })
    }
  },
  goTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  onLoad(option) {
    var that = this;
    that.initDate(); // 日历组件程序
    request.request({
      url:"https://www.baidu.com"
    })
  },
  onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        });
      }
    });
  },
  // 日历组件部分
  // ----------------------------
  initDate() {
    var d = new Date();
    var month = utils.addZero(d.getMonth() + 1)
     var day = utils.addZero(d.getDate());
    for (var i = -5; i <= 5; i++) {
      this.updateDate(utils.DateAddDay(d, i * 7));//多少天之后的
    }
    this.setData({
      swiperCurrent: 5,
      dateCurrentStr: d.getFullYear() + '-' + month + '-' + day,
 
    });
    console.log(this.data.dateList)
  },
  // 获取这周从周日到周六的日期
  calculateDate(_date) {
    var first = utils.FirstDayInThisWeek(_date);
    var d = {
      'month': first.getFullYear() + "-" + (first.getMonth() + 1),
      'days': [],
    };
    for (var i = 0; i < 7; i++) {
      var dd = utils.DateAddDay(first, i);
      var day = utils.addZero(dd.getDate())
       var month = utils.addZero(dd.getMonth() + 1);
      d.days.push({
        'day': day,
        'id': dd.getFullYear() + '-' + month + '-' + day,
      });
    }
    return d;
  },
  // 更新日期数组数据
  updateDate(_date, atBefore) {
    var week = this.calculateDate(_date);
    //console.log([week].concat(this.data.dateList))
    //console.log(week)
    if (atBefore) {
      this.setData({
        dateList: [week].concat(this.data.dateList),
      });
    } else {
      this.setData({
        dateList: this.data.dateList.concat(week),
      });
    }
  },
  // 日历组件轮播切换
  dateSwiperChange(e) {
    var index = e.detail.current;
    var d = this.data.dateList[index].month;
    this.setData({
      currentDate: d + '月',
    });
  },
  // 点击日历某日
  chooseDate(e) {
    var str = e.target.id;
    this.setData({
       dateCurrentStr: str,
      currentDate:str,
      current_id: e.target.dataset.id
        });

  },
  // clickCurrent(e) {
  //   console.log(e)
  //   this.setData({
  //     current: e.target.dataset.id
  //   })
  //   console.log(this.data.current)
  // }
  
})
