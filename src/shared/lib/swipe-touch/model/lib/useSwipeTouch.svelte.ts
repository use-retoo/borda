import { SWIPE_DISTANCE_THRESHOLD, SWIPE_RESTRAINT } from '../constants';

import type { UseSwipeTouchProps } from '../types';

/**
 * Detects horizontal swipe gestures on an element and reports their direction.
 *
 * Tracks a single touch from `touchstart` to `touchend`. If its horizontal
 * travel exceeds {@link SWIPE_DISTANCE_THRESHOLD} while its vertical travel
 * stays under {@link SWIPE_RESTRAINT} (ruling out a vertical scroll), fires
 * `onSwipeLeft` or `onSwipeRight` depending on direction.
 *
 * @param props - Reactive getters for the container element and enabled state, plus swipe callbacks.
 */
export default function useSwipeTouch({
	getContainer,
	getIsEnabled,
	onSwipeLeft,
	onSwipeRight
}: UseSwipeTouchProps): void {
	let startX = 0;

	let startY = 0;

	function onTouchStart(event: TouchEvent) {
		const touch = event.touches[0];
		if (!touch) return;

		startX = touch.clientX;
		startY = touch.clientY;
	}

	function onTouchEnd(event: TouchEvent) {
		const touch = event.changedTouches[0];
		if (!touch) return;

		const deltaX = touch.clientX - startX;
		const deltaY = touch.clientY - startY;

		if (Math.abs(deltaX) < SWIPE_DISTANCE_THRESHOLD || Math.abs(deltaY) > SWIPE_RESTRAINT) return;

		if (deltaX < 0) {
			onSwipeLeft();
		} else {
			onSwipeRight();
		}
	}

	$effect(() => {
		const container = getContainer();
		if (!container || !getIsEnabled()) return;

		container.addEventListener('touchstart', onTouchStart, { passive: true });
		container.addEventListener('touchend', onTouchEnd, { passive: true });

		return () => {
			container.removeEventListener('touchstart', onTouchStart);
			container.removeEventListener('touchend', onTouchEnd);
		};
	});
}
