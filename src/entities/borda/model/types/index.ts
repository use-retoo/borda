import type { BordaEventEmitter } from '@/entities/event';

/** Svelte context shared across all borda child components. */
export interface BordaContext {
	/** Widget-wide event bus. */
	eventEmitter: BordaEventEmitter;
	/** Trigger the component mount lifecycle. */
	mount: () => void;
	/** Trigger the component unmount lifecycle (raw teardown). */
	unmount: () => void;
	/** Dismiss the tour before completion — fires the close lifecycle, then unmounts. */
	close: () => void;
}
