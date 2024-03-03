
import { defineStore } from 'pinia';


// 使用 Pinia 创建一个状态存储
const useDebugStore = defineStore('debug', {
  state: () => ({
    value: "",
    // 题目id
    problemId: "",
    // 主题
    theme: "monokai-light",
    // 判断当前标签页编程题目的语言类型
    language: "go",
    // 可选的语言
    languages: ["c"],
    // 判断用户是否处于调试状态
    isDebug: false,
    // 判断是否调试结束的标志
    isDebugEnd: false,
    debugData: {
      lineNum: 0,
    },
    // 出现错误的行位置
    currentErrorLocation: [],
  }),
  actions: {
  },
  getters: {
  }
});

export default useDebugStore;