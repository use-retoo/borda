import { ComponentPlacement } from '@/shared/enums';

import { BordaTooltipArrowSide } from '../enums';

import type { UseTooltipArrowProps, UseTooltipArrowReturns } from '../types';

/**
 * Reactive tooltip arrow hook.
 *
 * Resolves which edge of the tooltip the arrow sits on (top/bottom/left/right)
 * for the current placement, and builds the matching CSS classes. The exact
 * position along that edge is computed by `useTooltipPosition.arrowOffset`
 * and applied as an inline CSS variable in the component.
 *
 * @param props - Reactive getters for the arrow config and current placement.
 * @returns Reactive `side` and `classes` (both `null` when the arrow is hidden).
 */
export default function useTooltipArrow({
	getArrow,
	getPlacement
}: UseTooltipArrowProps): UseTooltipArrowReturns {
	const arrow = $derived(getArrow());

	const placement = $derived(getPlacement());

	const side = $derived.by(() => {
		/** `false` is the only value that hides the arrow. */
		if (arrow === false) {
			return null;
		}

		/** Use the override from arrow config; otherwise inherit the tooltip's placement. */
		const arrowPlacement = arrow ? arrow.placement : placement;

		return resolveSide(arrowPlacement);
	});

	const classes = $derived(side ? buildClasses(side) : null);

	/**
	 * Maps a placement to the tooltip edge that hosts the arrow.
	 *
	 * The arrow always points from the tooltip toward the target, so the side
	 * is the opposite of the placement main axis: `bottom-*` placements put
	 * the tooltip below the target, so the arrow sits on the `top` edge.
	 *
	 * @param placement - The (effective) tooltip placement.
	 * @returns The tooltip edge that hosts the arrow, or `null` for placements
	 *   without a meaningful arrow side (e.g. `middle-center`).
	 */
	function resolveSide(placement: ComponentPlacement): BordaTooltipArrowSide | null {
		switch (placement) {
			case ComponentPlacement.BOTTOM_START:
			case ComponentPlacement.BOTTOM_CENTER:
			case ComponentPlacement.BOTTOM_END:
				return BordaTooltipArrowSide.TOP;
			case ComponentPlacement.TOP_START:
			case ComponentPlacement.TOP_CENTER:
			case ComponentPlacement.TOP_END:
				return BordaTooltipArrowSide.BOTTOM;
			case ComponentPlacement.MIDDLE_END:
				return BordaTooltipArrowSide.LEFT;
			case ComponentPlacement.MIDDLE_START:
				return BordaTooltipArrowSide.RIGHT;
			default:
				return null;
		}
	}

	/**
	 * Builds the CSS class list for the arrow element given its side.
	 *
	 * @param side - The tooltip edge the arrow sits on.
	 * @returns A two-element class list (base + side modifier).
	 */
	function buildClasses(side: BordaTooltipArrowSide): string[] {
		return ['rb-tour-tooltip__arrow', `rb-tour-tooltip__arrow--${side}`];
	}

	return {
		get side() {
			return side;
		},
		get classes() {
			return classes;
		}
	};
}
