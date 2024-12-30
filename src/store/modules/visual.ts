import { defineStore } from 'pinia';
import { descriptions } from '@/enum/description.ts';

type VisualState = {
  // 可视化是否开启
  action: boolean;

  descriptionJson: string;
  description: VisualDescription | null;
  // 可视化描述
  descriptionType: descriptions;
  arrayDescription?: ArrayDescription;
  binaryTreeDescription?: BinaryTreeDescription;
  linkListDescription?: LinkListDescription;
  graphDescription?: GraphDescription;
};

const useVisualStore = defineStore('visual', {
  state: (): VisualState => ({
    action: false,
    descriptionType: descriptions.Array,
    arrayDescription: {
      arrayName: "arr",
      pointNames: ["point1", "point2"],
    },
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
  arrayName: string;
  pointNames: string[];
};

// 二叉树可视化描述
export type BinaryTreeDescription = {
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
  // 二叉树节点结构体名称
  graphNode: string;
  // 数据域
  data: string;
  nexts: string[];
};

// 链表的可视化描述
export type LinkListDescription = {
  // 链表节点
  linkNode: string;
  // 数据域
  data: string;
  next: string;
  prev?: string;
};
