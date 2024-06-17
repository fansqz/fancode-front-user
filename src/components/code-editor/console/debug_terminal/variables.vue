<template>
  <div class="variables">   
    <el-tree
      lazy
      :load="loadNode"
      :data="treeData"
      :props="defaultProps"
      node-key="id"
      :ref="treeRef"
    />
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from "vue";
import useDebugStore from '@/store/modules/debug';
import { storeToRefs } from 'pinia';
import { reqGetFrameVariables, reqGetVariables } from '@/api/debug';

const debugStore = useDebugStore();
const { key, isDebug } = storeToRefs(debugStore);
const treeData = ref([]); // 树的数据源
const props = defineProps(['frameId']);
const treeRef = ref();

const defaultProps = {
  children: 'children',
  label: 'name',
  isLeaf: "isLeaf",
};

// 监控栈帧变化，主动触发load
const loadNode = (node: any, resolve: any) => {
  if (props.frameId != "") {
    if (node.level == 0) {
      getVariablesByFrameId(props['frameId'], resolve);
    } else {
      getVariables(node.data.reference, resolve);
    }
  }
}

const getVariablesByFrameId = async (frameId: string, resolve: any) => {
  let result = await reqGetFrameVariables(key.value, frameId);
  if (result.code == 200) {
    let variables = result.data;
    let tree = [];
    for (let i in variables) {
      let treeNode = {
        name: `${variables[i].name}(${variables[i].type})`,
        reference: variables[i].reference,
        children: [],
        isLeaf: variables[i].reference == "",
      };
      if (variables[i].value != "") {
        treeNode.name = `${treeNode.name}:${variables[i].value}`
      }
      tree.push(treeNode);
    }
    resolve(tree);
  }
};

const getVariables = async (reference: string, resolve: any) => {
  console.log(reference)
  let result = await reqGetVariables(key.value, reference);
  if (result.code == 200) {
    let variables = result.data;
    let tree = [];
    for (let i in variables) {
      let treeNode = {
        name: `${variables[i].name}(${variables[i].type})`,
        id: `${reference}-${variables[i].name}`,
        children: [],
        isLeaf: variables[i].reference == "",
      };
      if (variables[i].value != "") {
        treeNode.name = `${treeNode.name}:${variables[i].value}`
      }
      // 如果子节点不为空，重新设置id为reference
      if (variables[i].reference != "") {
        treeNode.id = variables[i].reference
      }
      tree.push(treeNode);
    }
    resolve(tree);
  }
};

// 主动更新
const updateVariables = (frameId: string) => {
  getVariablesByFrameId(frameId, (tree: any) => {
      treeData.value = tree;
  });
}

// 监控栈帧变化，如果变化则重新加载数据
watch(
  () => props.frameId,
  () => {
    updateVariables(props.frameId);
  }
)

// 重新编译也需要进行更新
watch(
  () => isDebug.value,
  () => {
    if (isDebug.value) {
      if (props['frameId'] != "") {
        updateVariables(props['frameId']);
      }
    }
  }
)

defineExpose({
  updateVariables,
});

</script>

<style lang="scss" scoped>
</style>
