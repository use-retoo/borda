/** Config for the skip ("don't show again") feature. */
export interface BordaSkipConfig {
	storageKey: string;
}

/** Public API for controlling the skip feature at runtime. */
export interface BordaSkipApi {
	/** Whether the skip flag is currently set. */
	isSkipped: boolean;
	/** Effective storage key (from config or the default). */
	storageKey: string;
	/** Sets the skip flag and persists it. No-op when `skip` is disabled in config. */
	set: (value: boolean) => void;
	/** Clears the persisted flag. Works even when `skip` is disabled in config. */
	clear: () => void;
}

/** Return value of {@link useBordaSkip}. */
export interface UseBordaSkipReturns {
	apply: () => void;
	api: BordaSkipApi;
}
