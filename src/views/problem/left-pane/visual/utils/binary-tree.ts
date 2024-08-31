import { StructuralVisualizeData } from '@/api/visual/type';
import { reqStructVisualize } from '@/api/visual';
import { BinaryTreeData, BinaryTreeNode } from '@/components/visual/type/binary-tree';
import { ElMessage } from 'element-plus';
import { BinaryTreeDescription } from '@/store/modules/visual';

const reqBinaryTreeVisualizeData = async (
  debugID: string,
  description: BinaryTreeDescription,
): Promise<BinaryTreeData> => {
  // 请求可视化数据
  let req = {
    debugID: debugID,
    query: {
      struct: description.treeNode,
      values: [description.data],
      points: [description.left, description.right]
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
      layouter: 'binaryTree',
    };
  }
  // 将后端返回的可视化数据转成av需要的可视化数据
  return convertqBinaryTreeVisualizeData(description, result.data);
};

const convertqBinaryTreeVisualizeData = (
  description: BinaryTreeDescription,
  data: StructuralVisualizeData,
): BinaryTreeData => {
  let nodes: BinaryTreeNode[] = [];

  // 遍历所有二叉树节点
  for (let i = 0; i < data.nodes.length; i++) {
    let node = data.nodes[i];
    let btNode: BinaryTreeNode = {
      id: "0",
    };
    btNode.id = node.id;
    btNode.data = node.values[0].value;
    for (let j = 0; j < node.points.length; j++) {
      if (btNode.child == null) {
        btNode.child = [];
      }
      if (node.points[j].name == description.left) {
        btNode.child[0] = node.points[j].value;
      } else {
        btNode.child[1] = node.points[j].value;
      }
    }
    if (i == 0) {
      btNode.root = true;
    }
    nodes.push(btNode);
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
        nodes[j].external.push(pointer.name)
      }
    }
  }
  return {
    data: nodes,
    layouter: 'binaryTree',
  };
};

// 请求数组可视化数据
export default reqBinaryTreeVisualizeData;