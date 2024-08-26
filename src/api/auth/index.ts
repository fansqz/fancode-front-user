import request from '@/utils/request';
import { toFormData } from 'axios';

enum API {
  LOGIN_URL = '/auth/login',
  USERINFO_URL = '/auth/get/info',
  CODE_SEND_URL = '/auth/code/send',
  REGISTER_URL = '/auth/register',
}

// 登录
export const reqLogin = (data: LoginRequest): Promise<LoginResponse> => {
  return request.post(API.LOGIN_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 发送验证码
export const reqSendCode = (data: SendCodeRequest): Promise<SendCodeResponse> => {
  return request.post(API.CODE_SEND_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 注册
export const reqRegister = (data: RegisterRequest): Promise<RegisterReponse> => {
  return request.post(API.REGISTER_URL, toFormData(data), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
