/** Props for {@link useFocusTrap}. */
export interface UseFocusTrapProps {
	/** Returns the element whose focusable descendants should be trapped. Returning `null`/`undefined` deactivates the trap. */
	getContainer: () => HTMLElement | null;
}
