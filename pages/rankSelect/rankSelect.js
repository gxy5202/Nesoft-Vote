// pages/rankSelect/rankSelect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleList:[
      {
        rank_name:"总人气榜",
        rank_des:"查看获得的投票总数"
      },
      {
        rank_name: "今日人气榜",
        rank_des: "查看今日新增票数排名"
      },
     
    ],
    alllist:[],
    daylist:[],
    majlist:[],
    ranklistAll:[],
    ranklistDay:[],
    ranklistMaj:[],
    info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
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
    
    var that = this
    var arr1 = []
    var arr2 = []
    var arr3 = []
    var num = 0;
    var num2 = 0;
    var num3 = 0;
    var maj1 = {};
    var maj2 = {};
    var maj3 = {};
    var info = {
      count:0,
      item:0,
    }
    wx.login({
      success: res => {
        
        wx.request({
          url: 'https://www.nsuim.cn/rank_data',
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
            wx.hideLoading()
            function compare(pro) {
              return function (obj1, obj2) {
                var val1 = obj1[pro];
                var val2 = obj2[pro];
                if (val1 < val2) { //正序
                  return 1;
                } else if (val1 > val2) {
                  return -1;
                } else {
                  return 0;
                }
              }
            }
            that.setData({
              ranklistAll: res.data.sort(compare("d_count"))
            })
            //今日上涨票数排序
            for (let x in res.data) {
              res.data[x].up_count = res.data[x].d_count - res.data[x].d_old_count
              arr1.push(res.data[x])
              info.count += res.data[x].d_count
              info.item = Number(x)
            }
            that.setData({
              'info.count': info.count,
              'info.item': info.item+1
            })
         
            arr1.sort(compare("up_count"));
            console.log(arr1)

            //专业榜

            for (let x in res.data) {
              if (res.data[x].m_id == "maj01") {
                num += res.data[x].d_count
                maj1.m_name = res.data[x].m_name
                maj1.count = num
              } else if (res.data[x].m_id == "maj02") {
                num2 += res.data[x].d_count
                maj2.m_name = res.data[x].m_name
                maj2.count = num2
              } else if (res.data[x].m_id == "maj03") {
                num3 += res.data[x].d_count
                maj3.m_name = res.data[x].m_name
                maj3.count = num3
              }
            }
            arr2 = [maj1, maj2, maj3]
            console.log(arr2)
            arr2.sort(compare("count"));
            that.setData({
              alllist: res.data.slice(0, 3),
              daylist: arr1.slice(0, 3),
              majlist: arr2.slice(0, 3),
              ranklistDay: arr1,
              ranklistMaj: arr2
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
 toRank:function(e){
   var that = this;
   var index = e.currentTarget.dataset.index;
   console.log(index)
   if(index == 0){
     wx.setStorage({
       key: 'rank',
       data: that.data.ranklistAll,
     })
     wx.setStorage({
       key: 'title',
       data: that.data.titleList[0],
     })
     console.log(that.data.ranklistAll)
     wx.navigateTo({
       url: '/pages/rank/rank'
     });
   }else if(index == 1){
     wx.setStorage({
       key: 'rank',
       data: that.data.ranklistDay,
     })
     wx.setStorage({
       key: 'title',
       data: that.data.titleList[1],
     })
     console.log(that.data.ranklistDay)
     wx.navigateTo({
       url: '/pages/rank/rank'
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