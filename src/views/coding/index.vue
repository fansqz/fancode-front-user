<template>
  <splitpanes
    class="default-theme main"
    @resized="resizeVisualPane"
    :dbl-click-splitter="false"
    :push-other-panes="false"
  >
    <pane @resized="resizeVisualPane">
      <LeftPane ref="leftPane" class="left-pane" :content="document" />
    </pane>

    <!--coding-->
    <pane>
      <splitpanes horizontal :dbl-click-splitter="false" :push-other-panes="false">
        <pane size="70">
          <!--选择语言或者主题区域-->
          <EditorSelector class="editor-switcher" />
          <!--代码编辑区域-->
          <Editor class="editor" @onChangeValue="handleCodeChange" />
        </pane>
        <pane size="30">
          <!--控制台-->
          <Console
            :userInput="false"
            :userOutput="false"
            :terminal="true"
            :debugButton="true"
            class="console"
          />
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import LeftPane from './left-pane/index.vue';
  import Editor from '@/components/code-editor/editor/index.vue';
  import EditorSelector from '@/components/code-editor/language-theme-switcher/index.vue';
  import Console from '@/components/code-editor/console/index.vue';
  import { reqProblemTemplateCode } from '@/api/problem';
  import { reqVisaulDocument } from '@/api/visual';
  import { storeToRefs } from 'pinia';
  import useCodingStore from '@/store/modules/coding.ts';
  import useDebugStore from '@/store/modules/debug';

  let document = ref('');
  let codingStore = useCodingStore();
  let debugStore = useDebugStore();
  let { code, languages, language } = storeToRefs(codingStore);
  let { breakpoints } = storeToRefs(debugStore);
  const leftPane = ref<InstanceType<typeof LeftPane> | null>();

  const load = async () => {
    languages.value = ['go'];
    language.value = 'go';
    // 设置代码
    let userCode = localStorage.getItem('code');
    if (userCode) {
      code.value = userCode;
    } else {
      let result = await reqProblemTemplateCode('go');
      if (result.code == 200) {
        code.value = result.data;
      }
    }
    // 设置断点
    breakpoints.value = [];

    // 读取文本
    let result = await reqVisaulDocument();
    if (result.code == 200) {
      document.value = result.data;
    }
  };
  load();

  const handleCodeChange = (value: string, _type: string) => {
    code.value = value;
    localStorage.setItem('code', value);
  };

  /**
   * 当拉伸/缩放可视化面板时调用
   * - 当可视化面板尺寸发生变化时，需重新调整可视化视图
   */
  const resizeVisualPane = () => {
    leftPane.value.resizeVisualView();
  };
</script>

<style scoped lang="scss">
  .main {
    position: relative;
    height: calc(100vh - $base-header-height);
    .left-pane {
      height: 100%;
      widows: 100%;
    }
    .editor-switcher {
      position: relative;
      height: 35px;
      width: 100%;
    }
    .editor {
      position: relative;
      height: calc(100% - 35px);
      width: 100%;
    }
    .debug-button-bar {
      right: 0%;
      bottom: 50%;
    }
    .console {
      position: relative;
      height: 100%;
    }
    .code-button-bar {
      position: relative;
      height: calc(40px);
    }
  }
</style>
