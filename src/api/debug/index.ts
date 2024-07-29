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
  Id: string,
  code: string,
  language: string,
  breakpoints: number[],
): Promise<any> => {
  return request.post(API.START_URL, {
    Id: Id,
    code: code,
    language: language,
    breakpoints: breakpoints,
  });
};

export const reqListenDebugEvent = (id: string): EventSource => {
  let baseApi = import.meta.env.VITE_APP_BASE_API;
  let serve = import.meta.env.VITE_SERVE;
  let debugURL = new URL(`${baseApi}${API.SSE_URL}/${id}`, serve);
  var source = new EventSource(debugURL);
  return source;
};

export const reqSendToConsole = (id: string, input: string): Promise<any> => {
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

export const reqStepIn = (id: string): Promise<any> => {
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

export const reqStepOut = (id: string): Promise<any> => {
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

export const reqStepOver = (id: string): Promise<any> => {
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

export const reqContinue = (id: string): Promise<any> => {
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

export const reqAddBreakpoint = (id: string, breakpoints: Number[]): Promise<any> => {
  return request.post(API.ADD_BREAKPOINTS_URL, {
    id: id,
    breakpoints: breakpoints,
  });
};

export const reqRemoveBreakpoint = (id: string, breakpoints: Number[]): Promise<any> => {
  return request.post(API.REMOVE_BREAKPOINTS_URL, {
    id: id,
    breakpoints: breakpoints,
  });
};

export const reqCloseDebugSession = (id: string): Promise<any> => {
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

export const reqGetStackTrace = (id: string): Promise<any> => {
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

export const reqGetFrameVariables = (id: string, frameId: string): Promise<any> => {
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

export const reqGetVariables = (id: string, reference: string): Promise<any> => {
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
