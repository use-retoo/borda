/** Return value of {@link useBordaVisibility}. */
export interface UseBordaVisibilityReturns {
	/** Apply initial visibility state from config defaults. */
	apply: () => void;
	/** Reactive public API for controlling widget visibility. */
	api: BordaVisibilityApi;
}

/** Public API for controlling widget visibility at runtime. */
export interface BordaVisibilityApi {
	/** Whether the widget is currently hidden. */
	isHidden: boolean;
	/** Show the widget (set `isHidden` to `false`). */
	show: () => void;
	/** Hide the widget (set `isHidden` to `true`). */
	hide: () => void;
}

/** Visibility feature configuration options. */
export interface BordaVisibilityConfig {
	/** Start the widget in a hidden state. */
	isHidden: boolean;
	/** Enable CSS animations for show/hide transitions. */
	isAnimated: boolean;
}
