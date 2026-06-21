import { BordaButtonShape, BordaButtonType, BordaButtonVariant } from '@/shared/ui/borda-button';

import type { BordaTourButtonConfig } from '../types';

export const bordaTourPrevButtonDefault: BordaTourButtonConfig = {
	label: 'Back',
	type: BordaButtonType.BUTTON,
	variant: BordaButtonVariant.OUTLINED,
	shape: BordaButtonShape.RECTANGLE
};

export const bordaTourNextButtonDefault: BordaTourButtonConfig = {
	label: 'Next',
	type: BordaButtonType.BUTTON,
	variant: BordaButtonVariant.FILLED,
	shape: BordaButtonShape.RECTANGLE
};

export const bordaTourFinishButtonDefault: BordaTourButtonConfig = {
	label: 'Finish',
	type: BordaButtonType.BUTTON,
	variant: BordaButtonVariant.FILLED,
	shape: BordaButtonShape.RECTANGLE
};

export const bordaTourSkipButtonDefault: BordaTourButtonConfig = {
	label: 'Skip',
	type: BordaButtonType.BUTTON,
	variant: BordaButtonVariant.TEXT,
	shape: BordaButtonShape.RECTANGLE
};
