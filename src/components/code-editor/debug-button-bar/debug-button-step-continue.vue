<template>
  <div
    :class="{ button: true, 'button-show': buttonShow }"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <i
      :class="{
        iconfont: true,
        'icon-continue1': type == 'continue',
        'icon-step-in': type == 'step-in',
        'icon-step-out': type == 'step-out',
        'icon-step': type == 'step-over',
        able: able && type != 'continue',
        cable: able && type == 'continue',
        unable: !able,
      }"
      @click="handleStep"
    ></i>
  </div>
</template>

<script setup lang="ts">
  import { reqContinue, reqStepIn, reqStepOut, reqStepOver } from '@/api/debug/index.ts';
  import useDebugStore from '@/store/modules/debug';
  import { ref, toRefs, watch } from 'vue';
  import { storeToRefs } from 'pinia';

  let props = defineProps<{
    type: string;
  }>();
  let { type } = toRefs(props);
  const debugStore = useDebugStore();
  let { stopped, isDebug } = storeToRefs(debugStore);
  // 判断按钮是出于可执行还是不可执行状态
  let able = ref(false);
  watch(
    () => isDebug.value,
    () => {
      if (isDebug.value == false) {
        able.value = false;
      }
    },
  );
  watch(
    () => stopped.value,
    () => {
      if (stopped.value == true) {
        able.value = true;
      } else {
        able.value = false;
      }
    },
  );
  const handleStep = async () => {
    if (type.value == 'continue') {
      reqContinue(debugStore.key);
    } else if (type.value == 'step-in') {
      reqStepIn(debugStore.key);
    } else if (type.value == 'step-out') {
      reqStepOut(debugStore.key);
    } else if (type.value == 'step-over') {
      reqStepOver(debugStore.key);
    }
  };

  let buttonShow = ref(false);
  const mouseover = () => {
    // 鼠标经过显示按钮
    buttonShow.value = able.value;
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
    .cable {
      color: rgb(1, 171, 18);
      transition: color 0.2s;
    }
    .able {
      color: rgb(37, 149, 210);
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
