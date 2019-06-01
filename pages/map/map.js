// map.js
Page({
  data: {
    centerX: 113.3245211,
    centerY: 23.10229,
    markers: [],
    viewHeight: 500
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    console.log('地图定位！')
    let that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        
        console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        // let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude,
          // markers: this.getSchoolMarkers()
        })
      }
    });
    //读取屏幕高度
    var res = wx.getSystemInfoSync();
    var height = res.screenHeight-40-50;
    console.log(height)
    //设置scroll-view 高度
    this.setData({
      viewHeight: height
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e)
  },
  controltap(e) {
    console.log(e.controlId)
    this.moveToLocation()
  },
  // 移动地图
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  
})