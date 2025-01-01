export type ProblemListRequest = {
  bankID?: number;
  page?: number;
  pageSize?: number;
};

export type UserProblemForList = {
  id: number;
  name: string;
  number: string;
  description: string;
  title: string;
  difficulty: number;
  status: number;
};

export type ProblemListPageInfo = PageInfo & {
  list: UserProblemForList[];
};

export type ProblemListResponse = BaseResponse & {
  data: ProblemListPageInfo;
};

export type UserProblem = {
  id: number;
  bankID: number;
  name: string;
  number: string;
  description: string;
  title: string;
  path: string;
  difficulty: number;
  languages: string;
  enable: number;
};

export type ProblemResponse = BaseResponse & {
  data: UserProblem;
};

export type ProblemTemplateCodeResponse = BaseResponse & {
  data: string;
};

export type UserCodeResponse = BaseResponse & {
  data: string;
};

export type UserCode = {
  id: number;
  problemID: number;
  language: string;
  code: string;
  visualSetting: string;
};

export type ReqUserCodeByProblemIDResponse = BaseResponse & {
  data: UserCode;
};

export type SaveUserCodeRequest = {
  problemID: number;
  language: string;
  code: string;
};

export type SaveUserCodeResponse = BaseResponse & {
  data: string;
};
