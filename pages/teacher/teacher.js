// pages/teacher/teacher.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherInfo:{
      t_number:'',
      t_id_number:''
    },
    userInfo:''
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

  },
  getTeacherNumber(e){
    console.log(e.detail.value);
    this.setData({
      "teacherInfo.t_number":e.detail.value
    })
  },
  getTeacherIdNumber(e) {
    console.log(e.detail.value);
    this.setData({
      "teacherInfo.t_id_number": e.detail.value
    })
  },
  getUserInfo(e) {
    var that = this;
    console.log(e.detail)
    if (e.detail.errMsg !== 'getUserInfo:ok'){

    }
    else{
      that.setData({
        userInfo: e.detail.userInfo
      })

      let teacherInfo = that.data.teacherInfo;
      if (teacherInfo.t_number !== '' && teacherInfo.t_id_number !== '') {
        wx.showLoading({
          title: '登录中...',
        })
        wx.login({
          success: res => {
            wx.request({
              url: 'https://www.nsuim.cn/teacher_login',
              data: {
                code: res.code,
                Appid: "wx9e7455bc8709d727",
                AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
                t_number: that.data.teacherInfo.t_number,
                t_id_number: that.data.teacherInfo.t_id_number
              },
              method: "GET",
              header: {
                'content-type': 'application/json'
              },
              success: function (next) {
                console.log(next.data)

                if (next.data === 0) {
                  wx.showToast({
                    title: '工号或身份证错误',
                    icon: 'none'
                  })
                }
                else {
                  wx.showToast({
                    title: '登陆成功',
                  })
                  app.globalData.userid = 't'+ next.data[0].tid;
                  app.globalData.username = next.data[0].t_name;
                  wx.setStorage({
                    key: 'teacher',
                    data: next.data,
                  })
                  wx.reLaunch({
                    url: '../my/my',
                  })
                }
              }
            })
          }
        })

      } else {
        wx.showToast({
          title: '请完整填写工号或身份证号',
          icon: 'none'
        })
      }
    }
    
    
    
    
  },
})