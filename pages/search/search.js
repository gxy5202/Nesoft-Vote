// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist:[],
    
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
    var that = this
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          url: 'https://www.gomi.site/data',
          data: {
            code: res.code,
            Appid: "wxd680d257e52cab2b",
            AppSecret: "19e9721f2131505d1f4d83966a155ed4",
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (next) {

            console.log(next.data)
            that.setData({
              showlist: next.data
            })

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
  
  getNumber: function(e){
    var that = this
    var number = e.detail.value;
    console.log(number)
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          url: 'https://www.gomi.site/data',
          data: {
            code: res.code,
            Appid: "wxd680d257e52cab2b",
            AppSecret: "19e9721f2131505d1f4d83966a155ed4",
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var arr = []
            for (var x in res.data) {
              if (number == res.data[x].d_id) {
                arr.push(res.data[x])
                that.setData({
                  showlist: arr,
                })
              }
              else if (res.data[x].d_name.indexOf(number) != -1) {
                arr.push(res.data[x])
                that.setData({
                  showlist: arr
                })
              }
              else if (res.data[x].d_st_name.indexOf(number) != -1) {
                arr.push(res.data[x])
                that.setData({
                  showlist: arr
                })
              }
            }

          }
        })
      }
    });
    
    console.log(number)

  },
  todes: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var showlist = that.data.showlist;
    for (var x in showlist) {
      if (showlist[x].d_id == id) {
        var time = new Date(showlist[x].t_end_time);
        var date = time.toString();
        console.log(time);
        wx.setStorage({
          key: 'key',
          data: that.data.showlist[x],
        })
        wx.setStorage({
          key: 'time',
          data: date,
        })
        wx.navigateTo({
          url: '/pages/des/des?id=' + id
        });
        console.log(id)
      }

    }
  },
  addpiao: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var showlist = that.data.showlist
    console.log(id)
    for (var x in showlist) {
      if (showlist[x].d_id == id) {
        var time = new Date(showlist[x].t_end_time);
        var now = new Date();
        var restTime = time - now;
        console.log(restTime);
        if (restTime < 0) {
          wx.showToast({
            title: "该活动投票已结束",
            icon: "none",
          })
        } else {
          wx.login({
            success: res => {
              console.log(res.code)
              wx.request({
                url: 'https://www.gomi.site/user',
                data: {
                  code: res.code,
                  Appid: "wxd680d257e52cab2b",
                  AppSecret: "19e9721f2131505d1f4d83966a155ed4",
                  id: id
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (next) {
                  for (var x in showlist) {
                    if (id == showlist[x].d_id) {
                      that.setData({
                        [`showlist[${x}].d_count`]: next.data.data[0].d_count,
                        [`showlist[${x}].iconid`]: next.data.iconid
                      })
                    }
                  }
                  console.log(next.data)
                  wx.showToast({
                    title: next.data.tip,
                    icon: "none",
                  }
                  )
                }
              })
            }
          });
        }

      }

    }
  }

})