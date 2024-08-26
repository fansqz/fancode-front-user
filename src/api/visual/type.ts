export type VisualizeType = string;

export const ArrayType: VisualizeType = 'array';
export const BinaryTreeType: VisualizeType = 'binaryTree';

// 结构体导向可视化请求
export type StructVisualizeRequest = {
  debugID: string;
  query: StructVisualizeQuery;
};

export type StructVisualizeQuery = {
  struct: string;
  values: string[];
  points: string[];
};

export type StructuralVisualizeResponse = BaseResponse & {
  data: StructuralVisualizeData;
};

export type StructuralVisualizeData = {
  // 可视化节点
  nodes: VisualizeNode[];
  // 指针列表
  points: VisualizeVariable[];
};

// 变量导向可视化请求
export type VariableVisualizeRequest = {
  debugID: string;
  query: VariableVisualizeQuery;
};

export type VariableVisualizeQuery = {
  structVars: string[];
  pointVars: string[];
};

export type VariableVisualizeResponse = BaseResponse & {
  data: VariableVisualizeData;
};

// 数组指针的可视化数据，比如数组
export type VariableVisualizeData = {
  // 结构体列表
  structs: VisualizeNode[];
  // 指针列表
  points: VisualizeVariable[];
};

// 可视化节点
export type VisualizeNode = {
  name: string;
  id: string;
  type: string;
  // 值域
  values: VisualizeVariable[];
  // 指针域
  points: VisualizeVariable[];
};

// 可视化变量
export type VisualizeVariable = {
  name: string;
  type: string;
  value: string;
};

// 可视化模板响应
export type VisualizeDescriptionTemplateResponse = BaseResponse & {
  data: VisualizeDescriptionTemplate;
};

// 可视化模板列表响应
export type VisualizeDescriptionTemplateListResponse = BaseResponse & {
  data: VisualizeDescriptionTemplate[];
};

export type VisualizeDescriptionTemplate = {
  id: number;
  order: number;
  type: string;
  name: string;
  template: string;
};
