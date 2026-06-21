/**
 * Base error class for all borda runtime errors.
 *
 * Using a named subclass makes borda errors easy to identify
 * in stack traces and `instanceof` checks.
 */
export class BordaError extends Error {
	override readonly name = 'BordaError';

	constructor(message: string) {
		super(message);
	}
}
