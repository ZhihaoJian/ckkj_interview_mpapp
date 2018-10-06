import Taro from '@tarojs/taro'

//本地存储
export const setStorage = (key, value = "") => {
    if (!key) {
        console.warn('setStorage should have a key')
        return;
    }
    wx.setStorage({
        key,
        data: value
    })
}

//获取本地存储的数据
export const getStorage = (key) => {
    if (!key) {
        console.warn('getStorage should have a key');
        return;
    }
    return new Promise((resolve, reject) => {
        wx.getStorage({
            key,
            success(res) {
                resolve(res.data);
            },
            fail: function () {
                reject();
            }
        })

    })
}

//删除指定的本地缓存
export const removeStorage = (key) => {
    if (!key) {
        console.warn('removeStorage should have a key');
        return;
    }
    return new Promise((resolve, reject) => {
        wx.removeStorage({
            key,
            success: function (res) {
                resolve(res.data)
            },
            fail() {
                reject();
            }
        })
    })
}

//获取所有的缓存key
export const getAllStorage = () => {
    return new Promise((resolve, reject) => {
        wx.getStorageInfo({
            success: function (res) {
                resolve(res.keys)
            },
            fail: function () {
                reject();
            }
        })
    })
}

//检测是否已经链接网络
export const hasNetWork = () => {
    return new Promise((resolve, reject) => {
        wx.getNetworkType({
            success({ networkType }) {
                if (networkType === 'none' || networkType === 'unknown') {
                    resolve(false)
                } else {
                    resolve(true)
                }
            },
            reject() {
                console.log('尚未链接到网络');
                reject();
            }
        })
    })
}

//保留当前页面，跳转到应用内的某个页面
export const navigateTo = (url, options = {}) => {
    if (!url) {
        console.warn('navigate should have a url');
        return
    }

    let queryString = "";
    const keys = Object.keys(options);
    if (keys.length) {
        keys.forEach(key => {
            queryString += `&${key}=${options[key]}`;
        });
        queryString = queryString.slice(1);
    }

    const newUrl = `${url}?${queryString}`

    Taro.navigateTo({
        url: newUrl
    });
}

//简历保存到云端数据库
export const connectToDB = (data) => {
    wx.cloud.init({ traceUser: true });
    const db = wx.cloud.database()
    const { username, phone, gender, type, gradeChecked, majorChecked, directionChecked, myKnowledge, myPlan } = data;
    return new Promise((resolve, reject) => {
        db.collection('users').add({
            data: {
                name: username,
                phoneNumber: phone,
                sex: gender,
                recruitDirection: type,
                class_select: gradeChecked,
                major_select: majorChecked,
                direction_select: directionChecked,
                skill: myKnowledge,
                plan: myPlan,
            },
            success: res => {
                resolve(res);
            },
            fail: err => {
                reject();
            }
        })
    })
}

//判断是否过期
export const isExpired = () => {
    const date = new Date();
    const expire = new Date(2018, 10, 10, 12);
    return date > expire;
}