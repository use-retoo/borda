import { describe, it, expect } from 'vitest';

import { useScrollEasing } from '../';
import { BUILTIN_EASINGS, DEFAULT_SCROLL_EASING_NAME } from '../../constants';
import { BordaScrollEasingName } from '../../enums';

describe('useScrollEasing', () => {
	describe('basic functionality', () => {
		it('should return an easingFunction', () => {
			const { easingFunction } = useScrollEasing({ getEasing: () => BordaScrollEasingName.LINEAR });

			expect(typeof easingFunction).toBe('function');
		});

		it('should resolve linear easing by name', () => {
			const { easingFunction } = useScrollEasing({ getEasing: () => BordaScrollEasingName.LINEAR });

			expect(easingFunction(0)).toBe(0);
			expect(easingFunction(0.5)).toBe(0.5);
			expect(easingFunction(1)).toBe(1);
		});

		it('should resolve ease easing by name', () => {
			const { easingFunction } = useScrollEasing({ getEasing: () => BordaScrollEasingName.EASE });

			expect(easingFunction(0)).toBe(0);
			expect(easingFunction(1)).toBe(1);
		});

		it('should resolve ease-in easing by name', () => {
			const { easingFunction } = useScrollEasing({
				getEasing: () => BordaScrollEasingName.EASE_IN
			});

			expect(easingFunction(0)).toBe(0);
			expect(easingFunction(1)).toBe(1);
			expect(easingFunction(0.5)).toBe(0.25);
		});

		it('should resolve ease-out easing by name', () => {
			const { easingFunction } = useScrollEasing({
				getEasing: () => BordaScrollEasingName.EASE_OUT
			});

			expect(easingFunction(0)).toBe(0);
			expect(easingFunction(1)).toBe(1);
			expect(easingFunction(0.5)).toBe(0.75);
		});

		it('should resolve ease-in-out easing by name', () => {
			const { easingFunction } = useScrollEasing({
				getEasing: () => BordaScrollEasingName.EASE_IN_OUT
			});

			expect(easingFunction(0)).toBe(0);
			expect(easingFunction(1)).toBe(1);
		});
	});

	describe('case handling', () => {
		it('should accept a custom easing function', () => {
			const customFn = (p: number) => p * p * p;

			const { easingFunction } = useScrollEasing({ getEasing: () => customFn });

			expect(easingFunction).toBe(customFn);
			expect(easingFunction(0.5)).toBe(0.125);
		});

		it('should fall back to default easing when getEasing returns falsy', () => {
			const { easingFunction } = useScrollEasing({
				getEasing: () => undefined as unknown as BordaScrollEasingName
			});

			const defaultFn = BUILTIN_EASINGS[DEFAULT_SCROLL_EASING_NAME];

			expect(easingFunction(0.5)).toBe(defaultFn(0.5));
		});
	});

	describe('edge cases', () => {
		it('should produce 0 at progress 0 for all built-in easings', () => {
			for (const name of Object.values(BordaScrollEasingName)) {
				const { easingFunction } = useScrollEasing({ getEasing: () => name });

				expect(easingFunction(0)).toBe(0);
			}
		});

		it('should produce 1 at progress 1 for all built-in easings', () => {
			for (const name of Object.values(BordaScrollEasingName)) {
				const { easingFunction } = useScrollEasing({ getEasing: () => name });

				expect(easingFunction(1)).toBe(1);
			}
		});
	});

	describe('consistency', () => {
		it('should create independent instances', () => {
			const a = useScrollEasing({ getEasing: () => BordaScrollEasingName.LINEAR });
			const b = useScrollEasing({ getEasing: () => BordaScrollEasingName.EASE_IN });

			expect(a.easingFunction(0.5)).not.toBe(b.easingFunction(0.5));
		});
	});
});
