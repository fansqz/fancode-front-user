import request from '@/utils/request';
import { toFormData } from 'axios';

enum API {
  ACCOUNT_INFO_URL = '/account/info',
  ACCOUNT_URL = '/account',
  PASSWORD_RESET_URL = '/account/password/reseet',
  PASSWORD_URL = '/account/password',
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

// 上传头像
export const reqUploadAvatar = (data: any): Promise<any> => {
  return request.post(API.AVATAR_URL, toFormData(data), {
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
