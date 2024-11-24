import { defineStore } from 'pinia';

type VisualState = {
  // 可视化是否开启
  action: boolean;
  // 可视化描述的json结构
  descriptionJson: string;
  // 可视化描述
  description: VisualDescription | undefined;
};

const useVisualStore = defineStore('visual', {
  state: (): VisualState => ({
    action: false,
    descriptionJson: '',
    description: null,
  }),
});

export default useVisualStore;

// 可视化描述类型
export type VisualDescription =
  | ArrayDescription
  | BinaryTreeDescription
  | LinkListDescription
  | any;

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

// 链表的可视化描述
export type LinkListDescription = {
  type: 'linkList';
  // 链表节点
  linkNode: string;
  // 数据域
  data: string;
  next: string;
  prev?: string;
};
