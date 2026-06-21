import type { ComponentAriaProps } from '@/shared/types';
import type {
	BordaImageCustomClasses,
	BordaImageCustomHtml,
	BordaImageCustomStyles
} from '@/shared/ui/borda-image';

import type { BordaTourImageVariant } from '../enums';

/** Props for the BordaTourImage widget. Mirrors the shared image primitive it wraps. */
export interface BordaTourImageProps {
	id: string;
	/** Image source URL. */
	src: string;
	/** Alternative text describing the image. */
	alt: string;
	/** Visual presentation — inset (`default`) or stretched to the tooltip edges (`bleed`). */
	variant: BordaTourImageVariant;
	/** ARIA attributes for accessibility. */
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaImageCustomClasses>;
	customStyles: Partial<BordaImageCustomStyles>;
	customHtml: Partial<BordaImageCustomHtml>;
}

/** DOM element references exposed via `getElements()`. */
export interface BordaTourImageElements {
	root: HTMLImageElement | null;
}

/** Public ref exposed by the BordaTourImage widget via `bind:this`. */
export interface BordaTourImageRef {
	getElements: () => BordaTourImageElements;
}
