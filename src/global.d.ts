import type { BordaElement } from '@/app/custom-element';
import type { UseBordaReturns, BordaInstance } from '@/app/entrypoint';

declare global {
	const __VERSION__: string;
	const __NAME__: string;

	interface Window {
		bordaWidget: () => UseBordaReturns;
		defineBordaElement: () => void;
	}

	interface HTMLElementTagNameMap {
		'borda-tour-widget': BordaElement;
	}

	interface HTMLElementEventMap {
		'borda:mount': CustomEvent<BordaInstance>;
		'borda:unmount': CustomEvent<void>;
	}
}
