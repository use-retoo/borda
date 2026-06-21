import { describe, it, expect } from 'vitest';

import { ComponentPlacement } from '@/shared/enums';

import { resolvePlacement } from '../index';

describe('resolvePlacement', () => {
	describe('basic functionality', () => {
		it('should return a known placement unchanged', () => {
			expect(resolvePlacement(ComponentPlacement.MIDDLE_END)).toBe(ComponentPlacement.MIDDLE_END);
		});
	});

	describe('case handling', () => {
		it('should fall back to BOTTOM_START for an invalid placement', () => {
			expect(resolvePlacement('right-start' as ComponentPlacement)).toBe(
				ComponentPlacement.BOTTOM_START
			);
		});
	});
});
