import { BordaTooltipTransition } from '@/app/entrypoint';
import { OVERLAY, SCROLL, STEPS } from '~/shared/constants';

import type { TourGroupFactory } from '../../model';

/** Tours showing how the tooltip moves between steps: fade vs glide. */
export const createTransitionGroup: TourGroupFactory = ({ startTour }) => ({
	label: 'Transition',
	tours: [
		{
			label: 'Fade',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					animation: { tooltip: { transition: BordaTooltipTransition.FADE } }
				})
		},
		{
			label: 'Glide',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					animation: { tooltip: { transition: BordaTooltipTransition.GLIDE } }
				})
		}
	]
});
