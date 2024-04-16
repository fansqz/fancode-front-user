<template>
  <div :class="{'button': true, 'button-show': buttonShow}"  
  @mouseover="mouseover"
  @mouseout="mouseout">
    <i :class="{
      'iconfont icon-indeterminate': true,
      'able': able,
      'unable': !able,
    }
    " @click="terminateDebug"></i>
  </div>
</template>

<script setup lang="ts">
  import { reqCloseDebugSession } from '@/api/debug/index.ts';
  import useDebugStore from '@/store/modules/debug';
  import { ref, watch } from 'vue'; 
  import { storeToRefs } from 'pinia';  
import { ElMessage } from 'element-plus';

  const debugStore = useDebugStore();
  let { isDebug } = storeToRefs(debugStore);

  // 判断按钮是出于可执行还是不可执行状态
  let able = ref(false);
  watch(() => isDebug.value, () => {
    able.value = isDebug.value;
  });

  let buttonShow = ref(false);
  const terminateDebug = async () => {
    let result = await reqCloseDebugSession(debugStore.key);
    if (result.code == 200) {
      isDebug.value = false;
    } else {
      ElMessage({
        showClose: true,
        message: result.message,
        type: 'error',
      });
    }
  };

  const mouseover = () => {
    // 鼠标经过显示按钮
    if (able.value) {
      buttonShow.value = true;
    }
  };
  const mouseout = () => {
    // 鼠标移出，隐藏按钮
    buttonShow.value = false;
  }; 
</script>

<style scoped lang="scss">
  .button {
    background-color: rgb(255, 255, 255);
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    .able {
      color:rgb(210, 57, 37);
      transition: color 0.2s;
    }
    .unable {
      color: grey;
      transition: color 0.2s;
    }
  }
  .button-show {
    background-color: rgb(227, 227, 227);
  }

</style>
