
let app = getApp();

Page({
  data: {
    questions: [],
    questionBank: []
  },
  onLoad: function (options) {
    // let a = '欢迎你' + app.globalData.user.name + '!';
    
    // // console.log(a);
    // wx.showToast({
    //   title: a,
    // })
    let msg = [];
    let questionBank = app.globalData.questionBank;
    console.log(questionBank)
    // for(let i = 0; i < questionBank.length; i ++) {
    //   if (questionBank[i].state == false)//只要未选取的题目
    //   msg.push(questionBank[i].title);
    // }
    this.setData({
      questions: msg,
      questionBank: questionBank
    })
  },
  //页面初次渲染完成
  onReady: function () {
  },
  onShow: function () {
    this.onLoad();
  },
  chooseDetails: function (res) {
    //直接跳转到details页面即可
    // console.log(res.currentTarget.dataset.title)
    let title = res.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/details/details?title=' + title,
    })
  },
})