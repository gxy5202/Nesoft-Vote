// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    name:app.globalData.username
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(app.globalData.username)
    wx.getSetting({
      success(res) {
      
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        if (JSON.stringify(res.authSetting) === "{}" || app.globalData.userid === ''){
          wx.reLaunch({
            url: '../login/login',
          })
          return
        }

        for (let i in res.authSetting){  
          if (res.authSetting[i] !== true || app.globalData.userid === ''){
            wx.reLaunch({
              url: '../login/login',
            })
            return
          }  
        }

        
      }
    })
    wx.checkSession({
        success() {
          // session_key 未过期，并且在本生命周期一直有效
          //获取用户信息
          wx.getUserInfo({
            success(res) {
              that.setData({
                userInfo:res.userInfo,
                name: app.globalData.username
              })
            }
          })
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          wx.login() // 重新登录
        }
      })

   
    // wx.getStorage({
    //   key: 'teacher',
    //   success: function(res) {
    //     that.setData({
    //       name:res.data[0].t_name
    //     })
    //   },
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
  
  toPublish(){
    wx.navigateTo({
      url: '../publish/publish',
    })
  }
})