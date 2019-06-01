// pages/showsearch/showsearch.js
const app = getApp();
let questionUrl = 'http://39.108.67.61:8989/comment/question/'
let commentUrl = 'http://39.108.67.61:8989/comment/insert'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    question_title: '',
    question_content: '',
    image: '',
    time: '',
    nickname: '',
    hidden: true,
    inputvalue:'',
    list: null,
    comment_content: '',
    obj: [],
    avatar: '',
    name: '',  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: questionUrl +options.id,
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        // console.log(res.data)
        that.setData({
          list: res.data,
        })
      }
    })
    that.setData({
      id: options.id,
      question_title: options.question_title,
      question_content: options.question_content,
      image: options.image,
      nickname: options.nickname,
      time: options.time,
      avatar: app.globalData.userInfo.avatarUrl,
      name: app.globalData.userInfo.nickName,
    })
  },
// 获取评论内容
  getcommmet: function(e){
    this.setData({
      comment_content: e.detail.value
    })
  },
  // 提交点击事件
  send: function(e){
    var that = this;
    if (that.data.comment_content == '') {
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
    let obj = that.data.obj;
    obj.push(that.data.comment_content)
    wx.request({
      url: commentUrl,
      method: 'POST',
      data: {        
        user_id: app.globalData.openid,
        question_id: that.data.id,
        comment_content: that.data.comment_content,
        user_image_url: app.globalData.userInfo.avatarUrl,
        user_nick_name: app.globalData.userInfo.nickName,        
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
      },
    })
    that.setData({
      inputvalue: '',
      obj,
    })
  }
  }
})