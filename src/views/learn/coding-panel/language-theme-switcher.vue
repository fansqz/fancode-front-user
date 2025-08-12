<template>
  <div class="menu">
    <div class="left">
      <!--语言选择-->
      <el-select class="language-select" v-model="language" placeholder="Select" size="small">
        <el-option v-for="item in languages" :key="item" :value="item"
          ><div class="language-item">{{ item }}</div></el-option
        >
      </el-select>
    </div>
    <div class="right">
      <el-button type="info" icon="RefreshRight" class="action-button" @click="reloadCode" text />
      <!--查看保存的代码按钮-->
      <el-button
        type="primary"
        icon="Document"
        class="action-button"
        @click="showSavedCodeModal"
        text
      />
      <!--主题选择-->
      <el-select class="theme-select" v-model="theme" placeholder="Select" size="small">
        <el-option v-for="item in themeList" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { getAllTheme } from '@/components/code-editor/editor/themes'
  import { reqProblemTemplateCode } from '@/api/problem'
  import useCodingStore from '@/store/modules/coding'

  const emit = defineEmits<{
    (e: 'showSavedCode'): void
    (e: 'saveCurrentCode'): void
  }>()

  let codingStore = useCodingStore()

  // 主题列表
  let themeList = ref(getAllTheme())
  let { theme, code, language, languages } = storeToRefs(codingStore)
  theme.value = themeList.value[0]

  // 重新加载代码
  const reloadCode = async () => {
    let result = await reqProblemTemplateCode(language.value)
    if (result.code == 200) {
      code.value = result.data
    }
  }

  // 显示保存代码模态框
  const showSavedCodeModal = () => {
    emit('showSavedCode')
  }

  // 保存当前代码
  const saveCurrentCode = () => {
    emit('saveCurrentCode')
  }
</script>

<style scoped lang="scss">
  .menu {
    .left {
      position: absolute;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 100%;
      height: 35px;
      background-color: $base-header-background;
      border-bottom: 1px solid $base-border-color;

      .language-select {
        width: 150px;
        margin-right: 7px;
        margin-left: 30px;

        .language-item {
          user-select: none;
        }
      }
    }

    .right {
      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      .action-button {
        margin: 0px;
      }
      .theme-select {
        margin-left: 10px;
        width: 120px;
      }
    }
  }
</style>
