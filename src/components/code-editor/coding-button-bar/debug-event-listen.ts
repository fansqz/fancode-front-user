import useDebugStore from '@/store/modules/debug';
import { storeToRefs } from 'pinia';
import { reqCloseDebugSession } from '@/api/debug/index.ts';

const debugStore = useDebugStore();

let { key, isDebug, stopped } = storeToRefs(debugStore);

export const listenDebugEvent = (eventSource: EventSource) => {
  eventSource.onmessage = function (event) {
    if (event.data == 'connect success') {
      return;
    }
    var data = JSON.parse(event.data);
    if (data.event == 'stopped') {
      debugStore.debugData.lineNum = data.line;
      stopped.value = true;
    }
    // 程序启动成功
    if (data.event == 'launch') {
      if (data.success == true) {
        isDebug.value = true;
        stopped.value = false;
      }
    }
    if (data.event == 'continued') {
      stopped.value = false;
    }
    if (data.event == 'exited') {
      isDebug.value = false;
      // 程序执行结束也关闭调试session
      reqCloseDebugSession(key.value);
      debugStore.debugData.lineNum = 0;
    }
  };
};
