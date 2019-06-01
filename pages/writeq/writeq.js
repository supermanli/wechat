// pages/writeq/writeq.js
const app = getApp()
let insertUrl = 'http://39.108.67.61:8989/question/insert'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['游玩', '学习', '美食', '运动', '情感'],
    index: 0,
    nickName: "no",
    question_title: "",
    question_content: "",
    image: "",
    ctitle: '',
    ccontent: ''
  },
  
// 选择框
  bindPickerChange: function (e) {
    var that = this;
    this.setData({
      index: e.detail.value
    })
    console.log(that.data.array[that.data.index])
  },
  // 获取标题
  gettitle: function(e){
    this.setData({
      question_title: e.detail.value
    })
  },
  // 获取内容
  getcontent: function(e){
    this.setData({
      question_content: e.detail.value
    })
  },
  // 添加
  addq: function(e){
    var that = this;
    that.setData({
      ctitle: '',
      ccontent: '',
    })
    if (that.data.question_content == '') {
      wx.showModal({
        title: '提示',
        content: '内容不能为空！',
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
    wx.request({
      url: insertUrl ,
      method: 'POST',
      data: {
        user_id: app.globalData.openid,
        user_nick_name: app.globalData.userInfo.nickName,
        question_title: that.data.array[that.data.index],
        question_content: that.data.question_content,
        user_image_url: app.globalData.userInfo.avatarUrl,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        wx.showModal({
          title: '提示',
          content: '发布提问成功',
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
    })
  }
  }
})