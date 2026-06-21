// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { resolveBordaStepTarget } from '../resolveBordaStepTarget';

describe('resolveBordaStepTarget', () => {
	beforeEach(() => {
		document.body.innerHTML = '';

		/** jsdom doesn't implement `CSS.escape`. */
		globalThis.CSS ??= { escape: (value: string) => value } as typeof CSS;
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	describe('basic functionality', () => {
		it('should return null when target is undefined', () => {
			expect(resolveBordaStepTarget(undefined)).toBeNull();
		});

		it('should return the element directly when target is an HTMLElement', () => {
			const element = document.createElement('div');

			expect(resolveBordaStepTarget(element)).toBe(element);
		});

		it('should resolve a CSS selector string to the matching element', () => {
			const element = document.createElement('div');
			element.id = 'target';
			document.body.append(element);

			expect(resolveBordaStepTarget('#target')).toBe(element);
		});

		it('should resolve a structured id query', () => {
			const element = document.createElement('div');
			element.id = 'target';
			document.body.append(element);

			expect(resolveBordaStepTarget({ id: 'target' })).toBe(element);
		});

		it('should resolve a structured data query', () => {
			const element = document.createElement('div');
			element.dataset.borda = 'step';
			document.body.append(element);

			expect(resolveBordaStepTarget({ data: { name: 'borda', value: 'step' } })).toBe(element);
		});
	});

	describe('case handling', () => {
		it('should return null for a selector that matches nothing', () => {
			expect(resolveBordaStepTarget('#does-not-exist')).toBeNull();
		});

		it('should return null instead of throwing for an empty string selector', () => {
			expect(resolveBordaStepTarget('')).toBeNull();
		});

		it('should return null instead of throwing for a malformed selector', () => {
			expect(resolveBordaStepTarget('##invalid')).toBeNull();
		});

		it('should return null for an empty structured query', () => {
			expect(resolveBordaStepTarget({})).toBeNull();
		});
	});
});
