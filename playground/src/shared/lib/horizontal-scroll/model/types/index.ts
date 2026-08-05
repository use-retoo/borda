/** Props for {@link useHorizontalScroll}. */
export interface UseHorizontalScrollProps {
	/** Returns the horizontally scrollable element. Returning `null` deactivates the hook. */
	getContainer: () => HTMLElement | null;
}

/** Reactive overflow state of the tracked container. */
export interface UseHorizontalScrollReturns {
	/** Whether content is scrolled past the start edge. */
	hasStartOverflow: boolean;

	/** Whether content remains hidden past the end edge. */
	hasEndOverflow: boolean;
}
