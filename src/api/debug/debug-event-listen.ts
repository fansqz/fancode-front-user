import useDebugStore from '@/store/modules/debug';
import { storeToRefs } from 'pinia';
import { reqTerminate } from '@/api/debug/index.ts';
import {
  ConnectEventDispatcher,
  StoppedEventDispatcher,
  LaunchEventDispatcher,
  ContinuedDispatcher,
  ExitedEventDispatcher,
  OutputEventDispatcher,
  CompileEventDispatcher,
  DebugEventDispatcher,
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
      DebugEventDispatcher.dispatch('connect', data);
      return;
    }
    var data = JSON.parse(event.data);
    if (data.event == 'stopped') {
      StoppedEventDispatcher.dispatch('stopped', data);
      DebugEventDispatcher.dispatch('stopped', data);
      debugStore.lineNum = data.line;
      stopped.value = true;
    }
    // 程序启动成功
    if (data.event == 'launch') {
      LaunchEventDispatcher.dispatch('launch', data);
      DebugEventDispatcher.dispatch('launch', data);
      if (data.success == true) {
        isDebug.value = true;
        stopped.value = false;
      }
    }
    if (data.event == 'continued') {
      ContinuedDispatcher.dispatch('continued', data);
      DebugEventDispatcher.dispatch('continued', data);
      stopped.value = false;
    }
    if (data.event == 'exited') {
      ExitedEventDispatcher.dispatch('exited', data);
      DebugEventDispatcher.dispatch('exited', data);
      isDebug.value = false;
      // 程序执行结束也关闭调试session
      reqTerminate(id.value);
    }
    if (data.event == 'output') {
      OutputEventDispatcher.dispatch('output', data);
      DebugEventDispatcher.dispatch('output', data);
    }
    if (data.event == 'compile') {
      CompileEventDispatcher.dispatch('compile', data);
      DebugEventDispatcher.dispatch('compile', data);
    }
    if (data.event == 'terminated') {
        debugStore.lineNum = 0;
        // 关闭sse
        eventSource.close();
    }
  };
};
