import type { ComponentPlacement } from '@/shared/enums';

import { BORDA_STEP_DEFAULT_PLACEMENT, BORDA_STEP_DEFAULT_SELECTOR } from '../constants';

import type { BordaStep, ResolveBordaStepsOptions } from '../types';

/**
 * Scans the DOM for elements marked with `data-borda-step` and builds an
 * ordered {@link BordaStep} array from their `data-borda-*` attributes.
 *
 * Recognised attributes on each step element:
 * - `data-borda-step` — sort order (numeric).
 * - `data-borda-title` — step title.
 * - `data-borda-description` — step description.
 * - `data-borda-placement` — tooltip placement.
 *
 * @example
 * ```html
 * <button data-borda-step="1" data-borda-title="Welcome" data-borda-description="...">Btn</button>
 * ```
 * ```ts
 * await widget.mount({ steps: resolveBordaSteps() });
 * ```
 *
 * @param options - Optional overrides for selector, root node, and default placement.
 * @returns An ordered array of {@link BordaStep} entries.
 */
export function resolveBordaSteps(options?: ResolveBordaStepsOptions): BordaStep[] {
	const selector = options?.selector ?? BORDA_STEP_DEFAULT_SELECTOR;

	const root: ParentNode = options?.root ?? document;

	const defaultPlacement = options?.defaultPlacement ?? BORDA_STEP_DEFAULT_PLACEMENT;

	const elements: HTMLElement[] = Array.from(root.querySelectorAll<HTMLElement>(selector));

	return elements
		.map((element) => ({
			element,
			order: Number.parseInt(element.dataset.bordaStep ?? '0', 10) || 0
		}))
		.sort((a, b) => a.order - b.order)
		.map(({ element }) => ({
			target: element,
			title: element.dataset.bordaTitle ?? '',
			description: element.dataset.bordaDescription ?? '',
			placement: (element.dataset.bordaPlacement as ComponentPlacement) ?? defaultPlacement
		}));
}
