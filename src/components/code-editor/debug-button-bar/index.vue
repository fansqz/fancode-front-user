<template>
  <div ref="dp" style="position: absolute; z-index: 999">
    <el-card>
      <div class="btn-bar">
        <div class="debug-title">
          <i ref="dpt" class="fas fa-arrows-alt fa-lg" style="cursor: move" title="调试栏"></i>
        </div>
        <ContinueButton class="debug-btn" />
        <NextButton class="debug-btn" />
        <TerminateButton class="debug-btn" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import ContinueButton from './debug-button-continue.vue';
  import NextButton from './debug-button-next.vue';
  import TerminateButton from './debug-button-terminate.vue';
</script>
