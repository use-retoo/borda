import type { BordaConfig, BordaHighlightConfig, BordaStepConfig } from '@/app/entrypoint';
import type { TourNavGroup } from '~/widgets/tour-nav';

/** Callbacks the demo tours use to mount tours and single-element highlights. */
export interface TourTools {
	/** Mounts a full multi-step tour with the given config. */
	startTour: (config: BordaConfig) => void;
	/** Spotlights a single element without navigation. */
	startHighlight: (step: BordaStepConfig, config?: BordaHighlightConfig) => void;
}

/** Factory that builds one navigation group from the shared tools. */
export type TourGroupFactory = (tools: TourTools) => TourNavGroup;
