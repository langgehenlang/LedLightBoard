// pages/sp/sp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideMenu: true,
    spNum: 1,
    spColor: '#f00',
    spInterval: 50,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarColor({
    //   frontColor: '#f00',
    //   backgroundColor: '#00f'

    // })
    // wx.setBackgroundTextStyle({
    //   textStyle: 'white' // 下拉背景字体、loading 图的样式为dark
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.startSP();
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
    this.stopSP();
  },

  startSP: function () {
    var that = this;
    //将计时器赋值给setInter
    var colors = ['#ff0000', '#FF8000', '#00FFFF',  '#FFFF00', '#00FF00','#0000FF', '8000FF']
    that.data.setInter = setInterval(
      function () {
        var numVal = that.data.spNum + 1;
        var curCol = colors[that.data.spNum % 6];
        that.setData({ 
          spNum: numVal,
          spColor: curCol
        });
        
      }
      , that.data.spInterval);
  },
  stopSP: function () {
    console.log('ddddd');
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
    
  },
  //消失 
  modelMenu: function () {
    let b = !this.data.hideMenu;
    this.setData({
      hideMenu: b
    })
    console.log(b);
    if(b){
      this.startSP();
    }else{
      this.stopSP();
      this.setData({
        spColor: 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545559205023&di=40187dd6c34615119cd21523ebbc46f1&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fmobile%2F2017-10-18%2F59e6e729ce1c7.png) 0 0rpx no-repeat;',
      });
    }
  },
  onMan: function(){
    var sn = this.data.spInterval + 10;
    if(sn>500){
      sn = 500;
    }
    this.setData({
      spInterval: sn
    })
  },
  onReset: function () {
    var sn = 50;
    this.setData({
      spInterval: sn
    })
  },
  onKuai: function () {
    var sn = this.data.spInterval - 10;
    if (sn < 10) {
      sn = 10;
    }
    this.setData({
      spInterval: sn
    })
  },
  onBack: function (){
    wx.navigateBack({ changed: true });//返回上一页
  }

})