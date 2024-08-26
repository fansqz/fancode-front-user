type SubmitRequest = {
  problemID: number
  code: string
  language: string
};

type SubmitData = {
  problemID: number
  status: number
  errorMessage: string
  caseName: string
  caseData: string
  // 预期输出
  expectedOutput: string
  // 用户输出
  userOutput: string
  // 判题使用时间
  timeUsed: string
  // 内存使用量（以字节为单位）
  memoryUsed: string
};

type SubmitResponse = BaseResponse & {
  data: SubmitData
};

type ExecuteRequest = {
  problemID: number
  input: string
  code: string
  language: string
};

type ExecuteData = {
  problemID: number
  status: number
  errorMessage: string
  //用户输出
  userOutput: string
};

type ExecuteResponse = BaseResponse & {
  data: ExecuteData
};
