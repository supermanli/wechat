
const app = getApp()
let appUrl = 'http://39.108.67.61:8989/question/user/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: "",
    tArray: {}, //数组
    viewHeight: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("openid:"+app.globalData.openid)
    // 定义this代理，处理网络返回数据，不能直接使用this
    var that = this;
    //请求网络，获取type
    wx.request({
      url: appUrl + app.globalData.openid,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        console.log("data"+res.data)
        //变量赋值
        that.setData({
          tArray: res.data
        });
      },
      fail: function (res) {
        console("访问连接失败")
      }

    })
    //读取屏幕高度
    var res = wx.getSystemInfoSync();
    var height = res.screenHeight - 40 - 50;
    //设置scroll-view 高度
    this.setData({
      viewHeight: height
    });
  },
})