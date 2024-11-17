export type VisualType = string;

export const ArrayType: VisualType = 'array';
export const BinaryTreeType: VisualType = 'binaryTree';

// 读取可视化设置
export type GetVisualSettingRequest = {
  problemID: number;
  language: string;
};

export type GetVisualSettingResponse = BaseResponse & {
  data: string;
};

// 保存可视化设置
export type SaveVisualSettingRequest = {
  problemID: number;
  language: string;
  visualDescription: string;
};

export type SaveVisualSettingResponse = BaseResponse & {
  data: string;
};

// 结构体导向可视化请求
export type StructVisualRequest = {
  debugID: string;
  query: StructVisualQuery;
};

export type StructVisualQuery = {
  struct: string;
  values: string[];
  points: string[];
};

export type StructVisualResponse = BaseResponse & {
  data: StructVisualData;
};

export type StructVisualData = {
  // 可视化节点
  nodes: VisualNode[];
  // 指针列表
  points: VisualVariable[];
};

// 变量导向可视化请求
export type VariableVisualRequest = {
  debugID: string;
  query: VariableVisualQuery;
};

export type VariableVisualQuery = {
  structVars: string[];
  pointVars: string[];
};

export type VariableVisualResponse = BaseResponse & {
  data: VariableVisualData;
};

// 数组指针的可视化数据，比如数组
export type VariableVisualData = {
  // 结构体列表
  structs: VisualNode[];
  // 指针列表
  points: VisualVariable[];
};

// 可视化节点
export type VisualNode = {
  name: string;
  id: string;
  type: string;
  // 值域
  values: VisualVariable[];
  // 指针域
  points: VisualVariable[];
};

// 可视化变量
export type VisualVariable = {
  name: string;
  type: string;
  value: string;
};

// 可视化模板响应
export type VisualDescriptionTemplateResponse = BaseResponse & {
  data: VisualDescriptionTemplate;
};

// 可视化模板列表响应
export type VisualDescriptionTemplateListResponse = BaseResponse & {
  data: VisualDescriptionTemplate[];
};

export type VisualDescriptionTemplate = {
  id: number;
  order: number;
  type: string;
  name: string;
  template: string;
};
