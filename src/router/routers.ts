import { RouteRecordRaw } from 'vue-router'

// 常量路由
export const constantRoute: Readonly<RouteRecordRaw[]> = [
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/',
    component: () => import('@/layout/layouts/main-layout.vue'),
    name: 'root',
    redirect: '/home',
    children: [
      {
        // bank
        path: '/bank',
        name: 'bank',
        component: () => import('@/views/bank/index.vue'),
      },
      {
        // coding
        path: '/coding',
        name: 'coding',
        component: () => import('@/views/coding/index.vue'),
      },
      {
        // 学习
        path: '/learn/:bankID',
        name: 'learn',
        component: () => import('@/views/learn/index.vue'),
      },
      // 登录
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
      },
      // 注册
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/index.vue'),
      },
      // 个人中心
      {
        path: '/myprofile',
        name: 'myprofile',
        component: () => import('@/views/my-profile/index.vue'),
      },
      // 账号设置
      {
        path: '/account/setting',
        name: 'accountSetting',
        component: () => import('@/views/account-setting/index.vue'),
      },
    ],
  },
  {
    // home page with its own layout
    path: '/home',
    name: 'home',
    component: () => import('@/layout/layouts/home-layout.vue'),
    children: [
      {
        path: '',
        name: 'home-content',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    // 题目
    path: '/problem/:problemNumber',
    name: 'problem',
    component: () => import('@/views/problem/index.vue'),
  },
]

// 任意路由
export const anyRoute = [
  {
    path: '/:pathMath(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
