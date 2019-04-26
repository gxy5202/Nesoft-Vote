// pages/student/student.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentInfo: {
      s_number: '',
      s_id_number: ''
    },
    userInfo: ''
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
  getStudentNumber(e) {
    console.log(e.detail.value);
    this.setData({
      "studentInfo.s_number": e.detail.value
    })
  },
  getStudentIdNumber(e) {
    console.log(e.detail.value);
    this.setData({
      "studentInfo.s_id_number": e.detail.value
    })
  },
  getUserInfo(e) {
    var that = this;
    console.log(e.detail)
    if (e.detail.errMsg !== 'getUserInfo:ok') {

    }
    else {
      that.setData({
        userInfo: e.detail.userInfo
      })

      let studentInfo = that.data.studentInfo;
      if (studentInfo.s_number !== '' && studentInfo.s_id_number !== '') {
        wx.showLoading({
          title: '登录中...',
        })
        wx.login({
          success: res => {
            wx.request({
              url: 'https://www.nsuim.cn/student_login',
              data: {
                code: res.code,
                Appid: "wx9e7455bc8709d727",
                AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
                s_number: that.data.studentInfo.s_number,
                s_id_number: that.data.studentInfo.s_id_number
              },
              method: "GET",
              header: {
                'content-type': 'application/json'
              },
              success: function (next) {
                console.log(next.data)

                if (next.data === 0) {
                  wx.showToast({
                    title: '学号或身份证错误',
                    icon: 'none'
                  })
                }
                else {
                  wx.showToast({
                    title: '登陆成功',
                  })
                  app.globalData.userid = 's'+ next.data[0].sid;
                  app.globalData.username = next.data[0].s_name;
                  wx.setStorage({
                    key: 'student',
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