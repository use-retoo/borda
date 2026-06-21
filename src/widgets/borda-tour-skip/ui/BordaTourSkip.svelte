<script lang="ts">
	import { formatComponentStyles } from '@/shared/utils';

	import type { BordaTourSkipElements, BordaTourSkipEvents, BordaTourSkipProps } from '../model';

	let {
		id,
		checked = false,
		label = "Don't show again",
		disabled = false,
		aria,
		customClasses,
		customStyles,
		customHtml,
		onSkipChange
	}: Partial<BordaTourSkipProps & BordaTourSkipEvents> = $props();

	let rootElement: HTMLLabelElement | null = $state(null);

	let inputElement: HTMLInputElement | null = $state(null);

	const rootClasses = $derived(['rb-tour-skip', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	const inputClasses = $derived(['rb-tour-skip__input', customClasses?.input]);

	const inputStyles = $derived(formatComponentStyles(customStyles?.input));

	const labelClasses = $derived(['rb-tour-skip__label', customClasses?.label]);

	const labelStyles = $derived(formatComponentStyles(customStyles?.label));

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		onSkipChange?.(target.checked);
	}

	export function getElements(): BordaTourSkipElements {
		return { root: rootElement, input: inputElement };
	}
</script>

<label
	{id}
	bind:this={rootElement}
	class={rootClasses}
	style={rootStyles}
	aria-label={aria?.ariaLabel}
	aria-labelledby={aria?.ariaLabelledby}
	aria-describedby={aria?.ariaDescribedby}
	aria-disabled={aria?.ariaDisabled}
	aria-expanded={aria?.ariaExpanded}
	aria-controls={aria?.ariaControls}
	aria-haspopup={aria?.ariaHaspopup}
	aria-pressed={aria?.ariaPressed}
>
	{#if customHtml?.input}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html customHtml.input}
	{:else}
		<input
			bind:this={inputElement}
			class={inputClasses}
			style={inputStyles}
			type="checkbox"
			{checked}
			{disabled}
			onchange={handleChange}
		/>
	{/if}

	{#if customHtml?.label}
		<span class={labelClasses} style={labelStyles}>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html customHtml.label}
		</span>
	{:else}
		<span class={labelClasses} style={labelStyles}>
			{label}
		</span>
	{/if}
</label>
