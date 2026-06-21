import type { BordaEvent } from '../enums';

/** Callback invoked when a subscribed event is emitted. */
export type BordaEventHandler<T = unknown> = (data: T) => void;

/** Internal storage: event name → set of handlers. */
export type BordaEventMap<T = unknown> = Map<BordaEvent, Set<BordaEventHandler<T>>>;

/** Pub/sub event bus for communication between borda components. */
export interface BordaEventEmitter {
	/** Subscribe a handler to an event. */
	on<T = unknown>(eventName: BordaEvent, handler: BordaEventHandler<T>): void;
	/** Subscribe a handler to an event; auto-unsubscribes after first call. */
	once<T = unknown>(eventName: BordaEvent, handler: BordaEventHandler<T>): void;
	/** Unsubscribe a specific handler from an event. */
	off<T = unknown>(eventName: BordaEvent, handler: BordaEventHandler<T>): void;
	/** Emit an event, calling all subscribed handlers with optional data. */
	emit<T>(eventName: BordaEvent, data?: T): void;
	/** Remove all handlers for a specific event. */
	remove(eventName: BordaEvent): void;
	/** Remove all handlers for all events. */
	clear(): void;
}
