import { useScrollPosition } from '@/shared/lib/scroll-position';
import { useViewportSize } from '@/shared/lib/viewport-size';

import type { UseOverlayProps, UseOverlayReturns } from '../types';

const TRANSITION_DURATION = 350;

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

	let isTransitioning = $state(false);

	let hasInitialized = false;

	let prevElement: HTMLElement | null = null;

	let transitionTimer: number | null = null;

	const viewport = useViewportSize();

	const scroll = useScrollPosition();

	function readOverlaySize() {
		/**
		 * Overlay is fixed to the viewport, so it spans exactly the visible area;
		 * scroll is tracked separately to keep the spotlight glued to the target
		 * (works for `sticky`/`fixed` targets, not just statically-positioned ones).
		 */
		docW = window.innerWidth;

		docH = window.innerHeight;
	}

	function readSpotRect() {
		const element = getTargetElement();

		if (!element) return;

		const padding = getPadding();
		const rect = element.getBoundingClientRect();

		/** Viewport-relative coords — the overlay is `position: fixed`. */
		spotX = rect.left - padding;
		spotY = rect.top - padding;
		spotW = rect.width + padding * 2;
		spotH = rect.height + padding * 2;
	}

	function update() {
		readOverlaySize();
		readSpotRect();
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
		};
	});

	$effect(() => {
		/** Re-run on viewport resize and scroll so the spotlight tracks the target. */
		void viewport.width;
		void viewport.height;
		void scroll.x;
		void scroll.y;

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
