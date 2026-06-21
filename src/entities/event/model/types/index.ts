import type { BordaEvent } from '../enums';

/** Callback invoked when a subscribed event is emitted. */
export type BordaEventHandler<T = unknown> = (data: T) => void;

/** Internal storage: event name → set of handlers. */
export type BordaEventMap<T = unknown> = Map<BordaEvent, Set<BordaEventHandler<T>>>;

/** Pub/sub event bus for communication between borda components. */
export interface BordaEventEmitter {
	/** Subscribe a handler to an event. */
	on(eventName: BordaEvent, handler: BordaEventHandler): void;
	/** Subscribe a handler to an event; auto-unsubscribes after first call. */
	once(eventName: BordaEvent, handler: BordaEventHandler): void;
	/** Unsubscribe a specific handler from an event. */
	off(eventName: BordaEvent, handler: BordaEventHandler): void;
	/** Emit an event, calling all subscribed handlers with optional data. */
	emit<T>(eventName: BordaEvent, data?: T): void;
	/** Remove all handlers for a specific event. */
	remove(eventName: BordaEvent): void;
	/** Remove all handlers for all events. */
	clear(): void;
}
