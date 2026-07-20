/** Props for {@link useSwipeTouch}. */
export interface UseSwipeTouchProps {
	/** Returns the element to listen for swipe gestures on. Returning `null`/`undefined` deactivates the gesture. */
	getContainer: () => HTMLElement | null;

	/** Returns whether swipe detection is currently active. */
	getIsEnabled: () => boolean;

	/** Called when a leftward swipe (finger moving right-to-left) is detected. */
	onSwipeLeft: () => void;

	/** Called when a rightward swipe (finger moving left-to-right) is detected. */
	onSwipeRight: () => void;
}
