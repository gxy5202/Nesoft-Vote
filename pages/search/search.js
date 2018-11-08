// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist:[],
    display:"flex",
    block:"none",
    searchData:"",
    value:"",
    hotName:[],
    focus:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.gomi.site/search',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data)
        that.setData({
          hotName: res.data
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var that =this
    var arr = []
    var searchData = that.data.searchData
    console.log(searchData)
    var key = wx.getStorageSync("key"); 
    console.log(key.d_name)
    if(searchData != ""){
      wx.login({
        success: res => {
          console.log(res.code)
          wx.request({
            url: 'https://www.gomi.site/data',
            data: {
              code: res.code,
              Appid: "wx9e7455bc8709d727",
              AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var showlist = that.data.showlist
              console.log(showlist)
              console.log(key.d_name)
              for(var i in showlist){
                if(showlist[i].d_id == key.d_id){
                  that.setData({
                    [`showlist[${i}].d_count`]:key.d_count,
                    [`showlist[${i}].iconid`]: key.iconid
                  })
                }
              }
              

            }
          })
        }
      });
    }
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
  imgSearch:function(){
    
    var that = this
    var searchData = that.data.searchData
    if (searchData == "") {
      wx.showToast({
        title: '请输入搜索条件',
        icon:"none"
      })
    }
    if (searchData != "") {
      wx.showLoading({
        title: '搜索中...',
      })
      wx.login({
        success: res => {
          wx.hideLoading();
          console.log(res.code)
          wx.request({
            url: 'https://www.gomi.site/data',
            data: {
              code: res.code,
              Appid: "wx9e7455bc8709d727",
              AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var arr = []
              for (var x in res.data) {
                if (searchData == res.data[x].d_id) {
                  arr.push(res.data[x])
                  that.setData({
                    display: "none",
                    block: "flex",
                    showlist: arr,
                  })
                }
                else if (res.data[x].d_name.indexOf(searchData) != -1) {
                  arr.push(res.data[x])
                  that.setData({
                    display: "none",
                    block: "flex",
                    showlist: arr
                  })
                }
                else if (res.data[x].d_st_name.indexOf(searchData) != -1) {
                  arr.push(res.data[x])
                  that.setData({
                    display: "none",
                    block: "flex",
                    showlist: arr
                  })
                } else if (res.data[x].t_name.indexOf(searchData) != -1) {
                  arr.push(res.data[x])
                  that.setData({
                    display: "none",
                    block: "flex",
                    showlist: arr
                  })
                }
                
              }
              
              if(that.data.showlist.length < 1){
                wx.showToast({
                  title: '没有搜索到符合条件的作品',
                  icon:"none"
                })
              }
            },
            fail: function () {
              wx.showToast({
                title: '获取数据失败',
                icon: 'none'
              })
            }
          })
        },
       
      });
    }
  },
  getNumber: function(e){
    var that = this
    var number = e.detail.value;
    that.setData({
      searchData:number
    })
    var searchData = that.data.searchData
    console.log(searchData)
    if (number .length < 1) {
      that.setData({
        display: "flex",
        block: "none",
        showlist: []
      })
    }
    
    console.log(searchData)
    if (searchData == "") {
      wx.showToast({
        title: '请输入搜索条件',
        icon: "none"
      })
    }
    if (searchData != ""){
      wx.showLoading({
        title: '搜索中...',
      })
      wx.login({
        success: res => {
          wx.hideLoading()
          console.log(res.code)
          wx.request({
            url: 'https://www.gomi.site/data',
            data: {
              code: res.code,
              Appid: "wx9e7455bc8709d727",
              AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
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
                    display: "none",
                    block: "flex",
                    showlist: arr,
                    searchData: number
                  })
                }
                else if (res.data[x].d_name.indexOf(number) != -1) {
                  arr.push(res.data[x])
                  that.setData({
                    display: "none",
                    block: "flex",
                    showlist: arr,
                    searchData: number
                  })
                }
                else if (res.data[x].d_st_name.indexOf(number) != -1) {
                  arr.push(res.data[x])
                  that.setData({
                    display: "none",
                    block: "flex",
                    showlist: arr,
                    searchData: number
                  })
                } else if (res.data[x].t_name.indexOf(number) != -1) {
                  arr.push(res.data[x])
                  that.setData({
                    display: "none",
                    block: "flex",
                    showlist: arr,
                    searchData: number
                  })
                }
              }
              if (that.data.showlist.length < 1) {
                wx.showToast({
                  title: '没有搜索到符合条件的作品',
                  icon: "none"
                })
              }
            }
          })
        }
      });
    }
    
    
    console.log(searchData )

  },
  getLength:function(e){
    var that = this
    var number = e.detail.value;
    that.setData({
      searchData: number
    })
    var searchData = that.data.searchData
    console.log(number.length)
    if(number.length < 1){
      that.setData({
        display: "flex",
        block: "none",
        showlist: []
      })
    }
  },

  toSearch:function(e){
    var that = this
    var value = e.currentTarget.dataset.name
    that.setData({
      value:value,
      focus:true
    })
    wx.showLoading({
      title: '搜索中...',
    })
    wx.login({
      success: res => {
        console.log(res.code)
        wx.request({
          url: 'https://www.gomi.site/data',
          data: {
            code: res.code,
            Appid: "wx9e7455bc8709d727",
            AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading();
            var arr = []
            for (var x in res.data) {
              if (value == res.data[x].d_id) {
                arr.push(res.data[x])
                that.setData({
                  display: "none",
                  block: "flex",
                  showlist: arr,
                  searchData: value
                })
              }
              else if (res.data[x].d_name.indexOf(value) != -1) {
                arr.push(res.data[x])
                that.setData({
                  display: "none",
                  block: "flex",
                  showlist: arr,
                  searchData: value
                })
              }
              else if (res.data[x].d_st_name.indexOf(value) != -1) {
                arr.push(res.data[x])
                that.setData({
                  display: "none",
                  block: "flex",
                  showlist: arr,
                  searchData: value
                })
              } else if (res.data[x].t_name.indexOf(value) != -1) {
                arr.push(res.data[x])
                that.setData({
                  display: "none",
                  block: "flex",
                  showlist: arr,
                  searchData: value
                })
              } 
            }
            if (that.data.showlist.length < 1) {
              wx.showToast({
                title: '没有搜索到符合条件的作品',
                icon: "none"
              })
            }
          }
        })
      }
    });
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
                  Appid: "wx9e7455bc8709d727",
                  AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
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
                    wx.setStorage({
                      key: 'key',
                      data: showlist[x],
                    })
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
  },
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
})