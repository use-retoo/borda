import { BordaEvent } from '@/entities/event';
import type { BordaEventEmitter } from '@/entities/event';

import type { UseBordaConfigReturns } from '../../../model';
import type { UseBordaVisibilityReturns } from '../types';

/**
 * Manages the show/hide visibility feature for the borda widget.
 *
 * Reads initial visibility settings from config and provides
 * `show`/`hide` methods to toggle the widget at runtime.
 *
 * @param config - The reactive config store.
 * @param eventEmitter - The shared event bus for emitting visibility events.
 * @returns Methods to apply initial state, and a reactive visibility API.
 */
export default function useBordaVisibility(
	config: UseBordaConfigReturns,
	eventEmitter: BordaEventEmitter
): UseBordaVisibilityReturns {
	function apply() {
		const visibility = config.getConfig().visibility;

		const isAnimated = visibility?.isAnimated ?? true;

		const isHidden = visibility?.isHidden ?? false;

		config.mergeConfig({
			visibility: {
				isAnimated,
				isHidden
			}
		});
	}

	function show() {
		config.mergeConfig({
			visibility: {
				isHidden: false
			}
		});

		eventEmitter.emit(BordaEvent.ON_VISIBILITY_SHOW);
	}

	function hide() {
		config.mergeConfig({
			visibility: {
				isHidden: true
			}
		});

		eventEmitter.emit(BordaEvent.ON_VISIBILITY_HIDE);
	}

	return {
		apply,
		get api() {
			return {
				get isHidden() {
					return !!config.getConfig().visibility?.isHidden;
				},
				show,
				hide
			};
		}
	};
}
