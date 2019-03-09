//index.js
import requestUrl from "../../common/api.js"
const app = getApp()
Page({
  data: {
    index: 0,
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
