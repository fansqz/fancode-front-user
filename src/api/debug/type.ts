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

type SetBreakpointResponse = BaseResponse & {
  data: Breakpoint[];
};

type RemoveBreakpointResponse = BaseResponse & {};

type TerminatedResponse = BaseResponse & {};

// 断点
type Breakpoint = {
  verified: boolean;
  message: string;
  line: number;
};
// 栈帧
type StackFrame = {
  id: number; // 栈帧id
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
  reference: number; //变量引用
  namedVariables: number; // 元素数量（结构体）
  indexedVariables: number; // 元素数量（数据结构）
};

type GetFrameVariablesResponse = BaseResponse & {
  data: Variable[];
};

type GetVariablesResponse = BaseResponse & {
  data: Variable[];
};
