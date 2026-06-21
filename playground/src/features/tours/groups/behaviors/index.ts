import { OVERLAY, SCROLL, STEPS } from '~/shared/constants';

import type { TourGroupFactory } from '../../model';

/** Tours showcasing assorted opt-in features and behaviors. */
export const createBehaviorsGroup: TourGroupFactory = ({ startTour }) => ({
	label: 'Features',
	tours: [
		{
			label: 'No overlay',
			start: () => startTour({ steps: STEPS, tourOverlay: false, scroll: SCROLL })
		},
		{
			label: 'Backdrop click',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: { ...OVERLAY, hasCloseOnBackdropClick: true },
					scroll: SCROLL
				})
		},
		{
			label: 'Start at 2',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					tour: { startStep: 1 }
				})
		},
		{
			label: 'No keyboard',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					tour: { hasKeyboardControl: false }
				})
		}
	]
});
