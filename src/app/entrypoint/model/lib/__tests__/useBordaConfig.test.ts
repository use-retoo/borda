import { describe, it, expect } from 'vitest';

import { useBordaConfig } from '../';

describe('useBordaConfig', () => {
	describe('basic functionality', () => {
		it('should return initial config with current', () => {
			const initial = {
				steps: [],
				visibility: { isHidden: false }
			};

			const config = useBordaConfig(initial);

			expect(config.current).toEqual(initial);
		});

		it('should return initial config with getConfig', () => {
			const initial = {
				steps: [],
				visibility: { isHidden: false }
			};

			const config = useBordaConfig(initial);

			expect(config.getConfig()).toEqual(initial);
		});

		it('should replace config with setConfig', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			config.setConfig({
				steps: [],
				visibility: { isHidden: true }
			});

			expect(config.getConfig()).toEqual({
				steps: [],
				visibility: { isHidden: true }
			});
		});

		it('should deeply merge partial config with mergeConfig', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: {
					isHidden: false,
					isAnimated: false
				}
			});

			config.mergeConfig({
				visibility: {
					isHidden: true
				}
			});

			expect(config.getConfig().visibility).toEqual({
				isHidden: true,
				isAnimated: false
			});
		});
	});

	describe('case handling', () => {
		it('should overwrite value when mergeConfig has same key', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			config.mergeConfig({
				visibility: {
					isHidden: true
				}
			});

			expect(config.getConfig().visibility?.isHidden).toBe(true);
		});

		it('should add key when mergeConfig has new key', () => {
			const config = useBordaConfig({
				steps: []
			});

			config.mergeConfig({
				visibility: {
					isHidden: true
				}
			});

			expect(config.getConfig().visibility).toEqual({
				isHidden: true
			});
		});
	});

	describe('edge cases', () => {
		it('should not change config when mergeConfig receives empty object', () => {
			const initial = {
				steps: [],
				visibility: { isHidden: false }
			};

			const config = useBordaConfig(initial);

			config.mergeConfig({});

			expect(config.getConfig()).toEqual(initial);
		});

		it('should reset config when setConfig receives minimal object', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			config.setConfig({
				steps: []
			});

			expect(config.getConfig()).toEqual({
				steps: []
			});
		});

		it('should disable component when mergeConfig sets false', () => {
			const config = useBordaConfig({
				steps: [],
				closeButton: {}
			});

			config.mergeConfig({
				closeButton: false
			});

			expect(config.getConfig().closeButton).toBe(false);
		});

		it('should disable multiple components when setConfig sets false', () => {
			const config = useBordaConfig({
				steps: []
			});

			config.setConfig({
				steps: [],
				tourOverlay: false,
				closeButton: false
			});

			expect(config.getConfig().tourOverlay).toBe(false);
			expect(config.getConfig().closeButton).toBe(false);
		});

		it('should re-enable component when mergeConfig replaces false with object', () => {
			const config = useBordaConfig({
				steps: [],
				tourTooltip: false
			});

			config.mergeConfig({
				tourTooltip: {}
			});

			expect(config.getConfig().tourTooltip).toEqual({});
			expect(config.getConfig().tourTooltip).not.toBe(false);
		});
	});

	describe('consistency', () => {
		it('should not mutate initial object', () => {
			const initial = {
				steps: [],
				visibility: { isHidden: false }
			};

			const snapshot = {
				steps: [],
				visibility: { isHidden: false }
			};

			const config = useBordaConfig(initial);

			config.setConfig({
				steps: [],
				visibility: { isHidden: true }
			});

			expect(initial).toEqual(snapshot);
		});

		it('should return new reference after setConfig', () => {
			const config = useBordaConfig({
				steps: []
			});

			const value = {
				steps: [],
				visibility: { isHidden: false }
			};

			config.setConfig(value);

			expect(config.getConfig()).not.toBe(value);
		});
	});
});
