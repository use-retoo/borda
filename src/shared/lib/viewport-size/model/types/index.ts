/** Reactive state returned by {@link useViewportSize}. */
export interface UseViewportSizeReturns {
	/** Current `window.innerWidth`. Re-derives on resize. */
	width: number;
	/** Current `window.innerHeight`. Re-derives on resize. */
	height: number;
}
