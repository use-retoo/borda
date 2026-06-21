import type { ComponentAriaProps, ComponentClasses, ComponentStyles } from '@/shared/types';

/** Custom CSS class overrides for the skip widget. */
export interface BordaTourSkipComponentClasses {
	root: ComponentClasses;
	input: ComponentClasses;
	label: ComponentClasses;
}

/** Custom inline style overrides for the skip widget. */
export interface BordaTourSkipComponentStyles {
	root: ComponentStyles;
	input: ComponentStyles;
	label: ComponentStyles;
}

/** Custom HTML override for the skip widget. */
export interface BordaTourSkipComponentHtml {
	input: string;
	label: string;
}

/** Props for the BordaTourSkip widget. */
export interface BordaTourSkipProps {
	id: string;
	checked: boolean;
	label: string;
	disabled: boolean;
	/** ARIA attributes for accessibility. */
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaTourSkipComponentClasses>;
	customStyles: Partial<BordaTourSkipComponentStyles>;
	customHtml: Partial<BordaTourSkipComponentHtml>;
}

/** Event handlers for the skip widget. */
export interface BordaTourSkipEvents {
	onSkipChange: (checked: boolean) => void;
}

/** DOM element references exposed via `getElements()`. */
export interface BordaTourSkipElements {
	root: HTMLLabelElement | null;
	input: HTMLInputElement | null;
}

/** Public ref exposed by the BordaTourSkip widget via `bind:this`. */
export interface BordaTourSkipRef {
	getElements: () => BordaTourSkipElements;
}
