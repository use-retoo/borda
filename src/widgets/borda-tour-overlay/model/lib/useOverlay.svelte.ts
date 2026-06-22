import { useScrollPosition } from '@/shared/lib/scroll-position';
import { useViewportSize } from '@/shared/lib/viewport-size';
import { isViewportAnchored } from '@/shared/utils';

import type { BordaOverlayCssPosition, UseOverlayProps, UseOverlayReturns } from '../types';

const TRANSITION_DURATION = 350;

/**
 * Computes the overlay backdrop with a spotlight hole cut out over the target.
 *
 * Anchoring mirrors the tooltip:
 *
 * - Document-flow target (the common case): the backdrop spans the whole
 *   document and the spotlight sits at document coordinates, with the SVG
 *   rendered `position: absolute`. It scrolls with the page in sync with the
 *   target — no per-frame recompute, no lag.
 * - Viewport-anchored target (`position: fixed`/`sticky`): the backdrop spans
 *   the viewport and the spotlight sits at viewport coordinates, with the SVG
 *   rendered `position: fixed` and recomputed on scroll to keep tracking the
 *   target.
 */
export default function useOverlay({
	getTargetElement,
	getBorderRadius,
	getPadding,
	getIsAnimated
}: UseOverlayProps): UseOverlayReturns {
	let docW = $state(0);
	let docH = $state(0);

	let spotX = $state(0);
	let spotY = $state(0);
	let spotW = $state(0);
	let spotH = $state(0);

	let cssPosition = $state<BordaOverlayCssPosition>('fixed');

	let isTransitioning = $state(false);

	let hasInitialized = false;

	let prevElement: HTMLElement | null = null;

	let transitionTimer: number | null = null;

	const viewport = useViewportSize();

	const scroll = useScrollPosition();

	const anchored = $derived(isViewportAnchored(getTargetElement()));

	/** Backdrop covers the viewport when anchored, else the whole scrollable document. */
	function readOverlaySize(isAnchored: boolean) {
		if (isAnchored) {
			docW = window.innerWidth;
			docH = window.innerHeight;

			return;
		}

		const doc = document.documentElement;

		docW = Math.max(doc.scrollWidth, window.innerWidth);
		docH = Math.max(doc.scrollHeight, window.innerHeight);
	}

	/** Spotlight uses viewport coords when anchored, else document coords. */
	function readSpotRect(isAnchored: boolean) {
		const element = getTargetElement();

		if (!element) return;

		const padding = getPadding();
		const rect = element.getBoundingClientRect();

		const offsetX = isAnchored ? 0 : window.scrollX;
		const offsetY = isAnchored ? 0 : window.scrollY;

		spotX = rect.left + offsetX - padding;
		spotY = rect.top + offsetY - padding;
		spotW = rect.width + padding * 2;
		spotH = rect.height + padding * 2;
	}

	function update() {
		const isAnchored = anchored;

		cssPosition = isAnchored ? 'fixed' : 'absolute';

		readOverlaySize(isAnchored);
		readSpotRect(isAnchored);
	}

	$effect(() => {
		const element = getTargetElement();

		const isElementChange = hasInitialized && element !== prevElement;

		if (isElementChange && getIsAnimated()) {
			if (transitionTimer !== null) window.clearTimeout(transitionTimer);

			isTransitioning = true;

			transitionTimer = window.setTimeout(() => {
				isTransitioning = false;
				transitionTimer = null;
			}, TRANSITION_DURATION);
		}

		update();

		hasInitialized = true;
		prevElement = element;

		const observer = element ? new ResizeObserver(update) : null;

		if (element) observer?.observe(element);

		return () => {
			observer?.disconnect();

			if (transitionTimer !== null) {
				window.clearTimeout(transitionTimer);
				transitionTimer = null;
			}
		};
	});

	$effect(() => {
		/**
		 * Always recompute on viewport resize. Only viewport-anchored targets also
		 * recompute on scroll; document-flow targets stay glued via CSS and would
		 * only jitter if recomputed per scroll frame.
		 */
		void viewport.width;
		void viewport.height;

		if (anchored) {
			void scroll.x;
			void scroll.y;
		}

		update();
	});

	function spotlightPath(x: number, y: number, w: number, h: number, r: number): string {
		const cr = Math.min(r, w / 2, h / 2);
		return [
			`M ${x + cr} ${y}`,
			`H ${x + w - cr}`,
			`A ${cr} ${cr} 0 0 1 ${x + w} ${y + cr}`,
			`V ${y + h - cr}`,
			`A ${cr} ${cr} 0 0 1 ${x + w - cr} ${y + h}`,
			`H ${x + cr}`,
			`A ${cr} ${cr} 0 0 1 ${x} ${y + h - cr}`,
			`V ${y + cr}`,
			`A ${cr} ${cr} 0 0 1 ${x + cr} ${y}`,
			`Z`
		].join(' ');
	}

	const backdropPath = $derived(
		getTargetElement()
			? `M 0 0 H ${docW} V ${docH} H 0 Z ${spotlightPath(spotX, spotY, spotW, spotH, getBorderRadius())}`
			: `M 0 0 H ${docW} V ${docH} H 0 Z`
	);

	return {
		get backdropPath() {
			return backdropPath;
		},
		get cssPosition() {
			return cssPosition;
		},
		get isTransitioning() {
			return isTransitioning;
		},
		get width() {
			return docW;
		},
		get height() {
			return docH;
		}
	};
}
