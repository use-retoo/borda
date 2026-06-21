/** Stateless API returned by {@link useViewportVisibility}. */
export interface UseViewportVisibilityReturns {
	/**
	 * Checks whether an element is fully visible inside the current viewport.
	 *
	 * Compares the element's bounding rect against `window.innerWidth`/`innerHeight`.
	 * Returns `false` if any edge is clipped, even partially.
	 *
	 * @param element - The element to check.
	 * @returns `true` when the element fits entirely within the viewport.
	 */
	isFullyVisible: (element: HTMLElement) => boolean;
}
