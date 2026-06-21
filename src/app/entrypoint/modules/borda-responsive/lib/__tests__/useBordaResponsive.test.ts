// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useBordaConfig, useBordaOverrides } from '@/app/entrypoint';

import { useBordaResponsive } from '../';

let mediaListeners: Map<string, Set<() => void>>;
let mediaMatches: Map<string, boolean>;

function setupMatchMedia() {
	mediaListeners = new Map();
	mediaMatches = new Map();

	window.matchMedia = vi.fn((query: string) => {
		const listeners = new Set<() => void>();

		mediaListeners.set(query, listeners);

		return {
			get matches() {
				return mediaMatches.get(query) ?? false;
			},
			media: query,
			addEventListener(_event: string, handler: () => void) {
				listeners.add(handler);
			},
			removeEventListener(_event: string, handler: () => void) {
				listeners.delete(handler);
			},
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn()
		} as unknown as MediaQueryList;
	});
}

function simulateResize(width: number) {
	Object.defineProperty(window, 'innerWidth', { value: width, writable: true });

	for (const [, listeners] of mediaListeners) {
		for (const handler of listeners) {
			handler();
		}
	}
}

describe('useBordaResponsive', () => {
	beforeEach(() => {
		setupMatchMedia();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe('basic functionality', () => {
		it('should have null activeBreakpoint initially', () => {
			const config = useBordaConfig({ steps: [] });
			const overrides = useBordaOverrides(config);
			const responsive = useBordaResponsive(config, overrides);

			expect(responsive.api.activeBreakpoint).toBe(null);
		});

		it('should match the smallest breakpoint where width <= breakpoint', () => {
			Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });

			const config = useBordaConfig({
				steps: [],
				responsive: {
					480: { closeButton: false },
					768: { tourOverlay: false }
				}
			});

			const overrides = useBordaOverrides(config);
			const responsive = useBordaResponsive(config, overrides);

			responsive.apply();

			expect(responsive.api.activeBreakpoint).toBe(480);
			expect(overrides.resolved.closeButton).toBe(false);
			expect(overrides.resolved.tourOverlay).toBeUndefined();
		});

		it('should match the next breakpoint when width exceeds the smaller one', () => {
			Object.defineProperty(window, 'innerWidth', { value: 600, writable: true });

			const config = useBordaConfig({
				steps: [],
				responsive: {
					480: { closeButton: false },
					768: { tourOverlay: false }
				}
			});

			const overrides = useBordaOverrides(config);
			const responsive = useBordaResponsive(config, overrides);

			responsive.apply();

			expect(responsive.api.activeBreakpoint).toBe(768);
			expect(overrides.resolved.tourOverlay).toBe(false);
			expect(overrides.resolved.closeButton).toBeUndefined();
		});

		it('should clear overrides when width exceeds all breakpoints', () => {
			Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });

			const config = useBordaConfig({
				steps: [],
				responsive: {
					480: { closeButton: false }
				}
			});

			const overrides = useBordaOverrides(config);
			const responsive = useBordaResponsive(config, overrides);

			responsive.apply();

			expect(responsive.api.activeBreakpoint).toBe(480);

			simulateResize(600);

			expect(responsive.api.activeBreakpoint).toBe(null);
			expect(overrides.resolved.closeButton).toBeUndefined();
		});
	});

	describe('case handling', () => {
		it('should be a no-op when no responsive config', () => {
			const config = useBordaConfig({ steps: [] });
			const overrides = useBordaOverrides(config);
			const responsive = useBordaResponsive(config, overrides);

			responsive.apply();

			expect(window.matchMedia).not.toHaveBeenCalled();
		});

		it('should be a no-op when responsive config is empty', () => {
			const config = useBordaConfig({ steps: [], responsive: {} });
			const overrides = useBordaOverrides(config);
			const responsive = useBordaResponsive(config, overrides);

			responsive.apply();

			expect(window.matchMedia).not.toHaveBeenCalled();
		});

		it('should not re-set overrides when breakpoint has not changed', () => {
			Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });

			const config = useBordaConfig({
				steps: [],
				responsive: {
					480: { closeButton: false }
				}
			});

			const overrides = useBordaOverrides(config);
			const setSpy = vi.spyOn(overrides, 'set');
			const responsive = useBordaResponsive(config, overrides);

			responsive.apply();

			simulateResize(450);

			expect(setSpy).toHaveBeenCalledTimes(1);
		});
	});

	describe('destroy', () => {
		it('should remove listeners and clear overrides', () => {
			Object.defineProperty(window, 'innerWidth', { value: 400, writable: true });

			const config = useBordaConfig({
				steps: [],
				responsive: {
					480: { closeButton: false }
				}
			});

			const overrides = useBordaOverrides(config);
			const responsive = useBordaResponsive(config, overrides);

			responsive.apply();

			expect(responsive.api.activeBreakpoint).toBe(480);

			responsive.destroy();

			expect(responsive.api.activeBreakpoint).toBe(null);
			expect(overrides.resolved.closeButton).toBeUndefined();

			for (const [, listeners] of mediaListeners) {
				expect(listeners.size).toBe(0);
			}
		});
	});
});
