import { StructVisualData } from '@/api/visual/type';
import { reqStructVisual } from '@/api/visual';
import { GraphData, GraphNode } from '@/components/visual/type/graph';
import { ElMessage } from 'element-plus';
import { GraphDescription } from '@/store/modules/visual';

const reqGraphVisualData = async (
  debugID: string,
  description: GraphDescription,
): Promise<GraphData> => {
  // 请求可视化数据
  let req = {
    debugID: debugID,
    query: {
      struct: description.graphNode,
      values: [description.data],
      points: description.nexts,
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
      layouter: 'graph',
    };
  }
  // 将后端返回的可视化数据转成av需要的可视化数据
  return convertGraphVisualData(description, result.data);
};

const convertGraphVisualData = (
  _description: GraphDescription,
  data: StructVisualData,
): GraphData => {
  let nodes: GraphNode[] = [];

  for (let i = 0; i < data.nodes.length; i++) {
    let node = data.nodes[i];
    let gnode: GraphNode = {
      id: '0',
    };
    gnode.id = node.id;
    gnode.data = node.values[0].value;
    for (let j = 0; j < node.points.length; j++) {
      for (let n of node.points) {
        if (!gnode.next) {
          gnode.next = [];
        }
        gnode.next.push(n.value);
      }
    }
    nodes.push(gnode);
  }

  // 设置变量数据
  for (let i = 0; i < data.points.length; i++) {
    let pointer = data.points[i];
    for (let j = 0; j < nodes.length; j++) {
      let node = nodes[j];
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
    layouter: 'graph',
  };
};

// 请求数组可视化数据
export default reqGraphVisualData;
