// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showlist:[],
    loadlist: [],
    display:"flex",
    block:"none",
    searchData:"",
    bottomText: "下拉加载更多",
    value:"",
    hotName:[],
    focus:true,
    aid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      aid: Number(options.aid)
    });
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'https://www.nsuim.cn/search',
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
    var that =this;
    let aid = that.data.aid
    var arr = [];
    var searchData = that.data.searchData
    console.log(searchData)
    var key = wx.getStorageSync("key"); 
    console.log(key.d_name)
    if(searchData != ""){
      wx.login({
        success: res => {
          console.log(res.code)
          wx.request({
            url: 'https://www.nsuim.cn/data',
            data: {
              code: res.code,
              Appid: "wx9e7455bc8709d727",
              AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
              aid: aid
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
    var that = this
    var showlist = that.data.showlist;
    var loadlist = that.data.loadlist;
    var key = wx.getStorageSync("key"); 
    var arr = [];
    wx.showLoading({
      title: '加载中',
    })
    if (showlist.length + 10 > loadlist.length) {
      for (var i in showlist) {
        if (showlist[i].d_id == key.d_id) {
          that.setData({
            [`loadlist[${i}].d_count`]: key.d_count,
            [`loadlist[${i}].iconid`]: key.iconid,
          })
        }
      }
      that.setData({
        showlist: loadlist.slice(0, loadlist.length)
      })
      if (showlist.length == loadlist.length) {
        that.setData({
          bottomText: "已显示全部"
        })
        wx.showToast({
          title: '已经到最后啦',
          icon: 'none',
        })
      } else {
        wx.hideLoading()
      }
    }
    else {
      for (var i in showlist) {
        if (showlist[i].d_id == key.d_id) {
          that.setData({
            [`loadlist[${i}].d_count`]: key.d_count,
            [`loadlist[${i}].iconid`]: key.iconid,
          })

        }
      }
      that.setData({
        showlist: loadlist.slice(0, loadlist.length + 10)
      })
      wx.hideLoading()
    }
   

          

        
     
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  imgSearch:function(){
    
    var that = this
    let aid = that.data.aid
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
            url: 'https://www.nsuim.cn/data',
            data: {
              code: res.code,
              Appid: "wx9e7455bc8709d727",
              AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
              aid: aid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              var arr = []
              for (var x in res.data) {
                if (res.data[x].d_id.indexOf(searchData) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                    })
                  }
                 
                }
                else if (res.data[x].d_name.indexOf(searchData) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                    })
                  }
                } else if (res.data[x].m_name.indexOf(searchData) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                    })
                  }
                }
                else if (res.data[x].d_st_name.indexOf(searchData) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                    })
                  }
                } else if (res.data[x].a_name.indexOf(searchData) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                    })
                  }
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
        },
       
      });
    }
  },
  getNumber: function(e){
    var that = this
    let aid = that.data.aid;
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
            url: 'https://www.nsuim.cn/data',
            data: {
              code: res.code,
              Appid: "wx9e7455bc8709d727",
              AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
              aid:aid
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              var arr = []
              for (var x in res.data) {
                if (res.data[x].d_id.indexOf(number) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                      searchData: number
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                      searchData: number
                    })
                  }
                 
                } else if (res.data[x].m_name.indexOf(searchData) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                    })
                  }
                }
                else if (res.data[x].d_name.indexOf(number) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                      searchData: number
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                      searchData: number
                    })
                  }
                }
                else if (res.data[x].d_st_name.indexOf(number) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                      searchData: number
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                      searchData: number
                    })
                  }
                } else if (res.data[x].a_name.indexOf(number) != -1) {
                  arr.push(res.data[x])
                  if (arr.length <= 10) {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr,
                      'display': "none",
                      'block': "flex",
                      searchData: number
                    })
                  } else {
                    that.setData({
                      'loadlist': arr,
                      'showlist': arr.slice(0, 10),
                      'display': "none",
                      'block': "flex",
                      searchData: number
                    })
                  }
                }
              }
              if (that.data.showlist.length < 1) {
                wx.showToast({
                  title: '没有搜索到符合条件的作品',
                  icon: "none"
                })
              }
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
    var that = this;
    let aid = that.data.aid
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
          url: 'https://www.nsuim.cn/data',
          data: {
            code: res.code,
            Appid: "wx9e7455bc8709d727",
            AppSecret: "66dbfa9fcf37f5b381bcac0532400da8",
            aid:aid
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            wx.hideLoading();
            var arr = []
            for (var x in res.data) {
              if (res.data[x].d_id.indexOf(value) != -1) {
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr,
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                } else {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10),
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                }
             
              }
              else if (res.data[x].d_name.indexOf(value) != -1) {
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr,
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                } else {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10),
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                }
              } else if (res.data[x].m_name.indexOf(value) != -1) {
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr,
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                } else {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10),
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                }
              }
              else if (res.data[x].d_st_name.indexOf(value) != -1) {
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr,
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                } else {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10),
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                }
              } else if (res.data[x].a_name.indexOf(value) != -1) {
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr,
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                } else {
                  that.setData({
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10),
                    'display': "none",
                    'block': "flex",
                    'searchData': value
                  })
                }
              } 
            }
            if (that.data.showlist.length < 1) {
              wx.showToast({
                title: '没有搜索到符合条件的作品',
                icon: "none"
              })
            }
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
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType != 'none'){
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
                      url: 'https://www.nsuim.cn/user',
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
                            wx.setStorageSync('key', showlist[x])
                          }
                          
                         
                        }
                        console.log(next.data)
                        wx.showToast({
                          title: next.data.tip,
                          icon: "none",
                        }
                        )
                      },
                      fail: function () {
                        wx.showModal({
                          title: '提示',
                          content: '网络异常，投票失败',
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
                  fail: function () {
                    wx.showModal({
                      title: '提示',
                      content: '网络异常，投票失败',
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
                });
              }

            }

          }
        }else{
          wx.showModal({
            title: '提示',
            content: '网络异常，投票失败',
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
      }
    })

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