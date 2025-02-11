<template>
  <div class="debug_terminal">
    <splitpanes>
      <pane size="25%">
        <!--栈帧列表-->
        <div class="left">
          <div class="frames_title">
            <el-text class="frames_text">frames</el-text>
          </div>
          <Frames class="frames" @selectFrame="handleSelectFrame" />
        </div>
      </pane>
      <pane size="75%">
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
              <Variables ref="variablesRef" :frameId="frameId" />
            </el-scrollbar>
          </div>
          <div class="debug-buttons">
            <StepOrContinueButton type="continue" class="debug-btn" />
            <StepOrContinueButton type="step-over" class="debug-btn" />
            <StepOrContinueButton type="step-in" class="debug-btn" />
            <StepOrContinueButton type="step-out" class="debug-btn" />
            <TerminateButton class="debug-btn" />
          </div>
        </div>
      </pane>
    </splitpanes>
  </div>
</template>

<script setup lang="ts">
  import Console from './console.vue';
  import Variables from './variables.vue';
  import Frames from './frames.vue';
  import StepOrContinueButton from '../debug-button/debug-button-step-continue.vue';
  import TerminateButton from '../debug-button/debug-button-terminate.vue';
  import { ref } from 'vue';
  import { Splitpanes, Pane } from 'splitpanes';

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
      height: 100%;
      width: 100%;
      position: relative;
      background-color: rgb(255, 255, 255);
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
      height: 100%;
      width: 100%;
      position: relative;
      background-color: rgb(255, 255, 255);
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
      .debug-buttons {
        z-index: 9999;
        position: absolute;
        display: flex;
        justify-content: space-around;
        align-items: center;
        top: 0px;
        right: 20px;
        width: 140px;
        height: 25px;
      }
    }
  }
</style>
