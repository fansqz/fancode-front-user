<template>
  <div class="container">
    <!-- 自定义菜单 -->
    <div v-show="stackFrames.length != 0" class="custom-menu">
      <el-scrollbar class="scrollbar">
        <div
          v-for="(item, index) in stackFrames"
          :key="index"
          :class="{ 'menu-item': true, active: index === parseInt(defaultActive) }"
          @click="handleSelect(index.toString())"
        >
          <el-text class="menu-item-text">{{ item.name }}</el-text>
        </div>
      </el-scrollbar>
    </div>
    <div v-show="stackFrames.length == 0" class="no-data-show">
      <el-text class="text">not data</el-text>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { reqGetStackTrace } from '@/api/debug';
  import useDebugStore from '@/store/modules/debug';

  const debugStore = useDebugStore();
  let { id, status, currentFrameID, lineNum } = storeToRefs(debugStore);
  const emit = defineEmits(['selectFrame']);
  const defaultActive = ref('0');
  // 栈帧
  const stackFrames = ref<any[]>([]);

  const handleSelect = (key: string) => {
    // 点击某个栈帧，则回调selectFrame
    defaultActive.value = key;
    let frame = stackFrames.value[parseInt(key)];
    currentFrameID.value = frame.id;
    lineNum.value = frame.line;
  };

  onMounted(() => {
    watch(
      () => status.value,
      async (val) => {
        if (val == 'stopped') {
          currentFrameID.value = -1;
          // 程序暂停时需要更新栈帧
          let result = await reqGetStackTrace(id.value);
          if (result.code == 200) {
            stackFrames.value = result.data;
            handleSelect('0');
          }
        }
        if (val == 'terminated' || val == 'init' || val == 'compiled') {
          stackFrames.value = [];
          // 设置为-1，清空变量列表
          currentFrameID.value = -1;
        }
      },
    );
  });
</script>

<style lang="scss" scoped>
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    position: relative;
    margin: 0px;
    padding: 0px;
    .custom-menu {
      height: 100%;
      width: 100%;
      position: absolute;
      .scrollbar {
        height: 100%;
        width: 100%;
        .menu-item {
          height: 25px;
          padding-left: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          &:hover {
            background-color: #e8f0fe;
          }
          &.active {
            background-color: #d2e3fc;
            color: #1967d2;
            font-weight: 500;
          }
          .menu-item-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .no-data-show {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      .text {
        margin: auto;
      }
    }
  }
</style>
