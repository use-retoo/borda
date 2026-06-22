// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';

import { useBordaConfig } from '@/app/entrypoint';

import { useBordaScroll } from '../';
import { DEFAULT_SCROLL_CONFIG } from '../../constants';

/** Stubs an element's `getBoundingClientRect` with a fixed viewport rect. */
function mockRect(
	element: HTMLElement,
	rect: { top: number; left: number; width: number; height: number }
): HTMLElement {
	const full = {
		...rect,
		right: rect.left + rect.width,
		bottom: rect.top + rect.height,
		x: rect.left,
		y: rect.top
	};

	element.getBoundingClientRect = () => ({ ...full, toJSON: () => full }) as DOMRect;

	return element;
}

describe('useBordaScroll', () => {
	describe('enabled state', () => {
		it('should not be locked by default', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaScroll(config);

			expect(api.isLocked).toBe(false);
		});

		it('should not be scrolling initially', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaScroll(config);

			expect(api.isScrolling).toBe(false);
		});

		it('should merge the default scroll config into the store on apply()', () => {
			const config = useBordaConfig({ steps: [] });
			const scroll = useBordaScroll(config);

			scroll.apply();

			expect(config.getConfig().scroll).toEqual(DEFAULT_SCROLL_CONFIG);
		});

		it('should keep user overrides while filling defaults on apply()', () => {
			const config = useBordaConfig({
				steps: [],
				scroll: { duration: 1000, offset: { y: 40 } }
			});

			const scroll = useBordaScroll(config);
			scroll.apply();

			const resolved = config.getConfig().scroll;

			expect(resolved).toMatchObject({
				duration: 1000,
				offset: { x: 0, y: 40 },
				block: DEFAULT_SCROLL_CONFIG.block
			});
		});
	});

	describe('disabled state', () => {
		it('should not be locked when scroll is false', () => {
			const config = useBordaConfig({ steps: [], scroll: false });
			const { api } = useBordaScroll(config);

			expect(api.isLocked).toBe(false);
		});

		it('should leave the config untouched on apply() when disabled', () => {
			const config = useBordaConfig({ steps: [], scroll: false });
			const scroll = useBordaScroll(config);

			scroll.apply();

			expect(config.getConfig().scroll).toBe(false);
		});
	});

	describe('isLocked override', () => {
		it('should lock when isLocked: true is set explicitly', () => {
			const config = useBordaConfig({ steps: [], scroll: { isLocked: true } });
			const { api } = useBordaScroll(config);

			expect(api.isLocked).toBe(true);
		});
	});

	describe('scrollTo', () => {
		it('should be a no-op for a null element', async () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaScroll(config);

			await api.scrollTo(null);

			expect(api.isScrolling).toBe(false);
		});

		it('should be a no-op when scroll is disabled', async () => {
			const config = useBordaConfig({ steps: [], scroll: false });
			const { api } = useBordaScroll(config);

			await api.scrollTo(document.createElement('div'));

			expect(api.isScrolling).toBe(false);
		});

		it('should scroll when the target fits but the tooltip overflows the viewport', async () => {
			const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

			const config = useBordaConfig({ steps: [], scroll: { duration: 0 } });
			const { api } = useBordaScroll(config);

			const target = mockRect(document.createElement('div'), {
				top: 100,
				left: 100,
				width: 100,
				height: 40
			});

			/** Target is on-screen, but the tooltip below it runs past the viewport bottom. */
			const tooltipRect = {
				top: 150,
				left: 100,
				width: 200,
				height: window.innerHeight
			};

			await api.scrollTo(target, tooltipRect);

			expect(scrollSpy).toHaveBeenCalled();

			scrollSpy.mockRestore();
		});

		it('should reveal the tooltip (not center the target) when the target is taller than the viewport', async () => {
			const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

			const config = useBordaConfig({ steps: [], scroll: { duration: 0 } });
			const { api } = useBordaScroll(config);

			/** Target taller than the viewport — its union with the tooltip can't fit. */
			const target = mockRect(document.createElement('div'), {
				top: 50,
				left: 100,
				width: 100,
				height: window.innerHeight + 200
			});

			const tooltipTop = target.getBoundingClientRect().bottom + 20;
			const tooltipHeight = 100;

			const tooltipRect = {
				top: tooltipTop,
				left: 100,
				width: 200,
				height: tooltipHeight
			};

			await api.scrollTo(target, tooltipRect);

			expect(scrollSpy).toHaveBeenCalledOnce();

			const scrollY = scrollSpy.mock.calls[0][1] as number;

			/** After scrolling, the tooltip must end up fully inside the viewport. */
			const tooltipTopAfter = tooltipTop - scrollY;

			expect(tooltipTopAfter).toBeGreaterThanOrEqual(0);
			expect(tooltipTopAfter + tooltipHeight).toBeLessThanOrEqual(window.innerHeight);

			scrollSpy.mockRestore();
		});

		it('should not scroll when target and tooltip both fit the viewport', async () => {
			const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

			const config = useBordaConfig({ steps: [], scroll: { duration: 0 } });
			const { api } = useBordaScroll(config);

			const target = mockRect(document.createElement('div'), {
				top: 100,
				left: 100,
				width: 100,
				height: 40
			});

			const tooltipRect = {
				top: 150,
				left: 100,
				width: 200,
				height: 80
			};

			await api.scrollTo(target, tooltipRect);

			expect(scrollSpy).not.toHaveBeenCalled();

			scrollSpy.mockRestore();
		});
	});

	describe('lifecycle', () => {
		it('should not throw on destroy()', () => {
			const config = useBordaConfig({ steps: [] });
			const scroll = useBordaScroll(config);

			scroll.apply();

			expect(() => scroll.destroy()).not.toThrow();
		});
	});
});
