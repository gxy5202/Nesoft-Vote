// pages/rate/rate.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rateName:'',
    rate:app.globalData.rateInfo.info,
    rateRange:[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1],
    percent: app.globalData.rateInfo.percent,
    isShow:false,
    confirm:''
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
    var that = this;
    that.setData({
      rate: app.globalData.rateInfo.info,
      percent: app.globalData.rateInfo.percent
    })
    let percent = that.data.percent;
    console.log(app.globalData.rateInfo);
    let total = percent.reduce(function (pre, next) {
      return pre + next
    })

    //判断评分标准百分比是否满足一个
    if (total === 1) {
      that.setData({
        isShow: true
      })
    }
    else {
      that.setData({
        isShow: false
      })
    }
    
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
  //添加评分名称
  addName(e){
    console.log(e.detail.value);
    let rateList = this.data.rate;
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`rate[${index}].rateName`]:e.detail.value
    })
  },
  //删除评分标准
  removeItem(e){
    var that = this;
    let id = e.currentTarget.dataset.id;
    let rateList = that.data.rate;
    let percent = that.data.percent;
    rateList.map(function(value,index,arr){
      if(id === index){
        rateList.splice(id, 1);
        that.setData({
          'rate':rateList,
        })
      }
    });

    percent.map(function (val, inde, arr) {

      if (inde === id) {
        that.setData({
          [`percent[${id}]`]: 0,
          'isShow':false
        });
        return;
      }

    })
  },
  //添加评分标准
  addItem(){

    var that = this;
    let rateList = that.data.rate;
    let percent = that.data.percent;
    //定义添加的初始评分标准
    let addInfo = function(){
      let newRate = {
        id: rateList.length === 0 ? 0 : rateList.length - 1,
        rateName: '',
        ratePct: ''
      }
      rateList.push(newRate);
      that.setData({
        rate: rateList
      })
    }
    
    //判断是否添加完成信息,如果是第一个就允许添加，如果不是第一个就必须先判断信息是否完整
    if(rateList.length === 0){
      addInfo();
      return;
    }
    else{
      //判断信息是否完整
      let index = rateList.length - 1;
      if (rateList[index].rateName === '' || rateList[index].ratePct === ''){
        wx.showToast({
          title: '请将信息填写完整',
          icon: "none"
        });
        return;
      }
      else {
        addInfo();
      }
    }
  },
  //修改分值
  bindPickerChange(e){
    var that = this;
    let value = e.detail.value;
    let index = e.currentTarget.dataset.index;
    let rangeList = that.data.rateRange;
    let rateList = that.data.rate;

    let percent = that.data.percent;

    //赋值百分比
    
    percent.map(function(val,inde,arr){
        
      if(inde === index){
        that.setData({
          [`percent[${inde}]`]: rangeList[value]
        });
        return;
      }
      
    })
    
    let total = percent.reduce(function (pre,next) {
      return pre + next
    })

    //判断评分标准百分比是否满足一个
    if (total === 1) {
      that.setData({
        [`rate[${index}].ratePct`]: rangeList[value],
        isShow: true
      })
    }
    else {
      that.setData({
        [`rate[${index}].ratePct`]: rangeList[value],
        isShow: false
      })
    }

    //根据已经选择的百分比改变picker的值
    if(rateList.length > 1){
      
      if ( total > 1){
        wx.showModal({
          title: '',
          content: '百分比相加不能超过1',
        })
        that.setData({
          [`rate[${index}].ratePct`]: ''
        })
      }
    }
    else if(rateList.length === 3){
      rangeList[value]
    }
    console.log(percent)
    
    
  },

  //确定提交
  confirm(){
    var that = this;
    let percent = that.data.percent;
    let rateList = that.data.rate;
    let total = percent.reduce(function(pre,next){
      return pre + next
    })
    if(total !== 1){
      wx.showModal({
        title: '',
        content: '所有评分标准的百分比相加必须为1',
      });
      return;
    }
    //如果有信息填写不完整，提示
    let promise = new Promise((resolve,reject)=>{
      return resolve('OK')
    })
    promise
    .then((val)=>{
      rateList.map(function (val, ind) {
        if (val.rateName === '' || val.ratePct === '') {
          wx.showToast({
            title: '请将信息填写完整',
            icon: 'none'
          })
        }
        else{
          that.setData({
            confirm:1
          })
        }
      })
    })
    .then((val)=>{
      
      if(that.data.confirm === 1){
        wx.setStorage({
          key: 'rateInfo',
          data: {
            status: 'ok',
            info: that.data.rate,
            percent: that.data.percent
          },
        });

       wx.navigateBack({
         delta: 0
       })

        app.globalData.rateInfo = {
          status: 'ok',
          info: that.data.rate,
          percent: that.data.percent
        }
      }
    })
    
      
        
        

        //console.log(app.globalData.rateInfo)
      
    
   
  }
})