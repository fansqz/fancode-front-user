import { defineStore } from 'pinia';

type Status = 'init' | 'compiled' | 'running' | 'stopped' | 'terminated';

// 扩展 state 以类型化各个属性，特别是breakpoints.
type DebugState = {
  id: string;
  status: Status;
  breakpoints: number[];
  lineNum: number;
  currentFrameID: number;
  currentInput: string;
  outputs: any[];
  currentErrorLocation: number[];
};

// 使用 Pinia 创建一个状态存储
const useDebugStore = defineStore('debug', {
  state: (): DebugState => ({
    id: '',
    // 程序暂停，到达断点或者单步调试等命令
    status: 'init',
    // 断点
    breakpoints: [],
    // 调试停留行号
    lineNum: 0,
    // 当前栈帧id
    currentFrameID: 0,
    // 当前编辑的input
    currentInput: '',
    // 执行的输出
    outputs: [],
    // 出现错误的行位置
    currentErrorLocation: [],
  }),
  actions: {
    // 判断是否正在调试
    isDebugging() {
      return this.status != 'init' && this.status != 'terminated';
    },
  },
  getters: {},
});

export default useDebugStore;
