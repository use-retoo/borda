import type { ComponentSize } from '@/shared/enums';
import type {
	ComponentAriaProps,
	ComponentClasses,
	ComponentStyles,
	ComponentSnippet
} from '@/shared/types';

import { BordaButtonShape, BordaButtonType, BordaButtonVariant } from '../enums';

/** Custom CSS class overrides for the base button. */
export interface BordaButtonComponentClasses {
	root: ComponentClasses;
}

/** Custom inline style overrides for the base button. */
export interface BordaButtonComponentStyles {
	root: ComponentStyles;
}

/** Configuration props for the base borda button component. */
export interface BordaButtonProps {
	id: string;
	disabled: boolean;
	autosize: boolean;
	size: ComponentSize;
	shape: BordaButtonShape;
	variant: BordaButtonVariant;
	type: BordaButtonType;
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaButtonComponentClasses>;
	customStyles: Partial<BordaButtonComponentStyles>;
}

/** Event handlers for the base button. */
export interface BordaButtonEvents {
	onclick: (event: Event) => void;
}

/** Snippet slots for the base button. */
export interface BordaButtonSnippets {
	children: ComponentSnippet;
}

/** DOM element references for the base button. */
export interface BordaButtonElements {
	root: HTMLButtonElement | null;
}
