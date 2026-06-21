import { deepClone, deepMerge } from '@/shared/utils';

import type { BordaConfig, UseBordaConfigReturns } from '../types';

/**
 * Creates a reactive config store for the borda widget.
 *
 * Provides getter, setter, and deep-merge methods for managing
 * the widget configuration at runtime.
 *
 * @param initial - The initial widget configuration.
 * @returns A reactive config store with `current`, `getConfig`, `setConfig`, and `mergeConfig`.
 */
export default function useBordaConfig(initial: BordaConfig): UseBordaConfigReturns {
	let config: BordaConfig = $state(deepClone(initial));

	function getConfig(): BordaConfig {
		return config;
	}

	function setConfig(value: BordaConfig) {
		config = deepClone(value);
	}

	function mergeConfig(partial: Partial<BordaConfig>) {
		setConfig(deepMerge(config, partial) as BordaConfig);
	}

	return {
		get current() {
			return config;
		},
		getConfig,
		setConfig,
		mergeConfig
	};
}
