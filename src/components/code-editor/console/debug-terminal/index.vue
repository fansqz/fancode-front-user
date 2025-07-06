<template>
  <div class="debug_terminal">
    <splitpanes class="default-theme" :dbl-click-splitter="false" :push-other-panes="false">
      <pane size="30">
        <!--栈帧列表-->
        <div class="left">
          <div class="frames_title">
            <el-text class="frames_text">栈帧</el-text>
          </div>
          <Frames class="frames" />
        </div>
      </pane>
      <pane size="70">
        <div class="right">
          <el-menu
            :default-active="activeIndex"
            class="select-menu"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="console">控制台</el-menu-item>
            <el-menu-item index="variables">变量</el-menu-item>
          </el-menu>
          <div class="console" v-show="activeIndex == 'console'">
            <Console />
          </div>
          <div class="variables" v-show="activeIndex == 'variables'">
            <el-scrollbar class="scrollbar">
              <Variables />
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
  import Console from './console.vue'
  import Variables from './variables.vue'
  import Frames from './frames.vue'
  import StepOrContinueButton from '../debug-button/debug-button-step-continue.vue'
  import TerminateButton from '../debug-button/debug-button-terminate.vue'
  import { ref } from 'vue'
  import { Splitpanes, Pane } from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'

  const activeIndex = ref('console')

  const handleSelect = (key: string) => {
    activeIndex.value = key
  }
</script>

<style lang="scss" scoped>
  .debug_terminal {
    position: absolute;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 100%;

    .left {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: rgb(255 255 255);

      .frames_title {
        box-sizing: border-box;
        display: flex;
        width: 100%;
        height: 25px;
        padding-left: 15px;
        border-bottom: 1px solid $base-border-color;
      }

      .frames {
        width: 100%;
        height: calc(100% - 25px);
      }
    }

    .right {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: rgb(255 255 255);

      .select-menu {
        width: 100%;
        height: 25px;
      }

      .console {
        width: 100%;
        height: calc(100% - 25px);
      }

      .variables {
        width: 100%;
        height: calc(100% - 25px);

        .scrollbar {
          width: 100%;
          height: 100%;
        }
      }

      .debug-buttons {
        position: absolute;
        top: 0;
        right: 20px;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 140px;
        height: 25px;
      }
    }
  }
</style>
