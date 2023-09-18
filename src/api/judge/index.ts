import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  EXECUTE_URL = '/judge/execute',
  SUBMITE_URL = '/judge/submit',
}

export const reqSubmit = (obj: any): Promise<any> => {
  return request.post(API.SUBMITE_URL, toFormData(obj), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const reqExecute = (obj: any): Promise<any> => {
  return request.post(API.EXECUTE_URL, toFormData(obj), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
