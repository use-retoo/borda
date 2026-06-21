import { describe, it, expect, vi } from 'vitest';

import { useEventEmitter } from '../';
import { BordaEvent } from '../../enums';

describe('useEventEmitter', () => {
	describe('basic functionality', () => {
		it('should call handler when event is emitted', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_START, handler);
			emitter.emit(BordaEvent.ON_TOUR_START);

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should call handler with emitted data', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_STEP_CHANGE, handler);
			emitter.emit(BordaEvent.ON_TOUR_STEP_CHANGE, 2);

			expect(handler).toHaveBeenCalledWith(2);
		});

		it('should call multiple handlers for same event', () => {
			const emitter = useEventEmitter();
			const first = vi.fn();
			const second = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_NEXT, first);
			emitter.on(BordaEvent.ON_TOUR_NEXT, second);
			emitter.emit(BordaEvent.ON_TOUR_NEXT);

			expect(first).toHaveBeenCalledOnce();
			expect(second).toHaveBeenCalledOnce();
		});

		it('should call once handler only on first emit', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.once(BordaEvent.ON_TOUR_NEXT, handler);
			emitter.emit(BordaEvent.ON_TOUR_NEXT);
			emitter.emit(BordaEvent.ON_TOUR_NEXT);

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should call once handler with emitted data', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.once(BordaEvent.ON_TOUR_STEP_CHANGE, handler);
			emitter.emit(BordaEvent.ON_TOUR_STEP_CHANGE, 3);

			expect(handler).toHaveBeenCalledWith(3);
		});

		it('should unsubscribe handler with off', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_CLOSE, handler);
			emitter.off(BordaEvent.ON_TOUR_CLOSE, handler);
			emitter.emit(BordaEvent.ON_TOUR_CLOSE);

			expect(handler).not.toHaveBeenCalled();
		});
	});

	describe('case handling', () => {
		it('should not call handler when different event is emitted', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_NEXT, handler);
			emitter.emit(BordaEvent.ON_TOUR_PREV);

			expect(handler).not.toHaveBeenCalled();
		});

		it('should not add handler when same handler is added twice', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_NEXT, handler);
			emitter.on(BordaEvent.ON_TOUR_NEXT, handler);
			emitter.emit(BordaEvent.ON_TOUR_NEXT);

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should remove all handlers when remove is called for event', () => {
			const emitter = useEventEmitter();
			const first = vi.fn();
			const second = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_NEXT, first);
			emitter.on(BordaEvent.ON_TOUR_NEXT, second);
			emitter.remove(BordaEvent.ON_TOUR_NEXT);
			emitter.emit(BordaEvent.ON_TOUR_NEXT);

			expect(first).not.toHaveBeenCalled();
			expect(second).not.toHaveBeenCalled();
		});

		it('should remove all handlers when clear is called', () => {
			const emitter = useEventEmitter();
			const nextHandler = vi.fn();
			const prevHandler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_NEXT, nextHandler);
			emitter.on(BordaEvent.ON_TOUR_PREV, prevHandler);
			emitter.clear();
			emitter.emit(BordaEvent.ON_TOUR_NEXT);
			emitter.emit(BordaEvent.ON_TOUR_PREV);

			expect(nextHandler).not.toHaveBeenCalled();
			expect(prevHandler).not.toHaveBeenCalled();
		});
	});

	describe('edge cases', () => {
		it('should not throw when event has no handlers', () => {
			const emitter = useEventEmitter();

			expect(() => emitter.emit(BordaEvent.ON_TOUR_NEXT)).not.toThrow();
		});

		it('should not throw when removing unregistered handler', () => {
			const emitter = useEventEmitter();

			expect(() => emitter.off(BordaEvent.ON_TOUR_NEXT, vi.fn())).not.toThrow();
		});

		it('should not throw when removing unregistered event', () => {
			const emitter = useEventEmitter();

			expect(() => emitter.remove(BordaEvent.ON_TOUR_NEXT)).not.toThrow();
		});

		it('should call handler with undefined when emitted without data', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_CLOSE, handler);
			emitter.emit(BordaEvent.ON_TOUR_CLOSE);

			expect(handler).toHaveBeenCalledWith(undefined);
		});
	});

	describe('consistency', () => {
		it('should allow re-subscribing after off', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_NEXT, handler);
			emitter.off(BordaEvent.ON_TOUR_NEXT, handler);
			emitter.on(BordaEvent.ON_TOUR_NEXT, handler);
			emitter.emit(BordaEvent.ON_TOUR_NEXT);

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should allow re-subscribing after clear', () => {
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_NEXT, handler);
			emitter.clear();
			emitter.on(BordaEvent.ON_TOUR_NEXT, handler);
			emitter.emit(BordaEvent.ON_TOUR_NEXT);

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should not affect other handlers when once unsubscribes', () => {
			const emitter = useEventEmitter();
			const onceHandler = vi.fn();
			const persistentHandler = vi.fn();

			emitter.once(BordaEvent.ON_TOUR_NEXT, onceHandler);
			emitter.on(BordaEvent.ON_TOUR_NEXT, persistentHandler);
			emitter.emit(BordaEvent.ON_TOUR_NEXT);
			emitter.emit(BordaEvent.ON_TOUR_NEXT);

			expect(onceHandler).toHaveBeenCalledOnce();
			expect(persistentHandler).toHaveBeenCalledTimes(2);
		});

		it('should create independent instances', () => {
			const emitter1 = useEventEmitter();
			const emitter2 = useEventEmitter();
			const handler = vi.fn();

			emitter1.on(BordaEvent.ON_TOUR_NEXT, handler);
			emitter2.emit(BordaEvent.ON_TOUR_NEXT);

			expect(handler).not.toHaveBeenCalled();
		});
	});
});
