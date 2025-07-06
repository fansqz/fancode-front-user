<template>
  <div class="visual_contaner">
    <div class="visaul" id="visaul" @wheel="handleScroll"> </div>
    <div class="zoom-controls">
      <button
        class="zoom-btn"
        @mousedown="startContinuousZoom(1)"
        @mouseup="stopContinuousZoom"
        @mouseleave="stopContinuousZoom"
        >+</button
      >
      <button
        class="zoom-btn"
        @mousedown="startContinuousZoom(-1)"
        @mouseup="stopContinuousZoom"
        @mouseleave="stopContinuousZoom"
        >-</button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import './layouter/link-list.ts'
  import './layouter/graph.ts'
  import './layouter/array.ts'
  import './layouter/binary-tree.ts'
  import { SV, Sources, Engine } from 'structv2'
  import { onMounted, watch, toRefs, onUnmounted } from 'vue'

  const props = defineProps<{
    sources: Sources
    action: boolean
  }>()
  const { sources, action } = toRefs(props)
  let cur: Engine
  let container: HTMLElement | null
  let zoomTimer: number | null = null
  const ZOOM_INTERVAL = 50 // 每50ms执行一次缩放

  onMounted(() => {
    container = document.getElementById('visaul')
    // 监控source变化，更新资源
    watch(
      () => sources.value,
      () => {
        updateVisualView(sources.value)
      },
    )

    // 监控可视化启动
    watch(
      () => action.value,
      () => {
        if (action.value) {
          updateVisualView(sources.value)
        } else {
          updateVisualView(null)
        }
      },
    )
  })

  onUnmounted(() => {
    disposeVisualView()
    stopContinuousZoom() // 确保在组件卸载时清除定时器
  })

  // 更新可视化数据
  const updateVisualView = (sources: Sources) => {
    if (sources == null || sources == undefined) {
      disposeVisualView()
      return
    }
    let isForce = false
    Object.keys(sources).forEach((key) => {
      if (sources[key].isForce == true) {
        isForce = true
      }
    })
    // 可视化视图为空则初始化
    if (cur == null || cur == undefined) {
      cur = SV(
        container,
        {
          view: {
            groupPadding: 0,
            fitCenter: true,
            centerOffsetYPercent: -0.2,
          },
        },
        isForce,
      )
    }
    cur.render(sources)
  }

  /**
   * 销毁可视化视图
   */
  const disposeVisualView = () => {
    if (cur != null) {
      cur.destroy()
      cur = null
    }
  }

  /**
   * 调整可视化视图尺寸
   */
  const resizeVisualView = (width: number, height: number) => {
    if (cur) {
      cur.resize(width, height)
    }
  }

  // 处理滚轮事件
  const handleScroll = (event) => {
    // ctrl + 滚轮放大缩小图像
    if (event.ctrlKey) {
      event.preventDefault()
      if (event.deltaY > 0) {
        resizeZoom(1)
      } else {
        resizeZoom(-1)
      }
    }
  }

  // 放大和缩小可视化结构
  const resizeZoom = (increment: number) => {
    if (cur == null) {
      return
    }
    // 获取当前视图的缩放级别
    const currentZoom = cur.getGraphInstance().getZoom()
    // 计算新的缩放级别
    const newZoom = currentZoom + increment / 100
    // 设置新的缩放级别
    cur.getGraphInstance().zoomTo(newZoom)
  }

  // 开始持续缩放
  const startContinuousZoom = (increment: number) => {
    // 立即执行一次缩放
    resizeZoom(increment)

    // 设置定时器持续缩放
    zoomTimer = window.setInterval(() => {
      resizeZoom(increment)
    }, ZOOM_INTERVAL)
  }

  // 停止持续缩放
  const stopContinuousZoom = () => {
    if (zoomTimer !== null) {
      clearInterval(zoomTimer)
      zoomTimer = null
    }
  }

  defineExpose({
    resizeVisualView,
  })
</script>

<style lang="scss" scoped>
  .visual_contaner {
    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100% !important;
    padding: 0;
    margin: 0;

    .visaul {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .zoom-controls {
      position: absolute;
      right: 20px;
      bottom: 300px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .zoom-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        font-size: 18px;
        font-weight: 500;
        color: #333;
        cursor: pointer;
        user-select: none;
        background: rgb(255 255 255 / 90%);
        backdrop-filter: blur(8px);
        border: none;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          background: rgb(255 255 255 / 100%);
          box-shadow: 0 4px 12px rgb(0 0 0 / 12%);
          transform: translateY(-1px);
        }

        &:active {
          box-shadow: 0 2px 6px rgb(0 0 0 / 8%);
          transform: translateY(1px);
        }

        &::before {
          position: absolute;
          inset: 0;
          padding: 1px;
          content: '';
          background: linear-gradient(135deg, rgb(255 255 255 / 40%), rgb(255 255 255 / 10%));
          border-radius: 8px;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: xor;
          mask-composite: exclude;
        }
      }
    }
  }
</style>
