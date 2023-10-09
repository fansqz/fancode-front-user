import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  EXECUTE_URL = '/judge/execute',
  SUBMITE_URL = '/judge/submit',
  CODE_URL = '/judge/code',
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

export const reqSaveCode = (obj: any): Promise<any> => {
  return request.post(API.CODE_URL, toFormData(obj), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const reqUserCode = (problemID: string): Promise<any> => {
  return request.get(API.CODE_URL + `/${problemID}`);
};
