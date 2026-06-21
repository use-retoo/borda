<script lang="ts">
	import { ComponentSize } from '@/shared/enums';
	import type { ComponentStyles } from '@/shared/types';
	import { BordaButton } from '@/shared/ui/borda-button';
	import { deepMerge, formatComponentStyles } from '@/shared/utils';

	import {
		bordaTourPrevButtonDefault,
		bordaTourNextButtonDefault,
		bordaTourFinishButtonDefault,
		bordaTourSkipButtonDefault
	} from '../model';

	import type {
		BordaTourButtonConfig,
		BordaTourButtonsElements,
		BordaTourButtonsEvents,
		BordaTourButtonsProps,
		BordaTourButtonsSnippets,
		BordaTourResolvedButton
	} from '../model';

	let {
		id,
		currentStep = 1,
		totalSteps = 1,
		size = ComponentSize.MD,
		prev = {},
		next = {},
		finish = {},
		skip = false,
		aria,
		customClasses,
		customStyles,
		customHtml,
		onNext,
		onPrev,
		onFinish,
		onSkip,
		center
	}: Partial<BordaTourButtonsProps & BordaTourButtonsEvents & BordaTourButtonsSnippets> = $props();

	let rootElement: HTMLDivElement | null = $state(null);

	const isFirstStep = $derived(currentStep === 1);

	const isLastStep = $derived(currentStep === totalSteps);

	const rootClasses = $derived(['rb-tour-buttons', customClasses?.root]);

	const rootStyles = $derived(formatComponentStyles(customStyles?.root));

	/** Joins per-button and bar-level style overrides into one inline-style string. */
	function mergeStyles(...parts: (ComponentStyles | undefined)[]): string | undefined {
		return parts.map(formatComponentStyles).filter(Boolean).join(' ') || undefined;
	}

	/**
	 * Merges a button config with its default and computes its root classes and
	 * inline styles. Returns `null` when the button is disabled (`value === false`).
	 *
	 * @param value - The per-button config, or `false` to hide the button.
	 * @param fallback - The default config for this button.
	 * @param name - The button slot name, used for the BEM class and overrides lookup.
	 * @returns The resolved button, or `null` when hidden.
	 */
	function resolveButton(
		value: BordaTourButtonConfig | false,
		fallback: BordaTourButtonConfig,
		name: 'prev' | 'next' | 'skip' | 'finish'
	): BordaTourResolvedButton | null {
		if (value === false) return null;

		const config = deepMerge(fallback, value);

		return {
			...config,
			classes: [`rb-tour-buttons__${name}`, config.customClasses?.root, customClasses?.[name]],
			styles: mergeStyles(config.customStyles?.root, customStyles?.[name])
		};
	}

	const prevConfig = $derived(resolveButton(prev, bordaTourPrevButtonDefault, 'prev'));

	const nextConfig = $derived(resolveButton(next, bordaTourNextButtonDefault, 'next'));

	const skipConfig = $derived(resolveButton(skip, bordaTourSkipButtonDefault, 'skip'));

	const finishConfig = $derived(resolveButton(finish, bordaTourFinishButtonDefault, 'finish'));

	export function getElements(): BordaTourButtonsElements {
		return {
			root: rootElement
		};
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
	{#if prevConfig !== null}
		{#if customHtml?.prev}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html customHtml.prev}
		{:else}
			<BordaButton
				type={prevConfig.type}
				variant={prevConfig.variant}
				size={prevConfig.size ?? size}
				shape={prevConfig.shape}
				aria={prevConfig.aria}
				autosize={prevConfig.autosize}
				disabled={isFirstStep}
				customClasses={{ root: prevConfig.classes }}
				customStyles={{ root: prevConfig.styles }}
				onclick={onPrev}
			>
				{prevConfig.label}
			</BordaButton>
		{/if}
	{/if}

	<div class="rb-tour-buttons__center">
		{#if center}
			{@render center()}
		{/if}
	</div>

	{#if skipConfig !== null}
		{#if customHtml?.skip}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html customHtml.skip}
		{:else}
			<BordaButton
				type={skipConfig.type}
				variant={skipConfig.variant}
				size={skipConfig.size ?? size}
				shape={skipConfig.shape}
				aria={skipConfig.aria}
				autosize={skipConfig.autosize}
				customClasses={{ root: skipConfig.classes }}
				customStyles={{ root: skipConfig.styles }}
				onclick={onSkip}
			>
				{skipConfig.label}
			</BordaButton>
		{/if}
	{/if}

	{#if isLastStep}
		{#if finishConfig !== null}
			{#if customHtml?.finish}
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html customHtml.finish}
			{:else}
				<BordaButton
					type={finishConfig.type}
					variant={finishConfig.variant}
					size={finishConfig.size ?? size}
					shape={finishConfig.shape}
					aria={finishConfig.aria}
					autosize={finishConfig.autosize}
					customClasses={{ root: finishConfig.classes }}
					customStyles={{ root: finishConfig.styles }}
					onclick={onFinish}
				>
					{finishConfig.label}
				</BordaButton>
			{/if}
		{/if}
	{:else if nextConfig !== null}
		{#if customHtml?.next}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html customHtml.next}
		{:else}
			<BordaButton
				type={nextConfig.type}
				variant={nextConfig.variant}
				size={nextConfig.size ?? size}
				shape={nextConfig.shape}
				aria={nextConfig.aria}
				autosize={nextConfig.autosize}
				customClasses={{ root: nextConfig.classes }}
				customStyles={{ root: nextConfig.styles }}
				onclick={onNext}
			>
				{nextConfig.label}
			</BordaButton>
		{/if}
	{/if}
</div>
