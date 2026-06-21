import type { OverrideLayer } from '@/shared/enums';

import type { BordaConfig, BordaStepConfig } from '../../../model';

/** Return value of {@link useBordaOverrides}. */
export interface UseBordaOverridesReturns {
	/** The resolved config with all override layers applied (reactive). */
	resolved: BordaConfig;
	/** Compute and return the resolved config snapshot. */
	resolve: () => BordaConfig;
	/** Set an override factory function for a named layer, or `null` to clear that layer. */
	set: (layer: OverrideLayer, value: (() => Partial<BordaConfig>) | null) => void;
	/** Apply per-step component overrides from the given step, or clear them if `undefined`. */
	applyStep: (step: BordaStepConfig | null) => void;
}
