import { BordaScrollEasingName } from '../enums';

import type { BordaScrollEasingFn } from '../types';

/** Built-in easing function table keyed by {@link BordaScrollEasingName}. */
export const BUILTIN_EASINGS: Record<BordaScrollEasingName, BordaScrollEasingFn> = {
	[BordaScrollEasingName.LINEAR]: (progress) => progress,
	[BordaScrollEasingName.EASE]: (progress) => progress * progress * (3 - 2 * progress),
	[BordaScrollEasingName.EASE_IN]: (progress) => progress * progress,
	[BordaScrollEasingName.EASE_OUT]: (progress) => 1 - (1 - progress) * (1 - progress),
	[BordaScrollEasingName.EASE_IN_OUT]: (progress) =>
		progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
};

/** Fallback easing used when an unknown name is provided to {@link useScrollEasing}. */
export const DEFAULT_SCROLL_EASING_NAME = BordaScrollEasingName.EASE_IN_OUT;
