var address = require("../../city")
import { Request } from '../../utils/request'
Page({
    /**
    * 控件当前显示的数据
    * provinces:所有省份
    * citys 选择省对应的所有市,
    * areas 选择市对应的所有区
    * areaInfo：点击确定时选择的省市县结果
    * animationAddressMenu：动画
    * addressMenuIsShow：是否可见
    */
    data: {
        addressMenuIsShow: false,
        value: [0, 0, 0],
        provinces: [],
        citys: [],
        areas: [],
        areaInfo: '广东省，广州市，天河区'
    },

    /**
    * 生命周期函数--监听页面加载
    */
    //输入电话判断函数
    inputShowed(e) {
        console.log(e)
        var value = e.detail.value
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
        if (!myreg.test(value)) {
            wx.showToast({
                title: '手机号码有误',
                icon: 'none',
                duration: 1500
            })
        } else {
            wx.showToast({
                title: '输入正确',
                icon: 'none',
                duration: 1500
            })
        }
    },
    //用户输入name函数
    inputName(e) {
        var name = e.detail.value

    },
    onLoad: function (options) {
        let that = this
        Request('areas/', '', 'GET', {
            openid: 22222
        }).then(res => {
            that.setData({
                provinces: res.data
            })
            Request(`areas/${res.data[0].id}`).then(res => {
                that.setData({
                    citys: res.data[0].subs
                })
                Request(`areas/${res.data[0].subs[0].id}`).then(res => {
                    that.setData({
                        areas: res.data[0].subs
                    })
                })
            })
        })
    },
    // 点击所在地区弹出选择框
    select: function (e) {
        this.setData({
            addressMenuIsShow: true,
        })
    },

    // 点击地区选择取消按钮
    cityCancel: function (e) {

        this.setData({
            addressMenuIsShow: false,
        })
    },
    // 点击地区选择确定按钮
    citySure: function (e) {
        let that = this
        var value = that.data.value
        console.log(value)
        that.setData({
            addressMenuIsShow: false,
        })
        var areaInfo = that.data.provinces[value[0]].name + '·' + that.data.citys[value[1]].name + '·' + that.data.areas[value[2]].name
        that.setData({
            areaInfo:areaInfo
        })
    },
    // 处理省市县联动逻辑
    cityChange: function (e) {
        var that = this
        var value = e.detail.value 
        Request(`areas/${that.data.provinces[value[0]].id}`).then(res=>{
            that.setData({
                citys: res.data[0].subs
            })
            Request(`areas/${that.data.citys[value[1]].id}`).then(res=>{
                that.setData({
                    areas: res.data[0].subs,
                    value:value
                })
            })
        })
    },
    onShow: function () {

    }
})