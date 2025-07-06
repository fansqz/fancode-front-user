import { BaseResponse } from '../type'

export type SubmitRequest = {
  problemID: number
  code: string
  language: string
}

export type SubmitData = {
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
}

export type SubmitResponse = BaseResponse & {
  data: SubmitData
}

export type ExecuteRequest = {
  problemID: number
  input: string
  code: string
  language: string
}

export type ExecuteData = {
  problemID: number
  status: number
  errorMessage: string
  //用户输出
  userOutput: string
}

export type ExecuteResponse = BaseResponse & {
  data: ExecuteData
}
