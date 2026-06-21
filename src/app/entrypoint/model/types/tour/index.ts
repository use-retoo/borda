import type { BordaStep } from '@/entities/step';
import type { ComponentShape, ComponentSize } from '@/shared/enums';
import type { BordaCloseButtonProps, BordaCloseButtonRef } from '@/widgets/borda-controls';
import type { BordaTourButtonsProps, BordaTourButtonsRef } from '@/widgets/borda-tour-buttons';
import type { BordaTourImageProps, BordaTourImageRef } from '@/widgets/borda-tour-image';
import type { BordaTourProgressProps } from '@/widgets/borda-tour-progress';
import type { BordaTourSkipProps, BordaTourSkipRef } from '@/widgets/borda-tour-skip';
import type {
	BordaTourTooltipAnimation,
	BordaTourTooltipProps,
	BordaTourTooltipRef
} from '@/widgets/borda-tour-tooltip';

/** Props for the BordaTour step composition component. */
export interface BordaTourProps {
	step: BordaStep;
	currentTarget: HTMLElement | null;
	currentStep: number;
	totalSteps: number;
	size: ComponentSize;
	shape: ComponentShape;
	isSkipChecked: boolean;
	/** Hides the tooltip (fade transition) while scrolling/transitioning between steps. */
	isHidden: boolean;
	/** Enables position gliding of the tooltip between steps (glide transition). */
	hasGlide: boolean;
	tourTooltipAnimation: BordaTourTooltipAnimation | false;
	tourTooltipProps: Partial<BordaTourTooltipProps>;
	tourImageProps: Partial<BordaTourImageProps> | false;
	tourButtonsProps: Partial<BordaTourButtonsProps> | false;
	tourProgressProps: Partial<BordaTourProgressProps> | false;
	tourSkipProps: Partial<BordaTourSkipProps> | false;
	closeButtonProps: Partial<BordaCloseButtonProps> | false;
}

/** Event handlers for the BordaTour component. */
export interface BordaTourEvents {
	onPrev: () => void;
	onNext: () => void;
	onFinish: () => void;
	onSkip: () => void;
	onSkipChange: (checked: boolean) => void;
}

/** Registry of child component refs exposed by BordaTour. */
export interface BordaTourComponents {
	tourTooltip: BordaTourTooltipRef | null;
	tourImage: BordaTourImageRef | null;
	tourButtons: BordaTourButtonsRef | null;
	tourSkip: BordaTourSkipRef | null;
	closeButton: BordaCloseButtonRef | null;
}

/** Public ref exposed by the BordaTour component via `bind:this`. */
export interface BordaTourRef {
	getComponents: () => BordaTourComponents;
}

/** Config for the tour feature. */
export interface BordaTourConfig {
	startStep: number;
	/** Called once when the tour initialises (on mount). */
	onStart: () => void;
	/** Called when advancing to the next step (not fired on the last step → finish). */
	onNext: () => void;
	/** Called when navigating to the previous step. */
	onPrev: () => void;
	/** Called when the tour finishes, before the unmount animation. */
	onFinish: () => void;
	/** Called when the tour is dismissed before completion (close button, backdrop or Escape), before the unmount animation. */
	onClose: () => void;
	/**
	 * Enable keyboard navigation: ArrowRight/ArrowLeft for next/prev, Escape to close.
	 * Defaults to `true`. Set to `false` to disable all keyboard handling.
	 */
	hasKeyboardControl: boolean;
}
