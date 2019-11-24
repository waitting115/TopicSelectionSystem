
let app = getApp();

Page({
  data: {
    questions: [],
    questionBank: []
  },
  onLoad: function (options) {

    //向后端发起请求，将所有的题发过来然后渲染到上面
    wx.request({
      url: app.globalData.url + '/home',
      data: {},
      method: 'GET',
      success: (res) => {
        console.log('返回的数据',res.data)
        //将返回的数据that.setData({})存到data的questionBank中
      }
    })
    // let msg = [];
    // let questionBank = app.globalData.questionBank;
    // console.log(questionBank)
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