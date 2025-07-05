<template>
  <el-collapse v-model="activeNames" class="visual-description-collapse">
    <el-collapse-item name="1">
      <template #title>
        <div class="title-container" @click.stop>
          <el-text class="title">可视化配置</el-text>
          <div class="controls">
            <div class="control-group">
              <el-text class="control-label">可视化</el-text>
              <el-switch
                v-model="action"
                size="small"
                active-color="#409eff"
                inactive-color="#dcdfe6"
              />
            </div>
            <div class="divider"></div>
            <div class="mode-switch">
              <el-button
                :type="!isAIEnabled ? 'primary' : 'default'"
                size="small"
                @click.stop="toggleCustom"
                class="mode-btn"
              >
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button
                :type="isAIEnabled ? 'primary' : 'default'"
                size="small"
                @click.stop="toggleAI"
                class="mode-btn"
              >
                <el-icon><Star /></el-icon>
                AI识别
              </el-button>
            </div>
          </div>
        </div>
      </template>
      <div class="visual-description" :class="{ 'disabled-input': isAIEnabled }">
        <VisaulTemplate />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual';
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import Visaul from '@/components/code-visual/visual/index.vue';
  import VisaulTemplate from './setting/index.vue';
  import { watch } from 'vue';
  import { Edit, Star } from '@element-plus/icons-vue';

  const visualStore = useVisualStore();
  const { action, descriptionType, isAIEnabled } = storeToRefs(visualStore);
  const activeNames = ref<string[]>([]);

  // 开启自定义编辑
  const toggleCustom = () => {
    isAIEnabled.value = false;
    activeNames.value = ['1'];
  };

  // 切换AI可视化
  const toggleAI = () => {
    isAIEnabled.value = true;
    activeNames.value = [];
  };
</script>

<style lang="scss" scoped>
  .visual-description-collapse {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: auto;
    .title-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 20px;

      .title {
        margin: 0;
      }

      .controls {
        display: flex;
        align-items: center;
        gap: 12px;

        .control-group {
          display: flex;
          align-items: center;
          gap: 6px;

          .control-label {
            font-size: 12px;
            color: #606266;
            font-weight: 500;
          }
        }

        .divider {
          width: 1px;
          height: 16px;
          background-color: #e4e7ed;
        }

        .mode-switch {
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: #f5f7fa;
          border-radius: 6px;
          padding: 2px;

          .mode-btn {
            border-radius: 4px;
            border: none;
            height: 28px;
            padding: 0 12px;
            font-size: 12px;
            transition: all 0.2s ease;

            &:hover {
              transform: translateY(-1px);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .el-icon {
              margin-right: 4px;
              font-size: 12px;
            }
          }
        }
      }
    }
    .visual-description {
      height: 30%;

      &.disabled-input {
        pointer-events: none;
        opacity: 0.6;

        :deep(input),
        :deep(textarea),
        :deep(select),
        :deep(button:not(.ai-control-button)) {
          pointer-events: none;
          user-select: none;
        }

        :deep(.el-input__inner),
        :deep(.el-textarea__inner) {
          background-color: #f5f5f5;
          color: #999;
          cursor: not-allowed;
        }
      }
    }
  }
</style>
