import { ComponentPlacement } from '@/shared/enums';

import { BordaTooltipArrowSide } from '../enums';

import type {
	BordaTourTooltipAutoPlacement,
	BordaTooltipOverflow,
	BordaTooltipPlacementFit,
	BordaTooltipPosition,
	BordaTooltipRect,
	BordaTooltipSize,
	BordaTooltipViewportBounds,
	UseTooltipLayoutProps,
	UseTooltipLayoutReturns
} from '../types';

/**
 * Computes the tooltip's resolved geometry for a single layout pass.
 *
 * Pure pipeline behind `useTooltipPosition`, modelled on Floating UI's
 * `detectOverflow → flip → shift`: picks the first fallback placement that
 * fits the viewport (else the least-overflowing one), then always shifts the
 * result back into view while keeping it attached to the target — and never
 * letting it overlap the target — and derives the arrow offset.
 *
 * @param props - Snapshot of the elements, placement, spatial params, auto-flip config, and viewport size.
 * @returns The resolved position, the placement actually used, and the arrow offset.
 */
export default function useTooltipLayout({
	target,
	tooltip,
	placement,
	offset,
	margin,
	padding,
	autoPlacement,
	arrowSide,
	viewport
}: UseTooltipLayoutProps): UseTooltipLayoutReturns {
	/**
	 * Builds the default fallback chain for `autoPlacement: true`.
	 *
	 * Mirrors Floating UI's `flip` with alignment handling plus cross-axis
	 * fallback: the mirrored side first, then centered variants (preferred
	 * since they read as the most neutral/balanced placement), then the
	 * opposite-alignment sides, and finally the perpendicular sides
	 * (`middle-*`). The chain is exhaustive so a fitting placement is found
	 * before the tooltip falls back to overflow-shifting on top of the
	 * target. `middle-center` is never used as a fallback since it would
	 * cover the target.
	 *
	 * @param placement - The originally requested placement.
	 * @returns Ordered placements to try after the requested one.
	 */
	function buildDefaultFallback(placement: ComponentPlacement): ComponentPlacement[] {
		switch (placement) {
			case ComponentPlacement.TOP_START:
				return [
					ComponentPlacement.BOTTOM_START,
					ComponentPlacement.TOP_CENTER,
					ComponentPlacement.BOTTOM_CENTER,
					ComponentPlacement.TOP_END,
					ComponentPlacement.BOTTOM_END,
					ComponentPlacement.MIDDLE_END,
					ComponentPlacement.MIDDLE_START
				];
			case ComponentPlacement.TOP_CENTER:
				return [
					ComponentPlacement.BOTTOM_CENTER,
					ComponentPlacement.TOP_START,
					ComponentPlacement.BOTTOM_START,
					ComponentPlacement.TOP_END,
					ComponentPlacement.BOTTOM_END,
					ComponentPlacement.MIDDLE_END,
					ComponentPlacement.MIDDLE_START
				];
			case ComponentPlacement.TOP_END:
				return [
					ComponentPlacement.BOTTOM_END,
					ComponentPlacement.TOP_CENTER,
					ComponentPlacement.BOTTOM_CENTER,
					ComponentPlacement.TOP_START,
					ComponentPlacement.BOTTOM_START,
					ComponentPlacement.MIDDLE_START,
					ComponentPlacement.MIDDLE_END
				];
			case ComponentPlacement.BOTTOM_START:
				return [
					ComponentPlacement.TOP_START,
					ComponentPlacement.BOTTOM_CENTER,
					ComponentPlacement.TOP_CENTER,
					ComponentPlacement.BOTTOM_END,
					ComponentPlacement.TOP_END,
					ComponentPlacement.MIDDLE_END,
					ComponentPlacement.MIDDLE_START
				];
			case ComponentPlacement.BOTTOM_CENTER:
				return [
					ComponentPlacement.TOP_CENTER,
					ComponentPlacement.BOTTOM_START,
					ComponentPlacement.TOP_START,
					ComponentPlacement.BOTTOM_END,
					ComponentPlacement.TOP_END,
					ComponentPlacement.MIDDLE_END,
					ComponentPlacement.MIDDLE_START
				];
			case ComponentPlacement.BOTTOM_END:
				return [
					ComponentPlacement.TOP_END,
					ComponentPlacement.BOTTOM_CENTER,
					ComponentPlacement.TOP_CENTER,
					ComponentPlacement.BOTTOM_START,
					ComponentPlacement.TOP_START,
					ComponentPlacement.MIDDLE_START,
					ComponentPlacement.MIDDLE_END
				];
			case ComponentPlacement.MIDDLE_START:
				return [
					ComponentPlacement.MIDDLE_END,
					ComponentPlacement.BOTTOM_CENTER,
					ComponentPlacement.TOP_CENTER,
					ComponentPlacement.BOTTOM_START,
					ComponentPlacement.TOP_START,
					ComponentPlacement.BOTTOM_END,
					ComponentPlacement.TOP_END
				];
			case ComponentPlacement.MIDDLE_END:
				return [
					ComponentPlacement.MIDDLE_START,
					ComponentPlacement.BOTTOM_CENTER,
					ComponentPlacement.TOP_CENTER,
					ComponentPlacement.BOTTOM_END,
					ComponentPlacement.TOP_END,
					ComponentPlacement.BOTTOM_START,
					ComponentPlacement.TOP_START
				];
			default:
				return [];
		}
	}

	/**
	 * Resolves the `autoPlacement` prop value into a concrete fallback chain.
	 *
	 * `false` disables auto-flip and returns an empty chain. `true` uses the
	 * mirror default from {@link buildDefaultFallback}. An object value passes
	 * its `fallback` array through as-is.
	 *
	 * @param autoPlacement - The auto-placement prop value.
	 * @param placement - The originally requested placement (used by the `true` branch).
	 * @returns Ordered placements to try after the requested one.
	 */
	function resolveFallbackChain(
		autoPlacement: BordaTourTooltipAutoPlacement | boolean,
		placement: ComponentPlacement
	): ComponentPlacement[] {
		switch (autoPlacement) {
			case false:
				return [];
			case true:
				return buildDefaultFallback(placement);
			default:
				return autoPlacement.fallback;
		}
	}

	/**
	 * Builds a viewport-relative rect for the target element.
	 *
	 * The tooltip is positioned with `position: fixed`, so the raw
	 * `getBoundingClientRect` (viewport coordinates) is used directly. This keeps
	 * the tooltip aligned with `sticky`/`fixed` targets that stay put while the
	 * page scrolls, not just statically-positioned ones.
	 *
	 * @param target - The DOM element the tooltip points at.
	 * @returns The target's rect in viewport coordinates.
	 */
	function buildViewportRect(target: HTMLElement): BordaTooltipRect {
		const rect = target.getBoundingClientRect();

		return {
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
			left: rect.left,
			width: rect.width,
			height: rect.height
		};
	}

	/**
	 * Expands a rect outward by `padding` on every side.
	 *
	 * Used to give the tooltip a visual gap from the target before further
	 * `offset` is applied.
	 *
	 * @param rect - The rect to expand.
	 * @param padding - Pixels to add on each side.
	 * @returns A new rect grown by `padding`.
	 */
	function expandRect(rect: BordaTooltipRect, padding: number): BordaTooltipRect {
		return {
			top: rect.top - padding,
			right: rect.right + padding,
			bottom: rect.bottom + padding,
			left: rect.left - padding,
			width: rect.width + padding * 2,
			height: rect.height + padding * 2
		};
	}

	/**
	 * Reads the tooltip's rendered pixel size from the DOM.
	 *
	 * @param tooltip - The tooltip root element.
	 * @returns Width and height in pixels.
	 */
	function getTooltipSize(tooltip: HTMLElement): BordaTooltipSize {
		return { width: tooltip.offsetWidth, height: tooltip.offsetHeight };
	}

	/**
	 * Computes the tooltip's top/left for a single placement.
	 *
	 * Result is unconstrained — viewport clamping is applied separately by
	 * {@link clampStickyToTarget}.
	 *
	 * @param anchor - The (expanded) target rect in viewport coordinates.
	 * @param tooltip - The tooltip size in pixels.
	 * @param placement - The placement to compute against.
	 * @param offset - Extra pixel gap between anchor and tooltip along the main axis.
	 * @returns The top/left position in viewport coordinates.
	 */
	function computePosition(
		anchor: BordaTooltipRect,
		tooltip: BordaTooltipSize,
		placement: ComponentPlacement,
		offset: number
	): BordaTooltipPosition {
		switch (placement) {
			case ComponentPlacement.TOP_START:
				return {
					top: anchor.top - tooltip.height - offset,
					left: anchor.left
				};
			case ComponentPlacement.TOP_CENTER:
				return {
					top: anchor.top - tooltip.height - offset,
					left: anchor.left + (anchor.width - tooltip.width) / 2
				};
			case ComponentPlacement.TOP_END:
				return {
					top: anchor.top - tooltip.height - offset,
					left: anchor.right - tooltip.width
				};
			case ComponentPlacement.BOTTOM_START:
				return {
					top: anchor.bottom + offset,
					left: anchor.left
				};
			case ComponentPlacement.BOTTOM_CENTER:
				return {
					top: anchor.bottom + offset,
					left: anchor.left + (anchor.width - tooltip.width) / 2
				};
			case ComponentPlacement.BOTTOM_END:
				return {
					top: anchor.bottom + offset,
					left: anchor.right - tooltip.width
				};
			case ComponentPlacement.MIDDLE_START:
				return {
					top: anchor.top + (anchor.height - tooltip.height) / 2,
					left: anchor.left - tooltip.width - offset
				};
			case ComponentPlacement.MIDDLE_END:
				return {
					top: anchor.top + (anchor.height - tooltip.height) / 2,
					left: anchor.right + offset
				};
			case ComponentPlacement.MIDDLE_CENTER:
				return {
					top: anchor.top + (anchor.height - tooltip.height) / 2,
					left: anchor.left + (anchor.width - tooltip.width) / 2
				};
			default:
				return {
					top: anchor.bottom + offset,
					left: anchor.left
				};
		}
	}

	/**
	 * Computes the viewport-coordinate range within which the tooltip's top-left
	 * keeps it fully inside the viewport, leaving `edgePadding` on every side.
	 *
	 * @param tooltip - The tooltip size in pixels.
	 * @param edgePadding - Minimum gap to keep from each viewport edge.
	 * @param viewport - The viewport size in pixels.
	 * @returns The min/max top/left bounds in viewport coordinates.
	 */
	function getViewportBounds(
		tooltip: BordaTooltipSize,
		edgePadding: number,
		viewport: BordaTooltipSize
	): BordaTooltipViewportBounds {
		return {
			minTop: edgePadding,
			maxTop: viewport.height - tooltip.height - edgePadding,
			minLeft: edgePadding,
			maxLeft: viewport.width - tooltip.width - edgePadding
		};
	}

	/**
	 * Measures how far a candidate position overflows the viewport on each side.
	 *
	 * Mirrors Floating UI's `detectOverflow`: positive means the tooltip overflows
	 * that side, negative is the spare gap before it would.
	 *
	 * @param position - The candidate top/left in viewport coordinates.
	 * @param tooltip - The tooltip size in pixels.
	 * @param edgePadding - Minimum gap from each viewport edge.
	 * @param viewport - The viewport size in pixels.
	 * @returns Per-side overflow in pixels.
	 */
	function detectOverflow(
		position: BordaTooltipPosition,
		tooltip: BordaTooltipSize,
		edgePadding: number,
		viewport: BordaTooltipSize
	): BordaTooltipOverflow {
		const bounds = getViewportBounds(tooltip, edgePadding, viewport);

		return {
			top: bounds.minTop - position.top,
			bottom: position.top - bounds.maxTop,
			left: bounds.minLeft - position.left,
			right: position.left - bounds.maxLeft
		};
	}

	/**
	 * Sums the overflowing sides, ignoring the spare gaps on the others.
	 *
	 * @param overflow - Per-side overflow.
	 * @returns Total overflow in pixels. `0` when the position fits.
	 */
	function sumOverflow(overflow: BordaTooltipOverflow): number {
		return (
			Math.max(0, overflow.top) +
			Math.max(0, overflow.right) +
			Math.max(0, overflow.bottom) +
			Math.max(0, overflow.left)
		);
	}

	/**
	 * Tests whether a position keeps the tooltip fully inside the viewport.
	 *
	 * @param position - The candidate top/left in viewport coordinates.
	 * @param tooltip - The tooltip size in pixels.
	 * @param edgePadding - Minimum gap from each viewport edge for "fits".
	 * @param viewport - The viewport size in pixels.
	 * @returns `true` if all four sides clear the viewport with `edgePadding` to spare.
	 */
	function fitsInViewport(
		position: BordaTooltipPosition,
		tooltip: BordaTooltipSize,
		edgePadding: number,
		viewport: BordaTooltipSize
	): boolean {
		const overflow = detectOverflow(position, tooltip, edgePadding, viewport);

		return overflow.top <= 0 && overflow.right <= 0 && overflow.bottom <= 0 && overflow.left <= 0;
	}

	/**
	 * Clamps a single-axis value, preferring the viewport while keeping the
	 * tooltip glued to the target.
	 *
	 * Clamps into the intersection of the viewport range and the sticky range
	 * (where the tooltip still overlaps the target). When the two ranges do not
	 * intersect — the target has scrolled partly off-screen — the sticky range
	 * wins, so the tooltip stays attached and follows the target off-screen
	 * rather than detaching and sticking to the viewport edge.
	 *
	 * @param value - The raw axis value to clamp.
	 * @param stickyMin - Lowest value that keeps the tooltip overlapping the target.
	 * @param stickyMax - Highest value that keeps the tooltip overlapping the target.
	 * @param viewportMin - Lowest value that keeps the tooltip inside the viewport.
	 * @param viewportMax - Highest value that keeps the tooltip inside the viewport.
	 * @returns The clamped axis value.
	 */
	function clampAxis(
		value: number,
		stickyMin: number,
		stickyMax: number,
		viewportMin: number,
		viewportMax: number
	): number {
		const min = Math.max(viewportMin, stickyMin);
		const max = Math.min(viewportMax, stickyMax);

		if (min <= max) {
			return Math.max(min, Math.min(value, max));
		}

		return Math.max(stickyMin, Math.min(value, stickyMax));
	}

	/**
	 * Shifts a placement-axis value into the viewport without ever crossing
	 * into the zone where the tooltip would overlap the target.
	 *
	 * `attachMin` and `attachMax` are not a continuous range to clamp into —
	 * they are the two boundary values of the two disjoint sides ("fully
	 * above"/"fully left" at `attachMin`, "fully below"/"fully right" at
	 * `attachMax`) the tooltip can occupy. Everything strictly between them
	 * would overlap the target, so this picks whichever side actually has
	 * room in the viewport — preferring `preferredSide` — instead of
	 * interpolating across the gap (Floating UI's `limitShift`, with overlap
	 * disallowed). When the target scrolls off-screen the tooltip still
	 * follows it off-screen on its chosen side rather than pinning to the
	 * viewport edge.
	 *
	 * @param value - The candidate axis value.
	 * @param viewportMin - Lowest value inside the viewport.
	 * @param viewportMax - Highest value inside the viewport.
	 * @param attachMin - The "fully above"/"fully left" boundary value, adjacent to the target.
	 * @param attachMax - The "fully below"/"fully right" boundary value, adjacent to the target.
	 * @param preferredSide - Which side (`min` or `max`) to keep when both have room.
	 * @returns The shifted axis value, guaranteed to sit on the `attachMin` or `attachMax` side.
	 */
	function shiftIntoView(
		value: number,
		viewportMin: number,
		viewportMax: number,
		attachMin: number,
		attachMax: number,
		preferredSide: 'min' | 'max'
	): number {
		const minSideFits = attachMin >= viewportMin;
		const maxSideFits = attachMax <= viewportMax;

		if (minSideFits && (preferredSide === 'min' || !maxSideFits)) {
			return Math.max(viewportMin, Math.min(value, attachMin));
		}

		if (maxSideFits) {
			return Math.min(viewportMax, Math.max(value, attachMax));
		}

		/** Neither side leaves room inside the viewport: snap to whichever boundary overflows least. */
		return viewportMin - attachMin <= attachMax - viewportMax ? attachMin : attachMax;
	}

	/**
	 * Shifts a position to keep the tooltip on-screen without ever letting it
	 * overlap the target (Floating UI's `shift`, with overlap disallowed).
	 *
	 * The alignment axis (along which the tooltip slides relative to the target —
	 * horizontal for TOP/BOTTOM, vertical for MIDDLE) is clamped within the range
	 * where the tooltip still overlaps the target, since that axis doesn't affect
	 * whether the tooltip's box intersects the target's. The placement axis is
	 * shifted into the viewport but kept on whichever non-overlapping side
	 * (above/below or left/right of the target) has room, so the tooltip follows
	 * the target off-screen instead of sticking to the viewport edge or sliding
	 * over it.
	 *
	 * @param position - The candidate top/left in viewport coordinates.
	 * @param tooltip - The tooltip size in pixels.
	 * @param anchor - The (expanded) target rect in viewport coordinates.
	 * @param placement - The placement actually being applied.
	 * @param edgePadding - Minimum gap to keep from each viewport edge.
	 * @param viewport - The viewport size in pixels.
	 * @returns A position shifted to stay within the viewport while never overlapping the target.
	 */
	function clampStickyToTarget(
		position: BordaTooltipPosition,
		tooltip: BordaTooltipSize,
		anchor: BordaTooltipRect,
		placement: ComponentPlacement,
		edgePadding: number,
		viewport: BordaTooltipSize
	): BordaTooltipPosition {
		const minOverlap = 1;

		const isAlignmentVertical =
			placement === ComponentPlacement.MIDDLE_START ||
			placement === ComponentPlacement.MIDDLE_END ||
			placement === ComponentPlacement.MIDDLE_CENTER;

		const bounds = getViewportBounds(tooltip, edgePadding, viewport);

		if (isAlignmentVertical) {
			const preferredSide = placement === ComponentPlacement.MIDDLE_START ? 'min' : 'max';

			return {
				top: clampAxis(
					position.top,
					anchor.top - tooltip.height + minOverlap,
					anchor.bottom - minOverlap,
					bounds.minTop,
					bounds.maxTop
				),
				left: shiftIntoView(
					position.left,
					bounds.minLeft,
					bounds.maxLeft,
					anchor.left - tooltip.width - offset,
					anchor.right + offset,
					preferredSide
				)
			};
		}

		const isTopSide =
			placement === ComponentPlacement.TOP_START ||
			placement === ComponentPlacement.TOP_CENTER ||
			placement === ComponentPlacement.TOP_END;

		const preferredSide = isTopSide ? 'min' : 'max';

		return {
			top: shiftIntoView(
				position.top,
				bounds.minTop,
				bounds.maxTop,
				anchor.top - tooltip.height - offset,
				anchor.bottom + offset,
				preferredSide
			),
			left: clampAxis(
				position.left,
				anchor.left - tooltip.width + minOverlap,
				anchor.right - minOverlap,
				bounds.minLeft,
				bounds.maxLeft
			)
		};
	}

	/**
	 * Walks `candidates` in order and returns the first one whose computed
	 * position fits the viewport.
	 *
	 * @param candidates - Placements to try (requested first, then fallback chain).
	 * @param anchor - The (expanded) target rect in viewport coordinates.
	 * @param tooltip - The tooltip size in pixels.
	 * @param offset - Extra pixel gap between anchor and tooltip along the main axis.
	 * @param edgePadding - Minimum gap from each viewport edge for "fits".
	 * @param viewport - The viewport size in pixels.
	 * @returns The matching placement and its position, or `null` if none fit.
	 */
	function findFittingPlacement(
		candidates: ComponentPlacement[],
		anchor: BordaTooltipRect,
		tooltip: BordaTooltipSize,
		offset: number,
		edgePadding: number,
		viewport: BordaTooltipSize
	): BordaTooltipPlacementFit | null {
		for (const placement of candidates) {
			const position = computePosition(anchor, tooltip, placement, offset);

			if (fitsInViewport(position, tooltip, edgePadding, viewport)) {
				return { placement, position };
			}
		}

		return null;
	}

	/**
	 * Picks the candidate with the smallest overflow.
	 *
	 * Used as the last-resort fallback when no candidate from
	 * {@link findFittingPlacement} fits — instead of clamping the originally
	 * requested placement, we surface the placement that's most visible.
	 *
	 * @param candidates - Placements to score (requested first, then fallback chain).
	 * @param anchor - The (expanded) target rect in viewport coordinates.
	 * @param tooltip - The tooltip size in pixels.
	 * @param offset - Extra pixel gap between anchor and tooltip along the main axis.
	 * @param edgePadding - Minimum gap from each viewport edge.
	 * @param viewport - The viewport size in pixels.
	 * @returns The placement with the least overflow and its raw position.
	 */
	function findBestPlacement(
		candidates: ComponentPlacement[],
		anchor: BordaTooltipRect,
		tooltip: BordaTooltipSize,
		offset: number,
		edgePadding: number,
		viewport: BordaTooltipSize
	): BordaTooltipPlacementFit {
		let best: BordaTooltipPlacementFit = {
			placement: candidates[0],
			position: computePosition(anchor, tooltip, candidates[0], offset)
		};

		let bestOverflow = sumOverflow(detectOverflow(best.position, tooltip, edgePadding, viewport));

		for (let i = 1; i < candidates.length; i++) {
			const placement = candidates[i];
			const position = computePosition(anchor, tooltip, placement, offset);
			const overflow = sumOverflow(detectOverflow(position, tooltip, edgePadding, viewport));

			if (overflow < bestOverflow) {
				bestOverflow = overflow;
				best = { placement, position };
			}
		}

		return best;
	}

	/**
	 * Computes where the arrow should be anchored along the tooltip edge
	 * (perpendicular to its placement side) so it points at the target's center.
	 *
	 * Result is relative to the tooltip's top-left corner. For `top`/`bottom`
	 * sides the result is a horizontal offset (left), for `left`/`right` it's
	 * a vertical offset (top).
	 *
	 * Uses the resolved viewport-coordinate position (not the tooltip's current
	 * DOM rect) so the offset is correct even before the DOM has been updated.
	 *
	 * @param target - The target element the tooltip points at.
	 * @param position - The resolved viewport-coordinate position the tooltip will be placed at.
	 * @param side - The tooltip edge the arrow sits on (or `null` if hidden).
	 * @returns Offset in pixels from the tooltip's top-left corner. `0` when
	 *   `side` is `null`.
	 */
	function computeArrowOffset(
		target: HTMLElement,
		position: BordaTooltipPosition,
		side: BordaTooltipArrowSide | null
	): number {
		if (side === null) return 0;

		const targetRect = target.getBoundingClientRect();

		if (side === BordaTooltipArrowSide.TOP || side === BordaTooltipArrowSide.BOTTOM) {
			return targetRect.left + targetRect.width / 2 - position.left;
		}

		return targetRect.top + targetRect.height / 2 - position.top;
	}

	const edgePadding = offset + margin;

	const candidates = [placement, ...resolveFallbackChain(autoPlacement, placement)];

	const anchor = expandRect(buildViewportRect(target), padding);

	const tooltipSize = getTooltipSize(tooltip);

	/** flip: the first candidate that fits, otherwise the least-overflowing one. */
	const chosen =
		findFittingPlacement(candidates, anchor, tooltipSize, offset, edgePadding, viewport) ??
		findBestPlacement(candidates, anchor, tooltipSize, offset, edgePadding, viewport);

	/** shift: always nudge into view while staying attached to the target (no-op when it already fits). */
	const shifted = clampStickyToTarget(
		chosen.position,
		tooltipSize,
		anchor,
		chosen.placement,
		edgePadding,
		viewport
	);

	return {
		position: shifted,
		placement: chosen.placement,
		arrowOffset: computeArrowOffset(target, shifted, arrowSide)
	};
}
