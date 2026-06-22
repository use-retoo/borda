import { isBrowser } from '@/shared/utils';

import type { UseViewportSizeReturns } from '../types';

/**
 * Tracks the viewport size reactively.
 *
 * Prefers `window.visualViewport` when available: mobile Safari keeps
 * `window.innerWidth/innerHeight` at the full layout-viewport size even while
 * its address/tab bar overlays the bottom of the page, so clamping against it
 * can place the tooltip under that chrome. `visualViewport` reports the area
 * actually visible to the user and fires its own `resize` event when the bars
 * show or hide. Falls back to a {@link ResizeObserver} on
 * `document.documentElement` where `visualViewport` is unsupported.
 *
 * @returns Reactive `width` and `height` of the current viewport.
 */
export default function useViewportSize(): UseViewportSizeReturns {
	const visualViewport = isBrowser ? window.visualViewport : null;

	let width = $state(visualViewport?.width ?? (isBrowser ? window.innerWidth : 0));

	let height = $state(visualViewport?.height ?? (isBrowser ? window.innerHeight : 0));

	/** Reads the current viewport size into the reactive state. */
	function readSize() {
		width = visualViewport?.width ?? window.innerWidth;
		height = visualViewport?.height ?? window.innerHeight;
	}

	$effect(() => {
		if (!isBrowser) return;

		if (visualViewport) {
			visualViewport.addEventListener('resize', readSize);

			return () => visualViewport.removeEventListener('resize', readSize);
		}

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
