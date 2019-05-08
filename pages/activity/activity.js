// pages/activity/activity.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: "block",
    activity_data:[],
    tipslist: [],
    isShow:true,
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.hideTabBar({
      aniamtion: 'false'
    });
    //请求banner等图片
    wx.request({
      url: 'https://www.nsuim.cn/img',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          // [`bannerlist[${0}]`]: res.data[1],
          // [`bannerlist[${1}]`]: res.data[2],
          // [`bannerlist[${2}]`]: res.data[3],
          [`tipslist[${0}]`]: res.data[4],
          [`tipslist[${1}]`]: res.data[5]
        })
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '网络异常，读取数据失败',
          confirmColor: "#006ACC",
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }

    })
    /*
    wx.request({
      url: 'https://www.nsuim.cn/activity_data',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          activity_data:res.data
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
      }

    })
    */
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        //获取用户信息
        wx.getUserInfo({
          success(res) {
            if (app.globalData.userid.indexOf('t') !== -1){
              that.setData({
                isShow:true
              })
            }
            else {
              that.setData({
                isShow: false
              })
            }
            
          }
        })
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() // 重新登录
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
    var that = this;
    
    wx.request({
      url: 'https://www.nsuim.cn/activity_data',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          activity_data: res.data
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
      }

    });

    
    
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

  //跳转
  toIndex(e){
    let aid = e.currentTarget.dataset.aid;
    let startTime = e.currentTarget.dataset.starttime;
    let endTime = e.currentTarget.dataset.endtime;
    let info = e.currentTarget.dataset.info;
    info.a_range = info.a_range.split(',');
    info.a_startTime = new Date(Number(info.a_startTime)).toLocaleString();
    info.a_endTime = new Date(Number(info.a_endTime)).toLocaleString();
    console.log(info)
    //存下活动截止时间
    wx.setStorage({
      key: 'endTime',
      data: {
        'startTime':startTime,
        'endTime':endTime
      },
    })
    //存下活动信息
    wx.setStorage({
      key: 'acInfo',
      data: info,
    })
    wx.navigateTo({
      url: '../index/index?aid=' + aid,
    })
  },

  display: function () {
    wx.showTabBar({
      aniamtion: true
    })
    this.setData({
      display: "none"
    })
  },

  toPublish(){
    var that = this;
    
    wx.getSetting({
      success(res) {

        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
        if (JSON.stringify(res.authSetting) === "{}" || app.globalData.userid === '') {
          
          wx.reLaunch({
            url: '../login/login',
          })
          return
        }else {
          wx.navigateTo({
            url: '../publish/publish',
          })
        }

        for (let i in res.authSetting) {
          if (res.authSetting[i] !== true || app.globalData.userid === '') {
            wx.reLaunch({
              url: '../login/login',
            })
            return
          } else {
            wx.navigateTo({
              url: '../publish/publish',
            })
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
              userInfo: res.userInfo,
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

    
  }
})