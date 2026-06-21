import { isBrowser } from '@/shared/utils';

import type { UseViewportVisibilityReturns } from '../types';

/**
 * Composable for checking element visibility within the current viewport.
 *
 * @returns Stateless API exposing an `isFullyVisible` predicate.
 */
export default function useViewportVisibility(): UseViewportVisibilityReturns {
	function isFullyVisible(element: HTMLElement): boolean {
		if (!isBrowser) return false;

		const rect = element.getBoundingClientRect();

		return (
			rect.top >= 0 &&
			rect.bottom <= window.innerHeight &&
			rect.left >= 0 &&
			rect.right <= window.innerWidth
		);
	}

	return { isFullyVisible };
}
