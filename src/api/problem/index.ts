import request from '@/utils/request';

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

export const reqProblemTemplateCode = (
  problemNumber: string,
  language: string,
  codeType: string,
): Promise<any> => {
  return request.get(API.USER_CODE_URL + `/${problemNumber}/${language}/${codeType}`);
};
