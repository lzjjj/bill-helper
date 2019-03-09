
//const globalUrl = "http://111.230.92.41:8000/"
const globalUrl = "http://localhost:8888/api/v1"
let requestUrl = {
  'login': globalUrl + '/login',//登录接口
  'account': globalUrl + '/acounts', // account 接口
  'userDetail': globalUrl + '/users'
}
export default requestUrl
