import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  EXECUTE_URL = '/judge/execute',
  SUBMITE_URL = '/judge/submit',
  CODE_URL = '/judge/code',
}

// reqSubmit 提交用户程序
export const reqSubmit = (req: SubmitRequest): Promise<SubmitResponse> => {
  return request.post(API.SUBMITE_URL, toFormData(req), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// reqExecute 执行用户程序
export const reqExecute = (req: ExecuteRequest): Promise<ExecuteResponse> => {
  return request.post(API.EXECUTE_URL, toFormData(req), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
