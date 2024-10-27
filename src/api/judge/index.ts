import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  ExecuteURL = '/judge/execute',
  SubmiteURL = '/judge/submit',
  CodeURL = '/judge/code',
}

// reqSubmit 提交用户程序
export const reqSubmit = (req: SubmitRequest): Promise<SubmitResponse> => {
  return request.post(API.SubmiteURL, toFormData(req), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// reqExecute 执行用户程序
export const reqExecute = (req: ExecuteRequest): Promise<ExecuteResponse> => {
  return request.post(API.ExecuteURL, toFormData(req), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
