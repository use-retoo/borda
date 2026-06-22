/** Reactive state returned by {@link useViewportSize}. */
export interface UseViewportSizeReturns {
	/** Current visible viewport width (`visualViewport.width` where supported, else `window.innerWidth`). */
	width: number;
	/** Current visible viewport height (`visualViewport.height` where supported, else `window.innerHeight`). */
	height: number;
}
