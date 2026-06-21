import type { BordaEventEmitter } from '@/entities/event';
import type { BordaContainerRef } from '@/widgets/borda-container';
import type { BordaCloseButtonRef } from '@/widgets/borda-controls';
import type { BordaTourButtonsRef } from '@/widgets/borda-tour-buttons';
import type { BordaTourImageRef } from '@/widgets/borda-tour-image';
import type { BordaTourOverlayRef } from '@/widgets/borda-tour-overlay';
import type { BordaTourSkipRef } from '@/widgets/borda-tour-skip';
import type { BordaTourTooltipRef } from '@/widgets/borda-tour-tooltip';

import type {
	BordaAnimationApi,
	BordaControllerApi,
	BordaResponsiveApi,
	BordaScrollApi,
	BordaSkipApi,
	BordaVisibilityApi
} from '../../../modules';
import type {
	BordaConfig,
	BordaHighlightConfig,
	BordaStepConfig,
	UseBordaConfigReturns
} from '../config';

/** Mount target — a regular DOM element or a Shadow DOM root. */
export type BordaTarget = HTMLElement | ShadowRoot;

/** Handle returned after mounting; provides runtime access to the widget. */
export interface BordaInstance {
	/** Public widget API. */
	api: BordaApi;
	/** Reference to the mounted Svelte component. */
	component: BordaRef;
	/** Reactive config store for reading and updating the widget config. */
	config: UseBordaConfigReturns;
	/** Responsive feature API (activeBreakpoint). */
	responsive: BordaResponsiveApi;
	/** Scroll feature API (scrollTo). */
	scroll: BordaScrollApi;
	/** Animation feature API (resolved tooltip/overlay timings). */
	animation: BordaAnimationApi;
	/** Skip feature API ("don't show again" state). */
	skip: BordaSkipApi;
	/** Visibility feature API (show, hide, isHidden). */
	visibility: BordaVisibilityApi;
}

/** Registry of all component refs within a mounted borda widget. Nullable refs correspond to optional components. */
export interface BordaComponents {
	container: BordaContainerRef;
	tourOverlay: BordaTourOverlayRef | null;
	tourTooltip: BordaTourTooltipRef | null;
	tourImage: BordaTourImageRef | null;
	tourButtons: BordaTourButtonsRef | null;
	tourSkip: BordaTourSkipRef | null;
	closeButton: BordaCloseButtonRef | null;
}

/** Top-level API returned by {@link useBorda}. */
export interface UseBordaReturns {
	/** Library name. */
	NAME: string;
	/** Library version. */
	VERSION: string;
	/** Mount the widget into a target element with the given config. */
	mount: (config: BordaConfig, target?: BordaTarget) => Promise<BordaInstance>;
	/** Unmount a previously mounted widget instance. */
	unmount: (instance: BordaInstance) => Promise<void>;
	/**
	 * Spotlights a single element. Accepts the same data as a tour step plus
	 * optional top-level config, and mounts a one-step tour.
	 */
	highlight: (
		step: BordaStepConfig,
		config?: BordaHighlightConfig,
		target?: BordaTarget
	) => Promise<BordaInstance>;
}

/** Internal props passed to the root Borda Svelte component. */
export interface BordaProps {
	/** Resolved widget config (with overrides applied). */
	config: BordaConfig;
	/** Tour controller, created at the entrypoint level. */
	controller: BordaControllerApi;
	/** Scroll feature API, created at the entrypoint level. */
	scroll: BordaScrollApi;
	/** Animation feature API, created at the entrypoint level. */
	animation: BordaAnimationApi;
	/** Skip feature API, created at the entrypoint level. */
	skip: BordaSkipApi;
	/** Shared event bus created by the factory. */
	eventEmitter: BordaEventEmitter;
	/** Callback invoked when the component is mounted. */
	mount: () => void;
	/** Callback invoked when the component requests unmount. */
	unmount: () => void;
	/** Callback invoked when the component requests an early dismissal of the tour. */
	close: () => void;
}

/** Top-level API surface exposed by a mounted borda widget. */
export interface BordaApi {
	/** Tour controller (currentStep, next, prev, changeStep, etc.). */
	controller: BordaControllerApi;
	/** References to all child component instances. */
	components: BordaComponents;
	/** Pub/sub event bus for widget events. */
	events: BordaEventEmitter;
}

/** Reference to the root Borda Svelte component. */
export interface BordaRef {
	/** Top-level widget API. */
	api: BordaApi;
}
