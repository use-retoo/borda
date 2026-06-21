import type { BordaScrollEasingName } from '../enums';

/** Easing function signature: maps `progress` in [0, 1] to the eased value. */
export type BordaScrollEasingFn = (progress: number) => number;

/** Easing identifier — a built-in {@link BordaScrollEasingName} or a custom {@link BordaScrollEasingFn}. */
export type BordaScrollEasing = BordaScrollEasingName | BordaScrollEasingFn;

/** Props accepted by {@link useScrollEasing}. */
export interface UseScrollEasingProps {
	/** Reactive getter — returns the current easing identifier. */
	getEasing: () => BordaScrollEasing;
}

/** Reactive state returned by {@link useScrollEasing}. */
export interface UseScrollEasingReturns {
	/** Resolved easing function for the current identifier. Re-derives when the identifier changes. */
	easingFunction: BordaScrollEasingFn;
}
