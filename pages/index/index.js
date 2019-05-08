//index.js
//获取应用实例
const app = getApp()
//import lazyLoad from '../../utils/lazyload';
var lazyload = require("../../utils/lazyload.js");
Page({
  data: {
    openid: app.globalData.openid,
    aid:'',
    fixed: "relative",    //是否固定导航栏
    rel:"absolute",
    top:"0",
    opacity:"0",
    translate:"translateY(50px)",
    bottomText:"下拉加载更多",
    display:"block",
    bannerlist: [],
    tipslist:[],    
    showlist: [],
    loadlist:[],
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
    acInfo:"",

  },
  onLoad:function(options){
    var that = this;
    that.setData({
      aid:options.aid
    });
    wx.hideTabBar({
      aniamtion:'false'
    });
    //请求banner等图片
    wx.request({
      url: 'https://www.nsuim.cn/img',
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
  //下拉加载，按需加载
  onReachBottom: function () {
    var that = this;
    let aid = that.data.aid;
    var showlist = that.data.showlist;//这里的showlist为实际展现在页面的数组
    var loadlist = that.data.loadlist;//loadlist为请求到的所有数据
    var key = wx.getStorageSync("key"); 
    var index = that.data.index
    var grade = that.data.range[0][index[0]]
    var major = that.data.range[1][index[1]]
    var finalSelect = {
      grade: grade,
      major: major
    }
    var arr = [];
    wx.showLoading({
      title: '加载中',
    })
    var lazyDetails = function(next){
      //判断是否筛选过年级或专业
      class select{
        
      }
      //如果筛选了其中任意一项
      if (finalSelect.grade != "全部" || finalSelect.major != "全部") {
        //首页懒加载，每次只加载10条数据
        if (showlist.length + 10 > loadlist.length) {
          //遍历整个数组
          for (var i in showlist) {
            //如果数据与已经点击过详情页再返回的数据匹配，那么就更新该条数据的票数和投票图标
            if (showlist[i].d_id === key.d_id) {
              that.setData({
                [`loadlist[${i}].d_count`]: key.d_count,
                [`loadlist[${i}].iconid`]: key.iconid,
              })
            }
          }
          that.setData({
            showlist: loadlist.slice(0, loadlist.length)
          })
          //如果
          if (showlist.length === loadlist.length) {
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

      } else {

        if (showlist.length + 10 > next.data.length) {
          that.setData({
            showlist: next.data.slice(0, next.data.length),
          })

          if (showlist.length == next.data.length) {
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
          that.setData({
            showlist: next.data.slice(0, showlist.length + 10),
          })
          wx.hideLoading()
        }
      }
    }
    
    lazyload.lazyLoad('https://www.nsuim.cn/data', "wx9e7455bc8709d727", "66dbfa9fcf37f5b381bcac0532400da8", aid,lazyDetails);

  },
  onShow:function(){
    var that = this
    var showlist = that.data.showlist;
    var key = wx.getStorageSync("key"); 
    var acInfo = wx.getStorageSync("acInfo"); 
    that.setData({
      acInfo:acInfo
    })
    var index = that.data.index
    var grade = that.data.range[0][index[0]]
    var major = that.data.range[1][index[1]];
    let aid = that.data.aid;
    var finalSelect = {
      grade: grade,
      major: major
    }
    var arr = [];
    console.log(finalSelect.grade);
    let lazyDetails = function(next){
      if (finalSelect.grade != "全部" || finalSelect.major != "全部") {
        for (var i in showlist) {
          if (showlist[i].d_id == key.d_id) {
            that.setData({
              [`showlist[${i}].d_count`]: key.d_count,
              [`showlist[${i}].iconid`]: key.iconid
            })
          }
        }
      } else {
        if (showlist.length < 1) {
          that.setData({
            //showlist: next.data,
            showlist: next.data.slice(0, 10),
            [`index[${0}]`]: 0,
            [`index[${1}]`]: 0,
          })
        } else {
          that.setData({
            //showlist: next.data,
            showlist: next.data.slice(0, showlist.length),
            [`index[${0}]`]: 0,
            [`index[${1}]`]: 0,
          })
        }
      }
    }
    //发送请求
    lazyload.lazyLoad('https://www.nsuim.cn/data', "wx9e7455bc8709d727", "66dbfa9fcf37f5b381bcac0532400da8", aid, lazyDetails);
                                                                         
  },
  onHide:function(){
 
  },
  //下拉刷新
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '刷新中',
    })
    var that = this;
    let aid = that.data.aid;
    var showlist = that.data.showlist;
    var index = that.data.index;
    var grade = that.data.range[0][index[0]];
    var major = that.data.range[1][index[1]];
    var finalSelect = {
      grade: grade,
      major: major
    }
    var arr = [];
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
            console.log(res.data)
            var arr = []
            var noarr = []
            for (var x in res.data) {
              if (finalSelect.grade == res.data[x].g_name && finalSelect.major == res.data[x].m_name) {
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'bottomText': '已显示全部',
                    'loadlist': arr,
                    'showlist': arr
                  })
                  wx.stopPullDownRefresh();
                  wx.hideNavigationBarLoading();
                  wx.hideLoading()
                } else {
                  that.setData({
                    'bottomText': '下拉加载更多',
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10)
                  })
                  wx.stopPullDownRefresh();
                  wx.hideNavigationBarLoading();
                  wx.hideLoading()
                }
                
              }
              else if (finalSelect.major == res.data[x].m_name && finalSelect.grade == "全部") {
                
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'bottomText': '已显示全部',
                    'loadlist': arr,
                    'showlist': arr
                  })
                  wx.stopPullDownRefresh();
                  wx.hideNavigationBarLoading();
                  wx.hideLoading()
                } else {
                  that.setData({
                    'bottomText': '下拉加载更多',
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10)
                  })
                  wx.stopPullDownRefresh();
                  wx.hideNavigationBarLoading();
                  wx.hideLoading()
                }
              
              }
              else if (finalSelect.major == "全部" && finalSelect.grade == res.data[x].g_name) {
                
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'bottomText': '已显示全部',
                    'loadlist': arr,
                    'showlist': arr
                  })
                  wx.stopPullDownRefresh();
                  wx.hideNavigationBarLoading();
                  wx.hideLoading()
                } else {
                  that.setData({
                    'bottomText': '下拉加载更多',
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10)
                  })
                  wx.stopPullDownRefresh();
                  wx.hideNavigationBarLoading();
                  wx.hideLoading()
                }
               
              }
              else if (finalSelect.major == "全部" && finalSelect.grade == "全部") {
                if (showlist.length < 1) {
                  that.setData({
                    //showlist: next.data,
                    'bottomText': '下拉加载更多',
                    'showlist': res.data.slice(0, 10),
                  })
                  wx.stopPullDownRefresh();
                  wx.hideNavigationBarLoading();
                  wx.hideLoading()
                } else {
                  that.setData({
                    //showlist: next.data,
                    'bottomText': '下拉加载更多',
                    showlist: res.data.slice(0, showlist.length),
                  })
                  wx.stopPullDownRefresh();
                  wx.hideNavigationBarLoading();
                  wx.hideLoading()
                }
                
              }
              else if (finalSelect.grade != res.data[x].g_name || finalSelect.major != res.data[x].m_name) {

                noarr.push(res.data[x])
                if (noarr.length == res.data.length){
                  that.setData({
                    'showlist': []
                  })
                }
                wx.stopPullDownRefresh();
                wx.hideNavigationBarLoading();
                wx.hideLoading()
                
              }
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
 
  onPageScroll:function(res){
    var that = this
    wx.createSelectorQuery().select('.topInfo').boundingClientRect(function (rect) {
      console.log(rect.bottom)
      scrollOffset: true
      if (rect.bottom < 0) {

        that.setData({
          fixed: "fixed",
          top: "-20rpx",
          opacity: "1",
          translate: "translateY(0)",
          rel:"relative"
        })

      } else if (rect.bottom > 0) {
        that.setData({
          fixed: "relative",
          top: "0",
          opacity: "0",
          translate: "translateY(50px)",
          rel: "absolute"
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

  search: function() {
    let aid = this.data.aid
    wx.navigateTo({
      url: '/pages/search/search?aid='+aid,
    })
  },
  todes: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var aid = that.data.aid;
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
          url: '/pages/des/des?aid='+aid
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
    let aid = that.data.aid;
    var index = that.data.index
    var grade = that.data.range[0][index[0]]
    var major = that.data.range[1][index[1]]
    var finalSelect = {
      grade:grade,
      major:major
    }
    wx.showLoading({
      title: '加载中',
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
            console.log(res.data)
            var arr = []
            var noarr = []
            for (var x in res.data) {
              if (finalSelect.grade == res.data[x].g_name && finalSelect.major == res.data[x].m_name) {
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'bottomText':'已显示全部',
                    'loadlist': arr,
                    'showlist': arr
                  })
                  wx.hideLoading()
                } else {
                  that.setData({
                    'bottomText': '下拉加载更多',
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10)
                  })
                  wx.hideLoading()
                }
                
              }
              else if (finalSelect.major == res.data[x].m_name && finalSelect.grade == "全部") {
                
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'bottomText': '已显示全部',
                    'loadlist': arr,
                    'showlist': arr
                  })
                  wx.hideLoading()
                } else {
                  that.setData({
                    'bottomText': '下拉加载更多',
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10)
                  })
                  wx.hideLoading()
                }
                
              }
              else if (finalSelect.major == "全部" && finalSelect.grade == res.data[x].g_name) {
                
                arr.push(res.data[x])
                if (arr.length <= 10) {
                  that.setData({
                    'bottomText': '已显示全部',
                    'loadlist': arr,
                    'showlist': arr
                  })
                  wx.hideLoading()
                } else {
                  that.setData({
                    'bottomText': '下拉加载更多',
                    'loadlist': arr,
                    'showlist': arr.slice(0, 10)
                  })
                  wx.hideLoading()
                }
              }
              else if (finalSelect.major == "全部" && finalSelect.grade == "全部") {
                that.setData({
                  'bottomText': '下拉加载更多',
                  'showlist': res.data.slice(0,10)
                })
                wx.hideLoading()
                console.log(that.data.showlist)
              }
              else if (finalSelect.grade != res.data[x].g_name || finalSelect.major != res.data[x].m_name) {

                noarr.push(res.data[x])
                if (noarr.length == res.data.length)
                  that.setData({
                    'showlist': []
                  })
                wx.hideLoading()
                console.log(noarr)
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
                  wx.hideLoading()
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
          content: '网络异常，读取数据失败',
          confirmColor: "#006ACC",
          success(res) {
            wx.hideLoading()
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

  //投票功能
  addpiao: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var showlist = that.data.showlist
    console.log(id)
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        console.log(networkType)
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
        }else {
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
  display:function(){
    wx.showTabBar({
      aniamtion:true
    })
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
  clickAnimation:function(){
    var that = this
    
  },

  //学生上传
  student_upload(){
    var that = this;
    var aid = that.data.aid;
    var studentInfo = app.globalData.studentInfo;
    var studentRange = [studentInfo.g_name, studentInfo.dept_name, studentInfo.m_name];
    console.log(app.globalData.studentInfo );

    function rangeInfo(){
      
      if (acInfo.a_range[0] == '全部' && acInfo.a_range[1] == '全部' && acInfo.a_range[2] == '全部') {
        wx.navigateTo({
          url: '../upload/upload?aid='+aid,
        })
      }
      //年级系别不限时
      else if (acInfo.a_range[0] == '全部' && acInfo.a_range[1] == '全部') {
        if (studentRange[2] !== acInfo.a_range[2]) {
          wx.showToast({
            title: '抱歉！您的专业不符合参与条件',
            icon: 'none'
          })
        }
        else {
          wx.navigateTo({
            url: '../upload/upload?aid='+aid,
          })
        }
      }
      //年级不限时
      else if (acInfo.a_range[0] == '全部') {
        if (studentRange[1] !== acInfo.a_range[1]) {
          wx.showToast({
            title: '抱歉！您的系别不符合参与条件',
            icon: 'none'
          })
        }
        else {
          if (acInfo.a_range[2] !== '全部' && studentRange[2] !== acInfo.a_range[2]) {
            wx.showToast({
              title: '抱歉！您的专业不符合参与条件',
              icon: 'none'
            })
          }
          else if (studentRange[2] == acInfo.a_range[2] || acInfo.a_range[2] == '全部'){
            wx.navigateTo({
              url: '../upload/upload?aid='+aid,
            })
          }
        }
      }
      //限定年级时
      else if (acInfo.a_range[0] !== '全部') {
        if (studentRange[0] !== acInfo.a_range[0]) {
          wx.showToast({
            title: '抱歉！您的年级不符合参与条件',
            icon: 'none'
          })
        }
        else {
          //系别
          if (acInfo.a_range[1] !== '全部' && studentRange[1] !== acInfo.a_range[1]) {
            wx.showToast({
              title: '抱歉！您的系别不符合参与条件',
              icon: 'none'
            })
          }
          else if (acInfo.a_range[1] == '全部') {
            //专业
            if (acInfo.a_range[2] !== '全部' && studentRange[2] !== acInfo.a_range[2]) {
              wx.showToast({
                title: '抱歉！您的系别不符合参与条件',
                icon: 'none'
              })
            }
            else if (acInfo.a_range[2] == '全部' || studentRange[2] == acInfo.a_range[2]) {
              wx.navigateTo({
                url: '../upload/upload?aid='+aid,
              })
            }
          }
          else if (studentRange[1] == acInfo.a_range[1]) {
            if (acInfo.a_range[2] !== '全部' && studentRange[2] !== acInfo.a_range[2]) {
              wx.showToast({
                title: '抱歉！您的系别不符合参与条件',
                icon: 'none'
              })
            }
            else if (acInfo.a_range[2] == '全部' || studentRange[2] == acInfo.a_range[2]) {
              wx.navigateTo({
                url: '../upload/upload?aid='+aid,
              })
            }
          }
        }
      }
    };
    let acInfo = that.data.acInfo;
    wx.getSetting({
      success(res) {

        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }

        //判断是否已经登录
        if (JSON.stringify(res.authSetting) === "{}" || app.globalData.userid === '') {
          wx.reLaunch({
            url: '../login/login',
          })
          return
        } else {
          //判断是否符合参与范围
          //允许全部时
          if (studentInfo !== '') {
            rangeInfo();
          }
          else {
            wx.showToast({
              title: '仅限学生上传作品',
              icon:'none'
            })
          }
          
        }

        for (let i in res.authSetting) {
          if (res.authSetting[i] !== true || app.globalData.userid === '') {
            wx.reLaunch({
              url: '../login/login',
            })
            return
          } else {
            //判断是否符合参与范围
            if (studentInfo !== '') {
              rangeInfo();
            }
            else {
              wx.showToast({
                title: '仅限学生上传作品',
                icon: 'none'
              })
            }
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