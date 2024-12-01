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
  ListProblemURL = '/problem/list',
  ProblemURL = '/problem',
  UserCodeURL = '/problem/code',
}

// 获取题目列表
export const reqProblemList = (data: ProblemListRequest): Promise<ProblemListResponse> => {
  return request.get(API.ListProblemURL, {
    params: data,
  });
};

// 获取题目详情
export const reqProblem = (problemNumber: string): Promise<ProblemResponse> => {
  return request.get(API.ProblemURL + `/${problemNumber}`);
};

// 获取题目的模板代码
export const reqProblemTemplateCode = (language: string): Promise<ProblemTemplateCodeResponse> => {
  return request.get(API.UserCodeURL + `/template/${language}`);
};

// 保存用户代码
export const reqUserCode = (problemID: number, language: string): Promise<UserCodeResponse> => {
  return request.get(API.UserCodeURL + `/${problemID}/${language}`);
};

// 根据题目id获取用户代码
export const reqUserCodeByProblemID = (
  problemID: number,
): Promise<ReqUserCodeByProblemIDResponse> => {
  return request.get(API.UserCodeURL + `/${problemID}`);
};

// 保存用户代码
export const reqSaveUserCode = (req: SaveUserCodeRequest): Promise<SaveUserCodeResponse> => {
  return request.post(API.UserCodeURL + '/save', toFormData(req), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
