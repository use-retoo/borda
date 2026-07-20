// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';

import { runSwipeTouch } from './useSwipeTouch.harness.svelte.js';
import { swipe } from './useSwipeTouch.utils.js';

describe('useSwipeTouch', () => {
	it('calls onSwipeLeft on a leftward swipe', async () => {
		const element = document.createElement('div');
		const onSwipeLeft = vi.fn();

		const cleanup = await runSwipeTouch({
			getContainer: () => element,
			getIsEnabled: () => true,
			onSwipeLeft,
			onSwipeRight: vi.fn()
		});

		swipe(element, -100);
		cleanup();

		expect(onSwipeLeft).toHaveBeenCalledOnce();
	});

	it('calls onSwipeRight on a rightward swipe', async () => {
		const element = document.createElement('div');
		const onSwipeRight = vi.fn();

		const cleanup = await runSwipeTouch({
			getContainer: () => element,
			getIsEnabled: () => true,
			onSwipeLeft: vi.fn(),
			onSwipeRight
		});

		swipe(element, 100);
		cleanup();

		expect(onSwipeRight).toHaveBeenCalledOnce();
	});

	it('does not attach listeners when disabled', async () => {
		const element = document.createElement('div');
		const addSpy = vi.spyOn(element, 'addEventListener');

		const cleanup = await runSwipeTouch({
			getContainer: () => element,
			getIsEnabled: () => false,
			onSwipeLeft: vi.fn(),
			onSwipeRight: vi.fn()
		});

		cleanup();

		expect(addSpy).not.toHaveBeenCalled();
	});

	it('does not attach listeners when the container is null', async () => {
		const addSpy = vi.spyOn(EventTarget.prototype, 'addEventListener');

		const cleanup = await runSwipeTouch({
			getContainer: () => null,
			getIsEnabled: () => true,
			onSwipeLeft: vi.fn(),
			onSwipeRight: vi.fn()
		});

		cleanup();

		expect(addSpy).not.toHaveBeenCalled();
	});

	it('stops reacting to swipes after cleanup', async () => {
		const element = document.createElement('div');
		const onSwipeLeft = vi.fn();

		const cleanup = await runSwipeTouch({
			getContainer: () => element,
			getIsEnabled: () => true,
			onSwipeLeft,
			onSwipeRight: vi.fn()
		});

		cleanup();
		swipe(element, -100);

		expect(onSwipeLeft).not.toHaveBeenCalled();
	});
});
