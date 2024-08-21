import { defineStore } from 'pinia';
import { VisualizeDescription, VisualizeData } from '@/api/visual/type.ts';

type VisualizeState = {
  // 可视化是否开启
  action: boolean;
  // 可视化描述的json结构
  descriptionJson: string;
  // 可视化描述
  description: VisualizeDescription | null;
  // 可视化数据
  data: VisualizeData | null;
};

const useVisualizeStore = defineStore('visual', {
  state: (): VisualizeState => ({
    action: false,
    descriptionJson: '',
    description: null,
    data: null,
  }),
});

export default useVisualizeStore;
