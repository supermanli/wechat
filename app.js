//app.js
const app = getApp()
App({
  // 加载参数
  onLaunch: function() {
    // 打开调试
    wx.setEnableDebug({
      enableDebug: true
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 定义this代理，处理网络返回数据，不能直接使用this
    var that = this;

    wx.login({
      success: res => {
        // ------ 获取凭证 ------
        wx.getUserInfo({
          success: function(res) {
            that.globalData.userInfo = res.userInfo
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
        var code = res.code;
        if (code) {
          // console.log('获取用户登录凭证：' + code);
          // ------ 发送凭证 ------
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx033abe3dfbe73f40&secret=82cbde548ab3a5ea4e4c3f1d0db6151a&js_code=' + code + '&grant_type=authorization_code',
            data: {
              code: code
            },
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function(res) {
              if (res.statusCode == 200) {
                // console.log(res.data)
                //console.log("获取到的openid为：" + res.data)
                wx.setStorageSync('openid', res.data)
                that.globalData.openid = res.data.openid
                // console.log(that.globalData.openid)
              } else {
                // console.log(res.errMsg)
              }
            },
          })
        } else {
          //console.log('获取用户登录失败：' + res.errMsg);
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // typeof cb == "function" && cb(that.globalData.userInfo)
              // console.log(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getLocationInfo: function(cb) {
    var that = this;
    if (this.globalData.locationInfo) {
      cb(this.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function(res) {
          that.globalData.locationInfo = res;
          cb(that.globalData.locationInfo)
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    locationInfo: null,
    openid: null
  },


})