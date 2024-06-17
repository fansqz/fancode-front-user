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

export const reqCreateDebugSession = (language: string): Promise<any> => {
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

export const reqStart = (
  key: string,
  code: string,
  language: string,
  breakpoints: number[],
): Promise<any> => {
  return request.post(API.START_URL, {
    key: key,
    code: code,
    language: language,
    breakpoints: breakpoints,
  });
};

export const reqListenDebugEvent = (key: string): EventSource => {
  let baseURL = new URL(import.meta.env.VITE_APP_BASE_API, import.meta.env.VITE_SERVE);
  let debugURL = new URL(API.SSE_URL + '/' + key, baseURL);
  var source = new EventSource(debugURL);
  return source;
};

export const reqSendToConsole = (key: string, input: string): Promise<any> => {
  return request.post(
    API.SEND_TO_CONSOLE_URL,
    toFormData({
      input: input,
      key: key,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const reqStepIn = (key: string): Promise<any> => {
  return request.post(
    API.STEP_IN_URL,
    toFormData({
      key: key,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const reqStepOut = (key: string): Promise<any> => {
  return request.post(
    API.STEP_OUT_URL,
    toFormData({
      key: key,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const reqStepOver = (key: string): Promise<any> => {
  return request.post(
    API.STEP_OVER_URL,
    toFormData({
      key: key,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const reqContinue = (key: string): Promise<any> => {
  return request.post(
    API.CONTINUE_URL,
    toFormData({
      key: key,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
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

export const reqCloseDebugSession = (key: string): Promise<any> => {
  return request.post(
    API.CLOSE_DEBUG_SESSION_URL,
    toFormData({
      key: key,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const reqGetStackTrace = (key: string): Promise<any> => {
  return request.post(
    API.GET_STACK_TRACN_URL,
    toFormData({
      key: key,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const reqGetFrameVariables = (key: string, frameId: string): Promise<any> => {
  return request.post(
    API.GET_FRAME_VARIABLES_URL,
    toFormData({
      key: key,
      frameId: frameId,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const reqGetVariables = (key: string, reference: string): Promise<any> => {
  return request.post(
    API.GET_VARIABLES_URL,
    toFormData({
      key: key,
      reference: reference,
    }),
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};
