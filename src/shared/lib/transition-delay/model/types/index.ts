/** Props accepted by {@link useTransitionDelay}. */
export interface UseTransitionDelayProps {
	/** Reactive getter — returns the value to watch for changes. */
	getTrigger: () => unknown;
	/** Reactive getter — returns the delay duration in milliseconds. */
	getDuration: () => number;
}

/** Reactive state returned by {@link useTransitionDelay}. */
export interface UseTransitionDelayReturns {
	/** Whether the delay is currently active. */
	isActive: boolean;
}
