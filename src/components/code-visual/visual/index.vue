<template>
  <div class="visual_contaner">
    <div class="visaul" id="visaul" @wheel="handleScroll"> </div>
  </div>
</template>

<script setup lang="ts">
  import './layouter/link-list.ts';
  import './layouter/graph.ts';
  import './layouter/array.ts';
  import './layouter/binary-tree.ts';
  import { SV, Sources, Engine } from 'structv2';
  import { onMounted, watch, toRefs, onUnmounted } from 'vue';

  const props = defineProps<{
    sources: Sources;
    action: boolean;
  }>();
  const { sources, action } = toRefs(props);
  let cur: Engine;
  let container: HTMLElement | null;
  onMounted(() => {
    container = document.getElementById('visaul');
    // 监控source变化，更新资源
    watch(
      () => sources.value,
      () => {
        console.log(sources.value);
        updateVisualView(sources.value);
      },
    );

    // 监控可视化启动
    watch(
      () => action.value,
      () => {
        if (action.value) {
          updateVisualView(sources.value);
        } else {
          updateVisualView(null);
        }
      },
    );
  });

  onUnmounted(() => {
    disposeVisualView();
  });

  // 更新可视化数据
  const updateVisualView = (sources: Sources) => {
    if (sources == null || sources == undefined) {
      disposeVisualView();
      return;
    }
    let isForce = false;
    Object.keys(sources).forEach((key) => {
      if (sources[key].isForce == true) {
        isForce = true;
      }
    });
    // 可视化视图为空则初始化
    if (cur == null || cur == undefined) {
      cur = SV(
        container,
        {
          view: {
            groupPadding: 0,
          },
        },
        isForce,
      );
    }
    cur.render(sources);
  };

  /**
   * 销毁可视化视图
   */
  const disposeVisualView = () => {
    if (cur != null) {
      cur.destroy();
      cur = null;
    }
  };

  /**
   * 调整可视化视图尺寸
   */
  const resizeVisualView = (width: number, height: number) => {
    if (container) {
      cur.resize(width, height);
    }
  };

  // 处理滚轮事件
  const handleScroll = (event) => {
    // ctrl + 滚轮放大缩小图像
    if (event.ctrlKey) {
      event.preventDefault();
      if (event.deltaY > 0) {
        resizeZoom(1);
      } else {
        resizeZoom(-1);
      }
    }
  };

  // 放大和缩小可视化结构
  const resizeZoom = (increment: number) => {
    if (cur == null) {
      return;
    }
    // 获取当前视图的缩放级别
    const currentZoom = cur.getGraphInstance().getZoom();
    // 计算新的缩放级别
    const newZoom = currentZoom + increment / 100;
    // 设置新的缩放级别
    cur.getGraphInstance().zoomTo(newZoom);
  };

  defineExpose({
    resizeVisualView,
  });
</script>

<style lang="scss" scoped>
  .visual_contaner {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100% !important;
    margin: 0;
    padding: 0;
    .visaul {
      position: absolute;
      top: 0px;
      height: 100%;
      width: 100%;
    }
    .option {
      position: absolute;
      bottom: 100px;
    }
  }
</style>
