import { Request } from '../utils/request'
//用户登陆
export const Login = (nickName,avatarUrl) => {
    wx.getStorage({
      key: 'resultUserInfo',
      success: (res) => {
        console.log('我没执行登陆请求')
      },
      fail: () => { 
        wx.login({
            success: (res) => {
                Request('user/code/' + res.code, {
                    username: nickName,
                    profile: avatarUrl
                }, 'POST').then(res => {
                    console.log('我执行了登陆请求')
                    wx.setStorageSync('resultUserInfo', res.data)
                })
            },
        })
      },
    })

}