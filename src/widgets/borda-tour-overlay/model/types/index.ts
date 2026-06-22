import type { ComponentAriaProps, ComponentClasses, ComponentStyles } from '@/shared/types';

/** Custom CSS class overrides for the overlay widget. */
export interface BordaTourOverlayComponentClasses {
	root: ComponentClasses;
	backdrop: ComponentClasses;
}

/** Custom inline style overrides for the overlay widget. */
export interface BordaTourOverlayComponentStyles {
	root: ComponentStyles;
	backdrop: ComponentStyles;
}

/** Props for the BordaTourOverlay widget. */
export interface BordaTourOverlayProps {
	id: string;
	targetElement: HTMLElement | null;
	padding: number;
	borderRadius: number;
	isAnimated: boolean;
	hasCloseOnBackdropClick: boolean;
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaTourOverlayComponentClasses>;
	customStyles: Partial<BordaTourOverlayComponentStyles>;
}

/** Event handlers for the overlay widget. */
export interface BordaTourOverlayEvents {
	onClose: (event: MouseEvent) => void;
}

/** DOM element references exposed via `getElements()`. */
export interface BordaTourOverlayElements {
	root: SVGSVGElement | null;
	backdrop: SVGPathElement | null;
}

/** Public ref exposed by the BordaTourOverlay widget via `bind:this`. */
export interface BordaTourOverlayRef {
	getElements: () => BordaTourOverlayElements;
}

/** Props accepted by the overlay spotlight hook. */
export interface UseOverlayProps {
	getTargetElement: () => HTMLElement | null;
	getBorderRadius: () => number;
	getPadding: () => number;
	getIsAnimated: () => boolean;
}

/** CSS `position` the overlay SVG is rendered with, chosen by the target's anchoring. */
export type BordaOverlayCssPosition = 'absolute' | 'fixed';

/** Reactive state returned by the overlay spotlight hook. */
export interface UseOverlayReturns {
	backdropPath: string;
	/**
	 * CSS `position` to render the overlay with: `absolute` (document coordinates,
	 * scrolls with the page) for document-flow targets, `fixed` (viewport
	 * coordinates) for `fixed`/`sticky` targets.
	 */
	cssPosition: BordaOverlayCssPosition;
	/** True for a short window after a target change — lets CSS animate the spotlight transition. */
	isTransitioning: boolean;
	/** Width of the backdrop (used as SVG `width` attribute). */
	width: number;
	/** Height of the backdrop (used as SVG `height` attribute). */
	height: number;
}
