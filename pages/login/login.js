
let app = getApp();

Page({
  data: {
    form_info: ''
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onShow: function () {

  },

  formSubmit: function (res) {
    // console.log(res.detail.value);
    let that = this;
    //与数据库信息比较
    let msg = app.globalData.dataBaseMsg;
    let i;
    for( i = 0; i < msg.length; i ++) {
      // console.log(i);
      if(msg[i].user === res.detail.value.user && msg[i].password === res.detail.value.password) {
        //修改app.globalData.user的信息
        app.globalData.user = msg[i];
        console.log(app.globalData.user, '修改成功');
        //跳转
        wx.switchTab({
          url: '/pages/home/home',
        })
        break;
      }
    }

    if(i === msg.length) {//说明数据库中没搜索到此用户
      wx.showModal({
        title: '提示',
        content: '您输入的信息有误，请重新输入!',
        success: (res1) => {
          //清空功能。。。
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