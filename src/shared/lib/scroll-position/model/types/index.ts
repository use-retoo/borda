/** Reactive state returned by {@link useScrollPosition}. */
export interface UseScrollPositionReturns {
	/** Current `window.scrollX`. Re-derives on `scroll` (rAF-throttled). */
	x: number;
	/** Current `window.scrollY`. Re-derives on `scroll` (rAF-throttled). */
	y: number;
}
