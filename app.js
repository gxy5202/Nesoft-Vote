//app.js
//const myPackage = require('miniprogram_npm/vant-weapp/action-sheet/index.jsminiprogram_npm/vant-weapp')
//const packageOther = require('packageName/other')
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
    // 登录
   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.login({
      success: res => {
        wx.request({
          url: 'https://www.nsuim.cn/app_login',
          data: {
            code: res.code,
            Appid: "wx9e7455bc8709d727",
            AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (next) {
           console.log(next.data);
           if(next.data[0].sid){
             that.globalData.userid ='s' + next.data[0].sid;
             that.globalData.username = next.data[0].s_name
           }
           else if (next.data[0].tid){
             that.globalData.userid = 't' + next.data[0].tid,
             that.globalData.username = next.data[0].t_name
           }
            console.log(that.globalData.userid)
          },
          fail: function () {
            
          }
        })
      }
    });
    
  },
  
  globalData: {
    userid:'',
    username:'',
    userInfo: "",
    js_code: "",
    openid: "",
    session_key: "",
    rateInfo:{
      rateStatus:'',
      info:[],
      percent:[0,0,0]
    }
  },
})