import request from '@/utils/request';
import { toFormData } from '@/utils/format';

enum API {
  START_URL = '/debug/start',
  SSE_URL = '/debug/sse',
  NEXT_URL = '/debug/next',
  STEP_URL = '/debug/step',
  CONTINUE_URL = '/debug/continue',
  SEND_TO_CONSOLE_URL = '/debug/sendToConsole',
  ADD_BREAKPOINTS_URL = '/debug/addBreakpoints',
  REMOVE_BREAKPOINTS_URL = '/debug/removeBreakpoints',
  TERMINATE_URL = '/debug/terminate',
}

export const reqStart = (code: string, language: string, breakpoints: number[]): Promise<any> => {
  return request.post(API.START_URL, {
    code: code,
    language: language,
    breakpoints: breakpoints,
  });
};

export const reqListenDebugEvent = (key: string): EventSource => {
  let baseURL = new URL(import.meta.env.VITE_APP_BASE_API, import.meta.env.VITE_SERVE);
  let debugURL = new URL(API.SSE_URL + '/' + key, baseURL);
  var source = new EventSource(debugURL);
  return source
};

export const reqSendToConsole = (key: string, input: string): Promise<any> => {
  return request.post(API.SEND_TO_CONSOLE_URL, toFormData({
    input: input,
    key: key,
  }), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }); 
};

export const reqNext = (key: string): Promise<any> => {
  return request.post(API.NEXT_URL, toFormData({
    key: key,
  }), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const reqStep = (key: string): Promise<any> => {
  return request.post(API.STEP_URL, toFormData({
    key: key,
  }), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const reqContinue = (key: string): Promise<any> => {
  return request.post(API.STEP_URL, toFormData({
    key: key,
  }), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const reqAddBreakpoint = (key: string, breakpoints: Number[]): Promise<any> => {
  return request.post(API.ADD_BREAKPOINTS_URL, {
    key: key,
    breakpoints: breakpoints,
  });
};

export const reqRemoveBreakpoint = (key: string, breakpoints: Number[]): Promise<any> => {
  return request.post(API.REMOVE_BREAKPOINTS_URL, {
    key: key,
    breakpoints: breakpoints,
  });
};

export const reqTerminate = (key: string): Promise<any> => {
  return request.post(API.TERMINATE_URL, toFormData({
    key: key,
  }), {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

