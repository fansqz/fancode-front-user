import { defineStore } from 'pinia';
import { descriptions } from '@/enum/description.ts';
import { VisualDescription } from '@/components/code-visual/visual-setting/type.ts';

type VisualState = {
  // 可视化是否开启
  action: boolean;

  descriptionJson: string;
  description: VisualDescription | null;
  // 可视化描述类型
  descriptionType: descriptions;
  descriptionMap: Map<descriptions, VisualDescription>;
};

const useVisualStore = defineStore('visual', {
  state: (): VisualState => ({
    action: false,
    descriptionType: descriptions.Array,
    descriptionMap: new Map(),
    descriptionJson: '',
    description: null,
  }),
});

export default useVisualStore;
