// pages/sort/sort.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist: [{
      imgSrc: "http://img5.imgtn.bdimg.com/it/u=565201945,1234533334&fm=200&gp=0.jpg",
      showname: '致青春',
      name: '张姗姗',
      showdes: "本例演示如何创建“宝丽来”图片，并旋转图片。",
      piao: "10"
    }, {
      imgSrc: "http://img5.imgtn.bdimg.com/it/u=1845820460,1697733801&fm=26&gp=0.jpg",
      showname: '捞鱼生',
      name: '李思',
      showdes: "属性是由逗号分隔的阴影列表，每个阴影由 2-4 个长度值、可选的颜色值以及可选的 inset 关键词来规定。",
      piao: "31"
    }, {
      imgSrc: "http://img0.imgtn.bdimg.com/it/u=3051238451,3727429499&fm=26&gp=0.jpg",
      showname: '年中大促',
      name: '王二二',
      showdes: "微信小程序之生成图片分享朋友圈通过社交软件分享的方式来进行营销小程序,是一个常用的运营途径。",
      piao: "23"
    }, {
      imgSrc: "http://img0.imgtn.bdimg.com/it/u=2579160203,1101982201&fm=26&gp=0.jpg",
      showname: '定向越野',
      name: '罗洛洛',
      showdes: "《制作器》的红包照片功能,可以生成一张这样的带小程序码和用户头像的分享卡片",
      piao: "45"
    }, {
      imgSrc: "http://img1.imgtn.bdimg.com/it/u=3532424552,1574229225&fm=200&gp=0.jpg",
      showname: '你还会回来吗？',
      name: '文琪琪',
      showdes: "心动吗?那就继续往下看!先上页面结构吧,也就是wxml文件",
      piao: "23"
    }, {
      imgSrc: "http://img5.imgtn.bdimg.com/it/u=1306501161,4066291878&fm=26&gp=0.jpg",
      showname: '新',
      name: '王酷酷',
      showdes: "小程序分享支持自定义封面图，公众号及小程序客服可发送小程序卡片。",
      piao: "45"
    }]
  }, todes: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.index;
    console.log(id);
    wx.navigateTo({
      url: '/pages/des/des?index=' + id,
    });
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})