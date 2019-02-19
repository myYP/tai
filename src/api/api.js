import {
    wxRequest
} from '../utils/http';

const api2 = 'https://taiming.lkfcni.cn/api/v1/' ;

//登录 注册

const login = api2+'api/Login/login.html';//登录
const get_medical_list =api2+'medical/get_medical_list';//获取体检产品列表
const get_medical_message = api2+'medical/get_medical_message';//获取体检产品详情

const get_science_list = api2+'science/get_science_list';//获取科学知识列表
const get_science_message = api2+'science/get_science_message';//获取科学知识详情
//评价
module.exports = {
  login,get_medical_list,get_medical_message,get_science_list,get_science_message

}
