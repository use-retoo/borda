import { BordaEvent, type BordaEventEmitter } from '@/entities/event';
import { resolveBordaStepTarget } from '@/entities/step';
import { BordaError } from '@/shared/utils';

import type { UseBordaConfigReturns } from '../../../model';
import type { BordaControllerApi, UseBordaControllerReturns } from '../types';

/**
 * Manages the active tour step state at the entrypoint level.
 *
 * Returns an API object equivalent to {@link BordaControllerApi} with reactive state
 * and buttons methods, plus an `apply()` to initialize from config.
 */
export default function useBordaController(
	config: UseBordaConfigReturns,
	eventEmitter: BordaEventEmitter
): UseBordaControllerReturns {
	let stepIndex = $state(0);

	let isMovePrevented = $state(false);

	let movePendingResolve: (() => void) | null = null;

	let movePendingReject: (() => void) | null = null;

	const steps = $derived(config.current.steps ?? []);

	const totalSteps = $derived(steps.length);

	const step = $derived(steps[stepIndex]);

	const currentStep = $derived(stepIndex + 1);

	const currentTarget = $derived(resolveBordaStepTarget(step?.target));

	const isLastStep = $derived(stepIndex >= totalSteps - 1);

	const isActivated = $derived(totalSteps > 0);

	const hasNextStep = $derived(!isLastStep);

	const hasPrevStep = $derived(stepIndex > 0);

	const tourConfig = $derived(config.getConfig().tour);

	/**
	 * Verifies the current step's target resolved to a DOM element.
	 *
	 * Emits {@link BordaEvent.ON_TOUR_ERROR} followed by {@link BordaEvent.ON_TOUR_CLOSE}
	 * when it didn't, instead of leaving the widget rendering nothing for a step
	 * the user can't see or dismiss.
	 *
	 * @returns `true` when there is no step, or its target resolved; `false` when the tour was closed due to an error.
	 */
	function checkCurrentTarget(): boolean {
		if (!step || currentTarget) return true;

		const error = new BordaError(
			`Borda: target for step ${currentStep} did not resolve to an element.`
		);

		console.error(error);

		eventEmitter.emit(BordaEvent.ON_TOUR_ERROR, error);
		eventEmitter.emit(BordaEvent.ON_TOUR_CLOSE);

		return false;
	}

	function apply() {
		stepIndex = tourConfig?.startStep ?? 0;

		tourConfig?.onStart?.();
		eventEmitter.emit(BordaEvent.ON_TOUR_START);
	}

	async function changeStep(index: number) {
		if (index < 0 || index >= totalSteps) return;

		const leaving = steps[stepIndex];
		const entering = steps[index];

		leaving?.onDeselected?.();

		await entering?.prepareElement?.();
		entering?.onBeforeHighlighted?.();

		stepIndex = index;

		if (!checkCurrentTarget()) return;

		entering?.onHighlighted?.();
		eventEmitter.emit(BordaEvent.ON_TOUR_STEP_CHANGE, currentStep);
	}

	async function next() {
		if (isLastStep) {
			finish();
			return;
		}

		step?.onNext?.();

		tourConfig?.onNext?.();
		eventEmitter.emit(BordaEvent.ON_TOUR_NEXT);

		if (isMovePrevented) {
			try {
				await waitForMove();
			} catch {
				return;
			}
		}

		await changeStep(stepIndex + 1);
	}

	async function prev() {
		if (!hasPrevStep) {
			return;
		}

		step?.onPrev?.();

		tourConfig?.onPrev?.();
		eventEmitter.emit(BordaEvent.ON_TOUR_PREV);

		if (isMovePrevented) {
			try {
				await waitForMove();
			} catch {
				return;
			}
		}

		await changeStep(stepIndex - 1);
	}

	function waitForMove(): Promise<void> {
		return new Promise((resolve, reject) => {
			movePendingResolve = resolve;
			movePendingReject = reject;
		});
	}

	function preventMove() {
		isMovePrevented = true;
	}

	function resumeMove() {
		isMovePrevented = false;
		movePendingResolve?.();
		movePendingResolve = null;
		movePendingReject = null;
	}

	function clearMovePrevented() {
		isMovePrevented = false;
		movePendingReject?.();
		movePendingResolve = null;
		movePendingReject = null;
	}

	function finish() {
		eventEmitter.emit(BordaEvent.ON_TOUR_FINISH);
	}

	const api: BordaControllerApi = {
		get isActivated() {
			return isActivated;
		},
		get hasNextStep() {
			return hasNextStep;
		},
		get hasPrevStep() {
			return hasPrevStep;
		},
		get currentStep() {
			return currentStep;
		},
		get currentStepIndex() {
			return stepIndex;
		},
		get totalSteps() {
			return totalSteps;
		},
		get currentTarget() {
			return currentTarget;
		},
		get step() {
			return step;
		},
		get isMovePrevented() {
			return isMovePrevented;
		},
		preventMove,
		continue: resumeMove,
		clearMovePrevented,
		changeStep,
		prev,
		next,
		finish
	};

	return { apply, api, checkCurrentTarget };
}
