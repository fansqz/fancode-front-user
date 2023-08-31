import request from '@/utils/request';

enum API {
  ACTIVE_YEAR_URL = '/submission/active/year',
  ACTIVE_MAP_URL = '/submission/active/map',
  SUBMISSION_LIST = '/submission/list',
}

export const reqSubmissionList = (page: number, limit: number): Promise<any> => {
  return request.get(API.SUBMISSION_LIST + `/${page}/${limit}`);
};

// 获取用户有提交的年份
export const reqActivityYear = (): Promise<any> => {
  return request.get(API.ACTIVE_YEAR_URL);
};

export const reqActivityMap = (year: string): Promise<any> => {
  return request.get(API.ACTIVE_MAP_URL + `/${year}`);
};
