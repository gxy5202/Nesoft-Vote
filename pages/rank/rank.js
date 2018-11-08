// pages/rank/rank.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: "0",
    translate: "translateY(50px)",
    rankimg:"",
    rankList: [],
    rankOld:"",
    titleList:{},
    time:'',
    timer:'',
    end: "距离投票结束"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    
    wx.request({
      url: 'https://www.gomi.site/img',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          rankimg:res.data[0]
        })   
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '读取数据失败，请检查网络或联系小程序管理人员',
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
    wx.request({
      url: 'https://www.gomi.site/time',
      header: {
        'content-type': 'application/json'
      },
      success: function (next) {
        var time = new Date(next.data[0].t_end_time);
        var now = new Date();
        var restTime = time - now;
        var day = restTime / 1000 / 60 / 60 / 24;
        var hours = ((day) - parseInt(day)) * 24;
        var minutes = (((hours) - (parseInt(hours))) * 60) - parseInt(((hours) - (parseInt(hours))) * 60);
        var seconds = minutes * 60 * 1000
        var newTime = parseInt(day) + "天" + parseInt(hours) + "小时" + parseInt(((hours) - (parseInt(hours))) * 60) + "分钟" + minutes * 60 + "秒" + seconds + "秒";


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

          if (restTime <= 0) {
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
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '读取数据失败，请检查网络或联系小程序管理人员',
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
    
  },
  onPageScroll:function(res){
    var that = this
    wx.createSelectorQuery().select('#head').boundingClientRect(function (rect) {
      console.log(rect.top)
      scrollOffset: true
      if (rect.top < -100) {

        that.setData({
          
          opacity: "1",
          translate: "translateY(0)"
        })

      } else {
        that.setData({
         
          opacity: "0",
          translate: "translateY(50px)"
        })
      }


    }).exec()
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
    // var key = wx.getStorageSync("key");
    // var rankList = that.data.rankList
    // console.log(rankList)
    // console.log(key.d_name)
    // for (var i in rankList) {
    //   if (rankList[i].d_id == key.d_id) {
    //     that.setData({
    //       [`rankList[${i}].d_count`]: key.d_count,
    //       [`rankList[${i}].iconid`]: key.iconid
    //     })
    //   }
    // }
    wx.getStorage({
      key: 'rank',
      success: function(next) {
        for (let x in next.data) {
          next.data[x].NO = Number(++x);
        }
        that.setData({
          rankList: next.data,
        })
      },
    })
   
    wx.getStorage({
      key: 'title',
      success: function (next) {
        that.setData({
          titleList: next.data,
        })
      },
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
  onShareAppMessage: function (query) {
    var that = this;
    return {
      title: "我在参与51校园展",
      path: "/pages/index/index",
      imageUrl: "../../images/51.png",
      success: function (res) {
        console.log("转发成功", res);
      },
      fail: function (res) {
        console.log("转发失败", res);
      }
    }
  },
  topScroll: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  // todes: function (e) {
  //   var that = this;
  //   var id = e.currentTarget.dataset.id;
  //   var rankList = that.data.rankList;
  //   for (var x in rankList) {
  //     if (rankList[x].d_id == id) {
  //       var time = new Date(rankList[x].t_end_time);
  //       var date = time.toString();
  //       console.log(time);
  //       wx.setStorage({
  //         key: 'key',
  //         data: that.data.rankList[x],
  //       })
  //       wx.setStorage({
  //         key: 'time',
  //         data: date,
  //       })
  //       wx.navigateTo({
  //         url: '/pages/des/des?id=' + id
  //       });
  //       console.log(id)
  //     }

  //   }

  // },
})