import { EventDispatcher } from '@/utils/event-dispatcher';
import {
  ConnectEvent,
  StoppedEvent,
  LaunchEvent,
  ContinuedEvent,
  ExitedEvent,
  OutputEvent,
  CompileEvent,
  DebugEvent,
} from '@/api/debug/event';


// 设置不同的事件分发器
export const ConnectEventDispatcher = new EventDispatcher<ConnectEvent>();

export const StoppedEventDispatcher = new EventDispatcher<StoppedEvent>();

export const LaunchEventDispatcher = new EventDispatcher<LaunchEvent>();

export const ContinuedDispatcher = new EventDispatcher<ContinuedEvent>();

export const ExitedEventDispatcher = new EventDispatcher<ExitedEvent>();

export const OutputEventDispatcher = new EventDispatcher<OutputEvent>();

export const CompileEventDispatcher = new EventDispatcher<CompileEvent>();

export const DebugEventDispatcher = new EventDispatcher<DebugEvent>();