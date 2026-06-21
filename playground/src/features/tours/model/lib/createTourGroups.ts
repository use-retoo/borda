import type { TourNavGroup } from '~/widgets/tour-nav';

import { groupFactories } from '../../groups';

import type { TourTools } from '../types';

/**
 * Builds all tour groups for the playground navigation.
 *
 * @param startTour - Mounts a full multi-step tour with the given config.
 * @param startHighlight - Spotlights a single element without navigation.
 * @returns Ordered array of tour groups for the TourNav widget.
 */
export function createTourGroups(
	startTour: TourTools['startTour'],
	startHighlight: TourTools['startHighlight']
): TourNavGroup[] {
	const tools: TourTools = { startTour, startHighlight };

	return groupFactories.map((factory) => factory(tools));
}
