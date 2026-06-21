import type {
	BordaHighlightConfig,
	BordaInstance,
	BordaStepConfig,
	BordaTarget,
	UseBordaReturns
} from '../../../model';
import type { UseBordaHighlightReturns } from '../types';

/**
 * Provides the `highlight` shortcut — spotlights a single element by mounting
 * a one-step tour through the factory's {@link mount}.
 *
 * @param mount - The factory's mount method, used to render the one-step tour.
 * @returns The highlight API exposing {@link UseBordaHighlightReturns.highlight}.
 */
export default function useBordaHighlight(
	mount: UseBordaReturns['mount']
): UseBordaHighlightReturns {
	/**
	 * Spotlights a single element by mounting a one-step tour.
	 *
	 * Accepts the same data as a tour step, plus optional top-level config
	 * (features, component overrides) that applies to the single step.
	 *
	 * @param step - The step data describing the element to highlight.
	 * @param highlightConfig - Optional widget config without `steps`.
	 * @param bordaTarget - DOM element or ShadowRoot to mount into. Defaults to `document.body`.
	 * @returns A promise that resolves with the {@link BordaInstance} handle.
	 */
	function highlight(
		step: BordaStepConfig,
		highlightConfig?: BordaHighlightConfig,
		bordaTarget?: BordaTarget
	): Promise<BordaInstance> {
		return mount(
			{
				...highlightConfig,
				steps: [step]
			},
			bordaTarget
		);
	}

	return { highlight };
}
