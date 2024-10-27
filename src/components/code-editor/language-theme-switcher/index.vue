<template>
  <div class="menu">
    <div class="left">
      <!--语言选择-->
      <el-select
        class="language-select"
        v-model="language"
        placeholder="Select"
        size="small"
        @change="languageChange"
      >
        <el-option v-for="item in languages" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <div class="right">
      <el-button type="info" icon="RefreshRight" @click="reloadCode" text />
      <!--主题选择-->
      <el-select class="theme-select" v-model="theme" placeholder="Select" size="small">
        <el-option v-for="item in themeList" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { getAllTheme } from '../editor/theme';
  import { reqProblemTemplateCode, reqUserCode } from '@/api/problem';
  import useCodingStore from '@/store/modules/coding';
  let codingStore = useCodingStore();

  // 主题列表
  let themeList = ref(getAllTheme());
  let { theme, code, editorUpdateCode, language, languages, problemId } = storeToRefs(codingStore);
  theme.value = 'monokai-light';

  const languageChange = () => {
    getUserCode();
  };

  // 重新加载代码
  const reloadCode = async () => {
    let result = await reqProblemTemplateCode(problemId.value, language.value);
    if (result.code == 200) {
      code.value = result.data;
      editorUpdateCode.value++;
    }
  };

  // 读取用户代码
  const getUserCode = async () => {
    let result = await reqUserCode(problemId.value, language.value);
    if (result.code == 200) {
      code.value = result.data;
      editorUpdateCode.value++;
    }
  };
</script>

<style scoped lang="scss">
  .menu {
    .left {
      position: absolute;
      height: 35px;
      width: 100%;
      background-color: $base-header-background;
      box-sizing: border-box;
      border-bottom: 1px solid $base-border-color;
      display: flex;
      align-items: center;
      .language-select {
        width: 150px;
        margin-left: 30px;
        margin-right: 7px;
      }
    }
    .right {
      position: absolute;
      right: 10px;
      .theme-select {
        width: 120px;
      }
    }
  }
</style>
