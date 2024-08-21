<!-- <script setup lang="ts">
import useVisualizeStore from '@/store/modules/visual.ts';
import useDebugStore from '@/store/modules/debug.ts';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';
import { DebugEventDispatcher } from '@/api/debug/debug-event-dispatcher';
import { DebugEvent } from '@/api/debug/event';
import { reqVisualize } from '@/api/visual/index.ts';

const visualizeStore = useVisualizeStore();
const debugStore = useDebugStore();
const { descriptionJson, action } = storeToRefs(visualizeStore);
const { id } = storeToRefs(debugStore);

onMounted(() => {
  // 注册一些事件
  DebugEventDispatcher.on('stopped', onStopped);
});
onUnmounted(() => {
  DebugEventDispatcher.off('stopped', onStopped);
});

const onStopped = async (_data: DebugEvent) => {
  // 如果开启可视化
  if (action.value) {
    let description = JSON.parse(descriptionJson.value);
    if (description.type === undefined) {
      return;
    }
    let resp = await reqVisualize({
      id: id.value,
      type: description.type,
      description: description,
    });
    console.log(resp);
  }
};

</script> -->

<!-- <style lang="scss" scoped>
  #wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    transition: all 0.25s ease;
  }

  .light-wrapper {
    background-color: #fafafa;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .dark-wrapper {
    background-color: #2f2f2f;
    border-bottom: 1px solid #333;
    border-right: 1px solid #333;
    border-top: 1px solid #333;
  }

  #container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #leak-area {
    position: absolute;
    left: 0;
    top: 100px;
    opacity: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 4px;
    pointer-events: none;
    transition: opacity 0.5s ease-in-out;
  }

  .light-leak-area {
    border-top: 1px dashed #333;
    color: #333;
  }

  .dark-leak-area {
    border-top: 1px dashed #ccc;
    color: #ccc;
  }

  .visual-info-container {
    position: absolute;
    left: 8px;
    top: 8px;
    background-color: transparent;
  }

  .element-data-input-board {
    padding: 10px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  .element-data-input-board > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-bottom: 6px;
  }

  .element-data-input-board input {
    width: 80px;
  }
</style> -->
