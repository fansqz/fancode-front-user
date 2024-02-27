import useUserStore from '@/store/modules/user';

const dispatcher = new EventDispatcher<string>();
let ws: WebSocket | null = null;
let heartBeat: any;
const user = useUserStore();

// 主动断开websocket
function closeWebSocket() {
  if (ws) {
    clearInterval(heartBeat);
    ws.close();
    ws = null;
    heartBeat = undefined;
  }
}

/**
 * 初始化websocket
 */
function initWebSocket() {
  if (ws) {
    return;
  } // 连接存在，退出初始化操作
  ws = new WebSocket(import.meta.env.VITE_SERVE + import.meta.env.VITE_APP_BASE_API + '/ws');

  // 消息响应
  ws.onmessage = (e) => {
    dispatcher.dispatch('onmessage', e.data);
  };

  // 连接关闭
  ws.onclose = (e) => {
    console.log(`WS关闭 ${new Date()}`, e);
    dispatcher.dispatch('onmessage', 'websocket close');
  };

  // 连接打开
  ws.onopen = (e) => {
    console.log(`WS开启 ${new Date()}`, e);
    dispatcher.dispatch('onopent', 'websocket open');
    // 发送心跳数据
    heartBeat = window.setInterval(() => {
      sendWebSocket({ type: 117 });
      console.log('heartbeat', new Date());
    }, 5000);
  };

  // 连接异常
  ws.onerror = (e) => {
    console.log(`WS发生错误 ${new Date()}`, e);
    dispatcher.dispatch('onerror', 'websocket error');
    clearInterval(heartBeat);
    heartBeat = undefined;
    ws = null;
  };
}

/**
 * 发送消息到websocket
 */
function sendWebSocket(data: any) {
  // 封装请求，加上时间戳标识
  data.token = user.token;
  console.log('ws 请求', data);
  return new Promise((resolve, reject) => {
    initWebSocket();
    if (ws && ws.readyState === 0) {
      setTimeout(() => {
        if (ws && ws.readyState === ws.OPEN) {
          ws!.send(JSON.stringify(data));
          resolve('websocket send message success');
        } else {
          reject('websocket not open'); // 请求失败
        }
      }, 1000);
    } else if (ws && ws.readyState === ws.OPEN) {
      ws!.send(JSON.stringify(data));
      resolve('websocket send message success');
    } else {
      reject('websocket not open'); // 请求失败
    }
  });
}

// 注册websocket事件的监听
function onWebSocketEvent(event: string, callback: EventListenerCallback) {
  dispatcher.on(event, callback);
}

// 将方法暴露出去
export { initWebSocket, sendWebSocket, closeWebSocket, onWebSocketEvent };
