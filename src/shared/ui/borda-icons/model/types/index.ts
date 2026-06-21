import type { ComponentSize } from '@/shared/enums';
import type { ComponentStyles, ComponentClasses, ComponentSnippet } from '@/shared/types';

export interface BordaIconCustomClasses {
	root: ComponentClasses;
}

export interface BordaIconCustomStyles {
	root: ComponentStyles;
}

export interface BordaIconProps {
	id: string;
	viewBox: string;
	size: ComponentSize;
	customClasses: Partial<BordaIconCustomClasses>;
	customStyles: Partial<BordaIconCustomStyles>;
}

export interface BordaIconSnippets {
	children: ComponentSnippet;
}

export interface BordaIconElements {
	root: SVGSVGElement | null;
}
