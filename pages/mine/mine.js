// pages/mine/mine.js
import requestUrl from "../../common/api.js"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: '',//用户信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    trd_session: "",
    goBack: false,
    goBackHome: false,
    userDetail: "",
    balance:"0.00",
    days:"0",
    records:"0"
  },
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    wx.getStorage({
      key: 'trd_session',
      success: (res) => {
        this.setData({
          trd_session: res.data
        }),
          this.getMoreInfo(this.data.trd_session)
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'trd_session',
      success: (res) => {
        this.setData({
          trd_session: res.data
        }),
        this.getMoreInfo(this.data.trd_session)
      },
    })
    if (options.goBack) {
      this.setData({
        goBack: true
      })
    }
    if (options.goBackHome) {
      this.setData({
        goBackHome: true
      })

    }

  },
  getMoreInfo(trd_session) { //获取用后台存储信息
    wx.request({
      url: requestUrl.userDetail + '?trd_session=' + trd_session,
      success: res => {
        if (res.statusCode == 200) {
          this.setData({
            balance: res.data.balance == null ? '0.0' : res.data.balance,
            days: res.data.days == null ? '0' : res.data.days,
            records: res.data.records == null ? '0' : res.data.records,
          })
        } else {
          
        }
      }
    })
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
      wx.getStorage({
        key: 'trd_session',
        success: (res) => {
          this.setData({
            trd_session: res.data
          })
          this.getMoreInfo(this.data.trd_session);
          app.setUserInfo(res.data, app.globalData.userInfo)
        },
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onPullDownRefresh: () => {
    wx.getStorage({
      key: 'trd_session',
      success: (res) => {
        this.setData({
          trd_session: res.data
        }),
          this.getMoreInfo(this.data.trd_session)
      },
    })
  }
})