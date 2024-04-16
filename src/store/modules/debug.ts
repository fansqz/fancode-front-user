import { defineStore } from 'pinia';

// 扩展 state 以类型化各个属性，特别是breakpoints.
interface DebugState {
  key: string;
  isDebug: boolean;
  stopped: boolean;
  debugData: {
    breakpoints: number[];
    lineNum: number;
  };
  currentErrorLocation: number[]; // 假设这也是一个数字数组
}

// 使用 Pinia 创建一个状态存储
const useDebugStore = defineStore('debug', {
  state: (): DebugState => ({
    // 服务端启动调试的唯一标识key
    key: '',
    // 判断用户是否处于调试状态
    isDebug: false,
    // 程序暂停，到达断点或者单步调试等命令
    stopped: false,

    debugData: {
      breakpoints: [],
      lineNum: 0,
    },
    // 出现错误的行位置
    currentErrorLocation: [],
  }),
  actions: {},
  getters: {},
});

export default useDebugStore;
