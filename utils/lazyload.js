//懒加载
let lazyLoad = function(url,appid,appsecret,aid,lazyDetail){
  //后端获取openid,判断是否投过票
  wx.login({
    success: res => {
      //请求首页作品数据
      wx.request({
        url: url,
        data: {
          code: res.code,
          Appid: appid,
          AppSecret: appsecret,
          aid:aid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (next) {
          lazyDetail(next);
        }
      })
    },
    fail: function () {
      wx.hideLoading()
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
}

module.exports = {
  lazyLoad: lazyLoad
}