//获取应用实例
const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    userInfo: ""
  },
  onLoad: function() {
    var code = "";
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              wx.switchTab({
                url: '../index/index',
              })
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  // cosole.log("用户的code:" + res.code);
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
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
                        that.globalData.userInfo = res.data.userInfo
                        console.log(that.globalData.userInfo)
                      } else {
                        // console.log(res.errMsg)
                      }
                    },
                  })

                }

              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
    // 获取用户信息

  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
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
      // 获取到用户的信息了，打印到控制台上看下

      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      wx.switchTab({
        url: '../index/index',
      })
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false

      });
      app.globalData.userInfo = e.detail.userInfo
        // console.log(userInfo);
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },
  globalData: {
    userInfo: null,
    // locationInfo: null,
    openid: null
  },
})