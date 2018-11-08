//app.js
App({
  
  onLaunch: function () {
    // 展示本地存储能力
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
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
  },
  onShow:function(){
    // var that = this
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'https://www.gomi.site/login',
    //         data: {
    //           code: res.code,
    //           Appid: "wx9e7455bc8709d727",
    //           AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
    //         },
    //         header: {
    //           'content-type': 'application/json'
    //         },
    //         success: function (next) {
    //           that.globalData.openid = next.data
              
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
    
  },
  globalData: {
    userInfo: "",
    js_code: "",
    openid: "",
    session_key: ""
  },
})