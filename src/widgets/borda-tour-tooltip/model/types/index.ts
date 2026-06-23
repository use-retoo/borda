import type { AnimationEffect, ComponentPlacement, ComponentSize } from '@/shared/enums';
import type {
	ComponentAriaProps,
	ComponentClasses,
	ComponentSnippet,
	ComponentStyles
} from '@/shared/types';

import type { BordaTooltipArrowSide } from '../enums';

/** Animation settings consumed by the tooltip widget. */
export interface BordaTourTooltipAnimation {
	enter: AnimationEffect;
	exit: AnimationEffect;
	enterDuration: number;
	exitDuration: number;
	easing: string;
}

/** Custom CSS classes for tooltip elements. */
export interface BordaTourTooltipComponentClasses {
	root: ComponentClasses;
	header: ComponentClasses;
	title: ComponentClasses;
	description: ComponentClasses;
}

/** Custom inline styles for tooltip elements. */
export interface BordaTourTooltipComponentStyles {
	root: ComponentStyles;
	header: ComponentStyles;
	title: ComponentStyles;
	description: ComponentStyles;
}

/** Custom HTML overrides for the tooltip content. */
export interface BordaTourTooltipComponentHtml {
	title: string;
	description: string;
}

/** Spatial parameters controlling tooltip placement relative to the spotlight and viewport. */
export interface BordaTourTooltipPositionProps {
	offset: number;
	margin: number;
	padding: number;
}

/** Arrow configuration. Pass `false` to disable the arrow entirely. */
export interface BordaTourTooltipArrowProps {
	placement: ComponentPlacement;
}

/**
 * Auto-flip placement when the requested placement does not fit in the viewport.
 * The first placement from `fallback` that fits wins; if none fit, the originally
 * requested placement is kept (and clamped to the viewport).
 */
export interface BordaTourTooltipAutoPlacement {
	/** Ordered list of placements to try after the requested one. First fit wins. */
	fallback: ComponentPlacement[];
}

/** Full props accepted by the BordaTourTooltip component. */
export interface BordaTourTooltipProps extends BordaTourTooltipPositionProps {
	id: string;
	title: string;
	description: string;
	size: ComponentSize;
	placement: ComponentPlacement;
	targetElement: HTMLElement | null;
	arrow: BordaTourTooltipArrowProps | false;
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaTourTooltipComponentClasses>;
	customStyles: Partial<BordaTourTooltipComponentStyles>;
	customHtml: Partial<BordaTourTooltipComponentHtml>;
	/** Whether the tooltip should currently be hidden — drives the enter/exit animation. */
	isHidden: boolean;
	/** Whether the tooltip glides its position between steps (CSS transition on top/left). */
	hasGlide: boolean;
	/** Animation timings/kind. Pass `false` to disable animation completely. */
	animation: BordaTourTooltipAnimation | false;
	/**
	 * Auto-flip placement to fit the viewport.
	 * - `true` — enabled with a mirrored default fallback (e.g. `bottom-start` → `top-start`).
	 * - `false` — disabled, use the requested placement as-is (clamped).
	 * - Object — custom fallback chain.
	 */
	autoPlacement: BordaTourTooltipAutoPlacement | boolean;
	/** Called once the exit (fade/scale/slide-out) animation has fully settled to hidden. */
	onExitComplete: () => void;
}

/** Snippet slots for the tooltip. */
export interface BordaTourTooltipSnippets {
	image: ComponentSnippet;
	close: ComponentSnippet;
	skip: ComponentSnippet;
	progress: ComponentSnippet;
	footer: ComponentSnippet;
}

/** DOM element references exposed via `getElements()`. */
export interface BordaTourTooltipElements {
	root: HTMLDivElement | null;
}

/**
 * The tooltip's resolved viewport-coordinate rect — its final placed position,
 * ignoring any in-flight glide transition (which `getBoundingClientRect` would
 * otherwise report mid-animation).
 */
export interface BordaTourTooltipResolvedRect {
	top: number;
	left: number;
	width: number;
	height: number;
}

/** Public ref API exposed by the component via `bind:this`. */
export interface BordaTourTooltipRef {
	getElements: () => BordaTourTooltipElements;
	getResolvedRect: () => BordaTourTooltipResolvedRect | null;
}

