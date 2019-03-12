//index.js
import requestUrl from "../../common/api.js"
var util = require('../../utils/util.js')
const app = getApp()
//const currentDay=getDate(year, month)
//const date=new Date()
Page({
  data: {
    //date: '2017-09',
    date:util.formatTime(new Date()),
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
      monthIO:{
        income:'200',
        outlay:'150',
        balance:'50'
      }
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
            // monthIO: res.data.monthIO
    //选定月份后重新获取账单信息
    this.setData({
      date: e.detail.value
    })
    this.onShow()
    //查询所选月份的账单
  },
  onShow: function (){
    //call 一次api获取当前月份的账单'
    console.log('--date--' + this.data.date)
    wx.getStorage({
      key: 'trd_session',
      success: (res) => {
        wx.request({
          url: requestUrl.defaultMonthBill + this.data.date + '?trd_session=' + res.data,
          success: res => {
            console.log('--on load------------------------')
            console.log(res)
            if (res.statusCode == 200) {
              console.log('调api')
              console.log(res.data)
              this.setData({
                monthIO: res.data.monthIO,
                bill: res.data.bill,
              })
              // app.globalData.userDetail = res.data.data
            }
          }
        })
      },
    })
  },
  onLoad: function (options) {
    console.log('--date1--' + this.data.date)
    // this.setData({
    //   date: util.formatTime(new Date())
    // });
    console.log('--date2--' + this.data.date)
    wx.getStorage({
      key: 'trd_session',
      success: (res) => {
        wx.request({
          url: requestUrl.defaultMonthBill + this.data.date + '?trd_session=' + res.data,
          success: res => {
            console.log('--on load------------------------')
            console.log(res)
            if (res.statusCode == 200) {
              console.log('调api')
              console.log(res.data)
              this.setData({
                monthIO: res.data.monthIO,
                bill : res.data.bill,
              })
              // app.globalData.userDetail = res.data.data
            }
          }
        })
      },
    })
  },

  onReachBottom: function () { //到底部触发事件
    // if (!this.data.showNone && this.data.userDetail.if_engineer) {
    if (!this.data.showNone){
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
    console.log(e.currentTarget.dataset)
    let recordid = e.currentTarget.dataset.recordid
    console.log(recordid);
    wx.navigateTo({
      url: '/pages/bill-detail/bill-detail?recordid='+recordid
    })
  },

  onPullDownRefresh(){
    wx.getStorage({
      key: 'trd_session',
      success: (res) => {
        wx.request({
          url: requestUrl.defaultMonthBill + this.data.date + '?trd_session=' + res.data,
          success: res => {
            console.log('--------------------------')
            console.log(res.data)
            if (res.data.status == 'success') {
              console.log('调api')
              console.log(res.data)
              this.setData({
                bill: res.data.bill,
                monthIO: res.data.monthIO
              })
              app.globalData.userDetail = res.data.data
            }
          }
        })
      },
    })
  }

})
