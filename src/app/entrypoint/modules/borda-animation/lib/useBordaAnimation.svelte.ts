import { DEFAULT_OVERLAY_ANIMATION, DEFAULT_TOOLTIP_ANIMATION } from '../constants';

import type { UseBordaConfigReturns } from '../../../model';
import type {
	BordaAnimationConfig,
	BordaOverlayAnimation,
	BordaTooltipAnimation,
	UseBordaAnimationReturns
} from '../types';

/**
 * Centralizes animation timings for the tooltip and overlay.
 *
 * Config is read reactively, so `mergeConfig({ animation: ... })` at runtime
 * is picked up on the next access. Pass `animation: false` to fully disable.
 */
export default function useBordaAnimation(config: UseBordaConfigReturns): UseBordaAnimationReturns {
	const animation = $derived(config.getConfig().animation);

	const overrides: Partial<BordaAnimationConfig> = $derived(animation ? animation : {});

	const isEnabled = $derived(animation !== false && overrides.isEnabled !== false);

	const tooltip: BordaTooltipAnimation = $derived({
		...DEFAULT_TOOLTIP_ANIMATION,
		...(overrides.tooltip ?? {})
	});

	const overlay: BordaOverlayAnimation = $derived({
		...DEFAULT_OVERLAY_ANIMATION,
		...(overrides.overlay ?? {})
	});

	function apply() {
		if (animation === false) return;

		config.mergeConfig({
			animation: {
				isEnabled: overrides.isEnabled ?? true,
				tooltip,
				overlay
			}
		});
	}

	return {
		apply,
		get api() {
			return {
				get isEnabled() {
					return isEnabled;
				},
				get tooltip() {
					return tooltip;
				},
				get overlay() {
					return overlay;
				}
			};
		}
	};
}
