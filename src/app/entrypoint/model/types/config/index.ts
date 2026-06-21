import type { BordaStep } from '@/entities/step';
import type { ComponentShape, ComponentSize } from '@/shared/enums';
import type { BordaContainerProps } from '@/widgets/borda-container';
import type { BordaCloseButtonProps } from '@/widgets/borda-controls';
import type { BordaTourButtonsProps } from '@/widgets/borda-tour-buttons';
import type { BordaTourImageProps } from '@/widgets/borda-tour-image';
import type { BordaTourOverlayProps } from '@/widgets/borda-tour-overlay';
import type { BordaTourProgressProps } from '@/widgets/borda-tour-progress';
import type { BordaTourSkipProps } from '@/widgets/borda-tour-skip';
import type { BordaTourTooltipProps } from '@/widgets/borda-tour-tooltip';

import type {
	BordaAnimationConfig,
	BordaResponsiveConfig,
	BordaScrollConfig,
	BordaSkipConfig,
	BordaVisibilityConfig
} from '../../../modules';
import type { BordaTourConfig } from '../tour';

/**
 * A step definition with optional per-step component overrides.
 * Override fields shadow the global config while this step is active.
 * Pass `false` to disable a component for this step only.
 */
export interface BordaStepConfig extends BordaStep {
	/** Spotlight overlay props for this step. Pass `false` to disable. */
	tourOverlay?: Partial<BordaTourOverlayProps> | false;
	/** Tooltip props for this step. Pass `false` to disable. */
	tourTooltip?: Partial<BordaTourTooltipProps> | false;
	/** Tooltip image props for this step (classes/styles); source and alt come from `image`. Pass `false` to disable. */
	tourImage?: Partial<BordaTourImageProps> | false;
	/** Buttons props for this step. Pass `false` to disable. */
	tourButtons?: Partial<BordaTourButtonsProps> | false;
	/** Progress indicator props for this step. Pass `false` to disable. */
	tourProgress?: Partial<BordaTourProgressProps> | false;
	/** Skip checkbox props for this step. Pass `false` to disable. */
	tourSkip?: Partial<BordaTourSkipProps> | false;
	/** Close button props for this step. Pass `false` to disable. */
	closeButton?: Partial<BordaCloseButtonProps> | false;
}

/** Per-component property overrides. Pass `false` to disable a component entirely. */
export interface BordaOverrides {
	/** Global size propagated to sized components (e.g. close button, tour buttons). */
	size: ComponentSize;
	/** Global shape propagated to shaped components (e.g. close button). */
	shape: ComponentShape;
	/** Steps for the onboarding tour. */
	steps: BordaStepConfig[];
	/** Outer container props. */
	container: Partial<BordaContainerProps>;
	/** Spotlight overlay props. Pass `false` to disable. */
	tourOverlay: Partial<BordaTourOverlayProps> | false;
	/** Tooltip props. Pass `false` to disable. */
	tourTooltip: Partial<BordaTourTooltipProps> | false;
	/** Tooltip image props (classes/styles); source and alt come from each step's `image`. Pass `false` to disable. */
	tourImage: Partial<BordaTourImageProps> | false;
	/** Buttons props. Pass `false` to disable. */
	tourButtons: Partial<BordaTourButtonsProps> | false;
	/** Progress indicator props. Pass `false` to disable. */
	tourProgress: Partial<BordaTourProgressProps> | false;
	/** "Don't show again" skip checkbox props. Pass `false` to disable. */
	tourSkip: Partial<BordaTourSkipProps> | false;
	/** Close button props. Pass `false` to disable. */
	closeButton: Partial<BordaCloseButtonProps> | false;
}

/** Component override config. All overrides are optional except `steps` which is required. */
export type BordaConfigOverrides = Partial<BordaOverrides> & Pick<BordaOverrides, 'steps'>;

/** Feature-specific sections of the widget config. */
export interface BordaFeatures {
	/** Tour buttons state (startStep, etc.). */
	tour: Partial<BordaTourConfig>;
	/** Visibility transitions and initial hidden state. */
	visibility: Partial<BordaVisibilityConfig>;
	/** Responsive breakpoint overrides. */
	responsive: BordaResponsiveConfig;
	/** Smooth-scroll the page to the active step target. Pass `false` to disable. */
	scroll: Partial<BordaScrollConfig> | false;
	/** Skip feature ("don't show again"). Pass `false` to disable. */
	skip: Partial<BordaSkipConfig> | false;
	/** Animations and transitions for tooltip/overlay. Pass `false` to disable. */
	animation: Partial<BordaAnimationConfig> | false;
}

/** Optional feature config. All feature sections are optional at the top level. */
export type BordaConfigFeatures = Partial<BordaFeatures>;

/** Root configuration object accepted by `useBorda().mount()`. `steps` is required. */
export type BordaConfig = BordaConfigOverrides & BordaConfigFeatures;

/**
 * Configuration accepted by `useBorda().highlight()`.
 * Identical to {@link BordaConfig} but without `steps` — the single step is passed separately.
 */
export type BordaHighlightConfig = Omit<BordaConfig, 'steps'>;

/** Reactive config store returned by {@link useBordaConfig}. */
export interface UseBordaConfigReturns {
	/** Current resolved config snapshot. */
	current: BordaConfig;
	/** Returns the current config object. */
	getConfig: () => BordaConfig;
	/** Replaces the entire config with a new value. */
	setConfig: (value: BordaConfig) => void;
	/** Deeply merges a partial config into the current one. */
	mergeConfig: (partial: Partial<BordaConfig>) => void;
}
