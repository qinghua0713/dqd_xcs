//app.js
import {
  Request
} from "./utils/request";
App({
  onLaunch: function () {
    var that = this
  },
  globalData: {
    userInfo: null,
    BaseUrl:'http://imcare.top:8000/'
  }
})