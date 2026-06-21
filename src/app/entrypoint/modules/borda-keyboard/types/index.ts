/** Return value of {@link useBordaKeyboard}. */
export interface UseBordaKeyboardReturns {
	/** Attach keyboard listeners. Call once after mount. */
	apply: () => void;
	/** Remove keyboard listeners. Call on unmount. */
	destroy: () => void;
}
