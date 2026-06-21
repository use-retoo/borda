/** Controls when a component becomes visible relative to the scroll animation. */
export enum BordaScrollAppearance {
	DURING_SCROLL = 'during-scroll',
	AFTER_SCROLL = 'after-scroll'
}

/** How the tooltip moves between steps. */
export enum BordaTooltipTransition {
	/** Hide the tooltip while scrolling/transitioning, then fade it in at the new step. */
	FADE = 'fade',
	/** Keep the tooltip visible and glide its position to the new step. */
	GLIDE = 'glide'
}
