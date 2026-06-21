import { resolveBordaSteps } from '@/entities/step';
import { ComponentSize } from '@/shared/enums';
import { BordaTourProgressVariant } from '@/widgets/borda-tour-progress';
import { OVERLAY, SCROLL, SKIP_KEY, STEPS } from '~/shared/constants';

import type { TourGroupFactory } from '../../model';

/** Tours showing the different ways to target a step element. */
export const createSelectorsGroup: TourGroupFactory = ({ startTour }) => ({
	label: 'Selectors',
	tours: [
		{
			label: 'Config',
			start: () =>
				startTour({
					size: ComponentSize.MD,
					steps: STEPS,
					tourOverlay: { ...OVERLAY, hasCloseOnBackdropClick: true },
					tourTooltip: { offset: 16 },
					tourProgress: { variant: BordaTourProgressVariant.LINE },
					scroll: SCROLL,
					skip: { storageKey: SKIP_KEY }
				})
		},
		{
			label: 'DOM attrs',
			start: () =>
				startTour({
					size: ComponentSize.MD,
					steps: resolveBordaSteps(),
					tourOverlay: OVERLAY,
					tourProgress: { variant: BordaTourProgressVariant.LINE },
					scroll: SCROLL
				})
		}
	]
});
