// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList: [],
    time:'',
    timer:'',
    end: "距离投票结束"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: 'https://www.gomi.site/data',
      header: {
        'content-type': 'application/json'
      },
      success: function (next) {
        wx.hideLoading(

        )
        console.log(next.data)
        for (let x in next.data) {
          next.data[x].NO = Number(++x)
          console.log(x)
          that.setData({
            rankList: next.data
          })
        }
        var time = new Date(next.data[0].t_end_time);
        var now = new Date();
        var restTime = time - now;
        var day = restTime / 1000 / 60 / 60 / 24;
        var hours = ((day) - parseInt(day)) * 24;
        var minutes = (((hours) - (parseInt(hours))) * 60) - parseInt(((hours) - (parseInt(hours))) * 60);
        var seconds = minutes * 60 * 1000
        var newTime = parseInt(day) + "天" + parseInt(hours) + "小时" + parseInt(((hours) - (parseInt(hours))) * 60) + "分钟" + minutes * 60 + "秒" + seconds + "秒";

        console.log(newTime)
        console.log(minutes * 60)
        // 位数不足补零
        function fill_zero_prefix(num) {
          return num < 10 ? "0" + num : num
        }

        var timer = setInterval(function () {

          var time = new Date(next.data[0].t_end_time);
          var now = new Date();
          var restTime = time - now;
          var day = restTime / 1000 / 60 / 60 / 24;
          var hours = ((day) - parseInt(day)) * 24;
          var minutes = (((hours) - (parseInt(hours))) * 60) - parseInt(((hours) - (parseInt(hours))) * 60);
          var seconds = fill_zero_prefix(parseInt(
            (((parseInt(minutes * 60 * 1000)) / 1000).toFixed(2) - parseInt(
              ((parseInt(minutes * 60 * 1000)) / 1000).toFixed(2)
            )) * 100
          ));
          var miniseconds = parseInt(
            (((parseInt(minutes * 60 * 1000)) / 1000).toFixed(2) - parseInt(
              ((parseInt(minutes * 60 * 1000)) / 1000).toFixed(2)
            )) * 100
          );
          var newTime = fill_zero_prefix(parseInt(day)) + "天" + fill_zero_prefix(parseInt(hours)) + "小时" + fill_zero_prefix(parseInt(((hours) - (parseInt(hours))) * 60)) + "分钟" + fill_zero_prefix(parseInt(minutes * 60)) + "秒" + seconds;
          console.log(seconds)
          if (miniseconds <= 0 ) {
            that.setData({
              time: {
                day1: "0",
                day2: "0",
                hours1: "0",
                hours2: "0",
                minutes1: "0",
                minutes2: "0",
                seconds1: "0",
                seconds2: "0",
                miseconds1: "0",
                miseconds2: "0"
              },
              end: "投票已结束"
            })
          } else {
            that.setData({
              time: {
                day1: fill_zero_prefix(parseInt(day)).toString().substring(0, 1),
                day2: fill_zero_prefix(parseInt(day)).toString().substring(1, 2),
                hours1: fill_zero_prefix(parseInt(hours)).toString().substring(0, 1),
                hours2: fill_zero_prefix(parseInt(hours)).toString().substring(1, 2),
                minutes1: fill_zero_prefix(parseInt(((hours) - (parseInt(hours))) * 60)).toString().substring(0, 1),
                minutes2: fill_zero_prefix(parseInt(((hours) - (parseInt(hours))) * 60)).toString().substring(1, 2),
                seconds1: fill_zero_prefix(parseInt(minutes * 60)).toString().substring(0, 1),
                seconds2: fill_zero_prefix(parseInt(minutes * 60)).toString().substring(1, 2),
                miseconds1: seconds.toString().substring(0, 1),
                miseconds2: seconds.toString().substring(1, 2)
              },
              end: "距离投票结束"
            })
          }
        }, 100)
        that.setData({
          timer: timer
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(this.data.timer)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.timer)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})