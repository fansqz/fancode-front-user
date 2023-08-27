import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  EXECUTE_URL = '/judge/execute',
  SUBMITE_URL = '/judge/submit',
}

export const reqSubmit = (problemID: number, userCode: string): Promise<any> => {
  return request.post(
    API.SUBMITE_URL,
    toFormData({
      problemID: problemID,
      code: userCode,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const reqExecute = (problemID: number, userCode: string, input: string): Promise<any> => {
  return request.post(
    API.EXECUTE_URL,
    toFormData({
      problemID: problemID,
      code: userCode,
      input: input,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
