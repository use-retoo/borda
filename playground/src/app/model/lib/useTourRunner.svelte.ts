import {
	type BordaConfig,
	type BordaHighlightConfig,
	type BordaInstance,
	type BordaStepConfig,
	useBorda
} from '@/app/entrypoint';
import { BordaEvent } from '@/entities/event';
import { SKIP_KEY } from '~/shared/constants';

import type { UseTourRunnerReturns } from '../types';

/**
 * Runs one demo tour at a time.
 *
 * Starts are queued and versioned: the nav can be clicked faster than a tour
 * unmounts, which would otherwise leave two widgets on the page. Every start
 * therefore tears the live instance down first, and a start that has already
 * been superseded drops whatever it mounted.
 *
 * @returns Tour controls for the playground navigation.
 */
export default function useTourRunner(): UseTourRunnerReturns {
	const widget = useBorda();

	let instance: BordaInstance | null = null;

	let mountVersion = 0;

	let queue = Promise.resolve<void>(undefined);

	/**
	 * Queues a mount behind the teardown of the currently running tour.
	 *
	 * @param mountFn - Mounts the widget and resolves with its instance.
	 */
	function startWith(mountFn: () => Promise<BordaInstance>) {
		const version = ++mountVersion;

		queue = queue
			.then(async () => {
				if (version !== mountVersion) return;

				const prev = instance;

				instance = null;

				if (prev) await widget.unmount(prev);

				if (version !== mountVersion) return;

				const next = await mountFn();

				if (version !== mountVersion) {
					void widget.unmount(next);
					return;
				}

				instance = next;

				next.api.events.once(BordaEvent.ON_BORDA_DESTROY, () => {
					if (instance === next) instance = null;
				});
			})
			.catch(() => {});
	}

	function startTour(config: BordaConfig) {
		startWith(() => widget.mount(config));
	}

	function startHighlight(step: BordaStepConfig, config?: BordaHighlightConfig) {
		startWith(() => widget.highlight(step, config));
	}

	/** Drops the persisted skip flag, through the live instance when there is one. */
	function clearSkip() {
		if (instance) {
			instance.skip.clear();
			return;
		}

		localStorage.removeItem(SKIP_KEY);
	}

	$effect(() => {
		/** Take the running tour down with the page. */
		return () => {
			if (instance) void widget.unmount(instance);
		};
	});

	return { startTour, startHighlight, clearSkip };
}