/** Props accepted by the tooltip position hook. */
export interface UseTooltipPositionProps {
	getTargetElement: () => HTMLElement | null;
	getTooltipElement: () => HTMLElement | null;
	getPlacement: () => ComponentPlacement;
	getOffset: () => number;
	getMargin: () => number;
	getPadding: () => number;
	getAutoPlacement: () => BordaTourTooltipAutoPlacement | boolean;
	/**
	 * Reactive getter for the arrow side, sourced from `useTooltipArrow().side`.
	 * Drives `arrowOffset` computation along the perpendicular axis.
	 * `null` (no arrow) skips arrow offset updates.
	 */
	getArrowSide: () => BordaTooltipArrowSide | null;
	/**
	 * Reactive getter for the tooltip's hidden state. The layout is recomputed on
	 * the hidden→visible transition so the flip is re-evaluated against the
	 * target's final position once a scroll-to-step has settled.
	 */
	getIsHidden: () => boolean;
}

/** CSS `position` the tooltip is rendered with, chosen by the target's anchoring. */
export type BordaTooltipCssPosition = 'absolute' | 'fixed';

/** Reactive position returned by the tooltip position hook. */
export interface UseTooltipPositionReturns {
	top: number;
	left: number;
	/**
	 * CSS `position` to render the tooltip with: `absolute` (document coordinates,
	 * scrolls with the page) for document-flow targets, `fixed` (viewport
	 * coordinates) for `fixed`/`sticky` targets.
	 */
	cssPosition: BordaTooltipCssPosition;
	/** The placement actually used after auto-flip resolution. */
	effectivePlacement: ComponentPlacement;
	/**
	 * Offset (px) along the tooltip edge where the arrow should be anchored,
	 * measured from the tooltip's top-left corner. Used to point the arrow at
	 * the target's center regardless of placement variant (start/center/end).
	 */
	arrowOffset: number;
}

/** Props accepted by the tooltip arrow hook. */
export interface UseTooltipArrowProps {
	getArrow: () => BordaTourTooltipArrowProps | false | undefined;
	getPlacement: () => ComponentPlacement;
}

/** Reactive state returned by the tooltip arrow hook. */
export interface UseTooltipArrowReturns {
	/** Which edge of the tooltip the arrow sits on, or `null` when hidden. */
	side: BordaTooltipArrowSide | null;
	/** CSS classes to apply on the arrow element, or `null` when the arrow is hidden. */
	classes: string[] | null;
}

/** Lightweight subset of DOMRect used internally by the tooltip position hook. */
export interface BordaTooltipRect {
	top: number;
	right: number;
	bottom: number;
	left: number;
	width: number;
	height: number;
}

/** A computed top/left pair (document-relative). */
export interface BordaTooltipPosition {
	top: number;
	left: number;
}

/** The tooltip's rendered size in pixels. */
export interface BordaTooltipSize {
	width: number;
	height: number;
}

/** A placement that fits the viewport, together with its resolved position. */
export interface BordaTooltipPlacementFit {
	placement: ComponentPlacement;
	position: BordaTooltipPosition;
}

/** Min/max top/left (document coordinates) that keep the tooltip inside the viewport. */
export interface BordaTooltipViewportBounds {
	minTop: number;
	maxTop: number;
	minLeft: number;
	maxLeft: number;
}

/**
 * Per-side overflow of a candidate position past the viewport (px).
 * Positive means the tooltip overflows that side; negative is the spare gap.
 */
export interface BordaTooltipOverflow {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

/** Props accepted by the tooltip layout hook — a snapshot of everything the geometry depends on. */
export interface UseTooltipLayoutProps {
	/** The DOM element the tooltip points at. */
	target: HTMLElement;
	/** The tooltip root element (read for its rendered size). */
	tooltip: HTMLElement;
	/** The requested placement. */
	placement: ComponentPlacement;
	/** Extra pixel gap between anchor and tooltip along the main axis. */
	offset: number;
	/** Minimum gap to keep from each viewport edge (added to `offset`). */
	margin: number;
	/** Pixels the target rect is expanded by before positioning. */
	padding: number;
	/** Auto-flip configuration. */
	autoPlacement: BordaTourTooltipAutoPlacement | boolean;
	/** The tooltip edge the arrow sits on, or `null` when hidden. */
	arrowSide: BordaTooltipArrowSide | null;
	/** The viewport size in pixels. */
	viewport: BordaTooltipSize;
}

/** Resolved tooltip geometry returned by the tooltip layout hook. */
export interface UseTooltipLayoutReturns {
	/** The resolved top/left in document coordinates. */
	position: BordaTooltipPosition;
	/** The placement actually used (after auto-flip). */
	placement: ComponentPlacement;
	/** The arrow's perpendicular-axis offset in pixels. */
	arrowOffset: number;
}
