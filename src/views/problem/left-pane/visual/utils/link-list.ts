import { StructVisualData } from '@/api/visual/type';
import { reqStructVisual } from '@/api/visual';
import { LinkListData, LinkListNode } from '@/components/visual/type/link-list';
import { ElMessage } from 'element-plus';
import { LinkListDescription } from '@/store/modules/visual';

const reqLinkListVisualData = async (
  debugID: string,
  description: LinkListDescription,
): Promise<LinkListData> => {
  let points = [description.next];
  if (description.pre) {
    points.push(description.pre);
  }
  // 请求可视化数据
  let req = {
    debugID: debugID,
    query: {
      struct: description.linkNode,
      values: [description.data],
      points: points,
    },
  };
  let result = await reqStructVisual(req);
  if (result.code != 200) {
    ElMessage({
      showClose: true,
      message: result.message,
      type: 'error',
    });
    return {
      data: [],
      layouter: 'linkList',
    };
  }
  // 将后端返回的可视化数据转成av需要的可视化数据
  return convertLinkListVisualData(description, result.data);
};

const convertLinkListVisualData = (
  description: LinkListDescription,
  data: StructVisualData,
): LinkListData => {
  let nodes: LinkListNode[] = [];

  // 转换节点数据
  for (let i = 0; i < data.nodes.length; i++) {
    let node = data.nodes[i];
    let lnode: LinkListNode = { id: '0', next: '' };
    lnode.id = node.id;
    if (node.values && node.values.length != 0) {
      lnode.data = node.values[0].value;
    }
    for (let j = 0; j < node.points.length; j++) {
      for (let p of node.points) {
        // 设置next指针
        if (p.name == description.next) {
          lnode.next = p.value;
        }
        // 设置pre指针
        if (p.name == description.pre) {
          lnode.pre = p.value;
        }
      }
    }
    nodes.push(lnode);
  }

  // 设置变量数据
  for (let i = 0; i < data.points.length; i++) {
    let pointer = data.points[i];
    for (let j = 0; j < nodes.length; j++) {
      let node = nodes[j];
      // 当前节点的地址等于变量指向的地址，设置变量指针指向该节点
      if (node.id == pointer.value) {
        if (node.external == undefined) {
          node.external = [];
        }
        nodes[j].external.push(pointer.name);
      }
    }
  }
  return {
    data: nodes,
    layouter: 'linkList',
  };
};

// 请求数组可视化数据
export default reqLinkListVisualData;
