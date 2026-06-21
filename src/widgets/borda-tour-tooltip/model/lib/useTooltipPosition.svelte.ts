import { ComponentPlacement } from '@/shared/enums';
import { useScrollPosition } from '@/shared/lib/scroll-position';
import { useViewportSize } from '@/shared/lib/viewport-size';
import { resolvePlacement } from '@/shared/utils';

import useTooltipLayout from './useTooltipLayout';

import type { UseTooltipPositionProps, UseTooltipPositionReturns } from '../types';

/**
 * Reactive tooltip positioning hook with auto-flip support.
 *
 * Thin reactive shell over {@link useTooltipLayout}: tracks the target,
 * tooltip, placement props, viewport size and scroll position, recomputes the
 * layout on every change, and exposes the placement that was actually used as
 * `effectivePlacement` (so the arrow can point in the right direction).
 *
 * @param props - Reactive getters for target/tooltip elements, placement, spatial params, and auto-flip config.
 * @returns Reactive `top`, `left`, `effectivePlacement`, and `arrowOffset` values.
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

	/** Reads the live target/tooltip rects and writes the resolved position into state. */
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

		top = layout.position.top;
		left = layout.position.left;
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
		/** Re-run on scroll so auto-flip/shift recompute against the live viewport. */
		void scroll.x;
		void scroll.y;

		recompute();
	});

	return {
		get top() {
			return top;
		},
		get left() {
			return left;
		},
		get effectivePlacement() {
			return effectivePlacement;
		},
		get arrowOffset() {
			return arrowOffset;
		}
	};
}
