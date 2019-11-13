//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    var that = this;
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('login-success', res.code);
        if (res.code) {
          // wx.request({
          //   url: that.globalData.url,
          //   data: {//传到后台用来换取其他信息
          //   //将账号密码发送到服务器！
            
          //     code: res.code,
          //     // appid: that.globalData.appid,
          //     // secret: that.globalData.secret
          //   },
          //   method: 'POST',
          //   success: (res) => {
          //     console.log('返回数据成功')
          //     console.log(res.data);
          //   }
          // })
        } else {
          // console.error('获取用户登陆码失败', res.errMsg);
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onLoad: function () {

    //后台做

    // let userName = this.globalData.userName;
    // let dataBaseMsg = this.globalData.dataBaseMsg;
    // let user = this.globalData.user;
    // console.log(userName);
    // for (let i = 0; i < dataBaseMsg.length; i ++) {
    //   if(dataBaseMsg[i].name == userName) {
    //     user = dataBaseMsg[i];
    //   }
    // }
    // console.log(this.globalData.user);
  },
  globalData: {
    userInfo: null,
    userNum: 0,
    url:'http://127.0.0.1:2000',
    userName: '王敬伟',
    
    //当前用户，信息在登录时候绑定到指定的数据库中的用户
    user: {},

    //数据库内容
    dataBaseMsg : [
      {
        name: '王敬伟',
        user: '17854044',
        password: '17854044',
        choose: '母猪的产后护理 1',//选的题
        time: '2019/11/06 13:43:07',//选题的时间
        chance: 1,//改题机会  1/0
        lowChoose: '',//如果改过题，这是上一个题
        lowTime: ''//如果改过题，这是上一个题的时间
      },
      {
        name: '某',
        user: '17854029',
        password: '17854029',
        choose: '母猪的产后护理 10',
        time: '2019/11/06 13:43:07',
        chance: 1,
        lowChoose: '',
        lowTime: ''
      },
      {
        name: '某某',
        user: '1',
        password: '1',
        choose: '母猪的产后护理 8',
        time: '2019/11/06 13:43:07',
        chance: 1,
        lowChoose: '',
        lowTime: ''
      },
      {
        name: '某某某',
        user: '17854022',
        password: '17854022',
        choose: '母猪的产后护理 3',
        time: '2019/11/06 13:43:07',
        chance: 1,
        lowChoose: '',
        lowTime: ''
      },
      {
        name: '某某某某',
        user: '17854033',
        password: '17854033',
        choose: '母猪的产后护理 6',
        time: '2019/11/06 13:43:07',
        chance: 1,
        lowChoose: '',
        lowTime: ''
      },
    ],
    //题库
    questionBank: [
      {
        id: 1,
        title: '母猪的产后护理 1',
        details: '母猪的产后护理 1 详情',
        state: true// 已选 / 未选
      },
      {
        id: 2,
        title: '母猪的产后护理 2',
        details: '母猪的产后护理 2 详情',
        state: false// 已选 / 未选
      },
      {
        id: 3,
        title: '母猪的产后护理 3',
        details: '母猪的产后护理 3 详情',
        state: true// 已选 / 未选
      },
      {
        id: 4,
        title: '母猪的产后护理 4',
        details: '母猪的产后护理 4 详情',
        state: false// 已选 / 未选
      },
      {
        id: 5,
        title: '母猪的产后护理 5',
        details: '母猪的产后护理 5 详情',
        state: false// 已选 / 未选
      },
      {
        id: 6,
        title: '母猪的产后护理 6',
        details: '母猪的产后护理 6 详情',
        state: true// 已选 / 未选
      },
      {
        id: 7,
        title: '母猪的产后护理 7',
        details: '母猪的产后护理 7 详情',
        state: false// 已选 / 未选
      },
      {
        id: 8,
        title: '母猪的产后护理 8',
        details: '母猪的产后护理 8 详情',
        state: true// 已选 / 未选
      },
      {
        id: 9,
        title: '母猪的产后护理 9',
        details: '母猪的产后护理 9 详情',
        state: false// 已选 / 未选
      },
      {
        id: 10,
        title: '母猪的产后护理 10',
        details: '母猪的产后护理 10 详情',
        state: true// 已选 / 未选
      },
      {
        id: 11,
        title: '母猪的产后护理 11',
        details: '母猪的产后护理 11 详情',
        state: false// 已选 / 未选
      },
      {
        id: 12,
        title: '母猪的产后护理 12',
        details: '母猪的产后护理 12 详情',
        state: false// 已选 / 未选
      }
    ]

  }
})