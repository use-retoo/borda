// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';

import { useBordaConfig } from '@/app/entrypoint';
import { BordaEvent, useEventEmitter } from '@/entities/event';

import { useBordaKeyboard } from '../';

function fireKeydown(key: string, target: EventTarget = document) {
	const event = new KeyboardEvent('keydown', { key, bubbles: true });

	Object.defineProperty(event, 'target', {
		get: () => target
	});

	document.dispatchEvent(event);

	return event;
}

describe('useBordaKeyboard', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('basic functionality', () => {
		it('should emit ON_KEYBOARD_NEXT on ArrowRight', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_KEYBOARD_NEXT, handler);

			const keyboard = useBordaKeyboard(config, emitter);

			keyboard.apply();
			fireKeydown('ArrowRight');
			keyboard.destroy();

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should emit ON_KEYBOARD_PREV on ArrowLeft', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_KEYBOARD_PREV, handler);

			const keyboard = useBordaKeyboard(config, emitter);

			keyboard.apply();
			fireKeydown('ArrowLeft');
			keyboard.destroy();

			expect(handler).toHaveBeenCalledOnce();
		});

		it('should emit ON_TOUR_CLOSE on Escape', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_TOUR_CLOSE, handler);

			const keyboard = useBordaKeyboard(config, emitter);

			keyboard.apply();
			fireKeydown('Escape');
			keyboard.destroy();

			expect(handler).toHaveBeenCalledOnce();
		});
	});

	describe('case handling', () => {
		it('should not add listener when hasKeyboardControl is false', () => {
			const addSpy = vi.spyOn(document, 'addEventListener');

			const config = useBordaConfig({
				steps: [],
				tour: { hasKeyboardControl: false }
			});

			const keyboard = useBordaKeyboard(config, useEventEmitter());

			keyboard.apply();
			keyboard.destroy();

			expect(addSpy).not.toHaveBeenCalled();
		});

		it('should ignore keydown from INPUT elements', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_KEYBOARD_NEXT, handler);

			const keyboard = useBordaKeyboard(config, emitter);

			keyboard.apply();

			const input = document.createElement('input');
			fireKeydown('ArrowRight', input);

			keyboard.destroy();

			expect(handler).not.toHaveBeenCalled();
		});

		it('should ignore keydown from TEXTAREA elements', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_KEYBOARD_NEXT, handler);

			const keyboard = useBordaKeyboard(config, emitter);

			keyboard.apply();

			const textarea = document.createElement('textarea');
			fireKeydown('ArrowRight', textarea);

			keyboard.destroy();

			expect(handler).not.toHaveBeenCalled();
		});

		it('should ignore keydown from SELECT elements', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_KEYBOARD_NEXT, handler);

			const keyboard = useBordaKeyboard(config, emitter);

			keyboard.apply();

			const select = document.createElement('select');
			fireKeydown('ArrowRight', select);

			keyboard.destroy();

			expect(handler).not.toHaveBeenCalled();
		});

		it('should ignore unrelated keys', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const nextHandler = vi.fn();
			const prevHandler = vi.fn();
			const closeHandler = vi.fn();

			emitter.on(BordaEvent.ON_KEYBOARD_NEXT, nextHandler);
			emitter.on(BordaEvent.ON_KEYBOARD_PREV, prevHandler);
			emitter.on(BordaEvent.ON_TOUR_CLOSE, closeHandler);

			const keyboard = useBordaKeyboard(config, emitter);

			keyboard.apply();
			fireKeydown('Enter');
			fireKeydown('Space');
			keyboard.destroy();

			expect(nextHandler).not.toHaveBeenCalled();
			expect(prevHandler).not.toHaveBeenCalled();
			expect(closeHandler).not.toHaveBeenCalled();
		});
	});

	describe('destroy', () => {
		it('should stop emitting events after destroy()', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_KEYBOARD_NEXT, handler);

			const keyboard = useBordaKeyboard(config, emitter);

			keyboard.apply();
			keyboard.destroy();
			fireKeydown('ArrowRight');

			expect(handler).not.toHaveBeenCalled();
		});
	});

	describe('consistency', () => {
		it('should handle multiple apply/destroy cycles correctly', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_KEYBOARD_NEXT, handler);

			const keyboard = useBordaKeyboard(config, emitter);

			keyboard.apply();
			keyboard.destroy();
			keyboard.apply();
			fireKeydown('ArrowRight');
			keyboard.destroy();

			expect(handler).toHaveBeenCalledOnce();
		});
	});
});
