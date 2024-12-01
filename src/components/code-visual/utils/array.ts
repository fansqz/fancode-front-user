import { VariableVisualData } from '@/api/visual/type';
import { reqVariableVisual } from '@/api/visual';
import { ArrayData, ArrayNode } from '@/components/visual/visaul/type/array';
import { ElMessage } from 'element-plus';
import { ArrayDescription } from '@/store/modules/visual';

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
    ElMessage({
      showClose: true,
      message: result.message,
      type: 'error',
    });
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
  // 设置指针
  for (let i = 0; i < data.points.length; i++) {
    let index = data.points[i].value;
    if (nodes[index].external != undefined) {
      nodes[index].external.push(data.points[i].name);
    } else {
      nodes[index].external = [data.points[i].name];
    }
  }
  return {
    data: nodes,
    layouter: 'array',
  };
};

// 请求数组可视化数据
export default reqArrayVisualData;
