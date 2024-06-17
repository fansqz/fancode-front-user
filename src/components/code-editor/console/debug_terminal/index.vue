<template>
  <div class="debug_terminal">
    <div class="left">
      <div class="frames_title">
        <el-text class="frames_text">frames</el-text>
      </div>
      <Frames
        class="frames"
        @selectFrame="handleSelectFrame"
      />
    </div>
    <div class="right">
      <el-menu
        :default-active="activeIndex"
        class="select-menu"
        mode="horizontal"
        @select="handleSelect"
      >
      <el-menu-item index="console">console</el-menu-item>
      <el-menu-item index="variables">variables</el-menu-item>
      </el-menu>
      <div class="console" v-show="activeIndex == 'console'">
        <Console />
      </div>
      <div class="variables" v-show="activeIndex == 'variables'">
        <el-scrollbar class="scrollbar">
          <Variables ref="variablesRef" :frameId="frameId"/>
        </el-scrollbar>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import Console from "./console.vue";
import Variables from "./variables.vue";
import Frames from "./frames.vue";
import { ref } from "vue";

const activeIndex = ref('console');
const frameId = ref('');
const variablesRef = ref();

const handleSelect = (key: string) => {
  activeIndex.value = key;
};

// 处理选择栈帧事件
const handleSelectFrame = (id: string) => {
  frameId.value = id;
  // 强制更新树的数据
  variablesRef.value.updateVariables(id);
};

</script>


<style lang="scss" scoped>
.debug_terminal {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  .left {
    width: 25%;
    box-sizing: border-box;
    position: relative;
    border-right: 1px solid $base-border-color;
    .frames_title {
      height: 25px;
      width: 100%;
      box-sizing: border-box;
      border-bottom: 1px solid $base-border-color;
      display: flex;
      padding-left: 15px;
    }
    .frames {
      height: calc(100% - 25px);
      width: 100%;
    }
  }
  .right {
    width: 75%;
    box-sizing: border-box;
    position: relative;
    .select-menu {
      height: 25px;
      width: 100%;
    }
    .console {
      height: calc(100% - 25px);
      width: 100%;
    }
    .variables {
      height: calc(100% - 25px);
      width: 100%;
      .scrollbar {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>