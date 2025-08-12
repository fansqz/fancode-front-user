import { descriptions } from '@/constants/description.ts'

import { BaseResponse } from '../type'

// 结构体导向可视化请求
export type StructVisualRequest = {
  debugID: string
  query: StructVisualQuery
}

export type StructVisualQuery = {
  struct: string
  values: string[]
  points: string[]
}

export type StructVisualResponse = BaseResponse & {
  data: StructVisualData
}

export type StructVisualData = {
  // 可视化节点
  nodes: VisualNode[]
  // 指针列表
  points: VisualVariable[]
}

// 变量导向可视化请求
export type VariableVisualRequest = {
  debugID: string
  query: VariableVisualQuery
}

export type VariableVisualQuery = {
  structVars: string[]
  pointVars: string[]
}

export type VariableVisualResponse = BaseResponse & {
  data: VariableVisualData
}

// 数组指针的可视化数据，比如数组
export type VariableVisualData = {
  // 结构体列表
  structs: VisualNode[]
  // 指针列表
  points: VisualVariable[]
}

// 可视化节点
export type VisualNode = {
  name: string
  id: string
  type: string
  // 值域
  values: VisualVariable[]
  // 指针域
  points: VisualVariable[]
}

// 可视化变量
export type VisualVariable = {
  name: string
  type: string
  value: string
}

export type VisaulDocumentResponse = BaseResponse & {
  data: string
}

export type VisualDescriptionResponse = BaseResponse & {
  data: {
    visualType: descriptions
    description: VisualDescription
  }
}

// 可视化描述类型
export type VisualDescription =
  | ArrayDescription
  | BinaryTreeDescription
  | LinkListDescription
  | GraphDescription
  | any

// 数组可视化描述
export type ArrayDescription = {
  arrayName: string
  pointNames: string[]
  displayType?: 'array' | 'array-bar'
}

// 二叉树可视化描述
export type BinaryTreeDescription = {
  // 二叉树节点结构体名称
  treeNode: string
  // 数据域
  data: string
  // 左子树和右边子树属性名称
  left: string
  right: string
}

// 图的可视化描述
export type GraphDescription = {
  // 二叉树节点结构体名称
  graphNode: string
  // 数据域
  data: string
  nexts: string[]
}

// 链表的可视化描述
export type LinkListDescription = {
  // 链表节点
  linkNode: string
  // 数据域
  data: string
  next: string
  prev?: string
}
