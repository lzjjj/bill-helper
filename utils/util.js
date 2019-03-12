const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

 // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month].map(formatNumber).join('-') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const convertJSon = dateJSon => {
  return dateJSon.substring(0, 10) + ' ' + dateJSon.substring(12, 19); 
}

module.exports = {
  formatTime: formatTime,
  convertJSon: convertJSon
}
