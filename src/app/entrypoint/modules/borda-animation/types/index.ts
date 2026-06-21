import type { AnimationEffect } from '@/shared/enums';

import type { BordaScrollAppearance, BordaTooltipTransition } from '../enums';

/** Tooltip enter/exit animation settings. */
export interface BordaTooltipAnimation {
	/** Animation effect played on enter. */
	enter: AnimationEffect;
	/** Animation effect played on exit. */
	exit: AnimationEffect;
	/** Enter animation duration in ms. */
	enterDuration: number;
	/** Exit animation duration in ms. */
	exitDuration: number;
	/** CSS easing applied to the animation. */
	easing: string;
	/** When to reveal the tooltip relative to the scroll animation (fade transition only). */
	appearance: BordaScrollAppearance;
	/** How the tooltip moves between steps: `fade` (hide + fade in) or `glide` (stay + slide). */
	transition: BordaTooltipTransition;
}

/** Overlay/spotlight transition between steps. */
export interface BordaOverlayAnimation {
	/** Duration in ms used to wait for the overlay to settle between steps. */
	transitionDuration: number;
	/** CSS easing applied to the overlay transition. */
	easing: string;
}

/** Full animation feature config covering tooltip + overlay timings. */
export interface BordaAnimationConfig {
	/** Master switch for all animations. */
	isEnabled: boolean;
	/** Tooltip animation settings. Unspecified keys fall back to defaults. */
	tooltip: Partial<BordaTooltipAnimation>;
	/** Overlay/spotlight animation settings. Unspecified keys fall back to defaults. */
	overlay: Partial<BordaOverlayAnimation>;
}

/** Public API for inspecting the animation feature at runtime. */
export interface BordaAnimationApi {
	/** Whether animations are enabled globally. */
	isEnabled: boolean;
	/** Resolved tooltip animation settings. */
	tooltip: BordaTooltipAnimation;
	/** Resolved overlay animation settings. */
	overlay: BordaOverlayAnimation;
}

/** Return value of {@link useBordaAnimation}. */
export interface UseBordaAnimationReturns {
	apply: () => void;
	api: BordaAnimationApi;
}
