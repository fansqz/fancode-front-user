<template>
  <splitpanes
    class="default-theme main"
    @resized="resizeVisualPane"
    :dbl-click-splitter="false"
    :push-other-panes="false"
  >
    <pane>
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
          <Console :userInput="false" :userOutput="false" :terminal="true" class="console" />
          <!--coding-button-bar-->
          <CodeButtonBar :debug="true" :execute="true" :submit="false" class="code-button-bar" />
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import LeftPane from './left-pane/index.vue';
  import Editor from '@/components/code-editor/editor/index.vue';
  import EditorSelector from '@/components/code-editor/language-theme-switcher/index.vue';
  import Console from '@/components/code-editor/console/index.vue';
  import CodeButtonBar from '@/components/code-editor/coding-button/index.vue';
  import { storeToRefs } from 'pinia';
  import useCodingStore from '@/store/modules/coding.ts';
  import useDebugStore from '@/store/modules/debug';
  import useVisualStore from '@/store/modules/visual';
  import { languageConstants, supportedLanguages } from '@/constants/languages.ts';
  import { descriptions } from '@/constants/description.ts';
  import { VisualSetting } from '@/api/visual-document/type.ts';

  let document = ref('');
  let codingStore = useCodingStore();
  let debugStore = useDebugStore();
  let visualStore = useVisualStore();
  let { code, language, languages } = storeToRefs(codingStore);
  let { breakpoints } = storeToRefs(debugStore);
  type configType = {
    code: string;
    language: languageConstants;
    breakpoints: number[];
    visualSetting: VisualSetting;
  };
  let config: configType = {
    code: '',
    language: languageConstants.C,
    breakpoints: [],
    visualSetting: {
      type: descriptions.Array,
      description: {},
    },
  };
  const leftPane = ref<InstanceType<typeof LeftPane> | null>();
  language.value = languageConstants.GO;
  languages.value = supportedLanguages;

  const loadCode = async () => {
    // 设置代码
    let codeConfigJson = localStorage.getItem('code-' + language.value);
    let parseSuccess = false;
    // 读取本地文件
    if (codeConfigJson) {
      try {
        config = JSON.parse(codeConfigJson);
        console.log(config);
        parseSuccess = true;
      } catch (error) {}
    }
    // 读取配置
    if (!parseSuccess) {
      let codeConfigsJson = await (await fetch(`/document/visual-learn-config.json`)).text();
      let codeConfigs: configType[] = JSON.parse(codeConfigsJson);
      for (let codeConfig of codeConfigs) {
        if (codeConfig.language == language.value) {
          config = codeConfig;
        }
      }
      config.code = await (await fetch(`/document/visual-learn-code.${language.value}`)).text();
    }
    // 配置
    code.value = config.code;
    breakpoints.value = config.breakpoints;
    visualStore.setDescription(config.visualSetting.type, config.visualSetting.description);
    document.value = await (await fetch(`/document/visual-learn-document.md`)).text();
  };

  const saveCode = () => {
    localStorage.setItem('code-' + config.language, JSON.stringify(config));
  };

  const handleCodeChange = (_value: string, _type: string) => {
    saveCode();
  };

  const handleLanguageChange = () => {
    // 切换语言，则切换代码内容
    loadCode();
  };

  /**
   * 当拉伸/缩放可视化面板时调用
   * - 当可视化面板尺寸发生变化时，需重新调整可视化视图
   */
  const resizeVisualPane = () => {
    leftPane.value.resizeVisualView();
  };

  onMounted(async () => {
    await loadCode();
    watch(
      () => language.value,
      () => {
        handleLanguageChange();
      },
    );
  });
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
      height: calc(100% - 40px);
    }
    .code-button-bar {
      position: relative;
      height: calc(40px);
    }
    .code-button-bar {
      position: relative;
      height: calc(40px);
    }
  }
</style>
