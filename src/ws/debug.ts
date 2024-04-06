import { sendWebSocket, onWebSocketEvent } from '@/utils/websocket';


// 启动调试
export const reqStartDebug = (code: string, language: string) => {
  sendWebSocket({
    type: 'debug',
    data: {
      type: 'request',
      option: 'start',
      code: code,
      language: language,
    },
  });
};


// 初始化监控websocket的调试功能
export const initDebugWebsocketListen = () => {
  onWebSocketEvent("onmessage", (data: any) => {
    if (data.type != 'debug') {
      return;
    }
    const debugData = data.data;
    console.log(debugData);
  });
};