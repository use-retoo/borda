import type { BordaStepConfig } from '../../../model';

/** Public API for controlling the tour at runtime. */
export interface BordaControllerApi {
	/** `true` when the tour has at least one step. */
	isActivated: boolean;
	/** Current 1-based step number. */
	currentStep: number;
	/** Current 0-based step index. */
	currentStepIndex: number;
	/** Total number of steps. */
	totalSteps: number;
	/** `true` when there is a step after the current one. */
	hasNextStep: boolean;
	/** `true` when there is a step before the current one. */
	hasPrevStep: boolean;
	/** Resolved DOM element for the current step's target. */
	currentTarget: HTMLElement | null;
	/** Full data object of the current step, including any per-step overrides. */
	step: BordaStepConfig | undefined;
	/** Navigate to a step by 0-based index. Waits for `prepareElement` if defined. */
	changeStep: (index: number) => Promise<void>;
	/** Navigate to the previous step. */
	prev: () => Promise<void>;
	/** Navigate to the next step (calls finish on the last step). */
	next: () => Promise<void>;
	/** Emit ON_TOUR_FINISH and end the tour. */
	finish: () => void;
	/**
	 * `true` while a navigation is paused via {@link BordaControllerApi.preventMove}.
	 * Resets to `false` after {@link BordaControllerApi.continue} or {@link BordaControllerApi.clearMovePrevented}.
	 */
	isMovePrevented: boolean;
	/** Pause the in-progress navigation. Call {@link BordaControllerApi.continue} to resume. */
	preventMove: () => void;
	/** Resume a navigation paused by {@link BordaControllerApi.preventMove}. */
	continue: () => void;
	/** Cancel a paused navigation without completing it. */
	clearMovePrevented: () => void;
}

/** Return value of {@link useBordaController}. */
export interface UseBordaControllerReturns {
	/** Apply the initial step from config. */
	apply: () => void;
	/** Reactive public API for controlling the tour. */
	api: BordaControllerApi;
}
