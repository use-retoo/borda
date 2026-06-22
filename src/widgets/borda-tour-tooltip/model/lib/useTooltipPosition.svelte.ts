import { ComponentPlacement } from '@/shared/enums';
import { useScrollPosition } from '@/shared/lib/scroll-position';
import { useViewportSize } from '@/shared/lib/viewport-size';
import { isBrowser, isViewportAnchored, resolvePlacement } from '@/shared/utils';

import useTooltipLayout from './useTooltipLayout';

import type {
	BordaTooltipCssPosition,
	UseTooltipPositionProps,
	UseTooltipPositionReturns
} from '../types';

/**
 * Reactive tooltip positioning hook with auto-flip support.
 *
 * Thin reactive shell over {@link useTooltipLayout}, which resolves a
 * viewport-relative position. How that position is consumed depends on the
 * target's anchoring:
 *
 * - Document-flow target (the common case): the position is converted to
 *   document coordinates and the tooltip is rendered `position: absolute`, so it
 *   scrolls with the page in sync with the target — no per-frame JS, no jitter.
 * - Viewport-anchored target (`position: fixed`/`sticky`): the position is used
 *   verbatim and the tooltip is rendered `position: fixed`, tracking the target
 *   on scroll so it stays glued to a target that itself stays in the viewport.
 *
 * @param props - Reactive getters for target/tooltip elements, placement, spatial params, and auto-flip config.
 * @returns Reactive `top`, `left`, `cssPosition`, `effectivePlacement`, and `arrowOffset` values.
 */
export default function useTooltipPosition({
	getTargetElement,
	getTooltipElement,
	getPlacement,
	getPadding,
	getOffset,
	getMargin,
	getAutoPlacement,
	getArrowSide
}: UseTooltipPositionProps): UseTooltipPositionReturns {
	let top = $state(0);

	let left = $state(0);

	let cssPosition = $state<BordaTooltipCssPosition>('absolute');

	let effectivePlacement = $state<ComponentPlacement>(ComponentPlacement.BOTTOM_START);

	let arrowOffset = $state(0);

	const viewport = useViewportSize();

	const scroll = useScrollPosition();

	const target = $derived(getTargetElement());

	const tooltip = $derived(getTooltipElement());

	const placement = $derived(resolvePlacement(getPlacement()));

	const offset = $derived(getOffset());

	const margin = $derived(getMargin());

	const padding = $derived(getPadding());

	const autoPlacement = $derived(getAutoPlacement());

	const arrowSide = $derived(getArrowSide());

	const anchored = $derived(isViewportAnchored(target));

	/**
	 * Resolves the layout and writes the position into state.
	 *
	 * For document-flow targets the viewport-relative result is offset by the
	 * current scroll into document coordinates (read non-reactively — the
	 * document position is scroll-invariant). Viewport-anchored targets use it
	 * verbatim.
	 */
	function recompute() {
		if (!target || !tooltip) return;

		const layout = useTooltipLayout({
			target,
			tooltip,
			placement,
			offset,
			margin,
			padding,
			autoPlacement,
			arrowSide,
			viewport: { width: viewport.width, height: viewport.height }
		});

		const scrollX = anchored || !isBrowser ? 0 : window.scrollX;
		const scrollY = anchored || !isBrowser ? 0 : window.scrollY;

		top = layout.position.top + scrollY;
		left = layout.position.left + scrollX;
		cssPosition = anchored ? 'fixed' : 'absolute';
		effectivePlacement = layout.placement;
		arrowOffset = layout.arrowOffset;
	}

	$effect(() => {
		if (!tooltip) return;

		/** Re-run when the tooltip's own size changes (e.g. an image finishes loading). */
		const observer = new ResizeObserver(recompute);

		observer.observe(tooltip);

		return () => observer.disconnect();
	});

	$effect(() => {
		/**
		 * `recompute` reads — and therefore tracks — every geometry input (target,
		 * placement, spatial props, viewport size, anchoring). Only viewport-anchored
		 * targets additionally track scroll, so they follow a target pinned to the
		 * viewport; document-flow targets stay glued via CSS and never recompute on
		 * scroll.
		 */
		if (anchored) {
			void scroll.x;
			void scroll.y;
		}

		recompute();
	});

	return {
		get top() {
			return top;
		},
		get left() {
			return left;
		},
		get cssPosition() {
			return cssPosition;
		},
		get effectivePlacement() {
			return effectivePlacement;
		},
		get arrowOffset() {
			return arrowOffset;
		}
	};
}
