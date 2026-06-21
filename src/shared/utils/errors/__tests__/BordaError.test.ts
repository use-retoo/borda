import { describe, it, expect } from 'vitest';

import { BordaError } from '../index';

describe('BordaError', () => {
	describe('basic functionality', () => {
		it('should set the provided message', () => {
			const error = new BordaError('something went wrong');

			expect(error.message).toBe('something went wrong');
		});

		it('should have the name BordaError', () => {
			const error = new BordaError('boom');

			expect(error.name).toBe('BordaError');
		});
	});

	describe('case handling', () => {
		it('should be an instance of Error', () => {
			const error = new BordaError('boom');

			expect(error).toBeInstanceOf(Error);
		});

		it('should be an instance of BordaError', () => {
			const error = new BordaError('boom');

			expect(error).toBeInstanceOf(BordaError);
		});

		it('should be throwable and catchable as BordaError', () => {
			expect(() => {
				throw new BordaError('boom');
			}).toThrow(BordaError);
		});
	});

	describe('edge cases', () => {
		it('should handle an empty message', () => {
			const error = new BordaError('');

			expect(error.message).toBe('');
			expect(error.name).toBe('BordaError');
		});
	});
});
