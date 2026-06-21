import type { UseTransitionDelayProps, UseTransitionDelayReturns } from '../types';

/**
 * Activates a boolean flag for a fixed duration whenever a tracked value changes.
 *
 * Skips the initial run so the flag is not set on mount — only on subsequent
 * changes to the trigger value.
 *
 * @param props - Reactive getters for the trigger value and delay duration.
 * @returns Reactive state with `isActive` set to `true` during the delay window.
 */
export default function useTransitionDelay({
	getTrigger,
	getDuration
}: UseTransitionDelayProps): UseTransitionDelayReturns {
	let isActive = $state(false);

	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	let hasInitialRun = false;

	/**
	 * Cancels any pending deactivation so the next `schedule` starts from a clean state.
	 */
	function cancel() {
		if (timeoutId === null) return;

		clearTimeout(timeoutId);
		timeoutId = null;
	}

	/**
	 * Schedules `isActive` to flip back to `false` after `duration` ms.
	 *
	 * @param duration - Delay in milliseconds before deactivation.
	 */
	function schedule(duration: number) {
		timeoutId = setTimeout(() => {
			isActive = false;
			timeoutId = null;
		}, duration);
	}

	/**
	 * Restarts the active window: cancels any pending deactivation, flips
	 * `isActive` on, and schedules a fresh deactivation.
	 */
	function restart() {
		cancel();
		isActive = true;
		schedule(getDuration());
	}

	$effect(() => {
		/** Subscribe to the trigger so the effect re-runs on changes. */
		getTrigger();

		if (!hasInitialRun) {
			hasInitialRun = true;
			return;
		}

		restart();
	});

	return {
		get isActive() {
			return isActive;
		}
	};
}
