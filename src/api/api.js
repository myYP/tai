// const title = 'http://10.0.0.197:7443/sharp/manager/';
// const title = 'http://120.79.182.43:7443/sharp/manager/';
// const title = 'http://47.104.228.112:8111/api/v1/'
const title = 'https://taiming.lkfcni.cn/api/v1/';

const api = {
  login: title + 'user/admin_login',                                      //用户登录
  update_password: title +'user/update_password',//更新密码
  get_admin_list: title +'user/get_admin_list',//获取管理员列表
  update_admin: title +'user/update_admin',//更新管理员
  add_admin: title +'user/add_admin',//新增管理员
  delete_admin: title + 'user/delete_admin',//删除管理员
  get_all_user: title +'user/get_all_user',//获取用户列表
  delete_user: title +'user/delete_user',//删除用户
  get_medical_user: title +'user/get_medical_user',///获取所有体检者
  update_medical_user: title +'user/update_medical_user',//修改体检者
  delete_medical_user: title + 'user/delete_medical_user',//删除体检者
  get_medical_list: title + 'medical/get_medical_list',//获取体检产品
  offline_medical: title + 'medical/offline_medical',//下架商品
  online_medical: title + 'medical/online_medical',//上架商品
  delete_medical: title + 'medical/delete_medical',//删除商品
  upload_files: title + 'config/upload_files',//上传文件
  get_location: title + 'medical/get_location',//获取医院
  update_location: title + 'medical/update_location',//更新地址
  new_location: title +'medical/new_location',//新增地址
  delete_location: title +'medical/delete_location',//删除地址
  new_medical: title +'medical/new_medical',///新增商品
  update_medical: title +'medical/update_medical',//更新商品
  get_medical_message: title + 'medical/get_medical_message',//获取商品详情
  get_answer_list: title +'question/get_answer_list',//获取回答问卷列表
  get_answer_message: title +'question/get_answer_message',//获取回答问卷详情
  get_question_list: title +'question/get_question_list',//获取问卷列表
  get_question_message: title +'question/get_question_message',//获取问卷详情
  new_question: title + 'question/new_question',//创建问题
  update_questiion: title + 'question/update_questiion',//更新问题
  delete_question: title +'question/delete_question',//删除问题
  get_card_list: title +'card/get_card_list',//获取活动列表
  get_card_message: title +'card/get_card_message',//获取活动详情
  new_card: title +'card/new_card',//创建活动
  offline_card: title + 'card/offline_card',//中止活动
  delete_card: title + 'card/delete_card',//删除活动
  make_cardno: title + 'card/make_cardno',//生成优惠码
  get_send_list: title +'card/get_send_list',//获取买赠活动列表
  get_send_message: title + 'card/get_send_message',//获取买赠活动详情
  new_send: title +'card/new_send',//新增买赠
  offline_send: title +'card/offline_send',//中止买赠
  delete_send: title +'card/delete_send',//删除买赠
  get_science_list: title +'science/get_science_list',//获取知识列表
  get_science_message: title +'science/get_science_message',//获取知识详情
  new_science: title +'science/new_science',//新增知识
  update_science: title + 'science/update_science',//更新知识
  delete_science: title + 'science/delete_science',//删除知识
  get_custom_list: title +'config/get_custom_list',///获取客服列表
  new_custom: title +'config/new_custom',///新增客服
  update_custom: title +'config/update_custom',///新增客服
  delete_custom: title +'config/delete_custom',//删除客服
  get_all_order: title +'order/get_all_order',//获取订单列表
  get_order_message: title +'order/get_order_message',//获取订单详情
  export_xls: title + 'order/export_xls',//下载
  get_order_count: title +'order/get_order_count',//获取首页订单总数
  update_order: title +'order/update_order',//更新订单
  get_loadpic_list: title +'config/get_loadpic_list',//获取轮播图列表
  add_loadpic: title +'config/add_loadpic',//新增轮播图
  update_loadpic: title +'config/update_loadpic',//修改轮播图
  delete_loadpic: title +'config/delete_loadpic',//删除轮播图
}

export default api
