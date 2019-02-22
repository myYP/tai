import {  logout, getInfo } from 'src/api/login'
import { getToken, setToken, removeToken } from 'src/utils/auth'
import {login} from 'src/service/index'
import { setStore} from "src/utils/index";
import Cookies from 'js-cookie'
import store from "../index";


const user = {
  state: {
    userInfo: {},
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    side: [
      {
        "children": [
          {
            "power_component": "() => import('src/views/profile/index')",
            "power_id": "d325dce4-05de-11e9-80d5-5800e3119d4a",
            "power_meta": {
              "powermeta_icon": null,
              "powermeta_roles": null,
              "powermeta_title": "概况"
            },
            "power_path": "profile",
            "power_redirect": null,
            "power_status": 41
          }
        ],
        "power_component": "Layout",
        "power_id": "46cef7f4-05de-11e9-922b-5800e3119d4a",
        "power_meta": {
          "powermeta_icon": 'profile',
          "powermeta_roles": null,
          "powermeta_title": "概况"
        },
        "power_path": "/profile",
        "power_redirect": "",
        "power_status": 41
      },
      {
        children: [
          {
            power_component: "() => import('src/views/announcement/index')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "首页管理"
            },
            power_path: "",
            power_redirect: " ",
            power_status: 41
          }
        ],
        power_component: "Layout",
        power_id: "d0fe2618-05e1-11e9-a74f-5800e3119d4a",
        power_meta: {
          powermeta_icon: "index",
          powermeta_roles: "admin",
          powermeta_title: "首页管理"
        },
        power_path: "/index",
        power_redirect: "index",
        power_status: 41
      },
      {
        children: [
          {
            power_component: "() => import('src/views/people/index')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "所有用户"
            },
            power_path: "index",
            power_redirect: " ",
            power_status: 41
          },
          {
            power_component: "() => import('src/views/people/experience')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "体检用户"
            },
            power_path: "experience",
            power_redirect: " ",
            power_status: 41
          }
        ],
        power_component: "Layout",
        power_id: "d0fe2618-05e1-11e9-a74f-5800e3119d4a",
        power_meta: {
          powermeta_icon: "people",
          powermeta_roles: "admin",
          powermeta_title: "用户管理"
        },
        power_path: "/people",
        power_redirect: "",
        power_status: 41
      },
      {
        children: [
          {
            power_component: "() => import('src/views/announcement/index')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "问卷管理"
            },
            power_path: "",
            power_redirect: " ",
            power_status: 41
          }
        ],
        power_component: "Layout",
        power_id: "d0fe2618-05e1-11e9-a74f-5800e3119d4a",
        power_meta: {
          powermeta_icon: "questionnaire",
          powermeta_roles: "admin",
          powermeta_title: "问卷管理"
        },
        power_path: "/questionnaire",
        power_redirect: "",
        power_status: 41
      },
      {
        children: [
          {
            power_component: "() => import('src/views/product/examination')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "体检产品"
            },
            power_path: "examination",
            power_redirect: " ",
            power_status: 41
          },
          {
            power_component: "() => import('src/views/announcement/index')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "预约订单"
            },
            power_path: "appoint",
            power_redirect: " ",
            power_status: 41
          }
        ],
        power_component: "Layout",
        power_id: "d0fe2618-05e1-11e9-a74f-5800e3119d4a",
        power_meta: {
          powermeta_icon: "product",
          powermeta_roles: "admin",
          powermeta_title: "产品管理"
        },
        power_path: "/product",
        power_redirect: "",
        power_status: 41
      },
      {
        children: [
          {
            power_component: "() => import('src/views/activity/deduction')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "抵扣券"
            },
            power_path: "deduction",
            power_redirect: " ",
            power_status: 41
          },
          {
            power_component: "() => import('src/views/announcement/index')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "买赠"
            },
            power_path: "present",
            power_redirect: " ",
            power_status: 41
          }
        ],
        power_component: "Layout",
        power_id: "d0fe2618-05e1-11e9-a74f-5800e3119d4a",
        power_meta: {
          powermeta_icon: "activity",
          powermeta_roles: "admin",
          powermeta_title: "活动管理"
        },
        power_path: "/activity",
        power_redirect: "",
        power_status: 41
      },
      {
        children: [
          {
            power_component: "() => import('src/views/announcement/index')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "素材管理"
            },
            power_path: "",
            power_redirect: " ",
            power_status: 41
          }
        ],
        power_component: "Layout",
        power_id: "d0fe2618-05e1-11e9-a74f-5800e3119d4a",
        power_meta: {
          powermeta_icon: "material",
          powermeta_roles: "admin",
          powermeta_title: "素材管理"
        },
        power_path: "/material",
        power_redirect: "",
        power_status: 41
      },
      {
        children: [
          {
            power_component: "() => import('src/views/announcement/index')",
            power_id: "f2d3c130-05e1-11e9-8aa9-5800e3119d4a",
            power_meta: {
              powermeta_icon: null,
              powermeta_roles: null,
              powermeta_title: "配置管理"
            },
            power_path: "",
            power_redirect: " ",
            power_status: 41
          }
        ],
        power_component: "Layout",
        power_id: "d0fe2618-05e1-11e9-a74f-5800e3119d4a",
        power_meta: {
          powermeta_icon: "set",
          powermeta_roles: "admin",
          powermeta_title: "配置管理"
        },
        power_path: "/set",
        power_redirect: "",
        power_status: 41
      }
    ]
  },

  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SIDE: (state, side) =>{
      state.side = side
    },
    InitInfo:(state)=>{
      let saveUserInfo = Cookies.get('User-Info');

      if (saveUserInfo){
        state.userInfo = JSON.parse(saveUserInfo);
        // state.roles = [state.userInfo.adname]
      }
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      console.log('action login',userInfo);
      return new Promise((resolve, reject) => {
        login(userInfo.admin_idno, userInfo.admin_password).then(response => {
          if(response.data.status == 200){
            let resData = response.data,
                data = resData.data;
            // setToken(data.token);
            setStore('token',data.admin_token)
            commit('SET_TOKEN', data.admin_token)
            // commit('SET_SIDE', data.power_list)
            Cookies.set('User-Info',userInfo.admin_idno)
            // commit('SET_USER_INFO', data.user_message);
            commit('InitInfo');
            resolve()
          }else{
            reject();
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', []);
          localStorage.removeItem('token')
          removeToken();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
