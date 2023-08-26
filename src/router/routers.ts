// 常量路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'root',
    redirect: '/problem',
    children: [
      {
        path: '/problem',
        name: 'problem',
        component: () => import('@/views/problem/index.vue'),
      },
      {
        path: '/contest',
        name: 'contest',
        component: () => import('@/views/contest/index.vue'),
      },
    ],
  },
];

// 任意路由
export const anyRoute = [
  {
    path: '/:pathMath(.*)*',
    redirect: '/404',
    name: 'Any',
  },
];
