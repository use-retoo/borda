import { BordaScrollAppearance } from '@/app/entrypoint';
import { AnimationEffect } from '@/shared/enums';
import { OVERLAY, SCROLL, STEPS } from '~/shared/constants';
import { withEffect } from '~/shared/lib';

import type { TourGroupFactory } from '../../model';

/** Tours showing how the tooltip appears relative to scrolling. */
export const createScrollGroup: TourGroupFactory = ({ startTour }) => ({
	label: 'Scroll',
	tours: [
		{
			label: 'After',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					...withEffect(AnimationEffect.FADE, BordaScrollAppearance.AFTER_SCROLL)
				})
		},
		{
			label: 'During',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					...withEffect(AnimationEffect.FADE, BordaScrollAppearance.DURING_SCROLL)
				})
		},
		{
			label: 'Lock on',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: { ...SCROLL, isLocked: true },
					...withEffect(AnimationEffect.FADE)
				})
		},
		{
			label: 'None',
			start: () => startTour({ steps: STEPS, tourOverlay: OVERLAY, scroll: false })
		}
	]
});
