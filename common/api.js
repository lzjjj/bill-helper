
//const globalUrl = "http://111.230.92.41:8000/"
const globalUrl = "http://localhost:8888/api/v1"
let requestUrl = {
  'login': globalUrl + '/login',//登录接口
  'account': globalUrl + '/acounts', // account 接口
  'userDetail': globalUrl + '/users',
  'incomeKind': globalUrl +'/type/income',//收入类别
  'outlayKind': globalUrl + '/type/outlay',//支出类别
}
export default requestUrl
