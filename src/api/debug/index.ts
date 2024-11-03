import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  CreateSessionURL = '/debug/session/create',
  StartURL = '/debug/start',
  SseURL = '/debug/sse',
  NextURL = '/debug/next',
  StepInURL = '/debug/step/in',
  StepOutURL = '/debug/step/out',
  StepOverURL = '/debug/step/over',
  ContinueURL = '/debug/continue',
  SendToConsoleURL = '/debug/sendToConsole',
  AddBreakpointsURL = '/debug/addBreakpoints',
  RemoveBreakpointsURL = '/debug/removeBreakpoints',
  GetStackTraceURL = '/debug/stackTrace',
  GetFrameVariablesURL = '/debug/frame/variables',
  GetVariablesURL = '/debug/variables',
  TerminateURL = '/debug/terminate',
}

// reqCreateDebugSession 创建一个调试session
export const reqCreateDebugSession = (language: string): Promise<CreateDebugSessionResponse> => {
  return request.post(
    API.CreateSessionURL,
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
  let debugURL = new URL(`${baseApi}${API.SseURL}/${id}`, serve);
  var source = new EventSource(debugURL);
  return source;
};

// reqStart 开始调试
export const reqStart = (req: StartRequset): Promise<StartResponse> => {
  return request.post(API.StartURL, req);
};

// reqSendToConsole 发送用户输入到目标程序
export const reqSendToConsole = (id: string, input: string): Promise<SendToConsoleResponse> => {
  return request.post(
    API.SendToConsoleURL,
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
    API.StepInURL,
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
    API.StepOutURL,
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
    API.StepOverURL,
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
    API.ContinueURL,
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
export const reqAddBreakpoint = (
  id: string,
  breakpoints: Number[],
): Promise<AddBreakpointResponse> => {
  return request.post(API.AddBreakpointsURL, {
    id: id,
    breakpoints: breakpoints,
  });
};

// reqRemoveBreakpoint 移除断点
export const reqRemoveBreakpoint = (
  id: string,
  breakpoints: Number[],
): Promise<RemoveBreakpointResponse> => {
  return request.post(API.RemoveBreakpointsURL, {
    id: id,
    breakpoints: breakpoints,
  });
};

// reqTerminate 关闭调试session
export const reqTerminate = (id: string): Promise<TerminatedResponse> => {
  return request.post(
    API.TerminateURL,
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
    API.GetStackTraceURL,
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
export const reqGetFrameVariables = (
  id: string,
  frameId: string,
): Promise<GetFrameVariablesResponse> => {
  return request.post(
    API.GetFrameVariablesURL,
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
    API.GetVariablesURL,
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
