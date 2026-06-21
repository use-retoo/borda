/** Event names emitted by the borda widget event bus. */
export enum BordaEvent {
	/** Fired when the borda instance is destroyed. */
	ON_BORDA_DESTROY = 'borda:on-destroy',

	/** Fired when the close button is clicked. */
	ON_CLOSE_CLICK = 'close:click',
	/** Fired when the overlay backdrop is clicked or activated via Enter/Space. */
	ON_OVERLAY_CLICK = 'overlay:click',

	/** Fired when the tour initialises (on mount). */
	ON_TOUR_START = 'tour:start',
	/** Fired when the last step is completed. */
	ON_TOUR_FINISH = 'tour:finish',
	/** Fired when the tour is dismissed before completion (close button, backdrop or Escape). */
	ON_TOUR_CLOSE = 'tour:close',
	/** Fired when advancing to the next step (not on last step → finish). */
	ON_TOUR_NEXT = 'tour:next',
	/** Fired when navigating to the previous step. */
	ON_TOUR_PREV = 'tour:prev',
	/** Fired when a step's target fails to resolve to a DOM element, just before the tour closes. */
	ON_TOUR_ERROR = 'tour:error',
	/** Fired when the ArrowRight key is pressed during an active tour. */
	ON_KEYBOARD_NEXT = 'keyboard:next',
	/** Fired when the ArrowLeft key is pressed during an active tour. */
	ON_KEYBOARD_PREV = 'keyboard:prev',
	/** Fired when the active step changes. */
	ON_TOUR_STEP_CHANGE = 'tour:step-change',

	/** Fired when the "don't show again" checkbox changes value. */
	ON_SKIP_CHANGE = 'skip:change',
	/** Fired when the skip state is cleared via {@link BordaSkipApi.clear}. */
	ON_SKIP_CLEAR = 'skip:clear',

	/** Fired when the widget becomes visible. */
	ON_VISIBILITY_SHOW = 'visibility:show',
	/** Fired when the widget becomes hidden. */
	ON_VISIBILITY_HIDE = 'visibility:hide'
}
