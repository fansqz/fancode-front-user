import { defineStore } from 'pinia';

// 扩展 state 以类型化各个属性，特别是breakpoints.
interface DebugState {
  id: string;
  isDebug: boolean;
  stopped: boolean;
  breakpoints: number[];
  lineNum: number;
  sentInputs: string[];
  currentInput: string;
  outputs: any[];
  currentErrorLocation: number[];
}

// 使用 Pinia 创建一个状态存储
const useDebugStore = defineStore('debug', {
  state: (): DebugState => ({
    id: '',
    // 判断用户是否处于调试状态
    isDebug: false,
    // 程序暂停，到达断点或者单步调试等命令
    stopped: false,
    // 断点
    breakpoints: [],
    // 调试停留行号
    lineNum: 0,
    // 已发送的input
    sentInputs: [],
    // 当前编辑的input
    currentInput: '',
    // 执行的输出
    outputs: [],
    // 调试结束

    // 出现错误的行位置
    currentErrorLocation: [],
  }),
  actions: {},
  getters: {},
});

export default useDebugStore;
