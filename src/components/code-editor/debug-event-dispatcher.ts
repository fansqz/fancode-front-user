import { EventDispatcher, EventListenerCallback } from '@/utils/event_dispatcher';

export const DebugEventDispatcher = new EventDispatcher();
export type DebugEventListenerCallback = EventListenerCallback;
