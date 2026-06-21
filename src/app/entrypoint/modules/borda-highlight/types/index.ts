import type {
	BordaHighlightConfig,
	BordaInstance,
	BordaStepConfig,
	BordaTarget
} from '../../../model';

/** Return value of {@link useBordaHighlight}. */
export interface UseBordaHighlightReturns {
	/**
	 * Spotlights a single element. Accepts the same data as a tour step plus
	 * optional top-level config, and mounts a one-step tour.
	 */
	highlight: (
		step: BordaStepConfig,
		config?: BordaHighlightConfig,
		target?: BordaTarget
	) => Promise<BordaInstance>;
}
