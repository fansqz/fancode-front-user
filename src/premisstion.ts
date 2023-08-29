// 路由鉴权
import router from '@/router';
import setting from './setting';
// 进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false });
import useUserStore from './store/modules/user';
import pinia from './store';
const userStore = useUserStore(pinia);

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  console.log(to);
  // 顶部标题
  document.title = setting.title + '-' + to.meta.title;
  // 进度条
  nprogress.start();
  // 判断用户是否登录
  const token = userStore.token;

  // 如果是login，有token则通行，没token则到登录页面
  if (to.path == '/login') {
    if (token) {
      next({ path: '/' });
    } else {
      next();
    }
    return;
  }

  // 注册直接放行
  if (to.path == '/register') {
    next();
  }

  // 没有token则路由到login
  if (!token) {
    next({ path: '/login', query: { redirect: to.path } });
    return;
  }

  // 不是登录和注册，且token存在，则获取用户信息
  const username = userStore.username;
  if (!username) {
    try {
      await userStore.userInfo();
      // 等到用户信息加载完毕，异步路由注册以后再放行
      next({ ...to, replace: true });
    } catch (error) {
      // 意味着token过期
      userStore.userLogout();
      next({ path: '/login', query: { redirect: to.path } });
    }
    return;
  }
  next();
});

// 全局后置守卫
router.afterEach(() => {
  nprogress.done();
});
