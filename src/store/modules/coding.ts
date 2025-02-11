import { defineStore } from 'pinia';

// 使用 Pinia 创建一个状态存储
const useCodingStore = defineStore('coding', {
  state: () => ({
    // 编辑器代码
    code: '',
    // 题目id
    problemId: 0,
    // 主题
    theme: 'monokai-light',
    // 判断当前标签页编程题目的语言类型
    language: 'go',
    // 可选的语言
    languages: ['go'],

    // 输入框数据
    input: '',

    // 输出框数据
    output: {
      // status为0就是正在加载中，status为1就是加载成功
      status: 1,
      // 异常信息
      errorMessage: '',
      // 输出状态码
      statusCode: 400,
      // 用例名称
      caseName: '',
      // 用例数据
      caseData: '',
      // 用户输出
      userOutput: '',
      // 预期输出
      expectedOutput: '',
    },
  }),
  actions: {},
  getters: {},
});

export default useCodingStore;
