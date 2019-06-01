// miniprogram/pages/around/around.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    userListInfo: [{
        text: "我的提问",
      },
      {
        text: "我的回答",
      },

      {
        text: "帮助中心",
      },
      {
        text: "联系我们",
      }
    ],

  },
  goToQuestion: function(e) {
    // console.log( e.target.dataset.text)
    if ("我的信息" == e.target.dataset.text) {
      wx.navigateTo({
        url: '../personInfo/personInfo',
      })
    }
    if ("我的提问" == e.target.dataset.text) {
      wx.navigateTo({
        url: '../question/question',
      })
    }
    if ("我的回答" == e.target.dataset.text) {
      wx.navigateTo({
        url: '../answer/answer',
      })
    }
    if ("信息反馈" == e.target.dataset.text) {
      wx.navigateTo({
        url: '../message/message',
      })
    }
    if ("帮助中心" == e.target.dataset.text) {
      wx.navigateTo({
        url: '../help/help',
      })
    }
    if ("联系我们" == e.target.dataset.text) {
      wx.navigateTo({
        url: '../connect/connect',
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              // console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
})