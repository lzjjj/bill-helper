// pages/bill-detail/bill-detail.js
//获取一次详情
//编辑账单
//删除账单
Page({

  /**
   * Page initial data
   */
  data: {
    array: ['工资', '奖金', '人情', '饮食', ],
    index:0,
    date: '2018-09-01',
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  editBill:function(){
    console.log('edit')
  },
  deleteBill:function(){
    console.log('delete')
    wx.showModal({
      title: '提示',
      content: '删除后数据不可恢复',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
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
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})