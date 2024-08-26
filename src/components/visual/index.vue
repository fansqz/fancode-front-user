<template>
  <div class="visual_contaner">
    <div class="visaul" id="visaul">
      <div id="leak"></div>
    </div>
    <div class="option">
      <button id="btn-prev">prev</button>
      <button id="btn-next">next</button>
      <button id="resize">resize</button>
      <button id="relayout">relayout</button>
      <button id="switch-mode">switch mode</button>
      <button id="brush-select">brush-select</button>
      <span id="pos"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import './layouter/indented-tree.ts';
  import './layouter/force.ts';
  import './layouter/array.ts';
  import { SV, Sources, Engine } from 'structv2';
  import { onMounted, watch, toRefs } from 'vue';

  const props = defineProps<{
    sources: Sources;
    action: boolean;
  }>();
  const { sources, action } = toRefs(props);

  let cur: Engine;
  let container: HTMLElement | null;
  onMounted(() => {
    let isForce = false;
    cur = SV(
      document.getElementById('visaul'),
      {
        view: {
          groupPadding: 40,
        },
      },
      isForce,
    );
    container = document.getElementById('visaul');
    const pos = document.getElementById('pos');

    const leak = document.getElementById('leak');

    if (props.action) {
      cur.render(props.sources);
    }

    cur.on('onLeakAreaUpdate', (payload) => {
      leak.style.opacity = payload.hasLeak ? '1' : '0';
      leak.style.top = payload.leakAreaY - 40 + 'px';
    });

    container.addEventListener('mousemove', (e) => {
      let x = e.offsetX,
        y = e.offsetY;
      pos.innerHTML = `${x},${y}`;
    });

    watch(
      () => sources.value,
      () => {
        console.log(sources);
        if (action.value) {
          cur.render(sources.value);
        }
      },
    );

    watch(
      () => action.value,
      () => {
        if (action.value) {
          cur.render(sources.value);
        } else {
          cur.render({});
        }
      },
    );
  });

  /**
   * 销毁可视化视图
   */
  let disposeVisualView = () => {
    if (cur) {
      cur.destroy();
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
    #leak {
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
    .option {
      position: absolute;
      bottom: 100px;
    }
  }
</style>
