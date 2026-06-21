import type { ComponentClasses, ComponentStyles, ComponentSnippet } from '@/shared/types';

/** Custom CSS class overrides for the container widget. */
export interface BordaContainerCustomClasses {
	root: ComponentClasses;
}

/** Custom inline style overrides for the container widget. */
export interface BordaContainerCustomStyles {
	root: ComponentStyles;
}

/** Props for the BordaContainer widget. */
export interface BordaContainerProps {
	id: string;
	customClasses: Partial<BordaContainerCustomClasses>;
	customStyles: Partial<BordaContainerCustomStyles>;
}

/** Snippet slots for the container widget. */
export interface BordaContainerSnippets {
	children: ComponentSnippet;
}

/** DOM elements exposed by the outer container component. */
export interface BordaContainerElements {
	root: HTMLDivElement | null;
}

/** Component ref for the outer container. */
export interface BordaContainerRef {
	getElements: () => BordaContainerElements;
}
