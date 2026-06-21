import { BordaError } from '../../errors';
import { isBrowser } from '../is-browser';

/**
 * Throws a {@link BordaError} when called outside a browser environment.
 *
 * @param method - The calling method name, included in the error message.
 * @throws {BordaError} When `isBrowser` is `false`.
 */
export function assertBrowser(method: string): void {
	if (!isBrowser) {
		throw new BordaError(`${method}() requires a browser environment`);
	}
}
