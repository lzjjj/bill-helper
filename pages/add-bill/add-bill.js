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

    amount: 0.00,
    inputStr: [],
    inputStrShow: '',
    date: '今天',
    inputValue: '',
    typeList: [{
      imgUrl: '/images/food.png',
      name: "餐饮"
    }, {
        imgUrl: '/images/shop.png',
      name: "购物"
    }, {
        imgUrl: '/images/traffic.png',
      name: "交通"
      }, {
        imgUrl: '/images/medical.png',
        name: "医疗"
      }, {
        imgUrl: '/images/education.png',
        name: "教育"
      }, {
        imgUrl: '/images/amusement.png',
        name: "娱乐"
      }, {
        imgUrl: '/images/live.png',
        name: "居住"
      }, {
        imgUrl: '/images/orther.png',
        name: "其他"
      },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    if (rsNum != null) {
      inputStr.push(value)

      this.setData({
        inputStr: inputStr,
        amount: inputStr[inputStr.length - 2] == '+' ? parseInt(amount) + parseInt(rsNum) :
          (inputStr[inputStr.length - 2] == '-' ?
            parseInt(amount) - parseInt(rsNum) : inputStr.join('')),
        inputStrShow: inputStr.join('')
      })

    }
    if (value == 'clear' && this.data.inputStr.length != 0) {
      var popvalue = inputStr.pop();

      this.setData({
        inputStr: inputStr,
        amount: inputStr[inputStr.length - 1] == '+' ? parseInt(amount) - parseInt(popvalue) :
          (inputStr[inputStr.length - 1] == '-' ?
            parseInt(amount) + parseInt(popvalue) :
            (inputStr.length == 0 ? 0 :
              amount)),
        inputStrShow: inputStr.join('')
      })
    }

    if (value == '+' || value == '-') {
      if (inputStr.length == 0 || inputStr[inputStr.length - 1] == '+' || inputStr[inputStr.length - 1] == '-') {
        return;
      }
      inputStr.push(value);
      this.setData({
        inputStr: inputStr,
        inputStrShow: inputStr.join('')
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})