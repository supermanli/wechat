//接口地址
const app = getApp()
let appUrl = "http://39.108.67.61:8989/comment/user/"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code: "",
    tArray: [],
    ishidden: false,
    viewHeight: 500 //scroll-view 高度
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //创建动画实例
    this.animation = wx.createAnimation({
      //动画持续时间
      duration: 2000,
      //   *  linear  动画一直较为均匀
      //  *  ease    从匀速到加速在到匀速
      //  *  ease-in 缓慢到匀速
      //  *  ease-in-out 从缓慢到匀速再到缓慢
      timingFunction: "ease",
    })
    //读取屏幕高度
    var res = wx.getSystemInfoSync();
    var height = res.screenHeight - 40 - 50;
    //设置scroll-view 高度
    this.setData({
      viewHeight: height
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    // 定义this代理，处理网络返回数据，不能直接使用this
    var that = this;
    wx.request({
      url: appUrl + app.globalData.openid,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        //获取返回的数组
        let dataArr = {};
        dataArr = res.data;
        //变量赋值
        that.setData({
          tArray: dataArr
        });
      }
    });

  },
 
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})