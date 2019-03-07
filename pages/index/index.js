//index.js
//获取应用实例
const app = getApp()

var tm = 0;//0:弹幕
var sp = 1;//1:闪屏

var mode = tm;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flagMenu: true,

    spNum: 0,
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    // // w.navigationStyle = "custom"
    // wx.setNavigationBarColor({
    //   frontColor: '#f00',
    //   backgroundColor: '#00f',
    //   navigationStyle:"custom"
    // })

    // wx.setBackgroundTextStyle({
    //   textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
    // })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 弹出层函数
   */ //出现 
  showMenu: function () { 
     this.setData({ 
       flagMenu: false 
      }) 
  }, 
  //消失 
  hideMenu: function () { 
    this.setData({ 
      flagMenu: true 
    }) 
  },
  //消失 
  modelMenu: function () {
    let b = !this.data.flagMenu;
    this.setData({
      flagMenu: b
    })
  },
  onSP: function(){
    mode = sp;
    this.startSP();
  },
  startSP: function () {
    var that = this;
    //将计时器赋值给setInter
    var colors = ['#f00', '#0f0', '#00f']
    that.data.setInter = setInterval(
      function () {
        var numVal = that.data.spNum + 1;
        that.setData({ spNum: numVal });
        console.log('setInterval==' + colors[that.data.spNum%3]);
      }
      , 200);
  },
  stopSP: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  },

})
