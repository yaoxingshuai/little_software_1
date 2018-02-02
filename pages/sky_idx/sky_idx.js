// pages/sky_idx/sky_idx.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    css1_var: "my_css_1",
    userInfoVar: {},
    myPhone: { 'k1': 'v1' },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('哈哈哈，load成功，准备加载头像咯...');
    // myapp.getUserInfo(function(userInfo){
    //   this.setData({
    //     userInfoVar: userInfo
    //   })
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfoVar: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfoVar: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfoVar: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

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
  skyClickText1: function () {
    var now_date = new Date();
    console.log('你点击了文字' + now_date.toLocaleString());
    if (this.data.css1_var == 'my_css_1') {
      this.data.css1_var = 'my_css_2';
    } else {
      this.data.css1_var = 'my_css_1';
    }
    color_flag = !color_flag;
    console.log('color=' + this.data.css1_var);
    this.setData({
      css1_var: this.data.css1_var
    });
  },

  get_system_info_func: function () {
    var that = this
    var myPhoneVar = this.data.myPhone
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.platform)
        console.log(myPhoneVar)
        // 这里是this和上一级的this不同，所以先赋值
        myPhoneVar.model = res.model
        that.setData({
          myPhone: myPhoneVar
        })
      },
    })

  },

  get_name_hello_func: function () {
    wx.request({
      url: 'https://www.d.stardan.cn/name/skyname/',
      method: 'GET',
      success: function (res) {
        console.log('res.data===' + res.data) //[object Object]
        for (var k in res.data) {   //字典的打开方式
          console.log(k + "===>" + res.data[k])
        }
        if (res.data.status_code == 0) {
          console.log('get url ok...')
          console.log('content=' + res.data.data + '\t extra=' + JSON.stringify(res.data.extra))  //或者json方式打开
        }
      }
    })
  },

  select_db_info: function(){
    wx.request({
      url: 'https://www.d.stardan.cn/select/',
      data: {
        offset: 3,
        count: 5,
      },
      header: {
        'Cookie':'session_key_username='+'skyLittleSoft',
      },
      success: function(res){
        console.log('select db ok...json='+JSON.stringify(res.data))
        for (var k in res.data.user_info_list){
          console.log(k + '=======>' + res.data.user_info_list[k].name+
            '===>' + res.data.user_info_list[k]['mid'] + '===>' + res.data['user_info_list'][k].age)
        }
      }
    })
  },

})

var color_flag = true;

