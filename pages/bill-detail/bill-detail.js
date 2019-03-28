// pages/bill-detail/bill-detail.js
import requestUrl from "../../common/api.js"
import util from "../../utils/util.js"

//获取一次详情
//编辑账单
//删除账单
Page({

  /**
   * Page initial data
   */
  data: {
    trd_session: '',
    recordid: '',
    amount: '',
    remark: '',
    type: '',
    array: ['工资', '奖金', '人情', '饮食'],
    index: null,
    date: '2018-09-01',
  },

  bindAmountInput(e) {
    if (isNaN(e.detail.value)) {
      return;
    }
    this.setData({
      amount: e.detail.value
    })
    console.log(e.detail.value)
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log('日期，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  editBill: function() {
    console.log('edit： ' + this.data.recordid)
    const recordid = this.data.recordid
    wx.showModal({
      title: '提示',
      content: '确认保存',
      success: (res) => {
        if (res.confirm) {
          const index = this.data.index
          const array = this.data.array
          wx.request({
            url: requestUrl.account + '/' + recordid + '?trd_session=' + this.data.trd_session,
            method: 'Post',
            data: {
              amount: this.data.amount,
              type: {
                type: index == null ? this.data.type : array[index]
              },
              dateStr: this.data.date,
              remark: this.data.remark
            },
            success: res => {
              wx.showToast({
                title: '保存成功',
              })
              wx.navigateBack({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          console.log('取消保存')
        }
      }
    })

  },
  deleteBill: function() {
    console.log('delete' + this.data.recordid)
    const recordid = this.data.recordid
    wx.showModal({
      title: '提示',
      content: '删除后数据不可恢复',
      success:(res) => {
        if (res.confirm) {
          console.log('用户点击确定' + recordid)
          wx.request({
            url: requestUrl.deleteRecord + recordid + "?trd_session=" + this.data.trd_session,
            method: 'Delete',
            success: res => {
              console.log(res)
              if (res.statusCode == '204') {
                wx.navigateBack({
                  url: '/pages/index/index'
                })
              }
            }
          })
          //call删除的api,并刷新
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    console.log(options.recordid)
    this.setData({
      recordid: options.recordid
    })
    wx.getStorage({
      key: 'trd_session',
      success: (res) => {
        this.setData({
          trd_session: res.data
        })
        wx.request({
          url: requestUrl.type + '?trd_session=' + res.data,
          success: res => {
            console.log('--detail--')
            console.log(res)
            if (res.statusCode == '200') {
              this.setData({
                array: res.data
              })
            }
          }
        })
        wx.request({
          url: requestUrl.getOneRecordDetail + options.recordid + '?trd_session=' + res.data,
          success: res => {
            console.log('detail-----' + res)
            if (res.statusCode == '200') {
              this.setData({
                amount: res.data.amount,
                remark: res.data.remark,
                date: util.convertJSon(res.data.date),
                type: res.data.type.type
              })
            }
          }
        })
      },
    })

  },

  bindKeyInput(e) {
    console.log(e.detail.value)
    this.setData({
      remark: e.detail.value
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})