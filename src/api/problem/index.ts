import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  LIST_PROBLEM_URL = '/problem/list',
  PROBLEM_URL = '/problem',
  USER_CODE_URL = '/problem/code',
}

export const reqProblemList = (data: any): Promise<any> => {
  return request.get(API.LIST_PROBLEM_URL, {
    params: data,
  });
};

export const reqProblem = (problemNumber: string): Promise<any> => {
  return request.get(API.PROBLEM_URL + `/${problemNumber}`);
};

export const reqProblemTemplateCode = (problemID: string, language: string): Promise<any> => {
  return request.get(API.USER_CODE_URL + `/template/${problemID}/${language}`);
};

export const reqUserCode = (problemID: string, language: string): Promise<any> => {
  return request.get(API.USER_CODE_URL + `/${problemID}/${language}`);
};

export const reqUserCodeByProblemID = (problemID: string): Promise<any> => {
  return request.get(API.USER_CODE_URL + `/${problemID}`);
};


export const reqSaveUserCode = (problemID: string, language: string, code: string): Promise<any> => {
  return request.post(API.USER_CODE_URL + "/save", toFormData({
    code: code,
    language: language,
    problemID: problemID,
  }), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
