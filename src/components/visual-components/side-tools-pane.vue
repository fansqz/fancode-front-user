<template>
  <div
    :class="{
      'side-tool': true,
      'side-tool--dark': darkMode,
    }"
  >
    <ul>
      <li
        class="side-tool-item"
        :title="'调整布局模式：' + (layoutMode === 'ver' ? '水平' : '垂直')"
        @click="relayout"
      >
        <i
          :class="{
            'fas fa-arrows-alt-h fa-sm': true,
            ver: layoutMode === 'ver',
          }"
        ></i>
      </li>
      <li
        :class="{
          'side-tool-item': true,
          'side-tool-item--active': enableBruchSelect,
        }"
        :title="'框选：' + (enableBruchSelect ? '关闭' : '开启')"
        @click="switchBruchSelect"
      >
        <i :class="'fas fa-vector-square fa-sm'"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Visualizer } from './visualizer';

  export default {
    props: {
      defaultLayoutMode: {
        type: String,
      },
    },
    data() {
      return {
        enableBruchSelect: false,
        layoutMode: this.defaultLayoutMode,
      };
    },
    computed: {
      darkMode() {
        return this.$store.state.darkMode;
      },
    },
    watch: {
      defaultLayoutMode(newMode) {
        this.layoutMode = newMode;
      },
    },
    methods: {
      // 触发重新布局
      relayout() {
        this.layoutMode = this.layoutMode === 'hor' ? 'ver' : 'hor';
        Visualizer.instance.reLayout(this.layoutMode);
      },
      // 开启框选模式
      switchBruchSelect() {
        this.enableBruchSelect = !this.enableBruchSelect;
        Visualizer.instance.switchBrushSelect(this.enableBruchSelect);
      },
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  .side-tool {
    position: absolute;
    border: 1px solid #ddd;
    background-color: #fff;
    top: 8px;
    right: 8px;
    border-radius: 4px;
    border-radius: 4px;
  }

  .side-tool--dark {
    background-color: #808080;
  }

  .side-tool > ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
  }

  .side-tool-item {
    display: flex !important;
    align-items: center;
    list-style: none;
    cursor: pointer;
    text-align: center;
    padding: 8px;
    border-right: 1px solid #ddd;
    user-select: none;
    color: #666;
    font-size: 14px;
  }

  .side-tool-item > i {
    transition: transform 0.2s ease-in-out;
  }

  .side-tool-item > .ver {
    transform: rotateZ(90deg);
  }

  .side-tool--dark .side-tool-item {
    border: none;
    color: #fafafa;
  }

  .side-tool-item:hover,
  .side-tool-item--active {
    background-color: #ddd;
  }

  .side-tool--dark .side-tool-item:hover {
    background-color: #aaa;
    color: #fafafa;
  }

  .side-tool--dark .side-tool-item--active {
    background-color: #aaa;
    color: #fafafa;
  }

  .hide {
    opacity: 0.4;
  }
</style>
