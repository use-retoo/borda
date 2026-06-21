import { isBrowser } from '@/shared/utils';

import type { UseViewportSizeReturns } from '../types';

/**
 * Tracks the viewport size reactively.
 *
 * Uses {@link ResizeObserver} on `document.documentElement` so updates are
 * delivered after layout has settled — `window.innerWidth/innerHeight`
 * read at that moment reliably reflect the new viewport.
 *
 * @returns Reactive `width` and `height` of the current viewport.
 */
export default function useViewportSize(): UseViewportSizeReturns {
	let width = $state(isBrowser ? window.innerWidth : 0);

	let height = $state(isBrowser ? window.innerHeight : 0);

	/** Reads the current viewport size from `window` into the reactive state. */
	function readSize() {
		width = window.innerWidth;
		height = window.innerHeight;
	}

	$effect(() => {
		if (!isBrowser) return;

		const observer = new ResizeObserver(readSize);

		observer.observe(document.documentElement);

		return () => observer.disconnect();
	});

	return {
		get width() {
			return width;
		},
		get height() {
			return height;
		}
	};
}
