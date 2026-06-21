import { ComponentSize } from '@/shared/enums';
import { OVERLAY, SCROLL, STEPS } from '~/shared/constants';

import type { TourGroupFactory } from '../../model';

/** Global sizes exposed as individual tour entries. */
const SIZES = [
	{ label: 'XS', size: ComponentSize.XS },
	{ label: 'SM', size: ComponentSize.SM },
	{ label: 'MD', size: ComponentSize.MD },
	{ label: 'LG', size: ComponentSize.LG },
	{ label: 'XL', size: ComponentSize.XL },
	{ label: 'XXL', size: ComponentSize.XXL }
];

/**
 * Tours mounting the same steps at each global size, plus a per-button override
 * showing how an individual button opts out of the global size.
 */
export const createSizeGroup: TourGroupFactory = ({ startTour }) => ({
	label: 'Size',
	tours: [
		...SIZES.map(({ label, size }) => ({
			label,
			start: () => startTour({ steps: STEPS, tourOverlay: OVERLAY, scroll: SCROLL, size })
		})),
		{
			label: 'Per-button',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					size: ComponentSize.SM,
					tourButtons: {
						next: { size: ComponentSize.XL },
						finish: { size: ComponentSize.XL }
					}
				})
		}
	]
});
