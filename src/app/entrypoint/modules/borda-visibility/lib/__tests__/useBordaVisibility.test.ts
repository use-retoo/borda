import { describe, it, expect } from 'vitest';

import { useBordaConfig } from '@/app/entrypoint';
import { useEventEmitter } from '@/entities/event';

import { useBordaVisibility } from '../';

describe('useBordaVisibility', () => {
	describe('basic functionality', () => {
		it('should show widget with show', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: true }
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			visibility.api.show();

			expect(visibility.api.isHidden).toBe(false);
		});

		it('should hide widget with hide', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			visibility.api.hide();

			expect(visibility.api.isHidden).toBe(true);
		});

		it('should reflect isHidden from config', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: true }
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			expect(visibility.api.isHidden).toBe(true);
		});
	});

	describe('case handling', () => {
		it('should default isHidden to false when not set', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: {}
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			expect(visibility.api.isHidden).toBe(false);
		});

		it('should default isHidden to false when no visibility config', () => {
			const config = useBordaConfig({
				steps: []
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			expect(visibility.api.isHidden).toBe(false);
		});
	});

	describe('apply', () => {
		it('should apply defaults when no visibility config', () => {
			const config = useBordaConfig({
				steps: []
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			visibility.apply();

			expect(config.getConfig().visibility).toEqual({
				isHidden: false,
				isAnimated: true
			});
		});

		it('should preserve explicit isHidden false', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			visibility.apply();

			expect(config.getConfig().visibility).toEqual({
				isHidden: false,
				isAnimated: true
			});
		});

		it('should preserve explicit isHidden true', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: true }
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			visibility.apply();

			expect(config.getConfig().visibility).toEqual({
				isHidden: true,
				isAnimated: true
			});
		});
	});

	describe('edge cases', () => {
		it('should handle toggling visibility back and forth', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			visibility.api.hide();
			visibility.api.show();
			visibility.api.hide();

			expect(visibility.api.isHidden).toBe(true);
		});

		it('should not change state when show is called while already visible', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			visibility.api.show();

			expect(visibility.api.isHidden).toBe(false);
		});

		it('should not change state when hide is called while already hidden', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: true }
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			visibility.api.hide();

			expect(visibility.api.isHidden).toBe(true);
		});
	});

	describe('consistency', () => {
		it('should persist show/hide in config', () => {
			const config = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const visibility = useBordaVisibility(config, useEventEmitter());

			visibility.api.hide();

			expect(config.getConfig().visibility?.isHidden).toBe(true);
		});

		it('should create independent instances', () => {
			const configA = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const visibilityA = useBordaVisibility(configA, useEventEmitter());

			const configB = useBordaConfig({
				steps: [],
				visibility: { isHidden: false }
			});

			const visibilityB = useBordaVisibility(configB, useEventEmitter());

			visibilityA.api.hide();

			expect(visibilityB.api.isHidden).toBe(false);
		});
	});
});
