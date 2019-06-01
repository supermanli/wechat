// pages/connect/connect.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    viewHeight: 500 /*屏幕高度*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //读取屏幕高度
    var res = wx.getSystemInfoSync();
    var height = res.screenHeight - 50;
    //设置scroll-view 高度
    this.setData({
      viewHeight: height
    });
  },
})