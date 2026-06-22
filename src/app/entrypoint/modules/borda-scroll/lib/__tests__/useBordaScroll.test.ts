// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';

import { useBordaConfig } from '@/app/entrypoint';

import { useBordaScroll } from '../';
import { DEFAULT_SCROLL_CONFIG } from '../../constants';

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
