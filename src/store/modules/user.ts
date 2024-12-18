/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineStore } from 'pinia';
import { reqLogin } from '@/api/auth';
import { reqAccountInfo } from '@/api/account';
import { reqGetURL } from '@/api/common';

const useUserStore = defineStore('User', {
  state: (): any => {
    return {
      token: localStorage.getItem('TOKEN'),
      avatar: '',
      email: '',
      phone: '',
      username: '',
      loginName: '',
    };
  },
  actions: {
    async userLogin(data: any) {
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
      let result = await reqAccountInfo();
      if (result.code == 200) {
        this.avatar = result.data.avatar;
        // 读取头像
        if (this.avatar != '') {
          let result2 = await reqGetURL(this.avatar);
          if (result2.code == 200) {
            this.avatar = result2.data;
          }
        }
        this.username = result.data.username;
        this.email = result.data.email;
        this.phone = result.data.phone;
        this.loginName = result.data.loginName;
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    userLogout() {
      this.token = '';
      this.username = '';
      this.email = '';
      this.phone = '';
      this.loginName = '';
      this.avatar = '';
      localStorage.removeItem('TOKEN');
    },
  },
});

export default useUserStore;
