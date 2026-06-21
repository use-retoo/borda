import type { ComponentSize, ComponentShape } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses, ComponentAriaProps } from '@/shared/types';
import type { BordaButtonElements } from '@/shared/ui/borda-button';
import type { BordaIconElements } from '@/shared/ui/borda-icons';

/** Custom CSS class overrides for the close button and its sub-components. */
export interface BordaCloseButtonComponentClasses {
	root: ComponentClasses;
	button: ComponentClasses;
	cross: ComponentClasses;
}

/** Custom inline style overrides for the close button and its sub-components. */
export interface BordaCloseButtonComponentStyles {
	root: ComponentStyles;
	button: ComponentStyles;
	cross: ComponentStyles;
}

/** Custom HTML override for the close button. */
export interface BordaCloseButtonComponentHtml {
	button: string;
}

/** Configuration props for the close button widget. */
export interface BordaCloseButtonProps {
	id: string;
	size: ComponentSize;
	shape: ComponentShape;
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaCloseButtonComponentClasses>;
	customStyles: Partial<BordaCloseButtonComponentStyles>;
	customHtml: Partial<BordaCloseButtonComponentHtml>;
	onClose: (event: Event) => void;
}

/** DOM elements exposed by the close button component. */
export interface BordaCloseButtonElements {
	root: HTMLDivElement | null;
	cross: BordaIconElements | null;
	button: BordaButtonElements | null;
}

/** Component ref for the close button. */
export interface BordaCloseButtonRef {
	getElements: () => BordaCloseButtonElements;
}
