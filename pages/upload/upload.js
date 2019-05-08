// pages/publish/publish.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    acName: '',
    acDes: '',
    d_st_name:'',
    d_vid:'',
    showMask: true,
    imgUrl: '',
    base64: '',
    publishData: {},
    author:'',
    imgList:[],
    baseList:[],
    showImg:true,
    aid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      aid: options.aid
    });
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
    var that = this;
    var studentInfo = app.globalData.studentInfo;
    console.log(studentInfo)
    that.setData({
      d_st_name: studentInfo.s_name
    })


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

  upload: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        let base64 = wx.getFileSystemManager().readFileSync(tempFilePaths[0], "base64");
        
        if (res.tempFiles[0].size > 200000) {
          wx.showToast({
            title: "图片大小不得超过200kb",
            icon: "none"
          })
        } else {
          that.setData({
            imgUrl: tempFilePaths[0],
            base64: base64
          })
          wx.showToast({
            title: "图片上传成功",
          })
          console.log(that.data.imgUrl)
        }

      }
    })
  },

  addImg: function () {
    var that = this;
    var imgList = that.data.imgList;
    var baseList = that.data.baseList;
    wx.chooseImage({
      count: 6,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        
        //console.log(tempFilePaths)
        
        if (res.tempFiles[0].size > 200000) {
          wx.showToast({
            title: "图片大小不得超过200kb",
            icon: "none"
          })
        } else {
          if (imgList.length + tempFilePaths.length > 6) {
            console.log(that.data.imgList)
            wx.showToast({
              title: '图片不能超过6张',
              icon: "none"
            });
          } else {
            tempFilePaths.map(function (val, index, arr){
              let base64 = wx.getFileSystemManager().readFileSync(val, "base64");
              imgList.push(val);
              baseList.push(base64);
              that.setData({
                imgList: imgList,
                baseList: baseList
              })
              wx.showToast({
                title: "图片上传成功",
              })
            })
            
          }
        }

      }
    })
  },
  deleteImg:function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    console.log(index)
    let imgList = that.data.imgList;
    imgList.splice(index,1);
    that.setData({
      imgList: imgList
    })
  },
  //活动名称
  acName(e) {
    console.log(e.detail.value);
    this.setData({
      acName: e.detail.value
    })
  },
  //活动描述
  acDes(e) {
    console.log(e.detail.value);
    this.setData({
      acDes: e.detail.value
    })
  },
  stName(e) {
    console.log(e.detail.value);
    this.setData({
      d_st_name: e.detail.value
    })
  },
  acVideo(e){
    var that = this;
    that.setData({
      d_vid: e.detail.value
    })
    if(that.data.d_vid.trim() != ''){
      that.setData({
        showImg:false
      })
    }else{
      that.setData({
        showImg: true
      })
    }
  },
  //发布
  publish() {
    var that = this;
    let d_name = that.data.acName;
    let d_des = that.data.acDes;
    let d_st_name = that.data.d_st_name;
    let d_vidlink = that.data.d_vid;
    let imgUrl = that.data.imgUrl;
    let base64 = that.data.base64;
    let imgList = that.data.baseList;
    let userid = app.globalData.userid.slice(1);
    let aid = that.data.aid;
    let g_id = app.globalData.studentInfo.g_id;
    let m_id = app.globalData.studentInfo.m_id; 
    let dept_id = app.globalData.studentInfo.dept_id;
    if (d_name !== '' && d_st_name !== '' && base64 !== '' && d_des !== '' && imgUrl !== '') {
      if(d_vidlink.trim() === '' && imgList.length === 0){
        wx.showToast({
          title: '请填写视频id或上传图片作品',
          icon: 'none'
        })
      }
      else{
        //t0774x57j8w
        wx.showLoading({
          title: '正在上传...',
        })
        //上传
        console.log(imgList.length)
        wx.request({
          url: 'https://www.nsuim.cn/student_upload',//上传接口
          data: {
            d_owner: userid,
            d_name: d_name,
            d_des: d_des,
            d_imglink: base64,
            d_st_name: d_st_name,
            d_img_list: imgList,
            d_vidlink: d_vidlink,
            g_id:g_id,
            m_id:m_id,
            dept_id:dept_id,
            aid:aid
          },
          method: "POST",
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data);
            if (res.data === 'OK') {
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
              })
              wx.navigateBack({
                delta: 1
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: '图片太大,请更换图片',
              icon: "none"
            })
          }
        })
      }
    }
    else {
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'none'
      })
    }
  }
})