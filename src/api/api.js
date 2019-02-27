import {
    wxRequest
} from '../utils/http';

const api2 = 'https://taiming.lkfcni.cn/api/v1/' ;

//登录 注册

const login = api2+'api/Login/login.html';//登录

const get_loadpic_list =api2+'config/get_loadpic_list';//获取首页轮播图
const get_medical_list =api2+'medical/get_medical_list';//获取体检产品列表
const get_medical_message = api2+'medical/get_medical_message';//获取体检产品详情

const get_science_list = api2+'science/get_science_list';//获取科学知识列表
const get_science_message = api2+'science/get_science_message';//获取科学知识详情

const get_medical_user = api2+'user/get_medical_user';//获取全部体检者
const get_my_medical_user = api2+'user/get_my_medical_user';//获取我的体检者
const add_my_medical_user = api2+'user/add_my_medical_user';//新增我的体检者
const get_user_info = api2+'user/get_user_info';//个人信息
const get_my_package = api2+'card/get_my_package';//获取卡包
const add_to_my_package = api2 +'card/add_to_my_package';//兑换\
const make_order = api2 + 'order/make_order';//创建订单
const make_cart = api2+ 'order/make_cart';//添加购物车
const get_cart = api2 + 'order/get_cart';//获取购物车
const delete_cart = api2 + 'order/delete_cart';//删除购物车
const get_location = api2 +'medical/get_location';//获取地址
const get_order_count_user = api2 +'order/get_order_count_user';//订单数量
const get_my_order = api2 +'order/get_my_order';//获取我的订单
const get_order_message = api2 +'order/get_order_message';//获取订单详情
const update_order = api2 +'order/update_order';//更新订单
const get_question_list = api2 +'question/get_question_list';//获取问卷列表
const new_answer = api2 +'question/new_answer';//获取问卷列表
const get_card_message = api2 + 'card/get_card_message';//获取优惠券详情

const user_login = api2 +'user/user_login';//登录
const get_wechat_code = api2+'user/get_wechat_code';//获取openid
const get_inforcode = api2 +'config/get_inforcode';//获取短信验证码
const get_custom_list = api2 +'config/get_custom_list';//获取客服
const get_pay_config = api2 + 'order/get_pay_config';//支付
//评价
module.exports = {
  login,get_medical_list,get_medical_message,get_science_list,get_science_message,get_medical_user,
    get_my_medical_user,add_my_medical_user,get_loadpic_list,get_user_info,get_my_package,add_to_my_package,
    get_location,make_order,make_cart,get_cart,delete_cart,get_order_count_user,get_my_order,get_order_message,
    update_order,get_question_list,new_answer,get_card_message,user_login,get_wechat_code,get_inforcode,get_custom_list,
    get_pay_config

}
