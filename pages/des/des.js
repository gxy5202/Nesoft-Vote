// pages/des/des.js
const txvContext = requirePlugin("tencentvideo");
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    showlist: [],
    time:"",
    timer:"",
    end:"投票结束:"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    const scene = decodeURIComponent(query.scene)
    console.log(query)
    var that = this;
    var id = query.id;
    
    if(scene){
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
              console.log(next.data)
              for(let x in next.data){
                if (scene == next.data[x].d_id){
                  that.setData({
                    showlist: next.data[x],
                  })
                }
              }
              
              
              wx.hideLoading(
  
              )
              
            }
          })
        }
      });          
    };
    
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
          showlist: res.data
        })
      },
    })
    wx.getStorage({
      key: 'time',
      success: function (res) {
        // 位数不足补零
        function fill_zero_prefix(num) {
          return num < 10 ? "0" + num : num
        }

        var timer = setInterval(function () {
          var time = new Date(res.data);
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
          
          if (restTime <= 0 ){
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
              end:"已结束"
            })
          }else {
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
              end: "投票结束:"
            })
          }
        
        }, 100)
        that.setData({
          timer:timer
        })
      },
    })

   
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
  onShareAppMessage: function(query) {
    var that = this;
    var id = that.data.showlist.d_id;
    return {
      title:"我在参与51校园展",
      path:"/pages/des/des?id="+id,
      imageUrl:"../../images/51.png",
      success:function(res){
        console.log("转发成功",res);
      },
      fail:function(res){
        console.log("转发失败", res);
      }
    }
  },
  addpiao: function (e) {
    var that = this
    var id = e.currentTarget.dataset.id
    var showlist = that.data.showlist
    console.log(id)
    if(that.data.end == "已结束"){
      wx.showToast({
        title: "该活动投票已结束",
        icon: "none",
      })
    }else{
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
              if (id == showlist.d_id) {
                that.setData({
                  [`showlist.d_count`]: next.data.data[0].d_count,
                  [`showlist.iconid`]: next.data.iconid
                })
              }
              wx.setStorage({
                key: 'key',
                data: showlist,
              })
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
    
    
  },
  share:function(){
    wx.showShareMenu({
      
    })
    this.onShareAppMessage();
  }
  
})
