import { BordaEvent } from '@/entities/event';
import type { BordaEventEmitter } from '@/entities/event';

import { FORM_TAGS } from '../constants';

import type { UseBordaConfigReturns } from '../../../model';
import type { UseBordaKeyboardReturns } from '../types';

/**
 * Manages keyboard navigation for the borda widget.
 *
 * When `tour.hasKeyboardControl` is not `false`, attaches a document-level
 * `keydown` listener that maps:
 * - ArrowRight → emits {@link BordaEvent.ON_KEYBOARD_NEXT}
 * - ArrowLeft  → emits {@link BordaEvent.ON_KEYBOARD_PREV}
 * - Escape     → emits {@link BordaEvent.ON_TOUR_CLOSE}
 *
 * Keypresses originating from form controls are ignored so the widget
 * does not interfere with text input.
 *
 * @param config - The reactive config store.
 * @param eventEmitter - The shared event bus.
 * @returns `apply` and `destroy` lifecycle methods.
 */
export default function useBordaKeyboard(
	config: UseBordaConfigReturns,
	eventEmitter: BordaEventEmitter
): UseBordaKeyboardReturns {
	const tourConfig = $derived(config.getConfig().tour);

	function onKeydown(event: KeyboardEvent) {
		if (FORM_TAGS.has((event.target as HTMLElement)?.tagName)) return;

		switch (event.key) {
			case 'ArrowRight':
				event.preventDefault();
				eventEmitter.emit(BordaEvent.ON_KEYBOARD_NEXT);
				break;

			case 'ArrowLeft':
				event.preventDefault();
				eventEmitter.emit(BordaEvent.ON_KEYBOARD_PREV);
				break;

			case 'Escape':
				eventEmitter.emit(BordaEvent.ON_TOUR_CLOSE);
				break;
		}
	}

	function apply() {
		if (tourConfig?.hasKeyboardControl === false) return;

		document.addEventListener('keydown', onKeydown);
	}

	function destroy() {
		document.removeEventListener('keydown', onKeydown);
	}

	return { apply, destroy };
}
