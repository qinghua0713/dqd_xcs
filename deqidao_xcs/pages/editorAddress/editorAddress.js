
import { Request } from '../../utils/request'
const app = getApp()
Page({
    /**
    * 控件当前显示的数据
    * provinces:所有省份
    * citys 选择省对应的所有市,
    * areas 选择市对应的所有区
    * areaInfo：点击确定时选择的省市县结果
    * addressMenuIsShow：是否可见
    */
    data: {
        addressMenuIsShow: false,
        value: [0, 0, 0],
        provinces: [],
        citys: [],
        areas: [],
        userName: '',//用户填写地址的姓名
        iPhone: '',//用户填写的手机号码
        checkedAddress: '',//选中的省市区地址
        checkedProvincesId: '',//选中的省Id
        checkedCitysId: '',//选中的市Id
        checkedAreasId: '',//选中的区Id
        specificAddress: "",//用户填写的详细地址
        switchChecked: false,//是否设置默认地址
        addressId: '',//当前地址的id
        //------------------------------区分射线-------------------------------------
        editedUserName: '',//用户编辑过的名字
        editedIphone: '',//用户编辑过的手机号码
        editedCheckedProvincesId: '',//用户编辑过的省Id
        editedCheckedCitysId: '',//用户编辑过的市Id
        editedCheckedAreasId: '',//用户编辑过的区Id
        editedSpecificAddress: '',//用户编辑过的详细地址
        editedSwitchChecked: '',//用户编辑过的是否默认地址
    },

    /**
    * 生命周期函数--监听页面加载
    */
    //输入电话判断函数
    inputShowed(e) {
        this.setData({
            iPhone: e.detail.value
        })
    },
    //用户输入名字函数
    inputName(e) {
        this.setData({
            userName: e.detail.value
        })
    },
    //详细地址
    specificAddress(e) {
        this.setData({
            specificAddress: e.detail.value
        })
    },
    //点击设为默认地址
    isSwitchChecked(e) {
        this.setData({
            switchChecked: e.detail.value
        })
    },
    //保存按钮事件
    goToAddress() {
        let that = this
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
        if (that.data.userName == '' || that.data.iPhone == '' || that.data.specificAddress == '' || that.data.checkedAddress == '') {
            wx.showToast({
                title: '请填写完整地址',
                icon: 'none',
                duration: 1500
            })
            return
        } else if (!myreg.test(that.data.iPhone)) {
            wx.showToast({
                title: '手机号码有误',
                icon: 'none',
                duration: 1500
            })
            //判断，如果用户是从地址页点击添加地址进来的就执行
            //判断用户是否改过用户名
        } else if (that.data.addressId == "" ) {
            console.log('POST')
            wx.getStorage({
                key: 'resultUserInfo',
                success: (res) => {
                    //发送已编辑的地址给后端
                    wx.request({
                        url: app.globalData.BaseUrl + 'user/addr',
                        data: {
                            receiver: that.data.userName,
                            mobile: that.data.iPhone,
                            is_default_address: that.data.switchChecked == true ? 1 : 0,
                            province: that.data.checkedProvincesId,
                            city: that.data.checkedCitysId,
                            district: that.data.checkedAreasId,
                            place: that.data.specificAddress
                        }, //请求的参数",
                        method: 'POST',
                        dataType: 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
                        header: {
                            openid: res.data.openid
                        },
                        success: res => {
                            if(res.statusCode == 201){
                                wx.showToast({
                                    title: '添加成功', //提示的内容,
                                    icon: 'success', //图标,
                                    duration: 2000, //延迟时间,
                                  });
                            }else if(res.statusCode == 400){
                                wx.showToast({
                                    title: '收货地址不能超过7个', //提示的内容,
                                    icon: 'none', //图标,
                                    duration: 2000, //延迟时间,
                                  });
                            }
                        },
                        complete: () => {
                            wx.navigateTo({ url: '/pages/address/address' });
                        }
                    });

                },
                fail: () => {
                    wx.showToast({
                        title: '用户未授权',
                        icon: 'none',
                        duration: 2000
                    })
                },
            })
        }else if (that.data.addressId !='' && that.data.editedUserName != that.data.userName
    || that.data.editedIphone != that.data.iPhone
    || that.data.editedCheckedProvincesId != that.data.checkedProvincesId
    || that.data.editedCheckedCitysId != that.data.checkedCitysId
    || that.data.editedCheckedAreasId != that.data.checkedAreasId
    || that.data.editedSpecificAddress != that.data.specificAddress
    || that.data.editedSwitchChecked != that.data.switchChecked) {
        console.log('PUT')
        console.log( that.data.checkedProvincesId,
        that.data.checkedCitysId,
           that.data.checkedAreasId,
           that.data.specificAddress)
            wx.getStorage({
                key: 'resultUserInfo',
                success: (res) => {
                    wx.request({
                        url: app.globalData.BaseUrl + 'user/addr', //开发者服务器接口地址",
                        data: {
                            addr_id:that.data.addressId,
                            receiver: that.data.userName,
                            mobile: that.data.iPhone,
                            is_default_address: that.data.switchChecked == true ? 1 : 0,
                            province: that.data.checkedProvincesId,
                            city: that.data.checkedCitysId,
                            district: that.data.checkedAreasId,
                            place: that.data.specificAddress
                        }, //请求的参数",
                        method: 'PUT',
                        header: {
                            openid: res.data.openid
                        },
                        success: res => {
                          
                        },
                        complete: () => {
                            wx.navigateTo({ url: '/pages/address/address' });
                        }
                    });
                },
            })

        }else{
            console.log('没有执行请求')
            wx.navigateTo({ url: '/pages/address/address' });
        }
    },
    //删除地址请求
    deleteAddress() {
        let that = this
        wx.getStorage({
            key: 'resultUserInfo',
            success: (_res) => {
                wx.showModal({
                    content: '确定删除该地址吗?',
                    success(res) {
                        if (res.confirm) {
                            Request(`user/addr`, {
                                addr_id: that.data.addressId
                            }, 'DELETE', {
                                openid: _res.data.openid
                            }).then(res => {
                                wx.navigateTo({ url: '/pages/address/address' });
                            })
                        } else if (res.cancel) {
                        }
                    }
                })
            },
            fail: () => {
                wx.showToast({
                    title: '用户未授权',
                    icon: 'none',
                    duration: 2000
                })
            },
        })

    },
    //页面加载事件处理函数
    onLoad: function (e) {
        let that = this
        if (e.id) {
            that.setData({
                addressId: e.id,//地址id
                userName: e.receiver,//用户名
                iPhone: e.mobile,//手机号码
                checkedAddress: e.province + ',' + e.city + ',' + e.district,//省市区
                specificAddress: e.place,//详细地址
                checkedProvincesId:e.provinceId,//传过来的省id
                checkedCitysId:e.cityId,////传过来的市id
                checkedAreasId:e.districtId,//传过来的区id
                switchChecked:(e.ischecked == 1 ? true : false),//传过来的是否默认地址
                //------------------------------区分射线-------------------------------------
                editedUserName: e.receiver,//用户的名字
                editedIphone: e.mobile,//用户的手机号码
                editedCheckedProvincesId:e.provinceId,//传过来的省id
                editedCheckedCitysId:e.cityId,////传过来的市id
                editedCheckedAreasId:e.districtId,//传过来的区id
                editedSpecificAddress:e.place,//用户编辑过的详细地址
                editedSwitchChecked: (e.ischecked == 1 ? true : false),//用户编辑过的是否默认地址
            })
        }
        wx.getStorage({
            key: 'resultUserInfo',
            success: (res) => {
                //省市区三级联动(省)
                Request('areas/', '', 'GET', {
                    openid: res.data.openid
                }).then(res => {
                    that.setData({
                        provinces: res.data
                    })
                    //省市区三级联动(市)
                    Request(`areas/${res.data[0].id}`).then(res => {
                        that.setData({
                            citys: res.data[0].subs
                        })
                        //省市区三级联动(区)
                        Request(`areas/${res.data[0].subs[0].id}`).then(res => {
                            that.setData({
                                areas: res.data[0].subs
                            })
                        })
                    })
                })
            },
            fail: () => {
                wx.showToast({
                    title: '用户未授权',
                    icon: 'none',
                    duration: 2000
                })
            },
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
        that.setData({
            addressMenuIsShow: false,
        })
        that.setData({
            checkedAddress: that.data.provinces[value[0]].name + "," + that.data.citys[value[1]].name + "," + that.data.areas[value[2]].name,
            checkedProvincesId: that.data.provinces[value[0]].id,
            checkedCitysId: that.data.citys[value[1]].id,
            checkedAreasId: that.data.areas[value[2]].id
        })
    },
    // 处理省市县联动逻辑
    cityChange: function (e) {
        var that = this
        var value = e.detail.value
        Request(`areas/${that.data.provinces[value[0]].id}`).then(res => {
            that.setData({
                citys: res.data[0].subs
            })
            Request(`areas/${that.data.citys[value[1]].id}`).then(res => {
                that.setData({
                    areas: res.data[0].subs,
                    value: value
                })
            })
        })
    },
    onShow: function () {

    }
})