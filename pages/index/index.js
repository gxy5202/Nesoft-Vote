//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    openid: app.globalData.openid,
    fixed: "relative",    //是否固定导航栏
    top:"0",
    opacity:"0",
    translate:"translateY(50px)",
    hiddenHeight: 0,
    selected: 0,
    display:"block",
    bannerlist: [],
    tipslist:[],    
    showlist: [],
    range: [['全部', '2015级', "2016级", "2017级"], ["全部", "信息系统", "电子商务", "物流管理"]],
    index:[0,0],
    gradelist: [
    {
      name:"全部"
    },
    {
      name: "2015级"
    },
    {
      name: "2016级"
    },
    {
      name: "2017级"
    }
    ],

    majorlist: [
    {
      name: "全部"
    },
    {
      name: "信息系统"
    }, {
        name: "物流管理"
      }, {
      name: "电子商务"
    }],

    finalSelect:{
      grade:"全部",
      major:"全部"
    },
    

  },
  onLoad:function(options){
    var that = this
    wx.request({
      url: 'https://www.gomi.site/img',
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          [`bannerlist[${0}]`]: res.data[1],
          [`bannerlist[${1}]`]: res.data[2],
          [`bannerlist[${2}]`]: res.data[3],
          [`tipslist[${0}]`]: res.data[4],
          [`tipslist[${1}]`]: res.data[5]
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
  onShow:function(){
    var that = this
    var key = wx.getStorageSync("key"); 
    var index = that.data.index
    var grade = that.data.range[0][index[0]]
    var major = that.data.range[1][index[1]]
    var finalSelect = {
      grade: grade,
      major: major
    }
    var arr = [];
    console.log(finalSelect.grade)
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
            success: function (next) {
              var showlist = that.data.showlist
              console.log(next.data)
              if (finalSelect.grade != "全部" || finalSelect.major != "全部"){
                for (var i in showlist) {
                  if (showlist[i].d_id == key.d_id) {
                    that.setData({
                      [`showlist[${i}].d_count`]: key.d_count,
                      [`showlist[${i}].iconid`]: key.iconid
                    })
                  }
                }
              } else {
                that.setData({
                  showlist: next.data,

                  [`index[${0}]`]: 0,

                  [`index[${1}]`]: 0,
                })

              }
             
              // if (finalSelect.grade != "全部" || finalSelect.major != "全部"){
              //   for(let x in next.data){
              //     if (finalSelect.grade == next.data[x].g_name && finalSelect.major == next.data[x].m_name) {
              //       arr.push(next.data[x])
              //       for(let i in arr){
              //         if (arr[i].d_id == showlist[i].d_id && arr[i].d_count != showlist[i].d_count) {
              //           that.setData({
              //             [`showlist[${i}]`]: arr[i]
              //           })
              //         }
              //       }
                    
                    
              //     } else if (finalSelect.grade == next.data[x].g_name && finalSelect.major == "全部"){
              //       arr.push(next.data[x])
              //       for (let i in arr) {
              //         if (arr[i].d_id == showlist[i].d_id && arr[i].d_count != showlist[i].d_count) {
              //           that.setData({
              //             [`showlist[${i}]`]: arr[i]
              //           })
              //         }
              //       }
                    
              //     } else if (finalSelect.major == next.data[x].m_name && finalSelect.grade == "全部") {
              //       arr.push(next.data[x])
              //       for (let i in arr) {
              //         if (arr[i].d_id == showlist[i].d_id && arr[i].d_count != showlist[i].d_count) {
              //           that.setData({
              //             [`showlist[${i}]`]: arr[i]
              //           })
              //         }
              //       }
                  
              //     }
              //   }
              // }
              
            }
          })
        },
     
      });                   
                                                                               
  },
  onHide:function(){
 
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '刷新中...',
    })
    var that = this
    var index = that.data.index
    var grade = that.data.range[0][index[0]]
    var major = that.data.range[1][index[1]]
    var finalSelect = {
      grade: grade,
      major: major
    }
    var arr = [];
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
            console.log(res.data)
            var arr = []
            var noarr = []
            for (var x in res.data) {
              if (finalSelect.grade == res.data[x].g_name && finalSelect.major == res.data[x].m_name) {
                console.log(res.data[x])
                arr.push(res.data[x])
                that.setData({
                  'showlist': arr
                })
                console.log(that.data.showlist)
              }
              else if (finalSelect.major == res.data[x].m_name && finalSelect.grade == "全部") {
                console.log(res.data[x])
                arr.push(res.data[x])
                that.setData({
                  'showlist': arr
                })
                console.log(that.data.showlist)
              }
              else if (finalSelect.major == "全部" && finalSelect.grade == res.data[x].g_name) {
                console.log(res.data[x])
                arr.push(res.data[x])
                that.setData({
                  'showlist': arr
                })
                console.log(that.data.showlist)
              }
              else if (finalSelect.major == "全部" && finalSelect.grade == "全部") {

                that.setData({
                  'showlist': res.data
                })
                console.log(that.data.showlist)
              }
              else if (finalSelect.grade != res.data[x].g_name || finalSelect.major != res.data[x].m_name) {

                noarr.push(res.data[x])
                if (noarr.length == res.data.length)
                  that.setData({
                    'showlist': []
                  })
                console.log(noarr)
              }
            }

          }
        })
      }
    });
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
    wx.hideLoading()
  },
  onPageScroll:function(res){
    var that = this
    wx.createSelectorQuery().select('#topSwiper').boundingClientRect(function (rect) {
      console.log(rect.bottom)
      scrollOffset: true
      if (rect.bottom < 0) {

        that.setData({
          fixed: "fixed",
          top: "-20rpx",
          opacity: "1",
          translate: "translateY(0)"
        })

      } else if (rect.bottom > 0) {
        that.setData({
          fixed: "relative",
          top: "0",
          opacity: "0",
          translate: "translateY(50px)"
        })
      }


    }).exec()
  },
  
  onReady:function(){
    var that = this
    var openid = that.data.openid
    
  },
  onShareAppMessage: function () {
    return {
      title: "快来参与51校园展",
      path: "/pages/des/des?id=" + id,
      imageUrl: "../../images/51.png",
      success: function (res) {
        console.log("转发成功", res);
      },
      fail: function (res) {
        console.log("转发失败", res);
      }
    }
  },
  tap1Func: function (e) {
    var that = this;
    console.log(e);
    var s = this.data.selected;
    if (s != 1) {
      this.setData({
        selected: 1
      })
    } else {
      this.setData({
        selected: 0
      })
    }
    var query = wx.createSelectorQuery();
    query.select('.show').boundingClientRect();
    query.exec(function (res) {
      console.log(res);
      var vhiddenHeight = res[0].bottom - res[0].top;
      console.log(vhiddenHeight)
      that.setData({
        hiddenHeight: vhiddenHeight,
      })
    })
  },

  tap2Func: function (e) {
    var that = this;
    console.log(e);
    var s = this.data.selected;
    if (s != 2) {
      this.setData({
        selected: 2
      })
    } else {
      this.setData({
        selected: 0
      })
    }
    var query = wx.createSelectorQuery();
    query.select('.show').boundingClientRect();
    query.exec(function (res) {
      console.log(res);
      var vhiddenHeight = res[0].bottom - res[0].top;
      console.log(vhiddenHeight)
      that.setData({
        hiddenHeight: vhiddenHeight,
      })
    })
  },


  search: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  todes: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var showlist = that.data.showlist;
    for(var x in showlist){
      if(showlist[x].d_id == id){
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
          url: '/pages/des/des?id='+id
        });
        console.log(id)
      }
      
    }
    
  },
  bindchange:function(e){
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    
    this.setData({
      index: e.detail.value
    })
    var index = that.data.index
    var grade = that.data.range[0][index[0]]
    var major = that.data.range[1][index[1]]
    var finalSelect = {
      grade:grade,
      major:major
    }
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
            console.log(res.data)
            var arr = []
            var noarr = []
            for (var x in res.data) {
              if (finalSelect.grade == res.data[x].g_name && finalSelect.major == res.data[x].m_name) {
                console.log(res.data[x])
                arr.push(res.data[x])
                that.setData({
                  'showlist': arr
                })
                console.log(that.data.showlist)
              }
              else if (finalSelect.major == res.data[x].m_name && finalSelect.grade == "全部") {
                console.log(res.data[x])
                arr.push(res.data[x])
                that.setData({
                  'showlist': arr
                })
                console.log(that.data.showlist)
              }
              else if (finalSelect.major == "全部" && finalSelect.grade == res.data[x].g_name) {
                console.log(res.data[x])
                arr.push(res.data[x])
                that.setData({
                  'showlist': arr
                })
                console.log(that.data.showlist)
              }
              else if (finalSelect.major == "全部" && finalSelect.grade == "全部") {

                that.setData({
                  'showlist': res.data
                })
                console.log(that.data.showlist)
              }
              else if (finalSelect.grade != res.data[x].g_name || finalSelect.major != res.data[x].m_name) {

                noarr.push(res.data[x])
                if (noarr.length == res.data.length)
                  that.setData({
                    'showlist': []
                  })
                console.log(noarr)
              }
            }

          }
        })
      }
    });
  
  },

  //投票功能
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
        if (restTime < 0 ) {
          wx.showToast({
            title: "该活动投票已结束",
            icon: "none",
          })
        }else {
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
                        [`showlist[${x}].iconid`]: next.data.iconid,
                      })
                      wx.setStorage({
                        key: 'key',
                        data: showlist[x],
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
    
   
  },
  display:function(){
    this.setData({
      display:"none"
    })
  },
  topScroll: function () {
    var that = this
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    that.setData({
      fixed: "relative",
      top: "0",
      opacity: "0",
      translate: "translateY(50px)"
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
  //获取到顶部距离
  

})