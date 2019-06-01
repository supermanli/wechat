//接口地址
const app = getApp()
let appUrl = "http://39.108.67.61:8989/question/all/"
let newsUrl = 'http://39.108.67.61:8989/news/page/'
var userOpenid = ''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: ["热点", "校园", "榜样", "通知", "活动", "竞赛", "美食"],
    curpage: 0,
    code:"",
    tArray: [],
    news:[],
    ishidden: false,
    viewHeight: 500 //scroll-view 高度
  },
  onReachBottom() {
  
  },
  // 类型点击事件
  typeClick(e) {
    var idx = e.currentTarget.dataset.idx;
    var that = this;
    that.setData({
      curpage: e.target.id
    });
    // console.log(e.target.id)
    var that = this;
    if (e.target.id==0){
      wx.request({
        url: appUrl,
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
            tArray: dataArr,
            news:''
          });
        }
      });
    }
    else{
      wx.request({
        url: newsUrl + e.target.id,
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
            news: dataArr,
            tArray: ""
          });
        }
      }); 
    }
   
    // console.log("curpage=", this.data.curpage);
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.getSetting({
    //   success(res) {
    //     console.log(res.authSetting)
    //     // res.authSetting = {
    //     //   "scope.userInfo": true,
    //     //   "scope.userLocation": true
    //     // }
    //   }
    // })
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
  onReady: function(options) {
    // 定义this代理，处理网络返回数据，不能直接使用this
    var that = this;
    wx.request({
      url: appUrl,
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
          tArray: dataArr,
          news:''
        });
      }
    });
  },
})