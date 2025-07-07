<template>
  <div class="visaul-pane">
    <el-menu
      :default-active="activeIndex"
      class="menu"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="1">可视化</el-menu-item>
    </el-menu>
    <div class="main" ref="main">
      <StructVisual ref="structVisual" v-if="activeIndex == '1'" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue'
  import StructVisual from './visual.vue'
  let props = defineProps(['content'])
  let content = ref(props.content)
  const structVisual = ref()
  const main = ref<HTMLElement>()
  const activeIndex = ref('1')
  const handleSelect = (key: string) => {
    activeIndex.value = key
  }

  // 重新设置visual的大小
  const resizeVisualView = () => {
    structVisual.value?.resizeVisualView(main.value.offsetWidth, main.value.offsetHeight)
  }

  watchEffect(() => {
    if (props.content != undefined) {
      content.value = props.content
    }
  })

  defineExpose({
    resizeVisualView,
  })
</script>

<style lang="scss" scoped>
  .visaul-pane {
    height: 100%;

    .main {
      height: calc(100% - 35px);
      user-select: element;
    }

    .menu {
      height: 35px;
      user-select: none;
    }
  }
</style>
