// Array 传递的数据类型
export type ArrayData = {
  data: ArrayNode[]
  layouter: 'array'
}

export type ArrayNode = {
  id: string
  headExternal?: string
  external?: string | string[]
  // 标题，可以理解为数组的索引
  index?: string
  // 数据
  data?: string
}
