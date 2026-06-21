import type { ComponentAriaProps, ComponentClasses, ComponentStyles } from '@/shared/types';

import type { BordaTourProgressVariant } from '../enums';

/** Custom CSS class overrides for the progress widget. */
export interface BordaTourProgressComponentClasses {
	root: ComponentClasses;
	item: ComponentClasses;
}

/** Custom inline style overrides for the progress widget. */
export interface BordaTourProgressComponentStyles {
	root: ComponentStyles;
	item: ComponentStyles;
}

/** Custom HTML override for the progress widget. */
export interface BordaTourProgressComponentHtml {
	progress: string;
}

/** Props for the BordaTourProgress widget. */
export interface BordaTourProgressProps {
	id: string;
	currentStep: number;
	totalSteps: number;
	variant: BordaTourProgressVariant;
	/** ARIA attributes for accessibility. */
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaTourProgressComponentClasses>;
	customStyles: Partial<BordaTourProgressComponentStyles>;
	customHtml: Partial<BordaTourProgressComponentHtml>;
}

/** DOM element references exposed via `getElements()`. */
export interface BordaTourProgressElements {
	root: HTMLDivElement | null;
}

/** Public ref exposed by the BordaTourProgress widget via `bind:this`. */
export interface BordaTourProgressRef {
	getElements: () => BordaTourProgressElements;
}
