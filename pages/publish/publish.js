// pages/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acName:'',
    acDes:'',
    range: [['全部', '2015级', "2016级", "2017级"], ['全部','信息管理系','商务管理系'],["全部"]],
    index: [0, 0, 0], 
    rangeText:'请选择参与范围',
    rangeData:'',
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    maxDate: new Date(2019, 12, 31).getTime(),
    currentDate: new Date().getTime(),
    popShow:false,
    showMask:true,
    startTime:{
      id:'',
      text: '请选择活动开始日期',
      date:''
    },
    endTime: {
      id: '',
      text: '请选择活动截止日期',
      date:''
    },
    acDate:'',
    imgUrl:'',
    base64:'',
    rateInfo: app.globalData.rateInfo,
    rateStatus: '未设置',
    publishData:{}

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
    // try {
    //   wx.getStorage({
    //     key: 'rateInfo',
    //     success: function (res) {
    //       if (rateInfo.status === 'ok') {
    //         this.setData({
    //           rateInfo: res.data,
    //           rateStatus: '已设置'
    //         })
    //       }

    //     },
    //   })
    // } catch (e) {
    //   console.log('fail')
    // }
    console.log(app.globalData.userid)
    //console.log(app.globalData.rateInfo)
    if (app.globalData.rateInfo.status === 'ok'){
      this.setData({
        rateStatus:'已设置'
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

  upload:function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        let base64 = wx.getFileSystemManager().readFileSync(tempFilePaths[0], "base64");
        that.setData({
          imgUrl: tempFilePaths[0],
          base64:base64
        })
        wx.showToast({
          title: base64,
        })
        console.log(base64)
        
      }
    })
  },

  //活动名称
  acName(e){
    console.log(e.detail.value);
    this.setData({
      acName:e.detail.value
    })
  },
  //活动描述
  acDes(e){
    console.log(e.detail.value);
    this.setData({
      acDes: e.detail.value
    })
  },
  // range
  bindchange:function(e){
    console.log(e.detail.value);
    let index = e.detail.value;
    let first = this.data.range[0][index[0]];
    let second = this.data.range[1][index[1]];
    let third = this.data.range[2][index[2]];
    if (first === '全部' && second === '全部' && third === '全部' ){
      this.setData({
        rangeText: '所有学生',
        rangeData: [first, second, third]
      })
    } 
    else {
      this.setData({
        rangeText: first +'|' + second + '|' + third,
        rangeData:[first,second,third]
      })
    }
    
    console.log(first,second,third)
  },
 
  bindMultiPickerColumnChange:function(e){
    console.log(e.detail)
    switch (e.detail.column) {
      
      case 1:
        if (e.detail.value === 0){
          this.setData({
            'range[2]': ["全部"]
          })
        }
        else if (e.detail.value === 1){
          this.setData({
            'range[2]': ["全部", "信息系统", "电子商务", "物流管理"]
          })
        } 
        else if (e.detail.value === 2){
          this.setData({
            'range[2]': ["全部", "财务管理", "资产评估"]
          })
        }
        break;
        
    }
  },

  //Date
  
  changeDate(e){
    let date = e.detail;
    let time = new Date(e.detail).toLocaleString();
    
  },
  onClose() {
    this.setData({ popShow: false });
  },

  // 显示时间选择器
  popShow(e){
    let id = e.currentTarget.dataset.id;
    //为不同时间添加标识
    id == 0 ? this.setData({ 'startTime.id': 0 }) : this.setData({ 'endTime.id': 1 });
    console.log(id)
    this.setData({
      currentDate: new Date().getTime(),
      popShow:true,
      showMask:'none'
    })
  },
  //确定
  confirmDate(e){
    let date = e.detail;
    let time = new Date(e.detail).toLocaleString();
    //设置时间

    if (this.data.startTime.id === 0) {
      this.setData({
        'startTime.id': '',
        'startTime.text': time,
        'startTime.date':date,
        'acDate.startTime':date
      })

    } else if (this.data.endTime.id === 1) {
      this.setData({
        'endTime.id': '',
        'endTime.text': time,
        'endTime.date': date,
        'acDate.endTime': date
      })
    }

    //判断开始日期与结束日期大小;
    let startTime = this.data.startTime.date;
    let endTime = this.data.endTime.date;
    console.log(startTime)
    if(startTime > endTime && endTime !== ''){
      wx.showToast({
        title: '开始时间不得大于结束时间',
        icon:'none'
        
      })
      this.setData({
        'startTime.id': '',
        'startTime.text': '请选择开始时间',
        'statTime.date':'',
        'acDate.startTime':'',
        'endTime.id': '',
        'endTime.text': '请选择结束时间',
        'endTime.date':'',
        'acDate.endTime': ''
      })
    }
    
    
    console.log(time);
    

    this.setData({
      //currentDate: e.detail.value,
      popShow: false,
      showMask: 'block'
    })
  },
  //取消 
  cancelDate(){
    this.setData({
      popShow: false,
      showMask: 'block'
    })
  },

  //跳转到评分页
  toRate(){
    wx.navigateTo({
      url: '../rate/rate',
    })
  },

  //发布
  publish(){
    var that = this;
    console.log(app.globalData.userid)
    let acName = that.data.acName;
    let rangeData = that.data.rangeData;
    let acDate = that.data.acDate;
    let acDes = that.data.acDes;
    let rateInfo = app.globalData.rateInfo;
    let rateStatus = that.data.rateStatus;
    let imgUrl = that.data.imgUrl;
    let base64 = that.data.base64;
    let userid = app.globalData.userid.slice(1);
    if (acName !== '' && rangeData.startTime !== '' && rangeData.endTime !== '' && acDate !== '' && rateStatus === '已设置' && base64 !== ''){
      wx.showLoading({
        title: '正在发布...',
      })
      
      console.log(base64)
      //上传
      console.log(userid.slice(0))
      wx.request({
        url: 'https://www.nsuim.cn/publish_upload',//上传接口
        data: {
          a_owner:userid,
          a_name:acName,
          a_range:rangeData.join(','),
          a_startTime:acDate.startTime,
          a_endTime:acDate.endTime,
          a_rate:JSON.stringify(rateInfo.info),
          a_des:acDes,
          a_img:base64
        },
        method: "GET",
        header: {
          'content-type': 'application/json'
        },
        success:function(res){
          console.log(res.data);
          if(res.data === 'OK'){
            wx.hideLoading();
            wx.showToast({
              title: '发布成功',
            })
            wx.switchTab({
              url: '../activity/activity',
            })
          }
        },
        fail:function(){
          wx.showToast({
            title: '图片太大,请更换图片',
            icon:"none"
          })
        }
      })
    }
    else{
      wx.showToast({
        title: '请将信息填写完整',
        icon:'none'
      })
    }
  }
})