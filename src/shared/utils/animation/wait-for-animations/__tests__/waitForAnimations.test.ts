// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { waitForAnimations } from '../index';

function makeAnimation(state: 'finished' | 'rejected' = 'finished'): Animation {
	return {
		finished:
			state === 'finished'
				? Promise.resolve({} as Animation)
				: Promise.reject(new Error('cancelled'))
	} as unknown as Animation;
}

describe('waitForAnimations', () => {
	beforeEach(() => {
		vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
			cb(0);
			return 0;
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('basic functionality', () => {
		it('should resolve when element has no animations', async () => {
			const root = document.createElement('div');

			root.getAnimations = () => [];

			await expect(waitForAnimations(root)).resolves.toBeUndefined();
		});

		it('should resolve when all animations finish', async () => {
			const root = document.createElement('div');

			root.getAnimations = () => [makeAnimation('finished'), makeAnimation('finished')];

			await expect(waitForAnimations(root)).resolves.toBeUndefined();
		});

		it('should resolve even when an animation is cancelled', async () => {
			const root = document.createElement('div');

			root.getAnimations = () => [makeAnimation('finished'), makeAnimation('rejected')];

			await expect(waitForAnimations(root)).resolves.toBeUndefined();
		});
	});

	describe('case handling', () => {
		it('should call getAnimations with subtree: true', async () => {
			const root = document.createElement('div');
			const spy = vi.fn(() => []);

			root.getAnimations = spy;

			await waitForAnimations(root);

			expect(spy).toHaveBeenCalledWith({ subtree: true });
		});

		it('should call getAnimations after requestAnimationFrame fires', async () => {
			const root = document.createElement('div');
			const callOrder: string[] = [];

			vi.mocked(window.requestAnimationFrame).mockImplementation((cb) => {
				callOrder.push('raf-scheduled');
				cb(0);
				callOrder.push('raf-executed');
				return 0;
			});

			root.getAnimations = () => {
				callOrder.push('getAnimations');
				return [];
			};

			await waitForAnimations(root);

			expect(callOrder).toEqual(['raf-scheduled', 'raf-executed', 'getAnimations']);
		});
	});
});
