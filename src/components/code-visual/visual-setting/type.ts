// 可视化描述类型
export type VisualDescription =
  | ArrayDescription
  | BinaryTreeDescription
  | LinkListDescription
  | GraphDescription
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
