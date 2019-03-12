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
    keyboardvalue: [{
        value: 1
      },
      {
        value: 2
      },
      {
        value: 3
      },
      {
        value: 4
      },
      {
        value: 5
      },
      {
        value: 6
      },
      {
        value: 7
      },
      {
        value: 8
      },
      {
        value: 9
      },
      {
        value: "."
      },
      {
        value: 0
      },
      {
        value: 'clear'
      },
    ],

    keyboardvalue1: [{
        value: '+'
      },
      {
        value: '-'
      },
      {
        value: '完成'
      }
    ],

    amount: 0,
    preAmount: [0, 0],
    num: 0,
    lastOp: ['', ''],
    inputStr: [],
    inputStrShow: '',
    date: '今天',
    inputValue: '',
    outlaytypeList: [{
        imgUrl: '/images/food.png',
        type: "餐饮"
      },
      {
        imgUrl: '/images/shop-unselect.png',
        type: "购物"
      },
    ],
    incometypeList: [{
        imgUrl: '/images/salary.png',
        type: "工资"
      },
      {
        imgUrl: '/images/red-unselect.png',
        type: "收红包"
      },
    ],
    payOutIndex: 0,
    inComeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'trd_session',
      success: (res) => {
        if (res.data != undefined) {
          this.setData({
            trd_session: res.data
          })
        }
      },
    })
    this.getIncometypeList()
    this.getOutLayList()

  },

  getIncometypeList() {
    wx.request({
      url: requestUrl.incomeKind,
      success: res => {
        if (res.statusCode == '200' && res.data.length > 0) {
          this.setData({
            incometypeList: res.data,
          })
        }
      }
    })
  },
  getOutLayList() {
    wx.request({
      url: requestUrl.outlayKind,
      success: res => {
        if (res.statusCode == '200' && res.data.length > 0) {

          this.setData({
            outlaytypeList: res.data,
          })
        }
      }
    })
  },
  changepayOutIndex(e) {
    var value = e.currentTarget.dataset.index;
    if ((this.data.billType == 0 && value == this.data.payOutIndex) ||
      (this.data.billType == 1 && value == this.data.inComeIndex)) {
      return;
    }
    var list = this.data.billType == 0 ? this.data.outlaytypeList : this.data.incometypeList
    list.map((item, index) => {
      console.log(index)
      if (value == index) {
        item.imgUrl = '/images/' + item.imgUrl.split("/")[2].split("-")[0] + '.png'
      } else {
        item.imgUrl = '/images/' + item.imgUrl.split("/")[2].split(".")[0] + '-unselect.png'
      }
    })
    this.data.billType == 0 && this.setData({
      outlaytypeList: list,
      payOutIndex: value
    })
    this.data.billType == 1 && this.setData({
      incometypeList: list,
      inComeIndex: value
    })
  },
  bindKeyInput(e) {
    console.log(e.detail.value)
    this.setData({
      inputValue: e.detail.value
    })
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  typeChange(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      billType: type
    })
  },

  handleClickSoftKeyBoard(e) {
    var value = e.currentTarget.dataset.value;
    var regNum = new RegExp('[0-9]', 'g');
    var rsNum = regNum.exec(value);
    var inputStr = this.data.inputStr
    var amount = this.data.amount
    var preAmount = this.data.preAmount
    var num = this.data.num
    var lastOp = this.data.lastOp
    console.log(amount + ':' + preAmount + ':' + num)
    if (rsNum != null) {
      inputStr.push(value)
      if (value != '+' && value != '-') {
        num = parseInt(num * 10) + parseInt(rsNum);
        this.setData({
          inputStr: inputStr,
          // amount: inputStr[inputStr.length - 2] == '+' ? parseInt(amount) + parseInt(rsNum) :
          //   (inputStr[inputStr.length - 2] == '-' ?
          //     parseInt(amount) - parseInt(rsNum) : inputStr.join('')),
          num: num,
          amount: (lastOp[lastOp.length - 1] == '-') ? parseInt(preAmount[preAmount.length - 1]) - num :
            (lastOp[lastOp.length - 1] == '+') ? parseInt(preAmount[preAmount.length - 1]) + num : num,
          inputStrShow: inputStr.join('')
        })
      }
    }
    if (value == 'clear' && this.data.inputStr.length != 0) {
      var popvalue = inputStr.pop();
      if (popvalue == '+' || popvalue == '-') {
        preAmount.pop()
        lastOp.pop()
        this.setData({
          lastOp: lastOp,
          preAmount: preAmount,
          inputStr: inputStr,
          inputStrShow: inputStr.join(''),
        })
      } else {
        num = parseInt(num / 10);
        this.setData({
          inputStr: inputStr,
          // amount: inputStr[inputStr.length - 1] == '+' ? parseInt(amount) - parseInt(popvalue) :
          //   (inputStr[inputStr.length - 1] == '-' ?
          //     parseInt(amount) + parseInt(popvalue) :
          //     (inputStr.length == 0 ? 0 :
          //       (!inputStr.includes("+") && !inputStr.includes("-") ?
          //         inputStr.join('') : amount
          //       ))),
          num: num,
          amount: lastOp[lastOp.length - 1] == '+' ? preAmount[preAmount.length - 1] + num : lastOp[lastOp.length - 1] == '-' ? preAmount[preAmount.length - 1] - num : num,
          inputStrShow: inputStr.join('')
        })
      }
    }

    if (value == '+' || value == '-') {
      if (inputStr.length == 0 || inputStr[inputStr.length - 1] == '+' || inputStr[inputStr.length - 1] == '-') {
        return;
      }
      inputStr.push(value)
      lastOp.push(value)
      preAmount.push(amount)
      this.setData({
        num: 0,
        preAmount: preAmount,
        lastOp: lastOp,
        inputStr: inputStr,
        inputStrShow: inputStr.join('')
      })
    }

    if (value == '完成') {
      if (this.data.amount < 0 || this.data.amount == 0) {
        wx.showToast({
          title: '记账总数不正确！',
          icon: 'none'
        })
        return
      }
      wx.request({
        url: requestUrl.account + '?trd_session=' + this.data.trd_session,
        method: 'Post',
        data: {
          type: {
            type: this.data.billType == 1 ? this.data.incometypeList[this.data.inComeIndex].type : this.data.outlaytypeList[this.data.payOutIndex].type,
          },
          amount: this.data.amount,
          accountKind: this.data.billType,
          remark: this.data.inputValue,
        },
        success: () => {
          wx.showToast({
            title: '记账成功',
            icon: 'none',
            duration: 3000,
            success: () => {
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onUnload: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }
})