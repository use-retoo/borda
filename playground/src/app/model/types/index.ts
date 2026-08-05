import type { TourTools } from '~/features/tours';
import type { DemoTargetProps } from '~/shared/ui';

/** One labelled section of the playground page, wrapping a single demo target. */
export interface DemoEntry {
	/** Caption rendered above the target card. */
	label: string;

	/** Props forwarded to the target card. */
	target: DemoTargetProps;
}

/** Tour controls the playground page hands to the navigation. */
export interface UseTourRunnerReturns extends TourTools {
	/** Drops the persisted "don't show again" flag. */
	clearSkip: () => void;
}
