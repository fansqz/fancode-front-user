

export const listenDebugEvent = (eventSource: EventSource) => {
  eventSource.onmessage = function (event) {
    var data = event.data;
    // handle message
  };
};