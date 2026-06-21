import { ComponentPlacement } from '@/shared/enums';

/** Default selector used by {@link resolveBordaSteps} to find step-marker elements. */
export const BORDA_STEP_DEFAULT_SELECTOR = '[data-borda-step]';

/** Default tooltip placement applied when a step element omits `data-borda-placement`. */
export const BORDA_STEP_DEFAULT_PLACEMENT = ComponentPlacement.BOTTOM_START;
