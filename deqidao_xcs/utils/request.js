
export const baseUrl = 'https://www.baidu.com/'

/**
 * 统一的请求封装
 * @param {String} api 请求的api地址
 * @param {JSON} params 请求携带的参数
 * @param {String} methods 请求方式，默认GET
 * @param {boolean} [loading=true] 是否显示loading，默认true
 */
export const Request = (api, params, method = 'GET', loading = true) => {
  return new Promise((resovle, reject) => {
    if (loading) {
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.request({
      url: baseUrl + api,
      params: params,
      method: method,
      dataType: "json",
      success: res => {
        if (res.statusCode == 200) {
          wx.hideLoading()
          resovle(res)
        } else {
          wx.hideLoading()
          reject()
        }
      },
      error: err => {
        wx.hideLoading()
        reject(err)
      }
    })
  })


}
