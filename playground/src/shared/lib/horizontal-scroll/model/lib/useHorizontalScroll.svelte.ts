import { OVERFLOW_THRESHOLD } from '../constants';

import type { UseHorizontalScrollProps, UseHorizontalScrollReturns } from '../types';

/**
 * Makes a horizontally overflowing element scrollable with a plain vertical wheel.
 *
 * A mouse wheel only emits vertical deltas, so an `overflow-x` strip is
 * unreachable without a trackpad. This remaps those deltas onto `scrollLeft`,
 * and hands the gesture back to the page once an edge is reached. The reported
 * overflow state lets the consumer fade the edges that still hide content.
 *
 * @param props - Reactive getter for the scrollable container.
 * @returns Reactive start/end overflow flags.
 */
export default function useHorizontalScroll({
	getContainer
}: UseHorizontalScrollProps): UseHorizontalScrollReturns {
	let hasStartOverflow = $state(false);

	let hasEndOverflow = $state(false);

	/**
	 * Resolves how far the container can still scroll in either direction.
	 *
	 * @param container - The scrollable container.
	 */
	function syncOverflow(container: HTMLElement) {
		const maxScrollLeft = container.scrollWidth - container.clientWidth;

		hasStartOverflow = container.scrollLeft > OVERFLOW_THRESHOLD;
		hasEndOverflow = container.scrollLeft < maxScrollLeft - OVERFLOW_THRESHOLD;
	}

	function handleScroll() {
		const container = getContainer();
		if (!container) return;

		syncOverflow(container);
	}

	function handleWheel(event: WheelEvent) {
		const container = getContainer();
		if (!container) return;

		/** Trackpads already emit horizontal deltas — only a vertical wheel needs remapping. */
		if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

		const maxScrollLeft = container.scrollWidth - container.clientWidth;

		const nextScrollLeft = Math.min(
			Math.max(container.scrollLeft + event.deltaY, 0),
			maxScrollLeft
		);

		/** At either edge the gesture belongs to the page, so leave the default alone. */
		if (nextScrollLeft === container.scrollLeft) return;

		container.scrollLeft = nextScrollLeft;

		event.preventDefault();
	}

	$effect(() => {
		const container = getContainer();
		if (!container) return;

		syncOverflow(container);

		/** Re-measure when the strip or the viewport resizes. */
		const observer = new ResizeObserver(() => syncOverflow(container));

		observer.observe(container);

		container.addEventListener('scroll', handleScroll, { passive: true });
		container.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			observer.disconnect();
			container.removeEventListener('scroll', handleScroll);
			container.removeEventListener('wheel', handleWheel);
		};
	});

	return {
		get hasStartOverflow() {
			return hasStartOverflow;
		},
		get hasEndOverflow() {
			return hasEndOverflow;
		}
	};
}
