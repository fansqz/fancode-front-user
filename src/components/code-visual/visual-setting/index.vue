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
  import useVisualStore from '@/store/modules/visual'
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import Visaul from '@/components/code-visual/visual/index.vue'
  import VisaulTemplate from './setting/index.vue'
  import { watch } from 'vue'
  import { Edit, Star } from '@element-plus/icons-vue'

  const visualStore = useVisualStore()
  const { action, descriptionType, isAIEnabled } = storeToRefs(visualStore)
  const activeNames = ref<string[]>([])

  // 开启自定义编辑
  const toggleCustom = () => {
    isAIEnabled.value = false
    activeNames.value = ['1']
  }

  // 切换AI可视化
  const toggleAI = () => {
    isAIEnabled.value = true
    activeNames.value = []
  }
</script>

<style lang="scss" scoped>
  .visual-description-collapse {
    position: absolute;
    bottom: 0;
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

        .divider {
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
          color: #999;
          cursor: not-allowed;
          background-color: #f5f5f5;
        }
      }
    }
  }
</style>
