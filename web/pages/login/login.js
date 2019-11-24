
let app = getApp();

Page({
  data: {
    form_info: '',
    url: '',
  },
  onLoad: function (options) {
    this.setData({
      url: app.globalData.url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShow: function () {

  },

  formSubmit: function (result) {
    // console.log(result.detail.value);
    let that = this;
    //与数据库信息比较
    wx.request({
      url: that.data.url + '/login',
      data:{
        user: result.detail.value.user,
        password: result.detail.value.password
      },
      method: 'GET',
      success: (res) => {
        console.log('返回的数据',res.data)
        if(res.data){//如果是true，即输入正确
          //将用户账号存到app.js
          app.globalData.user = result.detail.value.user;
          //跳转
          wx.switchTab({
            url: '/pages/home/home',
          })
        } else {//输入错误
          wx.showModal({
            title: '提示',
            content: '您输入的信息有误，请重新输入!',
            success: (res1) => {
              //清空账号密码
              if(res1.confirm) {
                that.setData({
                  form_info: ''
                })
              }
            }
          })
        }
      }
    })
    // let msg = app.globalData.dataBaseMsg;
    // let i;
    // for( i = 0; i < msg.length; i ++) {
      // console.log(i);
      // if(msg[i].user === res.detail.value.user && msg[i].password === res.detail.value.password) {
        //修改app.globalData.user的信息
        // app.globalData.user = msg[i];
        // console.log(app.globalData.user, '修改成功');
        //跳转
        // wx.switchTab({
          // url: '/pages/home/home',
        // })
        // break;
      // }
    // }

    // if(i === msg.length) {//说明数据库中没搜索到此用户
    
    // }
  }
})