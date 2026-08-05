import type { Snippet } from 'svelte';

/** Props for a labelled demo section on the playground page. */
export interface DemoSectionProps {
	/** Caption rendered above the section content. */
	label: string;

	/** Section content — typically a demo target card. */
	children: Snippet;
}
