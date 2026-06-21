import type { BordaStepTarget, BordaStepTargetQuery } from '../types';

/** Runs `querySelector`, treating a malformed selector as "no match" instead of throwing. */
function queryTarget(selector: string): HTMLElement | null {
	try {
		return document.querySelector<HTMLElement>(selector);
	} catch {
		return null;
	}
}

function buildSelector(query: Partial<BordaStepTargetQuery>): string {
	const parts: string[] = [];

	if (query.id) {
		parts.push(`#${CSS.escape(query.id)}`);
	}

	if (query.class) {
		parts.push(`.${CSS.escape(query.class)}`);
	}

	if (query.data) {
		const { name, value } = query.data;

		if (value === undefined) {
			parts.push(`[data-${name}]`);
		} else {
			parts.push(`[data-${name}="${CSS.escape(value)}"]`);
		}
	}

	return parts.join('');
}

/**
 * Resolves a {@link BordaStepTarget} to a DOM element.
 *
 * Accepts a CSS selector string, a direct {@link HTMLElement}, or a typed
 * {@link BordaStepTargetQuery} object (id/class/data fields are joined with AND).
 *
 * @param target - The target descriptor, or `undefined` to short-circuit to `null`.
 * @returns The matched element, or `null` if nothing matched.
 */
export function resolveBordaStepTarget(target: BordaStepTarget | undefined): HTMLElement | null {
	if (!target) {
		return null;
	}

	if (target instanceof HTMLElement) {
		return target;
	}

	if (typeof target === 'string') {
		return queryTarget(target);
	}

	const selector = buildSelector(target);

	if (!selector) {
		return null;
	}

	return queryTarget(selector);
}
