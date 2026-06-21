// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useBordaConfig } from '@/app/entrypoint';
import { BordaEvent, useEventEmitter } from '@/entities/event';

import { useBordaSkip } from '../';

const DEFAULT_STORAGE_KEY = 'borda-tour-skipped';

describe('useBordaSkip', () => {
	beforeEach(() => {
		localStorage.clear();
		vi.clearAllMocks();
	});

	describe('basic functionality', () => {
		it('should have isSkipped false initially', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaSkip(config, useEventEmitter());

			expect(api.isSkipped).toBe(false);
		});

		it('should use default storage key', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaSkip(config, useEventEmitter());

			expect(api.storageKey).toBe(DEFAULT_STORAGE_KEY);
		});

		it('should set isSkipped to true with set(true)', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaSkip(config, useEventEmitter());

			api.set(true);

			expect(api.isSkipped).toBe(true);
		});

		it('should set isSkipped to false with set(false)', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaSkip(config, useEventEmitter());

			api.set(true);
			api.set(false);

			expect(api.isSkipped).toBe(false);
		});

		it('should clear isSkipped with clear()', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaSkip(config, useEventEmitter());

			api.set(true);
			api.clear();

			expect(api.isSkipped).toBe(false);
		});
	});

	describe('localStorage', () => {
		it('should persist skip state to localStorage on set(true)', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaSkip(config, useEventEmitter());

			api.set(true);

			expect(localStorage.getItem(DEFAULT_STORAGE_KEY)).toBe('true');
		});

		it('should remove key from localStorage on set(false)', () => {
			localStorage.setItem(DEFAULT_STORAGE_KEY, 'true');

			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaSkip(config, useEventEmitter());

			api.set(false);

			expect(localStorage.getItem(DEFAULT_STORAGE_KEY)).toBeNull();
		});

		it('should remove key from localStorage on clear()', () => {
			localStorage.setItem(DEFAULT_STORAGE_KEY, 'true');

			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaSkip(config, useEventEmitter());

			api.clear();

			expect(localStorage.getItem(DEFAULT_STORAGE_KEY)).toBeNull();
		});

		it('should read isSkipped from localStorage on apply()', () => {
			localStorage.setItem(DEFAULT_STORAGE_KEY, 'true');

			const config = useBordaConfig({ steps: [] });
			const skip = useBordaSkip(config, useEventEmitter());

			skip.apply();

			expect(skip.api.isSkipped).toBe(true);
		});

		it('should have isSkipped false on apply() when storage is empty', () => {
			const config = useBordaConfig({ steps: [] });
			const skip = useBordaSkip(config, useEventEmitter());

			skip.apply();

			expect(skip.api.isSkipped).toBe(false);
		});
	});

	describe('custom storage key', () => {
		it('should use custom storageKey from config', () => {
			const config = useBordaConfig({
				steps: [],
				skip: { storageKey: 'my-tour-key' }
			});

			const { api } = useBordaSkip(config, useEventEmitter());

			expect(api.storageKey).toBe('my-tour-key');
		});

		it('should write to custom storage key', () => {
			const config = useBordaConfig({
				steps: [],
				skip: { storageKey: 'my-tour-key' }
			});

			const { api } = useBordaSkip(config, useEventEmitter());

			api.set(true);

			expect(localStorage.getItem('my-tour-key')).toBe('true');
			expect(localStorage.getItem(DEFAULT_STORAGE_KEY)).toBeNull();
		});
	});

	describe('disabled state', () => {
		it('should be disabled when skip: false', () => {
			const config = useBordaConfig({ steps: [], skip: false });
			const skip = useBordaSkip(config, useEventEmitter());

			skip.apply();
			skip.api.set(true);

			expect(skip.api.isSkipped).toBe(false);
		});

		it('should not write to localStorage when disabled', () => {
			const config = useBordaConfig({ steps: [], skip: false });
			const { api } = useBordaSkip(config, useEventEmitter());

			api.set(true);

			expect(localStorage.getItem(DEFAULT_STORAGE_KEY)).toBeNull();
		});

		it('should not read from localStorage on apply() when disabled', () => {
			localStorage.setItem(DEFAULT_STORAGE_KEY, 'true');

			const config = useBordaConfig({ steps: [], skip: false });
			const skip = useBordaSkip(config, useEventEmitter());

			skip.apply();

			expect(skip.api.isSkipped).toBe(false);
		});
	});

	describe('events', () => {
		it('should emit ON_SKIP_CHANGE when set() is called', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_SKIP_CHANGE, handler);

			const { api } = useBordaSkip(config, emitter);

			api.set(true);

			expect(handler).toHaveBeenCalledWith(true);
		});

		it('should emit ON_SKIP_CLEAR when clear() is called', () => {
			const config = useBordaConfig({ steps: [] });
			const emitter = useEventEmitter();
			const handler = vi.fn();

			emitter.on(BordaEvent.ON_SKIP_CLEAR, handler);

			const { api } = useBordaSkip(config, emitter);

			api.clear();

			expect(handler).toHaveBeenCalledOnce();
		});
	});

	describe('consistency', () => {
		it('should create independent instances with separate storage', () => {
			const configA = useBordaConfig({ steps: [], skip: { storageKey: 'key-a' } });
			const configB = useBordaConfig({ steps: [], skip: { storageKey: 'key-b' } });

			const skipA = useBordaSkip(configA, useEventEmitter());
			const skipB = useBordaSkip(configB, useEventEmitter());

			skipA.api.set(true);

			expect(skipA.api.isSkipped).toBe(true);
			expect(skipB.api.isSkipped).toBe(false);
		});
	});
});
