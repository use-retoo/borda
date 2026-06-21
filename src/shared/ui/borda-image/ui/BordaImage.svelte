<script lang="ts">
	import { formatComponentStyles } from '@/shared/utils';

	import type { BordaImageElements, BordaImageProps } from '../model';

	let {
		id,
		src = '',
		alt = '',
		aria,
		customClasses,
		customStyles,
		customHtml
	}: Partial<BordaImageProps> = $props();

	let rootElement: HTMLImageElement | null = $state(null);

	const rootClasses = $derived(['rb-image', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements(): BordaImageElements {
		return {
			root: rootElement
		};
	}
</script>

{#if customHtml?.root}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html customHtml.root}
{:else}
	<img
		{id}
		bind:this={rootElement}
		class={rootClasses}
		style={rootStyles}
		{src}
		{alt}
		aria-label={aria?.ariaLabel}
		aria-labelledby={aria?.ariaLabelledby}
		aria-describedby={aria?.ariaDescribedby}
	/>
{/if}
