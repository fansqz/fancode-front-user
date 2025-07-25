<template>
  <div class="container">
    <el-scrollbar class="scrollbar" ref="scrollbarRef">
      <div class="content" ref="innerRef">
        <!-- 输出区域 -->
        <div class="output-section" v-if="processedOutputs.length != 0">
          <div 
            v-for="(item, index) in processedOutputs" 
            :key="index"
            class="output-item"
            :class="item.type"
          >
            <div class="output-content">{{ item.message }}</div>
          </div>
        </div>
        
        <!-- 输入区域 -->
        <div class="input-section">
          <div class="input-prompt">></div>
          <div class="input-container">
            <el-input
              class="input-field"
              v-model="currentInput"
              :rows="1"
              type="textarea"
              @keydown.enter.native="enterEvent($event)"
              placeholder="输入命令，回车发送，Ctrl+回车换行"
              resize="none"
            />
            <el-button 
              class="send-button" 
              type="primary" 
              size="small"
              @click="sendCommand"
              :disabled="!currentInput.trim()"
            >
              发送
            </el-button>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import useDebugStore from '@/store/modules/debug'
  import { reqSendToConsole } from '@/api/debug'
  import { ElMessage } from 'element-plus'
  import { watch } from 'vue'

  const debugStore = useDebugStore()
  let { id, outputs, currentInput } = storeToRefs(debugStore)
  const scrollbarRef = ref()
  const innerRef = ref()

  // 预处理输出，合并连续的 output 事件
  const processedOutputs = computed(() => {
    if (!outputs.value || outputs.value.length === 0) {
      return []
    }

    const result: any[] = []
    let currentOutputItem: any = null

    for (const item of outputs.value) {
      if (item.event === 'output') {
        if (currentOutputItem) {
          // 如果已经有连续的 output 项，则合并消息
          currentOutputItem.message += item.message
        } else {
          // 创建新的连续输出项
          currentOutputItem = { ...item }
          result.push(currentOutputItem)
        }
      } else {
        // 非 output 事件，重置连续输出状态
        currentOutputItem = null
        result.push(item)
      }
    }

    return result
  })

  // 滚动条滚动到底部
  const updateScrollToBottom = () => {
    scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)
  }

  // 发送命令
  const sendCommand = async () => {
    if (!currentInput.value.trim()) return
    
    if (!debugStore.isDebugging()) {
      ElMessage({
        showClose: true,
        message: '未开启调试，无法向程序发送输入',
        type: 'info',
      })
      return
    }
    
    let result = await reqSendToConsole(id.value, currentInput.value + '\n')
    if (result.code != 200) {
      ElMessage({
        showClose: true,
        message: '发送失败',
        type: 'error',
      })
    } else {
      currentInput.value = ''
    }
  }

  let enterEvent = async (event: any) => {
    if (!event.ctrlKey) {
      // 取消
      event.preventDefault()
      await sendCommand()
    } else {
      currentInput.value += '\n'
    }
  }

  onMounted(() => {
    watch(
      () => outputs.value,
      () => {
        if (outputs.value.length != 0) {
          updateScrollToBottom()
        }
      },
    )
  })
</script>
<style lang="scss" scoped>
  .container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-left: 8px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    line-height: 1.4;
    display: flex;
    flex-direction: column;

    .scrollbar {
      position: relative;
      width: 100%;
      flex: 1;
      overflow: hidden;

      .content {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;

        .output-section {
          margin-bottom: 8px;
          flex: 1;
          overflow-y: auto;

                     .output-item {
             padding: 4px 0;
             border-radius: 4px;
             margin-bottom: 2px;
             
             &.success {
               color: #67c23a;
             }
             
             &.error {
               color: #f56c6c;
             }
             
             &.warning {
               color: #e6a23c;
             }
             
             &.info {
               color: #909399;
             }

             .output-content {
               white-space: pre-wrap;
               word-break: break-word;
             }
           }
        }

        .input-section {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          padding: 4px 8px 8px 8px;
          flex-shrink: 0;

          .input-prompt {
            color: #409eff;
            font-weight: bold;
            margin-top: 4px;
            flex-shrink: 0;
          }

                     .input-container {
             flex: 1;
             display: flex;
             align-items: center;
             gap: 8px;
             border-radius: 6px;
             padding: 4px 8px;
             background-color: $base-background-color;
             border: 1px solid $base-border-color;

             .input-field {
               flex: 1;
               
               :deep(.el-textarea__inner) {
                 border: none;
                 background: transparent;
                 padding: 0;
                 font-family: inherit;
                 font-size: inherit;
                 line-height: inherit;
                 resize: none;
                 box-shadow: none;
                 min-height: 20px;
                 max-height: 60px;
                 
                 &:focus {
                   box-shadow: none;
                   border: none;
                 }
               }
             }

             .send-button {
               flex-shrink: 0;
               height: 24px;
               padding: 0 12px;
               font-size: 12px;
               border-radius: 4px;
               display: flex;
               align-items: center;
               justify-content: center;
             }
           }
        }
      }
    }
  }
</style>
