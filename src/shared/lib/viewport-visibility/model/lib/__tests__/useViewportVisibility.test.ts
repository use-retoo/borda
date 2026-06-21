// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';

import { useViewportVisibility } from '../';

function setViewport(width: number, height: number) {
	Object.defineProperty(window, 'innerWidth', { value: width, writable: true });
	Object.defineProperty(window, 'innerHeight', { value: height, writable: true });
}

function makeElement(rect: Partial<DOMRect>): HTMLElement {
	const el = document.createElement('div');

	el.getBoundingClientRect = () =>
		({
			top: 0,
			bottom: 100,
			left: 0,
			right: 100,
			width: 100,
			height: 100,
			x: 0,
			y: 0,
			...rect
		}) as DOMRect;

	return el;
}

describe('useViewportVisibility', () => {
	beforeEach(() => {
		setViewport(800, 600);
	});

	describe('basic functionality', () => {
		it('should return an isFullyVisible function', () => {
			const { isFullyVisible } = useViewportVisibility();

			expect(typeof isFullyVisible).toBe('function');
		});

		it('should return true when element fits within viewport', () => {
			const { isFullyVisible } = useViewportVisibility();
			const el = makeElement({ top: 10, bottom: 110, left: 10, right: 110 });

			expect(isFullyVisible(el)).toBe(true);
		});
	});

	describe('case handling', () => {
		it('should return false when element top is above viewport', () => {
			const { isFullyVisible } = useViewportVisibility();
			const el = makeElement({ top: -10, bottom: 90, left: 0, right: 100 });

			expect(isFullyVisible(el)).toBe(false);
		});

		it('should return false when element bottom is below viewport', () => {
			const { isFullyVisible } = useViewportVisibility();
			const el = makeElement({ top: 550, bottom: 650, left: 0, right: 100 });

			expect(isFullyVisible(el)).toBe(false);
		});

		it('should return false when element left is outside viewport', () => {
			const { isFullyVisible } = useViewportVisibility();
			const el = makeElement({ top: 0, bottom: 100, left: -10, right: 90 });

			expect(isFullyVisible(el)).toBe(false);
		});

		it('should return false when element right is outside viewport', () => {
			const { isFullyVisible } = useViewportVisibility();
			const el = makeElement({ top: 0, bottom: 100, left: 750, right: 850 });

			expect(isFullyVisible(el)).toBe(false);
		});
	});

	describe('edge cases', () => {
		it('should return true when element is exactly at viewport boundaries', () => {
			const { isFullyVisible } = useViewportVisibility();
			const el = makeElement({ top: 0, bottom: 600, left: 0, right: 800 });

			expect(isFullyVisible(el)).toBe(true);
		});

		it('should return true for zero-size element at origin', () => {
			const { isFullyVisible } = useViewportVisibility();
			const el = makeElement({ top: 0, bottom: 0, left: 0, right: 0 });

			expect(isFullyVisible(el)).toBe(true);
		});
	});

	describe('consistency', () => {
		it('should create independent instances that read from the same viewport', () => {
			const a = useViewportVisibility();
			const b = useViewportVisibility();
			const el = makeElement({ top: 10, bottom: 110, left: 10, right: 110 });

			expect(a.isFullyVisible(el)).toBe(b.isFullyVisible(el));
		});
	});
});
