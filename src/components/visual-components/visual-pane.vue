<template>
  <div id="wrapper" :class="darkMode ? 'dark-wrapper' : 'light-wrapper'">
    <div id="container" style="width: 100%; height: 100%">
      <div id="leak-area" :class="darkMode ? 'dark-leak-area' : 'light-leak-area'">
        <span>泄漏区</span>
      </div>
    </div>

    <div class="visual-info-container">
      <floatExternalTable ref="floatExternalTable" :externalList="externalList" />
      <div v-if="curSelectElementId !== null" class="element-data-input-board">
        <div>
          <span>id：</span>
          <span>{{ curSelectElementId.id }}</span>
        </div>
        <div>
          <span>data：</span>
          <span><input v-model="curSelectElementDataLabel" type="text" /></span>
        </div>
      </div>
    </div>
    <sideToolsPane ref="sideToolsPane" :defaultLayoutMode="layoutMode" />
  </div>
</template>

<script>
  /* eslint-disable no-mixed-operators */
  import { Visualizer, FloatExternalAnalyse, Layouts } from './visualizer';
  import { THEMES_DATA, CURRENT_THEME } from './defaultOptions';
  import floatExternalTable from './float-external-table.vue';
  import sideToolsPane from './side-tools-pane.vue';
  import { mapActions, mapMutations, mapGetters } from 'vuex';

  const curSelectData = { node: null };

  export default {
    components: {
      floatExternalTable,
      sideToolsPane,
    },
    data() {
      return {
        // 外部变量信息队列
        externalList: [],
        curSelectElementDataLabel: '',
        needShowLeakBoard: false,
        layoutMode: 'hor',
      };
    },
    computed: {
      darkMode() {
        return this.$store.state.darkMode;
      },
      visualData() {
        return this.$store.state.visualData;
      },
      curSelectElementId() {
        return this.$store.state.curSelectElementId;
      },
      hasTriggerLastStep() {
        return this.$store.state.hasTriggerLastStep;
      },
      ...mapGetters(['curHideElementIdArr']),
    },
    // 监听 props
    watch: {
      darkMode(new1Val) {
        if (Visualizer.instance === null) {
          return;
        }

        if (newVal) {
          CURRENT_THEME.value = { ...THEMES_DATA.dark };
        } else {
          CURRENT_THEME.value = { ...THEMES_DATA.light };
        }

        const sources = this.visualData.sources;
        Object.keys(sources).forEach((key) => {
          const newOptions = Layouts[sources[key].layouter].defineOptions();
          Visualizer.instance.updateStyle(key, newOptions);
        });
      },
      visualData(newVal) {
        this.updateVisualView(newVal.sources);
      },
      curSelectElementId(newVal) {
        if (Visualizer.instance === null) {
          return;
        }

        if (newVal) {
          const targetElement = Visualizer.instance.findNode(newVal.id);
          if (targetElement) {
            const dataLabel = targetElement.get('label');
            this.curSelectElementDataLabel = dataLabel;
            this.selectElement(targetElement);
          }
        } else {
          this.selectElement(null);
          this.curSelectElementDataLabel = '';
        }
      },
      curSelectElementDataLabel(newVal) {
        if (curSelectData.node) {
          curSelectData.node.set('label', newVal);
        }
      },
      curHideElementIdArr: {
        handler(val) {
          if (Visualizer.instance === null) {
            return;
          }

          Visualizer.instance.hideGroupsById(val);
        },
        deep: true,
      },
    },
    mounted() {
      //初始化curHideElementIdArr
      this.setCurHideElementIdArr({
        data: [],
        type: 'begin',
      });

      const leakArea = document.getElementById('leak-area');

      setTimeout(() => {
        this.updateVisualView(this.visualData.sources);

        if (Visualizer.instance) {
          // 监听click事件，处理节点点击
          Visualizer.instance.on('node:click', (node) => {
            if (node.getModelType() !== 'node') {
              return;
            }

            if (node === curSelectData.node) {
              this.setCurSelectElementId(null);
            } else {
              const id = node.getSourceId();
              this.setCurSelectElementId({
                id,
                origin: 'visual-panel',
              });
            }
          });

          Visualizer.instance.on('onLeakAreaUpdate', (payload) => {
            leakArea.style.opacity = payload.hasLeak ? 1 : 0;
            leakArea.style.top = payload.leakAreaY - 40 + 'px';
          });
        }
      }, 300);
    },
    unmounted() {
      this.disposeVisualView();
    },
    // 组件方法
    methods: {
      /**
       * 初始化可视化视图
       * @param sources
       */
      updateVisualView(sources) {
        console.log('可视化数据：', sources);
        // 源数据为空的情况不进行可视化
        if (sources === null || sources === undefined) {
          this.disposeVisualView();
          return;
        }

        if (sources.handleUpdate) {
          sources.handleUpdate.hasTriggerLastStep = this.hasTriggerLastStep;
        }

        this.layoutMode = 'hor';
        let isForce = false;

        Object.keys(sources).forEach((key) => {
          if (sources[key].layouter === 'Force') {
            isForce = true;
          }
        });

        // 创建Visualizer
        if (Visualizer.instance === null) {
          Visualizer.instance = Visualizer(
            document.getElementById('container'),
            {
              view: {
                groupPadding: 40,
                layoutMode: this.layoutMode,
              },
            },
            isForce,
          );
        }
        Visualizer.instance.render(sources, this.hasTriggerLastStep);
        this.updateExternalList(sources);
        this.setCurSelectElementId(null);
        // console.log("设置为false");
        // this.setHasTriggerLastStep(false);
      },

      /**
       * 更新外部变量信息队列
       * @param sources
       */
      updateExternalList(sources) {
        this.externalList = FloatExternalAnalyse(sources);
      },

      /**
       * 调整可视化视图尺寸
       */
      resizedVisualView() {
        if (Visualizer.instance) {
          const tabContent = document.getElementById('visualDesc');
          Visualizer.instance.resize(tabContent.offsetWidth, tabContent.offsetHeight);
        }
      },

      /**
       * 销毁可视化视图
       */
      disposeVisualView() {
        if (Visualizer.instance) {
          Visualizer.instance.destroy();
          Visualizer.instance = null;
          this.externalList = [];
        }

        curSelectData.node = null;
      },

      /**
       * 选中一个node
       */
      selectElement(node) {
        if (node !== null) {
          curSelectData.node = node;
        } else {
          curSelectData.node = null;
        }
      },
      ...mapMutations({
        setCurSelectElementId: 'SET_CUR_SELECT_ELEMENT_ID',
        setHasTriggerLastStep: 'SET_HAS_TRIGGER_LAST_STEP',
        setCurHideElementIdArr: 'SET_CUR_HIDE_ELEMENT_ID_ARR',
      }),
    },
  };
</script>

<style lang="scss" scoped>
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
</style>
