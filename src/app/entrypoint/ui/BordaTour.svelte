<script lang="ts">
	import { ComponentPlacement, ComponentShape, ComponentSize } from '@/shared/enums';
	import { BordaCloseButton } from '@/widgets/borda-controls';
	import { BordaTourButtons } from '@/widgets/borda-tour-buttons';
	import { BordaTourImage } from '@/widgets/borda-tour-image';
	import { BordaTourProgress, BordaTourProgressVariant } from '@/widgets/borda-tour-progress';
	import { BordaTourSkip } from '@/widgets/borda-tour-skip';
	import { BordaTourTooltip } from '@/widgets/borda-tour-tooltip';

	import type { BordaTourComponents, BordaTourEvents, BordaTourProps } from '../model';

	let {
		step = {
			target: '',
			title: '',
			description: '',
			placement: ComponentPlacement.BOTTOM_START
		},
		currentTarget = null,
		currentStep = 1,
		totalSteps = 1,
		size = ComponentSize.MD,
		shape = ComponentShape.CIRCLE,
		isSkipChecked = false,
		isHidden = false,
		hasGlide = false,
		tourTooltipAnimation = false,
		tourButtonsProps,
		tourImageProps,
		tourProgressProps,
		tourTooltipProps,
		closeButtonProps,
		tourSkipProps,
		onNext,
		onPrev,
		onFinish,
		onSkip,
		onSkipChange
	}: Partial<BordaTourProps & BordaTourEvents> = $props();

	let tourTooltipComponent: BordaTourTooltip | null = $state(null);

	let tourImageComponent: BordaTourImage | null = $state(null);

	let tourButtonsComponent: BordaTourButtons | null = $state(null);

	let tourSkipComponent: BordaTourSkip | null = $state(null);

	let closeButtonComponent: BordaCloseButton | null = $state(null);

	const stepProps = $derived({
		title: step.title,
		description: step.description,
		placement: step.placement,
		targetElement: currentTarget
	});

	const stepImage = $derived.by(() => {
		if (!step.image) {
			return null;
		}

		if (typeof step.image === 'string') {
			return { src: step.image, alt: '' };
		}

		return { src: step.image.src, alt: step.image.alt ?? '' };
	});

	const progressVariant = $derived(tourProgressProps ? tourProgressProps.variant : undefined);

	export function getComponents(): BordaTourComponents {
		return {
			tourTooltip: tourTooltipComponent,
			tourImage: tourImageComponent,
			tourButtons: tourButtonsComponent,
			closeButton: closeButtonComponent,
			tourSkip: tourSkipComponent
		};
	}
</script>

<BordaTourTooltip
	bind:this={tourTooltipComponent}
	{size}
	{...tourTooltipProps}
	{...stepProps}
	{isHidden}
	{hasGlide}
	animation={tourTooltipAnimation}
>
	{#snippet image()}
		{#if tourImageProps !== false && stepImage}
			<BordaTourImage
				bind:this={tourImageComponent}
				{...tourImageProps}
				src={stepImage.src}
				alt={stepImage.alt}
			/>
		{/if}
	{/snippet}

	{#snippet close()}
		{#if closeButtonProps !== false}
			<BordaCloseButton bind:this={closeButtonComponent} {size} {shape} {...closeButtonProps} />
		{/if}
	{/snippet}

	{#snippet skip()}
		{#if tourSkipProps !== false}
			<BordaTourSkip
				bind:this={tourSkipComponent}
				{...tourSkipProps}
				checked={isSkipChecked}
				{onSkipChange}
			/>
		{/if}
	{/snippet}

	{#snippet progress()}
		{#if tourProgressProps !== false && progressVariant === BordaTourProgressVariant.LINE}
			<BordaTourProgress
				variant={BordaTourProgressVariant.LINE}
				{currentStep}
				{totalSteps}
				customClasses={tourProgressProps?.customClasses}
				customStyles={tourProgressProps?.customStyles}
			/>
		{/if}
	{/snippet}

	{#snippet footer()}
		{#if tourButtonsProps !== false}
			<BordaTourButtons
				bind:this={tourButtonsComponent}
				{size}
				{...tourButtonsProps}
				{currentStep}
				{totalSteps}
				{onNext}
				{onPrev}
				{onFinish}
				{onSkip}
			>
				{#snippet center()}
					{#if tourProgressProps !== false && (progressVariant === BordaTourProgressVariant.DOTS || progressVariant === BordaTourProgressVariant.TEXT)}
						<BordaTourProgress
							variant={progressVariant}
							{currentStep}
							{totalSteps}
							customClasses={tourProgressProps?.customClasses}
							customStyles={tourProgressProps?.customStyles}
						/>
					{/if}
				{/snippet}
			</BordaTourButtons>
		{/if}
	{/snippet}
</BordaTourTooltip>
