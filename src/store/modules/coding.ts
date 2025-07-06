import { defineStore } from 'pinia'

import { supportedLanguages, languageConstants } from '@/constants/languages.ts'

type CodingState = {
  // 编辑器代码
  code: string
  // 题目id
  problemId: number
  // 主题
  theme: string
  // 判断当前标签页编程题目的语言类型
  language: languageConstants
  // 可选的语言
  languages: languageConstants[]
  // 输入框数据
  input: string
  // 输出数据
  output: Output
}

type Output = {
  // status为0就是正在加载中，status为1就是加载成功
  status: number
  // 异常信息
  errorMessage: string
  // 输出状态码
  statusCode: number
  // 用例名称
  caseName: string
  // 用例数据
  caseData: string
  // 用户输出
  userOutput: string
  // 预期输出
  expectedOutput: string
}

// 使用 Pinia 创建一个状态存储
const useCodingStore = defineStore('coding', {
  state: (): CodingState => ({
    code: '',
    problemId: 0,
    theme: 'monokai-light',
    language: languageConstants.GO,
    languages: supportedLanguages,
    input: '',
    output: {
      status: 1,
      errorMessage: '',
      statusCode: 400,
      caseName: '',
      caseData: '',
      userOutput: '',
      expectedOutput: '',
    },
  }),
  actions: {},
  getters: {},
})

export default useCodingStore
