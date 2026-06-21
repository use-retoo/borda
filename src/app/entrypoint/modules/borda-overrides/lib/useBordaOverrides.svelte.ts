import { OverrideLayer } from '@/shared/enums';
import { deepMerge } from '@/shared/utils';

import type { BordaConfig, BordaStepConfig, UseBordaConfigReturns } from '../../../model';
import type { UseBordaOverridesReturns } from '../types';

/** Fixed merge order — layers are applied left-to-right on top of the base config. */
const LAYER_ORDER = [OverrideLayer.RESPONSIVE, OverrideLayer.STEP];

/**
 * Manages runtime config overrides via named layers and a deep-merge strategy.
 *
 * Each layer is identified by name and merged in a fixed order,
 * so higher-priority layers always win.
 *
 * @param config - The reactive config store to overlay overrides on.
 * @returns A reactive `resolved` config and methods to `set`/`resolve` overrides.
 */
export default function useBordaOverrides(config: UseBordaConfigReturns): UseBordaOverridesReturns {
	const layers = $state<Partial<Record<OverrideLayer, () => Partial<BordaConfig>>>>({});

	function set(layer: OverrideLayer, value: (() => Partial<BordaConfig>) | null) {
		if (value === null) {
			delete layers[layer];
		} else {
			layers[layer] = value;
		}
	}

	function resolve(): BordaConfig {
		let result = config.current;

		for (const name of LAYER_ORDER) {
			const fn = layers[name];

			if (fn) {
				result = deepMerge(result, fn() as BordaConfig);
			}
		}

		return result;
	}

	function applyStep(step: BordaStepConfig | null) {
		if (!step) {
			set(OverrideLayer.STEP, null);
			return;
		}

		const {
			tourOverlay,
			tourTooltip,
			tourImage,
			tourButtons,
			tourProgress,
			closeButton,
			tourSkip
		} = step;

		const hasOverrides = [
			tourOverlay,
			tourTooltip,
			tourImage,
			tourButtons,
			tourProgress,
			closeButton,
			tourSkip
		].some((override) => override !== undefined);

		set(
			OverrideLayer.STEP,
			hasOverrides
				? () => ({
						tourOverlay,
						tourTooltip,
						tourImage,
						tourButtons,
						tourProgress,
						closeButton,
						tourSkip
					})
				: null
		);
	}

	const resolved = $derived(resolve());

	return {
		get resolved() {
			return resolved;
		},
		resolve,
		set,
		applyStep
	};
}
