// pages/mine/mine.js
import requestUrl from "../../common/api.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trd_session: "",
    billType: 0, //0: pay out;1:get in 
    keyboardvalue: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: "." },
      { value: 0 },
      { value: 'clear' },
    ],

    keyboardvalue1: [
      { value: '+' },
      { value: '-' },
      { value: '完成' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
  
  },

  typeChange(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      billType: type
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})