import { BordaTourProgressVariant } from '@/widgets/borda-tour-progress';
import { OVERLAY, SCROLL, STEPS } from '~/shared/constants';

import type { TourGroupFactory } from '../../model';

/** Tours showcasing each progress indicator variant. */
export const createProgressGroup: TourGroupFactory = ({ startTour }) => ({
	label: 'Progress',
	tours: [
		{
			label: 'Dots',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					tourProgress: { variant: BordaTourProgressVariant.DOTS },
					scroll: SCROLL
				})
		},
		{
			label: 'Text',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					tourProgress: { variant: BordaTourProgressVariant.TEXT },
					scroll: SCROLL
				})
		},
		{
			label: 'Line',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					tourProgress: { variant: BordaTourProgressVariant.LINE },
					scroll: SCROLL
				})
		},
		{
			label: 'None',
			start: () =>
				startTour({ steps: STEPS, tourOverlay: OVERLAY, tourProgress: false, scroll: SCROLL })
		}
	]
});
