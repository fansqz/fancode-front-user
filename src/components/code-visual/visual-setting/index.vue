<template>
  <el-collapse v-model="activeNames" class="visual-settings">
    <el-collapse-item name="1">
      <template #title>
        <div class="visual-settings__header" @click.stop>
          <el-text class="visual-settings__title">可视化配置</el-text>
          <div class="visual-settings__controls">
            <div class="control-group">
              <el-text class="control-label">可视化</el-text>
              <el-switch
                v-model="action"
                size="small"
                active-color="#409eff"
                inactive-color="#dcdfe6"
              />
            </div>
            <div class="control-divider"></div>
            <div class="mode-switch">
              <el-button
                :type="!isAIEnabled ? 'primary' : 'default'"
                size="small"
                @click.stop="toggleCustomMode"
                class="mode-btn"
              >
                <el-icon><Edit /></el-icon>
                编辑
              </el-button>
              <el-button
                :type="isAIEnabled ? 'primary' : 'default'"
                size="small"
                @click.stop="toggleAIMode"
                class="mode-btn"
              >
                <el-icon><Star /></el-icon>
                AI识别
              </el-button>
            </div>
          </div>
        </div>
      </template>
      <div class="visual-settings__content" :class="{ disabled: isAIEnabled }">
        <VisualTemplate />
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script setup lang="ts">
  import useVisualStore from '@/store/modules/visual'
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import VisualTemplate from './setting/index.vue'
  import { Edit, Star } from '@element-plus/icons-vue'

  // Store
  const visualStore = useVisualStore()
  const { action, descriptionType, isAIEnabled } = storeToRefs(visualStore)

  // Local state
  const activeNames = ref<string[]>([])

  /**
   * 切换到自定义编辑模式
   */
  const toggleCustomMode = () => {
    isAIEnabled.value = false
    activeNames.value = ['1']
  }

  /**
   * 切换到AI识别模式
   */
  const toggleAIMode = () => {
    isAIEnabled.value = true
    activeNames.value = []
  }
</script>

<style lang="scss" scoped>
  .visual-settings {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: auto;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 20px;

      .visual-settings__title {
        margin: 0;
      }
    }

    &__controls {
      display: flex;
      gap: 12px;
      align-items: center;

      .control-group {
        display: flex;
        gap: 6px;
        align-items: center;

        .control-label {
          font-size: 12px;
          font-weight: 500;
          color: #606266;
        }
      }

      .control-divider {
        width: 1px;
        height: 16px;
        background-color: #e4e7ed;
      }

      .mode-switch {
        display: flex;
        gap: 4px;
        align-items: center;
        padding: 2px;
        background-color: #f5f7fa;
        border-radius: 6px;

        .mode-btn {
          height: 28px;
          padding: 0 12px;
          font-size: 12px;
          border: none;
          border-radius: 4px;
          transition: all 0.2s ease;

          &:hover {
            box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
            transform: translateY(-1px);
          }

          .el-icon {
            margin-right: 4px;
            font-size: 12px;
          }
        }
      }
    }

    &__content {
      height: 30%;

      &.disabled {
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
          color: #999;
          cursor: not-allowed;
          background-color: #f5f5f5;
        }
      }
    }
  }
</style>
