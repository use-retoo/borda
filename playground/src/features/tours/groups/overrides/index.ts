import { ComponentPlacement } from '@/shared/enums';
import { BordaTourProgressVariant } from '@/widgets/borda-tour-progress';
import { OVERLAY, SCROLL } from '~/shared/constants';

import type { TourGroupFactory } from '../../model';

/** Tour demonstrating per-step config overrides shadowing the global config. */
export const createOverridesGroup: TourGroupFactory = ({ startTour }) => ({
	label: 'Overrides',
	tours: [
		{
			label: 'Per-step',
			start: () =>
				startTour({
					tourOverlay: OVERLAY,
					scroll: SCROLL,
					tourProgress: { variant: BordaTourProgressVariant.LINE },
					steps: [
						{
							target: '#step-1',
							title: 'Default step',
							description: 'No overrides — all components use the global config.',
							placement: ComponentPlacement.BOTTOM_START
						},
						{
							target: { class: 'pg-card--step' },
							title: 'Tight spotlight',
							description: 'Padding 2 px, sharp corners, custom button labels.',
							placement: ComponentPlacement.TOP_START,
							tourOverlay: { padding: 2, borderRadius: 0 },
							tourButtons: { next: { label: 'Got it →' }, prev: { label: '← Back' } },
							tourSkip: false
						},
						{
							target: '#step-overrides-target',
							title: 'Locked step',
							description: 'Progress and close button hidden — must click Finish.',
							placement: ComponentPlacement.TOP_START,
							tourProgress: false,
							closeButton: false,
							tourButtons: { finish: { label: 'All done!' } }
						}
					]
				})
		}
	]
});
