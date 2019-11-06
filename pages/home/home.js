
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
    for(let i = 0; i < questionBank.length; i ++) {
      if (questionBank[i].state == false)//只要未选取的题目
      msg.push(questionBank[i].title);
    }
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
  chooseQuestion: function (res) {
    // console.log(res.currentTarget.dataset.title);
    let that = this;
    wx.showModal({
      title: '提示',
      content: '您确定选择这个题目吗？',
      success: function (res1) {
        //检查数据库中此选项状态，如果未选，则改变数据库信息，然后告诉用户选择结果，如果已选，则告诉用户此信息已选择，请选择别的题目

        //判断此用户是否已经选过题目，如果已选过不能重复选题
        if(app.globalData.user.choose == '') {//用户未选题情况
          let questionBank = that.data.questionBank;
          // console.log(questionBank);
          for (let i = 0; i < questionBank.length; i++) {
            if (questionBank[i].title == res.currentTarget.dataset.title) {

              if (questionBank[i].state == false) {//没人选择此题
                questionBank[i].state = true;//改变数据
                that.onLoad();//刷新当前页面
                wx.showToast({
                  title: '选题成功！',
                })
                app.globalData.user.choose = questionBank[i].title;
                // console.log(app.globalData.user.choose,'用户的选择');
                let timer = new Date();
                let time = that.getTime(timer);
                // console.log('time',time)
                app.globalData.user.time = time;
                // console.log(app.globalData.user.time)

              } else if (questionBank[i].state == true) {//已经有人选择此题，小概率触发
                wx.showModal({
                  title: '提示',
                  content: '已经有人先您一步抢到了这道题，请选择其他题目！',
                })
                that.onLoad();//刷新当前页面
              }
            }
          }
        } else {//用户重复选题情况
          wx.showModal({
            title: '提示',
            content: '您已选过题目了，不能重复选题',
          })
        }
      }
    })
  },
  //时间处理函数
  getTime: function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    function formatNumber(n) {
      n = n.toString()
      return n[1] ? n : '0' + n
    }

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  },
})