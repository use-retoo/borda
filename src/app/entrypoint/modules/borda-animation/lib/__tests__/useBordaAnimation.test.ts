import { describe, it, expect } from 'vitest';

import { useBordaConfig } from '@/app/entrypoint';
import { AnimationEffect } from '@/shared/enums';

import { useBordaAnimation } from '../';
import { DEFAULT_OVERLAY_ANIMATION, DEFAULT_TOOLTIP_ANIMATION } from '../../constants';

describe('useBordaAnimation', () => {
	describe('basic functionality', () => {
		it('should have isEnabled true by default', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaAnimation(config);

			expect(api.isEnabled).toBe(true);
		});

		it('should return default tooltip animation', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaAnimation(config);

			expect(api.tooltip).toEqual(DEFAULT_TOOLTIP_ANIMATION);
		});

		it('should return default overlay animation', () => {
			const config = useBordaConfig({ steps: [] });
			const { api } = useBordaAnimation(config);

			expect(api.overlay).toEqual(DEFAULT_OVERLAY_ANIMATION);
		});
	});

	describe('apply', () => {
		it('should merge default animation config into config on apply()', () => {
			const config = useBordaConfig({ steps: [] });
			const animation = useBordaAnimation(config);

			animation.apply();

			expect(config.getConfig().animation).toEqual({
				isEnabled: true,
				tooltip: DEFAULT_TOOLTIP_ANIMATION,
				overlay: DEFAULT_OVERLAY_ANIMATION
			});
		});

		it('should be a no-op when animation: false', () => {
			const config = useBordaConfig({ steps: [], animation: false });
			const animation = useBordaAnimation(config);

			animation.apply();

			expect(config.getConfig().animation).toBe(false);
		});

		it('should merge custom tooltip overrides on apply()', () => {
			const config = useBordaConfig({
				steps: [],
				animation: {
					tooltip: { enterDuration: 500 }
				}
			});

			const animation = useBordaAnimation(config);

			animation.apply();

			expect(config.getConfig().animation).not.toBe(false);

			const resolvedAnimation = config.getConfig().animation as {
				tooltip: { enterDuration: number };
			};

			expect(resolvedAnimation.tooltip.enterDuration).toBe(500);
		});

		it('should merge custom overlay overrides on apply()', () => {
			const config = useBordaConfig({
				steps: [],
				animation: {
					overlay: { transitionDuration: 600 }
				}
			});

			const animation = useBordaAnimation(config);

			animation.apply();

			expect(config.getConfig().animation).not.toBe(false);

			const resolvedAnimation = config.getConfig().animation as {
				overlay: { transitionDuration: number };
			};

			expect(resolvedAnimation.overlay.transitionDuration).toBe(600);
		});
	});

	describe('case handling', () => {
		it('should have isEnabled false when animation: false', () => {
			const config = useBordaConfig({ steps: [], animation: false });
			const { api } = useBordaAnimation(config);

			expect(api.isEnabled).toBe(false);
		});

		it('should have isEnabled false when isEnabled: false', () => {
			const config = useBordaConfig({
				steps: [],
				animation: { isEnabled: false }
			});

			const { api } = useBordaAnimation(config);

			expect(api.isEnabled).toBe(false);
		});

		it('should preserve non-overridden tooltip fields when merging', () => {
			const config = useBordaConfig({
				steps: [],
				animation: {
					tooltip: { enter: AnimationEffect.SCALE }
				}
			});

			const { api } = useBordaAnimation(config);

			expect(api.tooltip.enter).toBe(AnimationEffect.SCALE);
			expect(api.tooltip.exit).toBe(DEFAULT_TOOLTIP_ANIMATION.exit);
			expect(api.tooltip.enterDuration).toBe(DEFAULT_TOOLTIP_ANIMATION.enterDuration);
		});
	});

	describe('edge cases', () => {
		it('should have isEnabled true when animation config is empty object', () => {
			const config = useBordaConfig({ steps: [], animation: {} });
			const { api } = useBordaAnimation(config);

			expect(api.isEnabled).toBe(true);
		});
	});

	describe('consistency', () => {
		it('should create independent instances', () => {
			const configA = useBordaConfig({
				steps: [],
				animation: { isEnabled: false }
			});

			const configB = useBordaConfig({ steps: [] });

			const animationA = useBordaAnimation(configA);
			const animationB = useBordaAnimation(configB);

			expect(animationA.api.isEnabled).toBe(false);
			expect(animationB.api.isEnabled).toBe(true);
		});

		it('should not mutate config before apply() is called', () => {
			const config = useBordaConfig({ steps: [] });

			useBordaAnimation(config);

			expect(config.getConfig().animation).toBeUndefined();
		});
	});
});
