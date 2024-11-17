import request from '@/utils/request';

enum API {
  ActiveYearURL = '/submission/active/year',
  ActiveMapURL = '/submission/active/map',
  SubmissionURL = '/submission/list',
}

// 获取用户提交列表
export const reqSubmissionList = (data: SubmissionListRequest): Promise<SubmissionListResponse> => {
  return request.get(API.SubmissionURL, {
    params: data,
  });
};

// 获取用户有提交的年份
export const reqActivityYear = (): Promise<ActivityYearResponse> => {
  return request.get(API.ActiveYearURL);
};

// 获取用户活动图
export const reqActivityMap = (year: string): Promise<any> => {
  return request.get(API.ActiveMapURL + `/${year}`);
};
