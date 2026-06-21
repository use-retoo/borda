import { BordaTourProgressVariant } from '@/widgets/borda-tour-progress';
import { OVERLAY, SCROLL } from '~/shared/constants';

import { IMAGE_STEPS } from './model';

import type { TourGroupFactory } from '../../model';

/** Tours showcasing tooltip image variants and styling. */
export const createImagesGroup: TourGroupFactory = ({ startTour }) => ({
	label: 'Images',
	tours: [
		{
			label: 'Variants',
			start: () =>
				startTour({
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					tourProgress: { variant: BordaTourProgressVariant.LINE },
					steps: IMAGE_STEPS
				})
		}
	]
});
