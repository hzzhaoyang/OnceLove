//index.js
//获取应用实例
const app = getApp()
var server = app.globalData.server;
var userid = app.globalData.userid;
Page({
  data: {
    userInfo: {},
    markers: [{
      iconPath: "/images/map.png",
      id: 0,
      latitude: 36.718820,
      longitude: 119.128520,
      width: 50,
      height: 50
    }]
  },
  markertap(e) {
    wx.openLocation({
      latitude: 36.718820,
      longitude: 119.128520,
      scale: 18,
      name: '万达广场',
      address: '山东省潍坊市万达广场'
    })
  },
  onLoad: function () {
    var that = this
    
    wx.getUserInfo({
      success: function(res){
        that.setData({
          userInfo: res.userInfo
        })
      }
    }) 
    
    wx.request({
      url: server,
      method: 'GET',
      data: { 'c': 'info', 'userid': userid},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        // console.log(res.data)
        that.setData({
          mainInfo: res.data.mainInfo,
          zanLog: res.data.zanLog,
          zanNum: res.data.zanNum,        
          slideList: res.data.slideList
        });
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShareAppMessage: function (options) {
    //console.log(options);
    return {
      title: '标题111',
      desc: '描述22',
      path: '/pages/index/',
    }
  },
  onPullDownRefresh(){
　　console.log('--------下拉刷新-------')
　　 wx.showNavigationBarLoading() //在标题栏中显示加载  
    var that = this;
　　 wx.request({
      url: server,
      method: 'GET',
      data: { 'c': 'info', 'userid': userid},
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
        // console.log(res.data)
        that.setData({
          mainInfo: res.data.mainInfo,
          zanLog: res.data.zanLog,
          zanNum: res.data.zanNum,        
          slideList: res.data.slideList
        });
      }
    })
  },
  zan: function (event) {
    var that = this;

    var userInfo = that.data.userInfo;
    var name = userInfo.nickName;
    var face = userInfo.avatarUrl;
    wx.request({
      url: server,
      data: {'c':'zan','userid':userid,'nickname':name,'face':face},
      header: {},
      method: "GET",
      dataType: "json",
      success: res => {
        console.log(res.data);
        that.setData({
          zansta: res.data.zansta
        }); 
        
        if (res.data.success) {      
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          })
        }else {
          wx.showToast({
            title: res.data.msg,
          })
        }
      }
    })
  },
})
