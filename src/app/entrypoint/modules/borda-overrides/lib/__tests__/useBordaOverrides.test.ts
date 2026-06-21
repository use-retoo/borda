import { describe, it, expect } from 'vitest';

import { useBordaConfig } from '@/app/entrypoint';
import { OverrideLayer } from '@/shared/enums';

import { useBordaOverrides } from '../';

describe('useBordaOverrides', () => {
	describe('basic functionality', () => {
		it('should return base config when no overrides set', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const overrides = useBordaOverrides(config);

			expect(overrides.resolved).toEqual({
				steps: [],
				visibility: { isHidden: false }
			});
		});

		it('should merge overrides into base config', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.STEP, () => ({
				visibility: { isHidden: true }
			}));

			expect(overrides.resolved).toEqual({
				steps: [],
				visibility: { isHidden: true }
			});
		});

		it('should add new keys from overrides', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.STEP, () => ({
				closeButton: false
			}));

			expect(overrides.resolved).toEqual({
				steps: [],
				visibility: { isHidden: false },
				closeButton: false
			});
		});
	});

	describe('case handling', () => {
		it('should clear overrides when set receives null', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.STEP, () => ({
				visibility: { isHidden: true }
			}));
			overrides.set(OverrideLayer.STEP, null);

			expect(overrides.resolved).toEqual({
				steps: [],
				visibility: { isHidden: false }
			});
		});

		it('should replace previous overrides when set is called again', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.STEP, () => ({
				closeButton: false
			}));

			overrides.set(OverrideLayer.STEP, () => ({
				tourOverlay: false
			}));

			expect(overrides.resolved.closeButton).toBeUndefined();
			expect(overrides.resolved.tourOverlay).toBe(false);
		});

		it('should deeply merge nested overrides', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: {
					isHidden: false,
					isAnimated: false
				}
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.STEP, () => ({
				visibility: { isHidden: true }
			}));

			expect(overrides.resolved.visibility).toEqual({
				isHidden: true,
				isAnimated: false
			});
		});
	});

	describe('edge cases', () => {
		it('should apply overrides when base config is minimal', () => {
			const config = useBordaConfig({
				steps: []
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.STEP, () => ({
				visibility: { isHidden: true }
			}));

			expect(overrides.resolved).toEqual({
				steps: [],
				visibility: { isHidden: true }
			});
		});

		it('should return base config when overrides return empty object', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.STEP, () => ({}));

			expect(overrides.resolved).toEqual({
				steps: [],
				visibility: { isHidden: false }
			});
		});

		it('should disable component when override sets false', () => {
			const config = useBordaConfig({
				steps: [],
				tourTooltip: {}
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.STEP, () => ({
				tourTooltip: false
			}));

			expect(overrides.resolved.tourTooltip).toBe(false);
		});
	});

	describe('consistency', () => {
		it('should not mutate base config', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const snapshot = {
				steps: [],
				visibility: { isHidden: false }
			};

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.STEP, () => ({
				visibility: { isHidden: true }
			}));

			expect(overrides.resolved).toBeDefined();
			expect(config.getConfig()).toEqual(snapshot);
		});

		it('should reflect base config changes after setConfig', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const overrides = useBordaOverrides(config);

			config.setConfig({
				steps: [],
				visibility: { isHidden: true }
			});

			expect(overrides.resolved).toEqual({
				steps: [],
				visibility: { isHidden: true }
			});
		});

		it('should create independent instances', () => {
			const configA = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const configB = useBordaConfig({
				steps: [],
				visibility: { isHidden: true }
			});

			const overridesA = useBordaOverrides(configA);
			const overridesB = useBordaOverrides(configB);

			overridesA.set(OverrideLayer.STEP, () => ({
				closeButton: false
			}));

			expect(overridesB.resolved.closeButton).toBeUndefined();
		});
	});

	describe('named layers', () => {
		it('should merge responsive layer below step layer', () => {
			const config = useBordaConfig({
				steps: []
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.RESPONSIVE, () => ({
				closeButton: false,
				tourOverlay: false
			}));

			overrides.set(OverrideLayer.STEP, () => ({
				closeButton: {}
			}));

			expect(overrides.resolved.closeButton).toEqual({});
			expect(overrides.resolved.tourOverlay).toBe(false);
		});

		it('should keep step layer when responsive is cleared', () => {
			const config = useBordaConfig({
				steps: []
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.RESPONSIVE, () => ({
				tourOverlay: false
			}));

			overrides.set(OverrideLayer.STEP, () => ({
				closeButton: false
			}));

			overrides.set(OverrideLayer.RESPONSIVE, null);

			expect(overrides.resolved.closeButton).toBe(false);
			expect(overrides.resolved.tourOverlay).toBeUndefined();
		});

		it('should keep responsive when step layer is cleared', () => {
			const config = useBordaConfig({
				steps: []
			});

			const overrides = useBordaOverrides(config);

			overrides.set(OverrideLayer.RESPONSIVE, () => ({
				tourOverlay: false
			}));

			overrides.set(OverrideLayer.STEP, () => ({
				closeButton: false
			}));

			overrides.set(OverrideLayer.STEP, null);

			expect(overrides.resolved.tourOverlay).toBe(false);
			expect(overrides.resolved.closeButton).toBeUndefined();
		});
	});
});
