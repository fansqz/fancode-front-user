// @ts-nocheck
import { AV_BinaryTree } from './dataStruct/av_BinaryTree';
import { AV_LinkList } from './dataStruct/av_LinkList';
import { AV_Array } from './dataStruct/av_Array';
import { AV_ChainHashTable } from './dataStruct/av_ChainHashTable';
import { AV_Stack } from './dataStruct/av_Stack';
import { AV_LinkStack } from './dataStruct/av_LinkStack';
import { AV_LinkQueue } from './dataStruct/av_LinkQueue';
import { AV_GeneralizedList } from './dataStruct/av_GeneralizedList';
import { SV } from '@/assets/js/sv';
import { AV_HashTable } from './dataStruct/av_HashTable';
import { AV_SqQueue } from './dataStruct/av_SqQueue';
import { AV_TriTree } from './dataStruct/av_TriTree';
import { AV_AdjoinTableGraph } from './dataStruct/av_AdjoinTableGraph';
import { AV_AdjoinMatrixGraph } from './dataStruct/av_AdjoinMatrixGraph';
import { AV_CLenQueue } from './dataStruct/av_CLenQueue';
import { AV_DirectedAdjoinTableGraph } from './dataStruct/av_DirectedAdjoinTableGraph';
import { AV_DirectedAdjoinMatrixGraph } from './dataStruct/av_DirectedAdjoinMatrixGraph';
import { AV_DuLinkList } from './dataStruct/av_DuLinkList';
import { AV_Force } from './dataStruct/av_Force';
import { AV_PCTree } from './dataStruct/av_PCTree';
import { AV_PTree } from './dataStruct/av_PTree';
import { AV_List } from './dataStruct/av_List';
import { AV_Heap } from './dataStruct/av_Heap';

export const Layouts = {
  /*  */ BinaryTree: AV_BinaryTree,
  LinkList: AV_LinkList,
  Array: AV_Array,
  ChainHashTable: AV_ChainHashTable,
  Stack: AV_Stack,
  LinkStack: AV_LinkStack,
  LinkQueue: AV_LinkQueue,
  GeneralizedList: AV_GeneralizedList,
  HashTable: AV_HashTable,
  SqQueue: AV_CLenQueue,
  TriTree: AV_TriTree,
  AdjoinMatrixGraph: AV_AdjoinMatrixGraph,
  AdjoinTableGraph: AV_AdjoinTableGraph,
  CLenQueue: AV_CLenQueue,
  DirectedAdjoinTableGraph: AV_DirectedAdjoinTableGraph,
  DirectedAdjoinMatrixGraph: AV_DirectedAdjoinMatrixGraph,
  DuLinkList: AV_DuLinkList,
  Force: AV_Force,
  PCTree: AV_PCTree,
  PTree: AV_PTree,
  List: AV_List,
  CTagQueue: AV_SqQueue,
  Heap: AV_Heap,
};

Object.keys(Layouts).map((item) => {
  let layout = Layouts[item];
  SV.registerLayout(item, layout);
});

export const Visualizer = SV;
Visualizer.instance = null;

/**
 * 临时遍历分析（用于可视化面板的左上角信息表）
 * @param {*} sources
 */
export function FloatExternalAnalyse(sources) {
  const externalList = {};

  Object.keys(sources).map((name) => {
    const group = sources[name],
      layout = sources[name].layouter;

    if (externalList[layout] === undefined && layout != undefined) {
      externalList[layout] = [];
    }

    if (group.data) {
      group.data.forEach((item) => {
        if (!item.external) {
          return;
        }

        if (Array.isArray(item.external)) {
          externalList[layout].push(...item.external);
        }

        if (typeof item.external === 'string') {
          externalList[layout].push(item.external);
        }
      });
    }
  });

  return externalList;
}
