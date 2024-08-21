<template>
  <div class="container" id="container">
    <div id="leak">
      <span>泄漏区</span>
    </div>
  </div>

  <button id="btn-prev">prev</button>
  <button id="btn-next">next</button>
  <button id="resize">resize</button>
  <button id="relayout">relayout</button>
  <button id="switch-mode">switch mode</button>
  <button id="brush-select">brush-select</button>
  <span id="pos"></span>
</template>

<script setup lang="ts">
  import './Layouter/BinaryTree.ts';
  import './Layouter/Stack.ts';
  import './Layouter/Array.ts';
  import './Layouter/Force.ts';
  import './Layouter/IndentedTree.ts';
  import { SOURCES_DATA } from './data.ts';
  import { SV } from 'structv2';
  import { onMounted } from 'vue';

  onMounted(() => {
    let isForce = false;

    let dataIndex = 0;
    let curData = SOURCES_DATA[dataIndex];
    // 判断是否需要力导向布局
    Object.keys(curData).forEach((key) => {
      if (curData[key].layouter === 'Force') isForce = true;
    });
    let cur = SV(
      document.getElementById('container'),
      {
        view: {
          leakAreaHeight: 130,
          groupPadding: 40,
        },
      },
      isForce,
    );

    let enableBrushSelect = false;

    const container = document.getElementById('container'),
      pos = document.getElementById('pos');

    const leak = document.getElementById('leak');

    cur.render(curData);

    document.getElementById('btn-next').addEventListener('click', (e) => {
      curData = SOURCES_DATA[++dataIndex];
      cur.render(curData);
    });

    document.getElementById('btn-prev').addEventListener('click', (e) => {
      curData = SOURCES_DATA[--dataIndex];
      cur.render(curData);
    });

    document.getElementById('resize').addEventListener('click', (e) => {
      container.style.height = 800 + 'px';
      cur.resize(container.offsetWidth, container.offsetHeight);
    });

    document.getElementById('relayout').addEventListener('click', (e) => {
      cur.reLayout();
    });

    document.getElementById('switch-mode').addEventListener('click', (e) => {
      cur.updateStyle('Array', newArrayOption);
    });

    document.getElementById('brush-select').addEventListener('click', (e) => {
      enableBrushSelect = !enableBrushSelect;
      cur.switchBrushSelect(enableBrushSelect);
    });

    cur.on('onLeakAreaUpdate', (payload) => {
      leak.style.opacity = payload.hasLeak ? 1 : 0;
      leak.style.top = payload.leakAreaY - 40 + 'px';
    });

    // -------------------------------------------------------------------------------------------------------

    container.addEventListener('mousemove', (e) => {
      let x = e.offsetX,
        y = e.offsetY;
      pos.innerHTML = `${x},${y}`;
    });
  });
</script>

<style lang="scss" scoped>
  .container {
    height: 500px;
    width: 100%;
  }
</style>
