import { flushSync, tick } from 'svelte';

import useSwipeTouch from '../useSwipeTouch.svelte.js';

import type { UseSwipeTouchProps } from '../../types';

/** Runs the `$effect`-based hook inside a manual effect root, mirroring how it runs inside a mounted component. */
export async function runSwipeTouch(props: UseSwipeTouchProps): Promise<() => void> {
	const cleanup = $effect.root(() => {
		useSwipeTouch(props);
	});

	flushSync();

	await tick();

	return cleanup;
}
