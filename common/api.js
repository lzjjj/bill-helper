
//const globalUrl = "http://111.230.92.41:8000/"
//const globalUrl = "http://liangca3-w10:8888/api/v1"
const globalUrl = "http://tengte-w10:8888/api/v1"
let requestUrl = {
  'login': globalUrl + '/login',//登录接口
  'defaultMonthBill': globalUrl + '/accounts/month/',//获取月账单
  'deleteRecord': globalUrl + '/accounts/',         //删除一条记录
  'getOneRecordDetail': globalUrl + '/accounts/'    //获取一条记录的详情
}
export default requestUrl
