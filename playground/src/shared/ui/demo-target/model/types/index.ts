import type { HTMLAttributes } from 'svelte/elements';

/** Props for the demo target card the tours point at. */
export interface DemoTargetProps extends HTMLAttributes<HTMLDivElement> {
	/** Element id a step resolves as `#id`. */
	id: string;

	/** Primary caption of the card. */
	name: string;

	/** Secondary caption naming how the step resolves this card. */
	badge: string;

	/** Pins the card below the page header. */
	isSticky?: boolean;

	/** Pins the card to the viewport corner. */
	isFixed?: boolean;
}
