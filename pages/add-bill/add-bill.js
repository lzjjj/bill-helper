// pages/mine/mine.js
import requestUrl from "../../common/api.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    trd_session: "",
    userDetail: "",
    userInfo: "",
    areaList: [],
    index: 0,
    isShowBtn: false,
    hasUserInfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})