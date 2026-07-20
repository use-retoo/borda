import type { UseAnimatorReturns } from '../../types';

/** Static `useAnimator` stand-in for `vi.mock('@/shared/lib/animator', ...)` — a settled, non-animating state. */
export function createAnimatorMock(): UseAnimatorReturns {
	return {
		isHidden: false,
		hasShownAnimation: false,
		hasHiddenAnimation: false,
		classes: []
	};
}
