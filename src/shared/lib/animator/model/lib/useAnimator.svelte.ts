import type { UseAnimatorProps, UseAnimatorReturns } from '../types';

/**
 * Manages show/hide CSS animation state for a component.
 *
 * Tracks visibility transitions and derives the appropriate CSS class list
 * (`hidden`, `in`, `out`) based on the current and historical visibility state.
 *
 * @param props - Reactive getters for hidden/animated state and CSS class name map.
 * @returns Reactive animation state and a derived CSS class list.
 */
export default function useAnimator({
	getIsHidden,
	getIsAnimated,
	classNames
}: UseAnimatorProps): UseAnimatorReturns {
	let hasBeenVisible = $state(false);

	let hasBeenHidden = $state(false);

	const isAnimated = $derived(getIsAnimated());

	const isHidden = $derived(getIsHidden());

	const hasShownAnimation = $derived(isAnimated && !isHidden && hasBeenHidden);

	const hasHiddenAnimation = $derived(isAnimated && isHidden && hasBeenVisible);

	const classes = $derived(buildClasses());

	/**
	 * Builds the CSS class list for the current animation phase.
	 *
	 * Picks at most one of `hidden` / `in` / `out` based on the resolved
	 * sticky-history flags above.
	 *
	 * @returns Ordered class entries; falsy slots are filtered by the consumer.
	 */
	function buildClasses() {
		return [
			isHidden && !hasHiddenAnimation && classNames.hidden,
			hasShownAnimation && classNames.in,
			hasHiddenAnimation && classNames.out
		];
	}

	/**
	 * Updates the sticky-history flags from the current visibility.
	 *
	 * `hasBeenVisible` / `hasBeenHidden` only ever flip from `false` → `true`;
	 * they let the show/hide animation derivations know whether a real
	 * transition has occurred (vs. the initial mount).
	 */
	function trackVisibilityHistory() {
		if (isHidden) {
			hasBeenHidden = true;
		} else {
			hasBeenVisible = true;
		}
	}

	$effect.pre(() => {
		trackVisibilityHistory();
	});

	return {
		get isHidden() {
			return isHidden;
		},
		get hasShownAnimation() {
			return hasShownAnimation;
		},
		get hasHiddenAnimation() {
			return hasHiddenAnimation;
		},
		get classes() {
			return classes;
		}
	};
}
