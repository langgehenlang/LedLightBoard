// pages/tm/dm.js
var colorlist = [{ color: "#FFF" }, { color: "#000" }, { color: "#F00" }, { color: "#0F0" }, { color: "#00F" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }, { color: "#FFFFFF" }];

Page({
  data: {
    items: [
      { value: 'USA', title: '美国' },
      { value: 'CHN', title: '中国', checked: 'true' },
      { value: 'BRA', title: '巴西' },
      { value: 'ENG', title: '英国' },
    ],
    back_ground: '#000',
    dm_text: '你好！蟹蟹你的关注',
    dm_textcolor: '#fff',
    dm_textsize: 64,
    marqueePace: 1.5,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 6,
    orientation: 'top',//滚动方向
    interval: 1, // 时间间隔
    edittext:"",
    textcolorlist: colorlist,
    backgroudlist: colorlist
  },
  onLoad: function () {
    let that = this;
    this.setData({
      edittext: that.data.dm_text
    });
  },
  onInput: function(e){
    this.setData({
      edittext: e.detail.value
    });
  },
  onsave: function(e){
    let value = this.data.edittext.replace(/\s+/g, '');
    console.log('保存：', value)
    if (value == undefined 
      || value == '' 
      || value.length == 0 ){
        wx.showToast({
          title: '不能保存空内容',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }else{
        this.setData({
          dm_text: value
        });
      }
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      country: e.detail.value
    });
  },
  onShow: function () {
    // 页面显示
    var that = this;
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowHeight;// 屏幕宽度
    that.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : that.data.marquee2_margin//当文字长度小于屏幕长度时，需要增加补白
    });
    // that.run1();// 水平一行字滚动完了再按照原来的方向滚动
    // vm.run2();// 第一个字消失后立即从右边出现
  },
  run1: function () {
    var that = this;
    var interval = setInterval(function () {
      if (-that.data.marqueeDistance < (that.data.length+50)) {
        console.log(that.data.marqueeDistance - that.data.marqueePace);
        that.setData({
          marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        console.log('dddddddd');
        that.setData({
          marqueeDistance: that.data.windowWidth
        });
        that.run1();
      }
    }, that.data.interval);
  },
  run2: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance2 < vm.data.length) {
        // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
        vm.setData({
          marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
          marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
        });
      } else {
        if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
          vm.setData({
            marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
          });
          clearInterval(interval);
          vm.run2();
        } else {
          clearInterval(interval);
          vm.setData({
            marqueeDistance2: -vm.data.windowWidth
          });
          vm.run2();
        }
      }
    }, vm.data.interval);
  }
})