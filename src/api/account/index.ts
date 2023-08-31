import request from '@/utils/request';
import { toFormData } from 'axios';

enum API {
  ACCOUNT_INFO_URL = '/account/info',
  ACCOUNT_URL = '/account',
  PASSWORD_RESET_URL = '/account/password/reseet',
  PASSWORD_URL = '/account/password',
  ACTIVE_YEAR_URL = '/account/active/year',
  ACTIVE_MAP_URL = '/account/active/map',
  AVATAR_URL = '/avatar',
}

// 获取账号信息
export const reqAccountInfo = (): Promise<any> => {
  return request.get(API.ACCOUNT_INFO_URL);
};

// 更新账号信息
export const reqUpdateAccount = (data: any): Promise<any> => {
  return request.put(API.ACCOUNT_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 重置密码
export const reqResetPassword = (data: any): Promise<any> => {
  return request.post(API.PASSWORD_RESET_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 修改密码
export const reqChangePassword = (data: any): Promise<any> => {
  return request.post(API.PASSWORD_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 获取用户有提交的年份
export const reqActivityYear = (): Promise<any> => {
  return request.get(API.ACTIVE_YEAR_URL);
};

export const reqActivityMap = (year: string): Promise<any> => {
  return request.get(API.ACTIVE_MAP_URL + `/${year}`);
};
