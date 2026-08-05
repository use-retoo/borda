import type { BordaStepConfig } from '@/app/entrypoint';
import { ComponentPlacement } from '@/shared/enums';
import { BordaTourImageVariant } from '@/widgets/borda-tour-image';
import { TARGET } from '~/shared/constants';
import { demoImage } from '~/shared/utils';

/** Four steps, each demonstrating a different tooltip image presentation. */
export const IMAGE_STEPS: BordaStepConfig[] = [
	{
		target: TARGET.byId,
		title: 'No image',
		description: 'A plain step renders without any image.',
		placement: ComponentPlacement.BOTTOM_START
	},
	{
		target: TARGET.byClass,
		title: 'Framed image',
		description: 'Default variant — inset within the tooltip padding.',
		placement: ComponentPlacement.TOP_START,
		image: demoImage('Welcome', 'rgb(37, 99, 235)'),
		tourImage: { variant: BordaTourImageVariant.DEFAULT }
	},
	{
		target: TARGET.byData,
		title: 'Borderless image',
		description: 'Bleed variant — stretched to the tooltip edges.',
		placement: ComponentPlacement.MIDDLE_START,
		image: { src: demoImage('Banner', 'rgb(217, 119, 6)', 640, 200), alt: 'Banner' },
		tourImage: { variant: BordaTourImageVariant.BLEED }
	},
	{
		target: TARGET.overrides,
		title: 'Borderless, cropped',
		description: 'Bleed with a fixed height — object-fit cover crops the image.',
		placement: ComponentPlacement.TOP_START,
		image: { src: demoImage('Chart', 'rgb(22, 163, 74)', 640, 480), alt: 'Sales chart' },
		tourImage: {
			variant: BordaTourImageVariant.BLEED,
			customStyles: { root: 'height: 200px' }
		}
	}
];
