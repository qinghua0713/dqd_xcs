
const request = (obj) => {
  wx.request({
    url: obj.url,
    data: obj.data,
    header: obj.method == "GET" ? { "Content-Type": "json" } : { "Content-Type": "application/x-www-form-urlencoded" },
    method: obj.method,
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
     // console.log(res)
     },
    fail: function (res) { },
    complete: function (res) { },
  })
}
module.exports = {
  request: request
}
