import { BUILTIN_EASINGS, DEFAULT_SCROLL_EASING_NAME } from '../constants';

import type {
	BordaScrollEasing,
	BordaScrollEasingFn,
	UseScrollEasingProps,
	UseScrollEasingReturns
} from '../types';

/**
 * Reactively resolves a scroll easing identifier to its function form.
 *
 * Accepts either a built-in {@link BordaScrollEasingName} or a custom {@link BordaScrollEasingFn}.
 * Falls back to {@link DEFAULT_SCROLL_EASING_NAME} when no easing is provided.
 *
 * @param props - Reactive getter for the current easing identifier.
 * @returns Reactive resolved easing function that re-derives when the identifier changes.
 */
export default function useScrollEasing({
	getEasing
}: UseScrollEasingProps): UseScrollEasingReturns {
	const easing = $derived(getEasing());

	const easingFunction = $derived(resolveFn(easing));

	/**
	 * Resolves an easing identifier to its function form.
	 *
	 * Custom functions pass through. Built-in names are looked up in
	 * {@link BUILTIN_EASINGS}. Falsy values use {@link DEFAULT_SCROLL_EASING_NAME}.
	 *
	 * @param easing - The easing identifier (name or function).
	 * @returns The matching easing function.
	 */
	function resolveFn(easing: BordaScrollEasing): BordaScrollEasingFn {
		if (typeof easing === 'function') return easing;
		if (easing) return BUILTIN_EASINGS[easing];

		return BUILTIN_EASINGS[DEFAULT_SCROLL_EASING_NAME];
	}

	return {
		get easingFunction() {
			return easingFunction;
		}
	};
}
