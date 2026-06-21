import type { ComponentStyles, ComponentClasses, ComponentAriaProps } from '@/shared/types';

/** Custom CSS class overrides for the linear progress bar. */
export interface BordaProgressLineComponentClasses {
	root: ComponentClasses;
	track: ComponentClasses;
	progress: ComponentClasses;
}

/** Custom inline style overrides for the linear progress bar. */
export interface BordaProgressLineComponentStyles {
	root: ComponentStyles;
	track: ComponentStyles;
	progress: ComponentStyles;
}

/** Props for the linear progress bar. */
export interface BordaProgressLineProps {
	id: string;
	current: number;
	total: number;
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaProgressLineComponentClasses>;
	customStyles: Partial<BordaProgressLineComponentStyles>;
}

/** Custom CSS class overrides for dots and text progress variants. */
export interface BordaProgressItemComponentClasses {
	root: ComponentClasses;
	item: ComponentClasses;
}

/** Custom inline style overrides for dots and text progress variants. */
export interface BordaProgressItemComponentStyles {
	root: ComponentStyles;
	item: ComponentStyles;
}

/** Props for discrete progress indicators (dots, text). */
export interface BordaProgressItemProps {
	id: string;
	current: number;
	total: number;
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaProgressItemComponentClasses>;
	customStyles: Partial<BordaProgressItemComponentStyles>;
}
