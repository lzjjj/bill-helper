//index.js
import requestUrl from "../../common/api.js"
const app = getApp()
//const currentDay=getDate(year, month)
Page({
  data: {
    date: '2017-09',
    bill:
      [
        {
          date:'03月08日',
          income:'',
          outlay:'',
          records:[
            {
            type: '工资',
            money: '+200'
           },
            {
            type: '人情',
            money: '-100'
            }
          ]  
        },
        {
          date: '03月09日',
          income: '',
          outlay: '',
          records: [
            {
              type: '工资',
              money: '+300'
            },
            {
              type: '人情',
              money: '-200'
            }
          ]
        }
      ],
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  onShow: function (){
  },
  onLoad: function () {
  },

  onReachBottom: function () { //到底部触发事件
    if (!this.data.showNone && this.data.userDetail.if_engineer) {
      if (this.data.canRequest) {
        this.setData({
          pageNum: this.data.pageNum + 1
        })
        this.getToolsList();
      } else {
        wx.showToast({
          title: '已到底部',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  itemTapped(e) { // 跳转工具详情
    let passdata = e.currentTarget.dataset.passdata
    console.log(passdata);
    wx.navigateTo({
      url: '/pages/bill-detail/bill-detail'
    })
  }

})
