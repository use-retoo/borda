import { ComponentPlacement } from '@/shared/enums';
import { OVERLAY } from '~/shared/constants';

import type { TourGroupFactory } from '../../model';

/** Highlights on `sticky`/`fixed` targets — verifies viewport-anchored positioning. */
export const createPositioningGroup: TourGroupFactory = ({ startHighlight }) => ({
	label: 'Positioning',
	tours: [
		{
			label: 'Sticky target',
			start: () =>
				startHighlight(
					{
						target: '#sticky-target',
						title: 'Sticky target',
						description:
							'The tooltip stays aligned with a position:sticky element while you scroll.',
						placement: ComponentPlacement.BOTTOM_START
					},
					{ tourOverlay: OVERLAY }
				)
		},
		{
			label: 'Fixed target',
			start: () =>
				startHighlight(
					{
						target: '#fixed-target',
						title: 'Fixed target',
						description: 'The tooltip tracks a position:fixed element pinned to the viewport.',
						placement: ComponentPlacement.TOP_END
					},
					{ tourOverlay: OVERLAY }
				)
		}
	]
});
