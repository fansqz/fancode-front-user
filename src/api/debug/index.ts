import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  CREATE_DEBUG_SESSION_URL = '/debug/session/create',
  START_URL = '/debug/start',
  SSE_URL = '/debug/sse',
  NEXT_URL = '/debug/next',
  STEP_IN_URL = '/debug/step/in',
  STEP_OUT_URL = '/debug/step/out',
  STEP_OVER_URL = '/debug/step/over',
  CONTINUE_URL = '/debug/continue',
  SEND_TO_CONSOLE_URL = '/debug/sendToConsole',
  ADD_BREAKPOINTS_URL = '/debug/addBreakpoints',
  REMOVE_BREAKPOINTS_URL = '/debug/removeBreakpoints',
  GET_STACK_TRACN_URL = '/debug/stackTrace',
  GET_FRAME_VARIABLES_URL = '/debug/frame/variables',
  GET_VARIABLES_URL = '/debug/variables',
  CLOSE_DEBUG_SESSION_URL = '/debug/session/close',
}

// reqCreateDebugSession 创建一个调试session
export const reqCreateDebugSession = (language: string): Promise<CreateDebugSessionResponse> => {
  return request.post(
    API.CREATE_DEBUG_SESSION_URL,
    toFormData({
      language: language,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// reqListenDebugEvent 创建sse连接，返回一个eventsource
export const reqListenDebugEvent = (id: string): EventSource => {
  let baseApi = import.meta.env.VITE_APP_BASE_API;
  let serve = import.meta.env.VITE_SERVE;
  let debugURL = new URL(`${baseApi}${API.SSE_URL}/${id}`, serve);
  var source = new EventSource(debugURL);
  return source;
};

// reqStart 开始调试
export const reqStart =(req: StartRequset): Promise<StartResponse> => {
  return request.post(API.START_URL, req);
};


// reqSendToConsole 发送用户输入到目标程序
export const reqSendToConsole = (id: string, input: string): Promise<SendToConsoleResponse> => {
  return request.post(
    API.SEND_TO_CONSOLE_URL,
    toFormData({
      input: input,
      id: id,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// reqStepIn 单步调试，会进入函数内部
export const reqStepIn = (id: string): Promise<StepInResponse> => {
  return request.post(
    API.STEP_IN_URL,
    toFormData({
      id: id,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// reqStepOut 单步调试，会跳出函数外部
export const reqStepOut = (id: string): Promise<StepOutResponse> => {
  return request.post(
    API.STEP_OUT_URL,
    toFormData({
      id: id,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// reqStepOver 单步调试，不会进入函数内部
export const reqStepOver = (id: string): Promise<StepOverResponse> => {
  return request.post(
    API.STEP_OVER_URL,
    toFormData({
      id: id,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// reqContinue continue程序继续执行直到遇到下一个断点
export const reqContinue = (id: string): Promise<ContinueResponse> => {
  return request.post(
    API.CONTINUE_URL,
    toFormData({
      id: id,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// reqAddBreakpoint 添加断点
export const reqAddBreakpoint = (id: string, breakpoints: Number[]): Promise<AddBreakpointResponse> => {
  return request.post(API.ADD_BREAKPOINTS_URL, {
    id: id,
    breakpoints: breakpoints,
  });
};

// reqRemoveBreakpoint 移除断点
export const reqRemoveBreakpoint = (id: string, breakpoints: Number[]): Promise<RemoveBreakpointResponse> => {
  return request.post(API.REMOVE_BREAKPOINTS_URL, {
    id: id,
    breakpoints: breakpoints,
  });
};

// reqCloseDebugSession 关闭调试session
export const reqCloseDebugSession = (id: string): Promise<CloseDebugSessionResponse> => {
  return request.post(
    API.CLOSE_DEBUG_SESSION_URL,
    toFormData({
      id: id,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// reqGetStackTrace 根据debugid获取当前线程栈帧
export const reqGetStackTrace = (id: string): Promise<GetStackTraceResponse> => {
  return request.post(
    API.GET_STACK_TRACN_URL,
    toFormData({
      id: id,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// reqGetFrameVariables 根据栈帧id获取某个栈帧的所有局部变量
export const reqGetFrameVariables = (id: string, frameId: string): Promise<GetFrameVariablesResponse> => {
  return request.post(
    API.GET_FRAME_VARIABLES_URL,
    toFormData({
      id: id,
      frameId: frameId,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

// reqGetVariables 根据引用获取某个变量的内容
export const reqGetVariables = (id: string, reference: string): Promise<GetVariablesResponse> => {
  return request.post(
    API.GET_VARIABLES_URL,
    toFormData({
      id: id,
      reference: reference,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
