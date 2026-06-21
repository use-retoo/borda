import type { BordaOverrides } from '../../../model';

/** Public API for the responsive feature. */
export interface BordaResponsiveApi {
	/** The currently active breakpoint (max-width in px), or `null` if none matched. */
	activeBreakpoint: number | null;
}

/** Return value of {@link useBordaResponsive}. */
export interface UseBordaResponsiveReturns {
	/** Set up matchMedia listeners and apply the initial breakpoint. */
	apply: () => void;
	/** Remove all listeners and clear responsive overrides. */
	destroy: () => void;
	/** Reactive responsive API. */
	api: BordaResponsiveApi;
}

/** Responsive config — object of breakpoints mapped to partial overrides. */
export type BordaResponsiveConfig = Record<number, Partial<BordaOverrides>>;
