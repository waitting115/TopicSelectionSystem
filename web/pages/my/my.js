
let app = getApp();

Page({
  data: {
    user: {}
  },
  onLoad: function (options) {
    this.setData({
      user: app.globalData.user
    })
  },
  onShow: function () {
    this.onLoad();
  },
  //点击修改课题

  //当前用户
  // user: {
  //   name: '王敬伟',
  //   user: 17854044,
  //   password: 17854044,
  //   choose: '母猪的产后护理 1',
  //   time: '2019/11/06 13:43:07',
  //   chance: 1,
  //   lowChoose: '',
  //   lowTime: ''
  // },

  clickModify: function () {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '修改课题会将已选课题放入题库！',
      success: function (res) {
        // console.log(res);
        //要实现的功能：将已选课题放回题库,将用户已选课题和选课时间放入历史课题和历史选课时间，然后修改用户的chance属性为0。并且清空已选课题和选课时间。然后页面跳转到选题主页，并且刷新选题主页
        // console.log(res.confirm)
        if(res.confirm) {//如果用户点击确定
          let user = app.globalData.user;

          //将已选课题放回题库
          let questionBank = app.globalData.questionBank;
          for (let i = 0; i < questionBank.length; i++) {
            if (questionBank[i].title === user.choose) {
              questionBank[i].state = false;
            }
          }

          //将用户已选课题和选课时间放入历史课题和历史选课时间
          user.lowChoose = user.choose;
          user.lowTime = user.time;

          //修改用户的chance属性为0
          user.chance = 0;

          //清空已选课题和选课时间
          user.choose = '';
          user.time = '';
          
          //刷新页面
          that.onLoad();
          // console.log(user);

          //页面跳转到选题主页
          wx.switchTab({//tabbar间跳转
            url: '/pages/home/home',
            success: (res) => {
              console.log('success')
            },
            fail: (res) => {
              console.log('fail')
            }
          })
        }
      }
    })
  },
  //点击退出登录
  clickLogOut: function () {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})