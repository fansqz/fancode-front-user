import request from '@/utils/request';

enum API {
  ACTIVE_YEAR_URL = '/submission/active/year',
  ACTIVE_MAP_URL = '/submission/active/map',
  SUBMISSION_LIST = '/submission/list',
}

// 获取用户提交列表
export const reqSubmissionList = (data: SubmissionListRequest): Promise<SubmissionListResponse> => {
  return request.get(API.SUBMISSION_LIST, {
    params: data,
  });
};

// 获取用户有提交的年份
export const reqActivityYear = (): Promise<ActivityYearResponse> => {
  return request.get(API.ACTIVE_YEAR_URL);
};

// 获取用户活动图
export const reqActivityMap = (year: string): Promise<any> => {
  return request.get(API.ACTIVE_MAP_URL + `/${year}`);
};
