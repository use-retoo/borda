/** Stateless API returned by {@link useAxisTarget}. */
export interface UseAxisTargetReturns {
	/**
	 * Resolves the target scroll offset that satisfies the alignment.
	 *
	 * @param currentScroll - Current scroll offset of the viewport on this axis.
	 * @param viewportSize - Viewport size on this axis (width or height).
	 * @param elementStart - Element's start coordinate relative to the viewport.
	 * @param elementSize - Element's size on this axis.
	 * @param alignment - Desired alignment of the element within the viewport.
	 * @returns The target scroll offset.
	 */
	resolve: (
		currentScroll: number,
		viewportSize: number,
		elementStart: number,
		elementSize: number,
		alignment: ScrollLogicalPosition
	) => number;
}
