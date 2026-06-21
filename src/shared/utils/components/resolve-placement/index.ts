import { ComponentPlacement } from '@/shared/enums';

/** Known placement values, used to fall back gracefully on an unset or invalid placement. */
const VALID_PLACEMENTS = new Set<ComponentPlacement>(Object.values(ComponentPlacement));

/**
 * Coerces an unset or invalid placement to {@link ComponentPlacement.BOTTOM_START}.
 *
 * @param value - The requested placement (may be an arbitrary runtime value).
 * @returns A valid placement.
 */
export const resolvePlacement = (value: ComponentPlacement): ComponentPlacement => {
	return VALID_PLACEMENTS.has(value) ? value : ComponentPlacement.BOTTOM_START;
};
