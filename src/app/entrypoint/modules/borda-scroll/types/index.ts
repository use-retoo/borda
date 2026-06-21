import type { BordaScrollEasing } from '@/shared/lib/scroll-easing';

/** Pixel offsets applied to the resolved scroll destination. */
export interface BordaScrollOffset {
	x: number;
	y: number;
}

/** Config for the scroll feature (smooth-follow the active step target). */
export interface BordaScrollConfig {
	/** Vertical alignment of the target after scroll. */
	block: ScrollLogicalPosition;
	/** Horizontal alignment of the target after scroll. */
	inline: ScrollLogicalPosition;
	/** Animation duration in ms. Use `0` for an instant jump. */
	duration: number;
	/** Easing function or built-in name. */
	easing: BordaScrollEasing;
	/** Pixel offsets applied on top of the alignment-resolved coordinates. Unspecified axes default to `0`. */
	offset: Partial<BordaScrollOffset>;
	/** Block manual page scroll while the tour is active so the spotlight stays put. Defaults to `true`; set `false` to allow scrolling. */
	isLocked: boolean;
}

/** Public API for controlling scroll behavior at runtime. */
export interface BordaScrollApi {
	/** Whether a scroll-to-target animation is currently in progress. */
	isScrolling: boolean;
	/** Whether manual page scroll is currently blocked. */
	isLocked: boolean;
	/** Scroll to bring an element into view; resolves once the animation finishes. */
	scrollTo: (element: HTMLElement | null) => Promise<void>;
}

/** Return value of {@link useBordaScroll}. */
export interface UseBordaScrollReturns {
	apply: () => void;
	destroy: () => void;
	api: BordaScrollApi;
}

/** Scroll animation handle. */
export interface BordaActiveScrollAnimation {
	cancel: () => void;
}
