//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hiddenHeight: 0,
    selected: 0,
    display:"block",
    bannerlist: [{
      imgSrc: "http://img2.imgtn.bdimg.com/it/u=3663989430,1044748734&fm=26&gp=0.jpg"
    }, {
        imgSrc: "/images/e017.jpg"
    }, {
        imgSrc: "/images/e018.jpg"
    }],
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
  onLoad:function(){
    
  },
  onShow:function(){
    var that = this
    /*
    wx.showLoading({
      title: '正在加载',
    })
    */
    
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
              /*
              wx.hideLoading(
  
              )
              */
            }
          })
        }
      });                   
    
                                                                                  
  },
  onReady:function(){
  

        
        
        /*
        var time = new Date(res.data[0].t_end_time);
        var now= new Date();
        var restTime = time-now;
        var day = restTime / 1000 / 60 / 60 / 24;
        var hours = ((day) - parseInt(day)) * 24;
        var minutes = (((hours) - (parseInt(hours))) * 60) - parseInt(((hours) - (parseInt(hours))) * 60);
        var newTime = parseInt(day) + "天" + parseInt(hours) + "小时" + parseInt(((hours) - (parseInt(hours))) * 60) + "分钟" + minutes * 60 +"秒";
        
        console.log(newTime)
        console.log(minutes*60)
        /*
        var timer = setInterval(function(){
          var time = new Date(res.data[0].t_end_time);
          var now = new Date();
          var restTime = time - now;
          var day = restTime / 1000 / 60 / 60 / 24;
          var hours = ((day) - parseInt(day)) * 24;
          var minutes = (((hours) - (parseInt(hours))) * 60) - parseInt(((hours) - (parseInt(hours))) * 60);
          var newTime = parseInt(day) + "天" + parseInt(hours) + "小时" + parseInt(((hours) - (parseInt(hours))) * 60) + "分钟" + parseInt(minutes * 60) + "秒";
          console.log(newTime)
          
        },1000)
        */
        
        
      
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
          url: '/pages/des/des?id='+ id
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
            Appid: "wxd680d257e52cab2b",
            AppSecret: "19e9721f2131505d1f4d83966a155ed4",
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
  //选择专业
  /*
  majorclicks: function (e) {
    var that = this
    console.log(e)
    var index = e.currentTarget.dataset.index;
    let name = that.data.majorlist[index].name;
    var showlist = that.data.showlist
    var finalSelect = that.data.finalSelect
    that.setData({
      major: name,
      selected: 0,
      'finalSelect.major':name
    })
    console.log(finalSelect)

    wx.request({
      url: 'http://localhost:8080/data',
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
    });
  },
  //选择年级
  gradeclicks: function (e) {
    var that = this
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var name = that.data.gradelist[index].name;
    var finalSelect = that.data.finalSelect
    that.setData({
      grade: name,
      selected: 0,
      'finalSelect.grade': name
    })
    console.log(finalSelect)
   //向数据库发送请求，查询满足条件的作品
    wx.request({
      url: 'http://localhost:8080/data',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var arr = []
        var noarr= []
        for (var x in res.data) {
          if (finalSelect.grade == res.data[x].g_name && finalSelect.major == res.data[x].m_name) {
            console.log(res.data[x])
            arr.push(res.data[x])
            that.setData({
              'showlist': arr
            })
            console.log(that.data.showlist)
          }
          else if (finalSelect.grade == res.data[x].g_name && finalSelect.major == "全部"){
            console.log(res.data[x])
            arr.push(res.data[x])
            that.setData({
              'showlist': arr
            })
            console.log(that.data.showlist)
          }
          else if (finalSelect.grade == "全部" && finalSelect.major == res.data[x].m_name) {
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
            if(noarr.length == res.data.length)
            that.setData({
              'showlist': []
            })
            console.log(noarr)
          }
          
        }

        
      }
    });
  },
  */
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
    
   
  },
  display:function(){
    this.setData({
      display:"none"
    })
  },
  topScroll: function () {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  }

})