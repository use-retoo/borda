import type { ComponentSize } from '@/shared/enums';
import type {
	ComponentAriaProps,
	ComponentClasses,
	ComponentSnippet,
	ComponentStyles
} from '@/shared/types';
import type { BordaButtonProps } from '@/shared/ui/borda-button';

/** Per-button customization: all BordaButton props (except id) plus a text label. */
export type BordaTourButtonConfig = Partial<Omit<BordaButtonProps, 'id'>> & {
	label?: string;
};

/** A button config resolved with its computed root classes and merged inline styles. */
export type BordaTourResolvedButton = BordaTourButtonConfig & {
	classes: ComponentClasses;
	styles: string | undefined;
};

/** Custom CSS class overrides for the tour buttons bar. */
export interface BordaTourButtonsComponentClasses {
	root: ComponentClasses;
	next: ComponentClasses;
	prev: ComponentClasses;
	finish: ComponentClasses;
	skip: ComponentClasses;
}

/** Custom inline style overrides for the tour buttons bar. */
export interface BordaTourButtonsComponentStyles {
	root: ComponentStyles;
	next: ComponentStyles;
	prev: ComponentStyles;
	finish: ComponentStyles;
	skip: ComponentStyles;
}

/** Custom HTML overrides for the tour buttons. */
export interface BordaTourButtonsComponentHtml {
	next: string;
	prev: string;
	finish: string;
	skip: string;
}

/** Props for the BordaTourButtons component. */
export interface BordaTourButtonsProps {
	id: string;
	currentStep: number;
	totalSteps: number;
	/** Default size applied to every button; overridable per button. */
	size: ComponentSize;
	/** Prev button config. Pass `false` to hide. */
	prev: BordaTourButtonConfig | false;
	/** Next button config (shown on non-last steps). Pass `false` to hide. */
	next: BordaTourButtonConfig | false;
	/** Finish button config (replaces next on the last step). Pass `false` to hide. */
	finish: BordaTourButtonConfig | false;
	/** Skip button config. Pass `false` to hide (default). */
	skip: BordaTourButtonConfig | false;
	/** ARIA attributes for accessibility. */
	aria: Partial<ComponentAriaProps>;
	customClasses: Partial<BordaTourButtonsComponentClasses>;
	customStyles: Partial<BordaTourButtonsComponentStyles>;
	customHtml: Partial<BordaTourButtonsComponentHtml>;
}

/** Event handlers for the tour buttons. */
export interface BordaTourButtonsEvents {
	onPrev: () => void;
	onNext: () => void;
	onFinish: () => void;
	onSkip: () => void;
}

/** Snippet slots for the tour buttons. */
export interface BordaTourButtonsSnippets {
	/** Generic center slot rendered between prev and next buttons. */
	center: ComponentSnippet;
}

/** DOM element references exposed via `getElements()`. */
export interface BordaTourButtonsElements {
	root: HTMLDivElement | null;
}

/** Public ref exposed by the BordaTourButtons component via `bind:this`. */
export interface BordaTourButtonsRef {
	getElements: () => BordaTourButtonsElements;
}
