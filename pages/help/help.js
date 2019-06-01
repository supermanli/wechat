// miniprogram/pages/help/help.js
const app = getApp()
let qusetionUrl = 'http://39.108.67.61:8989/help/insert'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    question_title: "",
    question_content: "",
    image: "",
    user_id: "",
    ctitle: '',
    ccontent: ''
  },
  // 回答问题点击事件
  submint_btn: function(e) {
    var that = this;
    wx.request({
      url: qusetionUrl,
      method: 'POST',
      data: {
        user_nick_name: that.data.nickName,
        question_title: that.data.question_title,
        question_content: that.data.question_content,
        user_image_url: that.data.image,
        user_id: app.globalData.openid,
      },

      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        that.setData({
            ctitle: '',
            ccontent: '',
          }),
          wx.showModal({
            title: '提示',
            content: '发送反馈成功',
            success: function(res) {
              if (res.confirm) {
                //这里是点击了确定以后
                console.log('用户点击确定')

              } else {
                //这里是点击了取消以后
                console.log('用户点击取消')
              }
            }
          })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        that.setData({
          nickName: res.userInfo.nickName,
          image: res.userInfo.avatarUrl,
        })
      }
    })
  },
  gettitle: function(e) {
    this.setData({
      question_title: e.detail.value
    })
  },
  getcontent: function(e) {
    this.setData({
      question_content: e.detail.value
    })
  },
})