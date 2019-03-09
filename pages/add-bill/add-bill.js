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
    outlaytypeList: [],
    incometypeList: [],
    CurrentIndex:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: requestUrl.outlayKind,
      success: res => {
        console.log(res)
        if (res.statusCode == '200') {
          console.log('调api')
          console.log(res.data)
          this.setData({
            outlaytypeList: res.data,
          })
        }
      }
    })
    wx.request({
      url: requestUrl.incomeKind,
      success: res => {
        console.log(res)
        if (res.statusCode == '200') {
          console.log('调api')
          console.log(res.data)
          this.setData({
            incometypeList: res.data,
          })
        }
      }
    })
  },
  changeCurrentIndex(e){
    var value = e.currentTarget.dataset.index;
    var expendList = this.data.expendList
    expendList.map(function(item,index){
      console.log(index)
      if (value == index) {
        item.imgUrl = '/images/' + item.imgUrl.split("/")[1].split("-")[0] + '.png'
      } else {
        item.imgUrl = '/images/' + item.imgUrl.split("/")[1] + '-unselect.png'
      }
    })
    this.setData({
      expendList: expendList,
      CurrentIndex: index
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
              (
                !inputStr.includes("+") && !inputStr.includes("-") ? 
                inputStr.join('') : amount
              ))),
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