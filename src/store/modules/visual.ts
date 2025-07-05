import { defineStore } from 'pinia'

import {
  ArrayDescription,
  BinaryTreeDescription,
  GraphDescription,
  LinkListDescription,
  VisualDescription,
} from '@/api/visual/type'
import { descriptions } from '@/constants/description.ts'

type VisualState = {
  // 可视化是否开启
  action: boolean
  // 是否ai自动识别可视化
  isAIEnabled: boolean
  // 可视化描述类型
  descriptionType: descriptions
  // 可视化
  arrayDescription: ArrayDescription
  binaryTreeDescription: BinaryTreeDescription
  linkListDescription: LinkListDescription
  graphDescription: GraphDescription
}

const useVisualStore = defineStore('visual', {
  state: (): VisualState => ({
    // 可视化是否开启
    action: false,
    // 是否ai自动识别可视化
    isAIEnabled: true,
    descriptionType: descriptions.Array,
    arrayDescription: {
      arrayName: 'Arr',
      pointNames: ['Point1', 'Point2'],
    },
    binaryTreeDescription: {
      treeNode: 'TreeNode',
      data: 'Val',
      left: 'Left',
      right: 'Right',
    },
    linkListDescription: {
      // 链表节点
      linkNode: 'LinkNode',
      // 数据域
      data: 'Val',
      next: 'Next',
      prev: 'Prev',
    },
    graphDescription: {
      graphNode: 'GraphNode',
      // 数据域
      data: 'Val',
      nexts: ['Point1', 'Point2'],
    },
  }),
  actions: {
    setDescription(desciptionType: descriptions, description: VisualDescription) {
      switch (desciptionType) {
        case descriptions.Array:
          this.arrayDescription = description
          break
        case descriptions.BinaryTree:
          this.binaryTreeDescription = description
          break
        case descriptions.LinkList:
          this.linkListDescription = description
          break
        case descriptions.Graph:
          this.graphDescription = description
          break
      }
    },
    getDescription(desciptionType: descriptions) {
      switch (desciptionType) {
        case descriptions.Array:
          return this.arrayDescription
        case descriptions.BinaryTree:
          return this.binaryTreeDescription
        case descriptions.LinkList:
          return this.linkListDescription
        case descriptions.Graph:
          return this.graphDescription
      }
    },
  },
})

export default useVisualStore
