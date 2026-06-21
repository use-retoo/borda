<script lang="ts">
	import {
		BordaProgressDots,
		BordaProgressLine,
		BordaProgressText
	} from '@/shared/ui/borda-progress';
	import { formatComponentStyles } from '@/shared/utils';

	import { BordaTourProgressVariant } from '../model';

	import type { BordaTourProgressElements, BordaTourProgressProps } from '../model';

	let {
		id,
		currentStep = 1,
		totalSteps = 1,
		variant = BordaTourProgressVariant.DOTS,
		aria,
		customClasses,
		customStyles,
		customHtml
	}: Partial<BordaTourProgressProps> = $props();

	let rootElement: HTMLDivElement | null = $state(null);

	const rootClasses = $derived([
		'rb-tour-progress',
		`rb-tour-progress--${variant}`,
		customClasses?.root
	]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	export function getElements(): BordaTourProgressElements {
		return { root: rootElement };
	}
</script>

<div
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
	{#if customHtml?.progress}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html customHtml.progress}
	{:else if variant === BordaTourProgressVariant.DOTS}
		<BordaProgressDots current={currentStep} total={totalSteps} {customClasses} {customStyles} />
	{:else if variant === BordaTourProgressVariant.TEXT}
		<BordaProgressText current={currentStep} total={totalSteps} {customClasses} {customStyles} />
	{:else if variant === BordaTourProgressVariant.LINE}
		<BordaProgressLine current={currentStep} total={totalSteps} {customClasses} {customStyles} />
	{/if}
</div>
