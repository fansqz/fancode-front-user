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
      <el-button type="info" icon="RefreshRight" @click="reloadCode" text />
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
  import { getAllTheme } from '../editor/themes'
  import { reqProblemTemplateCode } from '@/api/problem'
  import useCodingStore from '@/store/modules/coding'
  let codingStore = useCodingStore()

  // 主题列表
  let themeList = ref(getAllTheme())
  let { theme, code, language, languages } = storeToRefs(codingStore)
  theme.value = themeList.value[0]
  // 重新加载代码
  const reloadCode = async () => {
    let result = await reqProblemTemplateCode(language.value)
    if (result.code == 200) {
      console.log('sdf234e')
      code.value = result.data
    }
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

      .theme-select {
        width: 120px;
      }
    }
  }
</style>
