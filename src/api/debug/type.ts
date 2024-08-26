type CreateDebugSessionResponse = BaseResponse & {
  // sessionid
  data: string;
};

type StartRequset = {
  id: string;
  code: string;
  language: string;
  breakpoints: number[];
};

type StartResponse = BaseResponse & {};

type SendToConsoleResponse = BaseResponse & {};

type StepInResponse = BaseResponse & {};

type StepOutResponse = BaseResponse & {};

type StepOverResponse = BaseResponse & {};

type ContinueResponse = BaseResponse & {};

type AddBreakpointResponse = BaseResponse & {};

type RemoveBreakpointResponse = BaseResponse & {};

type CloseDebugSessionResponse = BaseResponse & {};

// 栈帧
type StackFrame = {
  id: string; // 栈帧id
  name: string; // 函数名称
  path: string; // 文件路径
  line: number;
};

type GetStackTraceResponse = BaseResponse & {
  data: StackFrame[];
};

// 变量
type Variable = {
  name: string;
  type: string;
  value: string;
  reference: string; //变量引用
};

type GetFrameVariablesResponse = BaseResponse & {
  data: Variable[];
};

type GetVariablesResponse = BaseResponse & {
  data: Variable[];
};
