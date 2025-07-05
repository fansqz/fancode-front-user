<template>
  <div class="console">
    <el-scrollbar class="scrollbar" ref="scrollbarRef">
      <div class="content" ref="innerRef">
        <div class="output" v-if="outputs.length != 0">
          <div class="left">
            <el-text>输出:</el-text>
          </div>
          <div class="right">
            <div class="output-div">
              <el-alert
                v-for="item in outputs"
                :type="item.type"
                :title="item.title"
                class="output"
                :closable="false"
              >
                <div style="white-space: pre-wrap">{{ item.message }}</div>
              </el-alert>
            </div>
          </div>
        </div>
        <div class="input">
          <div class="left">
            <el-text>输入:</el-text>
          </div>
          <div class="right">
            <div class="input-div">
              <el-input
                class="current-input"
                v-model="currentInput"
                :rows="1"
                type="textarea"
                @keydown.enter.native="enterEvent($event)"
                placeholder="点击回车发送, 点击ctrl+回车则换行"
              />
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import useDebugStore from '@/store/modules/debug'
  import { reqSendToConsole } from '@/api/debug'
  import { ElMessage } from 'element-plus'
  import { watch } from 'vue'

  const debugStore = useDebugStore()
  let { id, outputs, currentInput } = storeToRefs(debugStore)
  const scrollbarRef = ref()
  const innerRef = ref()

  // 滚动条滚动到底部
  const updateScrollToBottom = () => {
    scrollbarRef.value!.setScrollTop(innerRef.value!.clientHeight)
  }

  let enterEvent = async (event: any) => {
    if (!event.ctrlKey) {
      // 取消
      event.preventDefault()
      if (!debugStore.isDebugging()) {
        ElMessage({
          showClose: true,
          message: '未开启调试，无法向程序发送输入',
          type: 'info',
        })
        return
      }
      // 发送命令给gdb
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
  .console {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 5px;

    .scrollbar {
      position: relative;
      width: 100%;
      height: 100%;

      .content {
        position: relative;

        .input {
          position: relative;
          display: flex;
          width: 100%;

          .left {
            width: 35px;
            padding: 10px 0;
          }

          .right {
            width: calc(100% - 35px);

            .input-div {
              padding: 10px;

              .sent-input {
                margin: 4px 0;
              }

              .current-input {
                overflow: hidden visible;
                border-color: rgb(82 168 236 / 80%);
              }
            }
          }
        }

        .output {
          position: relative;
          display: flex;
          width: 100%;

          .left {
            width: 35px;
            padding: 10px 0;
          }

          .right {
            width: calc(100% - 35px);

            .output-div {
              padding: 10px;

              .output {
                margin: 4px 0;
              }
            }
          }
        }
      }
    }
  }
</style>
