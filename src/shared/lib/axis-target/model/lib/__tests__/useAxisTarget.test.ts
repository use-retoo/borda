import { describe, it, expect } from 'vitest';

import { useAxisTarget } from '../';

describe('useAxisTarget', () => {
	describe('basic functionality', () => {
		it('should return a resolve function', () => {
			const { resolve } = useAxisTarget();

			expect(typeof resolve).toBe('function');
		});
	});

	describe('start alignment', () => {
		it('should scroll to align element start with viewport start', () => {
			const { resolve } = useAxisTarget();

			const result = resolve(0, 800, 200, 100, 'start');

			expect(result).toBe(200);
		});

		it('should account for current scroll with start alignment', () => {
			const { resolve } = useAxisTarget();

			const result = resolve(100, 800, 200, 100, 'start');

			expect(result).toBe(300);
		});
	});

	describe('end alignment', () => {
		it('should scroll to align element end with viewport end', () => {
			const { resolve } = useAxisTarget();

			const result = resolve(0, 800, 600, 100, 'end');

			expect(result).toBe(-100);
		});
	});

	describe('center alignment', () => {
		it('should scroll to center element in viewport', () => {
			const { resolve } = useAxisTarget();

			// elementStart=700, elementSize=200 → center at 800; viewport center at 400 → delta=400
			const result = resolve(0, 800, 700, 200, 'center');

			expect(result).toBe(400);
		});

		it('should return current scroll when element is already centered', () => {
			const { resolve } = useAxisTarget();

			// elementStart=300, elementSize=200 → center at 400 = viewport center (800/2)
			const result = resolve(0, 800, 300, 200, 'center');

			expect(result).toBe(0);
		});
	});

	describe('nearest alignment', () => {
		it('should return current scroll when element is fully visible', () => {
			const { resolve } = useAxisTarget();

			const result = resolve(0, 800, 100, 200, 'nearest');

			expect(result).toBe(0);
		});

		it('should scroll to show element when it is before viewport', () => {
			const { resolve } = useAxisTarget();

			const result = resolve(200, 800, -50, 100, 'nearest');

			expect(result).toBe(150);
		});

		it('should scroll to show element when it is after viewport', () => {
			const { resolve } = useAxisTarget();

			const result = resolve(0, 800, 750, 100, 'nearest');

			expect(result).toBe(50);
		});
	});

	describe('consistency', () => {
		it('should create independent instances', () => {
			const a = useAxisTarget();
			const b = useAxisTarget();

			expect(a.resolve(0, 800, 200, 100, 'start')).toBe(b.resolve(0, 800, 200, 100, 'start'));
		});
	});
});
