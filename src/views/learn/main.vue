<template>
  <splitpanes
    class="default-theme main"
    @resized="resizeVisualPane"
    :dbl-click-splitter="false"
    :push-other-panes="false"
  >
    <!--题目展示-->
    <pane @resized="resizeVisualPane">
      <div class="document">
        <el-menu
          :default-active="activeIndex"
          class="menu"
          mode="horizontal"
          :ellipsis="false"
          @select="handleSelect"
        >
          <el-menu-item index="0">文档</el-menu-item>
          <el-menu-item index="1">可视化</el-menu-item>
        </el-menu>
        <div class="main" ref="main">
          <ProblemDescription :content="content" v-if="activeIndex == '0'" />
          <StructVisual ref="structVisual" v-if="activeIndex == '1'" />
        </div>
      </div>
    </pane>

    <!--coding-->
    <pane>
      <splitpanes horizontal :dbl-click-splitter="false" :push-other-panes="false">
        <pane size="70">
          <!--选择语言或者主题区域-->
          <EditorSelector class="editor-switcher" />
          <!--代码编辑区域-->
          <Editor class="editor" @onChangeValue="handleCodeChange" @onUpdateBP="" />
        </pane>
        <pane size="30">
          <!--控制台-->
          <Console
            class="console"
            :userInput="false"
            :userOutput="false"
            :terminal="true"
            :debugButton="true"
          />
        </pane>
      </splitpanes>
    </pane>
  </splitpanes>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';
  import 'splitpanes/dist/splitpanes.css';
  import Editor from '@/components/code-editor/editor/index.vue';
  import EditorSelector from '@/components/code-editor/language-theme-switcher/index.vue';
  import Console from '@/components/code-editor/console/index.vue';
  import ProblemDescription from '@/components/code-visual/document/index.vue';
  import StructVisual from './visual.vue';
  import { reqVisualDocument } from '@/api/visual-document/index.ts';
  import { storeToRefs } from 'pinia';
  import useCodingStore from '@/store/modules/coding.ts';
  import useVisualDocumentStore from '@/store/modules/visual-document';
  import useVisualStore from '@/store/modules/visual';
  import useDebugStore from '@/store/modules/debug';

  const activeIndex = ref('0');
  const handleSelect = (key: string) => {
    activeIndex.value = key;
  };

  let codingStore = useCodingStore();
  let visualDocumentStore = useVisualDocumentStore();
  let visualStore = useVisualStore();
  let debugStore = useDebugStore();

  let { code, languages, language } = storeToRefs(codingStore);
  let { id, content, codeList } = storeToRefs(visualDocumentStore);
  let { action, descriptionType } = storeToRefs(visualStore);
  let { breakpoints } = storeToRefs(debugStore);

  const load = async () => {
    let result = await reqVisualDocument(id.value);
    if (result.code == 200) {
      let data = result.data;
      content.value = data.content;
      // 设置codeList
      let list: any[] = [];
      for (let i = 0; i < result.data.codeList.length; i++) {
        const codeItem = result.data.codeList[i];
        // 反序列化 setting 属性
        list.push({
          visualSetting: JSON.parse(codeItem.visualSetting),
          code: codeItem.code,
          language: codeItem.language,
          breakpoints: codeItem.breakpoints,
        });
      }
      codeList.value = list;
      // 设置可选的语言
      languages.value = [];
      for (let code of codeList.value) {
        languages.value.push(code.language);
      }
      if (codeList.value.length > 0) {
        let firstCode = codeList.value[0];
        // 设置第一个语言
        language.value = languages.value[0];
        // 设置代码
        code.value = firstCode.code;
        // 设置可视化
        action.value = true;
        descriptionType.value = firstCode.visualSetting.type;
        visualStore.setDescription(descriptionType.value, firstCode.visualSetting.description);
        // 设置断点
        breakpoints.value = firstCode.breakpoints;
      }
    }
  };

  const handleCodeChange = (value: string, _type: string) => {
    code.value = value;
  };

  const handleLanguageChange = () => {
    for (let visualCode of codeList.value) {
      if (visualCode.language == language.value) {
        action.value = true;
        code.value = visualCode.code;
        descriptionType.value = visualCode.visualSetting.type;
        visualStore.setDescription(descriptionType.value, visualCode.visualSetting.description);
        breakpoints.value = visualCode.breakpoints;
      }
    }
  };

  /**
   * 当拉伸/缩放可视化面板时调用
   * - 当可视化面板尺寸发生变化时，需重新调整可视化视图
   */
  const resizeVisualPane = () => {
    // leftPane.value.resizeVisualView();
  };

  onMounted(() => {
    load();

    watch(
      () => id.value,
      () => {
        load();
      },
    );

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
    .document {
      height: 100%;
      width: 100%;
      .menu {
        user-select: none;
        height: 35px;
      }
      .main {
        height: calc(100% - 35px);
      }
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
      .horizontal-list {
        position: relative; /*设置层级需定位 */
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding-right: 15px;
        background-color: $base-header-background;
        box-sizing: border-box;
        border-top: 1px solid $base-border-color;
        .li {
          position: relative; /*设置层级需定位 */
          margin: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
