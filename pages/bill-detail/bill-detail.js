// pages/bill-detail/bill-detail.js
import requestUrl from "../../common/api.js"

//获取一次详情
//编辑账单
//删除账单
Page({

  /**
   * Page initial data
   */
  data: {
    recordid:'',
    amount:'',
    remark:'',
    type:'',
    array: ['工资', '奖金', '人情', '饮食', ],
    index:0,
    date: '2018-09-01',
  },
  bindPickerChange(e) {
    console.log('类型，携带值为1', e.detail.value)
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
  editBill:function(){
    console.log('edit： ' + this.data.recordid)
    const recordid = this.data.recordid
    wx.showModal({
      title: '提示',
      content: '确认保存',
      success : (res) =>{
        if(res.confirm){
          wx.request({
            url: requestUrl.account + '/' + recordid,
            method : 'Patch',
            data : {
              
            }
          })
        }else{
          console.log('取消保存')
        }
      }
    })
    wx.showToast({
      title: '保存成功',
    })
  },
  deleteBill:function(){
    console.log('delete' + this.data.recordid)
    const recordid = this.data.recordid
    wx.showModal({
      title: '提示',
      content: '删除后数据不可恢复',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定' + recordid)
          wx.request({
            url: requestUrl.deleteRecord + recordid,
            method:'Delete',
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
  onLoad: function (options) {
    console.log(options.recordid)
    this.setData({
      recordid:options.recordid
    })
    wx.request({
      url: requestUrl.getOneRecordDetail + options.recordid,
      success: res => {
        console.log(res)
        if (res.statusCode == '200') {
          this.setData({
            amount:res.data.amount,
            remark:res.data.remark,
            date:res.data.date,
            type:res.data.type.type
          })
        }
      }
    })
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