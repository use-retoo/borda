import type { ComponentAriaProps, ComponentClasses, ComponentStyles } from '@/shared/types';

/** Custom CSS class overrides for the image. */
export interface BordaImageCustomClasses {
	root: ComponentClasses;
}

/** Custom inline style overrides for the image. */
export interface BordaImageCustomStyles {
	root: ComponentStyles;
}

/** Custom HTML override that fully replaces the rendered image. */
export interface BordaImageCustomHtml {
	root: string;
}

/** Configuration props for the image component. */
export interface BordaImageProps {
	id: string;
	/** Image source URL. */
	src: string;
	/** Alternative text describing the image. */
	alt: string;
	/** ARIA attributes for accessibility. */
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaImageCustomClasses>;
	customStyles: Partial<BordaImageCustomStyles>;
	customHtml: Partial<BordaImageCustomHtml>;
}

/** DOM element references exposed via `getElements()`. */
export interface BordaImageElements {
	root: HTMLImageElement | null;
}

/** Public ref exposed by the BordaImage component via `bind:this`. */
export interface BordaImageRef {
	getElements: () => BordaImageElements;
}
