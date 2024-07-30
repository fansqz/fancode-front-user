import useDebugStore from '@/store/modules/debug';
import { storeToRefs } from 'pinia';
import { reqCloseDebugSession } from '@/api/debug/index.ts';
import {
  ConnectEventDispatcher,
  StoppedEventDispatcher,
  LaunchEventDispatcher,
  ContinuedDispatcher,
  ExitedEventDispatcher,
  OutputEventDispatcher,
  CompileEventDispatcher,
} from './debug-event-dispatcher';

const debugStore = useDebugStore();

let { id, isDebug, stopped } = storeToRefs(debugStore);

export const listenDebugEvent = (debugId: string, eventSource: EventSource) => {
  eventSource.onmessage = function (event) {
    if (debugId != id.value) {
      return;
    }
    if (event.data == 'connect success') {
      ConnectEventDispatcher.dispatch('connect', data);
      return;
    }
    var data = JSON.parse(event.data);
    if (data.event == 'stopped') {
      StoppedEventDispatcher.dispatch('stopped', data);
      debugStore.lineNum = data.line;
      stopped.value = true;
    }
    // 程序启动成功
    if (data.event == 'launch') {
      LaunchEventDispatcher.dispatch('launch', data);
      if (data.success == true) {
        isDebug.value = true;
        stopped.value = false;
      }
    }
    if (data.event == 'continued') {
      ContinuedDispatcher.dispatch('continued', data);
      stopped.value = false;
    }
    if (data.event == 'exited') {
      ExitedEventDispatcher.dispatch('exited', data);
      isDebug.value = false;
      // 程序执行结束也关闭调试session
      reqCloseDebugSession(id.value);
      debugStore.lineNum = 0;
    }
    if (data.event == 'output') {
      OutputEventDispatcher.dispatch('output', data);
    }
    if (data.event == 'compile') {
      CompileEventDispatcher.dispatch('compile', data);
    }
  };
};
