/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineStore } from 'pinia';

const useUserStore = defineStore('User', {
  state: (): any => {
    return {
      token: localStorage.getItem('TOKEN'),
      email: '',
      phone: '',
      sex: '',
      username: '',
      loginName: '',
    };
  },
  actions: {
  },
});

export default useUserStore;
