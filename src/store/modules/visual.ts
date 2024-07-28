import { defineStore } from 'pinia';

interface VisualData {
  type: string;
  sources: any[];
}

// 扩展 state 以类型化各个属性，特别是breakpoints.
interface VisualState {
  visualData: VisualData;
  curSelectElementId: number;
  hasTriggerLastStep: boolean;
}

// 使用 Pinia 创建一个状态存储
const useVisualState = defineStore('visual', {
  state: (): VisualState => ({
    visualData: {
      type: '',
      sources: [],
    },
    curSelectElementId: 0,
    hasTriggerLastStep: false,
  }),
  actions: {},
  getters: {},
});

export default useVisualState;
