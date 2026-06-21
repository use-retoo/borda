<script lang="ts">
	import { formatComponentStyles } from '@/shared/utils';

	import type {
		BordaContainerElements,
		BordaContainerProps,
		BordaContainerSnippets
	} from '../model';

	let {
		id,
		customClasses,
		customStyles,
		children
	}: Partial<BordaContainerProps & BordaContainerSnippets> = $props();

	let rootElement: HTMLDivElement | null = $state(null);

	const rootClasses = $derived(['rb-container', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements(): BordaContainerElements {
		return {
			root: rootElement
		};
	}
</script>

<div {id} bind:this={rootElement} class={rootClasses} style={rootStyles}>
	{#if children}
		{@render children()}
	{/if}
</div>
