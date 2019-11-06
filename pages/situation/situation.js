
let app = getApp();

Page({
  data: {
    allUser: []
  },
  onLoad: function (options) {
    this.setData({
      allUser: app.globalData.dataBaseMsg
    })
    console.log(app.globalData.user.choose)
  },
  onShow: function () {
    this.onLoad();//刷新
  }
})