<template>
  <div class="console">
    <el-scrollbar class="scrollbar">
      <div class="content">
        <div class="input">
          <div class="left">
            <el-text>输入:</el-text>
          </div>
          <div class="right">
            <div class="input-div">
              <el-alert v-for="item in sentInputs" type="success" class="sent-input" :closable="false">
                <div style="white-space: pre-wrap">{{ item }}</div>
              </el-alert>
              <el-input class="current-input" v-model="currentInput" :rows="1" type="textarea"
                @keydown.enter.native="enterEvent($event)" placeholder="点击回车发送, 点击ctrl+回车则换行" />
            </div>
          </div>
        </div>
        <div class="output" v-if="outputs.length != 0">
          <div class="left">
            <el-text>输出:</el-text>
          </div>
          <div class="right">
            <div class="output-div">
              <el-alert v-for="item in outputs" :type="item.type" :title="item.title" class="output" :closable="false">
                <div style="white-space: pre-wrap">{{ item.message }}</div>
              </el-alert>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import useDebugStore from '@/store/modules/debug';
import { reqSendToConsole } from '@/api/debug';
import { ElMessage } from 'element-plus';
import {
  LaunchEventDispatcher,
  OutputEventDispatcher,
  CompileEventDispatcher,
  ConnectEventDispatcher,
  ExitedEventDispatcher,
} from '@/api/debug/debug-event-dispatcher';
import { LaunchEvent, OutputEvent, CompileEvent, ConnectEvent, ExitedEvent } from '@/api/debug/event';

const debugStore = useDebugStore();
let { id, outputs, sentInputs, currentInput, isDebug } = storeToRefs(debugStore);

onMounted(() => {
  // 注册一些事件
  LaunchEventDispatcher.on('launch', onLaunch);
  OutputEventDispatcher.on('output', onOutput);
  CompileEventDispatcher.on('compile', onCompile);
  ConnectEventDispatcher.on('connect', onConnect);
  ExitedEventDispatcher.on('exited', onExited);
});
onUnmounted(() => {
  LaunchEventDispatcher.off('launch', onLaunch);
  OutputEventDispatcher.off('output', onOutput);
  CompileEventDispatcher.off('compile', onCompile);
  ConnectEventDispatcher.off('connect', onConnect);
  ExitedEventDispatcher.off('exited', onExited);
});

// 监控输出
const onOutput = (data: OutputEvent) => {
  if (outputs.value.length > 0 && outputs.value[outputs.value.length - 1].event == 'output') {
    let oldOutput = outputs.value[outputs.value.length - 1].message;
    outputs.value[outputs.value.length - 1] = {
      ...outputs.value[outputs.value.length - 1],
      message: oldOutput + data.output,
    };
  } else {
    outputs.value.push({
      type: 'success',
      event: 'output',
      title: '',
      message: data.output,
    });
  }
};

const onLaunch = (data: LaunchEvent) => {
  if (data.success != true) {
    outputs.value.push({
      type: 'error',
      event: 'launch',
      title: '调试启动失败',
      message: '加载用户程序失败',
    });
  } else {
    outputs.value.push({
      type: 'success',
      event: 'launch',
      message: '调试开始',
    });
  }
};

const onCompile = (data: CompileEvent) => {
  if (data.success != true) {
    outputs.value.push({
      type: 'error',
      event: 'compile',
      title: '编译错误',
      message: data.message,
    });
  }
};

const onExited = (data: ExitedEvent) => {
  let message = `exit code ${data.exitCode}.`
  if (data.message != '') {
    message = `${data.message}\n${message}`
  }
  outputs.value.push({
    event: 'exited',
    message: message,
  });
};

// 启动一个新的调试管道时候清除原来的input和output
const onConnect = (_data: ConnectEvent) => {
  sentInputs.value = [];
  outputs.value = [];
};

let enterEvent = async (event: any) => {
  if (!event.ctrlKey) {
    // 取消
    event.preventDefault();
    if (!isDebug.value) {
      ElMessage({
        showClose: true,
        message: '未开启调试，无法向程序发送输入',
        type: 'info',
      });
      return;
    }
    // 发送命令给gdb
    let result = await reqSendToConsole(id.value, currentInput.value + '\n');
    if (result.code != 200) {
      ElMessage({
        showClose: true,
        message: '发送失败',
        type: 'error',
      });
    } else {
      let inputText = currentInput.value.replace(/\r/g, '');
      sentInputs.value.push(inputText);
      currentInput.value = '';
    }
  } else {
    currentInput.value += '\n';
  }
};
</script>
<style lang="scss" scoped>
.console {
  width: 100%;
  height: 100%;
  padding: 5px;
  box-sizing: border-box;
  position: absolute;

  .scrollbar {
    position: relative;
    width: 100%;
    height: 100%;

    .content {
      position: relative;

      .input {
        width: 100%;
        position: relative;
        display: flex;

        .left {
          width: 35px;
          padding: 10px 0px;
        }

        .right {
          width: calc(100% - 35px);

          .input-div {
            padding: 10px 10px;

            .sent-input {
              margin: 4px 0px;
            }

            .current-input {
              overflow-x: hidden;
              overflow-y: visible;
              border-color: rgba(82, 168, 236, 0.8);
            }
          }
        }
      }

      .output {
        position: relative;
        width: 100%;
        display: flex;

        .left {
          width: 35px;
          padding: 10px 0px;
        }

        .right {
          width: calc(100% - 35px);

          .output-div {
            padding: 10px 10px;

            .output {
              margin: 4px 0px;
            }
          }
        }
      }
    }
  }
}
</style>
