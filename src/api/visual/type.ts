export type VisualizeType = string

export const ArrayType:VisualizeType = "array"
export const BinaryTreeType:VisualizeType = "binaryTree"

// 可视化请求
export type VisualizeRequest = {
 id: string,
 type: VisualizeType,
 description: VisualizeDescription,
};

// 可视化响应
export type VisualizeResponse = BaseResponse & {
  data: {
    type: string,
    description: VisualizeDescription,
    data: VisualizeData,
  }
};

// 可视化模板响应
export type VisualizeDescriptionTemplateResponse = BaseResponse & {
  data: VisualizeDescriptionTemplate,
};

// 可视化模板列表响应
export type VisualizeDescriptionTemplateListResponse = BaseResponse & {
  data: VisualizeDescriptionTemplate[],
};

export type VisualizeDescriptionTemplate = {
  id: number,
  order: number,
  type: string,
  name: string,
  template: string,
};

// 可视化描述类型
export type VisualizeDescription = ArrayDescription | BinaryTreeDescription | any;

// 数组可视化描述
export type ArrayDescription = {
  arrayName: string,
  pointNames: string[],
};

// 二叉树可视化描述
export type BinaryTreeDescription = {
  	// 二叉树节点结构体名称
	treeNode: string,
	// 左子树和右边子树属性名称
	left:  string
	right: string
};

export type VisualizeData = ArrayPointVisualizeData | StructuralVisualizeData;

// 数组指针的可视化数据，比如数组
export type ArrayPointVisualizeData = {
  // 数组节点
  array: VisualizeNode,
  // 指针列表
  points: VisualizeVariable[],
};

// 结构体式可视化数据，比如二叉树，图等
export type StructuralVisualizeData = {
  // 可视化节点
  nodes: VisualizeNode[],
  // 指针列表
  points: VisualizeVariable[],
};

// 一个可视化节点
export type VisualizeNode = {
  name: string,
  id: string,
  type: string,
  // 值域
  values: VisualizeVariable[],
  // 指针域
  points: VisualizeVariable[],
};

// 一个变量
export type VisualizeVariable = {
  name: string,
  type: string,
  value: string,
};
