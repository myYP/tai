import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/profile',
    component: Layout,
    redirect: '',
    children: [
      {
        path: 'profile',
        name: 'ProfileIndex',
        component: () => import('src/views/profile/index'),
        meta: { title: '首页', icon: 'profile'}
      },
      {
        path: 'admin',
        name: 'adminIndex',
        component: () => import('src/views/profile/admin'),
        meta: { title: '管理员管理', icon: ''}
      }
    ]
  },
  {
    path: '/index',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('src/views/index/index'),
        meta: { title: '首页管理', icon: 'index'}
      }
    ]
  },
  {
    path: '/people',
    component: Layout,
    redirect: '',
    meta: { title: '用户管理', icon: 'people'},
    children: [
      {
        path: 'index',
        name: 'peopleIndex',
        component: () => import('src/views/people/index'),
        meta: { title: '所有用户', icon: ''}
      },
      {
        path: 'experience',
        name: 'experienceIndex',
        component: () => import('src/views/people/experience'),
        meta: { title: '体检用户', icon: ''}
      }
    ]
  },
  {
    path: '/questionnaire',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        name: 'questionnaireIndex',
        component: () => import('src/views/questionnaire/index'),
        meta: { title: '问卷管理', icon: 'questionnaire'}
      },
      {
        path: 'addQuestionnaire',
        name: 'addQuestionnaire',
        component: () => import('src/views/questionnaire/addQuestionnaire'),
        meta: { title: '添加问卷', icon: ''}
      },
      {
        path: 'editeQuestionnaire',
        name: 'editeQuestionnaire',
        component: () => import('src/views/questionnaire/editeQuestionnaire'),
        meta: { title: '编辑问题', icon: ''}
      },
      {
        path: 'questionnaireDetail',
        name: 'questionnaireDetail',
        component: () => import('src/views/questionnaire/questionnaireDetail'),
        meta: { title: '问卷详情', icon: ''}
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '',
    meta: { title: '产品管理', icon: 'product'},
    children: [
      {
        path: 'examination',
        name: 'examination',
        component: () => import('src/views/product/examination'),
        meta: { title: '体检商品', icon: ''}
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('src/views/product/addProduct'),
        meta: { title: '添加产品', icon: ''}
      },
      {
        path: 'appoint',
        name: 'appoint',
        component: () => import('src/views/product/appoint'),
        meta: { title: '预约订单', icon: ''}
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '',
    meta: { title: '活动管理', icon: 'activity'},
    children: [
      {
        path: 'deduction',
        name: 'deduction',
        component: () => import('src/views/activity/deduction'),
        meta: { title: '抵扣券', icon: ''}
      },
      {
        path: 'addDeduction',
        name: 'addDeduction',
        component: () => import('src/views/activity/addDeduction'),
        meta: { title: '抵扣券', icon: ''}
      },
      {
        path: 'present',
        name: 'present',
        component: () => import('src/views/activity/present'),
        meta: { title: '买赠', icon: ''}
      }
    ]
  },
  {
    path: '/material',
    component: Layout,
    redirect: '',
    meta: { title: '素材管理', icon: 'material'},
    children: [
      {
        path: '',
        name: 'material',
        component: () => import('src/views/material/index'),
        meta: { title: '素材管理', icon: ''}
      },
      {
        path: 'addMaterial',
        name: 'addMaterial',
        component: () => import('src/views/material/addMaterial'),
        meta: { title: '素材管理', icon: ''}
      }
    ]
  },
  {
    path: '/set',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        name: 'setting',
        component: () => import('src/views/setting/index'),
        meta: { title: '配置管理', icon: 'set'}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
  ]


export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [


]
