// pages/userRate/userRate.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aid:'',
    rateData:'',
    value:[],
    rateTotal:[],
    rateNum:[],
    already:0,
    d_id:'',
    fakeScore:[],
    score:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this ;
    let aid = options.aid;
    console.log(options.already)
    //let already = options.already;
    that.setData({
      already: options.already
    })
    if (options.already == 1) {
      try {
        const value = wx.getStorageSync('score')
        if (value) {
          that.setData({
            score:value
          })
        }
      } catch (e) {
        // Do something when catch error
      }
      
    }else{

    }
    
    wx.getStorage({
      key: 'key',
      success: function (res) {
        that.setData({
          d_id: res.data.d_id
        })
      },
    })
    ;
    wx.request({
      url: 'https://www.nsuim.cn/rate_choose',
      data:{
        aid:aid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res){
        console.log(res.data)
        let rateData = JSON.parse(res.data[0].a_rate);
        rateData.map(function(val,index){
          val.value = 0;
          val.newScore = that.data.score[index]
        })
        that.setData({
          rateData: rateData
        })
        console.log(that.data.rateData)
      }
    })
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

  },

  //评分
  onChange(event) {
    var that = this;
    console.log(event.detail);
    let rateData = that.data.rateData;
    let index = event.currentTarget.dataset.index;
    let rateTotal = that.data.rateTotal;
    let num = [];
    
    rateData.map(function (val, inde, arr) {
      if (index === inde){
        val.score = (val.ratePct * 10 / 5) * event.detail;
        console.log(val.score)
      }
    })
    that.setData({
      [`rateData[${index}].value`]: event.detail,
      rateTotal: rateTotal
    });
  },

  confirm(){
    var that = this;
    let rateData = that.data.rateData;
    let rateNum = that.data.rateNum;
    let fakeScore = that.data.fakeScore;
    
    rateData.map(function(val,index,arr){
      rateNum.push(val.score);
      fakeScore.push(parseInt(val.score / (val.ratePct * 10 / 5)));
      
    });
    //总分
    console.log(rateNum)
    let total = rateNum.reduce(function (pre, next) {
      return pre + next; 
    })
    if(total > 0){
      Toast.loading({
        mask: true,
        message: '提交评分中...'
      });
      wx.login({
        success: function (res) {
          wx.request({
            url: 'https://www.nsuim.cn/rate_add',
            data: {
              code: res.code,
              Appid: "wx9e7455bc8709d727",
              AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
              d_id: that.data.d_id,
              total: total,
              fakeScore:fakeScore
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data);
              Toast.clear();
              wx.showToast({
                title: '评分成功',
              })
              that.setData({
                already: 2
              })
            },
            fail: function () {
              wx.showModal({
                title: '提示',
                content: '网络异常，读取数据失败',
                confirmColor: "#006ACC",
                success(res) {
                  if (res.confirm) {

                  } else if (res.cancel) {

                  }
                }
              })
            },

          })
        }
      })
    }
    else {
      let rateNum = that.data.rateNum;
      let fakeScore = that.data.fakeScore
      
      wx.showToast({
        title: '请评分后再确定',
        icon:'none'
      })
      that.setData({
        rateNum:[],
        fakeScore:[]
      })
    }
    
    
    

    
  }
})