<template>
  <div ref="dp" style="position: absolute; z-index: 999">
    <el-card>
      <div class="btn-bar">
        <div class="debug-title">
          <i ref="dpt" class="fas fa-arrows-alt fa-lg" style="cursor: move" title="调试栏"></i>
        </div>
        <StepOrContinueButton type="continue" class="debug-btn" />
        <StepOrContinueButton type="step-over" class="debug-btn" />
        <StepOrContinueButton type="step-in" class="debug-btn" />
        <StepOrContinueButton type="step-out" class="debug-btn" />
        <TerminateButton class="debug-btn" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import StepOrContinueButton from './debug-button-step-continue.vue';
  import TerminateButton from './debug-button-terminate.vue';
</script>
