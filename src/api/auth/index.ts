import request from '@/utils/request';
import { toFormData } from 'axios';

enum API {
  LOGIN_URL = '/auth/login',
  USERINFO_URL = '/auth/get/info',
}

// 暴露请求函数
export const reqLogin = (data: any): Promise<any> => {
  return request.post(API.LOGIN_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 获取用户信息
export const reqUserInfo = (): Promise<any> => {
  return request.get(API.USERINFO_URL);
};
