import useDebugStore from '@/store/modules/debug';
import { storeToRefs } from 'pinia';
import { reqCloseDebugSession } from '@/api/debug/index.ts';
import { DebugEventDispatcher } from './debug-event-dispatcher';

const debugStore = useDebugStore();

let { id, isDebug, stopped } = storeToRefs(debugStore);

export const listenDebugEvent = (debugId: string, eventSource: EventSource) => {
  eventSource.onmessage = function (event) {
    if (debugId != id.value) {
      return;
    }
    if (event.data == 'connect success') {
      DebugEventDispatcher.dispatch('connect', data);
      return;
    }
    var data = JSON.parse(event.data);
    if (data.event == 'stopped') {
      DebugEventDispatcher.dispatch('stopped', data);
      debugStore.lineNum = data.line;
      stopped.value = true;
    }
    // 程序启动成功
    if (data.event == 'launch') {
      DebugEventDispatcher.dispatch('launch', data);
      if (data.success == true) {
        isDebug.value = true;
        stopped.value = false;
      }
    }
    if (data.event == 'continued') {
      DebugEventDispatcher.dispatch('continued', data);
      stopped.value = false;
    }
    if (data.event == 'exited') {
      DebugEventDispatcher.dispatch('exited', data);
      isDebug.value = false;
      // 程序执行结束也关闭调试session
      reqCloseDebugSession(id.value);
      debugStore.lineNum = 0;
    }
    if (data.event == 'output') {
      DebugEventDispatcher.dispatch('output', data);
    }
    if (data.event == 'compile') {
      DebugEventDispatcher.dispatch('compile', data);
    }
  };
};
