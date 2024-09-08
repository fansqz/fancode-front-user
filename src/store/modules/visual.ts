import { defineStore } from 'pinia';

type VisualizeState = {
  // 可视化是否开启
  action: boolean;
  // 可视化描述的json结构
  descriptionJson: string;
  // 可视化描述
  description: VisualizeDescription | undefined;
};

const useVisualizeStore = defineStore('visual', {
  state: (): VisualizeState => ({
    action: false,
    descriptionJson: '',
    description: null,
  }),
});

export default useVisualizeStore;

// 可视化描述类型
export type VisualizeDescription = ArrayDescription | BinaryTreeDescription | any;

// 数组可视化描述
export type ArrayDescription = {
  type: 'array';
  arrayName: string;
  pointNames: string[];
};

// 二叉树可视化描述
export type BinaryTreeDescription = {
  type: 'binaryTree';
  // 二叉树节点结构体名称
  treeNode: string;
  // 数据域
  data: string;
  // 左子树和右边子树属性名称
  left: string;
  right: string;
};

// 图的可视化描述
export type GraphDescription = {
  type: 'graph';
  // 二叉树节点结构体名称
  graphNode: string;
  // 数据域
  data: string;
  nexts: string[];
};
