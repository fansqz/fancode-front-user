import { VariableVisualData, VisualVariable } from '@/api/visual/type';
import { reqVariableVisual } from '@/api/visual';
import { ArrayData, ArrayNode } from '@/components/code-visual/visual/type/array';
import { ArrayDescription } from '@/api/visual/type';

const reqArrayVisualData = async (
  debugID: string,
  description: ArrayDescription,
): Promise<ArrayData> => {
  // 请求可视化数据
  let req = {
    debugID: debugID,
    query: {
      structVars: [description.arrayName],
      pointVars: description.pointNames,
    },
  };
  let result = await reqVariableVisual(req);
  if (result.code != 200) {
    return {
      data: [],
      layouter: 'array',
    };
  }
  // 将后端返回的可视化数据转成av需要的可视化数据
  return convertArrayVisualData(description, result.data);
};

const convertArrayVisualData = (
  _description: ArrayDescription,
  data: VariableVisualData,
): ArrayData => {
  // 将第一个struct[0]作为数组的数据
  let struct = data.structs[0];
  let nodes: ArrayNode[] = [];
  for (let i = 0; i < struct.values.length; i++) {
    let node: ArrayNode = {
      id: struct.values[i].name,
      index: struct.values[i].name,
      data: struct.values[i].value,
    };
    if (i === 0) {
      // 头指针
      node.headExternal = data.structs[0].name;
    }
    nodes.push(node);
  }

  let virtualNodePoints: VisualVariable[] = [];

  // 设置指针
  for (let i = 0; i < data.points.length; i++) {
    let index = data.points[i].value;
    if (nodes.length <= Number(index) || Number(index) < 0) {
      virtualNodePoints.push(data.points[i]);
      continue;
    }
    if (nodes[index].external != undefined) {
      nodes[index].external.push(data.points[i].name);
    } else {
      nodes[index].external = [data.points[i].name];
    }
  }

  // 设置虚拟节点
  const maxPoint = virtualNodePoints.reduce((max, point) => {
    if (Number(point.value) > max) {
      return Number(point.value);
    }
    return max;
  }, 0);
  let count = 0;
  for (let i = nodes.length; i <= maxPoint; i++) {
    nodes.push({
      id: `[${String(i + 1)}]`,
      index: `[${String(i + 1)}]`,
      data: '',
      type: 'virtual',
    });
    // 只支持5个虚拟节点
    count++;
    if (count > 5) {
      break;
    }
  }

  // 设置虚拟节点的外部指针
  for (let i = 0; i < virtualNodePoints.length; i++) {
    let index = virtualNodePoints[i].value;
    if (nodes.length <= Number(index) || Number(index) < 0) {
      continue;
    }
    if (nodes[index].external != undefined) {
      nodes[index].external.push(virtualNodePoints[i].name);
    } else {
      nodes[index].external = [virtualNodePoints[i].name];
    }
  }

  return {
    data: nodes,
    layouter: 'array',
  };
};

// 请求数组可视化数据
export default reqArrayVisualData;
