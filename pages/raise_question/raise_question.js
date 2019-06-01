// miniprogram/pages/around/around.js
const app = getApp()
let newsUrl = 'http://39.108.67.61:8989/question/all'
let appUrl = 'http://39.108.67.61:8989/question/content/'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tArray: {}, //数组
    list: null,
    question_content: "",
    listpage: 0, //列表当前页码
    category: "all", //当前分类
    notfound:"找不到相应内容"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 定义this代理，处理网络返回数据，不能直接使用this
    var that = this;
    //请求网络，获取type
    wx.request({
      url: newsUrl,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: function(res) {
        //获取返回的数组
        // let dataArr = {};
        // dataArr = ;

        // // 打印输出
        // console.log(dataArr);

        //变量赋值
        that.setData({
          // id:res.id,
          tArray: res.data
        });
      },
      fail: function(res) {
        console("访问连接失败")
      }

    })
    //初始化页码从0开始
    this.setData({
      listpage: 0
    });
    //默认显示所有新闻
    // this.readList("all")
  },
  
  bindAskTap: function(e) {
    wx.navigateTo({
      url: '../writeq/writeq'
    })
  },
  getvalue: function(e) {
    var that = this
    this.setData({
      question_content: e.detail.value
    })
  },
  search: function(e) {
    var that = this;
    if (that.data.question_content == '') {
      wx.showModal({
        title: '提示',
        content: '搜索内容不能为空！',
        success: function (res) {
          if (res.confirm) {
            //这里是点击了确定以后
            console.log('用户点击确定')
          }
          else {
            //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    }
    else {
    console.log(that.data.question_content)
    wx.request({
      url: appUrl + that.data.question_content,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function(res) {
        console.log(res.data)
        that.setData({
          list: res.data
        })
      }
    })
  }
  }
})