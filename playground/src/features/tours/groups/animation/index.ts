import { AnimationEffect } from '@/shared/enums';
import { OVERLAY, SCROLL, STEPS } from '~/shared/constants';
import { withEffect } from '~/shared/lib';

import type { TourGroupFactory } from '../../model';

/** Tours showcasing each tooltip animation effect. */
export const createAnimationGroup: TourGroupFactory = ({ startTour }) => ({
	label: 'Animation',
	tours: [
		{
			label: 'Fade',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					...withEffect(AnimationEffect.FADE)
				})
		},
		{
			label: 'Scale',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					...withEffect(AnimationEffect.SCALE)
				})
		},
		{
			label: 'Slide',
			start: () =>
				startTour({
					steps: STEPS,
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					...withEffect(AnimationEffect.SLIDE)
				})
		},
		{
			label: 'None',
			start: () =>
				startTour({ steps: STEPS, tourOverlay: OVERLAY, scroll: SCROLL, animation: false })
		}
	]
});
