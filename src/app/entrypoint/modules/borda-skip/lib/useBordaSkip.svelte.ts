import { BordaEvent } from '@/entities/event';
import type { BordaEventEmitter } from '@/entities/event';

import type { UseBordaConfigReturns } from '../../../model';
import type { UseBordaSkipReturns } from '../types';

const DEFAULT_STORAGE_KEY = 'borda-tour-skipped';

/**
 * Manages the "don't show again" skip feature.
 *
 * Reads and writes the skip flag to localStorage under a configurable key.
 * Enabled by default — pass `skip: false` in the config to disable entirely.
 *
 * @param config - The reactive config store.
 * @param eventEmitter - The shared event bus for emitting skip events.
 * @returns Methods to apply initial state, and a reactive skip API.
 */
export default function useBordaSkip(
	config: UseBordaConfigReturns,
	eventEmitter: BordaEventEmitter
): UseBordaSkipReturns {
	let isSkipped = $state(false);

	const rawSkip = $derived(config.getConfig().skip);

	const isDisabled = $derived(rawSkip === false);

	const storageKey = $derived(
		typeof rawSkip === 'object' && rawSkip?.storageKey ? rawSkip.storageKey : DEFAULT_STORAGE_KEY
	);

	function readStorage(key: string): boolean {
		try {
			return globalThis.localStorage?.getItem(key) === 'true';
		} catch (e) {
			if (e instanceof DOMException && e.name === 'SecurityError') return false;
			throw e;
		}
	}

	function writeStorage(key: string, value: boolean) {
		try {
			if (value) {
				globalThis.localStorage?.setItem(key, 'true');
			} else {
				globalThis.localStorage?.removeItem(key);
			}
		} catch (e) {
			if (!(e instanceof DOMException)) throw e;
		}
	}

	function apply() {
		if (isDisabled) return;

		isSkipped = readStorage(storageKey);
	}

	function set(value: boolean) {
		if (isDisabled) return;

		isSkipped = value;
		writeStorage(storageKey, isSkipped);

		eventEmitter.emit(BordaEvent.ON_SKIP_CHANGE, value);
	}

	function clear() {
		isSkipped = false;
		writeStorage(storageKey, isSkipped);

		eventEmitter.emit(BordaEvent.ON_SKIP_CLEAR);
	}

	return {
		apply,
		get api() {
			return {
				get isSkipped() {
					return isSkipped;
				},
				get storageKey() {
					return storageKey;
				},
				set,
				clear
			};
		}
	};
}
