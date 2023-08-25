/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/auth';
import type { loginForm } from '@/api/auth/type';
import type { UserState } from './types/type';
// 引入路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routers';
import router from '@/router';
//@ts-ignore
import cloneDeep from 'lodash/cloneDeep';

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: localStorage.getItem('TOKEN'),
      menuRoutes: [],
      email: '',
      phone: '',
      sex: '',
      username: '',
      loginName: '',
    };
  },
  actions: {
    async userLogin(data: loginForm) {
      const result = await reqLogin(data);
      if (result.code == 200) {
        this.token = result.data;
        // 本地存一份
        localStorage.setItem('TOKEN', result.data);
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userInfo() {
      const result = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.username;
        this.email = result.data.email;
        this.sex = result.data.email;
        this.phone = result.data.phone;
        this.loginName = result.data.loginName;
        const userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.menus);
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute];
        // 注册异步路由
        userAsyncRoute.forEach((route: any) => {
          router.addRoute(route);
        });
      }
    },
    userLogout() {
      this.token = '';
      this.username = '';
      this.email = '';
      this.sex = '';
      this.phone = '';
      this.loginName = '';
      localStorage.removeItem('TOKEN');
    },
  },
  getters: {},
});

function filterAsyncRoute(asyncRoute: any[], routeList: string[]) {
  return asyncRoute.filter((item: any) => {
    if (routeList.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routeList);
      }
      return true;
    }
  });
}

export default useUserStore;
