import {
    http
} from '../utils/http';

const api2 = 'https://mini3.pinecc.cn/';

//登录 注册

const login = (params) => http(params, api2+'api/Login/login.html');//登录

//评价
module.exports = {
  login

}
