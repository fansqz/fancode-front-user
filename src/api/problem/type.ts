type ProblemListRequest = {
  bankID: number | undefined;
  page: number;
  pageSize: number;
};

type UserProblemForList = {
  id: number;
  name: string;
  number: string;
  description: string;
  title: string;
  difficulty: number;
  status: number;
};

type ProblemListPageInfo = PageInfo & {
  list: UserProblemForList[];
};

type ProblemListResponse = BaseResponse & {
  data: ProblemListPageInfo;
};

type UserProblem = {
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

type ProblemResponse = BaseResponse & {
  data: UserProblem;
};

type ProblemTemplateCodeResponse = BaseResponse & {
  data: string;
};

type UserCodeResponse = BaseResponse & {
  data: string;
};

type UserCode = {
  id: number;
  problemID: number;
  language: string;
  code: string;
};

type ReqUserCodeByProblemIDResponse = BaseResponse & {
  data: UserCode;
};

type SaveUserCodeRequest = {
  problemID: number;
  language: string;
  code: string;
};

type SaveUserCodeResponse = BaseResponse & {
  data: string;
};
