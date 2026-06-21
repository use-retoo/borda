import { isBrowser } from '@/shared/utils';

import type { UseScrollPositionReturns } from '../types';

/**
 * Tracks the window scroll offset reactively.
 *
 * Mirrors Floating UI's `autoUpdate` ancestor-scroll behaviour: listens to the
 * `scroll` event (passive, rAF-throttled) so position-dependent computations —
 * like tooltip auto-flip — stay correct as the page scrolls.
 *
 * @returns Reactive `x`/`y` scroll offsets of the window.
 */
export default function useScrollPosition(): UseScrollPositionReturns {
	let x = $state(isBrowser ? window.scrollX : 0);

	let y = $state(isBrowser ? window.scrollY : 0);

	/** Reads the current scroll offset from `window` into the reactive state. */
	function readPosition() {
		x = window.scrollX;
		y = window.scrollY;
	}

	$effect(() => {
		if (!isBrowser) return;

		let frame: number | null = null;

		function onScroll() {
			if (frame !== null) return;

			frame = window.requestAnimationFrame(() => {
				frame = null;
				readPosition();
			});
		}

		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			if (frame !== null) window.cancelAnimationFrame(frame);

			window.removeEventListener('scroll', onScroll);
		};
	});

	return {
		get x() {
			return x;
		},
		get y() {
			return y;
		}
	};
}
