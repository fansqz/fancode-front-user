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

// 允许不使用登陆态访问的路径
const allowPaths = ['/register', '/login', '/coding', '/home'];

// 全局前置守卫
router.beforeEach(async (to: any, _from: any, next: any) => {
  setTitle(to);
  // 进度条
  nprogress.start();

  // 获取用户名称，如果获取不到用户名称则进行获取
  const username = userStore.username;
  if (username) {
    next();
    return;
  }
  // 校验token是否正确
  const token = userStore.token;
  if (token) {
    try {
      await userStore.userInfo();
      next({ ...to, replace: true });
      return;
    } catch (error) {
      userStore.userLogout();
    }
  }

  if (checkIsAllow(to.path)) {
    next();
    return;
  }

  // 如果是login
  if (to.path == '/login') {
    if (token) {
      next({ path: '/' });
    } else {
      next();
    }
    return;
  }

  // 其余路径没有登录态，路由到login页
  if (!token) {
    next({ path: '/login', query: { redirect: to.path } });
    return;
  }
});

// 全局后置守卫
router.afterEach(() => {
  nprogress.done();
});

const setTitle = (to) => {
  // 顶部标题
  if (to.meta.title) {
    document.title = setting.title + '-' + to.meta.title;
  } else {
    document.title = setting.title;
  }
};

const checkIsAllow = (path: string): boolean => {
  for (let item of allowPaths) {
    if (item == path) {
      return true;
    }
  }
  return false;
};
