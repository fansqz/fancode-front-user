import { StructuralVisualizeData } from '@/api/visual/type';
import { reqStructVisualize } from '@/api/visual';
import { GraphData, GraphNode } from '@/components/visual/type/graph';
import { ElMessage } from 'element-plus';
import { GraphDescription } from '@/store/modules/visual';

const reqGraphVisualizeData = async (
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
  let result = await reqStructVisualize(req);
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
  return convertGraphVisualizeData(description, result.data);
};

const convertGraphVisualizeData = (
  _description: GraphDescription,
  data: StructuralVisualizeData,
): GraphData => {
  let nodes: GraphNode[] = [];

  // 遍历所有二叉树节点，因为二叉树的渲染要从根节点开始一直到子节点，所以必须根节点在上面
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

  // 设置指针
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
export default reqGraphVisualizeData;
