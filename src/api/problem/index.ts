import request from '@/utils/request';
import { toFormData } from '@/utils/format';
import {
  ProblemListRequest,
  ProblemListResponse,
  ProblemResponse,
  ProblemTemplateCodeResponse,
  ReqUserCodeByProblemIDResponse,
  SaveUserCodeRequest,
  UserCodeResponse,
  SaveUserCodeResponse,
} from './type';

enum API {
  LIST_PROBLEM_URL = '/problem/list',
  PROBLEM_URL = '/problem',
  USER_CODE_URL = '/problem/code',
}

// 获取题目列表
export const reqProblemList = (data: ProblemListRequest): Promise<ProblemListResponse> => {
  return request.get(API.LIST_PROBLEM_URL, {
    params: data,
  });
};

// 获取题目详情
export const reqProblem = (problemNumber: string): Promise<ProblemResponse> => {
  return request.get(API.PROBLEM_URL + `/${problemNumber}`);
};

// 获取题目的模板代码
export const reqProblemTemplateCode = (
  problemID: number,
  language: string,
): Promise<ProblemTemplateCodeResponse> => {
  return request.get(API.USER_CODE_URL + `/template/${problemID}/${language}`);
};

// 保存用户代码
export const reqUserCode = (problemID: number, language: string): Promise<UserCodeResponse> => {
  return request.get(API.USER_CODE_URL + `/${problemID}/${language}`);
};

// 根据题目id获取用户代码
export const reqUserCodeByProblemID = (
  problemID: number,
): Promise<ReqUserCodeByProblemIDResponse> => {
  return request.get(API.USER_CODE_URL + `/${problemID}`);
};

// 保存用户代码
export const reqSaveUserCode = (req: SaveUserCodeRequest): Promise<SaveUserCodeResponse> => {
  return request.post(API.USER_CODE_URL + '/save', toFormData(req), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
