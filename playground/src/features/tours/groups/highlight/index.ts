import { ComponentPlacement } from '@/shared/enums';
import { OVERLAY } from '~/shared/constants';

import type { TourGroupFactory } from '../../model';

/** Single-element highlight demos (no multi-step navigation). */
export const createHighlightGroup: TourGroupFactory = ({ startHighlight }) => ({
	label: 'Highlight',
	tours: [
		{
			label: 'Tooltip',
			start: () =>
				startHighlight(
					{
						target: '#step-1',
						title: 'Spotlight',
						description: 'Single-element highlight — no navigation.',
						placement: ComponentPlacement.BOTTOM_START
					},
					{
						tourOverlay: OVERLAY,
						tourProgress: false,
						tourButtons: { prev: false, next: false, finish: { label: 'Got it' } }
					}
				)
		},
		{
			label: 'Overlay only',
			start: () =>
				startHighlight(
					{
						target: '#step-1',
						title: '',
						description: '',
						placement: ComponentPlacement.BOTTOM_START
					},
					{
						tourOverlay: { ...OVERLAY, hasCloseOnBackdropClick: true },
						tourTooltip: false,
						tourProgress: false,
						tourButtons: false,
						closeButton: false,
						tourSkip: false
					}
				)
		}
	]
});
