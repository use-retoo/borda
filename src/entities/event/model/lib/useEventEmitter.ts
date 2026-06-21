import type { BordaEvent } from '../enums';
import type { BordaEventMap, BordaEventHandler, BordaEventEmitter } from '../types';

/**
 * Creates a pub/sub event emitter instance.
 *
 * @returns A {@link BordaEventEmitter} with `on`/`off`/`emit`/`remove`/`clear` methods.
 */
export function useEventEmitter(): BordaEventEmitter {
	const events: BordaEventMap = new Map();

	function on<T = unknown>(eventName: BordaEvent, handler: BordaEventHandler<T>) {
		if (!events.has(eventName)) {
			events.set(eventName, new Set());
		}

		events.get(eventName)?.add(handler as BordaEventHandler);
	}

	function once<T = unknown>(eventName: BordaEvent, handler: BordaEventHandler<T>) {
		const wrapper: BordaEventHandler<T> = (data) => {
			off(eventName, wrapper);
			handler(data);
		};

		on(eventName, wrapper);
	}

	function off<T = unknown>(eventName: BordaEvent, handler: BordaEventHandler<T>) {
		const handlers = events.get(eventName);

		if (handlers) {
			handlers.delete(handler as BordaEventHandler);
		}
	}

	function emit<T>(eventName: BordaEvent, data?: T) {
		const handlers = events.get(eventName);

		if (handlers) {
			handlers.forEach((handler) => handler(data));
		}
	}

	function remove(eventName: BordaEvent) {
		events.get(eventName)?.clear();
	}

	function clear() {
		events.clear();
	}

	return { on, once, off, emit, remove, clear };
}
