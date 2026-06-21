import type { UseAxisTargetReturns } from '../types';

/**
 * Composable that resolves the alignment-driven scroll position for one axis.
 *
 * Computes the target scroll offset that brings an element into the desired
 * alignment within its viewport on a single axis (horizontal or vertical).
 *
 * @returns Stateless API exposing a `resolve` method.
 */
export default function useAxisTarget(): UseAxisTargetReturns {
	/**
	 * Computes the delta to add to the current scroll for the given alignment.
	 *
	 * Pure — does not depend on `currentScroll`.
	 *
	 * @param viewportSize - Viewport size on this axis (width or height).
	 * @param elementStart - Element's start coordinate relative to the viewport.
	 * @param elementSize - Element's size on this axis.
	 * @param alignment - Desired alignment of the element within the viewport.
	 * @returns Scroll delta in pixels.
	 */
	function resolveDelta(
		viewportSize: number,
		elementStart: number,
		elementSize: number,
		alignment: ScrollLogicalPosition
	): number {
		const elementEnd = elementStart + elementSize;

		switch (alignment) {
			case 'start':
				return elementStart;
			case 'end':
				return elementEnd - viewportSize;
			case 'center':
				return elementStart + elementSize / 2 - viewportSize / 2;
			case 'nearest':
			default:
				if (elementStart >= 0 && elementEnd <= viewportSize) return 0;
				if (elementStart < 0) return elementStart;

				return elementEnd - viewportSize;
		}
	}

	function resolve(
		currentScroll: number,
		viewportSize: number,
		elementStart: number,
		elementSize: number,
		alignment: ScrollLogicalPosition
	): number {
		return currentScroll + resolveDelta(viewportSize, elementStart, elementSize, alignment);
	}

	return { resolve };
}
