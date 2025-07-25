<template>
  <div class="console">
    <div class="console-header">
      <el-text>调试终端</el-text>
      <div class="debug-buttons">
        <StepOrContinueButton type="continue" class="debug-btn" />
        <StepOrContinueButton type="step-over" class="debug-btn" />
        <StepOrContinueButton type="step-in" class="debug-btn" />
        <StepOrContinueButton type="step-out" class="debug-btn" />
        <TerminateButton class="debug-btn" />
      </div>
    </div>
    <div class="console-terminal">
      <DebugTerminal />
    </div>
    <div class="console-bottom">
      <CodeButtonBar :debug="true" :execute="true" class="code-button-bar" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import DebugTerminal from './debug-terminal/index.vue'
  import StepOrContinueButton from './debug-button/debug-button-step-continue.vue'
  import TerminateButton from './debug-button/debug-button-terminate.vue'
  import CodeButtonBar from './coding-button/index.vue'
</script>

<style scoped lang="scss">
  .console {
    display: flex;
    flex-direction: column;
    height: 100%;
    
    .console-header {
      flex-shrink: 0;  // 固定30px
      height: 30px;
      background-color: $base-background-color;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      
      .debug-buttons {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 140px;
        height: 25px;
      }
    }
    
    .console-terminal {
      flex: 1;         // 占据剩余空间
      min-height: 0;   // 允许收缩
    }
    
    .console-bottom {
      flex-shrink: 0;  // 固定40px
      height: 36px;
      background-color: $base-background-color;
      padding: 2px 0;
      .code-button-bar {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 0 10px;
      }
    }
  }
</style>
